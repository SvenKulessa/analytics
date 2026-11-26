import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BarChart2,
  Check,
  CheckCircle2,
  CheckSquare,
  Database,
  GraduationCap,
  Info,
  Layers,
  Newspaper,
  Paintbrush,
  Shield,
  TrendingUp,
  XCircle,
} from 'lucide-react';
import {
  Language,
  ModuleContent,
  ModuleId,
  MODULES_DE,
  MODULES_EN,
  ProcessStep,
} from '../data/analyticsData';

interface ModuleDetailPanelProps {
  lang: Language;
  activeModule: ModuleId;
}

const MODULE_HERO_ICONS: Record<ModuleId, React.ComponentType<{ className?: string }>> = {
  quellen: Database,
  datenqualitaet: Shield,
  scoring: BarChart2,
  risiko: AlertTriangle,
  evidenz: Layers,
  marktnews: Newspaper,
  lernen: GraduationCap,
};

const STEP_ICONS: Record<ProcessStep['iconKey'], React.ComponentType<{ className?: string }>> = {
  database: Database,
  checkSquare: CheckSquare,
  brush: Paintbrush,
  layers: Layers,
  barChart: BarChart2,
  shield: Shield,
  alert: AlertTriangle,
  news: Newspaper,
  grad: GraduationCap,
};

