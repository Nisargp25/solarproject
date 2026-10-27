import { ExternalLink, Home, Building2, ShieldCheck } from 'lucide-react';
import { IMG } from '@/assets';

const PM_SURYA_GHAR_URL = 'https://pmsuryaghar.gov.in/';

/**
 * Government subsidy information for India's PM Surya Ghar:
 * Muft Bijli Yojana. Explains the residential scheme, distinguishes it
 * from commercial/industrial, and links to the official portal. Does not
 * guarantee eligibility, approval, or free electricity.
 */
export default function SubsidyInfo() {
  return (
    <section id="subsidy" className="relative overflow-hidden bg-charcoal-800 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="relative overflow-hidden rounded-2xl">
            <div className="relative h-72 overflow-hidden sm:h-96">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${IMG.residentialInstall})` }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-ultra text-gold-300/90">
              Government Subsidy
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-ivory-50 sm:text-4xl md:text-5xl">
              PM Surya Ghar: Muft Bijli Yojana
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ivory-200/75 sm:text-lg">
              PM Surya Ghar is the Government of India&apos;s residential
              rooftop solar scheme. Eligible households may receive central
              financial assistance based on the installed system capacity,
              along with the possibility of reduced monthly electricity bills
              through net-metering.
            </p>

            {/* Who it applies to */}
            <div className="mt-8 space-y-4">
              <div className="flex gap-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gold-400/10">
                  <Home className="h-5 w-5 text-gold-300" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-ivory-50">
                    Residential households
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ivory-200/65">
                    The subsidy is intended for residential rooftop solar
                    systems. Eligibility, approved system sizes, and subsidy
                    amounts depend on current official rules and your
                    DISCOM&apos;s approval process.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-ivory-200/5">
                  <Building2 className="h-5 w-5 text-ivory-200/70" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-ivory-50">
                    Commercial &amp; industrial
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ivory-200/65">
                    Commercial, industrial, and institutional installations are
                    generally outside the residential subsidy scheme. Some may
                    qualify for accelerated depreciation — please consult a
                    qualified tax advisor.
                  </p>
                </div>
              </div>
            </div>

            {/* Important note */}
            <div className="mt-8 flex gap-3 rounded-xl border border-ivory-200/10 bg-charcoal-900/50 p-4">
              <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" strokeWidth={1.8} />
              <p className="text-[12px] leading-relaxed text-ivory-200/60">
                We do not guarantee subsidy eligibility, government approval,
                or free electricity. Eligibility, approved system requirements,
                subsidy amounts, and application processes depend on the
                current official rules published on the portal. Always confirm
                the latest details before proceeding.
              </p>
            </div>

            {/* CTA to official portal */}
            <a
              href={PM_SURYA_GHAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-400 px-7 py-3.5 text-sm font-semibold text-charcoal-900 transition-all duration-300 hover:bg-gold-300 hover:shadow-[0_6px_30px_-8px_rgba(234,176,73,0.55)]"
            >
              Visit the official PM Surya Ghar portal
              <ExternalLink className="h-4 w-4" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
