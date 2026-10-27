import { Award, Users, Zap, Star } from 'lucide-react';

const STATS = [
  { icon: Zap, value: '48 MW+', label: 'Installed capacity' },
  { icon: Users, value: '1,200+', label: 'Projects completed' },
  { icon: Award, value: '15 yrs', label: 'Industry experience' },
  { icon: Star, value: '4.9/5', label: 'Average client rating' },
];

const TESTIMONIALS = [
  {
    quote:
      'From the first site visit to flipping the switch, the team was meticulous and transparent. Our electric bill dropped dramatically the very first month.',
    name: 'Dana Whitfield',
    role: 'Homeowner, Austin TX',
  },
  {
    quote:
      'They modeled our warehouse roof and built a 480 kW array that cut our energy costs by more than half. Clean install, excellent reporting.',
    name: 'Marcus Lee',
    role: 'Operations Director, Harbor Logistics',
  },
  {
    quote:
      'Professional, knowledgeable, and genuinely honest about whether solar made sense for us. It did — and the monitoring has been flawless.',
    name: 'Priya Nair',
    role: 'Homeowner, Long Beach CA',
  },
];

export default function Trust() {
  return (
    <section id="trust" className="relative bg-ink-800 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-ultra text-sun-300/90">
            Why SolarAgency
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
            Built on trust, engineered to last.
          </h2>
        </div>

        {/* Stats */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/8 bg-ink-900/50 p-7 text-center"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sun-400/10">
                <s.icon className="h-6 w-6 text-sun-300" strokeWidth={1.6} />
              </span>
              <p className="mt-5 font-display text-3xl font-semibold text-white sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1.5 text-sm text-white/60">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-white/8 bg-ink-900/50 p-7"
            >
              <div className="flex gap-1 text-sun-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-white/80">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-white/8 pt-4">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="mt-0.5 text-xs text-white/55">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
