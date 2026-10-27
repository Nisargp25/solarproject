import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { IMG } from '@/assets';
import { usePrefersReducedMotion, useIsMobile } from '@/hooks';

gsap.registerPlugin(ScrollTrigger);

/**
 * Cinematic hero: two full-screen scenes crossfaded on scroll.
 * Scene A = aerial solar farm at golden hour; Scene B = modern
 * Indian home with rooftop solar. Parallax + reveal via GSAP
 * ScrollTrigger. Falls back to static layers for reduced-motion
 * and small screens.
 */
export default function CinematicHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const farmRef = useRef<HTMLDivElement>(null);
  const farmImgRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const homeImgRef = useRef<HTMLDivElement>(null);
  const farmCopyRef = useRef<HTMLDivElement>(null);
  const homeCopyRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrap = wrapRef.current!;
      const farmImg = farmImgRef.current!;
      const homeImg = homeImgRef.current!;
      const farmCopy = farmCopyRef.current!;
      const homeCopy = homeCopyRef.current!;
      const cue = cueRef.current!;

      if (reduced) {
        gsap.set(homeRef.current, { autoAlpha: 0 });
        gsap.set(farmCopy.children, { y: 0, opacity: 1 });
        gsap.set(homeCopy.children, { y: 0, opacity: 1 });
        return;
      }

      // Entrance reveal
      gsap.from(farmCopy.children, {
        y: 38,
        opacity: 0,
        duration: 1.1,
        stagger: 0.14,
        ease: 'power3.out',
        delay: 0.35,
      });
      gsap.from(cue, {
        opacity: 0,
        y: -10,
        duration: 1,
        ease: 'power2.out',
        delay: 1.4,
      });

      // Scroll-linked crossfade: farm -> home
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: mobile ? '+=80%' : '+=110%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(farmImg, { yPercent: -12, scale: 1.1, ease: 'none' }, 0);
      tl.to(farmRef.current, { autoAlpha: 0, ease: 'power2.inOut' }, 0.25);
      tl.to(farmCopy, { autoAlpha: 0, y: -30, ease: 'power2.in' }, 0.15);
      tl.fromTo(
        homeRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: 'power2.inOut' },
        0.35
      );
      tl.fromTo(
        homeImg,
        { scale: 1.16, yPercent: 5 },
        { scale: 1.03, yPercent: 0, ease: 'none' },
        0.35
      );
      tl.fromTo(
        homeCopy.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, ease: 'power3.out', duration: 0.9 },
        0.7
      );

      gsap.to(cue, {
        opacity: 0,
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: '+=10%',
          scrub: true,
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [reduced, mobile]);

  return (
    <section
      ref={wrapRef}
      className="relative h-screen w-full overflow-hidden bg-charcoal-900"
      aria-label="Cinematic introduction"
    >
      {/* Scene A — Aerial solar farm */}
      <div ref={farmRef} className="absolute inset-0">
        <div
          ref={farmImgRef}
          className="absolute inset-0 will-change-transform"
          style={{
            backgroundImage: `url(${IMG.solarFarm})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a1c08]/40 via-transparent to-charcoal-900/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/55 via-transparent to-transparent" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div ref={farmCopyRef} className="max-w-4xl">
            <p className="mb-6 text-xs font-medium uppercase tracking-ultra text-gold-300/90 sm:text-sm">
              Rooftop Solar &middot; Homes &amp; Businesses
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.08] text-ivory-50 sm:text-6xl md:text-7xl lg:text-[5rem]">
              Power Your Home.
              <br />
              Reduce Your Electricity Bill.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-ivory-200/85 sm:text-lg">
              Smart rooftop solar solutions for Indian homes and businesses.
              Get expert guidance, transparent pricing, and a system designed
              around your energy needs.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gold-400 px-8 py-4 text-sm font-semibold text-charcoal-900 transition-all duration-300 hover:bg-gold-300 hover:shadow-[0_8px_40px_-8px_rgba(234,176,73,0.6)]"
              >
                Get Free Solar Consultation
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 rounded-full border border-ivory-200/25 px-8 py-4 text-sm font-medium text-ivory-100 backdrop-blur-sm transition-colors hover:border-ivory-200/50 hover:bg-ivory-200/5"
              >
                Calculate Your Savings
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scene B — Modern Indian home */}
      <div ref={homeRef} className="absolute inset-0 opacity-0">
        <div
          ref={homeImgRef}
          className="absolute inset-0 will-change-transform"
          style={{
            backgroundImage: `url(${IMG.indianHome})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#241404]/30 via-transparent to-charcoal-900/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/65 via-transparent to-charcoal-900/30" />

        <div className="relative z-10 flex h-full items-center px-6 sm:px-12 md:px-20 lg:px-28">
          <div ref={homeCopyRef} className="max-w-xl">
            <p className="mb-5 text-xs font-medium uppercase tracking-ultra text-gold-300/90 sm:text-sm">
              Residential Rooftop Solar
            </p>
            <h2 className="font-display text-3xl font-semibold leading-[1.12] text-ivory-50 sm:text-5xl md:text-6xl">
              Your terrace.
              <br />
              A quieter source of power.
            </h2>
            <p className="mt-6 max-w-md text-base text-ivory-200/85 sm:text-lg">
              A well-designed rooftop solar system can help suitable Indian
              homes generate their own electricity and potentially reduce
              monthly grid bills &mdash; cleanly, for decades.
            </p>
            <a
              href="#residential"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold-300/40 bg-gold-400/10 px-7 py-3.5 text-sm font-semibold text-gold-200 backdrop-blur-sm transition-all duration-300 hover:border-gold-300/80 hover:bg-gold-400/20"
            >
              Explore Residential Solar
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={cueRef}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory-200/60"
      >
        <span className="text-[10px] font-medium uppercase tracking-ultra">
          Scroll to explore
        </span>
        <ChevronDown className="h-5 w-5 animate-bounce" strokeWidth={1.5} />
      </div>
    </section>
  );
}
