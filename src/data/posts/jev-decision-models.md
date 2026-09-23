# Do You Need a Generative LLM for Every AI Decision?

![Summary of the Jev benchmark results](/blog/jev-decision-models.webp)

For the last couple of years my default way of adding AI to an app has been pretty simple. Give an LLM some context, ask it what to do, parse the answer, move on.

That makes sense when the thing I need back is language. But a lot of the "AI" inside real systems isn't really about language at all:

- Should this support ticket be escalated?
- Which tool should handle this request?
- How severe is this incident?
- Should the agent continue, retry, or stop?

These are bounded decisions. I already know every possible answer before I ask the question. I just need the model to pick one.

So when I came across **Jev**, TypeSafe AI's decision model, I wanted to answer one question for myself:

> Do I actually need a generative LLM for every AI decision?

I ran four small benchmarks to find out. One for each decision type Jev supports (**Boolean**, **Choice** and **Score**), plus one where I asked two questions about the same input in a single call.

The models, all called through the Vercel AI Gateway:

- `typesafe-ai/jev`
- `openai/gpt-5-nano`
- `openai/gpt-5.6-luna`
- `meta/llama-3.3-70b`

## How Jev is different

Jev doesn't generate text. You give it some state (a ticket, a message, an agent transcript) and a set of typed questions, and it returns typed answers. A Choice picks from a fixed set, a Score lands somewhere on an ordered rubric, and a Boolean gives you a probability. You can ask several questions about the same state in one request.

In the AI SDK it looks like this:

```js
import { experimental_evaluate as evaluate } from 'ai';

const result = await evaluate({
  model: 'typesafe-ai/jev',
  state: ticket,
  questions: {
    route: {
      type: 'choice',
      instructions: 'Which team should handle this ticket?',
      criteria: {
        billing: 'Payments, charges, refunds, invoices, or subscriptions',
        technical: 'Bugs, errors, outages, or broken functionality',
        account: 'Login, permissions, or account access',
        general: 'Anything else',
      },
    },
    urgent: {
      type: 'boolean',
      instructions: 'Is the customer explicitly time-sensitive or completely blocked?',
    },
  },
});

// result.answers.route.choice, result.answers.urgent.probability, ...
```

No prompt engineering to force JSON, no parsing, no retry when the model decides to add a friendly sentence before the braces.

For the LLMs I did the usual thing. Same definitions in a prompt, "return ONLY valid JSON", then parse and validate the result:

```js
const { text } = await generateText({
  model: 'openai/gpt-5-nano',
  reasoning: 'minimal',         // Llama got temperature: 0 instead
  prompt: buildPrompt(ticket),  // same route criteria + urgency rule
});

const { route, urgent } = parseJSON(text); // throws on bad output
```

The OpenAI models ran with minimal reasoning, since this is supposed to be a fast decision in a request path. That is a fair setting for this use case, but it's worth knowing when you read the numbers.

## The four experiments

Every experiment had **40 hand-labeled examples**. I wasn't trying to build a leaderboard. I wanted cases that look like decisions I'd actually put inside an app or an agent loop.

**1. Choice + Boolean (composed).** Support tickets. Route each one to `billing`, `technical`, `account` or `general`, and decide if it's urgent. 10 tickets per route. This was the only experiment with two questions per call.

**2. Boolean.** "Does this support case require immediate escalation?" This time with an explicit policy:

```text
Immediate escalation is required if ANY of these are true:

1. A production or core service is completely unavailable,
   or essentially all affected users are blocked.
2. There is an active security compromise, account takeover,
   unauthorized access, or exposed active credential.
3. The user explicitly states a deadline within the next 60 minutes.

Otherwise immediate escalation is NOT required.
```

20 positive and 20 negative cases. Since Boolean returns a probability, I tracked Brier score as well as accuracy. Anything at 0.5 or above counts as `true`.

**3. Score.** Incident severity on a 0 to 4 rubric, 8 examples per level:

| Level | Meaning |
| --- | --- |
| 0 | No incident. Informational or normal product question. |
| 1 | Minor. Small degradation or inconvenience. |
| 2 | Moderate. Real functionality impaired, but limited scope or a workaround exists. |
| 3 | High. Major functionality unavailable or a large group blocked. |
| 4 | Critical. Core outage, active compromise, destructive data event. |

