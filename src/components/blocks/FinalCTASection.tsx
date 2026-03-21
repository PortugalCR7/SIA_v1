"use client";

import { useEffect, useRef } from "react";
import SplitHeading from "@/components/SplitHeading";

interface FinalCTASectionProps {
  sectionLabel?: string;
  headline: string;
  body?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export default function FinalCTASection({
  sectionLabel = "The Threshold Is Here",
  headline,
  body,
  ctaLabel = "Begin Your Application",
  ctaUrl = "#apply-form",
}: FinalCTASectionProps) {
  const circleRef = useRef<SVGSVGElement>(null);

  // Concentric rings draw themselves on scroll entry
  useEffect(() => {
    const svg = circleRef.current;
    if (!svg) return;
    const circles = Array.from(svg.querySelectorAll<SVGCircleElement>("circle"));
    const circumferences = [1319.5, 879.6, 565.5, 314.2]; // 2π × r for r=210,140,90,50
    circles.forEach((circle, i) => {
      circle.style.strokeDasharray = `${circumferences[i]}`;
      circle.style.strokeDashoffset = `${circumferences[i]}`;
      circle.style.transition = `stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1) ${i * 350}ms`;
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            circles.forEach((circle) => { circle.style.strokeDashoffset = "0"; });
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative py-60 md:py-80 px-6 md:px-14 overflow-hidden">
      {/* Background: pure ink gradient — no photo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(200,184,154,0.07) 0%, transparent 60%), linear-gradient(180deg, #0d0b09 0%, #1a1612 50%, #080604 100%)",
        }}
      />
      {/* SVG grain */}
      <div
        className="absolute inset-0 opacity-[0.28] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />
      {/* Concentric rings — centered, full-bleed presence */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          ref={circleRef}
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[min(110vw,800px)] h-[min(110vw,800px)] opacity-[0.14]"
          aria-hidden="true"
        >
          <circle cx="250" cy="250" r="210" stroke="#C8B89A" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="140" stroke="#C8B89A" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="90"  stroke="#C8B89A" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="50"  stroke="#C8B89A" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Overline */}
        <p className="reveal overline text-parchment/40 font-bold mb-12 flex items-center justify-center gap-6">
          <span className="rule-gold opacity-40 w-10" />
          {sectionLabel}
          <span className="rule-gold opacity-40 w-10" />
        </p>

        {/* Primary headline — the emotional close */}
        <SplitHeading className="font-heading text-parchment leading-[1.0] mb-12 font-bold text-balance"
          style={{ fontSize: "clamp(3rem, 7vw, 7rem)", textShadow: "0 10px 40px rgba(0,0,0,0.6)" }} stagger={45} baseDelay={0}>
          {headline}
        </SplitHeading>

        {/* Body copy */}
        {body && (
          <div className="reveal delay-1 max-w-2xl mx-auto mb-16 space-y-5">
            <p className="font-body text-[1.0625rem] text-parchment/60 leading-relaxed font-medium">
              {body}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="reveal delay-2 flex flex-col items-center gap-12">
          <a
            href={ctaUrl}
            className="btn-fill group font-body text-[11px] tracking-[0.35em] uppercase px-14 py-6 bg-parchment text-ink font-bold"
          >
            <span className="absolute inset-0 bg-gold-lt" style={{ transform: "translateX(-102%)", transition: "transform 0.5s var(--expo-out)" }} aria-hidden />
            <span className="relative z-10">{ctaLabel} {"\u2192"}</span>
          </a>
          {/* 444 — watermark brand seal */}
          <p
            className="font-heading text-parchment font-bold select-none leading-none breathe-444"
            style={{ fontSize: "clamp(4rem,12vw,10rem)" }}
            aria-hidden="true"
          >
            444
          </p>
        </div>
      </div>
    </section>
  );
}
