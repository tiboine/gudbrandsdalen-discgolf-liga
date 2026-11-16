// M3 navigation bar fixed to the bottom of the screen. The active destination gets a
// pill behind its icon. items: [{ id, label, icon?: ({ size, color }) => svg, badge? }]
export const NAV_HEIGHT = 68;

export default function NavBar({ items, active, onSelect }) {
  return (
    <nav aria-label="Hovedmeny" style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 50, background: "var(--c-bg-card-solid)", borderTop: "1px solid var(--c-border)", boxShadow: "0 -2px 12px rgba(0,0,0,0.06)", paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div style={{ maxWidth: "var(--app-max-w, 600px)", margin: "0 auto", height: NAV_HEIGHT, display: "grid", gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((it) => {
          const on = active === it.id;
          const color = on ? "var(--md-primary-text)" : "var(--c-text-muted)";
          return (
            <button key={it.id} type="button" onClick={() => onSelect(it.id)} aria-current={on ? "page" : undefined}
              style={{ background: "none", border: "none", padding: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, cursor: "pointer", fontFamily: "inherit", color: on ? "var(--c-text-primary)" : "var(--c-text-muted)" }}>
              <span style={{ position: "relative", width: 56, height: 30, borderRadius: 15, display: "flex", alignItems: "center", justifyContent: "center", background: on ? "var(--md-primary-a20)" : "transparent", transition: "background 0.2s" }}>
                {it.icon ? it.icon({ size: 22, color }) : null}
                {it.badge ? (
                  <span style={{ position: "absolute", top: -2, right: 8, minWidth: 16, height: 16, padding: "0 4px", borderRadius: 8, background: "#ef4444", color: "#fff", fontSize: 9, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{it.badge}</span>
                ) : null}
              </span>
              <span style={{ fontSize: 11, fontWeight: on ? 700 : 500, lineHeight: 1 }}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
