import { useEffect, useState } from 'react';
import { Sun, Menu, X } from 'lucide-react';

const LINKS = [
  { href: '#services', label: 'Solutions' },
  { href: '#process', label: 'Process' },
  { href: '#subsidy', label: 'Subsidy' },
  { href: '#projects', label: 'Projects' },
  { href: '#calculator', label: 'Savings' },
  { href: '#trust', label: 'Why Us' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-charcoal-900/85 backdrop-blur-md shadow-[0_1px_0_0_rgba(240,235,224,0.08)]'
          : 'bg-gradient-to-b from-charcoal-900/40 to-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 md:py-5">
        <a href="#top" className="flex items-center gap-2.5">
          <Sun className="h-6 w-6 text-gold-400" strokeWidth={1.8} />
          <span className="font-display text-lg font-semibold tracking-wide text-ivory-100">
            Surya<span className="text-gold-400">Shakti</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-underline text-sm font-medium text-ivory-200/75 transition-colors hover:text-gold-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a
            href="#contact"
            className="rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-charcoal-900 transition-all duration-300 hover:bg-gold-300 hover:shadow-[0_4px_24px_-6px_rgba(234,176,73,0.5)]"
          >
            Free Consultation
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-ivory-100 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/5 bg-charcoal-900/95 px-6 py-5 backdrop-blur-md lg:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-ivory-200/80 transition-colors hover:bg-white/5 hover:text-gold-300"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-gold-400 px-5 py-3 text-center text-sm font-semibold text-charcoal-900"
              >
                Free Consultation
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
