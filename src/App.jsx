import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { BADGE_ICONS } from "./components/BadgeIcons";
import { TAB_ICONS, STAT_ICONS, LogoIcon, BellIcon } from "./components/TabIcons";

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
  { id: "vingarparken", name: "Vingarparken Diskgolfbane", location: "Lillehammer", holes: 9, par: 27, rating: 1.2, ratings: 25, difficulty: "Middels", length: "0.54 km", time: "~60 min", udisc: "https://udisc.com/courses/vingarparken-diskgolfbane-KDW7", desc: "Familievennlig bane i folkelig rekreasjonspark. Kortbane med gressteier, renovert i 2025.", free: true, lat: 61.107, lng: 10.427 },
  { id: "strandpromenaden", name: "Strandpromenaden", location: "Lillehammer", holes: 6, par: 19, rating: 1.2, ratings: 107, difficulty: "Lett", length: "1.1 km", time: "~45 min", udisc: "https://udisc.com/courses/strandpromenaden-ZpDy", desc: "Sjarmerende strandbane langs Mjøsa, etablert 2012. OBS: Per 2026 mangler noen kurver og det er ingen teepads eller skilt.", free: true, lat: 61.114, lng: 10.449 },
  { id: "smestad", name: "Smestad Frisbeegolfpark", location: "Lillehammer", holes: 6, par: 18, rating: 3.1, ratings: 187, difficulty: "Lett", length: "0.6 km", time: "~20 min", udisc: "https://udisc.com/courses/smestad-frisbeegolfpark-68VN", desc: "Småkupert men ellers ganske lett bane, perfekt for nybegynnere. Etablert 2016.", free: true, lat: 61.135, lng: 10.446 },
  { id: "mosetertoppen", name: "Mosetertoppen Diskgolfpark", location: "Øyer", holes: 18, par: 58, rating: 3.7, ratings: 159, difficulty: "Krevende", length: "3.8 km", time: "~2 timer", udisc: "https://udisc.com/courses/oti-frisbee-mosetertoppen-diskgolf-park-D5nt", desc: "Utfordrende fjellbane på toppen av Mosetertoppen/Hafjell. Bratt og variert terreng med flotte utsikter. Etablert 2024.", free: true, lat: 61.254, lng: 10.515 },
  { id: "fossen-kvitfjell", name: "Fossen Diskgolf Kvitfjell", location: "Fåvang", holes: 9, par: 29, rating: 4.5, ratings: 5, difficulty: "Middels", length: "0.7 km", time: "~54 min", udisc: "https://udisc.com/courses/fossen-diskgolf-kvitfjell-sorh", desc: "Ny bane (2025) ved Kvitfjell med vakker utsikt og varierte kast. Kupert terreng med Prodigy T2-kurver.", free: true, lat: 61.450, lng: 10.110 },
];


