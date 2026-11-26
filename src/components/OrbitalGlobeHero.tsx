import React, { useEffect, useRef } from 'react';
import { BarChart3, ChevronRight, GraduationCap } from 'lucide-react';
import { Language, ModuleId, UI_COPY } from '../data/analyticsData';

interface OrbitalGlobeHeroProps {
  lang: Language;
  activeModule: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  onOpenLearning: () => void;
  onOpenAnalytics: () => void;
}

interface OrbitNode {
  id: ModuleId;
  labelDE: string;
  labelEN: string;
  starColor: string;
  glowColor: string;
  positionClass: string;
}

const ORBIT_NODES: OrbitNode[] = [
  {
    id: 'quellen',
    labelDE: 'Quellen',
    labelEN: 'Sources',
    starColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.75)',
    positionClass: 'left-[33%] top-[3%]',
  },
  {
    id: 'datenqualitaet',
    labelDE: 'Datenqualität',
    labelEN: 'Data Quality',
    starColor: '#d946ef',
    glowColor: 'rgba(217, 70, 239, 0.8)',
    positionClass: 'right-[4%] top-[4%]',
  },
  {
    id: 'scoring',
    labelDE: 'Scoring',
    labelEN: 'Scoring',
    starColor: '#60a5fa',
    glowColor: 'rgba(96, 165, 250, 0.75)',
    positionClass: 'right-[1%] top-[43%]',
  },
  {
    id: 'risiko',
    labelDE: 'Risiko',
    labelEN: 'Risk',
    starColor: '#22d3ee',
    glowColor: 'rgba(34, 211, 238, 0.8)',
    positionClass: 'right-[12%] bottom-[12%]',
  },
  {
    id: 'evidenz',
    labelDE: 'Evidenz',
    labelEN: 'Evidence',
    starColor: '#7dd3fc',
    glowColor: 'rgba(125, 211, 252, 0.75)',
    positionClass: 'left-[53%] bottom-[2%]',
  },
  {
    id: 'marktnews',
    labelDE: 'Marktnews',
    labelEN: 'Market News',
    starColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.75)',
    positionClass: 'left-[22%] bottom-[5%]',
  },
  {
    id: 'lernen',
    labelDE: 'Lernen',
    labelEN: 'Learn',
    starColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.75)',
    positionClass: 'left-[8%] top-[43%]',
  },
];

