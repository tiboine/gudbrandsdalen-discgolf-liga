// Props for a clickable element that can't be a <button> (it contains other buttons/links):
// adds role, tab stop and Enter/Space activation so it works with keyboard and screen readers.
export function clickable(handler) {
  return {
    role: "button",
    tabIndex: 0,
    onClick: handler,
    onKeyDown: (e) => {
      if ((e.key === "Enter" || e.key === " ") && e.target === e.currentTarget) { e.preventDefault(); handler(e); }
    },
  };
}
