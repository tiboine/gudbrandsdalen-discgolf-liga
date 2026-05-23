// Disc golf background photos from Unsplash (free for commercial use)
export const BG_IMAGES = {
  basket_field: "https://images.unsplash.com/photo-1697746483194-cab9b84f6705?w=1600&q=70&auto=format&fit=crop",
  course_signage: "https://images.unsplash.com/photo-1616840388998-a514fe2175b9?w=1600&q=70&auto=format&fit=crop",
  basket_chains: "https://images.unsplash.com/photo-1725724767938-26e57f67a12c?w=1600&q=70&auto=format&fit=crop",
  throw_silhouette: "https://images.unsplash.com/photo-1725724636270-01f1b53ac17a?w=1600&q=70&auto=format&fit=crop",
  player_throw: "https://images.unsplash.com/photo-1655161915224-be1d887802aa?w=1600&q=70&auto=format&fit=crop",
};

// Color themes for live preview. Switch via the picker in the header.
export const THEMES = {
  skog: {
    name: "Skog",
    emoji: "🌲",
    bg: "linear-gradient(175deg, #f0f9e8 0%, #e6f4d4 40%, #f5faf0 100%)",
    accent: "#65A30D",
    accentLight: "#A3E635",
    accentDark: "#4a8a10",
    text: "#1c2b12",
    textMuted: "#6b7a58",
    mountain: "#A3E635",
    isDark: false,
    bgImage: "course_signage",
  },
  fjell: {
    name: "Fjell & Is",
    emoji: "🏔️",
    bg: "linear-gradient(175deg, #f0f7fa 0%, #e1edf3 40%, #f5f9fb 100%)",
    accent: "#0EA5E9",
    accentLight: "#7DD3FC",
    accentDark: "#0369A1",
    text: "#0c1e2e",
    textMuted: "#5b7a8e",
    mountain: "#7DD3FC",
    isDark: false,
    bgImage: "basket_field",
  },
  solnedgang: {
    name: "Solnedgang",
    emoji: "🌅",
    bg: "linear-gradient(175deg, #fff5eb 0%, #ffe8cc 40%, #fef3e0 100%)",
    accent: "#F97316",
    accentLight: "#FDBA74",
    accentDark: "#C2410C",
    text: "#3a1f0e",
    textMuted: "#9a6f4e",
    mountain: "#FDBA74",
    isDark: false,
    bgImage: "throw_silhouette",
  },
  host: {
    name: "Høst",
    emoji: "🍂",
    bg: "linear-gradient(175deg, #faf6ed 0%, #f0e6d2 40%, #f7f1e0 100%)",
    accent: "#B45309",
    accentLight: "#FCD34D",
    accentDark: "#78350F",
    text: "#2a1d0d",
    textMuted: "#8a7556",
    mountain: "#D6B47C",
    isDark: false,
    bgImage: "basket_chains",
  },
  // High-contrast dark theme optimized for outdoor / sunlight use.
  // Pure black bg + pure white text + brand-bright lime accent for maximum readability.
  kontrast: {
    name: "Sollys",
    emoji: "☀️",
    bg: "#000000",
    accent: "#A3E635",
    accentLight: "#BEF264",
    accentDark: "#65A30D",
    text: "#ffffff",
    textMuted: "#d0d0d0",
    mountain: "#A3E635",
    isDark: true,
    bgImage: null,
  },
};

// CSS variable defaults (light mode) and dark overrides applied to :root.
// Inline styles in App.jsx reference these via var(--name) — they stay identical
// in light themes, but flip to dark equivalents when a dark theme is active.
const LIGHT_VARS = {
  "--c-bg-card": "rgba(255,255,255,0.75)",
  "--c-bg-card-strong": "rgba(255,255,255,0.85)",
  "--c-bg-card-solid": "#ffffff",
  "--c-bg-input": "rgba(0,0,0,0.04)",
  "--c-bg-subtle": "rgba(0,0,0,0.03)",
  "--c-bg-muted": "rgba(0,0,0,0.06)",
  "--c-text-primary": "#1c2b12",
  "--c-text-secondary": "#4a5a38",
  "--c-text-muted": "#6b7a58",
  "--c-text-faint": "#8a9a70",
  "--c-border": "rgba(0,0,0,0.08)",
  "--c-border-light": "rgba(0,0,0,0.06)",
  "--c-border-strong": "rgba(0,0,0,0.1)",
  "--c-modal-bg": "linear-gradient(180deg, #ffffff, #f0f9e8)",
};

const DARK_VARS = {
  "--c-bg-card": "rgba(255,255,255,0.06)",
  "--c-bg-card-strong": "rgba(255,255,255,0.1)",
  "--c-bg-card-solid": "#141414",
  "--c-bg-input": "rgba(255,255,255,0.08)",
  "--c-bg-subtle": "rgba(255,255,255,0.04)",
  "--c-bg-muted": "rgba(255,255,255,0.08)",
  "--c-text-primary": "#ffffff",
  "--c-text-secondary": "#e5e5e5",
  "--c-text-muted": "#c0c0c0",
  "--c-text-faint": "#909090",
  "--c-border": "rgba(255,255,255,0.18)",
  "--c-border-light": "rgba(255,255,255,0.1)",
  "--c-border-strong": "rgba(255,255,255,0.25)",
  "--c-modal-bg": "linear-gradient(180deg, #1a1a1a, #0a0a0a)",
};

export function applyTheme(themeId) {
  const t = THEMES[themeId] || THEMES.skog;
  const root = document.documentElement;
  root.style.setProperty("--theme-bg", t.bg);
  root.style.setProperty("--theme-accent", t.accent);
  root.style.setProperty("--theme-accent-light", t.accentLight);
  root.style.setProperty("--theme-accent-dark", t.accentDark);
  root.style.setProperty("--theme-text", t.text);
  root.style.setProperty("--theme-text-muted", t.textMuted);
  root.style.setProperty("--theme-mountain", t.mountain);
  root.style.setProperty("--theme-is-dark", t.isDark ? "1" : "0");

  const vars = t.isDark ? DARK_VARS : LIGHT_VARS;
  for (const [k, v] of Object.entries(vars)) {
    root.style.setProperty(k, v);
  }
  root.setAttribute("data-theme-dark", t.isDark ? "true" : "false");
}
