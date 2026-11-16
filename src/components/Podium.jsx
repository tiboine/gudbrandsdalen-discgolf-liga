import Avatar from "./Avatar";
import { TYPE } from "../themes";

const MEDALS = {
  1: { bg: "#E9C46A", fg: "#3A2A00" },
  2: { bg: "#C4C8BA", fg: "#1c1c1c" },
  3: { bg: "#D9A27A", fg: "#3B1E08" },
};

// Top 3 of the league table as one card: 2nd, 1st (larger, accent ring), 3rd.
export default function Podium({ top3, onSelect }) {
  const order = [[top3[1], 2], [top3[0], 1], [top3[2], 3]].filter(([p]) => p);
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${order.length}, minmax(0, 1fr))`, alignItems: "end", gap: 8, padding: "18px 12px 16px", marginBottom: 16, borderRadius: 24, background: "var(--c-bg-card)", border: "1px solid var(--c-border)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      {order.map(([p, rank], i) => {
        const first = rank === 1;
        const size = first ? 72 : 56;
        return (
          <button key={p.id} type="button" onClick={() => onSelect(p)} aria-label={`${rank}. plass: ${p.name}, ${p.pts} poeng`}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "4px 0", border: "none", background: "none", color: "inherit", fontFamily: "inherit", cursor: "pointer", minWidth: 0, animation: `fadeSlideUp 0.5s ease ${i * 0.08}s both` }}>
            <div style={{ position: "relative" }}>
              <Avatar url={p.avatar} name={p.name} size={size}
                style={{ border: first ? "3px solid var(--md-primary)" : "2px solid var(--c-border-strong)", background: first ? "var(--md-primary-a20)" : "var(--c-bg-card-strong)", boxShadow: first ? "0 4px 18px var(--md-primary-a30)" : "none", fontWeight: 800 }} />
              <span aria-hidden="true" style={{ position: "absolute", right: -4, bottom: -4, width: 24, height: 24, borderRadius: 12, background: MEDALS[rank].bg, color: MEDALS[rank].fg, fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 2px var(--c-bg-card-solid)" }}>{rank}</span>
            </div>
            <div style={{ ...TYPE.titleSmall, maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name.split(" ")[0]}</div>
            <div style={{ ...TYPE.number, fontSize: first ? 26 : 20, lineHeight: 1, color: first ? "var(--md-primary-text)" : "var(--c-text-primary)" }}>
              {p.pts}<span style={{ fontSize: 11, fontWeight: 600, color: "var(--c-text-muted)" }}> pts</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
