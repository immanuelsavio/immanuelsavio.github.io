import { useState } from 'react';
import { ArrowRight, Copy, Check, EnvelopeSimple, MapPin, Phone, WarningCircle } from '@phosphor-icons/react';
import { company } from '../data/catalog';
import { Headline, Reveal } from '../ui';

const roles = ['Doctor', 'Pharmacist', 'Distributor or stockist', 'Hospital or clinic', 'Other'];

function Field({ id, label, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-sx-ink">{label}</label>
      {children}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-[rgb(var(--sx-danger))]">
          <WarningCircle size={14} aria-hidden /> {error}
        </p>
      )}
    </div>
  );
}

const inputCls = (err) =>
  `w-full rounded-2xl border bg-sx-surface px-4 text-base text-sx-ink placeholder:text-sx-muted/70 transition-colors focus:border-sx-brand focus:outline-none ${err ? 'border-[rgb(var(--sx-danger))]' : 'border-sx-line/15'}`;

/**
 * Enquiry form. There is no server for this concept site, so it composes an
 * email in the visitor's mail app with everything pre-filled.
 */
function EnquiryForm() {
  const [v, setV] = useState({ name: '', org: '', role: roles[0], message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => { setV((s) => ({ ...s, [k]: e.target.value })); if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined })); };

  const submit = (e) => {
    e.preventDefault();
    const found = {};
    if (!v.name.trim()) found.name = 'Please add your name.';
    if (v.message.trim().length < 10) found.message = 'Tell us a little more (10 characters minimum).';
    setErrors(found);
    if (Object.keys(found).length) { document.getElementById(`sx-${Object.keys(found)[0]}`)?.focus(); return; }
    const subject = `Enquiry from ${v.name}${v.org ? `, ${v.org}` : ''}`;
    const body = `${v.message}\n\n${v.name}\n${v.role}${v.org ? `, ${v.org}` : ''}`;
    window.location.href = `mailto:${company.emails[1]}?cc=${company.emails[0]}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 rounded-sx bg-sx-surface p-6 ring-1 ring-sx-line/10 md:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="sx-name" label="Your name" error={errors.name}>
          <input id="sx-name" name="name" autoComplete="name" value={v.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'sx-name-error' : undefined} className={`h-12 ${inputCls(errors.name)}`} placeholder="Dr. Anjali Rao" />
        </Field>
        <Field id="sx-org" label="Clinic, pharmacy or company">
          <input id="sx-org" name="organization" autoComplete="organization" value={v.org} onChange={set('org')} className={`h-12 ${inputCls()}`} placeholder="Optional" />
        </Field>
      </div>
      <Field id="sx-role" label="I am a">
        <select id="sx-role" name="role" value={v.role} onChange={set('role')} className={`h-12 appearance-none ${inputCls()}`}>
          {roles.map((r) => <option key={r}>{r}</option>)}
        </select>
      </Field>
      <Field id="sx-message" label="How can we help?" error={errors.message}>
        <textarea id="sx-message" name="message" value={v.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'sx-message-error' : undefined} className={`min-h-[140px] resize-y py-3 ${inputCls(errors.message)}`} placeholder="Product availability, samples, distribution partnership…" data-lenis-prevent />
      </Field>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-sx-muted" aria-live="polite">
          {sent ? 'Your email app should open with the enquiry ready to send.' : 'Opens your email app with everything filled in.'}
        </p>
        <button type="submit" className="group inline-flex h-14 items-center gap-2 whitespace-nowrap rounded-full bg-sx-brand px-7 font-medium text-sx-on-brand transition-colors hover:bg-sx-ink hover:text-sx-paper active:scale-[0.97]">
          Send enquiry <ArrowRight size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}

function CopyButton({ value, label }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      aria-label={`Copy ${label}`}
      onClick={async () => { try { await navigator.clipboard.writeText(value); setDone(true); setTimeout(() => setDone(false), 1500); } catch { /* blocked */ } }}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-sx-line/15 text-sx-muted transition-colors hover:border-sx-ink hover:text-sx-ink"
    >
      {done ? <Check size={14} weight="bold" /> : <Copy size={14} />}
    </button>
  );
}

export default function Contact() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&z=15&output=embed`;
  return (
    <section id="contact" aria-labelledby="sx-contact-title" className="sx-shell py-28 md:py-40">
      <div className="mb-14 max-w-3xl md:mb-20">
        <Headline lines={['Talk to Syswin.']} className="text-[clamp(2.6rem,6vw,5.4rem)] font-semibold leading-[0.98] text-sx-ink" />
        <h2 id="sx-contact-title" className="sr-only">Contact</h2>
        <Reveal as="p" delay={0.1} className="mt-6 max-w-xl text-lg text-sx-muted">
          For product information, samples, or distribution partnerships, reach the Bengaluru head office directly.
        </Reveal>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="grid gap-6 lg:col-span-5">
          <Reveal className="rounded-sx bg-sx-surface p-6 ring-1 ring-sx-line/10 md:p-8">
            <ul className="divide-y divide-sx-line/10">
              <li className="flex gap-4 pb-6">
                <MapPin size={22} className="mt-0.5 shrink-0 text-sx-brand" aria-hidden />
                <address className="not-italic leading-relaxed text-sx-ink">
                  <span className="block font-medium">{company.name}</span>
                  {company.addressLines.map((l) => <span key={l} className="block text-sx-muted">{l}</span>)}
                </address>
              </li>
              <li className="flex items-center gap-4 py-6">
                <Phone size={22} className="shrink-0 text-sx-brand" aria-hidden />
                <a href={company.phoneHref} className="flex-1 font-medium text-sx-ink hover:text-sx-brand">{company.phone}</a>
                <CopyButton value={company.phone} label="phone number" />
              </li>
              {company.emails.map((e) => (
                <li key={e} className="flex items-center gap-4 py-6 last:pb-0">
                  <EnvelopeSimple size={22} className="shrink-0 text-sx-brand" aria-hidden />
                  <a href={`mailto:${e}`} className="min-w-0 flex-1 truncate font-medium text-sx-ink hover:text-sx-brand">{e}</a>
                  <CopyButton value={e} label="email address" />
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="relative min-h-[300px] overflow-hidden rounded-sx ring-1 ring-sx-line/10">
            <iframe
              title="Map showing the Syswin head office in Banashankari, Bengaluru"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale-[35%]"
            />
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7">
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
