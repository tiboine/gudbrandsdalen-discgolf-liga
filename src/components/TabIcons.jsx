import React from "react";

// -- 1. LogoIcon -- "GDL" monogram in a double-border circle
export function LogoIcon({ size = 24, color = "#6b34a3" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle */}
      <circle cx="16" cy="16" r="14.5" stroke={color} strokeWidth="1.6" />
      {/* Inner spiral-like rings */}
      <path d="M16 3.5a12.5 12.5 0 0 1 0 25" stroke={color} strokeWidth="1.2" fill="none" />
      <circle cx="16" cy="16" r="10" stroke={color} strokeWidth="1.2" fill="none" />
      {/* GDL text — stylized with the G wrapping around D */}
      <text
        x="16"
        y="17"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontFamily="DM Sans, sans-serif"
        fontWeight="800"
        fontSize="8.5"
        letterSpacing="-0.3"
        style={{ fontStyle: "italic" }}
      >
        GDL
      </text>
      {/* Small disc accent — bottom of G */}
      <circle cx="11" cy="20.5" r="1" fill={color} opacity="0.5" />
    </svg>
  );
}

// -- 2. PlayersIcon -- Two overlapping person silhouettes
export function PlayersIcon({ size = 24, color = "#6b34a3" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Back person */}
      <circle cx="20" cy="11" r="3.5" fill={color} opacity="0.5" />
      <path
        d="M14 25c0-4 2.7-6 6-6s6 2 6 6"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Front person */}
      <circle cx="13" cy="11" r="3.5" fill={color} />
      <path
        d="M6 25c0-4 3-6.5 7-6.5s7 2.5 7 6.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

// -- 3. RoundsIcon -- Scorecard with numbers and rows
export function RoundsIcon({ size = 24, color = "#6b34a3", accentColor = "#65A30D" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Back card (left, tilted) */}
      <g transform="rotate(-12 12 16)">
        <rect x="5" y="4" width="16" height="22" rx="2" stroke={color} strokeWidth="1.5" fill="#fff" />
        <line x1="8" y1="10" x2="18" y2="10" stroke={color} strokeWidth="1" opacity="0.3" />
        <line x1="8" y1="13" x2="17" y2="13" stroke={color} strokeWidth="1" opacity="0.3" />
        <line x1="8" y1="16" x2="16" y2="16" stroke={color} strokeWidth="1" opacity="0.3" />
        <text x="10" y="8" fill={color} fontFamily="DM Sans, sans-serif" fontWeight="700" fontSize="5">1</text>
      </g>
      {/* Back card (right, tilted) */}
      <g transform="rotate(10 24 16)">
        <rect x="15" y="4" width="16" height="22" rx="2" stroke={color} strokeWidth="1.5" fill="#fff" />
        <line x1="18" y1="10" x2="28" y2="10" stroke={color} strokeWidth="1" opacity="0.3" />
        <line x1="18" y1="13" x2="27" y2="13" stroke={color} strokeWidth="1" opacity="0.3" />
        <line x1="18" y1="16" x2="26" y2="16" stroke={color} strokeWidth="1" opacity="0.3" />
        <text x="27" y="8" fill={color} fontFamily="DM Sans, sans-serif" fontWeight="700" fontSize="5" textAnchor="end">3</text>
      </g>
      {/* Front card (center, straight) */}
      <rect x="10" y="3" width="16" height="22" rx="2" stroke={color} strokeWidth="1.8" fill="#fff" />
      <line x1="13" y1="11" x2="23" y2="11" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="13" y1="14" x2="22" y2="14" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="13" y1="17" x2="21" y2="17" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="13" y1="20" x2="20" y2="20" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Green "12" badge */}
      <rect x="14" y="4.5" width="9" height="5" rx="1.5" fill={accentColor} opacity="0.15" />
      <text x="18.5" y="8.5" textAnchor="middle" fill={accentColor} fontFamily="DM Sans, sans-serif" fontWeight="800" fontSize="5">12</text>
    </svg>
  );
}

