// BadgeIcons.jsx — Original SVG badge components for Gudbrandsdalsliga
// Each badge accepts a `locked` prop (boolean) — locked = grayscale/muted

const lockedFilter = "grayscale(1) brightness(0.45) contrast(0.8)";

// Shared hexagon clip path helper — used by most badges
// viewBox: 0 0 64 64

export const BADGE_ICONS = {
  // 1. Første kast — first round registered
  // A disc in flight inside a circular medal with pine trees at the bottom
  forste_kast: ({ locked = false } = {}) => (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}
    >
      <defs>
        <radialGradient id="fk_bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e3a1e" />
          <stop offset="100%" stopColor="#0a180a" />
        </radialGradient>
        <linearGradient id="fk_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A3E635" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
        <linearGradient id="fk_disc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0fdf4" />
          <stop offset="100%" stopColor="#bbf7d0" />
        </linearGradient>
      </defs>
      {/* Outer ring */}
      <circle cx="32" cy="32" r="30" fill="url(#fk_bg)" stroke="url(#fk_rim)" strokeWidth="2.5" />
      {/* Inner subtle ring */}
      <circle cx="32" cy="32" r="26" fill="none" stroke="#A3E635" strokeWidth="0.5" opacity="0.3" />
      {/* Pine trees silhouette at bottom */}
      <path d="M8 50 L14 38 L20 50 Z" fill="#2d5a2d" opacity="0.7" />
      <path d="M16 50 L23 35 L30 50 Z" fill="#1e3d1e" opacity="0.7" />
      <path d="M34 50 L41 35 L48 50 Z" fill="#1e3d1e" opacity="0.7" />
      <path d="M44 50 L50 38 L56 50 Z" fill="#2d5a2d" opacity="0.7" />
      <rect x="6" y="49" width="52" height="3" fill="#0a180a" rx="1" />
      {/* Flying disc — tilted ellipse */}
      <ellipse cx="32" cy="25" rx="14" ry="5" fill="url(#fk_disc)" transform="rotate(-15 32 25)" />
      <ellipse cx="31" cy="24" rx="9" ry="2.5" fill="none" stroke="#86efac" strokeWidth="1" transform="rotate(-15 31 24)" opacity="0.8" />
      <ellipse cx="31" cy="24" rx="4" ry="1.2" fill="none" stroke="#86efac" strokeWidth="0.8" transform="rotate(-15 31 24)" opacity="0.6" />
      {/* Motion lines */}
      <line x1="10" y1="20" x2="15" y2="21" stroke="#A3E635" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <line x1="9" y1="24" x2="14" y2="24.5" stroke="#A3E635" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
      <line x1="10" y1="28" x2="15" y2="27" stroke="#A3E635" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
      {/* Star sparkle top-right */}
      <path d="M50 14 L51.5 17 L55 18.5 L51.5 20 L50 23 L48.5 20 L45 18.5 L48.5 17 Z" fill="#A3E635" opacity="0.9" />
    </svg>
  ),

  // 2. På gli — 3-day streak
  // Flame badge: small single flame
  pa_gli: ({ locked = false } = {}) => (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}
    >
      <defs>
        <linearGradient id="pg_bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a2e1a" />
          <stop offset="100%" stopColor="#0d1a0d" />
        </linearGradient>
        <linearGradient id="pg_hex" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="pg_flame" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
      {/* Hexagon background */}
      <polygon points="32,3 56,17 56,47 32,61 8,47 8,17" fill="url(#pg_bg)" stroke="url(#pg_hex)" strokeWidth="2" />
      {/* Inner hex line */}
      <polygon points="32,8 51,19.5 51,44.5 32,56 13,44.5 13,19.5" fill="none" stroke="#6ee7b7" strokeWidth="0.5" opacity="0.3" />
      {/* Single flame */}
      <path
        d="M32 46 C22 46 18 39 20 31 C21 27 23 25 24 22 C25 25 24 27 26 28 C26 24 28 20 30 15 C31 19 31 22 33 24 C34 21 34 18 36 15 C38 20 37 26 39 29 C40 27 40 25 41 22 C43 25 44 30 43 35 C42 41 39 46 32 46Z"
        fill="url(#pg_flame)"
      />
      {/* Inner flame highlight */}
      <path
        d="M32 42 C27 42 25 38 26 33 C27 30 28 29 29 27 C29 29 29 31 30 32 C31 29 31 26 32 22 C33 26 33 29 34 32 C35 30 35 27 36 27 C37 30 37 35 35 39 C34 41 33 42 32 42Z"
        fill="#fef9c3"
        opacity="0.6"
      />
      {/* Number 3 for streak */}
      <text x="32" y="58" textAnchor="middle" fontSize="5" fill="#6ee7b7" fontWeight="700" fontFamily="sans-serif" opacity="0.9">3</text>
    </svg>
  ),

  // 3. Ildsjel — 5-day streak
  // Two flames side by side
  ildsjel: ({ locked = false } = {}) => (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}
    >
      <defs>
        <linearGradient id="is_bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1f1506" />
          <stop offset="100%" stopColor="#0d0a02" />
        </linearGradient>
        <linearGradient id="is_hex" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="is_f1" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="55%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="is_f2" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="55%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
      </defs>
      <polygon points="32,3 56,17 56,47 32,61 8,47 8,17" fill="url(#is_bg)" stroke="url(#is_hex)" strokeWidth="2.5" />
      <polygon points="32,8 51,19.5 51,44.5 32,56 13,44.5 13,19.5" fill="none" stroke="#fbbf24" strokeWidth="0.5" opacity="0.25" />
      {/* Left flame */}
      <path
        d="M24 46 C17 46 14 40 16 33 C17 29 18.5 27.5 19.5 25 C20 27.5 19.5 29 21 30 C21 27 22.5 23 24 18 C25 22 24.5 25 26 27 C27 24.5 27 22 28 19 C29.5 23 29 28.5 28.5 31 C29.5 29 29.5 27 30 25 C31.5 28 32 33 30.5 38 C29.5 43 27 46 24 46Z"
        fill="url(#is_f1)"
      />
      {/* Right flame */}
      <path
        d="M40 46 C33 46 30 40 32 33 C33 29 34.5 27.5 35.5 25 C36 27.5 35.5 29 37 30 C37 27 38.5 23 40 18 C41 22 40.5 25 42 27 C43 24.5 43 22 44 19 C45.5 23 45 28.5 44.5 31 C45.5 29 45.5 27 46 25 C47.5 28 48 33 46.5 38 C45.5 43 43 46 40 46Z"
        fill="url(#is_f2)"
      />
      {/* Highlights */}
      <path d="M24 42 C20 42 18.5 38.5 19.5 34 C20 32 21 30.5 21.5 29 C22 31 21.5 32.5 22.5 33.5 C23 31 23.5 28 24 24 C25 28 24.5 31 25.5 33 C26 31 26 29 27 28 C28 31 27.5 35.5 26 39 C25 41 24.5 42 24 42Z" fill="#fef9c3" opacity="0.5" />
      <path d="M40 42 C36 42 34.5 38.5 35.5 34 C36 32 37 30.5 37.5 29 C38 31 37.5 32.5 38.5 33.5 C39 31 39.5 28 40 24 C41 28 40.5 31 41.5 33 C42 31 42 29 43 28 C44 31 43.5 35.5 42 39 C41 41 40.5 42 40 42Z" fill="#fef9c3" opacity="0.5" />
      <text x="32" y="58.5" textAnchor="middle" fontSize="5" fill="#fbbf24" fontWeight="700" fontFamily="sans-serif" opacity="0.9">5</text>
    </svg>
  ),

  // 4. Ustoppelig — 7-day streak
  // Blazing triple flame ring
  ustoppelig: ({ locked = false } = {}) => (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}
    >
      <defs>
        <radialGradient id="us_bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1c1002" />
          <stop offset="100%" stopColor="#080400" />
        </radialGradient>
        <linearGradient id="us_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="us_fl" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
      </defs>
      {/* Circular medal with fiery rim */}
      <circle cx="32" cy="32" r="30" fill="url(#us_bg)" stroke="url(#us_rim)" strokeWidth="3" />
      <circle cx="32" cy="32" r="25" fill="none" stroke="#f97316" strokeWidth="0.6" opacity="0.25" />
      {/* Three flames arranged in triangle */}
      {/* Center top */}
      <path d="M32 38 C27 38 24 33 26 27 C27 24 28 23 28.5 21 C29 23 28.5 24.5 30 25.5 C30 23 31 20 32 16 C33 20 32 23 33.5 25 C34 23 34 21 35 19 C36.5 22 36 27 35 31 C34 35 33 38 32 38Z" fill="url(#us_fl)" />
      {/* Bottom-left */}
      <path d="M20 48 C15 48 12 43 14 37 C15 34 16 33 16.5 31 C17 33 16.5 34.5 18 35.5 C18 33 19 30 20 26 C21 30 20 33 21.5 35 C22 33 22 31 23 29 C24.5 32 24 37 23 41 C22 45 21 48 20 48Z" fill="url(#us_fl)" />
      {/* Bottom-right */}
      <path d="M44 48 C39 48 36 43 38 37 C39 34 40 33 40.5 31 C41 33 40.5 34.5 42 35.5 C42 33 43 30 44 26 C45 30 44 33 45.5 35 C46 33 46 31 47 29 C48.5 32 48 37 47 41 C46 45 45 48 44 48Z" fill="url(#us_fl)" />
      {/* Inner highlights */}
      <path d="M32 35 C30 35 28.5 32 29.5 29 C30 27.5 30.5 27 31 26 C31.5 27 31 28 32 29 C32 27.5 32.5 26 33 24 C33.5 26 33 28 34 29.5 C34.5 27.5 34.5 27 35 26 C35.5 28 35 31 34 33 C33.5 34.5 32.5 35 32 35Z" fill="#fef9c3" opacity="0.55" />
      <text x="32" y="62" textAnchor="middle" fontSize="5" fill="#fbbf24" fontWeight="700" fontFamily="sans-serif" opacity="0.9">7</text>
    </svg>
  ),

  // 5. Legende — 10-day streak
  // Diamond gem / crystal on a pedestal
  legende: ({ locked = false } = {}) => (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}
    >
      <defs>
        <radialGradient id="leg_bg" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#0f1a2e" />
          <stop offset="100%" stopColor="#030810" />
        </radialGradient>
        <linearGradient id="leg_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="50%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="leg_gem" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="30%" stopColor="#7dd3fc" />
          <stop offset="70%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="leg_face" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {/* Octagonal medal */}
      <polygon
        points="32,2 52,12 62,32 52,52 32,62 12,52 2,32 12,12"
        fill="url(#leg_bg)"
        stroke="url(#leg_rim)"
        strokeWidth="2.5"
      />
      <polygon
        points="32,7 48,15 57,32 48,49 32,57 16,49 7,32 16,15"
        fill="none"
        stroke="#7dd3fc"
        strokeWidth="0.5"
        opacity="0.2"
      />
      {/* Pedestal */}
      <rect x="24" y="50" width="16" height="3" rx="1.5" fill="#7dd3fc" opacity="0.5" />
      <rect x="27" y="47" width="10" height="4" rx="1" fill="#60a5fa" opacity="0.4" />
      {/* Diamond gem — top crown */}
      <polygon points="32,15 40,24 32,22 24,24" fill="url(#leg_face)" opacity="0.9" />
      {/* Diamond gem — middle band */}
      <polygon points="24,24 32,22 40,24 32,46" fill="url(#leg_gem)" />
      {/* Left face */}
      <polygon points="24,24 32,22 32,46" fill="#bfdbfe" opacity="0.25" />
      {/* Right face */}
      <polygon points="40,24 32,22 32,46" fill="#4f46e5" opacity="0.2" />
      {/* Sparkle reflections */}
      <circle cx="29" cy="26" r="1.5" fill="white" opacity="0.7" />
      <circle cx="35" cy="29" r="0.8" fill="white" opacity="0.5" />
      {/* Top glow star */}
      <path d="M32 12 L33 15 L36 15 L33.5 17 L34.5 20 L32 18 L29.5 20 L30.5 17 L28 15 L31 15 Z" fill="#e0f2fe" opacity="0.9" />
      {/* Glow ring */}
      <circle cx="32" cy="31" r="17" fill="none" stroke="#818cf8" strokeWidth="0.5" opacity="0.2" />
    </svg>
  ),

  // 6. Utforsker — played 3 different courses
  // Compass rose inside a shield
  utforsker: ({ locked = false } = {}) => (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}
    >
      <defs>
        <linearGradient id="uf_bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14291a" />
          <stop offset="100%" stopColor="#080f08" />
        </linearGradient>
        <linearGradient id="uf_rim" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="uf_n" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      {/* Shield shape */}
      <path d="M32 3 L58 14 L58 38 C58 50 45 60 32 63 C19 60 6 50 6 38 L6 14 Z" fill="url(#uf_bg)" stroke="url(#uf_rim)" strokeWidth="2" />
      <path d="M32 8 L53 17.5 L53 37.5 C53 47 42 55.5 32 58 C22 55.5 11 47 11 37.5 L11 17.5 Z" fill="none" stroke="#86efac" strokeWidth="0.5" opacity="0.25" />
      {/* Compass circle */}
      <circle cx="32" cy="35" r="17" fill="none" stroke="#4ade80" strokeWidth="0.8" opacity="0.4" />
      <circle cx="32" cy="35" r="13" fill="none" stroke="#4ade80" strokeWidth="0.4" opacity="0.25" />
      {/* Compass rose — North (gold) */}
      <polygon points="32,18 34.5,30 32,27 29.5,30" fill="url(#uf_n)" />
      {/* South */}
      <polygon points="32,52 34.5,40 32,43 29.5,40" fill="#86efac" opacity="0.5" />
      {/* East */}
      <polygon points="49,35 37,32.5 40,35 37,37.5" fill="#86efac" opacity="0.5" />
      {/* West */}
      <polygon points="15,35 27,32.5 24,35 27,37.5" fill="#86efac" opacity="0.5" />
      {/* Diagonal arms */}
      <line x1="20.5" y1="23.5" x2="29" y2="32" stroke="#4ade80" strokeWidth="0.8" opacity="0.3" />
      <line x1="43.5" y1="23.5" x2="35" y2="32" stroke="#4ade80" strokeWidth="0.8" opacity="0.3" />
      <line x1="20.5" y1="46.5" x2="29" y2="38" stroke="#4ade80" strokeWidth="0.8" opacity="0.3" />
      <line x1="43.5" y1="46.5" x2="35" y2="38" stroke="#4ade80" strokeWidth="0.8" opacity="0.3" />
      {/* Center dot */}
      <circle cx="32" cy="35" r="2.5" fill="#A3E635" />
      <circle cx="32" cy="35" r="1" fill="white" opacity="0.8" />
      {/* N label */}
      <text x="32" y="16" textAnchor="middle" fontSize="4.5" fill="#fbbf24" fontWeight="700" fontFamily="sans-serif">N</text>
      {/* Dot markers */}
      <circle cx="32" cy="20" r="0.8" fill="#fef08a" opacity="0.6" />
    </svg>
  ),

  // 7. Kartlegger — played all courses
  // Map unfurling from a scroll with all pins
  kartlegger: ({ locked = false } = {}) => (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}
    >
      <defs>
        <linearGradient id="kg_bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f2318" />
          <stop offset="100%" stopColor="#060e09" />
        </linearGradient>
        <linearGradient id="kg_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A3E635" />
          <stop offset="50%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="kg_map" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#166534" />
          <stop offset="100%" stopColor="#14532d" />
        </linearGradient>
      </defs>
      {/* Hexagon */}
      <polygon points="32,3 56,17 56,47 32,61 8,47 8,17" fill="url(#kg_bg)" stroke="url(#kg_rim)" strokeWidth="2.5" />
      {/* Map background parchment */}
      <rect x="13" y="18" width="38" height="28" rx="2" fill="url(#kg_map)" opacity="0.7" />
      <rect x="13" y="18" width="38" height="28" rx="2" fill="none" stroke="#A3E635" strokeWidth="0.8" opacity="0.5" />
      {/* Map terrain lines */}
      <path d="M15 28 Q22 24 28 27 Q34 30 40 26 Q46 22 50 25" fill="none" stroke="#4ade80" strokeWidth="0.8" opacity="0.4" />
      <path d="M15 34 Q20 31 27 33 Q33 35 39 31 Q45 27 50 31" fill="none" stroke="#4ade80" strokeWidth="0.7" opacity="0.3" />
      <path d="M15 40 Q23 38 30 40 Q37 42 44 38 Q47 36 50 38" fill="none" stroke="#4ade80" strokeWidth="0.6" opacity="0.25" />
      {/* Mountain triangle */}
      <polygon points="20,40 25,30 30,40" fill="#1d4a28" opacity="0.8" />
      <polygon points="34,40 40,28 46,40" fill="#1d4a28" opacity="0.8" />
      {/* Map pins — all locations filled */}
      <circle cx="20" cy="30" r="1.8" fill="#A3E635" />
      <circle cx="28" cy="24" r="1.8" fill="#A3E635" />
      <circle cx="36" cy="27" r="1.8" fill="#A3E635" />
      <circle cx="44" cy="23" r="1.8" fill="#A3E635" />
      <circle cx="23" cy="38" r="1.8" fill="#A3E635" />
      <circle cx="42" cy="36" r="1.8" fill="#A3E635" />
      {/* Pin inner dots */}
      <circle cx="20" cy="30" r="0.7" fill="white" opacity="0.8" />
      <circle cx="28" cy="24" r="0.7" fill="white" opacity="0.8" />
      <circle cx="36" cy="27" r="0.7" fill="white" opacity="0.8" />
      <circle cx="44" cy="23" r="0.7" fill="white" opacity="0.8" />
      <circle cx="23" cy="38" r="0.7" fill="white" opacity="0.8" />
      <circle cx="42" cy="36" r="0.7" fill="white" opacity="0.8" />
      {/* Scroll roll ends */}
      <rect x="11" y="16" width="42" height="4" rx="2" fill="#1a5c38" opacity="0.9" stroke="#A3E635" strokeWidth="0.5" />
      <rect x="11" y="44" width="42" height="4" rx="2" fill="#1a5c38" opacity="0.9" stroke="#A3E635" strokeWidth="0.5" />
    </svg>
  ),

  // 8. Under par — scored under par
  // Target/bullseye with a downward arrow
  under_par: ({ locked = false } = {}) => (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}
    >
      <defs>
        <radialGradient id="up_bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#180a0a" />
          <stop offset="100%" stopColor="#080404" />
        </radialGradient>
        <linearGradient id="up_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#up_bg)" stroke="url(#up_rim)" strokeWidth="2.5" />
      {/* Target rings */}
      <circle cx="32" cy="30" r="22" fill="none" stroke="#dc2626" strokeWidth="1.5" opacity="0.25" />
      <circle cx="32" cy="30" r="15" fill="none" stroke="#dc2626" strokeWidth="1.5" opacity="0.4" />
      <circle cx="32" cy="30" r="9" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
      <circle cx="32" cy="30" r="4" fill="#ef4444" opacity="0.9" />
      {/* Down arrow showing score below par */}
      <path d="M32 36 L32 54" stroke="#A3E635" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M26 48 L32 56 L38 48" stroke="#A3E635" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Minus sign label */}
      <rect x="22" y="14" width="20" height="2" rx="1" fill="#A3E635" opacity="0.8" />
      {/* Cross hairs */}
      <line x1="32" y1="8" x2="32" y2="14" stroke="#dc2626" strokeWidth="0.8" opacity="0.4" />
      <line x1="10" y1="30" x2="16" y2="30" stroke="#dc2626" strokeWidth="0.8" opacity="0.4" />
      <line x1="48" y1="30" x2="54" y2="30" stroke="#dc2626" strokeWidth="0.8" opacity="0.4" />
    </svg>
  ),

  // 9. Banekonge — best score on a course
  // Crown on a podium base with a disc
  banekonge: ({ locked = false } = {}) => (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}
    >
      <defs>
        <linearGradient id="bk_bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1c1602" />
          <stop offset="100%" stopColor="#0a0900" />
        </linearGradient>
        <linearGradient id="bk_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bk_crown" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="bk_plinth" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
      </defs>
      {/* Shield */}
      <path d="M32 3 L58 14 L58 38 C58 50 45 60 32 63 C19 60 6 50 6 38 L6 14 Z" fill="url(#bk_bg)" stroke="url(#bk_rim)" strokeWidth="2.5" />
      {/* Plinth/pedestal */}
      <rect x="20" y="48" width="24" height="6" rx="1.5" fill="url(#bk_plinth)" />
      <rect x="23" y="44" width="18" height="5" rx="1" fill="#92400e" />
      {/* Disc on pedestal */}
      <ellipse cx="32" cy="44" rx="9" ry="3" fill="#d1fae5" opacity="0.8" />
      <ellipse cx="32" cy="44" rx="6" ry="2" fill="none" stroke="#6ee7b7" strokeWidth="0.7" opacity="0.7" />
      {/* Crown */}
      <path
        d="M18 38 L18 28 L23 33 L32 22 L41 33 L46 28 L46 38 Z"
        fill="url(#bk_crown)"
      />
      {/* Crown band */}
      <rect x="18" y="36" width="28" height="4" rx="1" fill="#f59e0b" />
      {/* Crown gems */}
      <circle cx="32" cy="38" r="2" fill="#ef4444" />
      <circle cx="24" cy="38" r="1.5" fill="#818cf8" />
      <circle cx="40" cy="38" r="1.5" fill="#34d399" />
      {/* Crown tips glow */}
      <circle cx="23" cy="33" r="1.8" fill="#fde68a" />
      <circle cx="32" cy="22" r="2.2" fill="#fde68a" />
      <circle cx="41" cy="33" r="1.8" fill="#fde68a" />
    </svg>
  ),

  // 10. Podium — top 3 in league
  // Three-step podium with 1-2-3 blocks and a trophy cup
  podium: ({ locked = false } = {}) => (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}
    >
      <defs>
        <radialGradient id="pod_bg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#1c1c08" />
          <stop offset="100%" stopColor="#0a0a02" />
        </radialGradient>
        <linearGradient id="pod_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
        <linearGradient id="pod_gold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
        <linearGradient id="pod_silver" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="pod_bronze" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
      </defs>
      {/* Octagonal medal */}
      <polygon
        points="32,2 52,12 62,32 52,52 32,62 12,52 2,32 12,12"
        fill="url(#pod_bg)"
        stroke="url(#pod_rim)"
        strokeWidth="2.5"
      />
      {/* Trophy cup */}
      <path d="M27 14 L37 14 L36 20 C36 24 34 26 32 26 C30 26 28 24 28 20 Z" fill="url(#pod_gold)" />
      <path d="M28 20 C25 20 22 18 22 15 L27 15 L27 20 Z" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
      <path d="M36 20 C39 20 42 18 42 15 L37 15 L37 20 Z" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
      <rect x="29" y="26" width="6" height="3" fill="#ca8a04" />
      <rect x="27" y="29" width="10" height="2" rx="1" fill="#fde68a" />
      {/* Star above trophy */}
      <path d="M32 8 L33.2 11 L36.5 11 L33.8 13 L34.8 16 L32 14.2 L29.2 16 L30.2 13 L27.5 11 L30.8 11 Z" fill="#fde68a" />
      {/* Podium blocks */}
      {/* 1st place — center, tallest */}
      <rect x="26" y="35" width="12" height="16" rx="1" fill="url(#pod_gold)" />
      <text x="32" y="46" textAnchor="middle" fontSize="7" fill="#78350f" fontWeight="800" fontFamily="sans-serif">1</text>
      {/* 2nd place — left */}
      <rect x="12" y="40" width="12" height="11" rx="1" fill="url(#pod_silver)" />
      <text x="18" y="49" textAnchor="middle" fontSize="6" fill="#334155" fontWeight="800" fontFamily="sans-serif">2</text>
      {/* 3rd place — right */}
      <rect x="40" y="43" width="12" height="8" rx="1" fill="url(#pod_bronze)" />
      <text x="46" y="50" textAnchor="middle" fontSize="6" fill="#7c2d12" fontWeight="800" fontFamily="sans-serif">3</text>
      {/* Base line */}
      <rect x="10" y="51" width="44" height="2" rx="1" fill="#ca8a04" opacity="0.5" />
    </svg>
  ),

  // 11. Dedikert — 10 rounds completed
  // Tally marks in a circular badge
  dedikert: ({ locked = false } = {}) => (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}
    >
      <defs>
        <linearGradient id="ded_bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14291a" />
          <stop offset="100%" stopColor="#060f09" />
        </linearGradient>
        <linearGradient id="ded_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A3E635" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
        <linearGradient id="ded_scroll" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a3d22" />
          <stop offset="100%" stopColor="#0d2413" />
        </linearGradient>
      </defs>
      {/* Hexagon */}
      <polygon points="32,3 56,17 56,47 32,61 8,47 8,17" fill="url(#ded_bg)" stroke="url(#ded_rim)" strokeWidth="2.5" />
      {/* Scroll/log background */}
      <rect x="13" y="17" width="38" height="32" rx="3" fill="url(#ded_scroll)" stroke="#A3E635" strokeWidth="0.7" opacity="0.8" />
      {/* Scroll curl tops */}
      <path d="M13 20 Q13 17 16 17 Q13 17 13 20" fill="#1f4d28" />
      <path d="M51 20 Q51 17 48 17 Q51 17 51 20" fill="#1f4d28" />
      {/* Tally marks — group 1: 5 marks (4 vertical + 1 diagonal) */}
      <line x1="18" y1="26" x2="18" y2="36" stroke="#A3E635" strokeWidth="2" strokeLinecap="round" />
      <line x1="21" y1="26" x2="21" y2="36" stroke="#A3E635" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="26" x2="24" y2="36" stroke="#A3E635" strokeWidth="2" strokeLinecap="round" />
      <line x1="27" y1="26" x2="27" y2="36" stroke="#A3E635" strokeWidth="2" strokeLinecap="round" />
      {/* Diagonal cross stroke for group of 5 */}
      <line x1="16" y1="36" x2="29" y2="26" stroke="#A3E635" strokeWidth="2" strokeLinecap="round" />
      {/* Tally marks — group 2: 5 marks */}
      <line x1="33" y1="26" x2="33" y2="36" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="26" x2="36" y2="36" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
      <line x1="39" y1="26" x2="39" y2="36" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="26" x2="42" y2="36" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
      <line x1="31" y1="36" x2="44" y2="26" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
      {/* "10" label below */}
      <text x="32" y="45" textAnchor="middle" fontSize="8" fill="#A3E635" fontWeight="800" fontFamily="sans-serif">10</text>
      {/* Checkmark accent */}
      <path d="M28 47 L31 50 L36 43" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
    </svg>
  ),

  // 13. ace — hull-i-ett
  ace: ({ locked = false } = {}) => (
    <svg viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg" style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}>
      <defs>
        <radialGradient id="ace_bg" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#2a1600" />
          <stop offset="100%" stopColor="#0c0500" />
        </radialGradient>
        <linearGradient id="ace_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <radialGradient id="ace_glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ace_disc" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
      </defs>
      {/* Octagon medal */}
      <polygon points="32,2 52,12 62,32 52,52 32,62 12,52 2,32 12,12" fill="url(#ace_bg)" stroke="url(#ace_rim)" strokeWidth="2.5" />
      <polygon points="32,7 48,15 57,32 48,49 32,57 16,49 7,32 16,15" fill="none" stroke="#fbbf24" strokeWidth="0.5" opacity="0.25" />
      {/* Glow */}
      <circle cx="32" cy="30" r="18" fill="url(#ace_glow)" />
      {/* 8 burst rays — static */}
      <line x1="32" y1="20" x2="32" y2="12" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
      <line x1="39" y1="22" x2="44" y2="17" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
      <line x1="42" y1="30" x2="50" y2="30" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
      <line x1="39" y1="38" x2="44" y2="43" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
      <line x1="32" y1="40" x2="32" y2="48" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
      <line x1="25" y1="38" x2="20" y2="43" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
      <line x1="22" y1="30" x2="14" y2="30" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
      <line x1="25" y1="22" x2="20" y2="17" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
      {/* Flying disc */}
      <ellipse cx="32" cy="30" rx="10" ry="3.5" fill="url(#ace_disc)" transform="rotate(-12 32 30)" />
      <ellipse cx="31.5" cy="29.5" rx="6" ry="1.8" fill="none" stroke="#f59e0b" strokeWidth="0.8" transform="rotate(-12 31.5 29.5)" opacity="0.6" />
      {/* Sparkle */}
      <path d="M48 14 L49 17 L52 18 L49 19 L48 22 L47 19 L44 18 L47 17 Z" fill="#fde68a" opacity="0.9" />
      <text x="32" y="59" textAnchor="middle" fontSize="6.5" fill="#fbbf24" fontWeight="800" fontFamily="sans-serif">HULL-I-ETT</text>
    </svg>
  ),

  // 14. arets_kast — årets kast
  arets_kast: ({ locked = false } = {}) => (
    <svg viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg" style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}>
      <defs>
        <radialGradient id="ak_bg" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#1c1000" />
          <stop offset="100%" stopColor="#080400" />
        </radialGradient>
        <linearGradient id="ak_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ak_crown" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="60%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ak_band" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#ak_bg)" stroke="url(#ak_rim)" strokeWidth="3" />
      <circle cx="32" cy="32" r="25" fill="none" stroke="#fbbf24" strokeWidth="0.5" opacity="0.2" />
      {/* Crown body */}
      <path d="M14 42 L14 27 L20 35 L26 22 L32 30 L38 22 L44 35 L50 27 L50 42 Z" fill="url(#ak_crown)" />
      {/* Crown band */}
      <rect x="14" y="42" width="36" height="6" rx="2" fill="url(#ak_band)" />
      <rect x="14" y="42" width="36" height="2" rx="1" fill="#fef08a" opacity="0.5" />
      {/* Crown gems */}
      <circle cx="32" cy="31" r="3.5" fill="white" opacity="0.9" />
      <circle cx="32" cy="31" r="2" fill="#fbbf24" />
      <circle cx="20.5" cy="35.5" r="2.5" fill="white" opacity="0.8" />
      <circle cx="43.5" cy="35.5" r="2.5" fill="white" opacity="0.8" />
      <circle cx="20.5" cy="35.5" r="1.3" fill="#fbbf24" />
      <circle cx="43.5" cy="35.5" r="1.3" fill="#fbbf24" />
      {/* Star sparkle top */}
      <path d="M32 9 L33.2 12.6 L37 12.6 L34 14.8 L35.2 18.4 L32 16.2 L28.8 18.4 L30 14.8 L27 12.6 L30.8 12.6 Z" fill="#fef08a" opacity="0.95" />
      <text x="32" y="57" textAnchor="middle" fontSize="6.5" fill="#fef08a" fontWeight="800" fontFamily="sans-serif">ÅRETS KAST</text>
    </svg>
  ),

  // 15. ace_club — 2+ aces
  ace_club: ({ locked = false } = {}) => (
    <svg viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg" style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}>
      <defs>
        <linearGradient id="acl_bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#251400" />
          <stop offset="100%" stopColor="#0a0500" />
        </linearGradient>
        <linearGradient id="acl_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <polygon points="32,3 56,17 56,47 32,61 8,47 8,17" fill="url(#acl_bg)" stroke="url(#acl_rim)" strokeWidth="2.5" />
      <polygon points="32,8 51,19.5 51,44.5 32,56 13,44.5 13,19.5" fill="none" stroke="#fbbf24" strokeWidth="0.5" opacity="0.2" />
      {/* Left target */}
      <circle cx="21" cy="29" r="9" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5" />
      <circle cx="21" cy="29" r="5.5" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
      <circle cx="21" cy="29" r="2.5" fill="#f59e0b" />
      <circle cx="21" cy="29" r="1" fill="#fef3c7" />
      {/* Right target */}
      <circle cx="43" cy="29" r="9" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5" />
      <circle cx="43" cy="29" r="5.5" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
      <circle cx="43" cy="29" r="2.5" fill="#f59e0b" />
      <circle cx="43" cy="29" r="1" fill="#fef3c7" />
      {/* "×2" badge */}
      <text x="32" y="50" textAnchor="middle" fontSize="8.5" fill="#fde68a" fontWeight="900" fontFamily="sans-serif">×2 ACE</text>
    </svg>
  ),

  // 16. eagle_hunter — første eagle
  eagle_hunter: ({ locked = false } = {}) => (
    <svg viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg" style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}>
      <defs>
        <radialGradient id="eh_bg" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#1a0a2e" />
          <stop offset="100%" stopColor="#060210" />
        </radialGradient>
        <linearGradient id="eh_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="eh_body" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ddd6fe" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="eh_wing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#5b21b6" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#eh_bg)" stroke="url(#eh_rim)" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="25" fill="none" stroke="#a78bfa" strokeWidth="0.5" opacity="0.2" />
      {/* Left wing — swept back */}
      <path d="M32 34 C26 30 16 32 8 38 C14 32 22 28 32 30 Z" fill="url(#eh_wing)" />
      {/* Right wing — swept back */}
      <path d="M32 34 C38 30 48 32 56 38 C50 32 42 28 32 30 Z" fill="url(#eh_wing)" />
      {/* Wing detail lines */}
      <path d="M32 32 C26 30 18 34 12 40" fill="none" stroke="#ddd6fe" strokeWidth="0.8" opacity="0.4" />
      <path d="M32 32 C38 30 46 34 52 40" fill="none" stroke="#ddd6fe" strokeWidth="0.8" opacity="0.4" />
      {/* Body */}
      <ellipse cx="32" cy="36" rx="5" ry="9" fill="url(#eh_body)" />
      {/* Tail feathers */}
      <path d="M28 44 C26 50 24 54 28 56 C30 52 30 48 32 45 C34 48 34 52 36 56 C40 54 38 50 36 44 Z" fill="url(#eh_body)" opacity="0.8" />
      {/* Head */}
      <circle cx="32" cy="24" r="6" fill="url(#eh_body)" />
      {/* White head marking */}
      <path d="M27 22 C28 19 36 19 37 22 C35 20 29 20 27 22 Z" fill="#e9d5ff" opacity="0.7" />
      {/* Beak */}
      <path d="M38 24 L44 26 L38 27.5 Z" fill="#fde68a" />
      {/* Eye */}
      <circle cx="35" cy="23" r="2" fill="#1a0a2e" />
      <circle cx="35.5" cy="22.5" r="0.7" fill="#e9d5ff" />
      <text x="32" y="58" textAnchor="middle" fontSize="6.5" fill="#c4b5fd" fontWeight="800" fontFamily="sans-serif">ØRNEJEGER</text>
    </svg>
  ),

  // 17. double_eagle — to eagles i én runde
  double_eagle: ({ locked = false } = {}) => (
    <svg viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg" style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}>
      <defs>
        <linearGradient id="de_bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#160a2a" />
          <stop offset="100%" stopColor="#06020f" />
        </linearGradient>
        <linearGradient id="de_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ddd6fe" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="de_b1" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#e9d5ff" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="de_b2" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ddd6fe" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <polygon points="32,3 56,17 56,47 32,61 8,47 8,17" fill="url(#de_bg)" stroke="url(#de_rim)" strokeWidth="2.5" />
      <polygon points="32,8 51,19.5 51,44.5 32,56 13,44.5 13,19.5" fill="none" stroke="#a78bfa" strokeWidth="0.5" opacity="0.2" />
      {/* Left eagle */}
      <path d="M20 26 C14 22 8 24 6 29 C11 25 16 24 20 27 Z" fill="url(#de_b1)" />
      <path d="M20 26 C26 22 28 22 28 27 C26 24 22 24 20 27 Z" fill="url(#de_b1)" />
      <ellipse cx="20" cy="29" rx="4" ry="5.5" fill="url(#de_b1)" />
      <circle cx="20" cy="22" r="4" fill="url(#de_b1)" />
      <path d="M24 21 L28 22.5 L24 23.5 Z" fill="#fde68a" />
      <circle cx="22" cy="21" r="1.2" fill="#160a2a" />
      {/* Right eagle */}
      <path d="M44 26 C50 22 56 24 58 29 C53 25 48 24 44 27 Z" fill="url(#de_b2)" />
      <path d="M44 26 C38 22 36 22 36 27 C38 24 42 24 44 27 Z" fill="url(#de_b2)" />
      <ellipse cx="44" cy="29" rx="4" ry="5.5" fill="url(#de_b2)" />
      <circle cx="44" cy="22" r="4" fill="url(#de_b2)" />
      <path d="M40 21 L36 22.5 L40 23.5 Z" fill="#fde68a" />
      <circle cx="42" cy="21" r="1.2" fill="#160a2a" />
      {/* "×2" center */}
      <text x="32" y="46" textAnchor="middle" fontSize="11" fill="#ddd6fe" fontWeight="900" fontFamily="sans-serif">×2</text>
      <text x="32" y="55" textAnchor="middle" fontSize="6.5" fill="#a78bfa" fontWeight="800" fontFamily="sans-serif">DOBBELTØRN</text>
    </svg>
  ),

  // 18. eagle_sesong — 5+ eagles i en sesong
  eagle_sesong: ({ locked = false } = {}) => (
    <svg viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg" style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}>
      <defs>
        <radialGradient id="es_bg" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#1a0a2e" />
          <stop offset="100%" stopColor="#060210" />
        </radialGradient>
        <linearGradient id="es_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e879f9" />
          <stop offset="100%" stopColor="#86198f" />
        </linearGradient>
        <linearGradient id="es_wing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0abfc" />
          <stop offset="100%" stopColor="#a21caf" />
        </linearGradient>
        <linearGradient id="es_body" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#f5d0fe" />
          <stop offset="100%" stopColor="#c026d3" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#es_bg)" stroke="url(#es_rim)" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="25" fill="none" stroke="#e879f9" strokeWidth="0.5" opacity="0.2" />
      {/* Eagle — wings spread wide */}
      <path d="M22 28 C14 22 6 25 4 32 C10 27 17 26 22 30 Z" fill="url(#es_wing)" />
      <path d="M42 28 C50 22 58 25 60 32 C54 27 47 26 42 30 Z" fill="url(#es_wing)" />
      {/* Wing secondaries */}
      <path d="M22 30 C18 28 12 32 10 37 C14 32 18 30 22 32 Z" fill="#e879f9" opacity="0.6" />
      <path d="M42 30 C46 28 52 32 54 37 C50 32 46 30 42 32 Z" fill="#e879f9" opacity="0.6" />
      {/* Body */}
      <ellipse cx="32" cy="31" rx="5" ry="8" fill="url(#es_body)" />
      {/* Head */}
      <circle cx="32" cy="21" r="5.5" fill="url(#es_body)" />
      <path d="M27 19 C28 16 36 16 37 19 C35 17.5 29 17.5 27 19 Z" fill="#f5d0fe" opacity="0.7" />
      {/* Beak */}
      <path d="M37 21 L43 23 L37 24.5 Z" fill="#fde68a" />
      {/* Eye */}
      <circle cx="34.5" cy="20" r="2" fill="#1a0a2e" />
      <circle cx="35" cy="19.5" r="0.7" fill="#f5d0fe" />
      {/* Season "5" badge */}
      <circle cx="50" cy="46" r="9" fill="#86198f" stroke="#f0abfc" strokeWidth="1.5" />
      <text x="50" y="50" textAnchor="middle" fontSize="11" fill="#f5d0fe" fontWeight="900" fontFamily="sans-serif">5</text>
      <text x="25" y="56" textAnchor="middle" fontSize="6.5" fill="#e879f9" fontWeight="800" fontFamily="sans-serif">ØRNESESONG</text>
    </svg>
  ),

  // 19. birdie_runde — 3+ birdies i én runde
  birdie_runde: ({ locked = false } = {}) => (
    <svg viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg" style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}>
      <defs>
        <radialGradient id="br_bg" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#081a2e" />
          <stop offset="100%" stopColor="#020810" />
        </radialGradient>
        <linearGradient id="br_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="br_body" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="br_wing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#br_bg)" stroke="url(#br_rim)" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="25" fill="none" stroke="#60a5fa" strokeWidth="0.5" opacity="0.2" />
      {/* Bird body */}
      <ellipse cx="30" cy="28" rx="8" ry="5.5" fill="url(#br_body)" />
      {/* Head */}
      <circle cx="38" cy="23" r="5.5" fill="url(#br_body)" />
      {/* Beak */}
      <path d="M43 22 L50 24 L43 25.5 Z" fill="#fde68a" />
      {/* Upper wing */}
      <path d="M22 26 C16 18 20 12 28 17 C24 16 20 18 22 26 Z" fill="url(#br_wing)" />
      {/* Lower wing fold */}
      <path d="M22 28 C16 30 14 36 20 38 C18 34 19 30 22 28 Z" fill="#60a5fa" opacity="0.7" />
      {/* Tail */}
      <path d="M22 30 C16 33 12 38 16 41 C18 37 20 34 22 30 Z" fill="url(#br_body)" opacity="0.8" />
      {/* Eye */}
      <circle cx="40" cy="22" r="2" fill="#081a2e" />
      <circle cx="40.5" cy="21.5" r="0.7" fill="#bfdbfe" />
      {/* Wing highlight */}
      <path d="M24 22 C20 18 23 14 28 18" fill="none" stroke="#bfdbfe" strokeWidth="1" opacity="0.5" />
      {/* ×3 badge bottom-left */}
      <circle cx="16" cy="47" r="10" fill="#1d4ed8" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="16" y="51" textAnchor="middle" fontSize="11" fill="#bfdbfe" fontWeight="900" fontFamily="sans-serif">×3</text>
      <text x="43" y="52" textAnchor="middle" fontSize="7" fill="#93c5fd" fontWeight="800" fontFamily="sans-serif">RUNDE</text>
    </svg>
  ),

  // 20. birdie_maskin — 5+ birdies i én runde
  birdie_maskin: ({ locked = false } = {}) => (
    <svg viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg" style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}>
      <defs>
        <linearGradient id="bm_bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#061e14" />
          <stop offset="100%" stopColor="#020a07" />
        </linearGradient>
        <linearGradient id="bm_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="bm_body" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#a7f3d0" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="bm_wing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="100%" stopColor="#065f46" />
        </linearGradient>
      </defs>
      <polygon points="32,3 56,17 56,47 32,61 8,47 8,17" fill="url(#bm_bg)" stroke="url(#bm_rim)" strokeWidth="2.5" />
      <polygon points="32,8 51,19.5 51,44.5 32,56 13,44.5 13,19.5" fill="none" stroke="#34d399" strokeWidth="0.5" opacity="0.2" />
      {/* Bird body */}
      <ellipse cx="26" cy="26" rx="7" ry="5" fill="url(#bm_body)" />
      {/* Head */}
      <circle cx="33" cy="21" r="5" fill="url(#bm_body)" />
      {/* Beak */}
      <path d="M38 20 L44 22 L38 23.5 Z" fill="#fde68a" />
      {/* Wing */}
      <path d="M19 24 C13 16 18 10 26 16 C21 15 17 17 19 24 Z" fill="url(#bm_wing)" />
      {/* Tail */}
      <path d="M19 27 C13 30 11 36 16 38 C17 34 18 30 19 27 Z" fill="url(#bm_body)" opacity="0.8" />
      {/* Eye */}
      <circle cx="35" cy="20" r="1.8" fill="#061e14" />
      <circle cx="35.5" cy="19.5" r="0.6" fill="#a7f3d0" />
      {/* ×5 prominent */}
      <text x="47" y="42" textAnchor="middle" fontSize="18" fill="#6ee7b7" fontWeight="900" fontFamily="sans-serif">×5</text>
      <text x="28" y="51" textAnchor="middle" fontSize="7.5" fill="#6ee7b7" fontWeight="800" fontFamily="sans-serif">BIRDIE-MASKIN</text>
    </svg>
  ),

  // 21. birdie_strek — birdies i 3 runder på rad
  birdie_strek: ({ locked = false } = {}) => (
    <svg viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg" style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}>
      <defs>
        <radialGradient id="bs_bg" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#0d1236" />
          <stop offset="100%" stopColor="#030514" />
        </radialGradient>
        <linearGradient id="bs_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a5b4fc" />
          <stop offset="100%" stopColor="#3730a3" />
        </linearGradient>
        <linearGradient id="bs_b1" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#c7d2fe" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="bs_b2" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#a5b4fc" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="bs_b3" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#3730a3" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#bs_bg)" stroke="url(#bs_rim)" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="25" fill="none" stroke="#6366f1" strokeWidth="0.5" opacity="0.2" />
      {/* Bird 1 — left, smallest */}
      <ellipse cx="11" cy="26" rx="5" ry="3.5" fill="url(#bs_b1)" opacity="0.7" />
      <circle cx="15.5" cy="22.5" r="3.5" fill="url(#bs_b1)" opacity="0.7" />
      <path d="M18.5 21.5 L22 23 L18.5 24 Z" fill="#fde68a" opacity="0.8" />
      <path d="M6 24 C3 19 8 16 11 20" fill="#6366f1" opacity="0.5" />
      {/* Bird 2 — middle */}
      <ellipse cx="29" cy="22" rx="6" ry="4" fill="url(#bs_b2)" opacity="0.85" />
      <circle cx="34.5" cy="18" r="4" fill="url(#bs_b2)" opacity="0.85" />
      <path d="M38 17 L42 18.5 L38 19.5 Z" fill="#fde68a" opacity="0.9" />
      <path d="M23 20 C19 14 25 11 29 16" fill="#4f46e5" opacity="0.65" />
      {/* Bird 3 — right, biggest/brightest */}
      <ellipse cx="49" cy="16" rx="7" ry="5" fill="url(#bs_b3)" />
      <circle cx="55.5" cy="12" r="5" fill="url(#bs_b3)" />
      <path d="M60 11 L62 12.5 L60 13.5 Z" fill="#fde68a" />
      <path d="M42 14 C37 7 44 4 49 10" fill="#3730a3" opacity="0.8" />
      <circle cx="56.5" cy="11" r="1.5" fill="#0d1236" />
      <circle cx="57" cy="10.5" r="0.5" fill="#c7d2fe" />
      {/* Trailing dashes — streak line */}
      <path d="M8 36 L56 36" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="5 4" opacity="0.5" />
      <text x="32" y="50" textAnchor="middle" fontSize="7.5" fill="#a5b4fc" fontWeight="800" fontFamily="sans-serif">BIRDIE-STREK</text>
    </svg>
  ),

  // 22. birdie_sesong — 10+ birdies i en sesong
  birdie_sesong: ({ locked = false } = {}) => (
    <svg viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg" style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}>
      <defs>
        <linearGradient id="bse_bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#071a36" />
          <stop offset="100%" stopColor="#020810" />
        </linearGradient>
        <linearGradient id="bse_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <linearGradient id="bse_body" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      <polygon points="32,3 56,17 56,47 32,61 8,47 8,17" fill="url(#bse_bg)" stroke="url(#bse_rim)" strokeWidth="2.5" />
      <polygon points="32,8 51,19.5 51,44.5 32,56 13,44.5 13,19.5" fill="none" stroke="#38bdf8" strokeWidth="0.5" opacity="0.2" />
      {/* Seasonal arc — represents a full season */}
      <path d="M10 35 Q32 10 54 35" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 3" opacity="0.6" />
      {/* Bird flying along arc */}
      <ellipse cx="32" cy="22" rx="6" ry="4" fill="url(#bse_body)" />
      <circle cx="37.5" cy="18" r="4.5" fill="url(#bse_body)" />
      <path d="M41.5 17 L47 19 L41.5 20.5 Z" fill="#fde68a" />
      <path d="M26 20 C21 13 27 9 32 15" fill="#38bdf8" opacity="0.7" />
      <path d="M26 23 C20 26 18 32 23 35 C22 30 23 26 26 23 Z" fill="url(#bse_body)" opacity="0.7" />
      <circle cx="39" cy="17" r="2" fill="#071a36" />
      <circle cx="39.5" cy="16.5" r="0.7" fill="#bae6fd" />
      {/* Season "10" counter */}
      <rect x="14" y="38" width="20" height="14" rx="4" fill="#0369a1" stroke="#7dd3fc" strokeWidth="1.2" />
      <text x="24" y="49" textAnchor="middle" fontSize="10" fill="#bae6fd" fontWeight="900" fontFamily="sans-serif">10</text>
      <text x="44" y="45" textAnchor="middle" fontSize="6" fill="#7dd3fc" fontWeight="800" fontFamily="sans-serif">BIRDIES</text>
      <text x="44" y="52" textAnchor="middle" fontSize="6" fill="#38bdf8" fontWeight="800" fontFamily="sans-serif">SESONG</text>
    </svg>
  ),

  // 23. birdie_mester — 25+ birdies totalt
  birdie_mester: ({ locked = false } = {}) => (
    <svg viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg" style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}>
      <defs>
        <radialGradient id="bme_bg" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#0c1430" />
          <stop offset="100%" stopColor="#030710" />
        </radialGradient>
        <linearGradient id="bme_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bme_star" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bme_body" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#bme_bg)" stroke="url(#bme_rim)" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="25" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.2" />
      {/* 5-point star */}
      <path d="M32 8 L36 20 L49 20 L39 28 L43 40 L32 32 L21 40 L25 28 L15 20 L28 20 Z" fill="url(#bme_star)" opacity="0.9" />
      {/* Star face highlights */}
      <path d="M32 8 L36 20 L32 16 Z" fill="#fef9c3" opacity="0.6" />
      <path d="M32 8 L28 20 L32 16 Z" fill="#fef9c3" opacity="0.4" />
      {/* Bird on star */}
      <ellipse cx="30" cy="25" rx="5" ry="3.5" fill="url(#bme_body)" />
      <circle cx="34.5" cy="21.5" r="4" fill="url(#bme_body)" />
      <path d="M38.5 20.5 L43 22 L38.5 23.5 Z" fill="#fde68a" />
      <path d="M25 23 C21 17 26 14 30 19" fill="#60a5fa" opacity="0.7" />
      <circle cx="36" cy="20.5" r="1.5" fill="#0c1430" />
      <circle cx="36.5" cy="20" r="0.5" fill="#bfdbfe" />
      {/* "25" counter */}
      <circle cx="46" cy="48" r="9" fill="#1d4ed8" stroke="#fde68a" strokeWidth="1.5" />
      <text x="46" y="52" textAnchor="middle" fontSize="10" fill="#fef3c7" fontWeight="900" fontFamily="sans-serif">25</text>
      <text x="24" y="56" textAnchor="middle" fontSize="6.5" fill="#93c5fd" fontWeight="800" fontFamily="sans-serif">BIRDIE-MESTER</text>
    </svg>
  ),

  // 24. bogey_fri — en runde uten bogeys
  bogey_fri: ({ locked = false } = {}) => (
    <svg viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg" style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}>
      <defs>
        <linearGradient id="bf_bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d2410" />
          <stop offset="100%" stopColor="#040f06" />
        </linearGradient>
        <linearGradient id="bf_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="bf_shield" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#1a3d22" />
          <stop offset="100%" stopColor="#052e0e" />
        </linearGradient>
      </defs>
      <polygon points="32,3 56,17 56,47 32,61 8,47 8,17" fill="url(#bf_bg)" stroke="url(#bf_rim)" strokeWidth="2.5" />
      <polygon points="32,8 51,19.5 51,44.5 32,56 13,44.5 13,19.5" fill="none" stroke="#4ade80" strokeWidth="0.5" opacity="0.2" />
      {/* Shield shape */}
      <path d="M32 14 L47 21 L47 34 Q47 46 32 52 Q17 46 17 34 L17 21 Z" fill="url(#bf_shield)" stroke="#4ade80" strokeWidth="1.2" />
      {/* Shield sheen */}
      <path d="M32 14 L47 21 L44 18 L32 14 L20 18 L17 21 L32 14 Z" fill="#86efac" opacity="0.15" />
      {/* Crossed-out bogey — red circle + slash */}
      <circle cx="32" cy="33" r="10" fill="none" stroke="#ef4444" strokeWidth="2.2" />
      <line x1="25" y1="26" x2="39" y2="40" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
      {/* Green checkmark — victory over bogey */}
      <path d="M24 41 L30 47 L43 28" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="32" y="58" textAnchor="middle" fontSize="7.5" fill="#86efac" fontWeight="800" fontFamily="sans-serif">BOGEY-FRI</text>
    </svg>
  ),

  // 25. ren_runde — under par uten bogeys
  ren_runde: ({ locked = false } = {}) => (
    <svg viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg" style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}>
      <defs>
        <radialGradient id="rr_bg" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#0d2a10" />
          <stop offset="100%" stopColor="#030f05" />
        </radialGradient>
        <linearGradient id="rr_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A3E635" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
        <linearGradient id="rr_card" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1c3d22" />
          <stop offset="100%" stopColor="#0a2210" />
        </linearGradient>
        <linearGradient id="rr_score" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A3E635" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#rr_bg)" stroke="url(#rr_rim)" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="25" fill="none" stroke="#A3E635" strokeWidth="0.5" opacity="0.2" />
      {/* Scorecard */}
      <rect x="14" y="16" width="36" height="28" rx="4" fill="url(#rr_card)" stroke="#A3E635" strokeWidth="1" />
      {/* Card header */}
      <rect x="14" y="16" width="36" height="6" rx="4" fill="#A3E635" opacity="0.2" />
      <line x1="14" y1="22" x2="50" y2="22" stroke="#A3E635" strokeWidth="0.5" opacity="0.4" />
      {/* Score rows — green = par or better */}
      <rect x="18" y="25" width="8" height="3.5" rx="1.5" fill="#A3E635" opacity="0.6" />
      <rect x="28" y="25" width="8" height="3.5" rx="1.5" fill="#4ade80" opacity="0.5" />
      <rect x="38" y="25" width="8" height="3.5" rx="1.5" fill="#A3E635" opacity="0.6" />
      <rect x="18" y="31" width="8" height="3.5" rx="1.5" fill="#4ade80" opacity="0.5" />
      <rect x="28" y="31" width="8" height="3.5" rx="1.5" fill="#A3E635" opacity="0.6" />
      <rect x="38" y="31" width="8" height="3.5" rx="1.5" fill="#4ade80" opacity="0.5" />
      {/* Big checkmark overlay */}
      <path d="M19 38 L26 45 L43 24" stroke="url(#rr_score)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Star sparkle top right */}
      <path d="M50 10 L51.2 13.6 L55 13.6 L52 15.8 L53.2 19.4 L50 17.2 L46.8 19.4 L48 15.8 L45 13.6 L48.8 13.6 Z" fill="#A3E635" opacity="0.9" />
      <text x="32" y="57" textAnchor="middle" fontSize="7.5" fill="#A3E635" fontWeight="800" fontFamily="sans-serif">RENT KORT</text>
    </svg>
  ),

  // 12. Lagspiller — tagged 5 co-players
  // Three silhouette figures in a circle with a handshake motif
  lagspiller: ({ locked = false } = {}) => (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: locked ? lockedFilter : "none", transition: "filter 0.3s" }}
    >
      <defs>
        <radialGradient id="lag_bg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#0a1a2e" />
          <stop offset="100%" stopColor="#030810" />
        </radialGradient>
        <linearGradient id="lag_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lag_fig" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      {/* Circle medal */}
      <circle cx="32" cy="32" r="30" fill="url(#lag_bg)" stroke="url(#lag_rim)" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="25" fill="none" stroke="#93c5fd" strokeWidth="0.5" opacity="0.2" />
      {/* Center figure */}
      <circle cx="32" cy="20" r="5" fill="url(#lag_fig)" />
      <path d="M24 38 C24 30 40 30 40 38 L40 42 L24 42 Z" fill="url(#lag_fig)" />
      {/* Left figure */}
      <circle cx="16" cy="24" r="4" fill="#93c5fd" opacity="0.8" />
      <path d="M9 40 C9 33.5 23 33.5 23 40 L23 43 L9 43 Z" fill="#93c5fd" opacity="0.7" />
      {/* Right figure */}
      <circle cx="48" cy="24" r="4" fill="#93c5fd" opacity="0.8" />
      <path d="M41 40 C41 33.5 55 33.5 55 40 L55 43 L41 43 Z" fill="#93c5fd" opacity="0.7" />
      {/* Handshake symbol at bottom */}
      {/* Left hand */}
      <path d="M20 52 C20 49 24 48 26 50 L29 52" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Right hand */}
      <path d="M44 52 C44 49 40 48 38 50 L35 52" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Clasp point */}
      <circle cx="32" cy="52" r="3" fill="#3b82f6" />
      <circle cx="32" cy="52" r="1.5" fill="#bfdbfe" />
      {/* Connection dots arc between figures */}
      <circle cx="24" cy="44" r="1" fill="#93c5fd" opacity="0.5" />
      <circle cx="40" cy="44" r="1" fill="#93c5fd" opacity="0.5" />
      {/* Stars/sparkles */}
      <circle cx="12" cy="14" r="1.2" fill="#93c5fd" opacity="0.6" />
      <circle cx="52" cy="14" r="1.2" fill="#93c5fd" opacity="0.6" />
      <circle cx="8" cy="32" r="1" fill="#bfdbfe" opacity="0.5" />
      <circle cx="56" cy="32" r="1" fill="#bfdbfe" opacity="0.5" />
    </svg>
  ),
};

export default BADGE_ICONS;
