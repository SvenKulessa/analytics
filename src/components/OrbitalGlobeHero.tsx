import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  BarChart2,
  BarChart3,
  ChevronRight,
  Database,
  GraduationCap,
  Layers,
  Newspaper,
  Shield,
} from 'lucide-react';
import { Language, ModuleId, UI_COPY } from '../data/analyticsData';

interface OrbitalGlobeHeroProps {
  lang: Language;
  activeModule: ModuleId;
  hoveredModule?: ModuleId | null;
  onHoverModule?: (id: ModuleId | null) => void;
  onSelectModule: (id: ModuleId) => void;
  onOpenLearning: () => void;
  onOpenAnalytics: () => void;
}

interface OrbitNodeConfig {
  id: ModuleId;
  labelDE: string;
  labelEN: string;
  hex: string;
  rgb: string;
  iconColorClass: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const ORBIT_NODES: OrbitNodeConfig[] = [
  {
    id: 'quellen',
    labelDE: 'Quellen',
    labelEN: 'Sources',
    hex: '#10b981',
    rgb: '16, 185, 129',
    iconColorClass: 'text-emerald-300',
    Icon: Database,
  },
  {
    id: 'datenqualitaet',
    labelDE: 'Datenqualität',
    labelEN: 'Data Quality',
    hex: '#e879f9',
    rgb: '232, 121, 249',
    iconColorClass: 'text-fuchsia-300',
    Icon: Shield,
  },
  {
    id: 'scoring',
    labelDE: 'Scoring',
    labelEN: 'Scoring',
    hex: '#60a5fa',
    rgb: '96, 165, 250',
    iconColorClass: 'text-blue-300',
    Icon: BarChart2,
  },
  {
    id: 'risiko',
    labelDE: 'Risiko',
    labelEN: 'Risk',
    hex: '#22d3ee',
    rgb: '34, 211, 238',
    iconColorClass: 'text-cyan-300',
    Icon: AlertTriangle,
  },
  {
    id: 'evidenz',
    labelDE: 'Evidenz',
    labelEN: 'Evidence',
    hex: '#7dd3fc',
    rgb: '125, 211, 252',
    iconColorClass: 'text-sky-300',
    Icon: Layers,
  },
  {
    id: 'marktnews',
    labelDE: 'Marktnews',
    labelEN: 'Market News',
    hex: '#f59e0b',
    rgb: '245, 158, 11',
    iconColorClass: 'text-amber-300',
    Icon: Newspaper,
  },
  {
    id: 'lernen',
    labelDE: 'Lernen',
    labelEN: 'Learn',
    hex: '#fbbf24',
    rgb: '251, 191, 36',
    iconColorClass: 'text-yellow-300',
    Icon: GraduationCap,
  },
];

// Logical HUD coordinate space (matches aspect ratio of stage)
const STAGE_W = 760;
const STAGE_H = 520;
const CX = STAGE_W / 2;
const CY = STAGE_H / 2;
const ORBIT_RX = 266;
const ORBIT_RY = 194;

function getUniformNodeCoords(index: number, total: number) {
  const angle = -Math.PI / 2 + (index * Math.PI * 2) / total;
  const x = CX + Math.cos(angle) * ORBIT_RX;
  const y = CY + Math.sin(angle) * ORBIT_RY;
  return {
    angle,
    x,
    y,
    leftPct: (x / STAGE_W) * 100,
    topPct: (y / STAGE_H) * 100,
  };
}

function quadBezierPoint(
  t: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  };
}

