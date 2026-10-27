import { Sun } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-ivory-200/8 bg-charcoal-900 py-14">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <Sun className="h-6 w-6 text-gold-400" strokeWidth={1.8} />
              <span className="font-display text-lg font-semibold tracking-wide text-ivory-100">
                Surya<span className="text-gold-400">Shakti</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory-200/55">
              Rooftop solar design, installation, and after-sales support for
              Indian homes, housing societies, and businesses.
            </p>
            <p className="mt-5 text-xs text-ivory-200/40">
              Serving select cities in Gujarat &amp; Maharashtra. Service areas
              are expanded periodically — please confirm coverage during your
              consultation.
            </p>
          </div>

          <FooterCol
            title="Solutions"
            links={[
              { label: 'Residential Solar', href: '#residential' },
              { label: 'Housing Society', href: '#society' },
              { label: 'Commercial Solar', href: '#commercial' },
              { label: 'Industrial Solar', href: '#industrial' },
            ]}
          />
          <FooterCol
            title="Explore"
            links={[
              { label: 'Our Process', href: '#process' },
              { label: 'PM Surya Ghar Subsidy', href: '#subsidy' },
              { label: 'Projects', href: '#projects' },
              { label: 'Savings Calculator', href: '#calculator' },
              { label: 'Why Us', href: '#trust' },
            ]}
          />
          <FooterCol
            title="Contact"
            links={[
              { label: '+91 98XXX XXXXX', href: 'tel:+919800000000' },
              { label: 'care@suryashakti.in', href: 'mailto:care@suryashakti.in' },
              { label: 'Ahmedabad · Pune', href: '#contact' },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ivory-200/8 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-ivory-200/40">
            © {new Date().getFullYear()} SuryaShakti Solar. All rights reserved.
          </p>
          <p className="max-w-xl text-xs text-ivory-200/40">
            All savings, payback, and subsidy references are estimates only and
            not a guarantee of performance, eligibility, or final pricing.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-ivory-200/45">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-sm text-ivory-200/65 transition-colors hover:text-gold-300"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
