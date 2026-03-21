"use client";

import { useEffect, useRef, useState } from "react";

interface CollapseItem {
  label: string;
  body: string;
}

interface ThresholdStatementSectionProps {
  sectionLabel?: string;
  headline: string;
  emphasisWord?: string;
  quote?: string;
  quoteCaption?: string;
  collapseLabel?: string;
  collapseItems?: CollapseItem[];
}

export default function ThresholdStatementSection({
  sectionLabel = "This Is Not Confusion",
  headline,
  emphasisWord = "Threshold.",
  quote,
  quoteCaption,
  collapseLabel = "The Modern Collapse:",
  collapseItems = [],
}: ThresholdStatementSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const wrapperHeight = wrapper.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const total = wrapperHeight - viewportHeight;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showItsA = progress > 0.05;
  const showThreshold = progress > 0.2;
  const showPulse = progress > 0.35;
  const showContent = progress > 0.5;
  const showContentRight = progress > 0.65;

  return (
    <div ref={wrapperRef} style={{ height: "200vh" }} className="relative">
      <section className="sticky top-0 h-screen bg-ink px-6 md:px-14 overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(255,255,255,0.07)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10 w-full">
          <p
            className="overline text-parchment/60 font-bold mb-12 flex items-center gap-6"
            style={{ opacity: showItsA ? 1 : 0, transform: showItsA ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s var(--expo), transform 0.7s var(--expo)" }}
          >
            <span className="rule-gold opacity-50 w-12" />
            {sectionLabel}
          </p>

          <div className="mb-24 md:mb-32">
            <h2 className="font-heading text-parchment leading-[0.9] text-balance font-bold" style={{ fontSize: "clamp(4.5rem, 11vw, 11rem)" }}>
              <span
                className="inline-block"
                style={{ opacity: showItsA ? 1 : 0, transform: showItsA ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.7s var(--expo), transform 0.7s var(--expo)" }}
              >
                {headline}{" "}
              </span>
              <em
                className="inline-block italic"
                style={{
                  color: showPulse ? "#C8B89A" : "var(--parchment)",
                  opacity: showThreshold ? 1 : 0,
                  transform: showThreshold ? "translateX(0)" : "translateX(80px)",
                  textShadow: showPulse ? "0 0 40px rgba(200,184,154,0.3)" : "none",
                  transition: "opacity 0.9s var(--expo), transform 0.9s var(--expo)",
                }}
              >
                {emphasisWord}
              </em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div
              style={{ opacity: showContent ? 1 : 0, transform: showContent ? "translateY(0)" : "translateY(32px)", transition: "opacity 1s var(--expo), transform 1s var(--expo)" }}
            >
              <p className="font-heading text-[2.5rem] md:text-[3rem] text-parchment font-bold italic leading-tight mb-8">
                {quote ? `\u201C${quote}\u201D` : "\u201CA genuine life threshold is not a problem to be solved. It is a passage to be moved through.\u201D"}
              </p>
              <p className="font-body text-[1rem] text-parchment/60 leading-relaxed font-medium">
                {quoteCaption ?? "In traditional cultures, these crossings were marked, held, and guided. In modern life, they rarely are."}
              </p>
            </div>
            <div
              className="space-y-0"
              style={{ opacity: showContentRight ? 1 : 0, transform: showContentRight ? "translateY(0)" : "translateY(32px)", transition: "opacity 1s var(--expo), transform 1s var(--expo)" }}
            >
              <p className="font-body text-[0.9375rem] text-parchment/50 mb-8 font-bold uppercase tracking-widest">{collapseLabel}</p>
              {collapseItems.map(({ label, body }, i) => (
                <div key={i} className="flex items-start gap-6 py-6 border-b border-parchment/[0.1]">
                  <span className="font-heading text-parchment/40 text-2xl leading-none shrink-0 mt-0.5">{"\u2014"}</span>
                  <div>
                    <p className="font-body text-[0.9375rem] text-parchment font-bold mb-1.5">{label}</p>
                    <p className="font-body text-[0.875rem] text-parchment/40 leading-relaxed font-medium">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
