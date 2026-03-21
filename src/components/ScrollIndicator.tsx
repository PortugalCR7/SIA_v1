"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);
  const dismissed = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onScroll = () => {
      if (!dismissed.current && window.scrollY > 60) {
        dismissed.current = true;
        setVisible(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden="true"
    >
      <span className="overline text-parchment/40 font-bold text-[0.5rem] tracking-[0.4em]">
        Scroll
      </span>
      <span className="scroll-line block w-px bg-parchment/30 origin-top" />
    </div>
  );
}
