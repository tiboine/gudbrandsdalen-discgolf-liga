// Shared display formatting (nb-NO).

// Score vs par: -3, E, +2.
export function formatVsPar(s) {
  return s === 0 ? "E" : s > 0 ? `+${s}` : `${s}`;
}

const DATE_OPTS = { day: "2-digit", month: "2-digit", year: "numeric" };

// Round dates are "YYYY-MM-DD" without time. Parse at noon so no timezone shifts the day.
export function fmtDate(dateStr, opts = DATE_OPTS) {
  if (!dateStr) return "";
  return new Date(dateStr + "T12:00:00").toLocaleDateString("nb-NO", opts);
}

// Timestamps (created_at etc.).
export function fmtTimestamp(ts, opts = DATE_OPTS) {
  if (!ts) return "";
  return new Date(ts).toLocaleDateString("nb-NO", opts);
}
