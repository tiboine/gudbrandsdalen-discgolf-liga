import { useState, useEffect } from "react";

const COURSES = [
  { id: "skogen", name: "Skogen Diskgolfbane", location: "Lillehammer", holes: 22, par: 63, rating: 4.2, ratings: 1496, difficulty: "Moderat / Veldig vanskelig", length: "3.4 km", time: "~2 timer", udisc: "https://udisc.com/courses/skogen-diskgolfbane-exZE", desc: "Teknisk krevende skogsbane med mye variasjon. To layouts: Hvit (viderekomne) og Gul (nybegynnervennlig). Driftet av Lillehammer Frisbee.", free: true },
  { id: "jorstadmoen", name: "Jørstadmoen", location: "Lillehammer", holes: 18, par: 54, rating: 3.9, ratings: 2851, difficulty: "Lett", length: "2.4 km", time: "~1 time", udisc: "https://udisc.com/courses/jorstadmoen-12Ee", desc: "Populær og nybegynnervennlig bane. Barnevogn- og hundevennlig. Gode teepads på hvert hull.", free: true },
  { id: "sandbumoen", name: "Sandbumoen Discgolfbane", location: "Sør-Fron / Otta", holes: 18, par: 55, rating: 3.9, ratings: 102, difficulty: "Moderat", length: "2.0 km", time: "~1.5 timer", udisc: "https://udisc.com/courses/sandbumoen-discgolfbane-LGPU", desc: "Flott bane i naturskjønt skogsterreng. Spillbar for alle nivåer. Etablert 2025. OBS: Partier med glatt underlag.", free: true },
  { id: "kvam", name: "Kvam Idrettspark", location: "Kvam, Nord-Fron", holes: 9, par: 27, rating: 3.8, ratings: 232, difficulty: "Lett", length: "1.2 km", time: "~35 min", udisc: "https://udisc.com/courses/kvam-idrettspark-eRuW", desc: "Etablert av Kvam Idrettslag i 2023. Fin trenings- og putbane. Startkit kan lånes ved klubbhuset.", free: true },
  { id: "ringebu", name: "Ringebu Ungdomskole Discgolfbane", location: "Ringebu", holes: 9, par: 27, rating: 2.5, ratings: 107, difficulty: "Moderat", length: "1.7 km", time: "~1 time", udisc: "https://udisc.com/courses/ringebu-ungdomskole-discgolfbane-druU", desc: "9-hulls bane ved ungdomsskolen. Noen hull kan være overgrodd — sjekk forholdene på UDisc.", free: true },
  { id: "vinstra", name: "Vinstra Ungdomsskole", location: "Vinstra, Nord-Fron", holes: 6, par: 18, rating: 2.7, ratings: 81, difficulty: "Lett", length: "0.5 km", time: "~16 min", udisc: "https://udisc.com/courses/vinstra-ungdomsskole-Y0eH", desc: "Kort skolebane med DiscGolfPark-kurver. Perfekt for nybegynnere og raske runder.", free: true },
  { id: "otta", name: "Otta Disc Golf", location: "Otta, Sel", holes: 6, par: 18, rating: 2.2, ratings: 40, difficulty: "Lett", length: "Kort", time: "~20 min", udisc: "https://udisc.com/courses/otta-disc-golf-0vmE", desc: "Veldig korte hull, perfekt for nybegynnere. Mangler hull-kart men lett å finne.", free: true },
  { id: "oyer", name: "Øyer Ungdomsskole", location: "Øyer", holes: 9, par: 27, rating: 3.2, ratings: 50, difficulty: "Lett", length: "Kort", time: "~30 min", udisc: "https://udisc.com/courses?placeId=lillehammer-norway", desc: "Nybegynnervennlig bane. Hullengde varierer fra 30m til 70m.", free: true },
];