export const OrbitalGlobeHero: React.FC<OrbitalGlobeHeroProps> = ({
  lang,
  activeModule,
  hoveredModule: controlledHoveredModule,
  onHoverModule,
  onSelectModule,
  onOpenLearning,
  onOpenAnalytics,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerTiltRef = useRef({ x: 0, y: 0 });
  const activeModuleRef = useRef<ModuleId>(activeModule);
  const hoveredModuleRef = useRef<ModuleId | null>(null);
  const switchCascadeRef = useRef<{ time: number; targetId: ModuleId }>({
    time: 0,
    targetId: activeModule,
  });

  const [internalHoveredModule, setInternalHoveredModule] = useState<ModuleId | null>(null);
  const hoveredModule =
    controlledHoveredModule !== undefined ? controlledHoveredModule : internalHoveredModule;

  const setHoveredModule = (id: ModuleId | null) => {
    setInternalHoveredModule(id);
    onHoverModule?.(id);
  };

  const copy = UI_COPY[lang].hero;

  useEffect(() => {
    activeModuleRef.current = activeModule;
    switchCascadeRef.current = {
      time: performance.now(),
      targetId: activeModule,
    };
  }, [activeModule]);

  useEffect(() => {
    hoveredModuleRef.current = hoveredModule;
  }, [hoveredModule]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationId = 0;
    let rotation = 0.45;
    let scannerAngle = -Math.PI / 2;

    // Generate dense Fibonacci sphere point cloud with continent silhouettes
    const points: { lat: number; lon: number; color: string; size: number; isHub?: boolean }[] = [];
    const totalPoints = 960;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < totalPoints; i++) {
      const y = 1 - (i / (totalPoints - 1)) * 2;
      const lat = Math.asin(y);
      const lon = goldenAngle * i;

      const wave =
        Math.sin(lon * 2.15 + 0.5) * Math.cos(lat * 2.3) +
        0.52 * Math.sin(lon * 4.2 - 1.0) * Math.cos(lat * 3.0 + 0.35);

      if (wave > -0.15 || i % 6 === 0) {
        const isMagenta = Math.sin(lon * 1.8 + lat * 2.1) > 0.3;
        const isEmerald = !isMagenta && Math.cos(lon * 2.4 - lat * 1.2) > 0.18;
        points.push({
          lat,
          lon,
          color: isMagenta ? '#e879f9' : isEmerald ? '#2dd4bf' : '#38bdf8',
          size: wave > 0.38 ? 1.8 : 1.15,
          isHub: wave > 0.58 && i % 9 === 0,
        });
      }
    }

    // Global network arcs across the 3D sphere
    const globeArcs: { aLat: number; aLon: number; bLat: number; bLon: number; color: string }[] = [
      { aLat: 0.85, aLon: 0.15, bLat: 0.72, bLon: -1.3, color: 'rgba(56, 189, 248, 0.6)' },
      { aLat: 0.82, aLon: 0.22, bLat: 0.62, bLon: 2.35, color: 'rgba(232, 121, 249, 0.58)' },
      { aLat: -0.4, aLon: -1.0, bLat: 0.72, bLon: 0.25, color: 'rgba(45, 212, 191, 0.55)' },
      { aLat: 0.55, aLon: 1.95, bLat: -0.52, bLon: 2.45, color: 'rgba(168, 85, 247, 0.55)' },
      { aLat: 0.7, aLon: -1.45, bLat: 0.25, bLon: -1.85, color: 'rgba(96, 165, 250, 0.55)' },
      { aLat: 0.12, aLon: 1.8, bLat: 0.85, bLon: 0.18, color: 'rgba(34, 211, 238, 0.52)' },
    ];

    const renderFrame = (now: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rectW = canvas.clientWidth;
      const rectH = canvas.clientHeight;
      if (rectW === 0 || rectH === 0) {
        animationId = requestAnimationFrame(renderFrame);
        return;
      }

      if (canvas.width !== Math.round(rectW * dpr) || canvas.height !== Math.round(rectH * dpr)) {
        canvas.width = Math.round(rectW * dpr);
        canvas.height = Math.round(rectH * dpr);
      }

      const scaleX = rectW / STAGE_W;
      const scaleY = rectH / STAGE_H;

      ctx.save();
      ctx.scale(dpr * scaleX, dpr * scaleY);
      ctx.clearRect(0, 0, STAGE_W, STAGE_H);

      const tSec = now * 0.001;
      const activeId = activeModuleRef.current;
      const hoveredId = hoveredModuleRef.current;
      const focusId = hoveredId ?? activeId;
      const focusIndex = ORBIT_NODES.findIndex((n) => n.id === focusId);
      const focusNode = ORBIT_NODES[focusIndex] ?? ORBIT_NODES[0];
      const focusCoords = getUniformNodeCoords(focusIndex, ORBIT_NODES.length);

      // Smoothly rotate Jarvis HUD lock-on scanner toward hovered/active node
      const targetAngle = focusCoords.angle;
      let angleDiff = targetAngle - scannerAngle;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      scannerAngle += prefersReducedMotion ? angleDiff : angleDiff * 0.12;

      const switchElapsed = (now - switchCascadeRef.current.time) / 1000;
      const switchStrength = Math.max(0, 1 - switchElapsed / 0.85);

      const globeR = 104;

      // 1. Jarvis Outer Elliptical Track & Concentric HUD Reticle Rings
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.14)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.ellipse(CX, CY, ORBIT_RX, ORBIT_RY, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Precision degree tick ring (r = 152)
      const tickRingR = 152;
      const tickRot = prefersReducedMotion ? 0 : tSec * 0.08;
      for (let deg = 0; deg < 360; deg += 5) {
        const a = (deg * Math.PI) / 180 + tickRot;
        const isMajor = deg % 30 === 0;
        const isMid = deg % 15 === 0;
        const rIn = tickRingR - (isMajor ? 7 : isMid ? 4 : 2);
        const rOut = tickRingR + (isMajor ? 3 : 0);
        ctx.strokeStyle = isMajor
          ? 'rgba(56, 189, 248, 0.42)'
          : 'rgba(148, 163, 184, 0.18)';
        ctx.lineWidth = isMajor ? 1.3 : 0.8;
        ctx.beginPath();
        ctx.moveTo(CX + Math.cos(a) * rIn, CY + Math.sin(a) * rIn);
        ctx.lineTo(CX + Math.cos(a) * rOut, CY + Math.sin(a) * rOut);
        ctx.stroke();
      }

      // Counter-rotating segmented Jarvis HUD ring (r = 136)
      const hudRot = prefersReducedMotion ? 0 : -tSec * 0.18;
      ctx.lineWidth = 2;
      for (let s = 0; s < 4; s++) {
        const startA = hudRot + s * (Math.PI / 2) + 0.18;
        const endA = startA + Math.PI / 2 - 0.36;
        ctx.strokeStyle =
          s % 2 === 0 ? 'rgba(34, 211, 238, 0.35)' : 'rgba(168, 85, 247, 0.32)';
        ctx.beginPath();
        ctx.arc(CX, CY, 136, startA, endA);
        ctx.stroke();
      }

      // Lock-on scanner arc tracking active/hovered process
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = `rgba(${focusNode.rgb}, 0.85)`;
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.arc(CX, CY, 124, scannerAngle - 0.32, scannerAngle + 0.32);
      ctx.stroke();

      // Secondary radial bracket ticks around scanner lock-on
      ctx.strokeStyle = `rgba(${focusNode.rgb}, 0.45)`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(CX, CY, 164, scannerAngle - 0.22, scannerAngle + 0.22);
      ctx.stroke();
      ctx.restore();
      ctx.restore();

      // 2. Process Switching Radial Shockwave
      if (switchStrength > 0.01 && !prefersReducedMotion) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const waveR = 45 + (1 - switchStrength) * 145;
        ctx.strokeStyle = `rgba(${focusNode.rgb}, ${switchStrength * 0.55})`;
        ctx.lineWidth = 2.5 * switchStrength;
        ctx.beginPath();
        ctx.arc(CX, CY, waveR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 3. Connecting Neurons (Core <-> All 7 Uniform Process Nodes)
      ORBIT_NODES.forEach((node, idx) => {
        const coords = getUniformNodeCoords(idx, ORBIT_NODES.length);
        const isFocused = node.id === focusId;
        const isActive = node.id === activeId;
        const isHighlighted = isFocused || isActive;

        // Start right at globe perimeter, end at process node center
        const startPt = {
          x: CX + Math.cos(coords.angle) * (globeR * 0.92),
          y: CY + Math.sin(coords.angle) * (globeR * 0.92),
        };
        const endPt = { x: coords.x, y: coords.y };

        // Perpendicular offset for organic curved neural axon
        const dx = endPt.x - startPt.x;
        const dy = endPt.y - startPt.y;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;
        const curveSign = idx % 2 === 0 ? 1 : -1;
        const ctrlPt = {
          x: (startPt.x + endPt.x) * 0.5 + nx * 28 * curveSign,
          y: (startPt.y + endPt.y) * 0.5 + ny * 28 * curveSign,
        };
        const dendriteCtrl = {
          x: (startPt.x + endPt.x) * 0.5 - nx * 22 * curveSign,
          y: (startPt.y + endPt.y) * 0.5 - ny * 22 * curveSign,
        };

        ctx.save();
        if (isHighlighted) {
          ctx.globalCompositeOperation = 'lighter';

          // Outer Gaussian glow axon
          ctx.strokeStyle = `rgba(${node.rgb}, ${isFocused ? 0.34 : 0.2})`;
          ctx.lineWidth = isFocused ? 8 : 5;
          ctx.beginPath();
          ctx.moveTo(startPt.x, startPt.y);
          ctx.quadraticCurveTo(ctrlPt.x, ctrlPt.y, endPt.x, endPt.y);
          ctx.stroke();

          // Secondary dendritic neuron branch
          ctx.strokeStyle = `rgba(${node.rgb}, ${isFocused ? 0.52 : 0.28})`;
          ctx.lineWidth = 1.1;
          ctx.setLineDash([3, 4]);
          ctx.beginPath();
          ctx.moveTo(startPt.x, startPt.y);
          ctx.quadraticCurveTo(dendriteCtrl.x, dendriteCtrl.y, endPt.x, endPt.y);
          ctx.stroke();
          ctx.setLineDash([]);

          // Crisp primary synaptic axon
          ctx.strokeStyle = `rgba(${node.rgb}, ${isFocused ? 0.95 : 0.72})`;
          ctx.lineWidth = isFocused ? 2.2 : 1.5;
          ctx.beginPath();
          ctx.moveTo(startPt.x, startPt.y);
          ctx.quadraticCurveTo(ctrlPt.x, ctrlPt.y, endPt.x, endPt.y);
          ctx.stroke();

          // Intermediate synapse junction nodes along the curve
          const syn1 = quadBezierPoint(0.36, startPt, ctrlPt, endPt);
          const syn2 = quadBezierPoint(0.68, startPt, ctrlPt, endPt);
          [syn1, syn2].forEach((syn, sIdx) => {
            const pulseR = 2.6 + (prefersReducedMotion ? 0 : Math.sin(tSec * 5 + sIdx * 2) * 0.8);
            ctx.fillStyle = `rgba(${node.rgb}, 0.9)`;
            ctx.beginPath();
            ctx.arc(syn.x, syn.y, pulseR, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = `rgba(255, 255, 255, 0.55)`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.arc(syn.x, syn.y, pulseR + 2.5, 0, Math.PI * 2);
            ctx.stroke();
          });

          // Animated synaptic neural signal pulses flowing core -> node
          if (!prefersReducedMotion) {
            const pulseCount = isFocused ? 4 : 2;
            const speed = isFocused ? 0.95 + switchStrength * 0.7 : 0.55;
            for (let p = 0; p < pulseCount; p++) {
              const tVal = (tSec * speed + p / pulseCount) % 1;
              const pos = quadBezierPoint(tVal, startPt, ctrlPt, endPt);
              const tailPos = quadBezierPoint(Math.max(0, tVal - 0.08), startPt, ctrlPt, endPt);

              const grad = ctx.createLinearGradient(tailPos.x, tailPos.y, pos.x, pos.y);
              grad.addColorStop(0, `rgba(${node.rgb}, 0)`);
              grad.addColorStop(1, '#ffffff');
              ctx.strokeStyle = grad;
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.moveTo(tailPos.x, tailPos.y);
              ctx.lineTo(pos.x, pos.y);
              ctx.stroke();

              ctx.fillStyle = '#ffffff';
              ctx.beginPath();
              ctx.arc(pos.x, pos.y, isFocused ? 3.2 : 2.3, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        } else {
          // Ambient dormant neural link
          ctx.strokeStyle = 'rgba(100, 116, 139, 0.28)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(startPt.x, startPt.y);
          ctx.quadraticCurveTo(ctrlPt.x, ctrlPt.y, endPt.x, endPt.y);
          ctx.stroke();

          if (!prefersReducedMotion) {
            const idleT = (tSec * 0.22 + idx * 0.14) % 1;
            const idlePos = quadBezierPoint(idleT, startPt, ctrlPt, endPt);
            ctx.fillStyle = `rgba(${node.rgb}, 0.55)`;
            ctx.beginPath();
            ctx.arc(idlePos.x, idlePos.y, 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();
      });

      // 4. Central Holographic 3D Hero Globe
      ctx.save();
      const aura = ctx.createRadialGradient(CX, CY, globeR * 0.2, CX, CY, globeR * 1.38);
      aura.addColorStop(0, `rgba(${focusNode.rgb}, 0.16)`);
      aura.addColorStop(0.5, 'rgba(56, 189, 248, 0.15)');
      aura.addColorStop(0.8, 'rgba(139, 92, 246, 0.09)');
      aura.addColorStop(1, 'rgba(4, 7, 18, 0)');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(CX, CY, globeR * 1.38, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric sphere backdrop & Fresnel rim
      const sphereBg = ctx.createRadialGradient(
        CX - globeR * 0.25,
        CY - globeR * 0.25,
        globeR * 0.1,
        CX,
        CY,
        globeR
      );
      sphereBg.addColorStop(0, 'rgba(15, 34, 72, 0.55)');
      sphereBg.addColorStop(0.82, 'rgba(6, 15, 36, 0.78)');
      sphereBg.addColorStop(1, 'rgba(56, 189, 248, 0.22)');
      ctx.fillStyle = sphereBg;
      ctx.beginPath();
      ctx.arc(CX, CY, globeR, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.38)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(CX, CY, globeR, 0, Math.PI * 2);
      ctx.stroke();

      const tiltX = 0.24 + pointerTiltRef.current.y * 0.18;
      const cosTilt = Math.cos(tiltX);
      const sinTilt = Math.sin(tiltX);
      const rot = rotation + pointerTiltRef.current.x * 0.35;

      const project = (lat: number, lon: number, rScale = 1) => {
        const r = globeR * rScale;
        const cosLat = Math.cos(lat);
        const sinLat = Math.sin(lat);
        const x0 = r * cosLat * Math.sin(lon + rot);
        const y0 = r * sinLat;
        const z0 = r * cosLat * Math.cos(lon + rot);

        const y1 = y0 * cosTilt - z0 * sinTilt;
        const z1 = y0 * sinTilt + z0 * cosTilt;
        return { x: CX + x0, y: CY - y1, z: z1 };
      };

      // Wireframe latitude rings
      ctx.lineWidth = 0.7;
      for (let latDeg = -60; latDeg <= 60; latDeg += 30) {
        const lat = (latDeg * Math.PI) / 180;
        ctx.strokeStyle = 'rgba(125, 211, 252, 0.13)';
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

      // Wireframe longitude meridians
      for (let lonDeg = 0; lonDeg < 180; lonDeg += 45) {
        const lon = (lonDeg * Math.PI) / 180;
        ctx.strokeStyle = 'rgba(125, 211, 252, 0.1)';
        ctx.beginPath();
        let started = false;
        for (let step = 0; step <= 48; step++) {
          const lat = -Math.PI / 2 + (step / 48) * Math.PI;
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

      // 3D global data arcs
      globeArcs.forEach((arc) => {
        const pA = project(arc.aLat, arc.aLon);
        const pB = project(arc.bLat, arc.bLon);
        if (pA.z > -globeR * 0.1 && pB.z > -globeR * 0.1) {
          const midLat = (arc.aLat + arc.bLat) / 2;
          const midLon = (arc.aLon + arc.bLon) / 2;
          const pMid = project(midLat, midLon, 1.24);
          ctx.strokeStyle = arc.color;
          ctx.lineWidth = 1.15;
          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.quadraticCurveTo(pMid.x, pMid.y, pB.x, pB.y);
          ctx.stroke();
        }
      });

      // Depth-sorted holographic continent points + internal cortical neural links
      const projected = points
        .map((pt) => ({ ...project(pt.lat, pt.lon), color: pt.color, size: pt.size, isHub: pt.isHub }))
        .sort((a, b) => a.z - b.z);

      const hubNodes: { x: number; y: number }[] = [];
      for (const pt of projected) {
        const depthAlpha = Math.max(0.12, Math.min(0.98, (pt.z + globeR) / (globeR * 2)));
        ctx.globalAlpha = depthAlpha;
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size * (0.72 + depthAlpha * 0.45), 0, Math.PI * 2);
        ctx.fill();

        if (pt.isHub && pt.z > 15) {
          hubNodes.push({ x: pt.x, y: pt.y });
        }
      }

      // Subtle cortical neural mesh connecting front-facing globe hub nodes toward active exit
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.35;
      ctx.strokeStyle = `rgba(${focusNode.rgb}, 0.7)`;
      ctx.lineWidth = 0.85;
      const exitRim = {
        x: CX + Math.cos(focusCoords.angle) * (globeR * 0.92),
        y: CY + Math.sin(focusCoords.angle) * (globeR * 0.92),
      };
      hubNodes.slice(0, 6).forEach((hn) => {
        ctx.beginPath();
        ctx.moveTo(hn.x, hn.y);
        ctx.lineTo(exitRim.x, exitRim.y);
        ctx.stroke();

        ctx.fillStyle = focusNode.hex;
        ctx.beginPath();
        ctx.arc(hn.x, hn.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      ctx.restore();
      ctx.restore();

      if (!prefersReducedMotion) {
        rotation += 0.0024;
        animationId = requestAnimationFrame(renderFrame);
      }
    };

    animationId = requestAnimationFrame(renderFrame);
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
      className="relative mx-auto max-w-[1440px] px-5 pt-7 pb-5 lg:px-10 lg:pt-9 lg:pb-6"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-4">
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

        {/* Right Hero: Jarvis Holographic 3D Globe + Neural Synapse HUD + 7 Uniform Process Nodes */}
        <div
          className="lg:col-span-7 relative mx-auto w-full max-w-[680px] aspect-[760/520] min-h-[340px]"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {/* Real-time 60fps Canvas: 3D Holographic Globe + Jarvis HUD Rings + Neural Pathways */}
          <canvas
            ref={canvasRef}
            className="h-full w-full block"
            aria-label={
              lang === 'DE'
                ? 'Interaktiver Jarvis-3D-Globus mit neuronalen Prozessverbindungen'
                : 'Interactive Jarvis 3D globe with neural process connections'
            }
          />

          {/* 7 Uniformly Distributed Process Nodes around the Globe */}
          {ORBIT_NODES.map((node, idx) => {
            const coords = getUniformNodeCoords(idx, ORBIT_NODES.length);
            const isSelected = activeModule === node.id;
            const isHovered = hoveredModule === node.id;
            const isLit = isSelected || isHovered;
            const NodeIcon = node.Icon;

            return (
              <button
                key={node.id}
                type="button"
                onClick={() => onSelectModule(node.id)}
                onMouseEnter={() => setHoveredModule(node.id)}
                onMouseLeave={() => setHoveredModule(null)}
                onFocus={() => setHoveredModule(node.id)}
                onBlur={() => setHoveredModule(null)}
                style={{
                  left: `${coords.leftPct}%`,
                  top: `${coords.topPct}%`,
                  borderColor: isLit ? `rgba(${node.rgb}, 0.85)` : 'rgba(51, 65, 85, 0.72)',
                  boxShadow: isLit
                    ? `0 0 26px rgba(${node.rgb}, 0.55), inset 0 0 14px rgba(${node.rgb}, 0.22)`
                    : '0 8px 24px rgba(2, 6, 23, 0.65)',
                }}
                className={`group absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-2 rounded-xl border bg-[#070f23]/90 backdrop-blur-md px-3 py-2 text-[12.5px] sm:text-[13.5px] font-semibold transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isLit ? 'scale-105 text-white' : 'text-slate-200 hover:scale-105 hover:text-white'
                }`}
              >
                {/* Jarvis HUD Corner Brackets */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-[1px] -top-[1px] h-2 w-2 rounded-tl-xl border-l-2 border-t-2 transition-opacity duration-200"
                  style={{
                    borderColor: node.hex,
                    opacity: isLit ? 1 : 0.35,
                  }}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-[1px] -bottom-[1px] h-2 w-2 rounded-br-xl border-r-2 border-b-2 transition-opacity duration-200"
                  style={{
                    borderColor: node.hex,
                    opacity: isLit ? 1 : 0.35,
                  }}
                />

                <span
                  className="flex h-6 w-6 items-center justify-center rounded-lg border transition-all duration-200"
                  style={{
                    borderColor: `rgba(${node.rgb}, ${isLit ? 0.75 : 0.35})`,
                    backgroundColor: `rgba(${node.rgb}, ${isLit ? 0.24 : 0.1})`,
                    boxShadow: isLit ? `0 0 12px rgba(${node.rgb}, 0.7)` : 'none',
                  }}
                >
                  <NodeIcon className={`h-3.5 w-3.5 ${node.iconColorClass}`} />
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