// -- 4. CoursesIcon -- Fairway path with disc golf basket
export function CoursesIcon({ size = 24, color = "#6b34a3", accentColor = "#65A30D" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Infinity/figure-8 fairway outline */}
      <path
        d="M12 14c0-5 4-10 8-10s6 3 6 5-2 5-6 5-6 3-6 5 2 5 6 5 8-5 8-10"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Curved throwing line (green accent) */}
      <path
        d="M8 20C12 18 14 12 20 10"
        stroke={accentColor}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Small disc at start of throw */}
      <circle cx="8" cy="20" r="2.5" stroke={color} strokeWidth="1.2" fill="none" />
      <circle cx="8" cy="20" r="1" fill={color} />
      {/* Disc golf basket */}
      <line x1="21" y1="5" x2="21" y2="12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Basket chains */}
      <path d="M18.5 6.5L21 9l2.5-2.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Basket tray */}
      <path d="M18.5 9h5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Base disc */}
      <path d="M19.5 12h3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// -- 5. LeagueTableIcon -- Trophy cup with handles
export function LeagueTableIcon({ size = 24, color = "#6b34a3" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cup body */}
      <path
        d="M10 6h12v8c0 4-2.5 7-6 7s-6-3-6-7V6z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Left handle */}
      <path
        d="M10 8H8c-1.5 0-3 1-3 3s1.5 3 3 3h2"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right handle */}
      <path
        d="M22 8h2c1.5 0 3 1 3 3s-1.5 3-3 3h-2"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Stem */}
      <line x1="16" y1="21" x2="16" y2="24" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Base */}
      <path d="M11 27h10" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 24h6v3h-6z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
      {/* Detail line on cup */}
      <path d="M12 10h8" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

// -- 6. RoundsTabIcon -- Clipboard with checklist
export function RoundsTabIcon({ size = 24, color = "#6b34a3", accentColor = "#65A30D" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Clipboard body */}
      <rect x="6" y="6" width="20" height="22" rx="2" stroke={color} strokeWidth="1.8" />
      {/* Clip at top */}
      <rect x="12" y="3" width="8" height="5" rx="1.5" stroke={color} strokeWidth="1.8" />
      {/* Row 1: checkmark + line */}
      <polyline points="9.5,13.5 11,15 13,12" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="15.5" y1="13.5" x2="23" y2="13.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
      {/* Row 2: checkmark + line */}
      <polyline points="9.5,18.5 11,20 13,17" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="15.5" y1="18.5" x2="23" y2="18.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
      {/* Row 3: checkmark + line */}
      <polyline points="9.5,23.5 11,25 13,22" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="15.5" y1="23.5" x2="21" y2="23.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

// -- 7. CoursesTabIcon -- Folded map with trail and markers
export function CoursesTabIcon({ size = 24, color = "#6b34a3", accentColor = "#65A30D" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Map body - folded in thirds */}
      <path
        d="M4 7l8 2v18l-8-2V7z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 9l8-2v18l-8 2V9z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M20 7l8 2v18l-8-2V7z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Dotted trail across map */}
      <path
        d="M6 17c3-3 5 1 10-1s6-4 10-2"
        stroke={accentColor}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />
      {/* Triangle markers */}
      <polygon points="8,13 9.5,10.5 11,13" fill={accentColor} opacity="0.7" />
      <polygon points="21,12 22.5,9.5 24,12" fill={accentColor} opacity="0.7" />
    </svg>
  );
}

// -- 8. PointsIcon -- Bar chart with 4 bars
export function PointsIcon({ size = 24, color = "#6b34a3", accentColor = "#65A30D" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Base line */}
      <line x1="5" y1="27" x2="27" y2="27" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Bar 1 - shortest */}
      <rect x="6" y="20" width="4" height="7" rx="1" stroke={color} strokeWidth="1.4" fill={color} opacity="0.15" />
      {/* Bar 2 */}
      <rect x="12" y="16" width="4" height="11" rx="1" stroke={color} strokeWidth="1.4" fill={color} opacity="0.25" />
      {/* Bar 3 */}
      <rect x="18" y="12" width="4" height="15" rx="1" stroke={color} strokeWidth="1.4" fill={color} opacity="0.35" />
      {/* Bar 4 - tallest, with accent */}
      <rect x="24" y="6" width="4" height="21" rx="1" stroke={accentColor} strokeWidth="1.8" fill={accentColor} opacity="0.25" />
      <rect x="24" y="6" width="4" height="21" rx="1" stroke={accentColor} strokeWidth="1.8" fill="none" />
    </svg>
  );
}

