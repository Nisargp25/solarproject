import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMG } from '@/assets';
import { usePrefersReducedMotion } from '@/hooks';

gsap.registerPlugin(ScrollTrigger);

type Label = {
  id: string;
  title: string;
  body: string;
  top: string;
  left: string;
};

const LABELS: Label[] = [
  {
    id: 'panels',
    title: 'Solar Panels',
    body: 'Monocrystalline PV modules convert sunlight into DC electricity on your rooftop.',
    top: '30%',
    left: '54%',
  },
  {
    id: 'inverter',
    title: 'Inverter',
    body: 'Converts the panels’ DC output into AC power that your home can use.',
    top: '56%',
    left: '28%',
  },
  {
    id: 'meter',
    title: 'Net Meter',
    body: 'Exports surplus units to the grid and imports them when needed, per your DISCOM rules.',
    top: '68%',
    left: '70%',
  },
];

/**
 * Interactive rooftop highlight. A high-quality rooftop image carries a
 * subtle animated sunlight sweep across the panels, with refined labels
 * identifying the key components of a residential solar system. Tapping a
 * label toggles its description on mobile.
 */
export default function SolarHighlight() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const img = imgRef.current!;

      if (reduced) {
        gsap.set(img, { scale: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        img,
        { yPercent: -6, scale: 1.1 },
        {
          yPercent: 6,
          scale: 1.04,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>('.hl-label').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.7,
          y: 12,
          duration: 0.6,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.25,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] w-full overflow-hidden bg-charcoal-900"
      aria-label="Interactive solar system highlight"
    >
      <div
        ref={imgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${IMG.rooftopClose})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 42%',
        }}
      />
      <div className="sun-sweep absolute left-0 right-0 top-[16%] h-[32%] overflow-hidden" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/55 via-transparent to-charcoal-900/88" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/40 via-transparent to-charcoal-900/40" />

      {/* Intro copy */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 sm:px-12 md:pt-28">
        <p className="mb-3 text-xs font-medium uppercase tracking-ultra text-gold-300/90">
          How It Works
        </p>
        <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-ivory-50 sm:text-4xl md:text-5xl">
          A closer look at your rooftop energy system.
        </h2>
        <p className="mt-4 max-w-xl text-sm text-ivory-200/70 sm:text-base">
          Tap the highlighted points to see how each component turns sunlight
          into power for your home.
        </p>
      </div>

      {/* Labels */}
      {LABELS.map((label) => {
        const isActive = active === label.id;
        return (
          <button
            key={label.id}
            className="hl-label group absolute z-20 -translate-x-1/2 -translate-y-1/2 text-left"
            style={{ top: label.top, left: label.left }}
            onClick={() => setActive(isActive ? null : label.id)}
            aria-label={label.title}
          >
            <span className="relative flex h-6 w-6 items-center justify-center">
              <span className="soft-pulse absolute inline-flex h-full w-full rounded-full bg-gold-400/40" />
              <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-charcoal-900 bg-gold-400 shadow-[0_0_12px_rgba(234,176,73,0.7)] transition-transform duration-300 group-hover:scale-125" />
            </span>
            <span className="absolute left-3 top-3 h-8 w-px bg-gradient-to-b from-gold-400/80 to-transparent" />
            <span
              className={`absolute left-5 top-9 w-56 rounded-xl border border-ivory-200/10 bg-charcoal-800/90 p-3.5 backdrop-blur-md transition-all duration-300 ${
                isActive
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-1 opacity-0 sm:pointer-events-auto sm:translate-y-0 sm:opacity-100'
              }`}
            >
              <span className="block text-xs font-semibold uppercase tracking-wider text-gold-300">
                {label.title}
              </span>
              <span className="mt-1.5 block text-xs leading-relaxed text-ivory-200/75">
                {label.body}
              </span>
            </span>
          </button>
        );
      })}
    </section>
  );
}
