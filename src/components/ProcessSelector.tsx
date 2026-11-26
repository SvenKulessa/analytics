import React from 'react';
import {
  AlertTriangle,
  BarChart2,
  Database,
  GraduationCap,
  Layers,
  Newspaper,
  Shield,
} from 'lucide-react';
import {
  Language,
  ModuleId,
  MODULES_DE,
  MODULES_EN,
  UI_COPY,
} from '../data/analyticsData';

interface ProcessSelectorProps {
  lang: Language;
  activeModule: ModuleId;
  hoveredModule?: ModuleId | null;
  onSelectModule: (id: ModuleId) => void;
  onHoverModule?: (id: ModuleId | null) => void;
}

const MODULE_ORDER: ModuleId[] = [
  'quellen',
  'datenqualitaet',
  'scoring',
  'risiko',
  'evidenz',
  'marktnews',
  'lernen',
];

const MODULE_ICON_MAP: Record<ModuleId, React.ComponentType<{ className?: string }>> = {
  quellen: Database,
  datenqualitaet: Shield,
  scoring: BarChart2,
  risiko: AlertTriangle,
  evidenz: Layers,
  marktnews: Newspaper,
  lernen: GraduationCap,
};

const MODULE_STYLE_MAP: Record<
  ModuleId,
  {
    inactiveBorder: string;
    hoverGlow: string;
    iconColor: string;
    activeSurface: string;
    pointerFill: string;
  }
> = {
  quellen: {
    inactiveBorder: 'border-emerald-500/35 hover:border-emerald-400/80',
    hoverGlow: 'hover:shadow-[0_0_22px_rgba(16,185,129,0.34)]',
    iconColor: 'text-emerald-300',
    activeSurface:
      'border-emerald-400/90 bg-gradient-to-b from-emerald-500/25 to-emerald-950/60 shadow-[0_0_26px_rgba(16,185,129,0.36)]',
    pointerFill: 'bg-emerald-400',
  },
  datenqualitaet: {
    inactiveBorder: 'border-violet-500/35 hover:border-violet-400/85',
    hoverGlow: 'hover:shadow-[0_0_22px_rgba(168,85,247,0.36)]',
    iconColor: 'text-violet-300',
    activeSurface:
      'border-violet-400/95 bg-gradient-to-b from-violet-600/35 via-purple-700/25 to-violet-950/75 shadow-[0_0_28px_rgba(168,85,247,0.42)]',
    pointerFill: 'bg-violet-400',
  },
  scoring: {
    inactiveBorder: 'border-sky-500/30 hover:border-blue-400/80',
    hoverGlow: 'hover:shadow-[0_0_22px_rgba(59,130,246,0.34)]',
    iconColor: 'text-sky-300',
    activeSurface:
      'border-blue-400/90 bg-gradient-to-b from-blue-600/30 to-blue-950/70 shadow-[0_0_26px_rgba(59,130,246,0.36)]',
    pointerFill: 'bg-blue-400',
  },
  risiko: {
    inactiveBorder: 'border-cyan-500/30 hover:border-cyan-400/80',
    hoverGlow: 'hover:shadow-[0_0_22px_rgba(6,182,212,0.34)]',
    iconColor: 'text-cyan-300',
    activeSurface:
      'border-cyan-400/90 bg-gradient-to-b from-cyan-600/25 to-cyan-950/70 shadow-[0_0_26px_rgba(6,182,212,0.36)]',
    pointerFill: 'bg-cyan-400',
  },
  evidenz: {
    inactiveBorder: 'border-indigo-400/30 hover:border-sky-400/80',
    hoverGlow: 'hover:shadow-[0_0_22px_rgba(96,165,250,0.34)]',
    iconColor: 'text-sky-200',
    activeSurface:
      'border-sky-400/90 bg-gradient-to-b from-sky-600/25 to-slate-900/80 shadow-[0_0_26px_rgba(96,165,250,0.36)]',
    pointerFill: 'bg-sky-400',
  },
  marktnews: {
    inactiveBorder: 'border-amber-500/35 hover:border-amber-400/80',
    hoverGlow: 'hover:shadow-[0_0_22px_rgba(245,158,11,0.34)]',
    iconColor: 'text-amber-300',
    activeSurface:
      'border-amber-400/90 bg-gradient-to-b from-amber-500/25 to-amber-950/70 shadow-[0_0_26px_rgba(245,158,11,0.36)]',
    pointerFill: 'bg-amber-400',
  },
  lernen: {
    inactiveBorder: 'border-yellow-500/35 hover:border-yellow-400/80',
    hoverGlow: 'hover:shadow-[0_0_22px_rgba(234,179,8,0.34)]',
    iconColor: 'text-yellow-300',
    activeSurface:
      'border-yellow-400/90 bg-gradient-to-b from-yellow-500/25 to-amber-950/70 shadow-[0_0_26px_rgba(234,179,8,0.36)]',
    pointerFill: 'bg-yellow-400',
  },
};

export const ProcessSelector: React.FC<ProcessSelectorProps> = ({
  lang,
  activeModule,
  hoveredModule,
  onSelectModule,
  onHoverModule,
}) => {
  const modules = lang === 'DE' ? MODULES_DE : MODULES_EN;
  const copy = UI_COPY[lang].processBar;

  return (
    <section
      id="analytics-prozess"
      className="mx-auto max-w-[1440px] px-5 lg:px-10"
      aria-label={copy.kicker}
    >
      <div className="hub-panel rounded-2xl border border-slate-700/50 px-5 py-4 lg:px-6 lg:py-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          {/* Left Label */}
          <div className="shrink-0 xl:max-w-[215px]">
            <div className="font-display text-[11px] font-semibold tracking-[0.22em] text-slate-300/90 uppercase">
              {copy.kicker}
            </div>
            <p className="mt-1 text-[13px] leading-snug text-slate-400">
              {copy.subtitle}
            </p>
          </div>

          {/* 7 Interactive Module Buttons */}
          <div
            role="tablist"
            aria-label={copy.kicker}
            className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7 flex-1"
          >
            {MODULE_ORDER.map((id) => {
              const mod = modules[id];
              const Icon = MODULE_ICON_MAP[id];
              const styles = MODULE_STYLE_MAP[id];
              const isActive = activeModule === id;
              const isHovered = hoveredModule === id;

              return (
                <button
                  key={id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => onSelectModule(id)}
                  onMouseEnter={() => onHoverModule?.(id)}
                  onMouseLeave={() => onHoverModule?.(null)}
                  className={`relative flex items-center justify-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-[13.5px] font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                    isActive
                      ? `${styles.activeSurface} text-white`
                      : `bg-[#0a1226]/80 text-slate-200 ${styles.inactiveBorder} ${styles.hoverGlow} ${
                          isHovered ? 'text-white -translate-y-0.5' : ''
                        }`
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${styles.iconColor}`} />
                  <span className="truncate">{mod.name}</span>

                  {/* Active downward indicator matching mockup */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className={`hidden lg:block absolute -bottom-[7px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 ${styles.pointerFill} shadow-[0_0_10px_currentColor]`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
