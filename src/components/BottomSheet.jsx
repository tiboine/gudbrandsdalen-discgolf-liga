import { useEffect, useRef } from "react";

// Open sheets, oldest first. Escape closes only the topmost one.
const openSheets = [];

// Modal bottom sheet: dimmed, blurred backdrop (click closes) + panel sliding up.
// Escape closes it too. backdropStyle / panelStyle override the defaults below.
export default function BottomSheet({ onClose, zIndex = 100, backdropStyle, panelStyle, label, children }) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const entry = {};
    openSheets.push(entry);
    const onKey = (e) => {
      if (e.key === "Escape" && openSheets[openSheets.length - 1] === entry) onCloseRef.current?.();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      openSheets.splice(openSheets.indexOf(entry), 1);
    };
  }, []);

  return (
    <div onClick={() => onCloseRef.current?.()} style={{
      position: "fixed", inset: 0, zIndex, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 20,
      animation: "fadeIn 0.2s ease", ...backdropStyle,
    }}>
      <div role="dialog" aria-modal="true" aria-label={label} onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 500, background: "var(--c-modal-bg)", border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: 20, padding: 24, animation: "slideUp 0.3s ease", boxShadow: "0 -4px 30px rgba(0,0,0,0.12)",
        ...panelStyle,
      }}>
        {children}
      </div>
    </div>
  );
}
