import { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Send } from 'lucide-react';

type FormState = {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  message: string;
};

const EMPTY: FormState = {
  name: '',
  email: '',
  phone: '',
  propertyType: 'Residential',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim() || !form.email.trim()) {
      setError('Please provide your name and email.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    // Front-end only confirmation. Wiring to a backend is a later step.
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative bg-ink-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left: info */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-ultra text-sun-300/90">
              Get In Touch
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
              Ready to power your property with the sun?
            </h2>
            <p className="mt-5 max-w-md text-base text-white/70 sm:text-lg">
              Tell us about your home or business and we&apos;ll follow up with
              a free site assessment and personalized solar proposal.
            </p>

            <ul className="mt-10 space-y-5">
              <li className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sun-400/10">
                  <Mail className="h-5 w-5 text-sun-300" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/45">
                    Email
                  </p>
                  <a
                    href="mailto:hello@solaragency.example"
                    className="text-sm font-medium text-white/90 hover:text-sun-300"
                  >
                    hello@solaragency.example
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sun-400/10">
                  <Phone className="h-5 w-5 text-sun-300" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/45">
                    Phone
                  </p>
                  <a
                    href="tel:+18005550199"
                    className="text-sm font-medium text-white/90 hover:text-sun-300"
                  >
                    (800) 555-0199
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sun-400/10">
                  <MapPin className="h-5 w-5 text-sun-300" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/45">
                    Headquarters
                  </p>
                  <p className="text-sm font-medium text-white/90">
                    1800 Solar Way, Suite 200, Austin TX
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right: form */}
          <div className="rounded-3xl border border-white/8 bg-ink-800/70 p-7 sm:p-9">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <CheckCircle2
                  className="h-14 w-14 text-sage-400"
                  strokeWidth={1.5}
                />
                <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                  Thank you, {form.name.split(' ')[0]}.
                </h3>
                <p className="mt-3 max-w-sm text-sm text-white/70">
                  Your request has been received. One of our solar specialists
                  will reach out within one business day to schedule your free
                  site assessment.
                </p>
                <button
                  onClick={() => {
                    setForm(EMPTY);
                    setSubmitted(false);
                  }}
                  className="mt-7 text-sm font-semibold text-sun-300 hover:text-sun-200"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name">
                    <input
                      type="text"
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Jane Doe"
                      className="input"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      placeholder="jane@email.com"
                      className="input"
                    />
                  </Field>
                  <Field label="Phone (optional)">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      placeholder="(555) 123-4567"
                      className="input"
                    />
                  </Field>
                  <Field label="Property type">
                    <select
                      value={form.propertyType}
                      onChange={update('propertyType')}
                      className="input"
                    >
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Utility / Farm</option>
                    </select>
                  </Field>
                </div>
                <Field label="Tell us about your property">
                  <textarea
                    value={form.message}
                    onChange={update('message')}
                    rows={4}
                    placeholder="Roof type, approximate square footage, average monthly bill…"
                    className="input resize-none"
                  />
                </Field>

                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sun-400 px-7 py-4 text-sm font-semibold text-ink-900 transition-all duration-300 hover:bg-sun-300 hover:shadow-[0_6px_30px_-8px_rgba(244,183,64,0.55)]"
                >
                  <Send className="h-4 w-4" strokeWidth={2} />
                  Request Free Assessment
                </button>
                <p className="text-center text-[11px] text-white/40">
                  We typically respond within one business day.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(255,255,255,0.10);
          background-color: rgba(7,9,13,0.6);
          padding: 0.7rem 0.9rem;
          font-size: 0.875rem;
          color: #e8eaed;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input::placeholder { color: rgba(255,255,255,0.35); }
        .input:focus {
          outline: none;
          border-color: rgba(244,183,64,0.6);
          box-shadow: 0 0 0 3px rgba(244,183,64,0.12);
        }
        select.input option { background-color: #111922; }
      `}</style>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/55">
        {label}
      </span>
      {children}
    </label>
  );
}
