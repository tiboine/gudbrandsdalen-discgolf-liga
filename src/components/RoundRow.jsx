import { TYPE } from "../themes";
import { formatVsPar, fmtDate } from "../lib/format";
import { clickable } from "../lib/a11y";

// Compact round row (course, date, total and vs-par, optional note) used in the
// player and profile modals. Extra content (e.g. "Spilt med") goes in children.
export default function RoundRow({ courseName, date, score, total, note, onClick, children }) {
  return (
    <div {...clickable(onClick)}
      style={{ background: "var(--c-bg-subtle)", borderRadius: 10, padding: "10px 14px", marginBottom: 6, border: "1px solid var(--c-border-light)", cursor: "pointer", transition: "background 0.15s" }}
      onMouseEnter={e => e.currentTarget.style.background = "var(--md-primary-a06)"}
      onMouseLeave={e => e.currentTarget.style.background = "var(--c-bg-subtle)"}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ ...TYPE.titleSmall, color: "var(--c-text-primary)" }}>{courseName}</div>
          <div style={{ ...TYPE.bodySmall, color: "var(--c-text-muted)", marginTop: 2 }}>{fmtDate(date)}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ ...TYPE.number, fontSize: 18, color: score <= 0 ? "var(--md-primary-text)" : "#ef4444" }}>{total}</div>
          <div style={{ fontSize: 10, color: "var(--c-text-muted)" }}>({formatVsPar(score)})</div>
        </div>
      </div>
      {note && <div style={{ fontSize: 11, color: "var(--md-label)", marginTop: 6, fontStyle: "italic", background: "var(--md-primary-a06)", padding: "3px 8px", borderRadius: 6, display: "inline-block" }}>💬 {note}</div>}
      {children}
    </div>
  );
}
