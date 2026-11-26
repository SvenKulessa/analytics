import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, Globe, Menu, X } from 'lucide-react';
import { Language, ModuleId, UI_COPY } from '../data/analyticsData';

export type ActiveModalType = 'learning' | 'pricing' | 'enterprise' | 'profile' | null;

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onSelectModule: (id: ModuleId) => void;
  onOpenModal: (modal: ActiveModalType) => void;
  onScrollToExplorer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onSelectModule,
  onOpenModal,
  onScrollToExplorer,
}) => {
  const [productOpen, setProductOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const copy = UI_COPY[lang].nav;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const productItems: { label: string; desc: string; action: () => void }[] = [
    {
      label: 'Analytics Hub',
      desc: lang === 'DE' ? '7-stufige Analyse- & Evidenz-Engine' : '7-stage analytics & evidence engine',
      action: () => {
        onScrollToExplorer();
        setProductOpen(false);
      },
    },
    {
      label: lang === 'DE' ? 'Datenqualität & Quellen' : 'Data Quality & Sources',
      desc: lang === 'DE' ? '64 Börsenfeeds & 94 % Qualitäts-Score' : '64 exchange feeds & 94% quality score',
      action: () => {
        onSelectModule('datenqualitaet');
        setProductOpen(false);
      },
    },
    {
      label: lang === 'DE' ? 'Multi-Faktor-Scoring' : 'Multi-Factor Scoring',
      desc: lang === 'DE' ? '8.420 bewertete Titel in Echtzeit' : '8,420 scored securities in real time',
      action: () => {
        onSelectModule('scoring');
        setProductOpen(false);
      },
    },
    {
      label: 'Learning Hub',
      desc: lang === 'DE' ? 'Praxisnahe Fallstudien & Methoden' : 'Applied case studies & methods',
      action: () => {
        onOpenModal('learning');
        setProductOpen(false);
      },
    },
  ];

  return (
    <header className="relative z-40 border-b border-slate-800/70 bg-[#040814]/80 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-6 px-5 lg:px-10">
        {/* Left: Brand + Nav */}
        <div className="flex items-center gap-6 lg:gap-8">
          <a
            href="#top"
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-md"
          >
            {/* Custom orbital growth emblem matching mockup */}
            <svg
              viewBox="0 0 40 32"
              className="h-7 w-9 shrink-0"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="brandArc1" x1="0" y1="28" x2="38" y2="4" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="55%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
                <linearGradient id="brandArc2" x1="4" y1="6" x2="36" y2="26" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <ellipse
                cx="20"
                cy="16"
                rx="15"
                ry="8.5"
                transform="rotate(-18 20 16)"
                stroke="url(#brandArc1)"
                strokeWidth="1.6"
                opacity="0.9"
              />
              <ellipse
                cx="20"
                cy="16"
                rx="13"
                ry="6.5"
                transform="rotate(22 20 16)"
                stroke="url(#brandArc2)"
                strokeWidth="1.2"
                opacity="0.75"
              />
              <circle cx="20" cy="16" r="6.5" stroke="#38bdf8" strokeWidth="1" opacity="0.5" />
              <rect x="14.5" y="16" width="2.2" height="5.5" rx="0.6" fill="#38bdf8" />
              <rect x="18.2" y="13" width="2.2" height="8.5" rx="0.6" fill="#60a5fa" />
              <rect x="21.9" y="10" width="2.2" height="11.5" rx="0.6" fill="#f59e0b" />
              <path
                d="M13 18.5L18.5 13.5L22 15.2L27.5 8.5"
                stroke="#fbbf24"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-display text-[15px] font-bold tracking-[0.22em] text-slate-100">
              CAPITAL-AI
            </span>
          </a>

          <span className="hidden h-5 w-px bg-slate-700/70 lg:block" aria-hidden="true" />

          {/* Center-left Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[14px] font-medium">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setProductOpen((prev) => !prev)}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded"
                aria-expanded={productOpen}
              >
                <span>{copy.product}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-150 ${
                    productOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {productOpen && (
                <div className="absolute left-0 top-full mt-3 w-72 rounded-xl border border-slate-700/70 bg-[#0b1224]/95 p-2 shadow-2xl backdrop-blur-xl">
                  {productItems.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={item.action}
                      className="w-full rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-slate-800/70 cursor-pointer"
                    >
                      <div className="text-[13px] font-semibold text-white">{item.label}</div>
                      <div className="mt-0.5 text-[12px] text-slate-400">{item.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => onOpenModal('learning')}
              className="text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded"
            >
              {copy.learn}
            </button>

            <a
              href="#analytics-prozess"
              className="relative py-2 text-white font-semibold whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded"
            >
              {copy.analyticsHub}
              <span
                className="absolute inset-x-0 -bottom-[17px] h-[3px] rounded-full bg-gradient-to-r from-violet-500 via-purple-400 to-fuchsia-400 shadow-[0_0_12px_rgba(168,85,247,0.85)]"
                aria-hidden="true"
              />
            </a>

            <button
              type="button"
              onClick={() => onOpenModal('pricing')}
              className="text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded"
            >
              {copy.pricing}
            </button>

            <button
              type="button"
              onClick={() => onOpenModal('enterprise')}
              className="text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded"
            >
              {copy.enterprise}
            </button>
          </nav>
        </div>

        {/* Right Actions: Language Switcher & Profile Hub */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleLang}
            className="flex items-center gap-1.5 rounded-full border border-slate-700/75 bg-slate-900/70 px-3.5 py-1.5 text-[13px] font-medium text-slate-200 hover:border-slate-500 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            aria-label={lang === 'DE' ? 'Sprache wechseln (DE/EN)' : 'Switch language (DE/EN)'}
          >
            <Globe className="h-3.5 w-3.5 text-slate-400" />
            <span>{lang}</span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => onOpenModal('profile')}
            className="hidden sm:flex items-center gap-2.5 rounded-full border border-violet-500/45 bg-gradient-to-r from-[#131833]/90 to-[#1f163b]/90 py-1 pl-1.5 pr-3.5 text-[13px] font-medium text-slate-100 shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:border-violet-400/75 transition-all whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sky-400/30 to-violet-500/40 border border-slate-400/40 text-[11px] font-bold text-white">
              SK
            </span>
            <span>{copy.profileHub}</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 text-slate-300 hover:text-white lg:hidden cursor-pointer"
            aria-label="Menü öffnen"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-800/80 bg-[#060b19]/95 px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-2 text-sm font-medium">
            <a
              href="#analytics-prozess"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg bg-violet-500/15 px-3 py-2.5 text-white border border-violet-500/30"
            >
              {copy.analyticsHub}
            </a>
            <button
              type="button"
              onClick={() => {
                onOpenModal('learning');
                setMobileMenuOpen(false);
              }}
              className="rounded-lg px-3 py-2.5 text-left text-slate-300 hover:bg-slate-800/60"
            >
              {copy.learn}
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenModal('pricing');
                setMobileMenuOpen(false);
              }}
              className="rounded-lg px-3 py-2.5 text-left text-slate-300 hover:bg-slate-800/60"
            >
              {copy.pricing}
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenModal('enterprise');
                setMobileMenuOpen(false);
              }}
              className="rounded-lg px-3 py-2.5 text-left text-slate-300 hover:bg-slate-800/60"
            >
              {copy.enterprise}
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenModal('profile');
                setMobileMenuOpen(false);
              }}
              className="rounded-lg px-3 py-2.5 text-left text-violet-300 hover:bg-slate-800/60"
            >
              {copy.profileHub}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