export const OrbitalGlobeHero: React.FC<OrbitalGlobeHeroProps> = ({
  lang,
  activeModule,
  onSelectModule,
  onOpenLearning,
  onOpenAnalytics,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerTiltRef = useRef({ x: 0, y: 0 });
  const copy = UI_COPY[lang].hero;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationId = 0;
    let rotation = 0.4;

    // Generate deterministic Fibonacci sphere points + continent-like clusters
    const points: { lat: number; lon: number; color: string; size: number }[] = [];
    const totalPoints = 780;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < totalPoints; i++) {
      const y = 1 - (i / (totalPoints - 1)) * 2;
      const lat = Math.asin(y);
      const lon = goldenAngle * i;

      // Pseudo-continent density modulation
      const wave =
        Math.sin(lon * 2.1 + 0.4) * Math.cos(lat * 2.4) +
        0.55 * Math.sin(lon * 4.3 - 1.1) * Math.cos(lat * 3.1 + 0.3);

      if (wave > -0.18 || i % 7 === 0) {
        const isMagenta = Math.sin(lon * 1.7 + lat * 2.2) > 0.28;
        const isTeal = !isMagenta && Math.cos(lon * 2.5 - lat) > 0.15;
        points.push({
          lat,
          lon,
          color: isMagenta ? '#e879f9' : isTeal ? '#2dd4bf' : '#38bdf8',
          size: wave > 0.35 ? 1.75 : 1.15,
        });
      }
    }

    // Network arcs on the globe
    const arcs: { aLat: number; aLon: number; bLat: number; bLon: number; color: string }[] = [
      { aLat: 0.72, aLon: 0.2, bLat: 0.65, bLon: -1.35, color: 'rgba(56, 189, 248, 0.55)' },
      { aLat: 0.68, aLon: 0.25, bLat: 0.42, bLon: 1.9, color: 'rgba(232, 121, 249, 0.55)' },
      { aLat: -0.35, aLon: -1.1, bLat: 0.62, bLon: 0.3, color: 'rgba(45, 212, 191, 0.5)' },
      { aLat: 0.45, aLon: 1.85, bLat: -0.45, bLon: 2.35, color: 'rgba(168, 85, 247, 0.5)' },
      { aLat: 0.75, aLon: -1.4, bLat: 0.22, bLon: -1.8, color: 'rgba(96, 165, 250, 0.5)' },
    ];

    const renderFrame = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const radius = Math.min(width, height) * 0.42;

      // Ambient sphere aura
      const aura = ctx.createRadialGradient(cx, cy, radius * 0.25, cx, cy, radius * 1.18);
      aura.addColorStop(0, 'rgba(56, 189, 248, 0.16)');
      aura.addColorStop(0.55, 'rgba(139, 92, 246, 0.12)');
      aura.addColorStop(1, 'rgba(4, 7, 18, 0)');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.18, 0, Math.PI * 2);
      ctx.fill();

      // Subtle wireframe sphere silhouette
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      const tiltX = 0.22 + pointerTiltRef.current.y * 0.14;
      const cosTilt = Math.cos(tiltX);
      const sinTilt = Math.sin(tiltX);
      const rot = rotation + pointerTiltRef.current.x * 0.25;

      const project = (lat: number, lon: number, rScale = 1) => {
        const r = radius * rScale;
        const cosLat = Math.cos(lat);
        const sinLat = Math.sin(lat);
        const x0 = r * cosLat * Math.sin(lon + rot);
        const y0 = r * sinLat;
        const z0 = r * cosLat * Math.cos(lon + rot);

        const y1 = y0 * cosTilt - z0 * sinTilt;
        const z1 = y0 * sinTilt + z0 * cosTilt;
        return {
          x: cx + x0,
          y: cy - y1,
          z: z1,
          visible: z1 > -radius * 0.25,
        };
      };

      // Draw latitude wireframe rings
      ctx.lineWidth = 0.7;
      for (let latDeg = -60; latDeg <= 60; latDeg += 30) {
        const lat = (latDeg * Math.PI) / 180;
        ctx.strokeStyle = 'rgba(125, 211, 252, 0.11)';
        ctx.beginPath();
        let started = false;
        for (let step = 0; step <= 48; step++) {
          const lon = (step / 48) * Math.PI * 2;
          const p = project(lat, lon);
          if (p.z > 0) {
            if (!started) {
              ctx.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // Draw network arcs
      arcs.forEach((arc) => {
        const pA = project(arc.aLat, arc.aLon);
        const pB = project(arc.bLat, arc.bLon);
        if (pA.z > -radius * 0.1 && pB.z > -radius * 0.1) {
          const midLat = (arc.aLat + arc.bLat) / 2;
          const midLon = (arc.aLon + arc.bLon) / 2;
          const pMid = project(midLat, midLon, 1.24);
          ctx.strokeStyle = arc.color;
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.quadraticCurveTo(pMid.x, pMid.y, pB.x, pB.y);
          ctx.stroke();
        }
      });

      // Draw globe point cloud sorted back-to-front
      const projected = points
        .map((pt) => {
          const p = project(pt.lat, pt.lon);
          return { ...p, color: pt.color, size: pt.size };
        })
        .sort((a, b) => a.z - b.z);

      for (const pt of projected) {
        const depthAlpha = Math.max(0.12, Math.min(0.95, (pt.z + radius) / (radius * 2)));
        ctx.globalAlpha = depthAlpha;
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size * (0.75 + depthAlpha * 0.45), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.restore();

      if (!prefersReducedMotion) {
        rotation += 0.0022;
        animationId = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    pointerTiltRef.current = { x: nx, y: ny };
  };

  const handlePointerLeave = () => {
    pointerTiltRef.current = { x: 0, y: 0 };
  };

  return (
    <section
      id="top"
      className="relative mx-auto max-w-[1440px] px-5 pt-8 pb-6 lg:px-10 lg:pt-10 lg:pb-8"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-6">
        {/* Left Hero Editorial Block */}
        <div className="lg:col-span-5 relative z-10">
          <div className="flex items-center gap-3.5 mb-3">
            <span className="font-display text-[11px] font-semibold tracking-[0.24em] text-slate-300/90 uppercase">
              {copy.kicker}
            </span>
            <span
              className="h-[1.5px] w-24 bg-gradient-to-r from-amber-400/90 via-amber-300/40 to-transparent"
              aria-hidden="true"
            />
          </div>

          <h1 className="font-display text-[clamp(2.45rem,4vw,3.35rem)] font-bold leading-[1.08] tracking-tight text-white">
            {copy.title}
          </h1>

          <p className="mt-4 max-w-md font-display text-[20px] sm:text-[23px] font-medium leading-[1.32] text-slate-100/95 [text-wrap:balance]">
            {copy.subtitle}
          </p>

          <p className="mt-4 max-w-lg text-[14.5px] leading-[1.65] text-slate-300/85">
            {copy.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={onOpenLearning}
              className="inline-flex items-center gap-2.5 rounded-xl border border-amber-400/55 bg-gradient-to-r from-amber-500/20 via-amber-900/25 to-slate-900/70 px-5 py-3 text-[14px] font-semibold text-amber-50 shadow-[0_0_24px_rgba(245,158,11,0.18)] hover:border-amber-300/85 hover:bg-amber-500/25 transition-all whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <GraduationCap className="h-4.5 w-4.5 text-amber-300" />
              <span>{copy.ctaLearning}</span>
              <ChevronRight className="h-4 w-4 text-amber-200/80" />
            </button>

            <button
              type="button"
              onClick={onOpenAnalytics}
              className="inline-flex items-center gap-2.5 rounded-xl border border-violet-400/70 bg-gradient-to-r from-violet-600/45 via-purple-600/35 to-fuchsia-600/30 px-5 py-3 text-[14px] font-semibold text-white shadow-[0_0_28px_rgba(168,85,247,0.32)] hover:border-violet-300 hover:shadow-[0_0_34px_rgba(168,85,247,0.5)] transition-all whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <BarChart3 className="h-4.5 w-4.5 text-violet-200" />
              <span>{copy.ctaAnalytics}</span>
              <ChevronRight className="h-4 w-4 text-violet-200/90" />
            </button>
          </div>
        </div>

        {/* Right Interactive Holographic Globe & 7-Segment Orbital Ring */}
        <div
          className="lg:col-span-7 relative flex items-center justify-center min-h-[340px] sm:min-h-[410px]"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {/* Tilted SVG Orbital Ring & Holographic Mini Charts */}
          <svg
            viewBox="0 0 760 430"
            className="pointer-events-none absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ringTeal" x1="120" y1="80" x2="360" y2="120">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="ringMagenta" x1="420" y1="70" x2="640" y2="190">
                <stop offset="0%" stopColor="#e879f9" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="ringBlue" x1="650" y1="200" x2="540" y2="320">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.35" />
              </linearGradient>
              <linearGradient id="ringGold" x1="110" y1="230" x2="310" y2="355">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.25" />
              </linearGradient>
            </defs>

            {/* Outer & Inner Tilted Orbit Ellipses */}
            <ellipse
              cx="395"
              cy="220"
              rx="285"
              ry="136"
              stroke="rgba(56, 189, 248, 0.2)"
              strokeWidth="1.2"
            />
            <ellipse
              cx="395"
              cy="220"
              rx="246"
              ry="114"
              stroke="rgba(148, 163, 184, 0.14)"
              strokeWidth="1"
            />

            {/* Segmented Colored Orbit Arcs */}
            {/* Top-left Quellen arc */}
            <path
              d="M 146 172 A 266 124 0 0 1 350 96"
              stroke="url(#ringTeal)"
              strokeWidth={activeModule === 'quellen' ? '12' : '7'}
              strokeLinecap="round"
              opacity={activeModule === 'quellen' ? 1 : 0.72}
            />
            {/* Top-right Datenqualität arc */}
            <path
              d="M 435 96 A 266 124 0 0 1 650 186"
              stroke="url(#ringMagenta)"
              strokeWidth={activeModule === 'datenqualitaet' ? '12' : '8'}
              strokeLinecap="round"
              opacity={activeModule === 'datenqualitaet' ? 1 : 0.78}
            />
            {/* Bottom-right Scoring / Risiko arc */}
            <path
              d="M 654 228 A 266 124 0 0 1 482 338"
              stroke="url(#ringBlue)"
              strokeWidth={activeModule === 'scoring' || activeModule === 'risiko' ? '12' : '8'}
              strokeLinecap="round"
              opacity={activeModule === 'scoring' || activeModule === 'risiko' ? 1 : 0.72}
            />
            {/* Bottom Evidenz plate */}
            <path
              d="M 358 344 A 266 124 0 0 1 442 344"
              stroke="#7dd3fc"
              strokeWidth={activeModule === 'evidenz' ? '11' : '6'}
              strokeLinecap="round"
              opacity={activeModule === 'evidenz' ? 1 : 0.6}
            />
            {/* Bottom-left Marktnews / Lernen arc */}
            <path
              d="M 310 338 A 266 124 0 0 1 136 225"
              stroke="url(#ringGold)"
              strokeWidth={activeModule === 'marktnews' || activeModule === 'lernen' ? '12' : '8'}
              strokeLinecap="round"
              opacity={activeModule === 'marktnews' || activeModule === 'lernen' ? 1 : 0.7}
            />

            {/* Holographic Mini Bar Chart above Quellen */}
            <g opacity="0.82" transform="translate(182, 58)">
              <rect x="0" y="34" width="6" height="22" rx="1" fill="#10b981" opacity="0.6" />
              <rect x="10" y="24" width="6" height="32" rx="1" fill="#10b981" opacity="0.75" />
              <rect x="20" y="29" width="6" height="27" rx="1" fill="#2dd4bf" opacity="0.7" />
              <rect x="30" y="14" width="6" height="42" rx="1" fill="#34d399" opacity="0.88" />
              <rect x="40" y="6" width="6" height="50" rx="1" fill="#5eead4" opacity="0.92" />
              <rect x="50" y="18" width="6" height="38" rx="1" fill="#10b981" opacity="0.75" />
            </g>

            {/* Holographic Node Mesh above Datenqualität */}
            <g opacity="0.85" transform="translate(555, 58)" stroke="#e879f9" strokeWidth="1.1">
              <line x1="14" y1="10" x2="46" y2="10" opacity="0.7" />
              <line x1="46" y1="10" x2="62" y2="30" opacity="0.7" />
              <line x1="62" y1="30" x2="34" y2="48" opacity="0.7" />
              <line x1="34" y1="48" x2="6" y2="30" opacity="0.7" />
              <line x1="6" y1="30" x2="14" y2="10" opacity="0.7" />
              <line x1="14" y1="10" x2="34" y2="48" opacity="0.45" />
              <line x1="46" y1="10" x2="6" y2="30" opacity="0.45" />
              <circle cx="14" cy="10" r="2.6" fill="#f0abfc" stroke="none" />
              <circle cx="46" cy="10" r="2.6" fill="#f0abfc" stroke="none" />
              <circle cx="62" cy="30" r="2.6" fill="#f0abfc" stroke="none" />
              <circle cx="34" cy="48" r="2.6" fill="#f0abfc" stroke="none" />
              <circle cx="6" cy="30" r="2.6" fill="#f0abfc" stroke="none" />
            </g>

            {/* Holographic Risk Wave on Bottom-Right */}
            <g opacity="0.85" transform="translate(495, 255)">
              <path
                d="M 0 58 L 28 48 L 54 53 L 84 30 L 112 37 L 146 8"
                stroke="#38bdf8"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M 0 58 L 28 48 L 54 53 L 84 30 L 112 37 L 146 8 L 146 66 L 0 66 Z"
                fill="rgba(56, 189, 248, 0.14)"
                stroke="none"
              />
              <circle cx="84" cy="30" r="2.8" fill="#7dd3fc" />
              <circle cx="146" cy="8" r="3" fill="#22d3ee" />
            </g>
          </svg>

          {/* 3D Point-Cloud Hologram Canvas */}
          <div className="relative h-[290px] w-[290px] sm:h-[340px] sm:w-[340px] translate-x-2">
            <canvas
              ref={canvasRef}
              className="h-full w-full"
              aria-label={
                lang === 'DE'
                  ? 'Interaktiver 3D-Daten-Globus des CAPITAL-AI Analytics Hub'
                  : 'Interactive 3D data globe of CAPITAL-AI Analytics Hub'
              }
            />
          </div>

          {/* 7 Interactive Orbital Module Buttons */}
          {ORBIT_NODES.map((node) => {
            const isSelected = activeModule === node.id;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => onSelectModule(node.id)}
                className={`absolute ${node.positionClass} z-20 flex items-center gap-1.5 rounded-lg px-2 py-1 text-[13px] sm:text-[14px] font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                  isSelected
                    ? 'scale-105 text-white bg-slate-900/75 border border-slate-500/60 shadow-lg'
                    : 'text-slate-200/95 hover:text-white hover:scale-105'
                }`}
              >
                <span
                  aria-hidden="true"
                  className="text-[14px] leading-none"
                  style={{
                    color: node.starColor,
                    textShadow: `0 0 10px ${node.glowColor}`,
                  }}
                >
                  ★
                </span>
                <span>{lang === 'DE' ? node.labelDE : node.labelEN}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
