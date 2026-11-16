import Avatar from "./Avatar";
import { TYPE } from "../themes";
import { formatVsPar, fmtDate } from "../lib/format";
import { clickable } from "../lib/a11y";

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

// Round in the Runder feed: who/where, big score vs par, league points, course record,
// hole stats and group mates. Pure display — all data comes in as props.
export default function RoundCard({ round, courseName, par, total, points, isMajor, isRecord, groupMates = [], onOpen, onOpenPlayer, delay = 0 }) {
  const vs = round.score;
  const scoreColor = vs < 0 ? "var(--md-primary-text)" : vs > 0 ? "#ef4444" : "var(--c-text-primary)";
  const stats = [
    round.aces > 0 && plural(round.aces, "ace", "aces"),
    round.eagles > 0 && plural(round.eagles, "eagle", "eagles"),
    round.birdies > 0 && plural(round.birdies, "birdie", "birdies"),
    round.bogeys > 0 && plural(round.bogeys, "bogey", "bogeys"),
  ].filter(Boolean);

  return (
    <article {...clickable(onOpen)}
      style={{ background: "var(--c-bg-card)", border: "1px solid var(--c-border)", borderRadius: 20, padding: "14px 16px", marginBottom: 10, display: "flex", flexDirection: "column", gap: 12, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", animation: `fadeSlideUp 0.4s ease ${delay}s both`, transition: "background 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.background = "var(--md-primary-a06)"}
      onMouseLeave={e => e.currentTarget.style.background = "var(--c-bg-card)"}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Avatar url={round.profiles?.avatar_url} name={round.profiles?.full_name} size={40} onClick={(e) => { e.stopPropagation(); onOpenPlayer(round.user_id); }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...TYPE.title, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{round.profiles?.full_name ?? "Ukjent spiller"}</div>
          <div style={{ ...TYPE.bodySmall, color: "var(--c-text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{fmtDate(round.date)} · {courseName}</div>
        </div>
        {isMajor && <span style={{ flexShrink: 0, padding: "2px 8px", borderRadius: 6, background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.35)", color: "#b07a00", fontSize: 11, fontWeight: 700 }}>Major</span>}
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
        <div style={{ ...TYPE.number, fontSize: 38, lineHeight: 1, letterSpacing: "-0.02em", color: scoreColor }}>{formatVsPar(vs)}</div>
        <div style={{ ...TYPE.body, color: "var(--c-text-muted)", flex: 1, paddingBottom: 2 }}>{total} kast{par ? ` · par ${par}` : ""}</div>
        {points != null && <span style={{ flexShrink: 0, padding: "5px 12px", borderRadius: 16, background: "var(--md-primary-a15)", color: "var(--md-primary-text)", fontSize: 15, fontWeight: 800 }}>{points} pts</span>}
      </div>

      {isRecord && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 12, background: "rgba(251,191,36,0.14)", color: "#b07a00", fontSize: 13, fontWeight: 700 }}>🏆 Banerekord</div>
      )}

      {(stats.length > 0 || groupMates.length > 0) && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {stats.map(s => (
            <span key={s} style={{ padding: "3px 10px", borderRadius: 8, border: "1px solid var(--c-border-strong)", fontSize: 12, fontWeight: 600, color: "var(--c-text-muted)" }}>{s}</span>
          ))}
          {groupMates.length > 0 && (
            <span style={{ fontSize: 12, color: "var(--c-text-muted)", marginLeft: "auto" }}>
              Med {groupMates.map((gm, gi) => (
                <span key={gm.id}>
                  {gi > 0 && ", "}
                  <span {...clickable((e) => { e.stopPropagation(); onOpenPlayer(gm.user_id); })} style={{ color: "var(--md-primary-text)", fontWeight: 600, cursor: "pointer" }}>{gm.profiles?.full_name?.split(" ")[0] ?? "Ukjent"}</span>
                </span>
              ))}
            </span>
          )}
        </div>
      )}

      {round.note && <div style={{ fontSize: 12, color: "var(--md-label)", fontStyle: "italic", background: "var(--md-primary-a06)", padding: "4px 10px", borderRadius: 8, alignSelf: "flex-start" }}>💬 {round.note}</div>}
    </article>
  );
}