export const ModuleDetailPanel: React.FC<ModuleDetailPanelProps> = ({ lang, activeModule }) => {
  const modules = lang === 'DE' ? MODULES_DE : MODULES_EN;
  const mod: ModuleContent = modules[activeModule];

  const [selectedStepIdx, setSelectedStepIdx] = useState<number>(mod.activeStepIndex);
  const [openInfoCard, setOpenInfoCard] = useState<'score' | 'volume' | 'checks' | null>(null);
  const [hoveredSparkIdx, setHoveredSparkIdx] = useState<number | null>(null);

  useEffect(() => {
    setSelectedStepIdx(mod.activeStepIndex);
    setOpenInfoCard(null);
    setHoveredSparkIdx(null);
  }, [activeModule, mod.activeStepIndex]);

  const HeroIcon = MODULE_HERO_ICONS[activeModule];

  // SVG Donut Calculations
  const donutSize = 112;
  const strokeWidth = 10;
  const radius = (donutSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - mod.scoreCard.progressPercent / 100);

  // SVG Sparkline Calculations
  const sparkW = 260;
  const sparkH = 66;
  const padX = 10;
  const padY = 10;
  const values = mod.volumeCard.series.map((p) => p.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = Math.max(maxVal - minVal, 1);

  const coords = mod.volumeCard.series.map((pt, idx) => {
    const x = padX + (idx / (mod.volumeCard.series.length - 1)) * (sparkW - padX * 2);
    const y = sparkH - padY - ((pt.value - minVal) / range) * (sparkH - padY * 2);
    return { x, y, ...pt };
  });

  const linePath = coords
    .map((c, idx) => `${idx === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
    .join(' ');

  const areaPath = `${linePath} L ${coords[coords.length - 1].x.toFixed(1)} ${sparkH} L ${coords[0].x.toFixed(1)} ${sparkH} Z`;

  const selectedStep = mod.steps[selectedStepIdx] ?? mod.steps[0];

  return (
    <section
      className="mx-auto mt-4 max-w-[1440px] px-5 lg:px-10"
      role="tabpanel"
      aria-label={mod.name}
    >
      <div
        className="hub-panel relative overflow-hidden rounded-2xl border border-slate-700/55 p-5 lg:p-7"
        style={{
          boxShadow: `inset 0 1px 0 rgba(148,163,184,0.14), 0 24px 60px -22px rgba(2,6,23,0.9), 0 1px 24px -10px ${mod.accentGlow}`,
        }}
      >
        {/* Bottom subtle accent glow border matching mockup */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 bottom-0 h-[1.5px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${mod.accentHex}, #38bdf8, transparent)`,
            opacity: 0.75,
          }}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
          {/* Left Summary Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border bg-gradient-to-br ${mod.badgeBgClass}`}
                  style={{
                    boxShadow: `0 0 24px -4px ${mod.accentGlow}`,
                  }}
                >
                  <HeroIcon className="h-7 w-7" />
                </div>

                <div>
                  <h2 className="font-display text-[26px] font-bold leading-tight tracking-tight text-white">
                    {mod.name}
                  </h2>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-slate-300/90">
                    {mod.shortDesc}
                  </p>
                </div>
              </div>

              <ul className="mt-7 space-y-3.5">
                {mod.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-[13.5px] leading-snug text-slate-200/95">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: `${mod.accentHex}29`,
                        border: `1px solid ${mod.accentHex}80`,
                      }}
                    >
                      <Check className="h-3 w-3" style={{ color: mod.accentHex }} />
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Dashboard Grid */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Top 3 Metric Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Card 1: Donut Score Breakdown */}
              <div className="hub-subcard relative rounded-xl border border-slate-700/55 p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[14px] font-semibold text-slate-100 truncate">
                    {mod.scoreCard.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenInfoCard((prev) => (prev === 'score' ? null : 'score'))
                    }
                    className="rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors cursor-pointer"
                    aria-label={`${mod.scoreCard.title} Info`}
                  >
                    <Info className="h-3.5 w-3.5" />
                  </button>
                </div>

                {openInfoCard === 'score' && (
                  <div className="mt-2 rounded-lg border border-slate-700/70 bg-slate-900/95 p-2.5 text-[12px] leading-relaxed text-slate-300">
                    {mod.scoreCard.info}
                  </div>
                )}

                <div className="mt-3 flex items-center gap-3.5">
                  <div className="relative h-[104px] w-[104px] shrink-0">
                    <svg
                      viewBox={`0 0 ${donutSize} ${donutSize}`}
                      className="h-full w-full -rotate-90"
                    >
                      <defs>
                        <linearGradient id={`donutGrad-${activeModule}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor={mod.accentHex} />
                          <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx={donutSize / 2}
                        cy={donutSize / 2}
                        r={radius}
                        fill="none"
                        stroke="rgba(51, 65, 85, 0.55)"
                        strokeWidth={strokeWidth}
                      />
                      <circle
                        cx={donutSize / 2}
                        cy={donutSize / 2}
                        r={radius}
                        fill="none"
                        stroke={`url(#donutGrad-${activeModule})`}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        className="transition-all duration-300"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-display text-[21px] font-bold leading-none text-white tabular-nums">
                        {mod.scoreCard.primaryValue}
                      </span>
                      <span className="mt-1 text-[11px] text-slate-400">
                        {mod.scoreCard.primarySubLabel}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-2 min-w-0">
                    {mod.scoreCard.breakdown.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-2 text-[12.5px]"
                      >
                        <span className="flex items-center gap-2 text-slate-300 truncate">
                          <span
                            className="h-2 w-2 rounded-full shrink-0"
                            style={{ backgroundColor: item.color }}
                            aria-hidden="true"
                          />
                          <span className="truncate">{item.label}</span>
                        </span>
                        <span className="font-mono-tabular text-[12.5px] font-semibold text-slate-100 shrink-0">
                          {item.value} {item.unit ?? '%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 2: Volume & Interactive Sparkline */}
              <div className="hub-subcard relative rounded-xl border border-slate-700/55 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-[14px] font-semibold text-slate-100 truncate">
                      {mod.volumeCard.title}
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenInfoCard((prev) => (prev === 'volume' ? null : 'volume'))
                      }
                      className="rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors cursor-pointer"
                      aria-label={`${mod.volumeCard.title} Info`}
                    >
                      <Info className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {openInfoCard === 'volume' && (
                    <div className="mt-2 rounded-lg border border-slate-700/70 bg-slate-900/95 p-2.5 text-[12px] leading-relaxed text-slate-300">
                      {mod.volumeCard.info}
                    </div>
                  )}

                  <div className="mt-2.5 flex items-baseline justify-between gap-2">
                    <span className="font-display text-[26px] font-bold tracking-tight text-white tabular-nums">
                      {hoveredSparkIdx !== null
                        ? mod.volumeCard.series[hoveredSparkIdx].display
                        : mod.volumeCard.value}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md border border-emerald-400/35 bg-emerald-500/15 px-2 py-0.5 font-mono-tabular text-[12px] font-semibold text-emerald-300 shrink-0">
                      <TrendingUp className="h-3 w-3" />
                      {mod.volumeCard.delta}
                    </span>
                  </div>

                  <p className="mt-0.5 text-[12px] text-slate-400">
                    {hoveredSparkIdx !== null
                      ? `${mod.volumeCard.series[hoveredSparkIdx].day} · ${mod.volumeCard.subtitle}`
                      : mod.volumeCard.subtitle}
                  </p>
                </div>

                {/* Interactive SVG Sparkline */}
                <div className="mt-2">
                  <svg
                    viewBox={`0 0 ${sparkW} ${sparkH}`}
                    className="h-[62px] w-full overflow-visible"
                    onMouseLeave={() => setHoveredSparkIdx(null)}
                  >
                    <defs>
                      <linearGradient id={`sparkFill-${activeModule}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={mod.accentHex} stopOpacity="0.45" />
                        <stop offset="100%" stopColor={mod.accentHex} stopOpacity="0.02" />
                      </linearGradient>
                    </defs>

                    <path d={areaPath} fill={`url(#sparkFill-${activeModule})`} />
                    <path
                      d={linePath}
                      fill="none"
                      stroke={mod.accentHex}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {coords.map((pt, idx) => {
                      const isHovered = hoveredSparkIdx === idx;
                      return (
                        <g key={pt.day}>
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isHovered ? 4.5 : 3}
                            fill={isHovered ? '#ffffff' : mod.accentHex}
                            stroke={mod.accentHex}
                            strokeWidth="1.5"
                          />
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={12}
                            fill="transparent"
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredSparkIdx(idx)}
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Card 3: 24h Checks Table */}
              <div className="hub-subcard relative rounded-xl border border-slate-700/55 p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[14px] font-semibold text-slate-100 truncate">
                    {mod.checksCard.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenInfoCard((prev) => (prev === 'checks' ? null : 'checks'))
                    }
                    className="rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors cursor-pointer"
                    aria-label={`${mod.checksCard.title} Info`}
                  >
                    <Info className="h-3.5 w-3.5" />
                  </button>
                </div>

                {openInfoCard === 'checks' && (
                  <div className="mt-2 rounded-lg border border-slate-700/70 bg-slate-900/95 p-2.5 text-[12px] leading-relaxed text-slate-300">
                    {mod.checksCard.info}
                  </div>
                )}

                <div className="mt-3 divide-y divide-slate-800/80">
                  {mod.checksCard.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-2 py-2.5 first:pt-1 last:pb-0 text-[13px]"
                    >
                      <span className="flex items-center gap-2 text-slate-200 min-w-0">
                        {row.status === 'success' && (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                        )}
                        {row.status === 'warning' && (
                          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" />
                        )}
                        {row.status === 'error' && (
                          <XCircle className="h-4 w-4 shrink-0 text-rose-400" />
                        )}
                        <span className="truncate">{row.label}</span>
                      </span>
                      <div className="flex items-center gap-3 shrink-0 font-mono-tabular text-[12.5px]">
                        <span className="font-semibold text-white">{row.count}</span>
                        <span className="w-11 text-right text-slate-400">{row.share}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Process Pipeline Card */}
            <div className="hub-subcard rounded-xl border border-slate-700/55 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-[13.5px] font-semibold text-slate-100">
                  {mod.pipelineTitle}
                </h3>
                <span className="font-mono-tabular text-[12px] text-slate-400">
                  {selectedStep.throughput}
                </span>
              </div>

              {/* 5 Pipeline Steps */}
              <div className="mt-3 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                {mod.steps.map((step, idx) => {
                  const StepIcon = STEP_ICONS[step.iconKey];
                  const isStepActive = selectedStepIdx === idx;

                  return (
                    <React.Fragment key={step.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedStepIdx(idx)}
                        className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left text-[12.5px] font-medium transition-all flex-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                          isStepActive
                            ? 'border-violet-400/80 bg-gradient-to-r from-violet-600/30 to-purple-700/20 text-white shadow-[0_0_18px_rgba(168,85,247,0.28)]'
                            : 'border-cyan-500/30 bg-[#081326]/80 text-slate-200 hover:border-cyan-400/60 hover:text-white'
                        }`}
                      >
                        <StepIcon
                          className={`h-4 w-4 shrink-0 ${
                            isStepActive ? 'text-violet-300' : 'text-cyan-300'
                          }`}
                        />
                        <span className="leading-tight">{step.label}</span>
                      </button>

                      {idx < mod.steps.length - 1 && (
                        <ArrowRight
                          className="hidden h-4 w-4 shrink-0 text-slate-500 lg:block"
                          aria-hidden="true"
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Selected Step Operational Detail */}
              <div className="mt-3 flex items-center justify-between gap-4 border-t border-slate-800/80 pt-2.5 text-[12.5px] text-slate-300">
                <span>{selectedStep.detail}</span>
                <span className="hidden sm:inline font-mono-tabular text-[11.5px] text-slate-400 shrink-0">
                  {lang === 'DE' ? `Schritt ${selectedStepIdx + 1} von ${mod.steps.length}` : `Step ${selectedStepIdx + 1} of ${mod.steps.length}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
