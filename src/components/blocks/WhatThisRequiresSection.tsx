"use client";

import { useEffect, useRef, useState } from "react";
import SplitHeading from "@/components/SplitHeading";

interface Stat {
  label: string;
  value: string;
  note: string;
}

interface WhatThisRequiresSectionProps {
  sectionLabel?: string;
  heading: string;
  stats?: Stat[];
}

function getStatBorderClasses(i: number): string {
  // 6 items in a 2-col (mobile) / 3-col (desktop) grid
  const mobileRight   = i % 2 === 0;  // left col → right border
  const mobileBottom  = i < 4;         // rows 0-1 → bottom border
  const desktopRight  = i % 3 !== 2;  // not last col
  const desktopBottom = i < 3;         // row 0 only
  return [
    "border-parchment/10",
    mobileRight   ? "border-r"      : "",
    mobileBottom  ? "border-b"      : "",
    desktopRight  && !mobileRight   ? "md:border-r"   : "",
    !desktopRight  && mobileRight   ? "md:border-r-0" : "",
    desktopBottom && !mobileBottom  ? "md:border-b"   : "",
    !desktopBottom && mobileBottom  ? "md:border-b-0" : "",
  ].filter(Boolean).join(" ");
}

function StatCard({ label, value, note, index }: { label: string; value: string; note: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [displayNum, setDisplayNum] = useState(0);

  const match     = value.match(/^(\d+)([\s\S]*)$/);
  const targetNum = match ? parseInt(match[1], 10) : 0;
  const suffix    = match ? match[2] : "";
  const hasNumber = !!match && targetNum > 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !hasNumber) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayNum(targetNum);
      return;
    }
    const duration   = 1400;
    const startDelay = index * 100;
    let startTime: number | null = null;
    let frameId: number;
    const animate = (ts: number) => {
      if (startTime === null) startTime = ts;
      const elapsed  = ts - startTime - startDelay;
      if (elapsed < 0) { frameId = requestAnimationFrame(animate); return; }
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setDisplayNum(Math.round(eased * targetNum));
      if (progress < 1) frameId = requestAnimationFrame(animate);
      else setDisplayNum(targetNum);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [visible, hasNumber, targetNum, index]);

  return (
    <div ref={ref} className={`reveal delay-${Math.min(index + 1, 5)} p-8 md:p-10 ${getStatBorderClasses(index)}`}>
      <p className="overline text-parchment/50 font-bold mb-4">{label}</p>
      <p className="font-heading text-parchment leading-tight mb-3 font-bold" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
        {hasNumber ? `${displayNum}${suffix}` : value}
      </p>
      <p className="font-body text-[0.875rem] text-parchment/50 leading-relaxed font-medium">{note}</p>
    </div>
  );
}

export default function WhatThisRequiresSection({
  sectionLabel = "What This Requires",
  heading,
  stats = [],
}: WhatThisRequiresSectionProps) {
  return (
    <section className="bg-ink section-py px-6 md:px-14 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_60%,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <p className="reveal overline text-parchment/50 font-bold mb-12 flex items-center gap-6"><span className="rule-gold opacity-40 w-12" />{sectionLabel}</p>
        <SplitHeading className="font-heading text-parchment mb-8 text-balance font-bold"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }} stagger={50} baseDelay={80}>
          {heading}
        </SplitHeading>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-0 mt-20">
          {stats.map(({ label, value, note }, i) => (
            <StatCard key={label} label={label} value={value} note={note} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
