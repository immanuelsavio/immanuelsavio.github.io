import { Link } from 'react-router-dom';
import { company, specialities } from '../data/catalog';
import { Logo } from './Nav';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-sx-deep text-white">
      <div className="sx-shell grid gap-12 pb-10 pt-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm text-white/65">
            Quality, affordable everyday medicines for the people who prescribe, dispense and depend on them.
          </p>
          <p className="mt-6 inline-flex rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">{company.iso} certified</p>
        </div>

        <nav aria-label="Specialities" className="md:col-span-3 md:col-start-6">
          <h2 className="text-sm font-medium text-white/50">Specialities</h2>
          <ul className="mt-4 space-y-2.5">
            {specialities.map((s) => (
              <li key={s.slug}>
                <Link to={`/syswin/portfolio?cat=${s.slug}`} className="text-white/85 transition-colors hover:text-[#8FA4FF]">{s.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="md:col-span-2">
          <h2 className="text-sm font-medium text-white/50">Company</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link to="/syswin" className="text-white/85 transition-colors hover:text-[#8FA4FF]">Home</Link></li>
            <li><Link to="/syswin/about" className="text-white/85 transition-colors hover:text-[#8FA4FF]">About</Link></li>
            <li><Link to="/syswin/portfolio" className="text-white/85 transition-colors hover:text-[#8FA4FF]">Portfolio</Link></li>
          </ul>
        </nav>

        <address className="not-italic md:col-span-3">
          <h2 className="text-sm font-medium text-white/50">Head office</h2>
          <p className="mt-4 leading-relaxed text-white/85">
            {company.addressLines.map((l) => <span key={l} className="block">{l}</span>)}
          </p>
          <p className="mt-4 space-y-1">
            <a href={company.phoneHref} className="block text-white/85 hover:text-[#8FA4FF]">{company.phone}</a>
            {company.emails.map((e) => <a key={e} href={`mailto:${e}`} className="block text-white/85 hover:text-[#8FA4FF]">{e}</a>)}
          </p>
        </address>
      </div>

      <div className="sx-shell border-t border-white/10 py-8">
        <p className="max-w-4xl text-xs leading-relaxed text-white/45">
          Product information is shown for representative portfolio purposes only and is intended for healthcare professionals.
          Refer to approved prescribing information and applicable regulatory guidance before use. Concept site, not an official
          regulated product site unless approved by Syswin Pharmaceuticals.
        </p>
        <p className="mt-4 text-xs text-white/45">&copy; {new Date().getFullYear()} {company.name}</p>
      </div>

      <p aria-hidden className="sx-display pointer-events-none select-none whitespace-nowrap px-4 text-center text-[21vw] font-bold leading-[0.75] text-white/[0.04]">
        Syswin
      </p>
    </footer>
  );
}
