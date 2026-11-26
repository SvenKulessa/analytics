import React, { useEffect, useState } from 'react';
import {
  Building2,
  Check,
  ChevronRight,
  GraduationCap,
  Shield,
  User,
  X,
} from 'lucide-react';
import { LEARNING_MODULES, Language } from '../data/analyticsData';
import { ActiveModalType } from './Navbar';

interface HubModalsProps {
  lang: Language;
  activeModal: ActiveModalType;
  onClose: () => void;
  onJumpToModule: (moduleId: 'datenqualitaet' | 'scoring' | 'risiko' | 'evidenz') => void;
}

export const HubModals: React.FC<HubModalsProps> = ({
  lang,
  activeModal,
  onClose,
  onJumpToModule,
}) => {
  const [billingAnnual, setBillingAnnual] = useState(true);
  const [enterpriseSent, setEnterpriseSent] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [workEmail, setWorkEmail] = useState('');

  useEffect(() => {
    if (!activeModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeModal, onClose]);

  if (!activeModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="hub-panel relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-700/70 p-6 lg:p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/70 bg-slate-900/80 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label={lang === 'DE' ? 'Schließen' : 'Close'}
        >
          <X className="h-4 w-4" />
        </button>

        {/* Learning Hub Modal */}
        {activeModal === 'learning' && (
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/50 bg-amber-500/20 text-amber-300">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-[22px] font-bold text-white">
                  {lang === 'DE' ? 'CAPITAL-AI Learning Hub' : 'CAPITAL-AI Learning Hub'}
                </h2>
                <p className="text-[13.5px] text-slate-400">
                  {lang === 'DE'
                    ? 'Interaktive Lernpfade direkt verknüpft mit echten Analytics-Hub-Daten.'
                    : 'Interactive learning paths directly linked to live Analytics Hub datasets.'}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {LEARNING_MODULES.map((lesson) => {
                const targetModule =
                  lesson.category === 'Datenqualität'
                    ? 'datenqualitaet'
                    : lesson.category === 'Scoring'
                    ? 'scoring'
                    : lesson.category === 'Risiko'
                    ? 'risiko'
                    : 'evidenz';
                return (
                  <div
                    key={lesson.id}
                    className="hub-subcard flex flex-col justify-between rounded-xl border border-slate-700/60 p-4"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-[12px] text-slate-400">
                        <span>
                          {lesson.category} · {lesson.level}
                        </span>
                        <span className="font-mono-tabular">{lesson.duration}</span>
                      </div>
                      <h3 className="mt-2 font-display text-[15px] font-semibold leading-snug text-white">
                        {lang === 'DE' ? lesson.titleDE : lesson.titleEN}
                      </h3>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-400">
                        {lang === 'DE' ? lesson.descDE : lesson.descEN}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="font-mono-tabular text-[12px] text-amber-300">
                        {lesson.progress} % {lang === 'DE' ? 'abgeschlossen' : 'completed'}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          onJumpToModule(targetModule);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-violet-300 hover:text-white cursor-pointer"
                      >
                        <span>{lang === 'DE' ? 'Im Hub ansehen' : 'Inspect in Hub'}</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pricing Modal */}
        {activeModal === 'pricing' && (
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pr-10">
              <div>
                <h2 className="font-display text-[22px] font-bold text-white">
                  {lang === 'DE' ? 'Transparente Zugangsmodelle' : 'Transparent Plans'}
                </h2>
                <p className="text-[13.5px] text-slate-400">
                  {lang === 'DE'
                    ? 'Klare Limits für Privatanleger, Analysten und institutionelle Teams.'
                    : 'Clear limits for private investors, analysts, and institutional teams.'}
                </p>
              </div>

              <div className="inline-flex items-center rounded-lg border border-slate-700 bg-slate-900/90 p-1 text-[12.5px]">
                <button
                  type="button"
                  onClick={() => setBillingAnnual(true)}
                  className={`rounded-md px-3 py-1 font-medium cursor-pointer ${
                    billingAnnual ? 'bg-violet-600/40 text-white' : 'text-slate-400'
                  }`}
                >
                  {lang === 'DE' ? 'Jährlich (-20 %)' : 'Annual (-20%)'}
                </button>
                <button
                  type="button"
                  onClick={() => setBillingAnnual(false)}
                  className={`rounded-md px-3 py-1 font-medium cursor-pointer ${
                    !billingAnnual ? 'bg-violet-600/40 text-white' : 'text-slate-400'
                  }`}
                >
                  {lang === 'DE' ? 'Monatlich' : 'Monthly'}
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                {
                  name: lang === 'DE' ? 'Für Einsteiger' : 'For Starters',
                  price: '0 €',
                  period: lang === 'DE' ? '/ Monat' : '/ month',
                  features:
                    lang === 'DE'
                      ? ['250 Titel im Screening', 'Basis-Datenqualität & Scoring', '5 Learning-Hub-Module']
                      : ['250 screened securities', 'Core data quality & scoring', '5 Learning Hub modules'],
                },
                {
                  name: lang === 'DE' ? 'Für aktive Investoren' : 'For Active Investors',
                  price: billingAnnual ? '39 €' : '49 €',
                  period: lang === 'DE' ? '/ Monat' : '/ month',
                  featured: true,
                  features:
                    lang === 'DE'
                      ? ['8.420 Titel weltweit', 'Alle 7 Analytics-Prozess-Module', '10.000 Monte-Carlo-Stresstests', 'Vollzugriff Learning Hub']
                      : ['8,420 global assets', 'All 7 Analytics Process modules', '10,000 Monte Carlo stress tests', 'Full Learning Hub access'],
                },
                {
                  name: lang === 'DE' ? 'Für Teams & Desk' : 'For Teams & Desks',
                  price: billingAnnual ? '149 €' : '189 €',
                  period: lang === 'DE' ? '/ Monat' : '/ month',
                  features:
                    lang === 'DE'
                      ? ['5 Team-Sitze inklusive', 'Signierte Daten-Exports & API', 'Individuelle Risikolimits']
                      : ['5 team seats included', 'Signed data exports & API', 'Custom risk thresholds'],
                },
              ].map((tier) => (
                <div
                  key={tier.name}
                  className={`hub-subcard flex flex-col justify-between rounded-xl border p-5 ${
                    tier.featured ? 'border-violet-400/75 shadow-[0_0_24px_rgba(168,85,247,0.2)]' : 'border-slate-700/60'
                  }`}
                >
                  <div>
                    <div className="text-[13px] font-semibold text-violet-300">{tier.name}</div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="font-display text-[28px] font-bold text-white tabular-nums">
                        {tier.price}
                      </span>
                      <span className="text-[12.5px] text-slate-400">{tier.period}</span>
                    </div>
                    <ul className="mt-4 space-y-2.5 text-[13px] text-slate-300">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className={`mt-6 w-full rounded-xl py-2.5 text-[13px] font-semibold transition-colors cursor-pointer ${
                      tier.featured
                        ? 'bg-violet-600 text-white hover:bg-violet-500'
                        : 'border border-slate-700 bg-slate-800/70 text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {lang === 'DE' ? 'Auswählen' : 'Select Plan'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enterprise Modal */}
        {activeModal === 'enterprise' && (
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/50 bg-cyan-500/20 text-cyan-300">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-[22px] font-bold text-white">
                  {lang === 'DE' ? 'CAPITAL-AI für Unternehmen' : 'CAPITAL-AI for Enterprise'}
                </h2>
                <p className="text-[13.5px] text-slate-400">
                  {lang === 'DE'
                    ? 'Dedizierte Datenpipelines, SSO, Audit-Trails und White-Label-Analytics.'
                    : 'Dedicated data pipelines, SSO, audit trails, and white-label analytics.'}
                </p>
              </div>
            </div>

            {enterpriseSent ? (
              <div className="mt-6 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-5 text-emerald-200">
                <div className="font-semibold">
                  {lang === 'DE' ? 'Anfrage vorgemerkt' : 'Request recorded'}
                </div>
                <p className="mt-1 text-[13.5px] text-emerald-100/80">
                  {lang === 'DE'
                    ? `Vielen Dank. Wir melden uns kurzfristig mit technischen Spezifikationen für ${companyName || 'Ihr Team'} unter ${workEmail}.`
                    : `Thank you. We will share technical specifications for ${companyName || 'your team'} at ${workEmail}.`}
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEnterpriseSent(true);
                }}
                className="mt-6 space-y-4"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[12.5px] font-medium text-slate-300">
                      {lang === 'DE' ? 'Unternehmen / Institution' : 'Company / Institution'}
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="z. B. RheinVest Asset Management"
                      className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 text-[13.5px] text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-medium text-slate-300">
                      {lang === 'DE' ? 'Geschäftliche E-Mail' : 'Work Email'}
                    </label>
                    <input
                      type="email"
                      required
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      placeholder="name@unternehmen.de"
                      className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 text-[13.5px] text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[12px] text-slate-400">
                    {lang === 'DE'
                      ? 'EU-Hosting (Frankfurt) · ISO-27001-konforme Infrastruktur'
                      : 'EU Hosting (Frankfurt) · ISO-27001 aligned infrastructure'}
                  </span>
                  <button
                    type="submit"
                    className="rounded-xl bg-violet-600 px-5 py-2.5 text-[13.5px] font-semibold text-white hover:bg-violet-500 transition-colors cursor-pointer"
                  >
                    {lang === 'DE' ? 'Demo anfragen' : 'Request Demo'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Profile Hub Modal */}
        {activeModal === 'profile' && (
          <div>
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-400/60 bg-gradient-to-br from-sky-500/30 to-violet-600/40 text-white font-bold">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-[20px] font-bold text-white">Profile Hub</h2>
                <p className="text-[13px] text-slate-400">
                  {lang === 'DE'
                    ? 'Aktiver Workspace · Analytics & Learning synchronisiert'
                    : 'Active Workspace · Analytics & Learning synced'}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="hub-subcard rounded-xl border border-slate-700/60 p-4">
                <div className="text-[12px] text-slate-400">
                  {lang === 'DE' ? 'Gespeicherte Screener' : 'Saved Screeners'}
                </div>
                <div className="mt-1 font-display text-[22px] font-bold text-white tabular-nums">
                  4
                </div>
              </div>
              <div className="hub-subcard rounded-xl border border-slate-700/60 p-4">
                <div className="text-[12px] text-slate-400">
                  {lang === 'DE' ? 'Lernfortschritt' : 'Learning Progress'}
                </div>
                <div className="mt-1 font-display text-[22px] font-bold text-amber-300 tabular-nums">
                  49 %
                </div>
              </div>
              <div className="hub-subcard rounded-xl border border-slate-700/60 p-4">
                <div className="text-[12px] text-slate-400">
                  {lang === 'DE' ? 'Qualitäts-Schwelle' : 'Quality Gate'}
                </div>
                <div className="mt-1 inline-flex items-center gap-1.5 font-display text-[22px] font-bold text-emerald-300 tabular-nums">
                  <Shield className="h-4 w-4" />
                  <span>≥ 90 %</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
