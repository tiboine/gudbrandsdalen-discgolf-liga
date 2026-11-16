import Avatar from "./Avatar";
import { TYPE } from "../themes";
import { clickable } from "../lib/a11y";

// League table row: rank, avatar + first name + subtitle, then the trailing stat
// cells passed as children. `columns` is the grid template shared with the header.
export default function PlayerRow({ player, rank, highlight, background = "transparent", dim, columns, onClick, children }) {
  const hoverOn = dim ? (e) => { e.currentTarget.style.opacity = "1"; } : (e) => { e.currentTarget.style.background = "var(--md-primary-a08)"; };
  const hoverOff = dim ? (e) => { e.currentTarget.style.opacity = "0.85"; } : (e) => { e.currentTarget.style.background = background; };
  return (
    <div {...clickable(onClick)}
      style={{ display: "grid", gridTemplateColumns: columns, padding: "12px 14px", alignItems: "center", cursor: "pointer", borderBottom: "1px solid var(--c-border-light)", background, opacity: dim ? 0.85 : 1, transition: "background 0.2s, opacity 0.2s" }}
      onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
      <div style={{ fontSize: 13, fontWeight: rank == null ? 700 : 800, color: highlight ? "var(--md-primary-text)" : "var(--c-text-faint)" }}>{rank ?? "—"}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Avatar url={player.avatar} name={player.name} size={30} />
        <div style={{ minWidth: 0 }}>
          <div style={{ ...TYPE.titleSmall, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{player.name.split(" ")[0]}</div>
          <div style={{ fontSize: 10, color: "var(--c-text-muted)" }}>{player.rounds}r · {player.hometown || player.division}</div>
        </div>
      </div>
      {children}
    </div>
  );
}