On the Jev side the whole thing is one question:

```js
questions: {
  severity: {
    type: 'score',
    instructions: 'How severe is the incident described in this customer support case?',
    criteria: RUBRIC, // the five level descriptions, in order
  },
},
```

Jev returns a continuous score plus a probability for each level, so besides rounded accuracy I also measured MAE and RMSE against the label.

**4. Choice.** Agent tool routing. Each request goes to `knowledge_base`, `account_tool`, `billing_tool` or `human_escalation`. 10 per class. A docs question goes to the knowledge base, changing a payment card goes to billing, a compromised account goes to a human.

## The results

| Experiment | Jev | GPT-5 nano | GPT-5.6 Luna | Llama 3.3 70B |
| --- | --: | --: | --: | --: |
| Boolean accuracy | **100%** | 97.5% | **100%** | **100%** |
| Score rounded accuracy | 97.5% | 32.5% | **100%** | 95% |
| Choice accuracy | **100%** | 50% | **100%** | **100%** |
| Composed exact match | 80% | **92.5%** | 87.5% | 72.5% |

This was more interesting than I expected. Jev was excellent on every standalone test. It did **not** win the composed one.

## Boolean: 40 out of 40

Jev got every escalation case right.

- Accuracy: **100%**
- Brier score: **0.0068**
- Mean probability on positive cases: **0.919**
- Mean probability on negative cases: **0.049**
- Median latency: **286 ms**

Luna and Llama also went 40/40. Nano missed one: "Two-factor authentication codes are going to my old phone", which it scored at 0.60 and escalated.

So accuracy doesn't separate Jev from the bigger models here. Latency does:

| Model | Median latency |
| --- | --: |
| **Jev** | **286 ms** |
| Llama 3.3 70B | 382 ms |
| GPT-5 nano | 796 ms |
| GPT-5.6 Luna | 1,014 ms |

I would not read the Brier scores as a calibration ranking. Llama returned hard 0s and 1s on every case and got a Brier of exactly 0. Luna's was lower than Jev's too. Forty handmade examples can't tell you much about real calibration. What I can say is that Jev's probabilities separated the two classes very cleanly on this set.

## Score: my favorite result

| Model | MAE (lower is better) | RMSE (lower is better) | Rounded accuracy |
| --- | --: | --: | --: |
| **Jev** | **0.067** | 0.146 | 97.5% |
| GPT-5 nano | 0.795 | 0.964 | 32.5% |
| GPT-5.6 Luna | 0.075 | **0.114** | **100%** |
| Llama 3.3 70B | 0.095 | 0.214 | 95% |

Luna got every level right after rounding. Jev missed one. But Jev had the **lowest mean absolute error** of the four.

Its one miss was this ticket:

> Our customer support agents cannot access customer records, although customers can still use the service.

I labeled it **3 (High)**. Jev returned **2.38**, which rounds to 2. Looking at the probabilities, it put 0.58 on level 2 and 0.40 on level 3.

I actually like this miss. Not because it's right (my label says 3), but because it shows what an ordered score gives you. The model didn't think a serious incident was harmless. It sat right on the line between Moderate and High, and it told me so. If all I report is "39/40", that information is gone.

Llama's two misses were one level off in each direction. Nano was a different story: only 32.5% exact and 72.5% within one level.

## Choice: three perfect scores and one strange one

Jev, Luna and Llama all went **40/40**. Jev's median latency was about **304 ms**.

Nano went **20/40**, and the misses weren't random:

| Class | Nano accuracy |
| --- | --: |
| knowledge_base | 90% |
| account_tool | 100% |
| billing_tool | 0% |
| human_escalation | 10% |

Every single one of its 20 misses went to `account_tool`. It sent 30 of the 40 requests there.

"I was charged twice for my subscription." Jev said `billing_tool` with probability 1.0. Nano said `account_tool` with confidence 0.75.

The part I found odd: nano's mean confidence when it was **right** was 0.708. When it was **wrong** it was 0.723. On this set it was slightly more sure of itself when it made mistakes.

I wouldn't generalize that beyond this test, but it's a good reminder that a confidence number isn't useful just because the model returns one. You still have to check it against your own decision boundary.

## Then I combined two decisions

