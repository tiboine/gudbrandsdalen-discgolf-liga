// Round avatar: profile photo, or the first letter of the name as fallback.
// Values that aren't http(s) URLs (legacy/emoji) fall back to the initial.
// With onClick it renders as a real <button> (keyboard + screen reader).
export default function Avatar({ url, name, size = 32, onClick, label, style }) {
  const base = {
    width: size, height: size, minWidth: size, minHeight: size,
    borderRadius: "50%", overflow: "hidden", flexShrink: 0,
    background: "rgba(101,163,13,0.1)", border: "1px solid rgba(0,0,0,0.08)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: Math.round(size * 0.45),
  };
  const content = url?.startsWith("http")
    ? <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    : (name?.[0] ?? "?");

  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-label={label || `Vis ${name || "spiller"}`}
        style={{ ...base, padding: 0, color: "inherit", fontFamily: "inherit", fontWeight: "inherit", cursor: "pointer", ...style }}>
        {content}
      </button>
    );
  }
  return <div style={{ ...base, ...style }}>{content}</div>;
}
