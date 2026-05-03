// Mock data for visualization. Set INCLUDE_MOCKS = false to hide.
export const INCLUDE_MOCKS = true;

// [name, division, hometown, skill (0..1), targetRoundCount]
const PLAYERS_RAW = [
  ["Lars Hansen",      "Åpen",        "Lillehammer", 0.92, 14],
  ["Ingrid Solberg",   "Åpen",        "Lillehammer", 0.86, 13],
  ["Magnus Olsen",     "Åpen",        "Øyer",        0.82, 12],
  ["Kari Bakken",      "Åpen",        "Vinstra",     0.78, 11],
  ["Tobias Lie",       "Åpen",        "Ringebu",     0.74, 10],
  ["Silje Haugen",     "Åpen",        "Lillehammer", 0.70,  9],
  ["Andreas Holm",     "Åpen",        "Sør-Fron",    0.66,  9],
  ["Maria Strand",     "Rekreasjons", "Otta",        0.62,  8],
  ["Vegard Moen",      "Åpen",        "Sel",         0.58,  8],
  ["Lise Berg",        "Rekreasjons", "Nord-Fron",   0.54,  7],
  ["Mikkel Dahl",      "Rekreasjons", "Lillehammer", 0.50,  7],
  ["Thea Nilsen",      "Åpen",        "Ringebu",     0.46,  6],
  ["Sondre Lien",      "Rekreasjons", "Øyer",        0.42,  6],
  ["Hanne Fjeld",      "Rekreasjons", "Vinstra",     0.38,  5],
  ["Erik Sundby",      "Rekreasjons", "Lillehammer", 0.34,  5],
  ["Anne Lund",        "Rekreasjons", "Sør-Fron",    0.30,  5],
  ["Joakim Eide",      "Rekreasjons", "Otta",        0.26,  4],
  ["Camilla Vik",      "Rekreasjons", "Lillehammer", 0.22,  4],
  ["Henrik Tofte",     "Rekreasjons", "Nord-Fron",   0.18,  3],
  ["Marte Skog",       "Rekreasjons", "Lillehammer", 0.14,  3],
];

export const MOCK_PROFILES = PLAYERS_RAW.map(([name, division, hometown], i) => ({
  id: `mock-${i + 1}`,
  full_name: name,
  avatar_url: null,
  division,
  hometown,
  disabled: false,
}));

// Multi-player events (same date+course → triggers Stableford grouping)
const EVENTS = [
  { courseId: "jorstadmoen",     daysAgo: 2,  participants: 9 },
  { courseId: "skogen",          daysAgo: 7,  participants: 8 },
  { courseId: "sandbumoen",      daysAgo: 14, participants: 7 },
  { courseId: "lalm",            daysAgo: 21, participants: 8 },
  { courseId: "gaala",           daysAgo: 28, participants: 6 },
  { courseId: "jorstadmoen",     daysAgo: 35, participants: 7 },
  { courseId: "mosetertoppen",   daysAgo: 42, participants: 6 },
  { courseId: "kvam",            daysAgo: 49, participants: 5 },
];

let cachedRounds = null;

export function getMockRounds(courses) {
  if (cachedRounds) return cachedRounds;

  let seed = 1234567;
  const rng = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  const pickFrom = (arr, n) => {
    const copy = [...arr];
    const out = [];
    for (let i = 0; i < n && copy.length; i++) {
      const idx = Math.floor(rng() * copy.length);
      out.push(copy.splice(idx, 1)[0]);
    }
    return out;
  };

  const today = new Date();
  const rounds = [];
  let rid = 1;

  const scoreFor = (skill, par) => {
    const skillFactor = (1 - skill) * 0.22 - skill * 0.10;
    const noise = (rng() - 0.5) * 6;
    return Math.round(par * skillFactor + noise);
  };

  const dateFromDaysAgo = (d) => new Date(today.getTime() - d * 86400000);

  // Events first — multiple players on same course/date
  EVENTS.forEach(ev => {
    const course = courses.find(c => c.id === ev.courseId);
    if (!course) return;
    const date = dateFromDaysAgo(ev.daysAgo).toISOString().split("T")[0];
    const createdAt = dateFromDaysAgo(ev.daysAgo).toISOString();
    const playerIdxs = pickFrom([...PLAYERS_RAW.keys()], ev.participants);
    playerIdxs.forEach(idx => {
      const [name, , , skill] = PLAYERS_RAW[idx];
      rounds.push({
        id: `mock-r-${rid++}`,
        user_id: `mock-${idx + 1}`,
        course_id: course.id,
        score: scoreFor(skill, course.par),
        date,
        created_at: createdAt,
        profiles: { full_name: name, avatar_url: null },
      });
    });
  });

  // Solo rounds — fill out each player's target count
  PLAYERS_RAW.forEach((p, idx) => {
    const [name, , , skill, target] = p;
    const userId = `mock-${idx + 1}`;
    const have = rounds.filter(r => r.user_id === userId).length;
    const need = Math.max(0, target - have);
    for (let i = 0; i < need; i++) {
      const course = courses[Math.floor(rng() * courses.length)];
      const daysAgo = Math.floor(rng() * 60);
      const date = dateFromDaysAgo(daysAgo).toISOString().split("T")[0];
      rounds.push({
        id: `mock-r-${rid++}`,
        user_id: userId,
        course_id: course.id,
        score: scoreFor(skill, course.par),
        date,
        created_at: dateFromDaysAgo(daysAgo).toISOString(),
        profiles: { full_name: name, avatar_url: null },
      });
    }
  });

  rounds.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  cachedRounds = rounds;
  return rounds;
}