// -- 9. BadgesIcon -- Medal with ribbon and star
export function BadgesIcon({ size = 24, color = "#6b34a3", accentColor = "#65A30D" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ribbon tails */}
      <path d="M12 4l-2 8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M20 4l2 8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Ribbon band */}
      <path d="M10.5 6h11" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
      <line x1="14" y1="5" x2="14" y2="7" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="18" y1="5" x2="18" y2="7" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Medal circle */}
      <circle cx="16" cy="19" r="8" stroke={color} strokeWidth="1.8" />
      <circle cx="16" cy="19" r="5.5" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Star inside */}
      <path
        d="M16 13.5l1.5 3.2 3.5.5-2.5 2.5.6 3.3-3.1-1.6-3.1 1.6.6-3.3-2.5-2.5 3.5-.5z"
        fill={accentColor}
        opacity="0.6"
        stroke={accentColor}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// -- 10. NewHereIcon -- Compass rose with question mark
export function NewHereIcon({ size = 24, color = "#6b34a3" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle */}
      <circle cx="16" cy="16" r="13" stroke={color} strokeWidth="1.8" />
      {/* Cardinal direction points */}
      {/* N */}
      <polygon points="16,3 14.5,7 17.5,7" fill={color} />
      {/* S */}
      <polygon points="16,29 14.5,25 17.5,25" fill={color} opacity="0.5" />
      {/* E */}
      <polygon points="29,16 25,14.5 25,17.5" fill={color} opacity="0.5" />
      {/* W */}
      <polygon points="3,16 7,14.5 7,17.5" fill={color} opacity="0.5" />
      {/* Inner tick marks */}
      <line x1="16" y1="8" x2="16" y2="9.5" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="16" y1="22.5" x2="16" y2="24" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="8" y1="16" x2="9.5" y2="16" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="22.5" y1="16" x2="24" y2="16" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Question mark */}
      <text
        x="16"
        y="18"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontFamily="DM Sans, sans-serif"
        fontWeight="700"
        fontSize="11"
      >
        ?
      </text>
    </svg>
  );
}

// -- 11. AdminIcon -- Gear with a key
export function AdminIcon({ size = 24, color = "#6b34a3" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Gear outer path */}
      <path
        d="M14.5 4h3l.5 3.2a8 8 0 012 1.1l3-1.3 1.5 2.6-2.5 2a8 8 0 010 2.3l2.5 2-1.5 2.6-3-1.3a8 8 0 01-2 1.1L18 19.5h-3l-.5-3.2a8 8 0 01-2-1.1l-3 1.3-1.5-2.6 2.5-2a8 8 0 010-2.3l-2.5-2L9.5 5l3 1.3a8 8 0 012-1.1L14.5 4z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Gear center hole */}
      <circle cx="16" cy="11.75" r="3" stroke={color} strokeWidth="1.5" />
      {/* Key */}
      <circle cx="18" cy="23" r="3" stroke={color} strokeWidth="1.8" />
      <line x1="21" y1="23" x2="28" y2="23" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="26" y1="23" x2="26" y2="20.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="28" y1="23" x2="28" y2="20.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// -- 12. BellIcon -- Notification bell
export function BellIcon({ size = 24, color = "#6b34a3" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bell body */}
      <path
        d="M12 24V13a4 4 0 018 0v11"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bell flare */}
      <path
        d="M8 24c0-2 2-3 4-3h8c2 0 4 1 4 3H8z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Clapper */}
      <path
        d="M14 27a2.5 2.5 0 005 0"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Top knob */}
      <circle cx="16" cy="8.5" r="1.2" fill={color} />
      {/* Sound lines */}
      <path d="M7 18c-1.5-1-2-3-2-5" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <path d="M25 18c1.5-1 2-3 2-5" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

// ---- Exports: Tab and Stat icon mappings ----

export const TAB_ICONS = {
  tabell: LeagueTableIcon,
  runder: RoundsTabIcon,
  baner: CoursesTabIcon,
  regler: PointsIcon,
  badges: BadgesIcon,
  intro: NewHereIcon,
  admin: AdminIcon,
};

export const STAT_ICONS = {
  players: PlayersIcon,
  rounds: RoundsIcon,
  courses: CoursesIcon,
};

export default {
  LogoIcon,
  PlayersIcon,
  RoundsIcon,
  CoursesIcon,
  LeagueTableIcon,
  RoundsTabIcon,
  CoursesTabIcon,
  PointsIcon,
  BadgesIcon,
  NewHereIcon,
  AdminIcon,
  BellIcon,
  TAB_ICONS,
  STAT_ICONS,
};
