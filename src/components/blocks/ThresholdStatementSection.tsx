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

          <div className="mb-20 md:mb-28">
            <h2 className="font-heading text-parchment leading-[0.88] text-balance font-bold" style={{ fontSize: "clamp(4.5rem, 11vw, 11rem)" }}>
              <span
                className="inline-block"
                style={{ opacity: showItsA ? 1 : 0, transform: showItsA ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.7s var(--expo), transform 0.7s var(--expo)" }}
              >
                {headline}{" "}
              </span>
              {/* Cormorant font-normal italic — removes the bold optical conflict with the italic cut */}
              <em
                className="inline-block italic font-normal"
                style={{
                  color: showPulse ? "#C8B89A" : "var(--parchment)",
                  opacity: showThreshold ? 1 : 0,
                  transform: showThreshold ? "translateX(0)" : "translateX(80px)",
                  textShadow: showPulse ? "0 0 50px rgba(200,184,154,0.28)" : "none",
                  transition: "opacity 0.9s var(--expo), transform 0.9s var(--expo), color 0.8s var(--expo), text-shadow 0.8s var(--expo)",
                }}
              >
                {emphasisWord}
              </em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            {/* Left: contemplative quote — font-normal italic reads as witnessed, not declared */}
            <div
              style={{ opacity: showContent ? 1 : 0, transform: showContent ? "translateY(0)" : "translateY(32px)", transition: "opacity 1s var(--expo), transform 1s var(--expo)" }}
            >
              <span className="block mb-8 h-px bg-gold/45" style={{ width: "2.25rem" }} aria-hidden="true" />
              <p
                className="font-heading font-normal italic text-parchment leading-[1.2] mb-8"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
              >
                {quote ? `\u201C${quote}\u201D` : "\u201CA genuine life threshold is not a problem to be solved.\u00A0It is a passage to be moved through.\u201D"}
              </p>
              <p className="font-body text-[0.9375rem] text-parchment/52 leading-relaxed font-normal">
                {quoteCaption ?? "In traditional cultures, these crossings were marked, held, and guided. In modern life, they rarely are."}
              </p>
            </div>
            {/* Right: what happens without structure */}
            <div
              className="space-y-0"
              style={{ opacity: showContentRight ? 1 : 0, transform: showContentRight ? "translateY(0)" : "translateY(32px)", transition: "opacity 1s var(--expo), transform 1s var(--expo)" }}
            >
              <p className="overline text-parchment/40 font-bold mb-10 tracking-[0.4em]">{collapseLabel}</p>
              {collapseItems.map(({ label, body }, i) => (
                <div key={i} className="flex items-start gap-6 py-6 border-b" style={{ borderColor: "rgba(181,168,152,0.18)" }}>
                  <span className="font-heading italic font-normal text-parchment/35 text-2xl leading-none shrink-0 mt-0.5">{"\u2014"}</span>
                  <div>
                    <p className="font-heading italic font-normal text-[1.0625rem] text-parchment leading-snug mb-2">{label}</p>
                    <p className="font-body text-[0.875rem] text-parchment/42 leading-relaxed font-normal">{body}</p>
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