For each support ticket in the first experiment, the model had to make a Choice (where does this go?) and a Boolean (is it urgent?) at the same time.

| Model | Routing | Urgency | Exact match |
| --- | --: | --: | --: |
| Jev | 97.5% | 82.5% | 80% |
| GPT-5 nano | 95% | **97.5%** | **92.5%** |
| GPT-5.6 Luna | 95% | 92.5% | 87.5% |
| Llama 3.3 70B | **100%** | 72.5% | 72.5% |

Jev's routing was still great (its only miss sent "Do you offer discounts for nonprofit organizations?" to billing instead of general). Urgency dropped to 82.5%, and since exact match needs both answers right, Jev ended at 80%.

So yes: **GPT-5 nano beat Jev on the composed experiment.** The same nano that got 50% on standalone routing. I'm saying that plainly because a benchmark isn't worth much if you decide the winner before you run it.

## What went wrong on urgency

All seven of Jev's urgency misses were in the same direction. It escalated tickets I had labeled as not urgent. It never missed a ticket that was actually urgent.

| Ticket | Jev P(urgent) |
| --- | --: |
| The dashboard has been stuck on loading for the last 20 minutes. | 0.80 |
| I forgot my password and can't sign in. | 0.79 |
| The payment screen throws an error before I can enter my card details. | 0.76 |
| My account says I don't have permission to access the analytics page. | 0.63 |
| The application crashes every time I upload a PDF. | 0.60 |
| Your API is returning HTTP 500 for every request. | 0.58 |
| Our integration suddenly started timing out this morning. | 0.53 |

Five of these were technical tickets. Jev got all 10 technical routes right but only 5 of 10 urgency calls in that group. Billing and general were 10/10 on both.

