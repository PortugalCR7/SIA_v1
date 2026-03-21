"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("out"), 1500);
    const t2 = setTimeout(() => setPhase("done"), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`loader-screen${phase === "out" ? " loader-exit" : ""}`} aria-hidden="true">
      <div className="loader-symbol">444</div>
      <span className="loader-rule" />
      <p className="loader-name">Soul Initiation Academy</p>
    </div>
  );
}
