// Total throws with −/+ buttons around a large, still typeable number. The first tap
// on an empty field starts at par. value/onChange use strings, like the form state.
export default function ScoreStepper({ value, onChange, par, disabled }) {
  const n = parseInt(value);
  const step = (d) => onChange(String(isNaN(n) ? (par || 54) : Math.max(1, n + d)));
  const btn = {
    width: 56, height: 56, flexShrink: 0, borderRadius: 28, border: "none", background: "var(--md-primary-a15)", color: "var(--md-primary-text)",
    display: "flex", alignItems: "center", justifyContent: "center", cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.5 : 1,
  };
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, padding: "12px 8px", borderRadius: 20, background: "var(--c-bg-input)" }}>
      <button type="button" aria-label="Ett kast færre" disabled={disabled} onClick={() => step(-1)} style={btn}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14" /></svg>
      </button>
      <input className="no-spin" type="number" inputMode="numeric" aria-label="Antall kast" placeholder={par ? String(par) : "–"} disabled={disabled}
        value={value} onChange={e => onChange(e.target.value)}
        style={{ width: 110, textAlign: "center", fontSize: 44, fontWeight: 900, fontVariantNumeric: "tabular-nums", border: "none", background: "transparent", color: "var(--c-text-primary)", fontFamily: "inherit", MozAppearance: "textfield" }} />
      <button type="button" aria-label="Ett kast flere" disabled={disabled} onClick={() => step(1)} style={btn}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
      </button>
    </div>
  );
}
