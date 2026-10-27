import { useMemo, useState } from 'react';
import { Calculator, Sun, TrendingDown, Zap, Battery, AlertTriangle } from 'lucide-react';
import { formatInr, formatInrCompact, formatNumber } from '@/utils';

/**
 * India-specific solar savings calculator.
 *
 * All assumptions are configurable below and are clearly disclosed as
 * estimates. No universal savings claims are made. Subsidy eligibility
 * is described generically and never guaranteed.
 */

type StateInfo = {
  name: string;
  sunHours: number; // peak sun hours/day (approx. state average)
  tariff: number; // ₹/kWh (approx. residential average)
};

// Approximate, clearly-labelled assumptions. These are NOT exact DISCOM
// tariffs — they are illustrative averages for estimation only.
const STATES: StateInfo[] = [
  { name: 'Gujarat', sunHours: 5.3, tariff: 8.0 },
  { name: 'Maharashtra', sunHours: 5.2, tariff: 9.0 },
  { name: 'Rajasthan', sunHours: 5.8, tariff: 7.5 },
  { name: 'Madhya Pradesh', sunHours: 5.4, tariff: 7.8 },
  { name: 'Karnataka', sunHours: 5.3, tariff: 8.2 },
  { name: 'Tamil Nadu', sunHours: 5.2, tariff: 8.0 },
  { name: 'Telangana', sunHours: 5.3, tariff: 8.5 },
  { name: 'Uttar Pradesh', sunHours: 5.2, tariff: 7.0 },
  { name: 'Delhi', sunHours: 5.1, tariff: 8.5 },
  { name: 'Other / Not sure', sunHours: 5.2, tariff: 8.0 },
];

const PROPERTY_TYPES = [
  'Residential — Independent house',
  'Residential — Housing society',
  'Commercial',
  'Industrial',
];

// Configurable assumptions
const SYSTEM_COST_PER_WATT = 55; // ₹/W — illustrative, varies by site & spec
const PERFORMANCE_RATIO = 0.78; // system losses (temp, dust, wiring, inverter)
const OFFSET_PCT = 0.85; // assumed share of consumption met by solar
const PANEL_WATTS_PER_SQFT = 14; // usable-roof capacity density

