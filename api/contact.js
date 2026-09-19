// Vercel serverless function: POST /api/contact
// Sends contact form submissions by email through Resend (https://resend.com).
//
// Required env vars (Vercel project settings):
//   RESEND_API_KEY   - Resend API key
// Optional:
//   CONTACT_TO       - inbox that receives messages (default: immanuelsavio@gmail.com)
//   CONTACT_FROM     - verified sender, e.g. "Portfolio <hello@immanuelsavio.com>"
//                      (default: Resend's onboarding sender, which only delivers to
//                      the Resend account owner's address)

const LIMITS = { name: 120, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const message = String(body.message ?? '').trim();

  // Honeypot filled: pretend success so bots move on.
  if (body.company) return res.status(200).json({ ok: true });

  if (!name || name.length > LIMITS.name) return res.status(422).json({ error: 'Invalid name' });
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email) return res.status(422).json({ error: 'Invalid email' });
  if (message.length < 10 || message.length > LIMITS.message) return res.status(422).json({ error: 'Invalid message' });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'Email is not configured' });

  const to = process.env.CONTACT_TO || 'immanuelsavio@gmail.com';
  const from = process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>';

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New message from ${name.replace(/[\r\n]/g, ' ')}`,
        text: `${message}\n\n${name} <${email}>`,
        html: `<p style="white-space:pre-wrap">${escapeHtml(message)}</p><p>${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`,
      }),
    });
    if (!r.ok) {
      console.error('Resend error', r.status, await r.text());
      return res.status(502).json({ error: 'Send failed' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact handler failed', err);
    return res.status(502).json({ error: 'Send failed' });
  }
}
