import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { BADGE_ICONS } from "./components/BadgeIcons";
import { TAB_ICONS, STAT_ICONS, LogoIcon, BellIcon } from "./components/TabIcons";
import { THEMES, BG_IMAGES, applyTheme } from "./themes";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const COURSES = [
  { id: "skogen", name: "Skogen Diskgolfbane", location: "Lillehammer", holes: 22, par: 63, rating: 4.2, ratings: 1496, difficulty: "Moderat / Veldig vanskelig", length: "3.4 km", time: "~2 timer", udisc: "https://udisc.com/courses/skogen-diskgolfbane-exZE", googleMaps: "https://www.google.com/maps/place/Skogen+Diskgolfbane/@61.081856,10.4826885,583m/data=!3m2!1e3!4b1!4m6!3m5!1s0x466a7df20d786aeb:0x86dc64eaa90af6a8!8m2!3d61.081856!4d10.4852688!16s%2Fg%2F11grpw3h01?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D", desc: "Teknisk krevende skogsbane med mye variasjon. To layouts: Hvit (viderekomne) og Gul (nybegynnervennlig). Driftet av Lillehammer Frisbee.", free: true, lat: 61.155, lng: 10.477 },
  { id: "jorstadmoen", name: "Jørstadmoen", location: "Lillehammer", holes: 18, par: 54, rating: 3.9, ratings: 2851, difficulty: "Lett", length: "2.4 km", time: "~1 time", udisc: "https://udisc.com/courses/jorstadmoen-12Ee", googleMaps: "https://www.google.com/maps/place/J%C3%B8rstadmoen+Disc+Golf+%2F+Frisbee+bane/@61.1485168,10.377047,581m/data=!3m2!1e3!4b1!4m6!3m5!1s0x466a893d60170779:0x1054c7e2f7dd568c!8m2!3d61.1485168!4d10.3796273!16s%2Fg%2F11gtz6xqvv?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D", desc: "Populær og nybegynnervennlig bane. Barnevogn- og hundevennlig. Gode teepads på hvert hull.", free: true, lat: 61.151, lng: 10.383 },
  { id: "oyer", name: "Øyer Ungdomsskole", location: "Øyer", holes: 9, par: 27, rating: 3.2, ratings: 428, difficulty: "Lett", length: "1.1 km", time: "~1 time", udisc: "https://udisc.com/courses/oyer-ungdomsskole-vwjL", googleMaps: "https://www.google.com/maps/place/%C3%98yer+discgolf/@61.235,10.4404251,17z/data=!4m12!1m5!3m4!2zNjHCsDE0JzA2LjAiTiAxMMKwMjYnMzQuOCJF!8m2!3d61.235!4d10.443!3m5!1s0x466a8b32f7c816ef:0xc5cf76ddb259505f!8m2!3d61.2357122!4d10.4431533!16s%2Fg%2F11j6f97kzy?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D", desc: "Nybegynnervennlig bane. Hullengde varierer fra 30m til 70m.", free: true, lat: 61.235, lng: 10.443 },
  { id: "ringebu-u", name: "Ringebu Ungdomskole Discgolfbane", location: "Ringebu", holes: 9, par: 27, rating: 2.5, ratings: 107, difficulty: "Moderat", length: "1.7 km", time: "~1 time", udisc: "https://udisc.com/courses/ringebu-ungdomskole-discgolfbane-druU", googleMaps: "https://www.google.com/maps/place/Ringebu+frisbeegolf+ungdomskolen/@61.5267141,10.1415738,16.8z/data=!4m14!1m7!3m6!1s0x466ae7dbe520f7b9:0x894b48f564575034!2sRingebu+frisbeegolf+barneskolen!8m2!3d61.5323356!4d10.1440365!16s%2Fg%2F11qk3b020t!3m5!1s0x466ae753e45d7365:0x59cca3e7793d7e8c!8m2!3d61.5274905!4d10.1451585!16s%2Fg%2F11mgnjcykx?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D", desc: "9-hulls bane ved ungdomsskolen. Noen hull kan være overgrodd — sjekk forholdene på UDisc.", free: true, lat: 61.531, lng: 10.155 },
  { id: "lundesetra", name: "Lundesetra Frisbeegolfbane", location: "Venabygd, Ringebu", holes: 18, par: 61, rating: 3.7, ratings: 105, difficulty: "Vanskelig", length: "2.2 km", time: "~1.5-2 timer", udisc: "https://udisc.com/courses/lundesetra-frisbeegolfbane-uNnB", googleMaps: "https://www.google.com/maps/place/Lundesetra+frisbeeGOLFBANE/@61.6729172,10.0846859,17z/data=!3m1!4b1!4m6!3m5!1s0x466ae500297b4b1d:0xd5f19e6687c68fd1!8m2!3d61.6729172!4d10.0872662!16s%2Fg%2F11ydkbw9dm?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D", desc: "Flott fjellbane på 950 moh med panoramautsikt over Venabygdsfjellet. Etablert 2025. Familievennlig 9-hulls layout + krevende 18-hulls layout. Sesongbane.", free: true, lat: 61.856, lng: 10.183 },
  { id: "sandbumoen", name: "Sandbumoen Discgolfbane", location: "Sør-Fron", holes: 18, par: 55, rating: 3.9, ratings: 102, difficulty: "Moderat", length: "2.0 km", time: "~1.5 timer", udisc: "https://udisc.com/courses/sandbumoen-discgolfbane-LGPU", googleMaps: "https://www.google.com/maps/place/61.726307972190824,9.551310492924358", desc: "Flott bane i naturskjønt skogsterreng. Spillbar for alle nivåer. Etablert 2025. OBS: Partier med glatt underlag.", free: true, lat: 61.726, lng: 9.551 },
  { id: "gaala", name: "Gålå", location: "Gålå, Sør-Fron", holes: 18, par: 59, rating: 3.6, ratings: 412, difficulty: "Lett / Moderat", length: "2.4 km", time: "~1.5 timer", udisc: "https://udisc.com/courses/gala-3Ekm", googleMaps: "https://www.google.com/maps/place/Frisbeegolf+G%C3%A5l%C3%A5/@61.5010987,9.7898876,17z/data=!3m1!4b1!4m6!3m5!1s0x466ac4fb2c3022f7:0xca9e75927618e855!8m2!3d61.5010987!4d9.7924679!16s%2Fg%2F11hzxks6kk?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D", desc: "Variert 18-hulls bane med store høydeforskjeller i alpint terreng. Fire layoutvalg: Pro, Amateur og to front-9-varianter. Sesongbane — stengt når skianlegget er åpent.", free: true, lat: 61.498, lng: 9.766 },
  { id: "kvam", name: "Kvam Idrettspark", location: "Kvam, Nord-Fron", holes: 9, par: 27, rating: 3.8, ratings: 232, difficulty: "Lett", length: "1.2 km", time: "~35 min", udisc: "https://udisc.com/courses/kvam-idrettspark-eRuW", googleMaps: "https://www.google.com/maps/place/61.66734929756319,9.687201656882507", desc: "Etablert av Kvam Idrettslag i 2023. Fin trenings- og putbane. Startkit kan lånes ved klubbhuset.", free: true, lat: 61.667, lng: 9.687 },
  { id: "lalm", name: "Lalm Discgolfbane", location: "Lalm, Sel", holes: 12, par: 36, rating: 4.2, ratings: 511, difficulty: "Moderat", length: "1.7 km", time: "~1 time", udisc: "https://udisc.com/courses/lalm-discgolfbane-nYVD", googleMaps: "https://www.google.com/maps/place/Lalm+Discgolfbane/@61.8128071,9.284686,17z/data=!3m1!4b1!4m6!3m5!1s0x4614d76c4874c149:0x58c42e0965ebf527!8m2!3d61.8128071!4d9.2872663!16s%2Fg%2F11sxkpd425?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D", desc: "En av de beste banene i Innlandet med 4.2-rating. Varierte hull og flott skogsterreng. Anbefales på det sterkeste!", free: true, lat: 61.812, lng: 9.287 },
  { id: "vingarparken", name: "Vingarparken Diskgolfbane", location: "Lillehammer", holes: 9, par: 27, rating: 1.2, ratings: 25, difficulty: "Middels", length: "0.54 km", time: "~60 min", udisc: "https://udisc.com/courses/vingarparken-diskgolfbane-KDW7", googleMaps: "https://www.google.com/maps/place/61.10748204673479,10.427498069998876", desc: "Familievennlig bane i folkelig rekreasjonspark. Kortbane med gressteier, renovert i 2025.", free: true, lat: 61.107, lng: 10.427 },
  { id: "mosetertoppen", name: "Mosetertoppen Diskgolfpark", location: "Øyer", holes: 18, par: 58, rating: 3.7, ratings: 159, difficulty: "Krevende", length: "3.8 km", time: "~2 timer", udisc: "https://udisc.com/courses/oti-frisbee-mosetertoppen-diskgolf-park-D5nt", googleMaps: "https://www.google.com/maps/place/61.25397574849447,10.514558774034981", desc: "Utfordrende fjellbane på toppen av Mosetertoppen/Hafjell. Bratt og variert terreng med flotte utsikter. Etablert 2024.", free: true, lat: 61.254, lng: 10.515 },
  { id: "fossen-kvitfjell", name: "Fossen Diskgolf Kvitfjell", location: "Fåvang", holes: 9, par: 29, rating: 4.5, ratings: 5, difficulty: "Middels", length: "0.7 km", time: "~54 min", udisc: "https://udisc.com/courses/fossen-diskgolf-kvitfjell-sorh", googleMaps: "https://www.google.com/maps/place/61.450026560582984,10.109954378016454", desc: "Ny bane (2025) ved Kvitfjell med vakker utsikt og varierte kast. Kupert terreng med Prodigy T2-kurver.", free: true, lat: 61.450, lng: 10.110 },
];


const LEAGUE_COURSE_IDS = ["skogen", "lalm", "jorstadmoen", "sandbumoen", "lundesetra", "mosetertoppen", "gaala", "fossen-kvitfjell", "kvam", "oyer", "ringebu-u", "vingarparken"];
const MAJOR_COURSE_IDS = new Set(["skogen", "lalm", "jorstadmoen"]);

const SPRING_MONTHS = [5, 6, 7];   // mai–juli
const FALL_MONTHS   = [8, 9, 10];  // august–oktober

function getCurrentSeason(date = new Date()) {
  const m = date.getMonth() + 1;
  if (SPRING_MONTHS.includes(m)) return "Vår";
  if (FALL_MONTHS.includes(m)) return "Høst";
  return null;
}

function getSeasonLabel(date = new Date()) {
  const s = getCurrentSeason(date);
  return s ? `${s} ${date.getFullYear()}` : `${date.getFullYear()}`;
}

function scoreToPoints(score, isMajor) {
  let pts;
  if (score <= -4) pts = 10;
  else if (score <= -2) pts = 9;
  else if (score <= 0) pts = 8;
  else if (score <= 2) pts = 7;
  else if (score <= 4) pts = 6;
  else if (score <= 6) pts = 5;
  else if (score <= 8) pts = 4;
  else if (score <= 10) pts = 3;
  else if (score <= 13) pts = 2;
  else if (score <= 16) pts = 1;
  else pts = 0;
  return isMajor ? Math.ceil(pts * 1.5) : pts;
}

const getMaxStreak = (rounds) => {
  if (!rounds.length) return 0;
  const dates = [...new Set(rounds.map(r => r.date))].sort();
  let maxStreak = 1, current = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]);
    const curr = new Date(dates[i]);
    const diff = (curr - prev) / (1000 * 60 * 60 * 24);
    if (diff === 1) { current++; maxStreak = Math.max(maxStreak, current); }
    else { current = 1; }
  }
  return maxStreak;
};

