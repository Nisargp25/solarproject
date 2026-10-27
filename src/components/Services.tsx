import { IMG } from '@/assets';
import { Home, Building2, Users, Factory } from 'lucide-react';

type Solution = {
  id: string;
  icon: typeof Home;
  title: string;
  body: string;
  img: string;
  points: string[];
};

const SOLUTIONS: Solution[] = [
  {
    id: 'residential',
    icon: Home,
    title: 'Residential Rooftop Solar',
    body: 'Custom rooftop systems for independent houses, bungalows, and villas — designed around your roof area, orientation, and monthly electricity consumption.',
    img: IMG.rooftopSolar,
    points: ['1–10 kW typical range', 'Net-metering support', 'Optional battery backup'],
  },
  {
    id: 'society',
    icon: Users,
    title: 'Housing Society Solar',
    body: 'Shared rooftop systems for apartment complexes and residential societies — allocate generation across common areas and individual flats with proper metering.',
    img: IMG.housingSociety,
    points: ['Common-area load first', 'Group net-metering guidance', 'Per-flat allocation'],
  },
  {
    id: 'commercial',
    icon: Building2,
    title: 'Commercial Rooftop Solar',
    body: 'Rooftop arrays for shops, offices, showrooms, and small businesses looking to reduce daytime electricity costs and demonstrate environmental responsibility.',
    img: IMG.commercial,
    points: ['Higher daytime offset', 'Accelerated depreciation note', 'Remote monitoring'],
  },
  {
    id: 'industrial',
    icon: Factory,
    title: 'Industrial Solar Solutions',
    body: 'Larger rooftop and open-access installations for factories, warehouses, and industrial units with significant energy loads and demand-charge exposure.',
    img: IMG.industrial,
    points: ['High-voltage integration', 'Load-matching design', 'Performance reporting'],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-charcoal-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Intro */}
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-ultra text-gold-300/90">
            Rooftop Solar Solutions
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-ivory-50 sm:text-4xl md:text-5xl">
            Solar for every kind of roof.
          </h2>
          <p className="mt-5 text-base text-ivory-200/70 sm:text-lg">
            From individual homes to housing societies and industrial units,
            we design, install, and maintain rooftop systems suited to Indian
            conditions, tariffs, and DISCOM rules.
          </p>
        </div>

        {/* Editorial alternating layout */}
        <div className="mt-16 space-y-20 sm:space-y-28">
          {SOLUTIONS.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              {/* Image */}
              <div
                className={`group relative overflow-hidden rounded-2xl ${
                  i % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <div className="relative h-64 overflow-hidden sm:h-80 lg:h-[26rem]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${s.img})` }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 via-transparent to-transparent" />
                </div>
              </div>

              {/* Copy */}
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-400/10">
                  <s.icon className="h-5 w-5 text-gold-300" strokeWidth={1.8} />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-ivory-50 sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory-200/70 sm:text-base">
                  {s.body}
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2 text-sm text-ivory-200/65"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 transition-colors hover:text-gold-200"
                >
                  Request a consultation
                  <span>&rarr;</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