const STABLEFORD_INFO = [
  { place: "1.", pts: 14 }, { place: "2.", pts: 12 }, { place: "3.", pts: 10 },
  { place: "4.", pts: 8 }, { place: "5.", pts: 6 }, { place: "6.", pts: 5 },
  { place: "7.", pts: 4 }, { place: "8.", pts: 3 }, { place: "9-10.", pts: 2 },
];

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
  { id: "lagspiller", name: "Lagspiller", desc: "Tagg 5 medspillere", check: () => false },
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
  const [realRounds, setRealRounds] = useState([]);
  const [roundsLoading, setRoundsLoading] = useState(false);
  const [editRound, setEditRound] = useState(null); // null or round object being edited
  const [players, setPlayers] = useState([]);
  const [regError, setRegError] = useState("");
  const [signupEmailSent, setSignupEmailSent] = useState(false);
  const [courseSort, setCourseSort] = useState("avstand"); // avstand | populær | stjerner
  const [roundFilter, setRoundFilter] = useState("alle"); // "alle" or course_id
  const [regNote, setRegNote] = useState("");
  const [allProfiles, setAllProfiles] = useState([]);
  const [selectedCoPlayers, setSelectedCoPlayers] = useState([]); // array of profile ids
  const [recentCoPlayers, setRecentCoPlayers] = useState(() => {
    try { return JSON.parse(localStorage.getItem("recentCoPlayers") || "[]"); } catch { return []; }
  });
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [coPlayerSearch, setCoPlayerSearch] = useState("");
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
  const [showMyRounds, setShowMyRounds] = useState(false);
  const [selectedRound, setSelectedRound] = useState(null);

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
      loadPendingInvites();
      // Check badge changes after data is loaded
      const { data: allRoundsForBadges } = await supabase.from("rounds").select("*");
      if (loadedPlayers && allRoundsForBadges) checkBadgeChanges(loadedPlayers, allRoundsForBadges);
    };
    ensureProfile();
  }, [user]);

  const signInWithGoogle = () => supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: "https://gudbrandsdalen-discgolf-liga.vercel.app" }
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
      .limit(20);
    if (data) setRealRounds(data);
  };

  const loadPlayers = async () => {
    const { data: profiles } = await supabase.from("profiles").select("*");
    const { data: rounds } = await supabase.from("rounds").select("*");
    if (!profiles) return;

    // Group rounds into events by course+date
    const STABLEFORD = [14, 12, 10, 8, 6, 5, 4, 3, 2, 2];
    const roundPts = {};
    const events = {};
    (rounds || []).forEach(r => {
      const key = `${r.course_id}_${r.date}`;
      if (!events[key]) events[key] = [];
      events[key].push(r);
    });

    // Assign pts per round with tie-sharing
    Object.values(events).forEach(ev => {
      const sorted = [...ev].sort((a, b) => a.score - b.score);
      let i = 0;
      while (i < sorted.length) {
        let j = i;
        while (j < sorted.length - 1 && sorted[j].score === sorted[j + 1].score) j++;
        const slice = STABLEFORD.slice(i, j + 1);
        const avg = Math.round(slice.reduce((a, b) => a + b, 0) / slice.length);
        for (let k = i; k <= j; k++) roundPts[sorted[k].id] = avg;
        i = j + 1;
      }
    });

    const result = profiles.map(p => {
      const pr = (rounds || []).filter(r => r.user_id === p.id);
      const withPts = pr.map(r => ({ ...r, sp: roundPts[r.id] ?? 0 }));
      const best8 = [...withPts].sort((a, b) => b.sp - a.sp).slice(0, 8);
      const totalPts = best8.reduce((sum, r) => sum + r.sp, 0);
      const scores = pr.map(r => r.score).sort((a, b) => a - b);
      return {
        id: p.id,
        name: p.full_name || "Ukjent",
        avatar: p.avatar_url,
        rounds: pr.length,
        best: scores.length ? scores[0] : null,
        avg: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10) / 10 : null,
        pts: totalPts,
        division: p.division || "Rekreasjons",
        hometown: p.hometown || "",
        trend: withPts.slice(-10).map(r => r.sp),
      };
    }).filter(p => p.rounds > 0).sort((a, b) => b.pts - a.pts);

    setPlayers(result);
    return result;
  };

  const loadAllProfiles = async () => {
    const { data } = await supabase.from("profiles").select("id, full_name, avatar_url, hometown");
    if (data) setAllProfiles(data);
  };

  const loadNotifications = async () => {
    if (!user) return;
    const { data } = await supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20);
    if (data) setNotifications(data);
  };

  const loadPendingInvites = async () => {
    if (!user) return;
    const { data } = await supabase.from("round_invites").select("*, rounds(course_id, course_name, date, score), profiles!round_invites_inviter_id_fkey(full_name)").eq("invitee_id", user.id).eq("status", "pending");
    if (data) setPendingInvites(data);
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

  const isAdmin = user?.email === import.meta.env.VITE_ADMIN_EMAIL;

  const today = new Date().toISOString().split("T")[0];

  const sortedCourses = userLocation
    ? [...COURSES].sort((a, b) => getDistance(userLocation.lat, userLocation.lng, a.lat, a.lng) - getDistance(userLocation.lat, userLocation.lng, b.lat, b.lng))
    : COURSES;

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
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #A3E635, #65A30D)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(163,230,53,0.3)" }}><LogoIcon size={22} color="#0a0f0a" /></div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#5a9e0f", fontWeight: 700 }}>Gudbrandsdalen</div>
                <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>Discgolf Liga</div>
                <div style={{ fontSize: 10, color: "#6b7a58", fontWeight: 600, marginTop: 2 }}>Sesong: Vår 2026</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {user ? (
                <>
                <button onClick={() => { setShowNotifications(true); loadNotifications(); loadPendingInvites(); }} style={{ position: "relative", background: "rgba(101,163,13,0.1)", border: "1px solid rgba(101,163,13,0.25)", borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <BellIcon size={18} color="#4a7a10" />
                  {(notifications.filter(n => !n.read).length + pendingInvites.length) > 0 && (
                    <div style={{ position: "absolute", top: -2, right: -2, width: 16, height: 16, borderRadius: "50%", background: "#ef4444", color: "#fff", fontSize: 9, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{notifications.filter(n => !n.read).length + pendingInvites.length}</div>
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
            {[{ label: "Spillere", value: players.length, iconKey: "players", tab: "tabell" }, { label: "Runder spilt", value: realRounds.length, iconKey: "rounds", tab: "runder" }, { label: "Baner", value: COURSES.length, iconKey: "courses", tab: "baner" }].map(s => (
              <div key={s.label} onClick={() => setTab(s.tab)} style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "12px 10px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>{STAT_ICONS[s.iconKey]({ size: 30, color: "#3a4a2a" })}</div>
                <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1 }}><AnimNum value={s.value} /></div>
                <div style={{ fontSize: 10, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <button onClick={() => setShowRegister(true)} style={{ width: "100%", padding: "14px", border: "none", borderRadius: 14, background: "linear-gradient(135deg, #A3E635 0%, #65A30D 100%)", color: "#0a0f0a", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 24px rgba(163,230,53,0.25), inset 0 1px 0 rgba(255,255,255,0.2)", transition: "transform 0.15s", marginBottom: 16 }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >+ Registrer runde</button>

          {(() => {
            const allTabs = [{ id: "tabell", label: "Ligatabell" }, { id: "runder", label: "Runder" }, { id: "baner", label: "Baner" }, { id: "regler", label: "Poeng" }, { id: "badges", label: "Badges" }, { id: "intro", label: "Ny her?" }, ...(isAdmin ? [{ id: "admin", label: "Admin" }] : [])];
            const mid = Math.ceil(allTabs.length / 2);
            const row1 = allTabs.slice(0, mid);
            const row2 = allTabs.slice(mid);
            const tabBtnStyle = (t, rowLen) => ({ flex: `1 1 ${100/rowLen}%`, minWidth: 0, padding: "8px 4px 6px", border: "none", borderRadius: 10, background: tab === t.id ? "#ffffff" : "transparent", color: tab === t.id ? "#4a8a10" : "#6b7a58", fontWeight: tab === t.id ? 700 : 500, fontSize: 11, cursor: "pointer", transition: "all 0.2s", boxShadow: tab === t.id ? "0 1px 4px rgba(0,0,0,0.1)" : "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 });
            return (
              <div style={{ background: "rgba(0,0,0,0.06)", borderRadius: 12, padding: 4, display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {row1.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={tabBtnStyle(t, row1.length)}>
                      {TAB_ICONS[t.id] ? TAB_ICONS[t.id]({ size: 22, color: tab === t.id ? "#4a8a10" : "#6b7a58" }) : null}{t.label}
                    </button>
                  ))}
                </div>
                {row2.length > 0 && (
                  <div style={{ display: "flex", gap: 4 }}>
                    {row2.map(t => (
                      <button key={t.id} onClick={() => setTab(t.id)} style={tabBtnStyle(t, row2.length)}>
                        {TAB_ICONS[t.id] ? TAB_ICONS[t.id]({ size: 22, color: tab === t.id ? "#4a8a10" : "#6b7a58" }) : null}{t.label}
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
                <div style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.12), rgba(251,191,36,0.04))", border: "1px solid rgba(251,191,36,0.3)", borderRadius: 14, padding: "12px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10, animation: "fadeSlideUp 0.4s ease" }}>
                  <div style={{ fontSize: 24, flexShrink: 0 }}>⭐</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#b07a00", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Ukens spiller</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#1c2b12" }}>{playerName} <span style={{ fontWeight: 600, color: "#6b7a58" }}>— {scoreStr} på {courseName.split(" ")[0]}</span></div>
                  </div>
                </div>
              );
            })()}
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              {["Alle", "Åpen", "Rekreasjons"].map(d => (
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
            {filtered.length >= 3 && division !== "Rekreasjons" && (
              <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "flex-end", justifyContent: "center" }}>
                {[filtered[1], filtered[0], filtered[2]].filter(Boolean).map((p, i) => {
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
                        <div style={{ fontSize: 9, color: "#6b7a58", textTransform: "uppercase", letterSpacing: "0.1em" }}>poeng</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {filtered.length > 0 && (
            <div style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "22px 1fr 50px 44px 70px", padding: "10px 14px", fontSize: 10, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, borderBottom: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.5)" }}>
                <div>#</div><div>Spiller</div><div style={{ textAlign: "right" }}>Snitt</div><div style={{ textAlign: "right" }}>Pts</div><div style={{ textAlign: "right" }}>Trend</div>
              </div>
              {filtered.map((p, i) => (
                <div key={p.id} onClick={() => setSelectedPlayer(p)} style={{ display: "grid", gridTemplateColumns: "22px 1fr 50px 44px 70px", padding: "12px 14px", alignItems: "center", cursor: "pointer", borderBottom: "1px solid rgba(0,0,0,0.04)", background: i === 0 ? "rgba(101,163,13,0.06)" : "transparent", transition: "background 0.2s" }}
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
          </div>
        )}

        {tab === "runder" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>Siste runder</div>
              {realRounds.length > 0 && <div style={{ fontSize: 11, color: "#4a8a10", fontWeight: 600 }}>● Live</div>}
            </div>
            {user && (
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <button onClick={() => setShowMyRounds(false)} style={{ flex: 1, padding: "10px 16px", border: "1px solid", borderColor: !showMyRounds ? "#65A30D" : "rgba(0,0,0,0.1)", borderRadius: 14, background: !showMyRounds ? "rgba(101,163,13,0.15)" : "rgba(255,255,255,0.6)", color: !showMyRounds ? "#4a8a10" : "#6b7a58", fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>Alle runder</button>
                <button onClick={() => setShowMyRounds(true)} style={{ flex: 1, padding: "10px 16px", border: "1px solid", borderColor: showMyRounds ? "#65A30D" : "rgba(0,0,0,0.1)", borderRadius: 14, background: showMyRounds ? "rgba(101,163,13,0.15)" : "rgba(255,255,255,0.6)", color: showMyRounds ? "#4a8a10" : "#6b7a58", fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>Mine runder</button>
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
            {realRounds.filter(r => (roundFilter === "alle" || r.course_id === roundFilter) && (!showMyRounds || r.user_id === user?.id)).map((r, i) => (
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
              <div style={{ fontSize: 11, color: "#6b7a58" }}>Data fra <span style={{ color: "#4a8a10", fontWeight: 700 }}>UDisc</span></div>
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
                    <a href={c.udisc} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, background: "rgba(101,163,13,0.12)", border: "1px solid rgba(101,163,13,0.25)", color: "#4a8a10", fontWeight: 700, fontSize: 12, textDecoration: "none" }}>
                      🔗 Se på UDisc
                    </a>
                  </div>
                )}
              </div>
              );
            })}
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
                  { num: "3", title: "Få ligapoeng", text: "Du får poeng basert på hvor godt du gjør det sammenlignet med andre. 1. plass = 14 poeng, 2. plass = 12 poeng, osv." },
                  { num: "4", title: "Sesongen", text: "Ligaen har 12 runder totalt. Kun dine 8 beste runder teller — så du kan ta det med ro noen uker!" },
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
            <div style={{ fontSize: 12, color: "#6b7a58", marginBottom: 16 }}>Kun synlig for deg</div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
              {[{ label: "Brukere", value: players.length + (realRounds.length === 0 ? 0 : 0), icon: "👥" }, { label: "Runder totalt", value: realRounds.length, icon: "🥏" }, { label: "Baner brukt", value: [...new Set(realRounds.map(r => r.course_id))].length, icon: "🗺️" }].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "12px 8px", textAlign: "center" }}>
                  <div style={{ fontSize: 16, marginBottom: 2 }}>{s.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 800 }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* All rounds */}
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1c2b12", marginBottom: 8 }}>Alle registrerte runder</div>
            {realRounds.length === 0 && <div style={{ fontSize: 13, color: "#6b7a58", textAlign: "center", padding: 20 }}>Ingen runder ennå</div>}
            {realRounds.map((r, i) => (
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

            {/* All users */}
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1c2b12", marginBottom: 8, marginTop: 20 }}>Alle brukere</div>
            {players.length === 0 && <div style={{ fontSize: 13, color: "#6b7a58", textAlign: "center", padding: 20 }}>Ingen registrerte spillere ennå</div>}
            {players.map((p, i) => (
              <div key={p.id} style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "12px 14px", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
                <div onClick={() => setSelectedPlayer(p)} style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", background: "rgba(101,163,13,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, border: "1px solid rgba(0,0,0,0.08)", flexShrink: 0, cursor: "pointer" }}>
                  {p.avatar?.startsWith("http") ? <img src={p.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (p.name?.[0] ?? "?")}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "#6b7a58" }}>{p.division} · {p.rounds} runder · {p.pts} pts</div>
                </div>
              </div>
            ))}

            {/* Test notifikasjoner */}
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1c2b12", marginBottom: 8, marginTop: 20 }}>{"\u{1F9EA}"} Test notifikasjoner</div>
            <div style={{ fontSize: 11, color: "#6b7a58", marginBottom: 12 }}>Send testnotifikasjoner til deg selv</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { label: "\u{1F3C5} Ny badge", type: "badge_earned", title: "Ny badge: Utforsker! \u{1F5FA}\u{FE0F}", body: "Du har spilt 3 forskjellige baner" },
                { label: "\u{1F622} Mistet badge", type: "badge_lost", title: "Du mistet Banekonge! \u{1F451}", body: "Ole Hansen tok over på Skogen" },
                { label: "\u{1F3C6} Ny banerekord", type: "course_record", title: "Ny banerekord! \u{1F3C6}", body: "Kari Nordmann satte ny rekord på Jørstadmoen: -5" },
                { label: "\u{1F94F} Medspiller-tagg", type: "round_invite", title: "Du ble tagget! \u{1F3F7}\u{FE0F}", body: "Ole Hansen spilte en runde på Skogen og tagget deg" },
                { label: "\u2B50 Ukens spiller", type: "weekly_best", title: "Ukens spiller! \u2B50", body: "Du hadde den beste runden denne uken: -7 på Lalm" },
              ].map(n => (
                <button key={n.type} onClick={async () => {
                  await supabase.from("notifications").insert({ user_id: user.id, type: n.type, title: n.title, body: n.body, read: false });
                  await loadNotifications();
                  alert("Notifikasjon sendt!");
                }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, background: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#1c2b12", textAlign: "left" }}>
                  <span>{n.label}</span>
                </button>
              ))}
            </div>
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
            <div style={{ marginBottom: 12, fontSize: 13, fontWeight: 700, color: "#1c2b12" }}>Poengutvikling</div>
            <div style={{ background: "rgba(0,0,0,0.03)", borderRadius: 12, padding: 16, border: "1px solid rgba(0,0,0,0.06)" }}>
              <Sparkline data={selectedPlayer.trend} color="#65A30D" />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10, color: "#6b7a58" }}><span>Runde 1</span><span>Runde {selectedPlayer.trend.length}</span></div>
            </div>
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
                  {r.co_players && r.co_players.length > 0 && (
                    <div style={{ fontSize: 10, color: "#8a9a70", marginTop: 4 }}>Medspillere: {r.co_players.join(", ")}</div>
                  )}
                </div>
              );
            })}
            <button onClick={() => setSelectedPlayer(null)} style={{ width: "100%", padding: 14, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 12, background: "rgba(0,0,0,0.04)", color: "#4a5a38", fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 16 }}>Lukk</button>
          </div>
        </div>
      )}

      {showRegister && (
        <div onClick={() => { setShowRegister(false); setRegSuccess(false); setLocationStatus("idle"); setUserLocation(null); setEditRound(null); setRegError(""); }} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 20, animation: "fadeIn 0.2s ease" }}>
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
                <div style={{ fontSize: 12, color: "#6b7a58", marginBottom: 20 }}>{editRound ? "Korriger scoren din" : "Legg inn scoren din for å få ligapoeng"}</div>
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
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em" }}>Total score (kast)</label>
                      {regForm.course && <span style={{ fontSize: 11, color: "#6b7a58" }}>Par: {COURSES.find(c => c.id === regForm.course)?.par ?? "?"}</span>}
                    </div>
                    <input type="number" placeholder={regForm.course ? `f.eks. ${(COURSES.find(c => c.id === regForm.course)?.par ?? 54) - 3}` : "Velg bane først"} value={regForm.score} onChange={e => setRegForm({ ...regForm, score: e.target.value })} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", color: "#1c2b12", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                    {regForm.course && regForm.score !== "" && (() => {
                      const par = COURSES.find(c => c.id === regForm.course)?.par;
                      const diff = parseInt(regForm.score) - par;
                      return par ? <div style={{ fontSize: 12, color: diff <= 0 ? "#4a8a10" : "#ef4444", marginTop: 4, fontWeight: 600 }}>{diff === 0 ? "Even par (E)" : diff > 0 ? `+${diff} over par` : `${diff} under par`}</div> : null;
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
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#5a7040", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Notat <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(valgfritt)</span></label>
                    <input type="text" placeholder="f.eks. Vind, vått, ny personlig rekord!" value={regNote} onChange={e => setRegNote(e.target.value)} maxLength={100} style={{ width: "100%", padding: "10px 14px", borderRadius: 12, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", color: "#1c2b12", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                  </div>
                  {!editRound && allProfiles.length > 1 && (
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#5a7040", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Medspillere <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(valgfritt)</span></label>
                      {selectedCoPlayers.length > 0 && (
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                          {selectedCoPlayers.map(pid => {
                            const p = allProfiles.find(pr => pr.id === pid);
                            return p ? (
                              <div key={pid} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px 4px 4px", borderRadius: 20, background: "rgba(101,163,13,0.1)", border: "1px solid rgba(101,163,13,0.25)", fontSize: 12, fontWeight: 600, color: "#4a8a10" }}>
                                <div style={{ width: 20, height: 20, minWidth: 20, borderRadius: "50%", overflow: "hidden", background: "rgba(101,163,13,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>
                                  {p.avatar_url?.startsWith("http") ? <img src={p.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (p.full_name?.[0] ?? "?")}
                                </div>
                                {p.full_name?.split(" ")[0]}
                                <span onClick={() => setSelectedCoPlayers(prev => prev.filter(id => id !== pid))} style={{ cursor: "pointer", marginLeft: 2, fontSize: 14, lineHeight: 1 }}>×</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}
                      <input type="text" placeholder="Søk etter spiller..." value={coPlayerSearch} onChange={e => setCoPlayerSearch(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: 10, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)", color: "#1c2b12", fontSize: 13, outline: "none", boxSizing: "border-box", marginBottom: 6 }} />
                      <div style={{ maxHeight: 140, overflowY: "auto", borderRadius: 12, background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", padding: 4 }}>
                        {(() => {
                          const q = coPlayerSearch.toLowerCase().trim();
                          const others = allProfiles.filter(p => p.id !== user?.id && !selectedCoPlayers.includes(p.id));
                          const filtered = q ? others.filter(p => p.full_name?.toLowerCase().includes(q)) : others;
                          const recent = filtered.filter(p => recentCoPlayers.includes(p.id));
                          const rest = filtered.filter(p => !recentCoPlayers.includes(p.id));
                          const sorted = [...recent.sort((a, b) => recentCoPlayers.indexOf(a.id) - recentCoPlayers.indexOf(b.id)), ...rest];
                          return sorted.length === 0 ? (
                            <div style={{ padding: 12, fontSize: 12, color: "#8a9a70", textAlign: "center" }}>{q ? "Ingen treff" : "Ingen andre spillere registrert ennå"}</div>
                          ) : sorted.map(p => (
                            <div key={p.id} onClick={() => { setSelectedCoPlayers(prev => [...prev, p.id]); setCoPlayerSearch(""); }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, cursor: "pointer", transition: "background 0.15s" }}
                              onMouseEnter={e => e.currentTarget.style.background = "rgba(101,163,13,0.08)"}
                              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                              <div style={{ width: 24, height: 24, minWidth: 24, borderRadius: "50%", overflow: "hidden", background: "rgba(101,163,13,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, border: "1px solid rgba(0,0,0,0.06)", flexShrink: 0 }}>
                                {p.avatar_url?.startsWith("http") ? <img src={p.avatar_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (p.full_name?.[0] ?? "?")}
                              </div>
                              <span style={{ fontSize: 13, fontWeight: 600, color: "#1c2b12" }}>{p.full_name}</span>
                              {!q && recentCoPlayers.includes(p.id) && <span style={{ fontSize: 9, color: "#8a9a70", marginLeft: "auto" }}>Nylig</span>}
                            </div>
                          ));
                        })()}
                      </div>
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
                        }).eq("id", editRound.id);
                      } else {
                        const { data: newRound } = await supabase.from("rounds").insert({
                          user_id: user.id,
                          course_id: regForm.course,
                          course_name: course.name,
                          score: vsPar,
                          total_score: totalScore,
                          date: regForm.date,
                          note: regNote || null,
                        }).select().single();

                        // Send invites to co-players
                        if (newRound && selectedCoPlayers.length > 0) {
                          const inviterName = user.user_metadata?.full_name || "Noen";
                          await supabase.from("round_invites").insert(
                            selectedCoPlayers.map(pid => ({ round_id: newRound.id, inviter_id: user.id, invitee_id: pid }))
                          );
                          await supabase.from("notifications").insert(
                            selectedCoPlayers.map(pid => ({
                              user_id: pid,
                              type: "round_invite",
                              title: "Ny runde-invitasjon!",
                              body: `${inviterName} spilte ${course.name} og tagget deg som medspiller. Registrer din score!`,
                              data: { round_id: newRound.id, course_id: regForm.course, date: regForm.date },
                            }))
                          );
                          // Save recent co-players
                          const updated = [...new Set([...selectedCoPlayers, ...recentCoPlayers])].slice(0, 10);
                          setRecentCoPlayers(updated);
                          localStorage.setItem("recentCoPlayers", JSON.stringify(updated));
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
                    setSelectedCoPlayers([]);
                    setRegSuccess(true);
                    setTimeout(() => { setRegSuccess(false); setShowRegister(false); setRegForm({ course: "", score: "", date: "" }); setEditRound(null); setRegError(""); setRegNote(""); setCoPlayerSearch(""); }, 2000);
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
              <div style={{ position: "relative", cursor: "pointer", flexShrink: 0 }} onClick={() => document.getElementById("avatar-upload").click()}>
                {user.user_metadata?.avatar_url
                  ? <img src={user.user_metadata.avatar_url} alt="" style={{ width: 60, height: 60, borderRadius: "50%", border: "3px solid rgba(101,163,13,0.4)", boxShadow: "0 4px 16px rgba(101,163,13,0.2)", objectFit: "cover" }} />
                  : <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg, #A3E635, #65A30D)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "#0a0f0a", fontWeight: 800 }}>{user.user_metadata?.full_name?.[0] ?? "?"}</div>
                }
                <div style={{ position: "absolute", bottom: -2, right: -2, width: 22, height: 22, borderRadius: "50%", background: "#fff", border: "2px solid rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>📷</div>
                <input id="avatar-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const ext = file.name.split(".").pop();
                  const path = `avatars/${user.id}.${ext}`;
                  const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
                  if (upErr) { alert("Feil ved opplasting: " + upErr.message); return; }
                  const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
                  const avatarUrl = urlData.publicUrl + "?t=" + Date.now();
                  await supabase.auth.updateUser({ data: { avatar_url: avatarUrl } });
                  await supabase.from("profiles").update({ avatar_url: avatarUrl }).eq("id", user.id);
                  setUser({ ...user, user_metadata: { ...user.user_metadata, avatar_url: avatarUrl } });
                  loadPlayers(); loadAllProfiles();
                }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#1c2b12" }}>{user.user_metadata?.full_name ?? "Ukjent"}</div>
                <div style={{ fontSize: 12, color: "#6b7a58", marginTop: 2 }}>{user.email}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
                  <div style={{ fontSize: 11, color: "#4a8a10", fontWeight: 700, background: "rgba(101,163,13,0.1)", padding: "2px 10px", borderRadius: 10, border: "1px solid rgba(101,163,13,0.2)" }}>🏅 {userDivision} divisjon</div>
                  {user.user_metadata?.avatar_url && (
                    <button onClick={async () => {
                      if (!confirm("Fjerne profilbildet?")) return;
                      await supabase.auth.updateUser({ data: { avatar_url: null } });
                      await supabase.from("profiles").update({ avatar_url: null }).eq("id", user.id);
                      setUser({ ...user, user_metadata: { ...user.user_metadata, avatar_url: null } });
                      loadPlayers(); loadAllProfiles();
                    }} style={{ fontSize: 10, color: "#dc2626", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", padding: 0 }}>Fjern bilde</button>
                  )}
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
              return (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Min sesong · Vår 2026</div>
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
                  {/* Sesongframgang */}
                  <div style={{ marginTop: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#5a7040" }}>Sesongframgang</div>
                      <div style={{ fontSize: 11, color: "#6b7a58" }}>{Math.min(myRounds.length, 8)}/8 tellende runder</div>
                    </div>
                    <div style={{ height: 8, borderRadius: 4, background: "rgba(0,0,0,0.06)", overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #A3E635, #65A30D)", width: `${Math.min(myRounds.length / 8, 1) * 100}%`, transition: "width 0.5s ease" }} />
                    </div>
                    <div style={{ fontSize: 10, color: "#8a9a70", marginTop: 4 }}>
                      {myRounds.length === 0 ? "Spill din første runde! 🚀" :
                       myRounds.length < 8 ? `${8 - myRounds.length} runder igjen for å fullføre sesongen` :
                       myRounds.length < 12 ? `✅ Minimum oppnådd! ${12 - myRounds.length} runder igjen av sesongen` :
                       "🏆 Alle 12 runder spilt!"}
                    </div>
                  </div>
              {myRounds.length === 0 && <div style={{ marginTop: 10, fontSize: 11, color: "#8a9a70", textAlign: "center", fontStyle: "italic" }}>Registrer din første runde for å se statistikk 🚀</div>}
                </div>
              );
            })()}

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
                <button onClick={() => { signOut(); setShowProfile(false); }} style={{ flex: 1, padding: 13, border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, background: "rgba(239,68,68,0.05)", color: "#dc2626", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Logg ut</button>
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
                        <a href={course.udisc} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 11, color: "#4a8a10", fontWeight: 600, textDecoration: "none" }}>🔗 Se på UDisc</a>
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

                  {/* Co-players */}
                  {r.co_players && r.co_players.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#5a7040", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Medspillere</div>
                      <div style={{ fontSize: 13, color: "#4a5a38" }}>{r.co_players.join(", ")}</div>
                    </div>
                  )}

                  {/* Own round actions */}
                  {isOwn && (
                    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                      <button onClick={() => {
                        setSelectedRound(null);
                        setEditRound(r);
                        const coursePar = course?.par ?? 0;
                        setRegForm({ course: r.course_id, score: r.total_score ? String(r.total_score) : String(r.score + coursePar), date: r.date });
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

            {/* Pending invites */}
            {pendingInvites.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#4a8a10", marginBottom: 8 }}>Runde-invitasjoner</div>
                {pendingInvites.map(inv => (
                  <div key={inv.id} style={{ background: "rgba(101,163,13,0.07)", border: "1px solid rgba(101,163,13,0.2)", borderRadius: 12, padding: "12px 14px", marginBottom: 8 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>🥏 {inv.profiles?.full_name ?? "Noen"} tagget deg</div>
                    <div style={{ fontSize: 12, color: "#4a5a38", marginBottom: 8 }}>{inv.rounds?.course_name} · {inv.rounds?.date ? new Date(inv.rounds.date + "T12:00:00").toLocaleDateString("nb-NO", { day: "2-digit", month: "2-digit", year: "numeric" }) : ""}</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={async () => {
                        await supabase.from("round_invites").update({ status: "confirmed" }).eq("id", inv.id);
                        setRegForm({ course: inv.rounds?.course_id ?? "", score: "", date: inv.rounds?.date ?? "" });
                        setShowNotifications(false);
                        setShowRegister(true);
                        loadPendingInvites();
                      }} style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "1px solid rgba(101,163,13,0.3)", background: "rgba(101,163,13,0.1)", color: "#4a8a10", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>🥏 Registrer min score</button>
                      <button onClick={async () => {
                        await supabase.from("round_invites").update({ status: "confirmed" }).eq("id", inv.id);
                        loadPendingInvites();
                      }} style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #A3E635, #65A30D)", color: "#0a0f0a", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>👍 Bekreft</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* General notifications */}
            {notifications.length === 0 && pendingInvites.length === 0 && (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🔕</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#6b7a58" }}>Ingen varsler ennå</div>
              </div>
            )}
            {notifications.map(n => (
              <div key={n.id} onClick={async () => {
                if (!n.read) await supabase.from("notifications").update({ read: true }).eq("id", n.id);
                setNotifications(prev => prev.map(nn => nn.id === n.id ? { ...nn, read: true } : nn));
              }} style={{ background: n.read ? "rgba(0,0,0,0.02)" : "rgba(101,163,13,0.06)", border: `1px solid ${n.read ? "rgba(0,0,0,0.06)" : "rgba(101,163,13,0.15)"}`, borderRadius: 12, padding: "12px 14px", marginBottom: 6, cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ fontSize: 13, fontWeight: n.read ? 500 : 700, color: "#1c2b12" }}>{n.title}</div>
                  {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4a8a10", flexShrink: 0, marginTop: 4 }} />}
                </div>
                {n.body && <div style={{ fontSize: 12, color: "#4a5a38", marginTop: 4, lineHeight: 1.5 }}>{n.body}</div>}
                <div style={{ fontSize: 10, color: "#8a9a70", marginTop: 6 }}>{new Date(n.created_at).toLocaleDateString("nb-NO", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</div>
              </div>
            ))}

            <button onClick={async () => {
              const unread = notifications.filter(n => !n.read).map(n => n.id);
              if (unread.length > 0) {
                await supabase.from("notifications").update({ read: true }).in("id", unread);
                setNotifications(prev => prev.map(n => ({ ...n, read: true })));
              }
            }} style={{ width: "100%", padding: 10, border: "none", borderRadius: 10, background: "rgba(0,0,0,0.04)", color: "#6b7a58", fontWeight: 600, fontSize: 12, cursor: "pointer", marginTop: 8 }}>Merk alle som lest</button>
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