When I went back and looked at this table next to the other models, I noticed something. Luna's three urgency misses were HTTP 500, the stuck dashboard and the forgotten password, all on Jev's list. Llama over-escalated eleven tickets, including most of the same ones. Nano was the only model that stayed strict, and its one miss went the other way (a hijacked account it didn't flag).

Then I looked at my own instruction again:

> Is the customer explicitly time-sensitive or completely blocked?

Someone who can't sign in is completely blocked. An API that returns 500 on every request has blocked that customer. My labels were stricter than the words I gave the models. Three out of four models read "completely blocked" more literally than I did.

So I don't think this is mostly a Jev problem. I think it's a spec problem, and Jev's probabilities make that visible. Four of those seven sit between 0.5 and 0.65. A 0.7 threshold alone would have flipped all four. A properly written urgency rule, like the policy in the Boolean experiment, would probably have fixed more.

## Did combining questions make Jev worse?

It's tempting to look at 100% standalone and 82.5% composed and say "Jev gets worse when you ask two questions."

This experiment doesn't show that. The two runs weren't the same 40 inputs with one variable changed. The standalone Boolean test had its own dataset and a precise written policy. The composed test had different tickets and a one-line urgency rule that, as above, was vague.

To actually test the composition effect I'd need to run the exact same examples and instructions twice, once alone and once alongside another question. I didn't do that here.

What the numbers do show is more practical:

> Good standalone scores don't remove the need to evaluate the composed workflow you actually ship.

## Latency was the most consistent result

Median latency per experiment:

| Benchmark | Jev | GPT-5 nano | GPT-5.6 Luna | Llama 3.3 70B |
| --- | --: | --: | --: | --: |
| Composed | **289 ms** | 787 ms | 851 ms | 372 ms |
| Boolean | **286 ms** | 796 ms | 1,014 ms | 382 ms |
| Score | **315 ms** | 1,203 ms | 1,225 ms | 565 ms |
| Choice | **304 ms** | 1,117 ms | 1,266 ms | 551 ms |

And p95, which matters more if this sits in a request path:

| Benchmark | Jev | GPT-5 nano | GPT-5.6 Luna | Llama 3.3 70B |
| --- | --: | --: | --: | --: |
| Composed | **376 ms** | 1,348 ms | 2,278 ms | 526 ms |
| Boolean | **401 ms** | 1,385 ms | 2,130 ms | 600 ms |
| Score | **462 ms** | 1,893 ms | 2,762 ms | 1,168 ms |
| Choice | **450 ms** | 1,663 ms | 7,043 ms | 747 ms |

By median, Jev was about **1.3x to 4.2x faster** than the other models depending on the workload. Its slowest single call across all 160 cases was about 705 ms. Luna had one Choice call take almost 35 seconds.

The composed number is interesting too. Standalone Boolean was 286 ms, standalone Choice was 304 ms, and both together were 289 ms. That fits with Jev evaluating multiple questions against the same state in parallel. I wouldn't call it proof that the second question is free, since these were separate runs and not a controlled latency test. These are also end-to-end numbers from my laptop through the gateway, so network and provider load are baked in.

Still, for something sitting in a tool-routing loop or a guardrail, staying around 300 ms is compelling.

## So should you replace LLMs with decision models?

No, and that's not what I took from this.

If I need a model to write an explanation, talk to a user, reason through something open-ended, summarize, or write code, I still need a generative model.

But picture an agent that has already done all that work, and now the app needs to decide:

- Which tool next?
- Is this safe to run automatically?
- Does this need a human?
- How bad is this?

That's a different problem. Using a full generative model there feels a bit like asking someone to write an essay so you can pull one checkbox out of the last paragraph.

## Where I'd actually use it

**Agent routing.** Picking among a small, known set of tools, agents or next steps. The standalone Choice result is exactly what I'd want from a router.

**Guardrails and approvals.** "Can this action run without a human?" A probability plugs straight into a threshold or a review queue. No parsing "yes, but..." out of prose.

**Priority and severity.** The Score experiment convinced me here. A continuous value on an ordered rubric tells you more than `low / medium / high`, especially near the boundaries.

**Around the LLM, not instead of it.** This is probably where I find it most useful. Route the request first, let a generative model do the open-ended work, then use a decision model to check the result and decide whether to accept it, retry, escalate, or send it for review.

```js
const { answers } = await evaluate({
  model: 'typesafe-ai/jev',
  state: draftReply,
  questions: {
    next: {
      type: 'choice',
      instructions: 'What should happen to this draft reply?',
      criteria: {
        send: 'Accurate, on-policy, and answers the question',
        retry: 'Fixable problems like wrong tone or missing detail',
        escalate: 'Needs a human: refunds, legal, security, or angry customer',
      },
    },
  },
});
```

That's less "small model vs big model" and more using different models for different jobs.

## What this doesn't prove

Benchmark posts get silly fast, so to be clear about the scope. This was:

- four small, handcrafted datasets,
- 40 cases each, labeled by me,
- one set of decision definitions,
- four specific model endpoints,
- one run each, at one point in time.

It is **not** evidence that Jev is "smarter" than Luna or Llama. That isn't even a meaningful comparison.

I didn't measure cost. I wouldn't use these Brier scores to say anything general about calibration. And because the standalone and composed datasets differ, I can't blame the urgency drop on composition.

The fair summary is:

> For these bounded decision tasks, under these definitions, Jev gave very strong results at much lower latency.

## What changed my mind

I went in expecting a latency story. Jev is specialized and doesn't generate paragraphs, so of course it would be faster.

The standalone results were almost boringly good. 100% on Boolean, 100% on Choice, 97.5% on Score with the lowest MAE.

Then I put two questions together and got 80%, and that turned out to be the most useful result of the whole experiment. Not because it exposed a weakness in the model, but because it exposed a weakness in my spec. The probabilities showed me exactly which tickets sat near the line and why.

Real systems aren't benchmark tables. A router feeds an agent, the agent calls a tool, a classifier triggers a policy, a threshold sends something to a human. Every one of those boundaries is a place where behavior can shift.

So my takeaway isn't "Jev beats LLMs." It's this:

> If the thing your app needs back is a decision, evaluate your models as decision makers, not as text generators.

Sometimes the right answer will still be a generative LLM. Sometimes it's plain code. And sometimes a dedicated decision model is the better fit. The useful part is noticing that those are different jobs.

---

**Code, datasets and raw results:** [github.com/immanuelsavio/jev-experiment](https://github.com/immanuelsavio/jev-experiment)

Everything ran through the Vercel AI Gateway using `typesafe-ai/jev`, `openai/gpt-5-nano`, `openai/gpt-5.6-luna` and `meta/llama-3.3-70b`. If you rerun it, or find a better way to test the composition question, I'd really like to see what you get.
