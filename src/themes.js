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
  natt: {
    name: "Mørk turnering",
    emoji: "⚡",
    bg: "linear-gradient(175deg, #0c0d12 0%, #15161e 40%, #1a1c26 100%)",
    accent: "#8B5CF6",
    accentLight: "#A78BFA",
    accentDark: "#6D28D9",
    text: "#f1f0f7",
    textMuted: "#9ea0b3",
    mountain: "#7C3AED",
    isDark: true,
    bgImage: "player_throw",
  },
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
}