export default function SavingsCalculator() {
  const [bill, setBill] = useState(3000);
  const [stateIdx, setStateIdx] = useState(0);
  const [property, setProperty] = useState(PROPERTY_TYPES[0]);
  const [consumption, setConsumption] = useState(0); // kWh, 0 = unknown
  const [roofArea, setRoofArea] = useState(0); // sq ft, 0 = unknown

  const state = STATES[stateIdx];
  const isResidential = property.startsWith('Residential — Independent');
  const isSociety = property.startsWith('Residential — Housing society');

  const results = useMemo(() => {
    // Derive monthly consumption: prefer explicit input, else estimate from bill
    const monthlyKwh =
      consumption > 0 ? consumption : bill / state.tariff;
    const annualKwh = monthlyKwh * 12;

    // Suggested system size from consumption
    const annualProductionPerKw =
      state.sunHours * PERFORMANCE_RATIO * 365;
    const sizeFromLoad = (annualKwh * OFFSET_PCT) / annualProductionPerKw;
    // System size limited by roof area, if provided
    const sizeFromRoof = roofArea > 0 ? (roofArea * PANEL_WATTS_PER_SQFT) / 1000 : Infinity;
    const systemKw = Math.max(1, Math.min(sizeFromLoad, sizeFromRoof));
    const roundedKw = Math.round(systemKw * 10) / 10;

    const annualProduction = roundedKw * annualProductionPerKw;
    const coveredKwh = Math.min(annualProduction, annualKwh * OFFSET_PCT);
    const annualSavings = coveredKwh * state.tariff;
    const monthlySavings = annualSavings / 12;

    const systemCost = roundedKw * 1000 * SYSTEM_COST_PER_WATT;

    // Payback (no subsidy assumed here; subsidy noted separately)
    const paybackYears = annualSavings > 0 ? systemCost / annualSavings : 0;
    const twentyYearSavings = annualSavings * 20 - systemCost;

    // Roof area needed (if not provided)
    const roofNeeded = (roundedKw * 1000) / PANEL_WATTS_PER_SQFT;

    // Subsidy eligibility note — only for independent residential
    // PM Surya Ghar tiers (indicative, not guaranteed):
    //   up to 2 kW: ₹30k-78k range; 2-3 kW: ₹78k; 3-10 kW: ₹78k
    // We do NOT assert approval — only flag possible eligibility.
    const subsidyEligible = isResidential;
    const subsidyTier =
      roundedKw <= 2
        ? 'Tier 1 (up to 2 kW)'
        : roundedKw <= 3
        ? 'Tier 2 (2–3 kW)'
        : 'Tier 3 (3–10 kW)';

    return {
      roundedKw,
      annualProduction,
      monthlySavings,
      annualSavings,
      systemCost,
      paybackYears: isFinite(paybackYears) ? paybackYears : 0,
      twentyYearSavings,
      roofNeeded,
      subsidyEligible,
      subsidyTier,
    };
  }, [bill, state, consumption, roofArea, isResidential]);

  return (
    <section
      id="calculator"
      className="relative overflow-hidden bg-charcoal-900 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-sage-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-ultra text-gold-300/90">
            <Calculator className="h-4 w-4" strokeWidth={1.8} />
            Solar Savings Calculator
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-ivory-50 sm:text-4xl md:text-5xl">
            Estimate what rooftop solar could save you.
          </h2>
          <p className="mt-5 text-base text-ivory-200/70 sm:text-lg">
            Enter your monthly bill and state for an indicative estimate of
            system size, cost, savings, and payback. Results are estimates,
            not a final quotation.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_1fr]">
          {/* Inputs */}
          <div className="rounded-2xl border border-ivory-200/8 bg-charcoal-800/70 p-7 sm:p-9">
            <div className="space-y-8">
              {/* Monthly bill */}
              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor="bill" className="text-sm font-medium text-ivory-200/85">
                    Average monthly electricity bill
                  </label>
                  <span className="font-display text-2xl font-semibold text-gold-300">
                    {formatInr(bill)}
                  </span>
                </div>
                <input
                  id="bill"
                  type="range"
                  min={500}
                  max={30000}
                  step={500}
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  className="mt-4 w-full"
                />
                <div className="mt-2 flex justify-between text-[11px] text-ivory-200/40">
                  <span>₹500</span>
                  <span>₹30,000</span>
                </div>
              </div>

              {/* State */}
              <div>
                <label htmlFor="state" className="mb-2 block text-sm font-medium text-ivory-200/85">
                  State / Union Territory
                </label>
                <select
                  id="state"
                  value={stateIdx}
                  onChange={(e) => setStateIdx(Number(e.target.value))}
                  className="calc-input w-full"
                >
                  {STATES.map((s, i) => (
                    <option key={s.name} value={i}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-[11px] text-ivory-200/45">
                  Used for an indicative tariff and sunlight estimate. Actual
                  rates depend on your DISCOM and tariff slab.
                </p>
              </div>

              {/* Property type */}
              <div>
                <label htmlFor="property" className="mb-2 block text-sm font-medium text-ivory-200/85">
                  Property type
                </label>
                <select
                  id="property"
                  value={property}
                  onChange={(e) => setProperty(e.target.value)}
                  className="calc-input w-full"
                >
                  {PROPERTY_TYPES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Optional consumption */}
              <div>
                <label htmlFor="kwh" className="mb-2 block text-sm font-medium text-ivory-200/85">
                  Monthly consumption in kWh <span className="text-ivory-200/40">(optional)</span>
                </label>
                <input
                  id="kwh"
                  type="number"
                  min={0}
                  value={consumption || ''}
                  onChange={(e) => setConsumption(Number(e.target.value))}
                  placeholder="Estimated from bill if left blank"
                  className="calc-input w-full"
                />
              </div>

              {/* Optional roof area */}
              <div>
                <label htmlFor="roof" className="mb-2 block text-sm font-medium text-ivory-200/85">
                  Available rooftop area (sq ft) <span className="text-ivory-200/40">(optional)</span>
                </label>
                <input
                  id="roof"
                  type="number"
                  min={0}
                  value={roofArea || ''}
                  onChange={(e) => setRoofArea(Number(e.target.value))}
                  placeholder="Limits system size if provided"
                  className="calc-input w-full"
                />
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 flex gap-3 rounded-xl border border-gold-400/15 bg-gold-400/5 p-4">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" strokeWidth={1.8} />
              <p className="text-[11px] leading-relaxed text-ivory-200/55">
                Estimates use an indicative tariff of {formatInr(state.tariff)}/kWh,{' '}
                {state.sunHours} peak sun hours/day, ₹{SYSTEM_COST_PER_WATT}/W system cost, and a
                {Math.round(OFFSET_PCT * 100)}% bill offset. Actual savings depend on your
                DISCOM rules, tariff slab, roof orientation, shading, and system performance. This
                is not a quote or a guarantee of results.
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard
              icon={<Sun className="h-5 w-5" strokeWidth={1.8} />}
              label="Indicative system size"
              value={`${results.roundedKw} kW`}
              accent
            />
            <ResultCard
              icon={<TrendingDown className="h-5 w-5" strokeWidth={1.8} />}
              label="Est. monthly savings"
              value={formatInr(results.monthlySavings)}
            />
            <ResultCard
              icon={<TrendingDown className="h-5 w-5" strokeWidth={1.8} />}
              label="Est. annual savings"
              value={formatInr(results.annualSavings)}
              accent
            />
            <ResultCard
              icon={<Zap className="h-5 w-5" strokeWidth={1.8} />}
              label="Est. annual generation"
              value={`${formatNumber(Math.round(results.annualProduction))} kWh`}
            />
            <ResultCard
              icon={<Calculator className="h-5 w-5" strokeWidth={1.8} />}
              label="Indicative system cost"
              value={formatInrCompact(results.systemCost)}
            />
            <ResultCard
              icon={<Battery className="h-5 w-5" strokeWidth={1.8} />}
              label="Est. payback period"
              value={
                results.paybackYears > 0
                  ? `${results.paybackYears.toFixed(1)} yrs`
                  : '—'
              }
            />

            {/* Roof area needed */}
            <div className="rounded-2xl border border-ivory-200/8 bg-charcoal-800/70 p-6 sm:col-span-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ivory-200/65">Approx. rooftop area needed</span>
                <span className="font-semibold text-ivory-50">
                  {formatNumber(Math.round(results.roofNeeded))} sq ft
                </span>
              </div>
              {results.subsidyEligible ? (
                <div className="mt-4 border-t border-ivory-200/8 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ivory-200/65">
                      PM Surya Ghar subsidy tier (residential)
                    </span>
                    <span className="font-semibold text-gold-300">
                      {results.subsidyTier}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-ivory-200/50">
                    Independent residential systems may be eligible for central
                    financial assistance under PM Surya Ghar. Eligibility,
                    approved system requirements, and subsidy amounts depend on
                    current official rules and DISCOM approval.{' '}
                    <a
                      href="#subsidy"
                      className="font-medium text-gold-300 underline-offset-2 hover:underline"
                    >
                      Learn more
                    </a>
                  </p>
                </div>
              ) : (
                <div className="mt-4 border-t border-ivory-200/8 pt-4">
                  <p className="text-[11px] leading-relaxed text-ivory-200/50">
                    {isSociety
                      ? 'Housing-society systems have different net-metering and subsidy rules. We assess these during your consultation.'
                      : 'PM Surya Ghar subsidy applies to residential systems only. Commercial and industrial installations may qualify for accelerated depreciation — discuss with your tax advisor.'}
                  </p>
                </div>
              )}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-7 py-3.5 text-sm font-semibold text-charcoal-900 transition-all duration-300 hover:bg-gold-300 hover:shadow-[0_6px_30px_-8px_rgba(234,176,73,0.55)] sm:col-span-2"
            >
              Get a personalized quote
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .calc-input {
          border-radius: 0.75rem;
          border: 1px solid rgba(240,235,224,0.12);
          background-color: rgba(13,12,10,0.6);
          padding: 0.7rem 0.9rem;
          font-size: 0.875rem;
          color: #f0ebe0;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .calc-input::placeholder { color: rgba(240,235,224,0.35); }
        .calc-input:focus {
          outline: none;
          border-color: rgba(234,176,73,0.6);
          box-shadow: 0 0 0 3px rgba(234,176,73,0.12);
        }
        select.calc-input option { background-color: #1d1a14; }
      `}</style>
    </section>
  );
}

function ResultCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        accent ? 'border-gold-400/30 bg-gold-400/8' : 'border-ivory-200/8 bg-charcoal-800/70'
      }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
          accent ? 'bg-gold-400/15 text-gold-300' : 'bg-ivory-200/5 text-ivory-200/80'
        }`}
      >
        {icon}
      </span>
      <p className="mt-4 text-xs font-medium uppercase tracking-wider text-ivory-200/55">
        {label}
      </p>
      <p className="mt-1.5 font-display text-2xl font-semibold text-ivory-50 sm:text-3xl">
        {value}
      </p>
    </div>
  );
}