const BADGE_DEFS = [
  { id: "forste_kast", name: "Første kast", desc: "Registrer din første runde", check: (p, rounds) => rounds.length >= 1 },
  { id: "pa_gli", name: "På gli", desc: "Spill 3 dager på rad", check: (p, rounds) => getMaxStreak(rounds) >= 3 },
  { id: "ildsjel", name: "Ildsjel", desc: "Spill 5 dager på rad", check: (p, rounds) => getMaxStreak(rounds) >= 5 },
  { id: "ustoppelig", name: "Ustoppelig", desc: "Spill 7 dager på rad", check: (p, rounds) => getMaxStreak(rounds) >= 7 },
  { id: "legende", name: "Legende", desc: "Spill 10 dager på rad", check: (p, rounds) => getMaxStreak(rounds) >= 10 },
  { id: "utforsker", name: "Utforsker", desc: "Spill 3 forskjellige baner", check: (p, rounds) => new Set(rounds.map(r => r.course_id)).size >= 3 },
  { id: "kartlegger", name: "Kartlegger", desc: "Spill alle banene i ligaen", check: (p, rounds, courses) => new Set(rounds.map(r => r.course_id)).size >= courses.length },
  { id: "under_par", name: "Under par", desc: "Score under par", check: (p, rounds) => rounds.some(r => r.score < 0) },
  { id: "banekonge", name: "Banekonge", desc: "Beste score på en bane", check: (p, rounds, courses, allRounds) => {
    return courses.some(c => {
      const courseRounds = allRounds.filter(r => r.course_id === c.id);
      if (!courseRounds.length) return false;
      const best = Math.min(...courseRounds.map(r => r.score));
      return rounds.some(r => r.course_id === c.id && r.score === best);
    });
  }},
  { id: "podium", name: "Podium", desc: "Topp 3 i ligatabellen", check: (p, rounds, courses, allRounds, players) => {
    const idx = players.findIndex(pl => pl.id === p?.id);
    return idx >= 0 && idx < 3;
  }},
  { id: "dedikert", name: "Dedikert", desc: "Fullfør 10 runder", check: (p, rounds) => rounds.length >= 10 },
  { id: "lagspiller", name: "Lagspiller", desc: "Legg til 5 venner", check: () => false },
  { id: "ace", name: "Hull-i-ett!", desc: "Score ditt første ace", check: (p, rounds) => rounds.some(r => r.aces >= 1) },
  { id: "arets_kast", name: "Årets kast", desc: "Score et ace i inneværende år", check: (p, rounds) => { const year = new Date().getFullYear(); return rounds.some(r => r.aces >= 1 && (r.date || "").startsWith(String(year))); } },
  { id: "ace_club", name: "Ace-klubben", desc: "Score 2+ aces totalt", check: (p, rounds) => rounds.reduce((s, r) => s + (r.aces || 0), 0) >= 2 },
  { id: "eagle_hunter", name: "Ørnejeger", desc: "Score din første eagle", check: (p, rounds) => rounds.some(r => r.eagles >= 1) },
  { id: "double_eagle", name: "Dobbeltørn", desc: "To eagles i én runde", check: (p, rounds) => rounds.some(r => r.eagles >= 2) },
  { id: "eagle_sesong", name: "Ørnesesong", desc: "5+ eagles i en sesong", check: (p, rounds) => {
    const seasons = {};
    rounds.filter(r => r.eagles != null).forEach(r => {
      const d = new Date(r.date || r.created_at);
      const mo = d.getMonth() + 1;
      const season = SPRING_MONTHS.includes(mo) ? "Vår" : FALL_MONTHS.includes(mo) ? "Høst" : null;
      if (!season) return;
      const key = `${d.getFullYear()}-${season}`;
      seasons[key] = (seasons[key] || 0) + r.eagles;
    });
    return Object.values(seasons).some(v => v >= 5);
  }},
  { id: "birdie_runde", name: "Birdie-runde", desc: "3+ birdies i én runde", check: (p, rounds) => rounds.some(r => r.birdies != null && r.birdies >= 3) },
  { id: "birdie_maskin", name: "Birdie-maskin", desc: "5+ birdies i én runde", check: (p, rounds) => rounds.some(r => r.birdies != null && r.birdies >= 5) },
  { id: "birdie_strek", name: "Birdie-strek", desc: "Birdies i 3 runder på rad", check: (p, rounds) => {
    const sorted = [...rounds].filter(r => r.birdies != null).sort((a, b) => new Date(a.date) - new Date(b.date));
    let streak = 0, max = 0;
    sorted.forEach(r => { if (r.birdies >= 1) { streak++; max = Math.max(max, streak); } else { streak = 0; } });
    return max >= 3;
  }},
  { id: "birdie_sesong", name: "Birdie-sesong", desc: "10+ birdies i en sesong", check: (p, rounds) => {
    const seasons = {};
    rounds.filter(r => r.birdies != null).forEach(r => {
      const d = new Date(r.date || r.created_at);
      const mo = d.getMonth() + 1;
      const season = SPRING_MONTHS.includes(mo) ? "Vår" : FALL_MONTHS.includes(mo) ? "Høst" : null;
      if (!season) return;
      const key = `${d.getFullYear()}-${season}`;
      seasons[key] = (seasons[key] || 0) + r.birdies;
    });
    return Object.values(seasons).some(v => v >= 10);
  }},
  { id: "birdie_mester", name: "Birdie-mester", desc: "25+ birdies totalt", check: (p, rounds) => rounds.reduce((s, r) => s + (r.birdies || 0), 0) >= 25 },
  { id: "bogey_fri", name: "Bogey-fri", desc: "En runde uten bogeys", check: (p, rounds) => rounds.some(r => r.bogeys === 0) },
  { id: "ren_runde", name: "Rent kort", desc: "Under par uten noen bogeys", check: (p, rounds) => rounds.some(r => r.bogeys === 0 && r.score < 0) },
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
  const [d, setD] = useState(value);
  useEffect(() => {
    const t = setInterval(() => {
      setD(cur => {
        if (cur === value) { clearInterval(t); return cur; }
        return cur + (value > cur ? 1 : -1);
      });
    }, Math.max(Math.ceil(900 / Math.abs(value || 1)), 15));
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
  const [regForm, setRegForm] = useState({ course: "", score: "", date: "", aces: null, eagles: null, birdies: null, bogeys: null });
  const [regSuccess, setRegSuccess] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userDivision, setUserDivision] = useState("Åpen");
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle"); // idle | loading | done | denied
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" | "signup"
  const [authForm, setAuthForm] = useState({ email: "", password: "", name: "" });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [realRounds, setRealRounds] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cache_rounds") || "[]"); } catch { return []; }
  });
  const [roundsLoading, setRoundsLoading] = useState(false);
  const [editRound, setEditRound] = useState(null); // null or round object being edited
  const [players, setPlayers] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cache_players") || "[]"); } catch { return []; }
  });
  const [regError, setRegError] = useState("");
  const [signupEmailSent, setSignupEmailSent] = useState(false);
  const [courseSort, setCourseSort] = useState("avstand"); // avstand | populær | stjerner
  const [roundFilter, setRoundFilter] = useState("alle"); // "alle" or course_id
  const [regNote, setRegNote] = useState("");
  const [allProfiles, setAllProfiles] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cache_profiles") || "[]"); } catch { return []; }
  });
  const [friends, setFriends] = useState([]); // accepted friends list [{id, user_id, friend_id, status}]
  const [pendingFriendRequests, setPendingFriendRequests] = useState([]); // incoming pending friend requests
  const [friendScores, setFriendScores] = useState({}); // {profileId: score string} for registering friends' rounds
  const [selectedFriendPlayers, setSelectedFriendPlayers] = useState([]); // array of profile ids to register scores for
  const [friendSearch, setFriendSearch] = useState("");
  const [showFriendScores, setShowFriendScores] = useState(false); // expandable section toggle
  const [sentRequests, setSentRequests] = useState([]); // track sent friend request IDs
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallTip, setShowInstallTip] = useState(false);
  const [onboardingDismissed, setOnboardingDismissed] = useState(() => {
    try { return localStorage.getItem("onboardingDismissed") === "true"; } catch { return false; }
  });
  const [cookieConsent, setCookieConsent] = useState(() => {
    try { return localStorage.getItem("cookieConsent"); } catch { return null; }
  });
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [selectedPlayerRounds, setSelectedPlayerRounds] = useState([]);
  const [userHometown, setUserHometown] = useState("");
  const [showHometownSuggestions, setShowHometownSuggestions] = useState(false);
  const [roundsView, setRoundsView] = useState("alle"); // "alle", "mine", "venner"
  const [selectedRound, setSelectedRound] = useState(null);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [themeId, setThemeId] = useState(() => {
    try { return localStorage.getItem("themeId") || "skog"; } catch { return "skog"; }
  });
  const [showThemePicker, setShowThemePicker] = useState(false);
  useEffect(() => {
    applyTheme(themeId);
    try { localStorage.setItem("themeId", themeId); } catch {}
  }, [themeId]);
  const theme = THEMES[themeId] || THEMES.skog;

  useEffect(() => {
    if (!selectedPlayer) { setSelectedPlayerRounds([]); return; }
    const loadSelectedPlayerRounds = async () => {
      const { data } = await supabase
        .from("rounds")
        .select("*, profiles(full_name, avatar_url)")
        .eq("user_id", selectedPlayer.id)
        .order("date", { ascending: false });
      if (data) setSelectedPlayerRounds(data);
    };
    // First check realRounds for quick display
    const fromCache = realRounds.filter(r => r.user_id === selectedPlayer.id);
    setSelectedPlayerRounds(fromCache);
    loadSelectedPlayerRounds();
  }, [selectedPlayer]);

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

  useEffect(() => {
    if (!user) return;
    // Ensure profile exists (critical for Google OAuth users)
    const ensureProfile = async () => {
      const { data: existing } = await supabase.from("profiles").select("id, division, hometown").eq("id", user.id).single();
      if (existing) {
        if (existing.division) setUserDivision(existing.division);
        if (existing.hometown) setUserHometown(existing.hometown);
      } else {
        // Profile doesn't exist yet — create it
        await supabase.from("profiles").upsert({
          id: user.id,
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "Ukjent",
          avatar_url: user.user_metadata?.avatar_url || null,
          division: "Rekreasjons",
        }, { onConflict: "id" });
      }
      // Reload data after ensuring profile
      await loadRounds();
      const loadedPlayers = await loadPlayers();
      loadAllProfiles();
      loadNotifications();
      loadFriends();
      loadPendingFriendRequests();
      // Check badge changes after data is loaded
      const { data: allRoundsForBadges } = await supabase.from("rounds").select("*");
      if (loadedPlayers && allRoundsForBadges) checkBadgeChanges(loadedPlayers, allRoundsForBadges);
    };
    ensureProfile();
  }, [user]);

  const signInWithGoogle = () => supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: "https://gdliga.no" }
  });

  const signInWithEmail = async () => {
    setAuthLoading(true); setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email: authForm.email, password: authForm.password });
    setAuthLoading(false);
    if (error) { setAuthError("Feil e-post eller passord"); return; }
    setShowAuth(false); setAuthForm({ email: "", password: "", name: "" });
  };

  const signUpWithEmail = async () => {
    if (!authForm.name.trim()) { setAuthError("Skriv inn navnet ditt"); return; }
    setAuthLoading(true); setAuthError("");
    const { error } = await supabase.auth.signUp({
      email: authForm.email, password: authForm.password,
      options: { data: { full_name: authForm.name } }
    });
    setAuthLoading(false);
    if (error) { setAuthError(error.message); return; }
    setAuthError("");
    setSignupEmailSent(true);
  };

  const loadRounds = async () => {
    const { data } = await supabase
      .from("rounds")
      .select("*, profiles(full_name, avatar_url)")
      .order("created_at", { ascending: false })
      .limit(50);
    const real = data || [];
    const merged = real.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 50);
    setRealRounds(merged);
    try { localStorage.setItem("cache_rounds", JSON.stringify(merged)); } catch {}
  };

  const loadPlayers = async () => {
    const { data: profilesData } = await supabase.from("profiles").select("*");
    const { data: roundsData } = await supabase.from("rounds").select("*");
    if (!profilesData) return;
    const profiles = profilesData;
    const rounds = roundsData || [];

    const result = profiles.map(p => {
      const pr = rounds.filter(r => r.user_id === p.id);
      const leagueRounds = pr.filter(r => LEAGUE_COURSE_IDS.includes(r.course_id));

      const totalPts = leagueRounds.reduce((sum, r) => {
        return sum + scoreToPoints(r.score, MAJOR_COURSE_IDS.has(r.course_id));
      }, 0);

      const leagueCoursesPlayed = new Set(leagueRounds.map(r => r.course_id)).size;
      const qualified = leagueRounds.length > 0;

      const scores = pr.map(r => r.score).sort((a, b) => a - b);
      const byDate = [...leagueRounds].sort((a, b) => new Date(a.created_at || a.date) - new Date(b.created_at || b.date));

      return {
        id: p.id,
        name: p.full_name || "Ukjent",
        avatar: p.avatar_url,
        rounds: pr.length,
        leagueRounds: leagueRounds.length,
        best: scores.length ? scores[0] : null,
        avg: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10) / 10 : null,
        pts: totalPts,
        coursesPlayed: leagueCoursesPlayed,
        qualified,
        division: p.division || "Rekreasjons",
        hometown: p.hometown || "",
        trend: byDate.slice(-10).map(r => scoreToPoints(r.score, MAJOR_COURSE_IDS.has(r.course_id))),
      };
    }).filter(p => p.rounds > 0);

    result.sort((a, b) => {
      if (a.qualified !== b.qualified) return a.qualified ? -1 : 1;
      if (a.qualified) return b.pts - a.pts;
      if (a.coursesPlayed !== b.coursesPlayed) return b.coursesPlayed - a.coursesPlayed;
      return b.pts - a.pts;
    });

    setPlayers(result);
    try { localStorage.setItem("cache_players", JSON.stringify(result)); } catch {}
    return result;
  };

  const loadAllProfiles = async () => {
    const { data, error } = await supabase.from("profiles").select("id, full_name, avatar_url, hometown, disabled");
    console.log("loadAllProfiles:", data?.length, "profiles", error);
    const profiles = data || [];
    setAllProfiles(profiles);
    try { localStorage.setItem("cache_profiles", JSON.stringify(profiles)); } catch {}
  };

  const loadNotifications = async () => {
    if (!user) return;
    const { data } = await supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5);
    if (data) setNotifications(data);
    // Clean up old notifications beyond 5
    const { data: allNotifs } = await supabase.from("notifications").select("id").eq("user_id", user.id).order("created_at", { ascending: false });
    if (allNotifs && allNotifs.length > 5) {
      const idsToDelete = allNotifs.slice(5).map(n => n.id);
      await supabase.from("notifications").delete().in("id", idsToDelete);
    }
  };

  const loadFriends = async () => {
    if (!user) return;
    const { data } = await supabase.from("friends").select("*").eq("user_id", user.id).eq("status", "accepted");
    if (data) setFriends(data);
  };

  const loadPendingFriendRequests = async () => {
    if (!user) return;
    const { data } = await supabase.from("friends").select("*, profiles!friends_user_id_fkey(full_name, avatar_url)").eq("friend_id", user.id).eq("status", "pending");
    if (data) setPendingFriendRequests(data);
  };

  const sendFriendRequest = async (friendId) => {
    if (!user || friendId === user.id) return;
    // Check if friendship already exists in either direction
    const { data: existing } = await supabase.from("friends").select("id, status").or(`and(user_id.eq.${user.id},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${user.id})`);
    if (existing && existing.length > 0) return; // already exists
    await supabase.from("friends").insert({ user_id: user.id, friend_id: friendId, status: "pending" });
    const userName = user.user_metadata?.full_name || "Noen";
    await supabase.from("notifications").insert({
      user_id: friendId, type: "friend_request", title: "Ny venneforespørsel!",
      body: `${userName} vil legge deg til som venn`, data: { from_user_id: user.id }
    });
    setSentRequests(prev => [...prev, friendId]);
    await loadFriends();
  };

  const acceptFriendRequest = async (request) => {
    if (!user) return;
    // Update the request to accepted
    await supabase.from("friends").update({ status: "accepted" }).eq("id", request.id);
    // Create reverse friendship
    const { data: existing } = await supabase.from("friends").select("id").eq("user_id", user.id).eq("friend_id", request.user_id);
    if (!existing || existing.length === 0) {
      await supabase.from("friends").insert({ user_id: user.id, friend_id: request.user_id, status: "accepted" });
    } else {
      await supabase.from("friends").update({ status: "accepted" }).eq("user_id", user.id).eq("friend_id", request.user_id);
    }
    // Notify the requester
    const userName = user.user_metadata?.full_name || "Noen";
    await supabase.from("notifications").insert({
      user_id: request.user_id, type: "friend_accepted", title: "Venneforespørsel godkjent!",
      body: `${userName} godtok venneforespørselen din`
    });
    // Update the notification for this friend request to show "Godkjent"
    await supabase.from("notifications").update({ title: "✓ Venneforespørsel godkjent", body: `Du og ${request.profiles?.full_name || "en spiller"} er nå venner`, read: true }).eq("user_id", user.id).eq("type", "friend_request").filter("data->>from_user_id", "eq", request.user_id);
    await loadFriends();
    await loadPendingFriendRequests();
    await loadNotifications();
  };

  const declineFriendRequest = async (request) => {
    if (!user) return;
    await supabase.from("friends").delete().eq("id", request.id);
    await loadPendingFriendRequests();
  };

  const checkBadgeChanges = async (currentPlayers, currentRounds) => {
    if (!user) return;
    const myProfile = { id: user.id };
    const myRounds = currentRounds.filter(r => r.user_id === user.id);
    const currentBadges = {};
    BADGE_DEFS.forEach(b => {
      currentBadges[b.id] = b.check(myProfile, myRounds, COURSES, currentRounds, currentPlayers);
    });
    const storedRaw = localStorage.getItem("earnedBadges");
    const storedBadges = storedRaw ? JSON.parse(storedRaw) : null;
    if (storedBadges) {
      const newNotifs = [];
      BADGE_DEFS.forEach(b => {
        if (currentBadges[b.id] && !storedBadges[b.id]) {
          newNotifs.push({ user_id: user.id, type: "badge_earned", title: `Ny badge: ${b.name}!`, body: b.desc });
        }
        if (!currentBadges[b.id] && storedBadges[b.id] && (b.id === "banekonge" || b.id === "podium")) {
          let takerName = "Noen";
          if (b.id === "podium") {
            const top3 = currentPlayers.slice(0, 3);
            const taker = top3.find(p => p.id !== user.id);
            if (taker) takerName = taker.name;
          }
          if (b.id === "banekonge") {
            takerName = "en annen spiller";
          }
          newNotifs.push({ user_id: user.id, type: "badge_lost", title: `Du mistet ${b.name}!`, body: `${takerName} tok over` });
        }
      });
      if (newNotifs.length > 0) {
        await supabase.from("notifications").insert(newNotifs);
        loadNotifications();
      }
    }
    localStorage.setItem("earnedBadges", JSON.stringify(currentBadges));
  };

  useEffect(() => {
    loadRounds();
    loadPlayers();
    loadAllProfiles();
    navigator.geolocation.getCurrentPosition(
      pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {}
    );
    // PWA install prompt
    const handler = (e) => { e.preventDefault(); setDeferredPrompt(e); };
    window.addEventListener("beforeinstallprompt", handler);
    // Show install tip after 5 seconds if not already installed
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    if (!isStandalone) setTimeout(() => setShowInstallTip(true), 5000);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const signOut = () => supabase.auth.signOut();

  const ADMIN_EMAILS = [import.meta.env.VITE_ADMIN_EMAIL, "urbanthor@gmail.com"].filter(Boolean);
  const isAdmin = ADMIN_EMAILS.includes(user?.email);
  const [adminTab, setAdminTab] = useState("oversikt");

  const today = new Date().toISOString().split("T")[0];

  const sortedCourses = userLocation
    ? [...COURSES].sort((a, b) => getDistance(userLocation.lat, userLocation.lng, a.lat, a.lng) - getDistance(userLocation.lat, userLocation.lng, b.lat, b.lng))
    : COURSES;

  const friendIds = friends.map(f => f.friend_id);
  const filtered = division === "Alle" ? players : division === "Venner" ? players.filter(p => friendIds.includes(p.id)) : players.filter(p => p.division === division);
  const qualifiedPlayers = filtered.filter(p => p.qualified);
  const unqualifiedPlayers = filtered.filter(p => !p.qualified);

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, color: theme.text, fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", position: "relative", overflow: "hidden", transition: "background 0.4s ease, color 0.4s ease" }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.025, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      {theme.bgImage && BG_IMAGES[theme.bgImage] && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: theme.isDark ? 0.18 : 0.10,
          backgroundImage: `url("${BG_IMAGES[theme.bgImage]}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          mixBlendMode: theme.isDark ? "screen" : "multiply",
          transition: "opacity 0.4s ease",
        }} />
      )}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 0, pointerEvents: "none", opacity: 0.12 }}>
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none" style={{ width: "100%", height: "200px" }}>
          <path d="M0,200 L0,140 L100,80 L200,120 L300,40 L400,90 L500,20 L600,70 L700,30 L800,80 L900,50 L1000,100 L1100,60 L1200,90 L1200,200 Z" fill={theme.mountain} />
        </svg>
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "24px 20px 0" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src="/favicon_small.png" alt="GDG logo" style={{ width: 44, height: 44, objectFit: "cover", borderRadius: "50%" }} />
              <div>
                <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: theme.accent, fontWeight: 700 }}>Gudbrandsdalen</div>
                <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>Discgolf Liga</div>
                <div style={{ fontSize: 10, color: "#6b7a58", fontWeight: 600, marginTop: 2 }}>Sesong: {getSeasonLabel()}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={() => setShowThemePicker(true)} title="Bytt fargetema" style={{ position: "relative", background: `${theme.accent}1a`, border: `1px solid ${theme.accent}40`, borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }}>
                🎨
              </button>
              {user ? (
                <>
                <button onClick={async () => { setShowNotifications(true); await loadNotifications(); loadPendingFriendRequests(); supabase.from("notifications").update({ read: true }).eq("user_id", user.id).eq("read", false).then(() => { setTimeout(() => setNotifications(prev => prev.map(n => ({ ...n, read: true }))), 2000); }); }} style={{ position: "relative", background: "rgba(101,163,13,0.1)", border: "1px solid rgba(101,163,13,0.25)", borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  {BellIcon({ size: 18, color: "#6b34a3" })}
                  {(notifications.filter(n => !n.read).length + pendingFriendRequests.length) > 0 && (
                    <div style={{ position: "absolute", top: -2, right: -2, width: 16, height: 16, borderRadius: "50%", background: "#ef4444", color: "#fff", fontSize: 9, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{notifications.filter(n => !n.read).length + pendingFriendRequests.length}</div>
                  )}
                </button>
                <button onClick={() => setShowProfile(true)} style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(101,163,13,0.1)", border: "1px solid rgba(101,163,13,0.25)", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", overflow: "hidden", padding: 0 }}>
                  {user.user_metadata?.avatar_url
                    ? <img src={user.user_metadata.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #A3E635, #65A30D)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#0a0f0a", fontWeight: 800 }}>{user.user_metadata?.full_name?.[0] ?? "?"}</div>
                  }
                </button>
                </>
              ) : (
                <button onClick={() => { setShowAuth(true); setAuthMode("login"); }} style={{ fontSize: 12, color: "#fff", background: "linear-gradient(135deg, #65A30D, #4a7a0a)", padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 700 }}>Logg inn</button>
              )}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, margin: "16px 0" }}>
            {[{ label: "Spillere", value: players.length, iconKey: "players", tab: "tabell", anim: true }, { label: "Runder spilt", value: realRounds.length, iconKey: "rounds", tab: "runder", anim: true }, { label: "Baner", value: COURSES.length, iconKey: "courses", tab: "baner", anim: false }].map(s => (
              <div key={s.label} onClick={() => setTab(s.tab)} style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "12px 10px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>{STAT_ICONS[s.iconKey]({ size: 30, color: "#6b34a3" })}</div>
                <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1 }}>{s.anim ? <AnimNum value={s.value} /> : s.value}</div>
                <div style={{ fontSize: 10, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <button onClick={() => setShowRegister(true)} style={{ width: "100%", padding: "14px", border: "none", borderRadius: 14, background: "linear-gradient(135deg, #A3E635 0%, #65A30D 100%)", color: "#0a0f0a", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 24px rgba(163,230,53,0.25), inset 0 1px 0 rgba(255,255,255,0.2)", transition: "transform 0.15s", marginBottom: 16 }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >+ Registrer runde</button>

          {(() => {
            const allTabs = [{ id: "tabell", label: "Ligatabell" }, { id: "runder", label: "Runder" }, { id: "baner", label: "Baner" }, { id: "regler", label: "Poeng" }, ...(user && friends.length > 0 ? [{ id: "venner", label: "Venner" }] : []), { id: "badges", label: "Badges" }, { id: "intro", label: "Ny her?" }, ...(isAdmin ? [{ id: "admin", label: "Admin" }] : [])];
            const mid = Math.ceil(allTabs.length / 2);
            const row1 = allTabs.slice(0, mid);
            const row2 = allTabs.slice(mid);
            const tabBtnStyle = (t, rowLen) => ({ flex: `1 1 ${100/rowLen}%`, minWidth: 0, padding: "8px 4px 6px", border: "none", borderRadius: 10, background: tab === t.id ? "#ffffff" : "transparent", color: tab === t.id ? "#4a8a10" : "#6b7a58", fontWeight: tab === t.id ? 700 : 500, fontSize: 11, cursor: "pointer", transition: "all 0.2s", boxShadow: tab === t.id ? "0 1px 4px rgba(0,0,0,0.1)" : "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 });
            return (
              <div style={{ background: "rgba(0,0,0,0.06)", borderRadius: 12, padding: 4, display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {row1.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={tabBtnStyle(t, row1.length)}>
                      {TAB_ICONS[t.id] ? TAB_ICONS[t.id]({ size: 22, color: tab === t.id ? "#4a8a10" : "#6b34a3" }) : null}{t.label}
                    </button>
                  ))}
                </div>
                {row2.length > 0 && (
                  <div style={{ display: "flex", gap: 4 }}>
                    {row2.map(t => (
                      <button key={t.id} onClick={() => setTab(t.id)} style={tabBtnStyle(t, row2.length)}>
                        {TAB_ICONS[t.id] ? TAB_ICONS[t.id]({ size: 22, color: tab === t.id ? "#4a8a10" : "#6b34a3" }) : null}{t.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "16px 20px 100px", maxWidth: 600, margin: "0 auto" }}>

        {tab === "tabell" && (
          <div>
            {(() => {
              const now = new Date();
              const dayOfWeek = now.getDay(); // 0=Sun, 1=Mon...
              const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
              const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + mondayOffset);
              const mondayStr = monday.toISOString().split("T")[0];
              const sunday = new Date(monday);
              sunday.setDate(sunday.getDate() + 6);
              const sundayStr = sunday.toISOString().split("T")[0];
              const weekRounds = realRounds.filter(r => r.date >= mondayStr && r.date <= sundayStr);
              if (weekRounds.length === 0) return null;
              const best = weekRounds.reduce((a, b) => a.score < b.score ? a : b);
              const playerName = best.profiles?.full_name ?? "Ukjent";
              const courseName = COURSES.find(c => c.id === best.course_id)?.name || best.course_name || "Ukjent bane";
              const scoreStr = best.score === 0 ? "E" : best.score > 0 ? `+${best.score}` : `${best.score}`;
              return (
                <div onClick={() => { const p = players.find(p => p.name === playerName || p.id === best.user_id); if (p) setSelectedPlayer(p); }} style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.12), rgba(251,191,36,0.04))", border: "1px solid rgba(251,191,36,0.3)", borderRadius: 14, padding: "12px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10, animation: "fadeSlideUp 0.4s ease", cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(251,191,36,0.15)"}
                  onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(135deg, rgba(251,191,36,0.12), rgba(251,191,36,0.04))"}>
                  <div style={{ fontSize: 24, flexShrink: 0 }}>⭐</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#b07a00", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Ukens spiller</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#1c2b12" }}>{playerName} <span style={{ fontWeight: 600, color: "#6b7a58" }}>— {scoreStr} på {courseName.split(" ")[0]}</span></div>
                  </div>
                </div>
              );
            })()}
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              {["Alle", "Åpen", "Rekreasjons", ...(friends.length > 0 ? ["Venner"] : [])].map(d => (
                <button key={d} onClick={() => setDivision(d)} style={{ padding: "6px 14px", border: "1px solid", borderColor: division === d ? "#65A30D" : "rgba(0,0,0,0.1)", borderRadius: 20, background: division === d ? "rgba(101,163,13,0.12)" : "rgba(255,255,255,0.6)", color: division === d ? "#4a8a10" : "#6b7a58", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{d}</button>
              ))}
            </div>
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "48px 20px", background: "rgba(255,255,255,0.6)", borderRadius: 16, border: "1px solid rgba(0,0,0,0.08)" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🥏</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1c2b12", marginBottom: 6 }}>Ingen spillere ennå</div>
                <div style={{ fontSize: 13, color: "#6b7a58", lineHeight: 1.6 }}>Registrer deg og spill en runde for å komme på tabellen!</div>
              </div>
            )}
            {qualifiedPlayers.length >= 3 && division !== "Rekreasjons" && (
              <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "flex-end", justifyContent: "center" }}>
                {[qualifiedPlayers[1], qualifiedPlayers[0], qualifiedPlayers[2]].filter(Boolean).map((p, i) => {
                  const h = [100, 130, 80], m = ["🥈", "🥇", "🥉"], sz = [44, 56, 40];
                  return (
                    <div key={p.id} onClick={() => setSelectedPlayer(p)} style={{ textAlign: "center", cursor: "pointer", flex: 1, animation: `fadeSlideUp 0.5s ease ${i * 0.1}s both` }}>
                      <div style={{ width: sz[i], height: sz[i], minWidth: sz[i], minHeight: sz[i], borderRadius: "50%", margin: "0 auto 6px", overflow: "hidden", background: i === 1 ? "linear-gradient(135deg, #A3E635, #65A30D)" : "rgba(255,255,255,0.8)", border: i === 1 ? "2px solid #65A30D" : "2px solid rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: sz[i] * 0.45, boxShadow: i === 1 ? "0 4px 20px rgba(101,163,13,0.3)" : "0 2px 8px rgba(0,0,0,0.1)" }}>
                        {p.avatar?.startsWith("http") ? <img src={p.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (p.name?.[0] ?? "?")}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{p.name.split(" ")[0]}</div>
                      <div style={{ height: h[i], borderRadius: "12px 12px 0 0", background: i === 1 ? "linear-gradient(180deg, rgba(101,163,13,0.15), rgba(101,163,13,0.04))" : "rgba(255,255,255,0.6)", border: i === 1 ? "1px solid rgba(101,163,13,0.2)" : "1px solid rgba(0,0,0,0.08)", borderBottom: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ fontSize: 20 }}>{m[i]}</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: i === 1 ? "#4a8a10" : "#2a3a1a" }}>{p.pts}</div>
                        <div style={{ fontSize: 9, color: "#6b7a58", textTransform: "uppercase", letterSpacing: "0.1em" }}>pts</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {qualifiedPlayers.length > 0 && (
            <div style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "22px 1fr 50px 50px 70px", padding: "10px 14px", fontSize: 10, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, borderBottom: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.5)" }}>
                <div>#</div><div>Spiller</div><div style={{ textAlign: "right" }}>Snitt</div><div style={{ textAlign: "right" }}>Poeng</div><div style={{ textAlign: "right" }}>Trend</div>
              </div>
              {qualifiedPlayers.map((p, i) => (
                <div key={p.id} onClick={() => setSelectedPlayer(p)} style={{ display: "grid", gridTemplateColumns: "22px 1fr 50px 50px 70px", padding: "12px 14px", alignItems: "center", cursor: "pointer", borderBottom: "1px solid rgba(0,0,0,0.04)", background: i === 0 ? "rgba(101,163,13,0.06)" : "transparent", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(101,163,13,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background = i === 0 ? "rgba(101,163,13,0.06)" : "transparent"}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: i < 3 ? "#4a8a10" : "#8a9a80" }}>{i + 1}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 30, height: 30, minWidth: 30, minHeight: 30, borderRadius: "50%", overflow: "hidden", background: "rgba(101,163,13,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, border: "1px solid rgba(0,0,0,0.08)", flexShrink: 0 }}>
                      {p.avatar?.startsWith("http") ? <img src={p.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (p.name?.[0] ?? "?")}
                    </div>
                    <div style={{ minWidth: 0 }}><div style={{ fontSize: 13, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name.split(" ")[0]}</div><div style={{ fontSize: 10, color: "#6b7a58" }}>{p.rounds}r{p.hometown ? ` · ${p.hometown}` : ` · ${p.division}`}</div></div>
                  </div>
                  <div style={{ textAlign: "right", fontSize: 13, fontWeight: 600, color: p.avg <= 0 ? "#4a8a10" : "#ef4444" }}>{p.avg > 0 ? "+" : ""}{p.avg}</div>
                  <div style={{ textAlign: "right", fontSize: 15, fontWeight: 900 }}>{p.pts}</div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}><Sparkline data={p.trend} color={i < 3 ? "#65A30D" : "#8a9a70"} /></div>
                </div>
              ))}
            </div>
            )}
            {unqualifiedPlayers.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em" }}>Ingen ligarunder ennå</div>
                  <div style={{ fontSize: 10, color: "#8a9a70" }}>Spill en av de {LEAGUE_COURSE_IDS.length} ligabanene</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 16, overflow: "hidden" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "22px 1fr 60px 70px", padding: "10px 14px", fontSize: 10, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, borderBottom: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.4)" }}>
                    <div>#</div><div>Spiller</div><div style={{ textAlign: "right" }}>Baner</div><div style={{ textAlign: "right" }}>Trend</div>
                  </div>
                  {unqualifiedPlayers.map((p) => (
                    <div key={p.id} onClick={() => setSelectedPlayer(p)} style={{ display: "grid", gridTemplateColumns: "22px 1fr 60px 70px", padding: "12px 14px", alignItems: "center", cursor: "pointer", borderBottom: "1px solid rgba(0,0,0,0.04)", opacity: 0.85, transition: "opacity 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "0.85"}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#8a9a80" }}>—</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 30, height: 30, minWidth: 30, minHeight: 30, borderRadius: "50%", overflow: "hidden", background: "rgba(101,163,13,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, border: "1px solid rgba(0,0,0,0.08)", flexShrink: 0 }}>
                          {p.avatar?.startsWith("http") ? <img src={p.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (p.name?.[0] ?? "?")}
                        </div>
                        <div style={{ minWidth: 0 }}><div style={{ fontSize: 13, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name.split(" ")[0]}</div><div style={{ fontSize: 10, color: "#6b7a58" }}>{p.rounds}r{p.hometown ? ` · ${p.hometown}` : ` · ${p.division}`}</div></div>
                      </div>
                      <div style={{ textAlign: "right", fontSize: 12, fontWeight: 700, color: "#5a7040" }}>{p.coursesPlayed}/{LEAGUE_COURSE_IDS.length}</div>
                      <div style={{ display: "flex", justifyContent: "flex-end" }}>{p.trend.length >= 2 ? <Sparkline data={p.trend} color="#8a9a70" /> : <span style={{ fontSize: 10, color: "#8a9a70" }}>—</span>}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "runder" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>Siste runder</div>
              {realRounds.length > 0 && <div style={{ fontSize: 11, color: "#4a8a10", fontWeight: 600 }}>● Live</div>}
            </div>
            {user && (
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                {[{ id: "alle", label: "Alle runder" }, { id: "mine", label: "Mine runder" }, ...(friends.length > 0 ? [{ id: "venner", label: "Venner" }] : [])].map(v => (
                  <button key={v.id} onClick={() => setRoundsView(v.id)} style={{ flex: 1, padding: "10px 12px", border: "1px solid", borderColor: roundsView === v.id ? "#65A30D" : "rgba(0,0,0,0.1)", borderRadius: 14, background: roundsView === v.id ? "rgba(101,163,13,0.15)" : "rgba(255,255,255,0.6)", color: roundsView === v.id ? "#4a8a10" : "#6b7a58", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>{v.label}</button>
                ))}
              </div>
            )}
            {realRounds.length > 0 && (
              <div style={{ display: "flex", gap: 6, marginBottom: 12, overflowX: "auto", paddingBottom: 4 }}>
                <button onClick={() => setRoundFilter("alle")} style={{ padding: "5px 12px", border: "1px solid", borderColor: roundFilter === "alle" ? "#65A30D" : "rgba(0,0,0,0.1)", borderRadius: 20, background: roundFilter === "alle" ? "rgba(101,163,13,0.12)" : "rgba(255,255,255,0.6)", color: roundFilter === "alle" ? "#4a8a10" : "#6b7a58", fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>Alle</button>
                {[...new Set(realRounds.map(r => r.course_id))].map(cid => {
                  const name = COURSES.find(c => c.id === cid)?.name || cid;
                  return <button key={cid} onClick={() => setRoundFilter(cid)} style={{ padding: "5px 12px", border: "1px solid", borderColor: roundFilter === cid ? "#65A30D" : "rgba(0,0,0,0.1)", borderRadius: 20, background: roundFilter === cid ? "rgba(101,163,13,0.12)" : "rgba(255,255,255,0.6)", color: roundFilter === cid ? "#4a8a10" : "#6b7a58", fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{name.split(" ")[0]}</button>;
                })}
              </div>
            )}
            {realRounds.length === 0 && (
              <div style={{ textAlign: "center", padding: "48px 20px", background: "rgba(255,255,255,0.6)", borderRadius: 16, border: "1px solid rgba(0,0,0,0.08)" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1c2b12", marginBottom: 6 }}>Ingen runder ennå</div>
                <div style={{ fontSize: 13, color: "#6b7a58" }}>Vær den første til å registrere en runde!</div>
              </div>
            )}
            {realRounds.filter(r => {
              const courseOk = roundFilter === "alle" || r.course_id === roundFilter;
              const friendIds = friends.map(f => f.friend_id);
              const viewOk = roundsView === "alle" ? true : roundsView === "mine" ? r.user_id === user?.id : friendIds.includes(r.user_id);
              return courseOk && viewOk;
            }).map((r, i) => (
              <div key={r.id} onClick={() => setSelectedRound(r)} style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: "14px 16px", marginBottom: 8, animation: `fadeSlideUp 0.4s ease ${i * 0.06}s both`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(101,163,13,0.06)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.75)"}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div onClick={(e) => { e.stopPropagation(); const p = players.find(p => p.id === r.user_id); if (p) setSelectedPlayer(p); }} style={{ width: 32, height: 32, minWidth: 32, borderRadius: "50%", overflow: "hidden", background: "rgba(101,163,13,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, border: "1px solid rgba(0,0,0,0.08)", flexShrink: 0, cursor: "pointer" }}>
                      {r.profiles?.avatar_url?.startsWith("http") ? <img src={r.profiles.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (r.profiles?.full_name?.[0] ?? "?")}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{r.profiles?.full_name ?? "Ukjent spiller"}</div>
                      <div style={{ fontSize: 11, color: "#6b7a58", marginBottom: 4 }}>{r.course_name}</div>
                      <div style={{ fontSize: 11, color: "#8a9a70" }}>
                        {new Date(r.date + "T12:00:00").toLocaleDateString("nb-NO", { day: "2-digit", month: "2-digit", year: "numeric" })}
                      </div>
                      {r.note && <div style={{ fontSize: 11, color: "#5a7040", marginTop: 4, fontStyle: "italic", background: "rgba(101,163,13,0.06)", padding: "3px 8px", borderRadius: 6, display: "inline-block" }}>💬 {r.note}</div>}
                      {r.group_id && (() => {
                        const groupMates = realRounds.filter(gr => gr.group_id === r.group_id && gr.id !== r.id);
                        if (groupMates.length === 0) return null;
                        return (
                          <div style={{ fontSize: 11, color: "#6b7a58", marginTop: 4 }}>
                            Spilt med: {groupMates.map((gm, gi) => (
                              <span key={gm.id}>
                                {gi > 0 && ", "}
                                <span onClick={(e) => { e.stopPropagation(); const p = players.find(pl => pl.id === gm.user_id); if (p) setSelectedPlayer(p); }} style={{ color: "#4a8a10", fontWeight: 600, cursor: "pointer" }}>{gm.profiles?.full_name?.split(" ")[0] ?? "Ukjent"}</span>
                              </span>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: r.score <= 0 ? "#4a8a10" : "#ef4444", lineHeight: 1 }}>
                      {r.total_score ?? (r.score + (COURSES.find(c => c.id === r.course_id)?.par ?? 0))}
                    </div>
                    <div style={{ fontSize: 11, color: "#6b7a58", marginTop: 2 }}>({r.score === 0 ? "E" : r.score > 0 ? `+${r.score}` : r.score})</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "baner" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>Baner i ligaen</div>
              <div style={{ fontSize: 11, color: "#6b7a58" }}>Banedata fra <span style={{ color: "#4a8a10", fontWeight: 700 }}>UDisc</span> · scorer manuelt</div>
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
              {[
                { id: "avstand", label: "📍 Avstand", disabled: !userLocation },
                { id: "populær", label: "🔥 Populær" },
                { id: "stjerner", label: "⭐ Rating" },
              ].map(s => (
                <button key={s.id} onClick={() => !s.disabled && setCourseSort(s.id)} style={{ padding: "6px 12px", border: "1px solid", borderColor: courseSort === s.id ? "#65A30D" : "rgba(0,0,0,0.1)", borderRadius: 20, background: courseSort === s.id ? "rgba(101,163,13,0.12)" : "rgba(255,255,255,0.6)", color: s.disabled ? "#b0b8a0" : courseSort === s.id ? "#4a8a10" : "#6b7a58", fontSize: 12, fontWeight: 600, cursor: s.disabled ? "default" : "pointer", opacity: s.disabled ? 0.5 : 1 }}>{s.label}</button>
              ))}
            </div>
            {(() => {
              const roundCounts = {};
              realRounds.forEach(r => { roundCounts[r.course_id] = (roundCounts[r.course_id] || 0) + 1; });
              let sorted;
              if (courseSort === "populær") sorted = [...COURSES].sort((a, b) => (roundCounts[b.id] || 0) - (roundCounts[a.id] || 0));
              else if (courseSort === "stjerner") sorted = [...COURSES].sort((a, b) => b.rating - a.rating);
              else sorted = userLocation ? [...COURSES].sort((a, b) => getDistance(userLocation.lat, userLocation.lng, a.lat, a.lng) - getDistance(userLocation.lat, userLocation.lng, b.lat, b.lng)) : COURSES;
              return sorted;
            })().map((c, i) => {
              const roundCount = realRounds.filter(r => r.course_id === c.id).length;
              const dist = userLocation ? getDistance(userLocation.lat, userLocation.lng, c.lat, c.lng) : null;
              return (
              <div key={c.id} onClick={() => setSelectedCourse(selectedCourse?.id === c.id ? null : c)} style={{ background: selectedCourse?.id === c.id ? "rgba(101,163,13,0.08)" : "rgba(255,255,255,0.75)", border: selectedCourse?.id === c.id ? "1px solid rgba(101,163,13,0.25)" : "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: "16px", cursor: "pointer", transition: "all 0.2s", marginBottom: 10, animation: `fadeSlideUp 0.4s ease ${i * 0.05}s both`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: "#6b7a58", marginBottom: 6 }}>{c.location}{dist !== null ? <span style={{ color: "#4a8a10", fontWeight: 700 }}> · {dist} km</span> : ""}</div>
                    <Stars rating={c.rating} />
                    {c.ratings && <span style={{ fontSize: 10, color: "#6b7a58", marginLeft: 4 }}>({c.ratings})</span>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    {MAJOR_COURSE_IDS.has(c.id) && <div style={{ padding: "3px 8px", borderRadius: 8, background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.35)", fontSize: 10, fontWeight: 700, color: "#b07a00" }}>⭐ Major</div>}
                    <div style={{ padding: "4px 10px", borderRadius: 10, background: "rgba(101,163,13,0.1)", border: "1px solid rgba(101,163,13,0.2)", fontSize: 11, fontWeight: 700, color: "#4a8a10" }}>{c.holes} hull</div>
                    <div style={{ fontSize: 10, color: "#6b7a58" }}>Par {c.par}</div>
                    {roundCount > 0 && <div style={{ fontSize: 10, color: "#4a8a10", fontWeight: 700 }}>🥏 {roundCount} runder</div>}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[{ label: c.difficulty, color: c.difficulty.includes("Vanskelig") ? "#e05000" : c.difficulty === "Moderat" ? "#b07a00" : "#4a8a10" }, { label: c.time }, { label: c.length }, { label: "Gratis", color: "#4a8a10" }].map((tag, j) => (
                    <span key={j} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 8, background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.08)", color: tag.color || "#6b7a58", fontWeight: 600 }}>{tag.label}</span>
                  ))}
                </div>
                {(() => {
                  const courseRounds = realRounds.filter(r => r.course_id === c.id);
                  if (courseRounds.length === 0) return null;
                  const bestRound = courseRounds.reduce((a, b) => a.score < b.score ? a : b);
                  const scoreStr = bestRound.score === 0 ? "E" : bestRound.score > 0 ? `+${bestRound.score}` : `${bestRound.score}`;
                  const playerName = bestRound.profiles?.full_name ?? "Ukjent";
                  return (
                    <div style={{ marginTop: 8, fontSize: 11, color: "#b07a00", fontWeight: 700, background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.15)", borderRadius: 8, padding: "5px 10px", display: "inline-block" }}>🏆 Banerekord: {scoreStr} ({playerName})</div>
                  );
                })()}
                {selectedCourse?.id === c.id && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(0,0,0,0.08)", animation: "fadeSlideUp 0.3s ease" }}>
                    <div style={{ fontSize: 12, color: "#4a5a38", lineHeight: 1.6, marginBottom: 12 }}>{c.desc}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <a href={c.udisc} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, background: "rgba(101,163,13,0.12)", border: "1px solid rgba(101,163,13,0.25)", color: "#4a8a10", fontWeight: 700, fontSize: 12, textDecoration: "none" }}>
                        🔗 Se på UDisc
                      </a>
                      <a href={c.googleMaps} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, background: "rgba(66,133,244,0.08)", border: "1px solid rgba(66,133,244,0.25)", color: "#1a73e8", fontWeight: 700, fontSize: 12, textDecoration: "none" }}>
                        📍 Åpne i Google Maps
                      </a>
                    </div>
                  </div>
                )}
              </div>
              );
            })}
          </div>
        )}

        {tab === "regler" && (
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Slik fungerer ligaen</div>
            <div style={{ fontSize: 12, color: "#6b7a58", marginBottom: 16, lineHeight: 1.5 }}>12 baner · vår + høst · alle runder teller. Poeng etter score mot par — majors gir 1,5× poeng.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: "📍", title: "1. Spill ligabanene", body: `Ligaen har ${LEAGUE_COURSE_IDS.length} baner i Gudbrandsdalen. Én runde per bane på våren og én på høsten — totalt 24 runder i sesongen.` },
                { icon: "🎯", title: "2. Poeng etter score mot par", body: "Under par = mange poeng. Jo høyere over par, jo færre poeng. ≤−4: 10pts · −3/−2: 9pts · −1/0: 8pts · +1/+2: 7pts · +3/+4: 6pts · +5/+6: 5pts · +7/+8: 4pts · +9/+10: 3pts · +11–13: 2pts · +14–16: 1pt · ≥+17: 0pts" },
                { icon: "⭐", title: "3. Majors gir 1,5× poeng", body: "Skogen, Lalm og Jørstadmoen er major-baner. Poengene på disse banene rundes opp og multipliseres med 1,5. Eksempel: 8 pts → 12 pts på en major." },
                { icon: "🏆", title: "4. Flest poeng vinner", body: "Alle registrerte runder på ligabanene teller. Ingen minimumsgrense — spill når du kan og samle poeng gjennom sesongen." },
              ].map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: 14, display: "flex", gap: 12 }}>
                  <div style={{ fontSize: 22, lineHeight: 1 }}>{s.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 4 }}>{s.title}</div>
                    <div style={{ fontSize: 12, color: "#5a7040", lineHeight: 1.5 }}>{s.body}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: 16, borderRadius: 14, background: "rgba(101,163,13,0.07)", border: "1px solid rgba(101,163,13,0.15)", fontSize: 12, color: "#4a5a38", lineHeight: 1.6 }}>
              <div style={{ fontWeight: 700, color: "#4a8a10", marginBottom: 4 }}>💡 Format: Score-Stableford</div>
              Du trenger ikke prestere for å delta — men du trenger å prestere for å vinne. Ingen oppmøtepoeng. Major-banene holder spenningen oppe gjennom hele sesongen.
            </div>
          </div>
        )}

        {tab === "venner" && user && (
          <div style={{ animation: "fadeSlideUp 0.4s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>Venner ({friends.length})</div>
            </div>
            {friends.length === 0 && (
              <div style={{ textAlign: "center", padding: "48px 20px", background: "rgba(255,255,255,0.6)", borderRadius: 16, border: "1px solid rgba(0,0,0,0.08)" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>👥</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1c2b12", marginBottom: 6 }}>Ingen venner ennå</div>
                <div style={{ fontSize: 13, color: "#6b7a58" }}>Trykk på en spiller i ligatabellen og legg til som venn</div>
              </div>
            )}
            {friends.map((f, i) => {
              const profile = allProfiles.find(p => p.id === f.friend_id);
              const playerData = players.find(p => p.id === f.friend_id);
              if (!profile) return null;
              return (
                <div key={f.id} onClick={() => {
                  if (playerData) setSelectedPlayer(playerData);
                  else setSelectedPlayer({ id: profile.id, name: profile.full_name, avatar: profile.avatar_url, rounds: 0, best: null, avg: null, pts: 0, division: "Rekreasjons", trend: [], hometown: profile.hometown });
                }} style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: "14px 16px", marginBottom: 8, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", animation: `fadeSlideUp 0.4s ease ${i * 0.06}s both`, transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(101,163,13,0.06)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.75)"}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden", background: "rgba(101,163,13,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, border: "2px solid rgba(101,163,13,0.2)", flexShrink: 0 }}>
                    {profile.avatar_url ? <img src={profile.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (profile.full_name?.[0] ?? "?")}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1c2b12" }}>{profile.full_name}</div>
                    <div style={{ fontSize: 11, color: "#6b7a58" }}>{profile.hometown ? `📍 ${profile.hometown} · ` : ""}{playerData ? `${playerData.rounds} runder · ${playerData.pts} pts` : "Ingen runder"}</div>
                  </div>
                  <div style={{ fontSize: 18, color: "#8a9a70" }}>›</div>
                </div>
              );
            })}
            {pendingFriendRequests.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#6b34a3", marginBottom: 8 }}>📩 Ventende forespørsler ({pendingFriendRequests.length})</div>
                {pendingFriendRequests.map(r => (
                  <div key={r.id} style={{ background: "rgba(107,52,163,0.05)", border: "1px solid rgba(107,52,163,0.15)", borderRadius: 12, padding: "12px 14px", marginBottom: 6, display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", background: "rgba(107,52,163,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                      {r.profiles?.avatar_url ? <img src={r.profiles.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (r.profiles?.full_name?.[0] ?? "?")}
                    </div>
                    <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "#1c2b12" }}>{r.profiles?.full_name || "Ukjent"}</div>
                    <button onClick={async (e) => { e.stopPropagation(); await acceptFriendRequest(r); }} style={{ padding: "5px 12px", borderRadius: 8, border: "none", background: "linear-gradient(135deg, #A3E635, #65A30D)", color: "#0a0f0a", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Godkjenn</button>
                    <button onClick={async (e) => { e.stopPropagation(); await declineFriendRequest(r); }} style={{ padding: "5px 10px", borderRadius: 8, border: "1px solid rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.05)", color: "#dc2626", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "badges" && (
          <div style={{ animation: "fadeSlideUp 0.4s ease" }}>
            {(() => {
              const myProfile = user ? { id: user.id } : null;
              const myRounds = user ? realRounds.filter(r => r.user_id === user.id) : [];
              const earnedCount = BADGE_DEFS.filter(b => b.check(myProfile, myRounds, COURSES, realRounds, players)).length;
              return (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <div style={{ fontSize: 16, fontWeight: 800 }}>Badges</div>
                    <div style={{ fontSize: 13, color: "#4a8a10", fontWeight: 700 }}>{earnedCount} av {BADGE_DEFS.length} oppnådd</div>
                  </div>
                  {!user && (
                    <div style={{ textAlign: "center", padding: "16px", background: "rgba(101,163,13,0.07)", border: "1px solid rgba(101,163,13,0.15)", borderRadius: 14, marginBottom: 16, fontSize: 13, color: "#4a5a38" }}>Logg inn for å se dine badges!</div>
                  )}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                    {BADGE_DEFS.map((badge) => {
                      const earned = user ? badge.check(myProfile, myRounds, COURSES, realRounds, players) : false;
                      return (
                        <div key={badge.id} style={{ background: earned ? "rgba(101,163,13,0.08)" : "rgba(255,255,255,0.7)", border: earned ? "1px solid rgba(101,163,13,0.3)" : "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: "14px 8px", textAlign: "center", boxShadow: earned ? "0 0 16px rgba(101,163,13,0.15)" : "0 2px 8px rgba(0,0,0,0.05)", transition: "all 0.3s" }}>
                          <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                            {BADGE_ICONS[badge.id] ? BADGE_ICONS[badge.id]({ locked: !earned }) : <div style={{ width: 64, height: 64, background: "#eee", borderRadius: "50%" }} />}
                          </div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: earned ? "#4a8a10" : "#6b7a58", marginBottom: 2 }}>{badge.name}</div>
                          <div style={{ fontSize: 10, color: "#8a9a70", lineHeight: 1.4 }}>{badge.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {tab === "intro" && (
          <div style={{ animation: "fadeSlideUp 0.4s ease" }}>
            {/* Hero */}
            <div style={{ background: "linear-gradient(135deg, rgba(101,163,13,0.12), rgba(101,163,13,0.04))", border: "1px solid rgba(101,163,13,0.2)", borderRadius: 18, padding: 24, marginBottom: 16, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🥏</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#1c2b12", marginBottom: 8 }}>Velkommen til discgolf!</div>
              <div style={{ fontSize: 14, color: "#4a5a38", lineHeight: 1.7 }}>Ny i sporten? Ingen stress. Her er alt du trenger å vite for å komme i gang med Gudbrandsdalen Discgolf Liga.</div>
            </div>

            {/* Hva er discgolf */}
            <div style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 20, marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#1c2b12", marginBottom: 10 }}>🌲 Hva er discgolf?</div>
              <div style={{ fontSize: 13, color: "#4a5a38", lineHeight: 1.8 }}>
                Discgolf er akkurat som vanlig golf — men i stedet for køller og baller bruker du <strong>frisbeeskiver</strong>, og i stedet for hull har du <strong>metallkurver</strong> du skal treffe.<br /><br />
                Du starter ved en tee-pad, kaster mot kurven, og fortsetter å kaste fra der disken landet. Målet er å nå kurven på <strong>færrest mulig kast</strong>.<br /><br />
                Hver bane har en <strong>par</strong>-verdi — det antall kast en god spiller forventes å bruke. Klarer du det på færre kast er du <em>under par</em>, og det er bra!
              </div>
            </div>

            {/* Score-forklaring */}
            <div style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 20, marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#1c2b12", marginBottom: 10 }}>📊 Hva betyr scoren?</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { score: "-5", label: "5 under par", desc: "Veldig bra runde!", color: "#4a8a10", bg: "rgba(101,163,13,0.1)" },
                  { score: "-1", label: "1 under par", desc: "Bra spilt!", color: "#4a8a10", bg: "rgba(101,163,13,0.07)" },
                  { score: "E", label: "Even — på par", desc: "Akkurat som forventet", color: "#5a7040", bg: "rgba(0,0,0,0.04)" },
                  { score: "+3", label: "3 over par", desc: "Helt vanlig for nybegynnere", color: "#b07a00", bg: "rgba(251,191,36,0.1)" },
                ].map(s => (
                  <div key={s.score} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, background: s.bg }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color: s.color, minWidth: 36, textAlign: "center" }}>{s.score}</div>
                    <div><div style={{ fontSize: 13, fontWeight: 700, color: "#1c2b12" }}>{s.label}</div><div style={{ fontSize: 11, color: "#6b7a58" }}>{s.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ligaen forklart */}
            <div style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 20, marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#1c2b12", marginBottom: 10 }}>🏆 Slik fungerer ligaen</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { num: "1", title: "Spill en runde", text: "Dra til en av de 12 banene i Gudbrandsdalen og spill en runde. Du velger selv når og hvor!" },
                  { num: "2", title: "Registrer scoren din", text: "Åpne appen og trykk «Registrer runde». Skriv inn scoren din (mot par) og hvilken bane du spilte." },
                  { num: "3", title: "Få ligapoeng", text: "Du får poeng basert på din score mot par: under par = mange poeng, over par = færre poeng. Majors (Skogen, Lalm, Jørstadmoen) gir 1,5× poeng." },
                  { num: "4", title: "Sesongen", text: "12 baner, én runde vår og én høst = 24 runder totalt. Alle runder teller — prestér for å klatre på tabellen!" },
                ].map(s => (
                  <div key={s.num} style={{ display: "flex", gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #A3E635, #65A30D)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#0a0f0a", flexShrink: 0 }}>{s.num}</div>
                    <div><div style={{ fontSize: 13, fontWeight: 700, color: "#1c2b12", marginBottom: 2 }}>{s.title}</div><div style={{ fontSize: 12, color: "#4a5a38", lineHeight: 1.6 }}>{s.text}</div></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divisjoner */}
            <div style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 20, marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#1c2b12", marginBottom: 10 }}>👥 To divisjoner</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ padding: 14, borderRadius: 12, background: "rgba(101,163,13,0.08)", border: "1px solid rgba(101,163,13,0.2)" }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#4a8a10", marginBottom: 4 }}>🎯 Åpen</div>
                  <div style={{ fontSize: 11, color: "#4a5a38", lineHeight: 1.6 }}>For erfarne spillere som vil konkurrere seriøst</div>
                </div>
                <div style={{ padding: 14, borderRadius: 12, background: "rgba(101,163,13,0.05)", border: "1px solid rgba(0,0,0,0.08)" }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#5a7040", marginBottom: 4 }}>😊 Rekreasjons</div>
                  <div style={{ fontSize: 11, color: "#4a5a38", lineHeight: 1.6 }}>For nybegynnere og de som spiller for moro skyld</div>
                </div>
              </div>
              <div style={{ marginTop: 10, fontSize: 12, color: "#6b7a58", fontStyle: "italic" }}>Du velger divisjon i profilen din etter innlogging.</div>
            </div>

            {/* CTA */}
            <button onClick={() => user ? setTab("tabell") : (setShowAuth(true), setAuthMode("signup"))} style={{ width: "100%", padding: 16, border: "none", borderRadius: 14, background: "linear-gradient(135deg, #A3E635, #65A30D)", color: "#0a0f0a", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 24px rgba(101,163,13,0.25)" }}>
              {user ? "🏆 Gå til ligatabellen" : "🥏 Registrer deg og bli med!"}
            </button>
          </div>
        )}

        {tab === "admin" && isAdmin && (
          <div style={{ animation: "fadeSlideUp 0.4s ease" }}>
            <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>🔧 Adminpanel</div>
            <div style={{ fontSize: 12, color: "#6b7a58", marginBottom: 12 }}>Kun synlig for administratorer</div>

            {/* Admin tabs */}
            <div style={{ display: "flex", gap: 4, background: "rgba(0,0,0,0.06)", borderRadius: 10, padding: 3, marginBottom: 16 }}>
              {[{ id: "oversikt", label: "📊 Oversikt" }, { id: "runder", label: "🥏 Runder" }, { id: "spillere", label: "👥 Spillere" }, { id: "profiler", label: "🪪 Profiler" }, { id: "test", label: "🧪 Test" }].map(t => (
                <button key={t.id} onClick={() => setAdminTab(t.id)} style={{ flex: 1, padding: "8px 6px", border: "none", borderRadius: 8, background: adminTab === t.id ? "#fff" : "transparent", color: adminTab === t.id ? "#4a8a10" : "#6b7a58", fontWeight: adminTab === t.id ? 700 : 500, fontSize: 11, cursor: "pointer", transition: "all 0.2s", boxShadow: adminTab === t.id ? "0 1px 4px rgba(0,0,0,0.1)" : "none" }}>{t.label}</button>
              ))}
            </div>

            {/* Oversikt */}
            {adminTab === "oversikt" && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
                  {[{ label: "Brukere", value: players.length, icon: "👥" }, { label: "Runder totalt", value: realRounds.length, icon: "🥏" }, { label: "Baner brukt", value: [...new Set(realRounds.map(r => r.course_id))].length, icon: "🗺️" }].map(s => (
                    <div key={s.label} style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "12px 8px", textAlign: "center" }}>
                      <div style={{ fontSize: 16, marginBottom: 2 }}>{s.icon}</div>
                      <div style={{ fontSize: 22, fontWeight: 800 }}>{s.value}</div>
                      <div style={{ fontSize: 10, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Siste aktivitet */}
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1c2b12", marginBottom: 8 }}>Siste aktivitet</div>
                {realRounds.slice(0, 5).map(r => (
                  <div key={r.id} style={{ background: "rgba(0,0,0,0.03)", borderRadius: 10, padding: "8px 12px", marginBottom: 4, fontSize: 12, color: "#4a5a38", border: "1px solid rgba(0,0,0,0.04)" }}>
                    <span style={{ fontWeight: 700 }}>{r.profiles?.full_name ?? "Ukjent"}</span> spilte {r.course_name} · <span style={{ color: r.score <= 0 ? "#4a8a10" : "#ef4444", fontWeight: 700 }}>{r.score > 0 ? "+" : ""}{r.score}</span> · {new Date(r.date + "T12:00:00").toLocaleDateString("nb-NO", { day: "2-digit", month: "2-digit" })}
                  </div>
                ))}
                {realRounds.length === 0 && <div style={{ fontSize: 12, color: "#8a9a70", textAlign: "center", padding: 16 }}>Ingen aktivitet ennå</div>}
              </div>
            )}

            {/* Runder */}
            {adminTab === "runder" && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1c2b12", marginBottom: 8 }}>Alle registrerte runder ({realRounds.length})</div>
                {realRounds.length === 0 && <div style={{ fontSize: 13, color: "#6b7a58", textAlign: "center", padding: 20 }}>Ingen runder ennå</div>}
                {realRounds.map(r => (
                  <div key={r.id} style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "12px 14px", marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{r.profiles?.full_name ?? "Ukjent"}</div>
                      <div style={{ fontSize: 11, color: "#6b7a58" }}>{r.course_name} · {new Date(r.date + "T12:00:00").toLocaleDateString("nb-NO", { day: "2-digit", month: "2-digit", year: "numeric" })}</div>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: r.score <= 0 ? "#4a8a10" : "#ef4444", minWidth: 36, textAlign: "right" }}>{r.score > 0 ? "+" : ""}{r.score}</div>
                    <button onClick={async () => {
                      if (!confirm(`Slett runde av ${r.profiles?.full_name}?`)) return;
                      await supabase.from("rounds").delete().eq("id", r.id);
                      await loadRounds();
                      await loadPlayers();
                    }} style={{ padding: "5px 10px", borderRadius: 8, border: "1px solid rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.07)", color: "#dc2626", fontSize: 12, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>Slett</button>
                  </div>
                ))}
              </div>
            )}

            {/* Spillere */}
            {adminTab === "spillere" && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1c2b12", marginBottom: 8 }}>Alle spillere ({players.length})</div>
                {players.length === 0 && <div style={{ fontSize: 13, color: "#6b7a58", textAlign: "center", padding: 20 }}>Ingen registrerte spillere ennå</div>}
                {players.map(p => (
                  <div key={p.id} style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "12px 14px", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
                    <div onClick={() => setSelectedPlayer(p)} style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", background: "rgba(101,163,13,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, border: "1px solid rgba(0,0,0,0.08)", flexShrink: 0, cursor: "pointer" }}>
                      {p.avatar?.startsWith("http") ? <img src={p.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (p.name?.[0] ?? "?")}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: "#6b7a58" }}>{p.hometown ? `${p.hometown} · ` : ""}{p.division} · {p.rounds} runder · {p.pts} pts</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Profiler */}
            {adminTab === "profiler" && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1c2b12", marginBottom: 8 }}>Registrerte profiler ({allProfiles.length})</div>
                {allProfiles.length === 0 && <div style={{ fontSize: 12, color: "#8a9a70", textAlign: "center", padding: 16 }}>Ingen profiler ennå</div>}
                {allProfiles.map(p => {
                  const playerData = players.find(pl => pl.id === p.id);
                  return (
                    <div key={p.id} style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "12px 14px", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
                      <div onClick={() => playerData && setSelectedPlayer(playerData)} style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", background: "rgba(101,163,13,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, border: "1px solid rgba(0,0,0,0.08)", flexShrink: 0, cursor: playerData ? "pointer" : "default" }}>
                        {p.avatar_url ? <img src={p.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (p.full_name?.[0] ?? "?")}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#1c2b12" }}>{p.full_name || "Uten navn"}</div>
                        <div style={{ fontSize: 11, color: "#6b7a58" }}>
                          {p.hometown ? `📍 ${p.hometown}` : "Ingen hjemsted"}
                          {playerData ? ` · ${playerData.rounds} runder · ${playerData.pts} pts` : " · 0 runder"}
                        </div>
                        <div style={{ fontSize: 10, color: "#8a9a70", marginTop: 2, fontFamily: "monospace" }}>{p.id.slice(0, 8)}…</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                        {p.disabled ? (
                          <div style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: "rgba(239,68,68,0.1)", color: "#dc2626", fontWeight: 600 }}>Deaktivert</div>
                        ) : playerData ? (
                          <div style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: "rgba(101,163,13,0.1)", color: "#4a8a10", fontWeight: 600 }}>Aktiv</div>
                        ) : (
                          <div style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: "rgba(0,0,0,0.05)", color: "#8a9a70", fontWeight: 600 }}>Ingen runder</div>
                        )}
                        {!ADMIN_EMAILS.includes(p.full_name) && (
                          <div style={{ display: "flex", gap: 4 }}>
                            <button onClick={async () => {
                              const action = p.disabled ? "aktivere" : "deaktivere";
                              if (!confirm(`${p.disabled ? "Aktivere" : "Deaktivere"} ${p.full_name}?`)) return;
                              await supabase.from("profiles").update({ disabled: !p.disabled }).eq("id", p.id);
                              loadAllProfiles();
                            }} style={{ padding: "3px 8px", borderRadius: 6, border: "1px solid", borderColor: p.disabled ? "rgba(101,163,13,0.3)" : "rgba(239,168,68,0.3)", background: p.disabled ? "rgba(101,163,13,0.07)" : "rgba(239,168,68,0.07)", color: p.disabled ? "#4a8a10" : "#b45309", fontSize: 10, fontWeight: 600, cursor: "pointer" }}>{p.disabled ? "Aktiver" : "Deaktiver"}</button>
                            {p.disabled && (
                              <button onClick={async () => {
                                const input = prompt(`Skriv "slett" for å permanent slette ${p.full_name} og alle deres runder:`);
                                if (input?.toLowerCase() !== "slett") { if (input !== null) alert("Feil tekst. Sletting avbrutt."); return; }
                                await supabase.from("rounds").delete().eq("user_id", p.id);
                                await supabase.from("notifications").delete().eq("user_id", p.id);
                                await supabase.from("profiles").delete().eq("id", p.id);
                                loadAllProfiles(); loadPlayers(); loadRounds();
                                alert(`${p.full_name} er slettet.`);
                              }} style={{ padding: "3px 8px", borderRadius: 6, border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.07)", color: "#dc2626", fontSize: 10, fontWeight: 600, cursor: "pointer" }}>Slett</button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Test */}
            {adminTab === "test" && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1c2b12", marginBottom: 4 }}>🧪 Test notifikasjoner</div>
                <div style={{ fontSize: 11, color: "#6b7a58", marginBottom: 12 }}>Send testnotifikasjoner til deg selv</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    { label: "🏅 Ny badge", type: "badge_earned", title: "Ny badge: Utforsker! 🗺️", body: "Du har spilt 3 forskjellige baner" },
                    { label: "😢 Mistet badge", type: "badge_lost", title: "Du mistet Banekonge! 👑", body: "Ole Hansen tok over på Skogen" },
                    { label: "🏆 Ny banerekord", type: "course_record", title: "Ny banerekord! 🏆", body: "Kari Nordmann satte ny rekord på Jørstadmoen: -5" },
                    { label: "👥 Venneforespørsel", type: "friend_request", title: "Ny venneforespørsel!", body: "Ole Hansen vil legge deg til som venn", data: { from_user_id: "test" } },
                    { label: "🥏 Runde registrert", type: "round_registered", title: "Runde registrert for deg!", body: "Ole Hansen registrerte -3 for deg på Skogen", data: { course_id: "skogen", date: new Date().toISOString().slice(0, 10) } },
                    { label: "⭐ Ukens spiller", type: "weekly_best", title: "Ukens spiller! ⭐", body: "Du hadde den beste runden denne uken: -7 på Lalm" },
                  ].map(n => (
                    <button key={n.type} onClick={async () => {
                      await supabase.from("notifications").insert({ user_id: user.id, type: n.type, title: n.title, body: n.body, data: n.data || {}, read: false });
                      await loadNotifications();
                      alert("Notifikasjon sendt!");
                    }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#1c2b12", textAlign: "left" }}>
                      <span>{n.label}</span>
                    </button>
                  ))}
                </div>

                <div style={{ marginTop: 20, fontSize: 13, fontWeight: 700, color: "#1c2b12", marginBottom: 8 }}>⚠️ Farlig sone</div>
                <button onClick={async () => {
                  if (!confirm("Slett ALLE notifikasjoner for deg?")) return;
                  await supabase.from("notifications").delete().eq("user_id", user.id);
                  await loadNotifications();
                  alert("Alle notifikasjoner slettet");
                }} style={{ padding: "10px 14px", borderRadius: 12, background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#dc2626", width: "100%" }}>🗑️ Slett alle mine notifikasjoner</button>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedPlayer && (
        <div onClick={() => setSelectedPlayer(null)} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 20, animation: "fadeIn 0.2s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 500, maxHeight: "80vh", background: "linear-gradient(180deg, #ffffff, #f0f9e8)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 20, padding: 24, overflowY: "auto", animation: "slideUp 0.3s ease", boxShadow: "0 -4px 30px rgba(0,0,0,0.12)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 54, height: 54, borderRadius: "50%", overflow: "hidden", background: "linear-gradient(135deg, rgba(101,163,13,0.2), rgba(101,163,13,0.06))", border: "2px solid rgba(101,163,13,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
                {selectedPlayer.avatar?.startsWith("http") ? <img src={selectedPlayer.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (selectedPlayer.name?.[0] ?? "?")}
              </div>
              <div><div style={{ fontSize: 20, fontWeight: 800, color: "#1c2b12" }}>{selectedPlayer.name}</div><div style={{ fontSize: 12, color: "#6b7a58" }}>{selectedPlayer.hometown ? `${selectedPlayer.hometown} · ` : ""}{selectedPlayer.division} divisjon</div></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
              {[{ l: "Runder", v: selectedPlayer.rounds }, { l: "Beste", v: selectedPlayer.best }, { l: "Snitt", v: selectedPlayer.avg > 0 ? `+${selectedPlayer.avg}` : selectedPlayer.avg }, { l: "Poeng", v: selectedPlayer.pts }].map(s => (
                <div key={s.l} style={{ background: "rgba(101,163,13,0.07)", borderRadius: 12, padding: "12px 8px", textAlign: "center", border: "1px solid rgba(101,163,13,0.12)" }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: "#4a8a10" }}>{s.v}</div>
                  <div style={{ fontSize: 9, color: "#6b7a58", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.l}</div>
                </div>
              ))}
            </div>
            {/* Legg til venn button */}
            {user && selectedPlayer.id !== user.id && (() => {
              const isFriend = friends.some(f => f.friend_id === selectedPlayer.id);
              const pendingFromThem = pendingFriendRequests.find(r => r.user_id === selectedPlayer.id);
              if (isFriend) {
                return <div style={{ marginBottom: 16, padding: "8px 14px", borderRadius: 10, background: "rgba(101,163,13,0.07)", border: "1px solid rgba(101,163,13,0.15)", fontSize: 12, color: "#4a8a10", fontWeight: 600, textAlign: "center" }}>✓ Dere er venner</div>;
              }
              if (pendingFromThem) {
                return (
                  <div style={{ marginBottom: 16, padding: "12px 14px", borderRadius: 12, background: "rgba(107,52,163,0.06)", border: "1px solid rgba(107,52,163,0.15)" }}>
                    <div style={{ fontSize: 12, color: "#6b34a3", fontWeight: 700, marginBottom: 8 }}>📩 Vil bli din venn</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={async () => { await acceptFriendRequest(pendingFromThem); }} style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #A3E635, #65A30D)", color: "#0a0f0a", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>✓ Godkjenn</button>
                      <button onClick={async () => { await declineFriendRequest(pendingFromThem); }} style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "1px solid rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.05)", color: "#dc2626", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>✕ Avslå</button>
                    </div>
                  </div>
                );
              }
              return (
                <button onClick={async () => { if (!sentRequests.includes(selectedPlayer.id)) await sendFriendRequest(selectedPlayer.id); }} style={{ width: "100%", padding: "10px 0", borderRadius: 12, border: "1px solid", borderColor: sentRequests.includes(selectedPlayer.id) ? "rgba(107,52,163,0.3)" : "rgba(101,163,13,0.3)", background: sentRequests.includes(selectedPlayer.id) ? "rgba(107,52,163,0.08)" : "rgba(101,163,13,0.08)", color: sentRequests.includes(selectedPlayer.id) ? "#6b34a3" : "#4a8a10", fontWeight: 700, fontSize: 13, cursor: sentRequests.includes(selectedPlayer.id) ? "default" : "pointer", marginBottom: 16, transition: "all 0.2s" }}>{sentRequests.includes(selectedPlayer.id) ? "✓ Forespørsel sendt" : "👥 Legg til som venn"}</button>
              );
            })()}
            <div style={{ marginBottom: 12, fontSize: 13, fontWeight: 700, color: "#1c2b12" }}>Poengutvikling</div>
            <div style={{ background: "rgba(0,0,0,0.03)", borderRadius: 12, padding: 16, border: "1px solid rgba(0,0,0,0.06)" }}>
              <Sparkline data={selectedPlayer.trend} color="#65A30D" />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10, color: "#6b7a58" }}><span>Runde 1</span><span>Runde {selectedPlayer.trend.length}</span></div>
            </div>
            {/* Head-to-head */}
            {user && selectedPlayer.id !== user.id && (() => {
              const myRounds = realRounds.filter(r => r.user_id === user.id);
              const theirRounds = selectedPlayerRounds;
              // Find rounds on same course & date
              const h2h = [];
              myRounds.forEach(mr => {
                const match = theirRounds.find(tr => tr.course_id === mr.course_id && tr.date === mr.date);
                if (match) h2h.push({ course: mr.course_id, date: mr.date, myScore: mr.score, theirScore: match.score });
              });
              if (h2h.length === 0) return null;
              const myWins = h2h.filter(h => h.myScore < h.theirScore).length;
              const theirWins = h2h.filter(h => h.theirScore < h.myScore).length;
              const draws = h2h.length - myWins - theirWins;
              return (
                <div style={{ marginTop: 20, marginBottom: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1c2b12", marginBottom: 10 }}>⚔️ Du vs {selectedPlayer.name?.split(" ")[0]}</div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                    <div style={{ flex: 1, textAlign: "center", background: myWins > theirWins ? "rgba(101,163,13,0.1)" : "rgba(0,0,0,0.03)", borderRadius: 12, padding: "12px 8px", border: "1px solid", borderColor: myWins > theirWins ? "rgba(101,163,13,0.2)" : "rgba(0,0,0,0.06)" }}>
                      <div style={{ fontSize: 24, fontWeight: 900, color: "#4a8a10" }}>{myWins}</div>
                      <div style={{ fontSize: 10, color: "#6b7a58", fontWeight: 600 }}>Du</div>
                    </div>
                    <div style={{ flex: 1, textAlign: "center", background: "rgba(0,0,0,0.03)", borderRadius: 12, padding: "12px 8px", border: "1px solid rgba(0,0,0,0.06)" }}>
                      <div style={{ fontSize: 24, fontWeight: 900, color: "#6b7a58" }}>{draws}</div>
                      <div style={{ fontSize: 10, color: "#6b7a58", fontWeight: 600 }}>Uavgjort</div>
                    </div>
                    <div style={{ flex: 1, textAlign: "center", background: theirWins > myWins ? "rgba(107,52,163,0.08)" : "rgba(0,0,0,0.03)", borderRadius: 12, padding: "12px 8px", border: "1px solid", borderColor: theirWins > myWins ? "rgba(107,52,163,0.15)" : "rgba(0,0,0,0.06)" }}>
                      <div style={{ fontSize: 24, fontWeight: 900, color: "#6b34a3" }}>{theirWins}</div>
                      <div style={{ fontSize: 10, color: "#6b7a58", fontWeight: 600 }}>{selectedPlayer.name?.split(" ")[0]}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: "#6b7a58", textAlign: "center" }}>Basert på {h2h.length} felles runde{h2h.length !== 1 ? "r" : ""}</div>
                </div>
              );
            })()}

            {/* Runder */}
            <div style={{ marginTop: 20, marginBottom: 12, fontSize: 13, fontWeight: 700, color: "#1c2b12" }}>Runder</div>
            {selectedPlayerRounds.length === 0 && (
              <div style={{ fontSize: 12, color: "#8a9a70", textAlign: "center", padding: 16 }}>Ingen runder registrert</div>
            )}
            {selectedPlayerRounds.map(r => {
              const course = COURSES.find(c => c.id === r.course_id);
              const courseName = course?.name || r.course_name || "Ukjent bane";
              const totalScore = r.total_score ?? (r.score + (course?.par ?? 0));
              const scoreStr = r.score === 0 ? "E" : r.score > 0 ? `+${r.score}` : `${r.score}`;
              return (
                <div key={r.id} onClick={() => { setSelectedPlayer(null); setSelectedRound(r); }} style={{ background: "rgba(0,0,0,0.03)", borderRadius: 10, padding: "10px 14px", marginBottom: 6, border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(101,163,13,0.06)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.03)"}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#1c2b12" }}>{courseName}</div>
                      <div style={{ fontSize: 11, color: "#6b7a58", marginTop: 2 }}>
                        {new Date(r.date + "T12:00:00").toLocaleDateString("nb-NO", { day: "2-digit", month: "2-digit", year: "numeric" })}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 18, fontWeight: 900, color: r.score <= 0 ? "#4a8a10" : "#ef4444" }}>{totalScore}</div>
                      <div style={{ fontSize: 10, color: "#6b7a58" }}>({scoreStr})</div>
                    </div>
                  </div>
                  {r.note && <div style={{ fontSize: 11, color: "#5a7040", marginTop: 6, fontStyle: "italic", background: "rgba(101,163,13,0.06)", padding: "3px 8px", borderRadius: 6, display: "inline-block" }}>💬 {r.note}</div>}
                  {r.group_id && (() => {
                    const groupMates = selectedPlayerRounds.filter(gr => gr.group_id === r.group_id && gr.id !== r.id);
                    // Also check realRounds for group mates not in selectedPlayerRounds
                    const allGroupMates = realRounds.filter(gr => gr.group_id === r.group_id && gr.id !== r.id);
                    const mates = allGroupMates.length > groupMates.length ? allGroupMates : groupMates;
                    if (mates.length === 0) return null;
                    return (
                      <div style={{ fontSize: 10, color: "#8a9a70", marginTop: 4 }}>
                        Spilt med: {mates.map((gm, gi) => (
                          <span key={gm.id}>{gi > 0 && ", "}<span onClick={(e) => { e.stopPropagation(); const p = players.find(pl => pl.id === gm.user_id); if (p) { setSelectedPlayer(p); } }} style={{ color: "#4a8a10", fontWeight: 600, cursor: "pointer" }}>{gm.profiles?.full_name?.split(" ")[0] ?? "Ukjent"}</span></span>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              );
            })}
            <button onClick={() => setSelectedPlayer(null)} style={{ width: "100%", padding: 14, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 12, background: "rgba(0,0,0,0.04)", color: "#4a5a38", fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 16 }}>Lukk</button>
          </div>
        </div>
      )}

      {showRegister && (
        <div onClick={() => { setShowRegister(false); setRegSuccess(false); setLocationStatus("idle"); setUserLocation(null); setEditRound(null); setRegError(""); setSelectedFriendPlayers([]); setFriendScores({}); setFriendSearch(""); setShowFriendScores(false); }} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 20, animation: "fadeIn 0.2s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 500, background: "linear-gradient(180deg, #ffffff, #f0f9e8)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 20, padding: 24, animation: "slideUp 0.3s ease", boxShadow: "0 -4px 30px rgba(0,0,0,0.12)" }}>
            {regSuccess ? (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Runde registrert!</div>
                <div style={{ fontSize: 13, color: "#6b7a58" }}>Poengene dine oppdateres snart</div>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4, color: "#1c2b12" }}>{editRound ? "Rediger runde" : "Registrer runde"}</div>
                <div style={{ fontSize: 12, color: "#6b7a58", marginBottom: editRound ? 20 : 12 }}>{editRound ? "Korriger scoren din" : "Legg inn scoren din for å få ligapoeng"}</div>
                {!editRound && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 10, background: "rgba(101,163,13,0.07)", border: "1px solid rgba(101,163,13,0.15)", marginBottom: 16, fontSize: 11, color: "#4a5a38", lineHeight: 1.5 }}>
                    ℹ️ Scorer registreres manuelt — appen er ikke synkronisert med UDisc.
                  </div>
                )}
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
                        return <option key={c.id} value={c.id}>{MAJOR_COURSE_IDS.has(c.id) ? "⭐ " : ""}{c.name} ({c.holes}h, par {c.par}){dist}</option>;
                      })}
                    </select>
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em" }}>Score mot par</label>
                      {regForm.course && <span style={{ fontSize: 11, color: "#6b7a58" }}>Par: {COURSES.find(c => c.id === regForm.course)?.par ?? "?"}</span>}
                    </div>
                    <input type="number" placeholder={regForm.course ? `f.eks. ${(COURSES.find(c => c.id === regForm.course)?.par ?? 54) - 3}` : "Velg bane først"} value={regForm.score} onChange={e => setRegForm({ ...regForm, score: e.target.value })} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", color: "#1c2b12", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                    {regForm.course && regForm.score !== "" && (() => {
                      const par = COURSES.find(c => c.id === regForm.course)?.par;
                      const diff = parseInt(regForm.score) - par;
                      if (!par || isNaN(diff)) return null;
                      const isMajor = MAJOR_COURSE_IDS.has(regForm.course);
                      const pts = scoreToPoints(diff, isMajor);
                      const scoreLabel = diff === 0 ? "E (even par)" : diff > 0 ? `+${diff} over par` : `${diff} under par`;
                      const bgColor = pts >= 8 ? "rgba(101,163,13,0.08)" : pts >= 5 ? "rgba(251,191,36,0.08)" : "rgba(239,68,68,0.06)";
                      const borderColor = pts >= 8 ? "rgba(101,163,13,0.2)" : pts >= 5 ? "rgba(251,191,36,0.25)" : "rgba(239,68,68,0.15)";
                      const ptsColor = pts >= 8 ? "#4a8a10" : pts >= 5 ? "#b07a00" : "#ef4444";
                      return (
                        <div style={{ marginTop: 8, padding: "10px 14px", borderRadius: 12, background: bgColor, border: `1px solid ${borderColor}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ fontSize: 13, color: diff <= 0 ? "#4a8a10" : "#ef4444", fontWeight: 700 }}>{scoreLabel}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            {isMajor && <span style={{ fontSize: 10, color: "#b07a00", fontWeight: 700, background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: 6, padding: "2px 6px" }}>⭐ ×1.5</span>}
                            <span style={{ fontSize: 20, fontWeight: 900, color: ptsColor }}>{pts}</span>
                            <span style={{ fontSize: 11, color: "#6b7a58", fontWeight: 600 }}>pts</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em" }}>Dato</label>
                      <button onClick={() => setRegForm({ ...regForm, date: today })} style={{ fontSize: 11, fontWeight: 700, color: regForm.date === today ? "#4a8a10" : "#6b7a58", background: regForm.date === today ? "rgba(101,163,13,0.12)" : "rgba(0,0,0,0.05)", border: "1px solid", borderColor: regForm.date === today ? "rgba(101,163,13,0.3)" : "rgba(0,0,0,0.1)", borderRadius: 8, padding: "3px 10px", cursor: "pointer" }}>I dag</button>
                    </div>
                    {(() => {
                      const [y, m, d] = (regForm.date || "----").split("-");
                      const setDatePart = (part, val) => {
                        const parts = { y: y || "", m: m || "", d: d || "" };
                        parts[part] = val;
                        if (parts.y && parts.m && parts.d) setRegForm({ ...regForm, date: `${parts.y}-${parts.m}-${parts.d}` });
                        else setRegForm({ ...regForm, date: `${parts.y || "----"}-${parts.m || "--"}-${parts.d || "--"}` });
                      };
                      const months = ["Januar","Februar","Mars","April","Mai","Juni","Juli","August","September","Oktober","November","Desember"];
                      const daysInMonth = (parts_m, parts_y) => new Date(parseInt(parts_y) || 2026, parseInt(parts_m) || 1, 0).getDate();
                      const maxD = daysInMonth(m, y);
                      const selStyle = { padding: "10px 8px", borderRadius: 10, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", color: "#1c2b12", fontSize: 14, outline: "none", appearance: "none", cursor: "pointer" };
                      return (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1.2fr", gap: 8 }}>
                          <select value={d || ""} onChange={e => setDatePart("d", e.target.value)} style={selStyle}>
                            <option value="">Dag</option>
                            {Array.from({ length: maxD }, (_, i) => i + 1).map(v => <option key={v} value={String(v).padStart(2, "0")}>{v}.</option>)}
                          </select>
                          <select value={m || ""} onChange={e => setDatePart("m", e.target.value)} style={selStyle}>
                            <option value="">Måned</option>
                            {months.map((name, i) => <option key={i} value={String(i + 1).padStart(2, "0")}>{name}</option>)}
                          </select>
                          <select value={y || ""} onChange={e => setDatePart("y", e.target.value)} style={selStyle}>
                            <option value="">År</option>
                            {[2026, 2025].map(v => <option key={v} value={String(v)}>{v}</option>)}
                          </select>
                        </div>
                      );
                    })()}
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#5a7040", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>Hullstatistikk <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(valgfritt — brukes til badges)</span></label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                      {[
                        { key: "aces", label: "Aces", color: "#f59e0b" },
                        { key: "eagles", label: "Eagles", color: "#8b5cf6" },
                        { key: "birdies", label: "Birdies", color: "#3b82f6" },
                        { key: "bogeys", label: "Bogeys", color: "#ef4444" },
                      ].map(({ key, label, color }) => (
                        <div key={key} style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
                          <input
                            type="number"
                            min="0"
                            max="30"
                            placeholder="0"
                            value={regForm[key] ?? ""}
                            onChange={e => setRegForm({ ...regForm, [key]: e.target.value === "" ? null : Math.max(0, parseInt(e.target.value) || 0) })}
                            style={{ width: "100%", padding: "8px 6px", borderRadius: 10, background: "rgba(0,0,0,0.04)", border: `1px solid ${regForm[key] != null ? color + "55" : "rgba(0,0,0,0.1)"}`, color: "#1c2b12", fontSize: 16, fontWeight: 700, outline: "none", textAlign: "center", boxSizing: "border-box" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#5a7040", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Notat <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(valgfritt)</span></label>
                    <input type="text" placeholder="f.eks. Vind, vått, ny personlig rekord!" value={regNote} onChange={e => setRegNote(e.target.value)} maxLength={100} style={{ width: "100%", padding: "10px 14px", borderRadius: 12, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", color: "#1c2b12", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                  </div>
                  {!editRound && allProfiles.length > 1 && (
                    <div>
                      <button onClick={() => setShowFriendScores(!showFriendScores)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "10px 14px", borderRadius: 12, background: showFriendScores ? "rgba(101,163,13,0.08)" : "rgba(0,0,0,0.03)", border: showFriendScores ? "1px solid rgba(101,163,13,0.2)" : "1px solid rgba(0,0,0,0.08)", cursor: "pointer", transition: "all 0.2s" }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: showFriendScores ? "#4a8a10" : "#5a7040" }}>👥 Legg til venners score</span>
                        <span style={{ fontSize: 16, color: "#6b7a58", transform: showFriendScores ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▾</span>
                      </button>
                      {showFriendScores && (
                        <div style={{ marginTop: 10, animation: "fadeSlideUp 0.2s ease" }}>
                          {/* Selected friends with score inputs */}
                          {selectedFriendPlayers.length > 0 && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
                              {selectedFriendPlayers.map(pid => {
                                const p = allProfiles.find(pr => pr.id === pid);
                                if (!p) return null;
                                const isFriend = friends.some(f => f.friend_id === pid);
                                return (
                                  <div key={pid} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 10, background: "rgba(101,163,13,0.06)", border: "1px solid rgba(101,163,13,0.15)" }}>
                                    <div style={{ width: 24, height: 24, minWidth: 24, borderRadius: "50%", overflow: "hidden", background: "rgba(101,163,13,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>
                                      {p.avatar_url?.startsWith("http") ? <img src={p.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (p.full_name?.[0] ?? "?")}
                                    </div>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: "#1c2b12", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.full_name?.split(" ")[0]}</span>
                                    {!isFriend && <span style={{ fontSize: 9, color: "#b07a00", background: "rgba(251,191,36,0.15)", padding: "1px 6px", borderRadius: 6, flexShrink: 0 }}>Ny venn</span>}
                                    <input type="number" placeholder="Total" value={friendScores[pid] || ""} onChange={e => setFriendScores(prev => ({ ...prev, [pid]: e.target.value }))} style={{ width: 70, padding: "6px 8px", borderRadius: 8, background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.1)", color: "#1c2b12", fontSize: 13, outline: "none", textAlign: "center", marginLeft: "auto", flexShrink: 0, boxSizing: "border-box" }} />
                                    <span onClick={() => { setSelectedFriendPlayers(prev => prev.filter(id => id !== pid)); setFriendScores(prev => { const n = { ...prev }; delete n[pid]; return n; }); }} style={{ cursor: "pointer", fontSize: 16, color: "#8a9a70", lineHeight: 1, flexShrink: 0 }}>×</span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          {/* Friends list — only show accepted friends not already selected */}
                          {(() => {
                            const availableFriends = friends.filter(f => !selectedFriendPlayers.includes(f.friend_id)).map(f => allProfiles.find(p => p.id === f.friend_id)).filter(Boolean);
                            return availableFriends.length > 0 ? (
                              <div style={{ maxHeight: 140, overflowY: "auto", borderRadius: 12, background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", padding: 4 }}>
                                {availableFriends.map(p => (
                                  <div key={p.id} onClick={() => { setSelectedFriendPlayers(prev => [...prev, p.id]); }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, cursor: "pointer", transition: "background 0.15s" }}
                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(101,163,13,0.08)"}
                                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                                    <div style={{ width: 24, height: 24, minWidth: 24, borderRadius: "50%", overflow: "hidden", background: "rgba(101,163,13,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, border: "1px solid rgba(0,0,0,0.06)", flexShrink: 0 }}>
                                      {p.avatar_url?.startsWith("http") ? <img src={p.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (p.full_name?.[0] ?? "?")}
                                    </div>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: "#1c2b12" }}>{p.full_name}</span>
                                    <span style={{ fontSize: 9, color: "#4a8a10", marginLeft: "auto", fontWeight: 600 }}>Venn ✓</span>
                                  </div>
                                ))}
                              </div>
                            ) : null;
                          })()}
                        </div>
                      )}
                    </div>
                  )}
                  {regError && <div style={{ fontSize: 12, color: "#dc2626", background: "rgba(239,68,68,0.08)", padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(239,68,68,0.2)" }}>{regError}</div>}
                  <button onClick={async (e) => {
                    e.preventDefault();
                    const totalScore = parseInt(regForm.score);
                    const course = COURSES.find(c => c.id === regForm.course);
                    if (!regForm.course || regForm.score === "" || !regForm.date) return;
                    if (!course) { setRegError("Velg en gyldig bane"); return; }
                    const vsPar = totalScore - course.par;
                    if (isNaN(totalScore) || totalScore < 1 || vsPar < -15 || vsPar > 30) {
                      setRegError(`Ugyldig score. For ${course.name} (par ${course.par}) bør total være mellom ${course.par - 15} og ${course.par + 30}`);
                      return;
                    }
                    // Max 2 rounds per course per week
                    if (!editRound) {
                      const d = new Date(regForm.date);
                      const dayOfWeek = d.getDay();
                      const weekStart = new Date(d);
                      weekStart.setDate(d.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
                      const weekEnd = new Date(weekStart);
                      weekEnd.setDate(weekStart.getDate() + 7);
                      const weekStartStr = weekStart.toISOString().slice(0, 10);
                      const weekEndStr = weekEnd.toISOString().slice(0, 10);
                      const roundsThisWeek = realRounds.filter(r =>
                        r.user_id === user.id &&
                        r.course_id === regForm.course &&
                        r.date >= weekStartStr &&
                        r.date < weekEndStr
                      );
                      if (roundsThisWeek.length >= 2) {
                        setRegError(`Du har allerede registrert 2 runder på ${course.name} denne uken. Maks 2 per bane per uke.`);
                        return;
                      }
                    }
                    // Validate friend scores if any
                    for (const pid of selectedFriendPlayers) {
                      const fs = parseInt(friendScores[pid]);
                      if (!fs || isNaN(fs)) { setRegError("Fyll inn score for alle valgte spillere"); return; }
                      const fvsPar = fs - course.par;
                      if (fs < 1 || fvsPar < -15 || fvsPar > 30) {
                        const p = allProfiles.find(pr => pr.id === pid);
                        setRegError(`Ugyldig score for ${p?.full_name || "spiller"}. Bør være mellom ${course.par - 15} og ${course.par + 30}`);
                        return;
                      }
                    }
                    setRegError("");
                    if (user) {
                      setRoundsLoading(true);
                      if (editRound) {
                        await supabase.from("rounds").update({
                          course_id: regForm.course,
                          course_name: course.name,
                          score: vsPar,
                          total_score: totalScore,
                          date: regForm.date,
                          note: regNote || null,
                          aces: regForm.aces,
                          eagles: regForm.eagles,
                          birdies: regForm.birdies,
                          bogeys: regForm.bogeys,
                        }).eq("id", editRound.id);
                      } else {
                        // Generate group_id if registering with friends
                        const groupId = selectedFriendPlayers.length > 0 ? crypto.randomUUID() : null;
                        const { data: newRound } = await supabase.from("rounds").insert({
                          user_id: user.id,
                          course_id: regForm.course,
                          course_name: course.name,
                          score: vsPar,
                          total_score: totalScore,
                          date: regForm.date,
                          note: regNote || null,
                          group_id: groupId,
                          aces: regForm.aces,
                          eagles: regForm.eagles,
                          birdies: regForm.birdies,
                          bogeys: regForm.bogeys,
                        }).select().single();

                        // Register friends' rounds with same group_id
                        if (newRound && selectedFriendPlayers.length > 0) {
                          const userName = user.user_metadata?.full_name || "Noen";
                          const friendRounds = selectedFriendPlayers.map(pid => {
                            const fs = parseInt(friendScores[pid]);
                            return {
                              user_id: pid,
                              course_id: regForm.course,
                              course_name: course.name,
                              score: fs - course.par,
                              total_score: fs,
                              date: regForm.date,
                              group_id: groupId,
                            };
                          });
                          await supabase.from("rounds").insert(friendRounds);

                          // Send notifications to friends
                          const friendIds = friends.map(f => f.friend_id);
                          const notifs = selectedFriendPlayers.map(pid => {
                            const fs = parseInt(friendScores[pid]);
                            const fvsPar = fs - course.par;
                            const scoreStr = fvsPar === 0 ? "E" : fvsPar > 0 ? `+${fvsPar}` : `${fvsPar}`;
                            return {
                              user_id: pid,
                              type: "round_registered",
                              title: "Runde registrert for deg!",
                              body: `${userName} registrerte ${scoreStr} for deg på ${course.name}`,
                              data: { course_id: regForm.course, date: regForm.date, group_id: groupId },
                            };
                          });
                          await supabase.from("notifications").insert(notifs);

                          // Auto-send friend requests to non-friends
                          for (const pid of selectedFriendPlayers) {
                            if (!friendIds.includes(pid)) {
                              await sendFriendRequest(pid);
                            }
                          }
                        }

                        // Check for new course record
                        if (newRound) {
                          const { data: courseRounds } = await supabase.from("rounds").select("user_id, score").eq("course_id", regForm.course);
                          if (courseRounds) {
                            const uniqueUsers = new Set(courseRounds.map(r => r.user_id));
                            if (uniqueUsers.size >= 2) {
                              const bestScore = Math.min(...courseRounds.map(r => r.score));
                              if (vsPar === bestScore) {
                                const otherPlayers = courseRounds.filter(r => r.user_id !== user.id).map(r => r.user_id);
                                const uniqueOthers = [...new Set(otherPlayers)];
                                if (uniqueOthers.length > 0) {
                                  const userName = user.user_metadata?.full_name || "Noen";
                                  const scoreStr = vsPar === 0 ? "E" : vsPar > 0 ? `+${vsPar}` : `${vsPar}`;
                                  await supabase.from("notifications").insert(
                                    uniqueOthers.map(pid => ({
                                      user_id: pid,
                                      type: "course_record",
                                      title: "Ny banerekord! \u{1F3C6}",
                                      body: `${userName} satte ny rekord på ${course.name}: ${scoreStr}`,
                                      read: false,
                                    }))
                                  );
                                }
                              }
                            }
                          }
                        }
                      }
                      await loadRounds();
                      await loadPlayers();
                      setRoundsLoading(false);
                    }
                    setEditRound(null);
                    setSelectedFriendPlayers([]);
                    setFriendScores({});
                    setRegSuccess(true);
                    setTimeout(() => { setRegSuccess(false); setShowRegister(false); setRegForm({ course: "", score: "", date: "", aces: null, eagles: null, birdies: null, bogeys: null }); setEditRound(null); setRegError(""); setRegNote(""); setFriendSearch(""); setShowFriendScores(false); }, 2000);
                  }} style={{ width: "100%", padding: 14, border: "none", borderRadius: 14, background: "linear-gradient(135deg, #A3E635, #65A30D)", color: "#0a0f0a", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 24px rgba(101,163,13,0.25)", marginTop: 4 }}>{editRound ? "Lagre endring ✓" : "Registrer 🥏"}</button>
                  <button onClick={() => { setShowRegister(false); setEditRound(null); setRegError(""); }} style={{ width: "100%", padding: 12, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 12, background: "rgba(0,0,0,0.04)", color: "#6b7a58", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Avbryt</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showAuth && (
  <div onClick={() => { setShowAuth(false); setSignupEmailSent(false); }} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 20, animation: "fadeIn 0.2s ease" }}>
    <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 500, background: "linear-gradient(180deg, #ffffff, #f0f9e8)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 20, padding: 24, animation: "slideUp 0.3s ease", boxShadow: "0 -4px 30px rgba(0,0,0,0.12)" }}>
      {signupEmailSent ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📬</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#1c2b12", marginBottom: 8 }}>Sjekk e-posten din!</div>
          <div style={{ fontSize: 13, color: "#4a5a38", lineHeight: 1.7, marginBottom: 20 }}>Vi har sendt en bekreftelseslenke til <strong>{authForm.email}</strong>. Klikk lenken for å aktivere kontoen din.</div>
          <button onClick={() => { setShowAuth(false); setSignupEmailSent(false); setAuthForm({ email: "", password: "", name: "" }); }} style={{ width: "100%", padding: 13, border: "none", borderRadius: 12, background: "linear-gradient(135deg, #A3E635, #65A30D)", color: "#0a0f0a", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>Lukk</button>
        </div>
      ) : (
        <>
      <div style={{ fontSize: 20, fontWeight: 800, color: "#1c2b12", marginBottom: 4 }}>{authMode === "login" ? "Logg inn" : "Opprett konto"}</div>
      <div style={{ fontSize: 12, color: "#6b7a58", marginBottom: 20 }}>{authMode === "login" ? "Velkommen tilbake!" : "Bli med i ligaen 🥏"}</div>

      {/* Google */}
      <button onClick={signInWithGoogle} style={{ width: "100%", padding: "12px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.15)", background: "#fff", color: "#1c2b12", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
        <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.08 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-3.59-13.46-8.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
        Fortsett med Google
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.1)" }} />
        <span style={{ fontSize: 11, color: "#8a9a70", fontWeight: 600 }}>eller med e-post</span>
        <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.1)" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {authMode === "signup" && (
          <input placeholder="Fullt navn" value={authForm.name} onChange={e => setAuthForm({ ...authForm, name: e.target.value })} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", color: "#1c2b12", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
        )}
        <input type="email" placeholder="E-post" value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", color: "#1c2b12", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
        <input type="password" placeholder="Passord" value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })} onKeyDown={e => e.key === "Enter" && (authMode === "login" ? signInWithEmail() : signUpWithEmail())} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", color: "#1c2b12", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
        {authError && <div style={{ fontSize: 12, color: "#dc2626", background: "rgba(239,68,68,0.08)", padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(239,68,68,0.2)" }}>{authError}</div>}
        <button onClick={authMode === "login" ? signInWithEmail : signUpWithEmail} disabled={authLoading} style={{ width: "100%", padding: 13, border: "none", borderRadius: 12, background: "linear-gradient(135deg, #A3E635, #65A30D)", color: "#0a0f0a", fontWeight: 800, fontSize: 14, cursor: "pointer", opacity: authLoading ? 0.7 : 1 }}>
          {authLoading ? "Vennligst vent..." : authMode === "login" ? "Logg inn" : "Opprett konto"}
        </button>
        <button onClick={() => { setAuthMode(authMode === "login" ? "signup" : "login"); setAuthError(""); }} style={{ background: "none", border: "none", color: "#4a8a10", fontWeight: 600, fontSize: 13, cursor: "pointer", padding: 4 }}>
          {authMode === "login" ? "Ny bruker? Registrer deg →" : "← Har du konto? Logg inn"}
        </button>
      </div>
        </>
      )}
    </div>
  </div>
)}

      {showProfile && user && (
        <div onClick={() => setShowProfile(false)} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 20, animation: "fadeIn 0.2s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 500, maxHeight: "85vh", background: "linear-gradient(180deg, #ffffff, #f0f9e8)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 20, animation: "slideUp 0.3s ease", boxShadow: "0 -4px 30px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 0" }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ position: "relative", cursor: "pointer", flexShrink: 0 }} onClick={() => setShowAvatarMenu(!showAvatarMenu)}>
                {user.user_metadata?.avatar_url
                  ? <img src={user.user_metadata.avatar_url} alt="" style={{ width: 60, height: 60, borderRadius: "50%", border: "3px solid rgba(101,163,13,0.4)", boxShadow: "0 4px 16px rgba(101,163,13,0.2)", objectFit: "cover" }} />
                  : <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg, #A3E635, #65A30D)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "#0a0f0a", fontWeight: 800 }}>{user.user_metadata?.full_name?.[0] ?? "?"}</div>
                }
                <div style={{ position: "absolute", bottom: -2, right: -2, width: 22, height: 22, borderRadius: "50%", background: "#fff", border: "2px solid rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>📷</div>
                <input id="avatar-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  // Compress and resize to 500px
                  const compressed = await new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => {
                      const canvas = document.createElement("canvas");
                      const maxSize = 500;
                      let w = img.width, h = img.height;
                      if (w > h) { h = Math.round(h * maxSize / w); w = maxSize; }
                      else { w = Math.round(w * maxSize / h); h = maxSize; }
                      canvas.width = w; canvas.height = h;
                      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
                      canvas.toBlob(resolve, "image/webp", 0.8);
                    };
                    img.src = URL.createObjectURL(file);
                  });
                  const path = `avatars/${user.id}.webp`;
                  const { error: upErr } = await supabase.storage.from("avatars").upload(path, compressed, { upsert: true, contentType: "image/webp" });
                  if (upErr) { alert("Feil ved opplasting: " + upErr.message); return; }
                  const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
                  const avatarUrl = urlData.publicUrl + "?t=" + Date.now();
                  await supabase.auth.updateUser({ data: { avatar_url: avatarUrl } });
                  await supabase.from("profiles").update({ avatar_url: avatarUrl }).eq("id", user.id);
                  setUser({ ...user, user_metadata: { ...user.user_metadata, avatar_url: avatarUrl } });
                  loadPlayers(); loadAllProfiles();
                  setShowAvatarMenu(false);
                }} />
                {showAvatarMenu && (
                  <div onClick={e => e.stopPropagation()} style={{ position: "absolute", top: 66, left: 0, zIndex: 20, background: "#fff", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.15)", minWidth: 200, overflow: "hidden", animation: "fadeSlideUp 0.2s ease" }}>
                    <div onClick={() => { document.getElementById("avatar-upload").click(); }} style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "#1c2b12", cursor: "pointer", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(101,163,13,0.08)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      📷 Last opp nytt bilde
                    </div>
                    {user.user_metadata?.avatar_url && (
                      <div onClick={async () => {
                        await supabase.auth.updateUser({ data: { avatar_url: null } });
                        await supabase.from("profiles").update({ avatar_url: null }).eq("id", user.id);
                        setUser({ ...user, user_metadata: { ...user.user_metadata, avatar_url: null } });
                        loadPlayers(); loadAllProfiles();
                        setShowAvatarMenu(false);
                      }} style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "#dc2626", cursor: "pointer", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.06)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        🗑️ Fjern bilde
                      </div>
                    )}
                    {(user.app_metadata?.provider === "google" || (user.user_metadata?.avatar_url && user.user_metadata?.avatar_url?.includes("googleusercontent"))) && (() => {
                      const googleAvatarUrl = user.identities?.find(i => i.provider === "google")?.identity_data?.avatar_url || user.user_metadata?.picture;
                      if (!googleAvatarUrl || user.user_metadata?.avatar_url === googleAvatarUrl) return null;
                      return (
                        <div onClick={async () => {
                          await supabase.auth.updateUser({ data: { avatar_url: googleAvatarUrl } });
                          await supabase.from("profiles").update({ avatar_url: googleAvatarUrl }).eq("id", user.id);
                          setUser({ ...user, user_metadata: { ...user.user_metadata, avatar_url: googleAvatarUrl } });
                          loadPlayers(); loadAllProfiles();
                          setShowAvatarMenu(false);
                        }} style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "#1c2b12", cursor: "pointer" }}
                          onMouseEnter={e => e.currentTarget.style.background = "rgba(101,163,13,0.08)"}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                          🔗 Bruk Google-bilde
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#1c2b12" }}>{user.user_metadata?.full_name ?? "Ukjent"}</div>
                <div style={{ fontSize: 12, color: "#6b7a58", marginTop: 2 }}>{user.email}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
                  <div style={{ fontSize: 11, color: "#4a8a10", fontWeight: 700, background: "rgba(101,163,13,0.1)", padding: "2px 10px", borderRadius: 10, border: "1px solid rgba(101,163,13,0.2)" }}>🏅 {userDivision} divisjon</div>
                </div>
              </div>
            </div>

            {/* Divisjonsvalg */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Divisjon</div>
              <div style={{ display: "flex", gap: 8 }}>
                {["Åpen", "Rekreasjons"].map(d => (
                  <button key={d} onClick={async () => {
                    setUserDivision(d);
                    await supabase.from("profiles").update({ division: d }).eq("id", user.id);
                    loadPlayers();
                  }} style={{ flex: 1, padding: "10px 0", borderRadius: 12, border: "1px solid", borderColor: userDivision === d ? "rgba(101,163,13,0.4)" : "rgba(0,0,0,0.1)", background: userDivision === d ? "rgba(101,163,13,0.12)" : "rgba(0,0,0,0.03)", color: userDivision === d ? "#4a8a10" : "#6b7a58", fontWeight: userDivision === d ? 700 : 500, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}>{d}</button>
                ))}
              </div>
            </div>

            {/* Hjemsted / Klubb */}
            <div style={{ marginBottom: 20, position: "relative" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Hjemsted / Klubb</div>
              <input type="text" placeholder="f.eks. Lillehammer, Sel DGK, Ringebu..." value={userHometown} onChange={e => { setUserHometown(e.target.value); setShowHometownSuggestions(true); }} onFocus={() => setShowHometownSuggestions(true)} onBlur={async () => {
                setTimeout(() => setShowHometownSuggestions(false), 200);
                await supabase.from("profiles").update({ hometown: userHometown || null }).eq("id", user.id);
                loadPlayers();
                loadAllProfiles();
              }} onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  e.target.blur();
                }
              }} style={{ width: "100%", padding: "10px 14px", borderRadius: 12, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", color: "#1c2b12", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              {showHometownSuggestions && (() => {
                const q = userHometown.toLowerCase().trim();
                const uniqueHometowns = [...new Set(allProfiles.map(p => p.hometown).filter(h => h && h.trim()))];
                const filtered = q ? uniqueHometowns.filter(h => h.toLowerCase().startsWith(q) && h.toLowerCase() !== q) : uniqueHometowns;
                if (filtered.length === 0) return null;
                return (
                  <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 10, background: "#fff", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 12, marginTop: 4, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", maxHeight: 150, overflowY: "auto" }}>
                    {filtered.map(h => (
                      <div key={h} onMouseDown={async (e) => { e.preventDefault(); setUserHometown(h); setShowHometownSuggestions(false); await supabase.from("profiles").update({ hometown: h }).eq("id", user.id); loadPlayers(); loadAllProfiles(); }} style={{ padding: "10px 14px", fontSize: 13, color: "#1c2b12", cursor: "pointer", borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(101,163,13,0.08)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        {h}
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Sesong-stats — real data */}
            {(() => {
              const myRounds = realRounds.filter(r => r.user_id === user.id);
              const myScores = myRounds.map(r => r.score);
              const myPlayer = players.find(p => p.id === user.id);
              const bestScore = myScores.length ? Math.min(...myScores) : null;
              const coursesPlayed = myPlayer?.coursesPlayed ?? 0;
              const totalCourses = LEAGUE_COURSE_IDS.length;
              return (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Min sesong · {getSeasonLabel()}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                    {[
                      { label: "Runder", value: myRounds.length || "—", icon: "🥏" },
                      { label: "Beste score", value: bestScore !== null ? (bestScore > 0 ? `+${bestScore}` : bestScore) : "—", icon: "🎯" },
                      { label: "Ligapoeng", value: myPlayer?.pts ?? "—", icon: "🏆" },
                    ].map(s => (
                      <div key={s.label} style={{ background: "rgba(101,163,13,0.07)", border: "1px solid rgba(101,163,13,0.12)", borderRadius: 12, padding: "12px 8px", textAlign: "center" }}>
                        <div style={{ fontSize: 16, marginBottom: 4 }}>{s.icon}</div>
                        <div style={{ fontSize: 20, fontWeight: 900, color: "#4a8a10" }}>{s.value}</div>
                        <div style={{ fontSize: 9, color: "#6b7a58", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  {/* Banegrid — hvilke av de 12 ligabanene er spilt */}
                  <div style={{ marginTop: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#5a7040" }}>Ligabaner</div>
                      <div style={{ fontSize: 11, color: "#6b7a58" }}>{coursesPlayed}/{totalCourses} spilt</div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5 }}>
                      {LEAGUE_COURSE_IDS.map(cid => {
                        const course = COURSES.find(c => c.id === cid);
                        const count = myRounds.filter(r => r.course_id === cid).length;
                        const isMajor = MAJOR_COURSE_IDS.has(cid);
                        const shortName = course?.name.split(" ")[0] ?? cid;
                        return (
                          <div key={cid} style={{ padding: "6px 8px", borderRadius: 8, background: count > 0 ? "rgba(101,163,13,0.1)" : "rgba(0,0,0,0.04)", border: `1px solid ${count > 0 ? "rgba(101,163,13,0.25)" : "rgba(0,0,0,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: count > 0 ? "#1c2b12" : "#8a9a70", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{isMajor ? "⭐ " : ""}{shortName}</div>
                            <div style={{ fontSize: 12, fontWeight: 800, color: count > 0 ? "#4a8a10" : "#c0c8b0", flexShrink: 0 }}>{count > 0 ? (count > 1 ? `×${count}` : "✓") : "—"}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
              {myRounds.length === 0 && <div style={{ marginTop: 10, fontSize: 11, color: "#8a9a70", textAlign: "center", fontStyle: "italic" }}>Registrer din første runde for å se statistikk 🚀</div>}
                </div>
              );
            })()}

            {/* Venner */}
            {friends.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Venner ({friends.length})</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {friends.map(f => {
                    const friendProfile = allProfiles.find(p => p.id === f.friend_id);
                    const friendPlayer = players.find(p => p.id === f.friend_id);
                    if (!friendProfile) return null;
                    return (
                      <div key={f.id} onClick={() => { if (friendPlayer) { setShowProfile(false); setSelectedPlayer(friendPlayer); } }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 10, background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)", cursor: friendPlayer ? "pointer" : "default", transition: "background 0.15s" }}
                        onMouseEnter={e => { if (friendPlayer) e.currentTarget.style.background = "rgba(101,163,13,0.06)"; }}
                        onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.03)"}>
                        <div style={{ width: 28, height: 28, minWidth: 28, borderRadius: "50%", overflow: "hidden", background: "rgba(101,163,13,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, border: "1px solid rgba(0,0,0,0.06)", flexShrink: 0 }}>
                          {friendProfile.avatar_url?.startsWith("http") ? <img src={friendProfile.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (friendProfile.full_name?.[0] ?? "?")}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#1c2b12", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{friendProfile.full_name}</div>
                          {friendPlayer && <div style={{ fontSize: 10, color: "#6b7a58" }}>{friendPlayer.rounds} runder · {friendPlayer.pts} pts</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mine runder */}
            {(() => {
              const myRounds = realRounds.filter(r => r.user_id === user.id).sort((a, b) => b.date.localeCompare(a.date));
              const displayRounds = myRounds.slice(0, 10);
              if (myRounds.length === 0) return null;
              return (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Mine runder</div>
                  {displayRounds.map(r => {
                    const course = COURSES.find(c => c.id === r.course_id);
                    const courseName = course?.name || r.course_name || "Ukjent bane";
                    const totalScore = r.total_score ?? (r.score + (course?.par ?? 0));
                    const scoreStr = r.score === 0 ? "E" : r.score > 0 ? `+${r.score}` : `${r.score}`;
                    return (
                      <div key={r.id} onClick={() => { setShowProfile(false); setSelectedRound(r); }} style={{ background: "rgba(0,0,0,0.03)", borderRadius: 10, padding: "10px 14px", marginBottom: 6, border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer", transition: "background 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(101,163,13,0.06)"}
                        onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.03)"}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#1c2b12" }}>{courseName}</div>
                            <div style={{ fontSize: 11, color: "#6b7a58", marginTop: 2 }}>
                              {new Date(r.date + "T12:00:00").toLocaleDateString("nb-NO", { day: "2-digit", month: "2-digit", year: "numeric" })}
                            </div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 18, fontWeight: 900, color: r.score <= 0 ? "#4a8a10" : "#ef4444" }}>{totalScore}</div>
                            <div style={{ fontSize: 10, color: "#6b7a58" }}>({scoreStr})</div>
                          </div>
                        </div>
                        {r.note && <div style={{ fontSize: 11, color: "#5a7040", marginTop: 6, fontStyle: "italic", background: "rgba(101,163,13,0.06)", padding: "3px 8px", borderRadius: 6, display: "inline-block" }}>💬 {r.note}</div>}
                      </div>
                    );
                  })}
                  {myRounds.length > 10 && (
                    <button onClick={() => { setShowProfile(false); setTab("runder"); setShowMyRounds(true); }} style={{ width: "100%", padding: 10, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 10, background: "rgba(0,0,0,0.03)", color: "#4a8a10", fontWeight: 700, fontSize: 12, cursor: "pointer", marginTop: 4 }}>Vis alle ({myRounds.length} runder)</button>
                  )}
                </div>
              );
            })()}

            </div>{/* end scrollable area */}

            {/* Sticky buttons */}
            <div style={{ padding: "12px 24px 24px", borderTop: "1px solid rgba(0,0,0,0.06)", background: "linear-gradient(180deg, #f8fdf2, #f0f9e8)", flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                <button onClick={() => { setShowProfile(false); }} style={{ flex: 1, padding: 13, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 12, background: "rgba(0,0,0,0.04)", color: "#4a5a38", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Lukk</button>
                <button onClick={() => { if (confirm("Er du sikker på at du vil logge ut?")) { signOut(); setShowProfile(false); } }} style={{ flex: 1, padding: 13, border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, background: "rgba(239,68,68,0.05)", color: "#dc2626", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Logg ut</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedRound && (
        <div onClick={() => setSelectedRound(null)} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 20, animation: "fadeIn 0.2s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 500, background: "linear-gradient(180deg, #ffffff, #f0f9e8)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 20, padding: 24, animation: "slideUp 0.3s ease", boxShadow: "0 -4px 30px rgba(0,0,0,0.12)" }}>
            {(() => {
              const r = selectedRound;
              const course = COURSES.find(c => c.id === r.course_id);
              const courseName = course?.name || r.course_name || "Ukjent bane";
              const totalScore = r.total_score ?? (r.score + (course?.par ?? 0));
              const scoreStr = r.score === 0 ? "E" : r.score > 0 ? `+${r.score}` : `${r.score}`;
              const isOwn = user && r.user_id === user.id;
              return (
                <>
                  {/* Player */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <div onClick={() => { const p = players.find(p => p.id === r.user_id); if (p) { setSelectedRound(null); setSelectedPlayer(p); } }} style={{ width: 42, height: 42, minWidth: 42, borderRadius: "50%", overflow: "hidden", background: "rgba(101,163,13,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, border: "2px solid rgba(101,163,13,0.2)", flexShrink: 0, cursor: "pointer" }}>
                      {r.profiles?.avatar_url?.startsWith("http") ? <img src={r.profiles.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (r.profiles?.full_name?.[0] ?? "?")}
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: "#1c2b12" }}>{r.profiles?.full_name ?? "Ukjent spiller"}</div>
                      <div style={{ fontSize: 11, color: "#6b7a58" }}>{new Date(r.date + "T12:00:00").toLocaleDateString("nb-NO", { day: "2-digit", month: "long", year: "numeric" })}</div>
                    </div>
                  </div>

                  {/* Score */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(101,163,13,0.07)", border: "1px solid rgba(101,163,13,0.12)", borderRadius: 14, padding: "16px 20px", marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#1c2b12", marginBottom: 4 }}>{courseName}</div>
                      {course && (
                        <div style={{ display: "flex", gap: 10 }}>
                          <a href={course.udisc} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 11, color: "#4a8a10", fontWeight: 600, textDecoration: "none" }}>🔗 UDisc</a>
                          <a href={course.googleMaps} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 11, color: "#1a73e8", fontWeight: 600, textDecoration: "none" }}>📍 Maps</a>
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 28, fontWeight: 900, color: r.score <= 0 ? "#4a8a10" : "#ef4444", lineHeight: 1 }}>{totalScore}</div>
                      <div style={{ fontSize: 12, color: "#6b7a58", marginTop: 2 }}>({scoreStr})</div>
                    </div>
                  </div>

                  {/* Note */}
                  {r.note && (
                    <div style={{ marginBottom: 16, padding: "10px 14px", borderRadius: 10, background: "rgba(101,163,13,0.06)", border: "1px solid rgba(101,163,13,0.1)" }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Notat</div>
                      <div style={{ fontSize: 13, color: "#4a5a38", fontStyle: "italic" }}>💬 {r.note}</div>
                    </div>
                  )}

                  {/* Spilt med (group_id) */}
                  {r.group_id && (() => {
                    const groupMates = realRounds.filter(gr => gr.group_id === r.group_id && gr.id !== r.id);
                    if (groupMates.length === 0) return null;
                    return (
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Spilt med</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          {groupMates.map(gm => {
                            const gmCourse = COURSES.find(c => c.id === gm.course_id);
                            const gmTotal = gm.total_score ?? (gm.score + (gmCourse?.par ?? 0));
                            const gmScoreStr = gm.score === 0 ? "E" : gm.score > 0 ? `+${gm.score}` : `${gm.score}`;
                            return (
                              <div key={gm.id} onClick={(e) => { e.stopPropagation(); const p = players.find(pl => pl.id === gm.user_id); if (p) { setSelectedRound(null); setSelectedPlayer(p); } }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 10, background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer" }}>
                                <div style={{ width: 28, height: 28, minWidth: 28, borderRadius: "50%", overflow: "hidden", background: "rgba(101,163,13,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, border: "1px solid rgba(0,0,0,0.06)", flexShrink: 0 }}>
                                  {gm.profiles?.avatar_url?.startsWith("http") ? <img src={gm.profiles.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (gm.profiles?.full_name?.[0] ?? "?")}
                                </div>
                                <span style={{ fontSize: 13, fontWeight: 600, color: "#1c2b12", flex: 1 }}>{gm.profiles?.full_name ?? "Ukjent"}</span>
                                <span style={{ fontSize: 14, fontWeight: 800, color: gm.score <= 0 ? "#4a8a10" : "#ef4444" }}>{gmTotal} <span style={{ fontSize: 11, fontWeight: 600, color: "#6b7a58" }}>({gmScoreStr})</span></span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Own round actions */}
                  {isOwn && (
                    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                      <button onClick={() => {
                        setSelectedRound(null);
                        setEditRound(r);
                        const coursePar = course?.par ?? 0;
                        setRegForm({ course: r.course_id, score: r.total_score ? String(r.total_score) : String(r.score + coursePar), date: r.date, aces: r.aces ?? null, eagles: r.eagles ?? null, birdies: r.birdies ?? null, bogeys: r.bogeys ?? null });
                        setRegNote(r.note || "");
                        setShowRegister(true);
                      }} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "1px solid rgba(0,0,0,0.1)", background: "rgba(0,0,0,0.03)", color: "#4a5a38", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>✏️ Rediger</button>
                      <button onClick={async () => {
                        if (!confirm("Sikker på at du vil slette denne runden?")) return;
                        await supabase.from("rounds").delete().eq("id", r.id);
                        setSelectedRound(null);
                        await loadRounds();
                        await loadPlayers();
                      }} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.05)", color: "#dc2626", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>🗑️ Slett</button>
                    </div>
                  )}

                  <button onClick={() => setSelectedRound(null)} style={{ width: "100%", padding: 13, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 12, background: "rgba(0,0,0,0.04)", color: "#4a5a38", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Lukk</button>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {showNotifications && user && (
        <div onClick={() => setShowNotifications(false)} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 20, animation: "fadeIn 0.2s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 500, maxHeight: "80vh", background: "linear-gradient(180deg, #ffffff, #f0f9e8)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 20, padding: 24, overflowY: "auto", animation: "slideUp 0.3s ease", boxShadow: "0 -4px 30px rgba(0,0,0,0.12)" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#1c2b12", marginBottom: 4 }}>🔔 Varsler</div>
            <div style={{ fontSize: 12, color: "#6b7a58", marginBottom: 16 }}>Invitasjoner og oppdateringer</div>

            {/* Pending friend requests */}
            {pendingFriendRequests.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#4a8a10", marginBottom: 8 }}>Venneforespørsler</div>
                {pendingFriendRequests.map(req => (
                  <div key={req.id} style={{ background: "rgba(101,163,13,0.07)", border: "1px solid rgba(101,163,13,0.2)", borderRadius: 12, padding: "12px 14px", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 32, height: 32, minWidth: 32, borderRadius: "50%", overflow: "hidden", background: "rgba(101,163,13,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, border: "1px solid rgba(0,0,0,0.08)", flexShrink: 0 }}>
                        {req.profiles?.avatar_url?.startsWith("http") ? <img src={req.profiles.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (req.profiles?.full_name?.[0] ?? "?")}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{req.profiles?.full_name ?? "Noen"}</div>
                        <div style={{ fontSize: 11, color: "#6b7a58" }}>vil legge deg til som venn</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => acceptFriendRequest(req)} style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #A3E635, #65A30D)", color: "#0a0f0a", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>✓ Godta</button>
                      <button onClick={() => declineFriendRequest(req)} style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.05)", color: "#dc2626", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>✕ Avslå</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* General notifications */}
            {notifications.length === 0 && pendingFriendRequests.length === 0 && (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🔕</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#6b7a58" }}>Ingen varsler ennå</div>
              </div>
            )}
            {notifications.map(n => (
              <div key={n.id} onClick={() => {
                if (n.type === "badge_earned" || n.type === "badge_lost") { setTab("badges"); setShowNotifications(false); }
                else if (n.type === "course_record") { setTab("baner"); setShowNotifications(false); }
                else if (n.type === "weekly_best") { setTab("tabell"); setShowNotifications(false); }
                else if (n.type === "friend_request" || n.type === "friend_accepted") {
                  const senderId = n.data?.from_user_id || n.data?.from_id;
                  if (senderId) {
                    const senderProfile = allProfiles.find(p => p.id === senderId);
                    const senderPlayer = players.find(p => p.id === senderId);
                    if (senderPlayer) setSelectedPlayer(senderPlayer);
                    else if (senderProfile) setSelectedPlayer({ id: senderProfile.id, name: senderProfile.full_name, avatar: senderProfile.avatar_url, rounds: 0, best: null, avg: null, pts: 0, division: "Rekreasjons", trend: [], hometown: senderProfile.hometown });
                  }
                  setShowNotifications(false);
                }
                else if (n.type === "round_registered") {
                  setTab("runder"); setShowNotifications(false);
                }
              }} style={{ background: !n.read ? "rgba(107,52,163,0.08)" : "rgba(0,0,0,0.02)", border: !n.read ? "1px solid rgba(107,52,163,0.2)" : "1px solid rgba(0,0,0,0.06)", borderRadius: 12, padding: "12px 14px", marginBottom: 6, cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = !n.read ? "rgba(107,52,163,0.12)" : "rgba(101,163,13,0.06)"}
                onMouseLeave={e => e.currentTarget.style.background = !n.read ? "rgba(107,52,163,0.08)" : "rgba(0,0,0,0.02)"}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ fontSize: 13, fontWeight: !n.read ? 700 : 500, color: !n.read ? "#6b34a3" : "#1c2b12" }}>{n.title}</div>
                  {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#6b34a3", flexShrink: 0, marginTop: 4, marginLeft: 8 }} />}
                </div>
                {n.body && <div style={{ fontSize: 12, color: "#4a5a38", marginTop: 4, lineHeight: 1.5 }}>{n.body}</div>}
                <div style={{ fontSize: 10, color: "#8a9a70", marginTop: 6 }}>{new Date(n.created_at).toLocaleDateString("nb-NO", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</div>
              </div>
            ))}

            <button onClick={() => setShowNotifications(false)} style={{ width: "100%", padding: 13, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 12, background: "rgba(0,0,0,0.04)", color: "#4a5a38", fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 8 }}>Lukk</button>
          </div>
        </div>
      )}

      {/* Floating onboarding bar for logged-out users */}
      {!user && !onboardingDismissed && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 90, padding: "0 12px 12px", animation: "slideUp 0.4s ease 1s both" }}>
          <div style={{ maxWidth: 500, margin: "0 auto", background: "linear-gradient(135deg, #1c3a0a, #2a4a16)", borderRadius: 16, padding: "14px 16px", boxShadow: "0 -4px 30px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>🥏</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#e8e8e0", marginBottom: 2 }}>Bli med i ligaen!</div>
              <div style={{ fontSize: 11, color: "#a0b090", lineHeight: 1.4 }}>Opprett konto for å registrere runder og klatre på tabellen</div>
            </div>
            <button onClick={() => { setShowAuth(true); setAuthMode("signup"); }} style={{ padding: "8px 16px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #A3E635, #65A30D)", color: "#0a0f0a", fontWeight: 800, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>Registrer deg</button>
            <button onClick={() => { setOnboardingDismissed(true); localStorage.setItem("onboardingDismissed", "true"); }} style={{ background: "none", border: "none", color: "#6b7a58", fontSize: 18, cursor: "pointer", padding: "0 4px", flexShrink: 0, lineHeight: 1 }}>×</button>
          </div>
        </div>
      )}

      {/* PWA install tooltip */}
      {showInstallTip && !window.matchMedia("(display-mode: standalone)").matches && (
        <div style={{ position: "fixed", bottom: !user && !onboardingDismissed ? 80 : 16, right: 16, zIndex: 85, animation: "slideUp 0.3s ease", maxWidth: 280 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: "12px 14px", boxShadow: "0 4px 24px rgba(0,0,0,0.15)", border: "1px solid rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ fontSize: 22, flexShrink: 0 }}>📲</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1c2b12", marginBottom: 4 }}>Installer som app!</div>
                <div style={{ fontSize: 11, color: "#4a5a38", lineHeight: 1.5 }}>
                  {deferredPrompt ? "Trykk \"Installer\" for rask tilgang fra hjemskjermen." : /iPhone|iPad/.test(navigator.userAgent) ? "Trykk Del-ikon → «Legg til på Hjem-skjerm»" : "Trykk ⋮ i nettleseren → «Installer app» eller «Legg til på startskjermen»"}
                </div>
              </div>
              <button onClick={() => setShowInstallTip(false)} style={{ background: "none", border: "none", color: "#8a9a70", fontSize: 16, cursor: "pointer", padding: 0, lineHeight: 1 }}>×</button>
            </div>
            {deferredPrompt && (
              <button onClick={async () => { deferredPrompt.prompt(); const { outcome } = await deferredPrompt.userChoice; if (outcome === "accepted") setDeferredPrompt(null); setShowInstallTip(false); }} style={{ width: "100%", padding: "8px 0", marginTop: 10, borderRadius: 10, border: "none", background: "linear-gradient(135deg, #A3E635, #65A30D)", color: "#0a0f0a", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Installer</button>
            )}
          </div>
        </div>
      )}

      {/* Personvernerklæring */}
      {showPrivacy && (
        <div onClick={() => setShowPrivacy(false)} style={{ position: "fixed", inset: 0, zIndex: 210, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 20, animation: "fadeIn 0.2s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 500, maxHeight: "80vh", background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 20, padding: 24, overflowY: "auto", animation: "slideUp 0.3s ease", boxShadow: "0 -4px 30px rgba(0,0,0,0.12)" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#1c2b12", marginBottom: 16 }}>🔒 Personvernerklæring</div>
            {[
              { title: "Hvem er vi?", text: "Gudbrandsdalen Discgolf Liga er en uavhengig ligaapp for lokale discgolfspillere i Gudbrandsdalen. Appen driftes på frivillig basis." },
              { title: "Hvilke data samler vi?", text: "Ved registrering lagrer vi: navn, e-postadresse og eventuelt profilbilde (fra Google). Ved bruk lagrer vi: runder du registrerer (bane, score, dato) og divisjonsvalg." },
              { title: "Hvorfor samler vi data?", text: "For å kunne vise ligatabell, statistikk og poengberegning. Dataene brukes kun til å drifte ligaen." },
              { title: "Informasjonskapsler", text: "Vi bruker kun nødvendige informasjonskapsler for innlogging (Supabase auth-token) og brukerpreferanser (f.eks. cookie-samtykke). Vi bruker ingen sporings- eller analysecookies." },
              { title: "Deling med tredjeparter", text: "Vi deler ikke dine data med noen tredjeparter. Autentisering håndteres av Supabase (EU-basert) og Google (ved Google-innlogging)." },
              { title: "Dine rettigheter", text: "Du kan når som helst: se dine data i profilen, slette dine runder, eller be om sletting av hele kontoen ved å kontakte oss." },
              { title: "Lagring", text: "Data lagres i Supabase (PostgreSQL) på servere i EU. Data slettes ved forespørsel." },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1c2b12", marginBottom: 2 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: "#4a5a38", lineHeight: 1.6 }}>{s.text}</div>
              </div>
            ))}
            <div style={{ fontSize: 10, color: "#8a9a70", marginBottom: 16 }}>Sist oppdatert: 25. mars 2026</div>
            <button onClick={() => setShowPrivacy(false)} style={{ width: "100%", padding: 13, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 12, background: "rgba(0,0,0,0.04)", color: "#4a5a38", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Lukk</button>
          </div>
        </div>
      )}

      {/* GDPR Cookie Banner */}
      {!cookieConsent && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200, animation: "slideUp 0.4s ease 0.5s both" }}>
          <div style={{ maxWidth: 500, margin: "0 auto 12px", borderRadius: 16, background: "linear-gradient(135deg, #1c3a0a, #2a4a16)", border: "1px solid rgba(163,230,53,0.15)", padding: "16px 18px", boxShadow: "0 -4px 30px rgba(0,0,0,0.3)", marginLeft: 12, marginRight: 12 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>🍪</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#e8e8e0", marginBottom: 4 }}>Vi bruker informasjonskapsler</div>
                <div style={{ fontSize: 12, color: "#a0b090", lineHeight: 1.6 }}>
                  Vi bruker informasjonskapsler for innlogging og for å huske innstillingene dine.
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { setCookieConsent("accepted"); localStorage.setItem("cookieConsent", "accepted"); }} style={{ flex: 1, padding: "10px 0", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #A3E635, #65A30D)", color: "#0a0f0a", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Godta</button>
              <button onClick={() => { setCookieConsent("necessary"); localStorage.setItem("cookieConsent", "necessary"); }} style={{ flex: 1, padding: "10px 0", borderRadius: 12, border: "1px solid rgba(163,230,53,0.2)", background: "rgba(255,255,255,0.08)", color: "#e8e8e0", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Kun nødvendige</button>
            </div>
            <div style={{ fontSize: 10, color: "#8a9a70", marginTop: 8, textAlign: "center", lineHeight: 1.5 }}>
              Les mer i vår <button onClick={() => setShowPrivacy(true)} style={{ background: "none", border: "none", color: "#A3E635", fontWeight: 700, cursor: "pointer", fontSize: 10, textDecoration: "underline", padding: 0 }}>personvernerklæring</button>
            </div>
          </div>
        </div>
      )}

      {showThemePicker && (
        <div onClick={() => setShowThemePicker(false)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 20, animation: "fadeIn 0.2s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: theme.isDark ? "rgba(20,22,30,0.98)" : "rgba(255,255,255,0.98)", color: theme.text, borderRadius: 24, padding: 20, width: "100%", maxWidth: 460, maxHeight: "85vh", overflowY: "auto", animation: "slideUp 0.3s ease", border: `1px solid ${theme.accent}33`, boxShadow: `0 -8px 40px rgba(0,0,0,0.2)` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <div style={{ fontSize: 18, fontWeight: 800 }}>🎨 Velg fargetema</div>
              <button onClick={() => setShowThemePicker(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: theme.textMuted, lineHeight: 1 }}>×</button>
            </div>
            <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 16 }}>Live forhåndsvisning. Endringen lagres lokalt på din enhet.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {Object.entries(THEMES).map(([id, t]) => {
                const active = id === themeId;
                return (
                  <button key={id} onClick={() => setThemeId(id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: 14, border: `2px solid ${active ? t.accent : "rgba(0,0,0,0.08)"}`, background: active ? `${t.accent}15` : (theme.isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)"), cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
                    <div style={{ width: 56, height: 56, minWidth: 56, borderRadius: 12, background: t.bg, border: "1px solid rgba(0,0,0,0.1)", position: "relative", overflow: "hidden", flexShrink: 0 }}>
                      <div style={{ position: "absolute", bottom: 6, left: 6, width: 14, height: 14, borderRadius: "50%", background: `linear-gradient(135deg, ${t.accentLight}, ${t.accent})` }} />
                      <div style={{ position: "absolute", top: 6, right: 6, width: 10, height: 10, borderRadius: "50%", background: t.mountain, opacity: 0.6 }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: theme.text, display: "flex", alignItems: "center", gap: 6 }}>
                        <span>{t.emoji}</span><span>{t.name}</span>
                        {active && <span style={{ fontSize: 10, fontWeight: 700, color: t.accent, background: `${t.accent}20`, padding: "2px 8px", borderRadius: 10, marginLeft: "auto" }}>VALGT</span>}
                      </div>
                      <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                        {[t.accent, t.accentLight, t.accentDark, t.mountain].map((c, i) => (
                          <div key={i} style={{ width: 18, height: 18, borderRadius: 4, background: c, border: "1px solid rgba(0,0,0,0.1)" }} />
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: 16, padding: 12, borderRadius: 10, background: `${theme.accent}10`, border: `1px solid ${theme.accent}25`, fontSize: 11, color: theme.textMuted, lineHeight: 1.5 }}>
              💡 Noen elementer kan fortsatt vises i den gamle grønne paletten — de blir oppdatert når dere har bestemt dere for et tema.
            </div>
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
