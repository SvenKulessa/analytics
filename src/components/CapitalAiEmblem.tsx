import React, { useId } from 'react';

interface CapitalAiEmblemProps {
  className?: string;
  detailed?: boolean;
}

/**
 * Unified CAPITAL-AI brand emblem used in the top-left navigation bar
 * and as the centerpiece inside the Hero orbital hub.
 * Licensed under the project asset license (see /LICENSE_ASSETS_AND_DATA.md).
 */
export const CapitalAiEmblem: React.FC<CapitalAiEmblemProps> = ({
  className = 'h-8 w-10',
  detailed = false,
}) => {
  const uid = useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 120 96"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${uid}-coreGlow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#1d4ed8" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#040712" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-orbitGold`} x1="12" y1="74" x2="108" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="48%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id={`${uid}-orbitCyan`} x1="16" y1="22" x2="104" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="55%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id={`${uid}-barBlue`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id={`${uid}-barGold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id={`${uid}-arrowGold`} x1="34" y1="64" x2="88" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#fef08a" />
        </linearGradient>
      </defs>

      {/* Ambient backdrop glow */}
      <circle cx="60" cy="48" r="44" fill={`url(#${uid}-coreGlow)`} />

      {/* Back orbital rings */}
      <ellipse
        cx="60"
        cy="48"
        rx="48"
        ry="24"
        transform="rotate(-19 60 48)"
        stroke={`url(#${uid}-orbitGold)`}
        strokeWidth={detailed ? '2.4' : '3.2'}
        opacity="0.92"
      />
      <ellipse
        cx="60"
        cy="48"
        rx="44"
        ry="19"
        transform="rotate(21 60 48)"
        stroke={`url(#${uid}-orbitCyan)`}
        strokeWidth={detailed ? '1.8' : '2.5'}
        opacity="0.78"
      />

      {/* Globe Sphere Wireframe */}
      <circle
        cx="60"
        cy="48"
        r="24"
        fill="rgba(8, 20, 48, 0.78)"
        stroke="#38bdf8"
        strokeWidth={detailed ? '1.4' : '1.8'}
        opacity="0.88"
      />
      {detailed && (
        <>
          <ellipse cx="60" cy="48" rx="12" ry="24" stroke="#38bdf8" strokeWidth="0.9" opacity="0.32" />
          <ellipse cx="60" cy="48" rx="24" ry="9" stroke="#38bdf8" strokeWidth="0.9" opacity="0.32" />
          <line x1="36" y1="48" x2="84" y2="48" stroke="#60a5fa" strokeWidth="0.8" opacity="0.28" />
          <line x1="60" y1="24" x2="60" y2="72" stroke="#60a5fa" strokeWidth="0.8" opacity="0.28" />
        </>
      )}

      {/* Ascending Analytics Bars inside the globe */}
      <rect x="43" y="49" width="5.5" height="14" rx="1.2" fill={`url(#${uid}-barBlue)`} />
      <rect x="51" y="42" width="5.5" height="21" rx="1.2" fill={`url(#${uid}-barBlue)`} />
      <rect x="59" y="36" width="5.5" height="27" rx="1.2" fill={`url(#${uid}-barGold)`} />
      <rect x="67" y="29" width="5.5" height="34" rx="1.2" fill={`url(#${uid}-barGold)`} />

      {/* Upward Growth Trend Arrow */}
      <path
        d="M38 56 L51 44 L58 48 L79 27"
        stroke={`url(#${uid}-arrowGold)`}
        strokeWidth={detailed ? '3' : '3.6'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M72 26.5 H80.5 V35"
        stroke={`url(#${uid}-arrowGold)`}
        strokeWidth={detailed ? '3' : '3.6'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Orbital accent nodes */}
      {detailed && (
        <>
          <circle cx="17" cy="61" r="2.2" fill="#38bdf8" />
          <circle cx="103" cy="34" r="2.4" fill="#fbbf24" />
          <circle cx="24" cy="31" r="1.8" fill="#22d3ee" />
          <circle cx="96" cy="64" r="2" fill="#c084fc" />
        </>
      )}
    </svg>
  );
};