const generatePlayers = () => [
  { id: 1, name: "Eirik Dalen", avatar: "🏔️", rounds: 11, best: -8, avg: -3.2, pts: 94, trend: [8,10,12,10,14,12,10,14,12,10,14], division: "Åpen" },
  { id: 2, name: "Siri Nordfjell", avatar: "🌲", rounds: 10, best: -7, avg: -2.8, pts: 88, trend: [6,8,10,12,10,12,14,10,12,14], division: "Åpen" },
  { id: 3, name: "Magnus Kvam", avatar: "⛰️", rounds: 12, best: -6, avg: -2.1, pts: 82, trend: [10,8,6,8,10,8,10,12,10,8,10,12], division: "Åpen" },
  { id: 4, name: "Ingrid Fossheim", avatar: "🦌", rounds: 9, best: -5, avg: -1.9, pts: 76, trend: [4,6,8,6,8,10,8,10,12], division: "Åpen" },
  { id: 5, name: "Ole Brimi", avatar: "🎯", rounds: 11, best: -4, avg: -1.5, pts: 71, trend: [6,4,6,8,6,8,6,8,10,8,10], division: "Åpen" },
  { id: 6, name: "Kari Espedal", avatar: "🌿", rounds: 10, best: -3, avg: -0.8, pts: 65, trend: [4,2,4,6,4,6,8,6,8,6], division: "Rekreasjons" },
  { id: 7, name: "Torstein Heidal", avatar: "🏕️", rounds: 8, best: -5, avg: -1.2, pts: 59, trend: [6,4,6,4,8,6,8,6], division: "Rekreasjons" },
  { id: 8, name: "Astrid Sjoa", avatar: "💧", rounds: 10, best: -2, avg: 0.3, pts: 52, trend: [2,4,2,4,6,4,6,4,6,8], division: "Rekreasjons" },
  { id: 9, name: "Henrik Lom", avatar: "🗻", rounds: 7, best: -3, avg: -0.5, pts: 45, trend: [4,2,4,6,4,6,4], division: "Rekreasjons" },
  { id: 10, name: "Maja Brekke", avatar: "🌸", rounds: 9, best: -1, avg: 1.2, pts: 38, trend: [2,0,2,4,2,4,2,4,6], division: "Rekreasjons" },
];

const RECENT_ROUNDS = [
  { id: 1, player: "Eirik Dalen", course: "Skogen Diskgolfbane", score: -8, pts: 14, date: "22. mars", holes: "22/22" },
  { id: 2, player: "Siri Nordfjell", course: "Jørstadmoen", score: -5, pts: 12, date: "22. mars", holes: "18/18" },
  { id: 3, player: "Magnus Kvam", course: "Sandbumoen Discgolfbane", score: -3, pts: 10, date: "21. mars", holes: "18/18" },
  { id: 4, player: "Ingrid Fossheim", course: "Kvam Idrettspark", score: -4, pts: 10, date: "20. mars", holes: "9/9" },
  { id: 5, player: "Ole Brimi", course: "Ringebu Ungdomskole", score: -2, pts: 8, date: "20. mars", holes: "9/9" },
  { id: 6, player: "Torstein Heidal", course: "Vinstra Ungdomsskole", score: -1, pts: 6, date: "19. mars", holes: "6/6" },
];

const STABLEFORD_INFO = [
  { place: "1.", pts: 14 }, { place: "2.", pts: 12 }, { place: "3.", pts: 10 },
  { place: "4.", pts: 8 }, { place: "5.", pts: 6 }, { place: "6.", pts: 5 },
  { place: "7.", pts: 4 }, { place: "8.", pts: 3 }, { place: "9-10.", pts: 2 },
];

