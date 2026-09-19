import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Copy, WarningCircle } from '@phosphor-icons/react';
import { resume, socials } from '../content';
import { EASE, Magnetic, MaskText, SocialLinks } from '../ui/primitives';

const empty = { name: '', email: '', message: '', company: '' };

function validate(v) {
  const errors = {};
  if (!v.name.trim()) errors.name = 'Tell me who you are.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) errors.email = 'Enter a valid email so I can reply.';
  if (v.message.trim().length < 10) errors.message = 'A little more detail helps (10 characters minimum).';
  return errors;
}

function Field({ id, label, error, textarea, ...props }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">{label}</label>
      <Tag
        id={id}
        name={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-2xl border bg-raised px-4 text-base text-ink transition-colors placeholder:text-muted/80 focus:border-ink focus:outline-none ${
          textarea ? 'min-h-[160px] resize-y py-3' : 'h-12'
        } ${error ? 'border-signal' : 'border-line/15'}`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-signal">
          <WarningCircle size={14} aria-hidden /> {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);
  const email = resume.contact.email;

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      setValues(empty);
    } catch {
      setStatus('error');
    }
  };

  const mailto = `mailto:${email}?subject=${encodeURIComponent(`Hello from ${values.name || 'your site'}`)}&body=${encodeURIComponent(values.message)}`;

  return (
    <section id="contact" data-beat aria-labelledby="contact-title" className="relative overflow-hidden py-28 md:py-40">
      <div className="shell">
        <h2 id="contact-title" className="sr-only">Get in touch</h2>
        <MaskText
          as="p"
          text="Let's build something."
          className="display text-[clamp(3.4rem,11vw,11rem)] font-bold leading-[0.88] text-ink [font-variation-settings:'opsz'_96,'wdth'_75]"
        />

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="max-w-[40ch] text-lg leading-relaxed text-muted md:text-xl">
              Open to research collaborations, consulting, and interesting engineering problems. If you want to talk AI, ML systems, or just connect, I&apos;m usually a reply away.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href={`mailto:${email}`} className="display text-2xl font-semibold text-ink underline decoration-signal decoration-2 underline-offset-8 transition-colors hover:text-signal md:text-3xl">
                {email}
              </a>
              <button
                type="button"
                onClick={copy}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-line/15 px-4 text-sm text-ink transition-colors hover:border-ink"
                aria-live="polite"
              >
                {copied ? <Check size={14} weight="bold" /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <SocialLinks items={socials.filter((s) => s.kind !== 'email')} className="mt-8" />
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex min-h-[420px] flex-col items-start justify-center rounded-panel bg-signal p-8 text-on-signal md:p-12"
                  role="status"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-on-signal text-signal"><Check size={26} weight="bold" /></span>
                  <p className="display mt-8 text-4xl font-bold leading-none">Message sent.</p>
                  <p className="mt-4 max-w-[36ch] opacity-85">Thanks for reaching out. I read everything and usually reply within a few days.</p>
                  <button type="button" onClick={() => setStatus('idle')} className="mt-8 text-sm font-medium underline underline-offset-4">
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field id="name" label="Name" autoComplete="name" value={values.name} onChange={set('name')} error={errors.name} placeholder="Ada Lovelace" />
                    <Field id="email" label="Email" type="email" autoComplete="email" inputMode="email" spellCheck={false} value={values.email} onChange={set('email')} error={errors.email} placeholder="ada@example.com" />
                  </div>
                  <Field id="message" label="Message" textarea value={values.message} onChange={set('message')} error={errors.message} placeholder="What are you working on?" />
                  {/* Honeypot for bots; hidden from people and assistive tech */}
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="company">Company</label>
                    <input id="company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={set('company')} />
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="rounded-2xl border border-signal/40 px-4 py-3 text-sm text-ink">
                      The message couldn&apos;t be sent from here.{' '}
                      <a href={mailto} className="font-medium text-signal underline underline-offset-4">Send it by email instead</a>.
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-muted">Goes straight to my inbox.</p>
                    <Magnetic>
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="group inline-flex h-14 items-center gap-2 whitespace-nowrap rounded-full bg-ink px-7 text-base font-medium text-paper transition-[background-color,color,transform] duration-300 hover:bg-signal hover:text-on-signal active:scale-[0.97] disabled:opacity-60"
                      >
                        {status === 'sending' ? 'Sending…' : 'Send message'}
                        <ArrowRight size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </Magnetic>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
