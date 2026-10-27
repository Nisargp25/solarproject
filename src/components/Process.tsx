import { FileText, ScanLine, Sun, ClipboardList, Hammer, Headphones } from 'lucide-react';

const STEPS = [
  {
    icon: FileText,
    title: 'Electricity-bill assessment',
    body: 'We review your recent electricity bills and consumption pattern to understand your load and identify where solar can help.',
  },
  {
    icon: ScanLine,
    title: 'Rooftop suitability assessment',
    body: 'A site visit checks roof area, orientation, shading, and structural condition to confirm whether your terrace is suitable for solar.',
  },
  {
    icon: Sun,
    title: 'Solar system recommendation',
    body: 'Based on your consumption and roof, we recommend a system size, panel and inverter options, and whether a battery makes sense.',
  },
  {
    icon: ClipboardList,
    title: 'Quotation & planning',
    body: 'You receive a transparent quotation with system cost, expected generation, and indicative savings. No hidden charges.',
  },
  {
    icon: Hammer,
    title: 'Installation & commissioning',
    body: 'Our certified crew installs the system, completes electrical work, and coordinates net-metering approval with your DISCOM.',
  },
  {
    icon: Headphones,
    title: 'After-sales support',
    body: 'Ongoing monitoring, maintenance, and support keep your system performing — with a clear point of contact for any issues.',
  },
];

export default function Process() {
  return (
    <section id="process" className="relative bg-charcoal-800 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-ultra text-gold-300/90">
            How It Works
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-ivory-50 sm:text-4xl md:text-5xl">
            A clear, step-by-step journey.
          </h2>
          <p className="mt-5 text-base text-ivory-200/70 sm:text-lg">
            No pressure and no jargon. Here is what to expect from the first
            conversation to long-term support.
          </p>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ivory-200/8 bg-ivory-200/8 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="group relative bg-charcoal-800 p-7 transition-colors duration-300 hover:bg-charcoal-700 sm:p-9"
            >
              <div className="flex items-center gap-4">
                <span className="font-display text-2xl font-semibold text-gold-400/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/10 transition-colors group-hover:bg-gold-400/15">
                  <s.icon className="h-5 w-5 text-gold-300" strokeWidth={1.8} />
                </span>
              </div>
              <h3 className="mt-5 text-base font-semibold text-ivory-50">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory-200/65">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
