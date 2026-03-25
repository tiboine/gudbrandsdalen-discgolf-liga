import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const COURSES = [
  { id: "skogen", name: "Skogen Diskgolfbane", location: "Lillehammer", holes: 22, par: 63, rating: 4.2, ratings: 1496, difficulty: "Moderat / Veldig vanskelig", length: "3.4 km", time: "~2 timer", udisc: "https://udisc.com/courses/skogen-diskgolfbane-exZE", desc: "Teknisk krevende skogsbane med mye variasjon. To layouts: Hvit (viderekomne) og Gul (nybegynnervennlig). Driftet av Lillehammer Frisbee.", free: true, lat: 61.155, lng: 10.477 },
  { id: "jorstadmoen", name: "Jørstadmoen", location: "Lillehammer", holes: 18, par: 54, rating: 3.9, ratings: 2851, difficulty: "Lett", length: "2.4 km", time: "~1 time", udisc: "https://udisc.com/courses/jorstadmoen-12Ee", desc: "Populær og nybegynnervennlig bane. Barnevogn- og hundevennlig. Gode teepads på hvert hull.", free: true, lat: 61.151, lng: 10.383 },
  { id: "oyer", name: "Øyer Ungdomsskole", location: "Øyer", holes: 9, par: 27, rating: 3.2, ratings: 428, difficulty: "Lett", length: "1.1 km", time: "~1 time", udisc: "https://udisc.com/courses/oyer-ungdomsskole-vwjL", desc: "Nybegynnervennlig bane. Hullengde varierer fra 30m til 70m.", free: true, lat: 61.235, lng: 10.443 },
  { id: "ringebu-u", name: "Ringebu Ungdomskole Discgolfbane", location: "Ringebu", holes: 9, par: 27, rating: 2.5, ratings: 107, difficulty: "Moderat", length: "1.7 km", time: "~1 time", udisc: "https://udisc.com/courses/ringebu-ungdomskole-discgolfbane-druU", desc: "9-hulls bane ved ungdomsskolen. Noen hull kan være overgrodd — sjekk forholdene på UDisc.", free: true, lat: 61.531, lng: 10.155 },
  { id: "ringebu-b", name: "Ringebu Barneskole Discgolfpark", location: "Ringebu", holes: 9, par: 27, rating: 1.1, ratings: 27, difficulty: "Lett", length: "1.3 km", time: "~45 min", udisc: "https://udisc.com/courses/ringebu-barneskole-discgolfpark-lxFz", desc: "9-hulls bane ved barneskolen. Etablert 2019. OBS: Mye vegetasjon og noe overgrodd. Anbefales å sjekke forhold på UDisc.", free: true, lat: 61.530, lng: 10.140 },
  { id: "lundesetra", name: "Lundesetra Frisbeegolfbane", location: "Venabygd, Ringebu", holes: 18, par: 61, rating: 3.7, ratings: 105, difficulty: "Vanskelig", length: "2.2 km", time: "~1.5-2 timer", udisc: "https://udisc.com/courses/lundesetra-frisbeegolfbane-uNnB", desc: "Flott fjellbane på 950 moh med panoramautsikt over Venabygdsfjellet. Etablert 2025. Familievennlig 9-hulls layout + krevende 18-hulls layout. Sesongbane.", free: true, lat: 61.856, lng: 10.183 },
  { id: "sandbumoen", name: "Sandbumoen Discgolfbane", location: "Sør-Fron", holes: 18, par: 55, rating: 3.9, ratings: 102, difficulty: "Moderat", length: "2.0 km", time: "~1.5 timer", udisc: "https://udisc.com/courses/sandbumoen-discgolfbane-LGPU", desc: "Flott bane i naturskjønt skogsterreng. Spillbar for alle nivåer. Etablert 2025. OBS: Partier med glatt underlag.", free: true, lat: 61.553, lng: 9.988 },
  { id: "gaala", name: "Gålå", location: "Gålå, Sør-Fron", holes: 18, par: 59, rating: 3.6, ratings: 412, difficulty: "Lett / Moderat", length: "2.4 km", time: "~1.5 timer", udisc: "https://udisc.com/courses/gala-3Ekm", desc: "Variert 18-hulls bane med store høydeforskjeller i alpint terreng. Fire layoutvalg: Pro, Amateur og to front-9-varianter. Sesongbane — stengt når skianlegget er åpent.", free: true, lat: 61.498, lng: 9.766 },
  { id: "kvam", name: "Kvam Idrettspark", location: "Kvam, Nord-Fron", holes: 9, par: 27, rating: 3.8, ratings: 232, difficulty: "Lett", length: "1.2 km", time: "~35 min", udisc: "https://udisc.com/courses/kvam-idrettspark-eRuW", desc: "Etablert av Kvam Idrettslag i 2023. Fin trenings- og putbane. Startkit kan lånes ved klubbhuset.", free: true, lat: 61.667, lng: 9.687 },
  { id: "vinstra", name: "Vinstra Ungdomsskole", location: "Vinstra, Nord-Fron", holes: 6, par: 18, rating: 2.7, ratings: 81, difficulty: "Lett", length: "0.5 km", time: "~16 min", udisc: "https://udisc.com/courses/vinstra-ungdomsskole-Y0eH", desc: "Kort skolebane med DiscGolfPark-kurver. Perfekt for nybegynnere og raske runder.", free: true, lat: 61.575, lng: 9.742 },
  { id: "lalm", name: "Lalm Discgolfbane", location: "Lalm, Sel", holes: 12, par: 36, rating: 4.2, ratings: 511, difficulty: "Moderat", length: "1.7 km", time: "~1 time", udisc: "https://udisc.com/courses/lalm-discgolfbane-nYVD", desc: "En av de beste banene i Innlandet med 4.2-rating. Varierte hull og flott skogsterreng. Anbefales på det sterkeste!", free: true, lat: 61.812, lng: 9.287 },
  { id: "otta", name: "Otta Disc Golf", location: "Otta, Sel", holes: 6, par: 18, rating: 2.2, ratings: 40, difficulty: "Lett", length: "0.5 km", time: "~20 min", udisc: "https://udisc.com/courses/otta-disc-golf-0vmE", desc: "Veldig korte hull, perfekt for nybegynnere. Mangler hull-kart men lett å finne.", free: true, lat: 61.772, lng: 9.537 },
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

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

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
      {[...Array(5)].map((_, i) => <span key={i} style={{ color: i < full || (i === full && half) ? "#d4a017" : "#c8d4b0" }}>★</span>)}
      <span style={{ fontSize: 11, color: "#5a7040", marginLeft: 4, fontWeight: 700 }}>{rating}</span>
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
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle"); // idle | loading | done | denied
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!showRegister || locationStatus !== "idle") return;
    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      pos => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        setLocationStatus("done");
        const nearest = [...COURSES].sort((a, b) => getDistance(loc.lat, loc.lng, a.lat, a.lng) - getDistance(loc.lat, loc.lng, b.lat, b.lng))[0];
        setRegForm(f => ({ ...f, course: f.course || nearest.id }));
      },
      () => setLocationStatus("denied")
    );
  }, [showRegister]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = () => supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: "https://gudbrandsdalen-discgolf-liga.vercel.app" }
  });

  const signOut = () => supabase.auth.signOut();

  const today = new Date().toISOString().split("T")[0];

  const sortedCourses = userLocation
    ? [...COURSES].sort((a, b) => getDistance(userLocation.lat, userLocation.lng, a.lat, a.lng) - getDistance(userLocation.lat, userLocation.lng, b.lat, b.lng))
    : COURSES;

  const players = generatePlayers();
  const filtered = division === "Alle" ? players : players.filter(p => p.division === division);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(175deg, #f0f9e8 0%, #e6f4d4 40%, #f5faf0 100%)", color: "#1c2b12", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.025, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 0, pointerEvents: "none", opacity: 0.12 }}>
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
                <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#5a9e0f", fontWeight: 700 }}>Gudbrandsdalen</div>
                <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>Discgolf Liga</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ fontSize: 11, color: "#4a7a10", background: "rgba(101,163,13,0.1)", padding: "4px 10px", borderRadius: 20, border: "1px solid rgba(101,163,13,0.2)", fontWeight: 600 }}>Sesong: Vår 2026</div>
              {user ? (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {user.user_metadata?.avatar_url && <img src={user.user_metadata.avatar_url} alt="" style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid rgba(101,163,13,0.4)" }} />}
                  <button onClick={signOut} style={{ fontSize: 11, color: "#4a7a10", background: "rgba(101,163,13,0.1)", padding: "4px 10px", borderRadius: 20, border: "1px solid rgba(101,163,13,0.2)", cursor: "pointer", fontWeight: 600 }}>Logg ut</button>
                </div>
              ) : (
                <button onClick={signInWithGoogle} style={{ fontSize: 11, color: "#fff", background: "linear-gradient(135deg, #65A30D, #4a7a0a)", padding: "5px 12px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 700 }}>Logg inn</button>
              )}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, margin: "16px 0" }}>
            {[{ label: "Spillere", value: 10, icon: "👥" }, { label: "Runder spilt", value: 97, icon: "🥏" }, { label: "Baner", value: 12, icon: "🗺️" }].map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "12px 10px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 13, marginBottom: 2 }}>{s.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1 }}><AnimNum value={s.value} /></div>
                <div style={{ fontSize: 10, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <button onClick={() => setShowRegister(true)} style={{ width: "100%", padding: "14px", border: "none", borderRadius: 14, background: "linear-gradient(135deg, #A3E635 0%, #65A30D 100%)", color: "#0a0f0a", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 24px rgba(163,230,53,0.25), inset 0 1px 0 rgba(255,255,255,0.2)", transition: "transform 0.15s", marginBottom: 16 }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >+ Registrer runde</button>

          <div style={{ display: "flex", gap: 4, background: "rgba(0,0,0,0.06)", borderRadius: 12, padding: 4 }}>
            {[{ id: "tabell", label: "Ligatabell", icon: "🏆" }, { id: "runder", label: "Runder", icon: "📋" }, { id: "baner", label: "Baner", icon: "🗺️" }, { id: "regler", label: "Poeng", icon: "📊" }].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "10px 6px", border: "none", borderRadius: 10, background: tab === t.id ? "#ffffff" : "transparent", color: tab === t.id ? "#4a8a10" : "#6b7a58", fontWeight: tab === t.id ? 700 : 500, fontSize: 12, cursor: "pointer", transition: "all 0.2s", boxShadow: tab === t.id ? "0 1px 4px rgba(0,0,0,0.1)" : "none" }}>
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
                <button key={d} onClick={() => setDivision(d)} style={{ padding: "6px 14px", border: "1px solid", borderColor: division === d ? "#65A30D" : "rgba(0,0,0,0.1)", borderRadius: 20, background: division === d ? "rgba(101,163,13,0.12)" : "rgba(255,255,255,0.6)", color: division === d ? "#4a8a10" : "#6b7a58", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{d}</button>
              ))}
            </div>
            {division !== "Rekreasjons" && (
              <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "flex-end", justifyContent: "center" }}>
                {[filtered[1], filtered[0], filtered[2]].filter(Boolean).map((p, i) => {
                  const h = [100, 130, 80], m = ["🥈", "🥇", "🥉"], sz = [44, 56, 40];
                  return (
                    <div key={p.id} onClick={() => setSelectedPlayer(p)} style={{ textAlign: "center", cursor: "pointer", flex: 1, animation: `fadeSlideUp 0.5s ease ${i * 0.1}s both` }}>
                      <div style={{ width: sz[i], height: sz[i], borderRadius: "50%", margin: "0 auto 6px", background: i === 1 ? "linear-gradient(135deg, #A3E635, #65A30D)" : "rgba(255,255,255,0.8)", border: i === 1 ? "2px solid #65A30D" : "2px solid rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: sz[i] * 0.45, boxShadow: i === 1 ? "0 4px 20px rgba(101,163,13,0.3)" : "0 2px 8px rgba(0,0,0,0.1)" }}>{p.avatar}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{p.name.split(" ")[0]}</div>
                      <div style={{ height: h[i], borderRadius: "12px 12px 0 0", background: i === 1 ? "linear-gradient(180deg, rgba(101,163,13,0.15), rgba(101,163,13,0.04))" : "rgba(255,255,255,0.6)", border: i === 1 ? "1px solid rgba(101,163,13,0.2)" : "1px solid rgba(0,0,0,0.08)", borderBottom: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ fontSize: 20 }}>{m[i]}</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: i === 1 ? "#4a8a10" : "#2a3a1a" }}>{p.pts}</div>
                        <div style={{ fontSize: 9, color: "#6b7a58", textTransform: "uppercase", letterSpacing: "0.1em" }}>poeng</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 60px 50px 80px", padding: "10px 14px", fontSize: 10, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, borderBottom: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.5)" }}>
                <div>#</div><div>Spiller</div><div style={{ textAlign: "right" }}>Snitt</div><div style={{ textAlign: "right" }}>Pts</div><div style={{ textAlign: "right" }}>Trend</div>
              </div>
              {filtered.map((p, i) => (
                <div key={p.id} onClick={() => setSelectedPlayer(p)} style={{ display: "grid", gridTemplateColumns: "32px 1fr 60px 50px 80px", padding: "12px 14px", alignItems: "center", cursor: "pointer", borderBottom: "1px solid rgba(0,0,0,0.04)", background: i === 0 ? "rgba(101,163,13,0.06)" : "transparent", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(101,163,13,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background = i === 0 ? "rgba(101,163,13,0.06)" : "transparent"}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: i < 3 ? "#4a8a10" : "#8a9a80" }}>{i + 1}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, border: "1px solid rgba(0,0,0,0.08)" }}>{p.avatar}</div>
                    <div><div style={{ fontSize: 13, fontWeight: 700 }}>{p.name}</div><div style={{ fontSize: 10, color: "#6b7a58" }}>{p.rounds} runder · {p.division}</div></div>
                  </div>
                  <div style={{ textAlign: "right", fontSize: 13, fontWeight: 600, color: p.avg <= 0 ? "#4a8a10" : "#ef4444" }}>{p.avg > 0 ? "+" : ""}{p.avg}</div>
                  <div style={{ textAlign: "right", fontSize: 15, fontWeight: 900 }}>{p.pts}</div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}><Sparkline data={p.trend} color={i < 3 ? "#65A30D" : "#8a9a70"} /></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "runder" && (
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Siste runder</div>
            {RECENT_ROUNDS.map((r, i) => (
              <div key={r.id} style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: "14px 16px", display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "center", marginBottom: 8, animation: `fadeSlideUp 0.4s ease ${i * 0.06}s both`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{r.player}</div>
                  <div style={{ fontSize: 11, color: "#6b7a58", marginBottom: 4 }}>{r.course}</div>
                  <div style={{ display: "flex", gap: 8, fontSize: 11, color: "#8a9a70" }}><span>{r.date}</span><span>·</span><span>{r.holes}</span></div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: r.score <= 0 ? "#4a8a10" : "#ef4444", lineHeight: 1 }}>{r.score > 0 ? "+" : ""}{r.score}</div>
                  <div style={{ fontSize: 11, color: "#4a8a10", fontWeight: 700, background: "rgba(101,163,13,0.12)", padding: "2px 8px", borderRadius: 10, marginTop: 4, display: "inline-block" }}>+{r.pts} pts</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "baner" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>Baner i ligaen</div>
              <div style={{ fontSize: 11, color: "#6b7a58" }}>Data fra <span style={{ color: "#4a8a10", fontWeight: 700 }}>UDisc</span></div>
            </div>
            {COURSES.map((c, i) => (
              <div key={c.id} onClick={() => setSelectedCourse(selectedCourse?.id === c.id ? null : c)} style={{ background: selectedCourse?.id === c.id ? "rgba(101,163,13,0.08)" : "rgba(255,255,255,0.75)", border: selectedCourse?.id === c.id ? "1px solid rgba(101,163,13,0.25)" : "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: "16px", cursor: "pointer", transition: "all 0.2s", marginBottom: 10, animation: `fadeSlideUp 0.4s ease ${i * 0.05}s both`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: "#6b7a58", marginBottom: 6 }}>{c.location}</div>
                    <Stars rating={c.rating} />
                    {c.ratings && <span style={{ fontSize: 10, color: "#6b7a58", marginLeft: 4 }}>({c.ratings})</span>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <div style={{ padding: "4px 10px", borderRadius: 10, background: "rgba(101,163,13,0.1)", border: "1px solid rgba(101,163,13,0.2)", fontSize: 11, fontWeight: 700, color: "#4a8a10" }}>{c.holes} hull</div>
                    <div style={{ fontSize: 10, color: "#6b7a58" }}>Par {c.par}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[{ label: c.difficulty, color: c.difficulty.includes("Vanskelig") ? "#e05000" : c.difficulty === "Moderat" ? "#b07a00" : "#4a8a10" }, { label: c.time }, { label: c.length }, { label: "Gratis", color: "#4a8a10" }].map((tag, j) => (
                    <span key={j} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 8, background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.08)", color: tag.color || "#6b7a58", fontWeight: 600 }}>{tag.label}</span>
                  ))}
                </div>
                {selectedCourse?.id === c.id && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(0,0,0,0.08)", animation: "fadeSlideUp 0.3s ease" }}>
                    <div style={{ fontSize: 12, color: "#4a5a38", lineHeight: 1.6, marginBottom: 12 }}>{c.desc}</div>
                    <a href={c.udisc} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, background: "rgba(101,163,13,0.12)", border: "1px solid rgba(101,163,13,0.25)", color: "#4a8a10", fontWeight: 700, fontSize: 12, textDecoration: "none" }}>
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
            <div style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              {STABLEFORD_INFO.map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid rgba(0,0,0,0.05)", background: i === 0 ? "rgba(101,163,13,0.07)" : "transparent" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: i < 3 ? `rgba(101,163,13,${0.2 - i * 0.05})` : "rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: i < 3 ? "#4a8a10" : "#6b7a58" }}>{s.place}</div>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Plass {s.place}</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: i < 3 ? "#4a8a10" : "#1c2b12" }}>{s.pts} <span style={{ fontSize: 10, fontWeight: 600, color: "#6b7a58" }}>pts</span></div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: 16, borderRadius: 14, background: "rgba(101,163,13,0.07)", border: "1px solid rgba(101,163,13,0.15)", fontSize: 12, color: "#4a5a38", lineHeight: 1.6 }}>
              <div style={{ fontWeight: 700, color: "#4a8a10", marginBottom: 4 }}>💡 Slik fungerer det</div>
              Hver runde du spiller i ligaen gir poeng basert på din plassering blant alle som spilte den runden. Ved likt resultat deles poengene. Sesongen har 12 planlagte runder, men kun dine 8 beste teller — så du kan misse noen runder uten å tape for mye!
            </div>
          </div>
        )}
      </div>

      {selectedPlayer && (
        <div onClick={() => setSelectedPlayer(null)} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 20, animation: "fadeIn 0.2s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 500, maxHeight: "80vh", background: "linear-gradient(180deg, #ffffff, #f0f9e8)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 20, padding: 24, overflowY: "auto", animation: "slideUp 0.3s ease", boxShadow: "0 -4px 30px rgba(0,0,0,0.12)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 54, height: 54, borderRadius: "50%", background: "linear-gradient(135deg, rgba(101,163,13,0.2), rgba(101,163,13,0.06))", border: "2px solid rgba(101,163,13,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{selectedPlayer.avatar}</div>
              <div><div style={{ fontSize: 20, fontWeight: 800, color: "#1c2b12" }}>{selectedPlayer.name}</div><div style={{ fontSize: 12, color: "#6b7a58" }}>{selectedPlayer.division} divisjon</div></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
              {[{ l: "Runder", v: selectedPlayer.rounds }, { l: "Beste", v: selectedPlayer.best }, { l: "Snitt", v: selectedPlayer.avg > 0 ? `+${selectedPlayer.avg}` : selectedPlayer.avg }, { l: "Poeng", v: selectedPlayer.pts }].map(s => (
                <div key={s.l} style={{ background: "rgba(101,163,13,0.07)", borderRadius: 12, padding: "12px 8px", textAlign: "center", border: "1px solid rgba(101,163,13,0.12)" }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: "#4a8a10" }}>{s.v}</div>
                  <div style={{ fontSize: 9, color: "#6b7a58", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 12, fontSize: 13, fontWeight: 700, color: "#1c2b12" }}>Poengutvikling</div>
            <div style={{ background: "rgba(0,0,0,0.03)", borderRadius: 12, padding: 16, border: "1px solid rgba(0,0,0,0.06)" }}>
              <Sparkline data={selectedPlayer.trend} color="#65A30D" />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10, color: "#6b7a58" }}><span>Runde 1</span><span>Runde {selectedPlayer.trend.length}</span></div>
            </div>
            <button onClick={() => setSelectedPlayer(null)} style={{ width: "100%", padding: 14, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 12, background: "rgba(0,0,0,0.04)", color: "#4a5a38", fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 16 }}>Lukk</button>
          </div>
        </div>
      )}

      {showRegister && (
        <div onClick={() => { setShowRegister(false); setRegSuccess(false); setLocationStatus("idle"); setUserLocation(null); }} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 20, animation: "fadeIn 0.2s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 500, background: "linear-gradient(180deg, #ffffff, #f0f9e8)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 20, padding: 24, animation: "slideUp 0.3s ease", boxShadow: "0 -4px 30px rgba(0,0,0,0.12)" }}>
            {regSuccess ? (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Runde registrert!</div>
                <div style={{ fontSize: 13, color: "#6b7a58" }}>Poengene dine oppdateres snart</div>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4, color: "#1c2b12" }}>Registrer runde</div>
                <div style={{ fontSize: 12, color: "#6b7a58", marginBottom: 20 }}>Legg inn scoren din for å få ligapoeng</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em" }}>Bane</label>
                      <span style={{ fontSize: 10, color: locationStatus === "loading" ? "#b07a00" : locationStatus === "done" ? "#4a8a10" : locationStatus === "denied" ? "#6b7a58" : "#6b7a58" }}>
                        {locationStatus === "loading" && "📍 Finner posisjon…"}
                        {locationStatus === "done" && "📍 Sortert etter avstand"}
                        {locationStatus === "denied" && "GPS ikke tilgjengelig"}
                      </span>
                    </div>
                    <select value={regForm.course} onChange={e => setRegForm({ ...regForm, course: e.target.value })} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", color: "#1c2b12", fontSize: 14, outline: "none", appearance: "none", boxSizing: "border-box" }}>
                      <option value="">Velg bane...</option>
                      {sortedCourses.map(c => {
                        const dist = userLocation ? ` · ${getDistance(userLocation.lat, userLocation.lng, c.lat, c.lng)} km` : "";
                        return <option key={c.id} value={c.id}>{c.name} ({c.holes}h, par {c.par}){dist}</option>;
                      })}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#5a7040", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Score (mot par)</label>
                    <input type="number" placeholder="f.eks. -3" value={regForm.score} onChange={e => setRegForm({ ...regForm, score: e.target.value })} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", color: "#1c2b12", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em" }}>Dato</label>
                      <button onClick={() => setRegForm({ ...regForm, date: today })} style={{ fontSize: 11, fontWeight: 700, color: regForm.date === today ? "#4a8a10" : "#6b7a58", background: regForm.date === today ? "rgba(101,163,13,0.12)" : "rgba(0,0,0,0.05)", border: "1px solid", borderColor: regForm.date === today ? "rgba(101,163,13,0.3)" : "rgba(0,0,0,0.1)", borderRadius: 8, padding: "3px 10px", cursor: "pointer" }}>I dag</button>
                    </div>
                    <input lang="nb-NO" type="date" value={regForm.date} onChange={e => setRegForm({ ...regForm, date: e.target.value })} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", color: "#1c2b12", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <button onClick={(e) => { e.preventDefault(); setRegSuccess(true); setTimeout(() => { setRegSuccess(false); setShowRegister(false); setRegForm({ course: "", score: "", date: "" }); }, 2000); }} style={{ width: "100%", padding: 14, border: "none", borderRadius: 14, background: "linear-gradient(135deg, #A3E635, #65A30D)", color: "#0a0f0a", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 24px rgba(101,163,13,0.25)", marginTop: 4 }}>Registrer 🥏</button>
                  <button onClick={() => setShowRegister(false)} style={{ width: "100%", padding: 12, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 12, background: "rgba(0,0,0,0.04)", color: "#6b7a58", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Avbryt</button>
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
        select option { background: #f0f9e8; color: #1c2b12; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.3); }
      `}</style>
    </div>
  );
}
