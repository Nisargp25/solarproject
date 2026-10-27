import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';
import { IMG } from '@/assets';
import { usePrefersReducedMotion } from '@/hooks';

gsap.registerPlugin(ScrollTrigger);

type Project = {
  title: string;
  location: string;
  capacity: string;
  type: string;
  img: string;
  size: 'lg' | 'md';
  illustrative?: boolean;
};

const PROJECTS: Project[] = [
  {
    title: 'Bungalow Rooftop System',
    location: 'Ahmedabad, Gujarat',
    capacity: '5 kW · Residential',
    type: 'Residential',
    img: IMG.rooftopSolar,
    size: 'lg',
    illustrative: true,
  },
  {
    title: 'Housing Society Common-Area Array',
    location: 'Pune, Maharashtra',
    capacity: '32 kW · Society',
    type: 'Housing Society',
    img: IMG.housingSociety,
    size: 'md',
    illustrative: true,
  },
  {
    title: 'Commercial Showroom Rooftop',
    location: 'Surat, Gujarat',
    capacity: '18 kW · Commercial',
    type: 'Commercial',
    img: IMG.commercial,
    size: 'md',
    illustrative: true,
  },
  {
    title: 'Industrial Warehouse Array',
    location: 'Nashik, Maharashtra',
    capacity: '120 kW · Industrial',
    type: 'Industrial',
    img: IMG.industrial,
    size: 'lg',
    illustrative: true,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>('.proj-card').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 0.9,
          ease: 'power3.out',
          delay: (i % 2) * 0.12,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="projects" ref={sectionRef} className="relative bg-charcoal-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-ultra text-gold-300/90">
              Project Portfolio
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-ivory-50 sm:text-4xl md:text-5xl">
              Rooftop projects across India.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ivory-200/60">
            Illustrative references of the system types we design and install.
            Verified case studies with customer details are shared during your
            consultation.
          </p>
        </div>

        {/* Editorial layout: first large, then two medium, then large */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className={`proj-card group relative overflow-hidden rounded-2xl ${
                p.size === 'lg' ? 'lg:col-span-2' : ''
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  p.size === 'lg' ? 'h-80 sm:h-[26rem]' : 'h-72 sm:h-80'
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${p.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/35 to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span className="rounded-full bg-charcoal-900/70 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold-300 backdrop-blur-sm">
                    {p.type}
                  </span>
                  {p.illustrative && (
                    <span className="rounded-full bg-charcoal-900/70 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-ivory-200/60 backdrop-blur-sm">
                      Illustrative
                    </span>
                  )}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                <h3 className="font-display text-xl font-semibold text-ivory-50 sm:text-2xl">
                  {p.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ivory-200/75">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-gold-300" strokeWidth={1.8} />
                    {p.location}
                  </span>
                  <span className="text-ivory-200/30">|</span>
                  <span>{p.capacity}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