function Sparkline({ data, color = "#A3E635" }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const w = 80, h = 28;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`).join(" ");
  const last = pts.split(" ").pop().split(",");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={pts} />
      <circle cx={parseFloat(last[0])} cy={parseFloat(last[1])} r="3" fill={color} />
    </svg>
  );
}

function AnimNum({ value }) {
  const [d, setD] = useState(0);
  useEffect(() => {
    let s = 0;
    const t = setInterval(() => { s += value > s ? 1 : -1; setD(s); if (s === value) clearInterval(t); }, Math.max(Math.ceil(900 / Math.abs(value || 1)), 15));
    return () => clearInterval(t);
  }, [value]);
  return <span>{d}</span>;
}

function Stars({ rating }) {
  const full = Math.floor(rating), half = rating - full >= 0.3;
  return (
    <span style={{ display: "inline-flex", gap: 1, fontSize: 11 }}>
      {[...Array(5)].map((_, i) => <span key={i} style={{ color: i < full || (i === full && half) ? "#facc15" : "#3a3a2a", opacity: i < full || (i === full && half) ? 1 : 0.3 }}>★</span>)}
      <span style={{ fontSize: 11, color: "#8a9a70", marginLeft: 4, fontWeight: 700 }}>{rating}</span>
    </span>
  );
}

export default function DiscGolfLeague() {
  const [tab, setTab] = useState("tabell");
  const [division, setDivision] = useState("Alle");
  const [showRegister, setShowRegister] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [regForm, setRegForm] = useState({ course: "", score: "", date: "" });
  const [regSuccess, setRegSuccess] = useState(false);

  const players = generatePlayers();
  const filtered = division === "Alle" ? players : players.filter(p => p.division === division);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(175deg, #0a0f0a 0%, #111a11 40%, #1a2618 100%)", color: "#e8e8e0", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.04, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 0, pointerEvents: "none", opacity: 0.06 }}>
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none" style={{ width: "100%", height: "200px" }}>
          <path d="M0,200 L0,140 L100,80 L200,120 L300,40 L400,90 L500,20 L600,70 L700,30 L800,80 L900,50 L1000,100 L1100,60 L1200,90 L1200,200 Z" fill="#A3E635" />
        </svg>
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "24px 20px 0" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #A3E635, #65A30D)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#0a0f0a", boxShadow: "0 0 20px rgba(163,230,53,0.3)" }}>🥏</div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#A3E635", fontWeight: 700 }}>Gudbrandsdalen</div>
                <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>Discgolf Liga</div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: "#8a9a70", background: "rgba(163,230,53,0.08)", padding: "4px 10px", borderRadius: 20, border: "1px solid rgba(163,230,53,0.15)", fontWeight: 600 }}>Sesong: Vår 2026</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, margin: "16px 0" }}>
            {[{ label: "Spillere", value: 10, icon: "👥" }, { label: "Runder spilt", value: 97, icon: "🥏" }, { label: "Baner", value: 8, icon: "🗺️" }].map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px 10px", textAlign: "center" }}>
                <div style={{ fontSize: 13, marginBottom: 2 }}>{s.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1 }}><AnimNum value={s.value} /></div>
                <div style={{ fontSize: 10, color: "#6b7a58", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <button onClick={() => setShowRegister(true)} style={{ width: "100%", padding: "14px", border: "none", borderRadius: 14, background: "linear-gradient(135deg, #A3E635 0%, #65A30D 100%)", color: "#0a0f0a", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 24px rgba(163,230,53,0.25), inset 0 1px 0 rgba(255,255,255,0.2)", transition: "transform 0.15s", marginBottom: 16 }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >+ Registrer runde</button>

          <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 4 }}>
            {[{ id: "tabell", label: "Ligatabell", icon: "🏆" }, { id: "runder", label: "Runder", icon: "📋" }, { id: "baner", label: "Baner", icon: "🗺️" }, { id: "regler", label: "Poeng", icon: "📊" }].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "10px 6px", border: "none", borderRadius: 10, background: tab === t.id ? "rgba(163,230,53,0.15)" : "transparent", color: tab === t.id ? "#A3E635" : "#6b7a58", fontWeight: tab === t.id ? 700 : 500, fontSize: 12, cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ fontSize: 14, marginBottom: 2 }}>{t.icon}</div>{t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "16px 20px 100px", maxWidth: 600, margin: "0 auto" }}>

        {tab === "tabell" && (
          <div>
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              {["Alle", "Åpen", "Rekreasjons"].map(d => (
                <button key={d} onClick={() => setDivision(d)} style={{ padding: "6px 14px", border: "1px solid", borderColor: division === d ? "#A3E635" : "rgba(255,255,255,0.08)", borderRadius: 20, background: division === d ? "rgba(163,230,53,0.12)" : "transparent", color: division === d ? "#A3E635" : "#6b7a58", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{d}</button>
              ))}
            </div>
            {division !== "Rekreasjons" && (
              <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "flex-end", justifyContent: "center" }}>
                {[filtered[1], filtered[0], filtered[2]].filter(Boolean).map((p, i) => {
                  const h = [100, 130, 80], m = ["🥈", "🥇", "🥉"], sz = [44, 56, 40];
                  return (
                    <div key={p.id} onClick={() => setSelectedPlayer(p)} style={{ textAlign: "center", cursor: "pointer", flex: 1, animation: `fadeSlideUp 0.5s ease ${i * 0.1}s both` }}>
                      <div style={{ width: sz[i], height: sz[i], borderRadius: "50%", margin: "0 auto 6px", background: i === 1 ? "linear-gradient(135deg, #A3E635, #65A30D)" : "rgba(255,255,255,0.06)", border: i === 1 ? "2px solid #A3E635" : "2px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: sz[i] * 0.45, boxShadow: i === 1 ? "0 0 30px rgba(163,230,53,0.3)" : "none" }}>{p.avatar}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{p.name.split(" ")[0]}</div>
                      <div style={{ height: h[i], borderRadius: "12px 12px 0 0", background: i === 1 ? "linear-gradient(180deg, rgba(163,230,53,0.25), rgba(163,230,53,0.05))" : "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderBottom: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ fontSize: 20 }}>{m[i]}</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: i === 1 ? "#A3E635" : "#e8e8e0" }}>{p.pts}</div>
                        <div style={{ fontSize: 9, color: "#6b7a58", textTransform: "uppercase", letterSpacing: "0.1em" }}>poeng</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 60px 50px 80px", padding: "10px 14px", fontSize: 10, color: "#6b7a58", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div>#</div><div>Spiller</div><div style={{ textAlign: "right" }}>Snitt</div><div style={{ textAlign: "right" }}>Pts</div><div style={{ textAlign: "right" }}>Trend</div>
              </div>
              {filtered.map((p, i) => (
                <div key={p.id} onClick={() => setSelectedPlayer(p)} style={{ display: "grid", gridTemplateColumns: "32px 1fr 60px 50px 80px", padding: "12px 14px", alignItems: "center", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.03)", background: i === 0 ? "rgba(163,230,53,0.04)" : "transparent", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(163,230,53,0.06)"}
                  onMouseLeave={e => e.currentTarget.style.background = i === 0 ? "rgba(163,230,53,0.04)" : "transparent"}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: i < 3 ? "#A3E635" : "#6b7a58" }}>{i + 1}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, border: "1px solid rgba(255,255,255,0.08)" }}>{p.avatar}</div>
                    <div><div style={{ fontSize: 13, fontWeight: 700 }}>{p.name}</div><div style={{ fontSize: 10, color: "#6b7a58" }}>{p.rounds} runder · {p.division}</div></div>
                  </div>
                  <div style={{ textAlign: "right", fontSize: 13, fontWeight: 600, color: p.avg <= 0 ? "#A3E635" : "#ef4444" }}>{p.avg > 0 ? "+" : ""}{p.avg}</div>
                  <div style={{ textAlign: "right", fontSize: 15, fontWeight: 900 }}>{p.pts}</div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}><Sparkline data={p.trend} color={i < 3 ? "#A3E635" : "#6b7a58"} /></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "runder" && (
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Siste runder</div>
            {RECENT_ROUNDS.map((r, i) => (
              <div key={r.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "14px 16px", display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "center", marginBottom: 8, animation: `fadeSlideUp 0.4s ease ${i * 0.06}s both` }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{r.player}</div>
                  <div style={{ fontSize: 11, color: "#6b7a58", marginBottom: 4 }}>{r.course}</div>
                  <div style={{ display: "flex", gap: 8, fontSize: 11, color: "#8a9a70" }}><span>{r.date}</span><span>·</span><span>{r.holes}</span></div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: r.score <= 0 ? "#A3E635" : "#ef4444", lineHeight: 1 }}>{r.score > 0 ? "+" : ""}{r.score}</div>
                  <div style={{ fontSize: 11, color: "#A3E635", fontWeight: 700, background: "rgba(163,230,53,0.1)", padding: "2px 8px", borderRadius: 10, marginTop: 4, display: "inline-block" }}>+{r.pts} pts</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "baner" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>Baner i ligaen</div>
              <div style={{ fontSize: 11, color: "#6b7a58" }}>Data fra <span style={{ color: "#A3E635", fontWeight: 700 }}>UDisc</span></div>
            </div>
            {COURSES.map((c, i) => (
              <div key={c.id} onClick={() => setSelectedCourse(selectedCourse?.id === c.id ? null : c)} style={{ background: selectedCourse?.id === c.id ? "rgba(163,230,53,0.04)" : "rgba(255,255,255,0.02)", border: selectedCourse?.id === c.id ? "1px solid rgba(163,230,53,0.2)" : "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "16px", cursor: "pointer", transition: "all 0.2s", marginBottom: 10, animation: `fadeSlideUp 0.4s ease ${i * 0.05}s both` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: "#8a9a70", marginBottom: 6 }}>{c.location}</div>
                    <Stars rating={c.rating} />
                    {c.ratings && <span style={{ fontSize: 10, color: "#6b7a58", marginLeft: 4 }}>({c.ratings})</span>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <div style={{ padding: "4px 10px", borderRadius: 10, background: "rgba(163,230,53,0.08)", border: "1px solid rgba(163,230,53,0.15)", fontSize: 11, fontWeight: 700, color: "#A3E635" }}>{c.holes} hull</div>
                    <div style={{ fontSize: 10, color: "#6b7a58" }}>Par {c.par}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[{ label: c.difficulty, color: c.difficulty.includes("Vanskelig") ? "#f97316" : c.difficulty === "Moderat" ? "#facc15" : "#A3E635" }, { label: c.time }, { label: c.length }, { label: "Gratis", color: "#A3E635" }].map((tag, j) => (
                    <span key={j} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: tag.color || "#8a9a70", fontWeight: 600 }}>{tag.label}</span>
                  ))}
                </div>
                {selectedCourse?.id === c.id && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)", animation: "fadeSlideUp 0.3s ease" }}>
                    <div style={{ fontSize: 12, color: "#a0a890", lineHeight: 1.6, marginBottom: 12 }}>{c.desc}</div>
                    <a href={c.udisc} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, background: "rgba(163,230,53,0.12)", border: "1px solid rgba(163,230,53,0.25)", color: "#A3E635", fontWeight: 700, fontSize: 12, textDecoration: "none" }}>
                      🔗 Se på UDisc
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "regler" && (
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Stableford-poeng</div>
            <div style={{ fontSize: 12, color: "#6b7a58", marginBottom: 16, lineHeight: 1.5 }}>Poeng deles ut basert på plassering i hver runde. Beste 8 av 12 runder teller.</div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }}>
              {STABLEFORD_INFO.map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.03)", background: i === 0 ? "rgba(163,230,53,0.04)" : "transparent" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: i < 3 ? `rgba(163,230,53,${0.2 - i * 0.05})` : "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: i < 3 ? "#A3E635" : "#6b7a58" }}>{s.place}</div>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Plass {s.place}</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: i < 3 ? "#A3E635" : "#e8e8e0" }}>{s.pts} <span style={{ fontSize: 10, fontWeight: 600, color: "#6b7a58" }}>pts</span></div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: 16, borderRadius: 14, background: "rgba(163,230,53,0.05)", border: "1px solid rgba(163,230,53,0.1)", fontSize: 12, color: "#8a9a70", lineHeight: 1.6 }}>
              <div style={{ fontWeight: 700, color: "#A3E635", marginBottom: 4 }}>💡 Slik fungerer det</div>
              Hver runde du spiller i ligaen gir poeng basert på din plassering blant alle som spilte den runden. Ved likt resultat deles poengene. Sesongen har 12 planlagte runder, men kun dine 8 beste teller — så du kan misse noen runder uten å tape for mye!
            </div>
          </div>
        )}
      </div>

      {selectedPlayer && (
        <div onClick={() => setSelectedPlayer(null)} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 20, animation: "fadeIn 0.2s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 500, maxHeight: "80vh", background: "linear-gradient(180deg, #1a2618, #111a11)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 24, overflowY: "auto", animation: "slideUp 0.3s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 54, height: 54, borderRadius: "50%", background: "linear-gradient(135deg, rgba(163,230,53,0.2), rgba(163,230,53,0.05))", border: "2px solid rgba(163,230,53,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{selectedPlayer.avatar}</div>
              <div><div style={{ fontSize: 20, fontWeight: 800 }}>{selectedPlayer.name}</div><div style={{ fontSize: 12, color: "#6b7a58" }}>{selectedPlayer.division} divisjon</div></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
              {[{ l: "Runder", v: selectedPlayer.rounds }, { l: "Beste", v: selectedPlayer.best }, { l: "Snitt", v: selectedPlayer.avg > 0 ? `+${selectedPlayer.avg}` : selectedPlayer.avg }, { l: "Poeng", v: selectedPlayer.pts }].map(s => (
                <div key={s.l} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "12px 8px", textAlign: "center", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: "#A3E635" }}>{s.v}</div>
                  <div style={{ fontSize: 9, color: "#6b7a58", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 12, fontSize: 13, fontWeight: 700 }}>Poengutvikling</div>
            <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
              <Sparkline data={selectedPlayer.trend} color="#A3E635" />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10, color: "#6b7a58" }}><span>Runde 1</span><span>Runde {selectedPlayer.trend.length}</span></div>
            </div>
            <button onClick={() => setSelectedPlayer(null)} style={{ width: "100%", padding: 14, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, background: "transparent", color: "#e8e8e0", fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 16 }}>Lukk</button>
          </div>
        </div>
      )}

      {showRegister && (
        <div onClick={() => { setShowRegister(false); setRegSuccess(false); }} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 20, animation: "fadeIn 0.2s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 500, background: "linear-gradient(180deg, #1a2618, #111a11)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 24, animation: "slideUp 0.3s ease" }}>
            {regSuccess ? (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Runde registrert!</div>
                <div style={{ fontSize: 13, color: "#6b7a58" }}>Poengene dine oppdateres snart</div>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Registrer runde</div>
                <div style={{ fontSize: 12, color: "#6b7a58", marginBottom: 20 }}>Legg inn scoren din for å få ligapoeng</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#8a9a70", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Bane</label>
                    <select value={regForm.course} onChange={e => setRegForm({ ...regForm, course: e.target.value })} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#e8e8e0", fontSize: 14, outline: "none", appearance: "none", boxSizing: "border-box" }}>
                      <option value="">Velg bane...</option>
                      {COURSES.map(c => <option key={c.id} value={c.id}>{c.name} ({c.holes}h, par {c.par}) ★{c.rating}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#8a9a70", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Score (mot par)</label>
                    <input type="number" placeholder="f.eks. -3" value={regForm.score} onChange={e => setRegForm({ ...regForm, score: e.target.value })} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#e8e8e0", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#8a9a70", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Dato</label>
                    <input type="date" value={regForm.date} onChange={e => setRegForm({ ...regForm, date: e.target.value })} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#e8e8e0", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <button onClick={(e) => { e.preventDefault(); setRegSuccess(true); setTimeout(() => { setRegSuccess(false); setShowRegister(false); setRegForm({ course: "", score: "", date: "" }); }, 2000); }} style={{ width: "100%", padding: 14, border: "none", borderRadius: 14, background: "linear-gradient(135deg, #A3E635, #65A30D)", color: "#0a0f0a", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 24px rgba(163,230,53,0.25)", marginTop: 4 }}>Registrer 🥏</button>
                  <button onClick={() => setShowRegister(false)} style={{ width: "100%", padding: 12, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, background: "transparent", color: "#6b7a58", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Avbryt</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        select option { background: #1a2618; color: #e8e8e0; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.7); }
      `}</style>
    </div>
  );
}
