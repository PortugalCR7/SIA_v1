"use client";

import { useEffect, useRef } from "react";
import SplitHeading from "@/components/SplitHeading";

interface Step {
  label: string;
  body: string;
}

interface OfferSectionProps {
  sectionLabel?: string;
  heading: string;
  subheading?: string;
  stepsHeading?: string;
  steps?: Step[];
  investmentLabel?: string;
  investmentHeadline?: string;
  investmentBody?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export default function OfferSection({
  sectionLabel = "Investment & Application",
  heading,
  subheading,
  stepsHeading = "The next step",
  steps = [],
  investmentLabel = "Investment",
  investmentHeadline = "Founding Cohort Rate",
  investmentBody = "Disclosed upon application. Payment plans available.",
  ctaLabel = "Begin Your Application",
  ctaUrl = "#apply-form",
}: OfferSectionProps) {
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Vertical timeline spine draws down on scroll entry
  useEffect(() => {
    const container = stepsRef.current;
    const line = lineRef.current;
    if (!container || !line) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            line.style.transform = "scaleY(1)";
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(container);
    return () => io.disconnect();
  }, []);

  // Concentric rings draw themselves via stroke-dashoffset with 200ms stagger
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const circles = Array.from(svg.querySelectorAll<SVGCircleElement>("circle"));
    const circumferences = [879.6, 628.3, 376.9]; // 2π × r for r=140, 100, 60
    circles.forEach((circle, i) => {
      circle.style.strokeDasharray = `${circumferences[i]}`;
      circle.style.strokeDashoffset = `${circumferences[i]}`;
      circle.style.transition = `stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1) ${i * 200}ms`;
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
    io.observe(svg.parentElement!);
    return () => io.disconnect();
  }, []);

  return (
    <section id="apply" className="bg-parchment section-py px-6 md:px-14">
      <div className="max-w-6xl mx-auto">
        <p className="reveal overline text-ink/40 font-bold mb-12 flex items-center gap-6"><span className="rule-gold w-12" />{sectionLabel}</p>
        <SplitHeading className="font-heading text-ink mb-6 font-bold"
          style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }} stagger={80} baseDelay={80}>
          {heading}
        </SplitHeading>
        {subheading && (
          <p className="reveal delay-2 font-body text-[1.125rem] text-ink/50 mb-20 font-medium">{subheading}</p>
        )}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div className="reveal delay-3 bg-cream p-10 md:p-14 shadow-lg border border-ink/[0.05]">
            {/* Steps heading — Cormorant italic */}
            <h3 className="font-heading italic font-semibold text-[2.125rem] leading-[1.1] text-ink mb-10">{stepsHeading}</h3>
            <div ref={stepsRef} className="relative">
              {/* Vertical timeline spine */}
              <div
                ref={lineRef}
                className="absolute top-3 bottom-8 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent origin-top pointer-events-none"
                style={{ left: "15px", transform: "scaleY(0)", transition: "transform 1.5s cubic-bezier(0.16,1,0.3,1) 0.2s" }}
              />
              {steps.map(({ label, body }, i) => (
                <div
                  key={i}
                  className="flex items-start gap-8 py-6 border-b relative"
                  style={{ borderColor: "rgba(181,168,152,0.3)" }}
                >
                  {/* Step numeral — Cormorant italic, opacity increases for progression */}
                  <p
                    className="font-heading italic font-normal text-[2rem] shrink-0 w-8 text-center leading-none mt-0.5"
                    style={{ color: `rgba(0,0,0,${0.12 + i * 0.08})` }}
                  >
                    {i + 1}
                  </p>
                  <div>
                    <p className="font-body text-[0.9375rem] text-ink font-bold mb-2 uppercase tracking-[0.12em]">{label}</p>
                    <p className="font-body text-[0.875rem] text-ink/52 font-normal">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal delay-4 bg-ink p-10 md:p-14 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-60 h-60 opacity-[0.1] pointer-events-none translate-x-1/4 -translate-y-1/4">
              <svg ref={svgRef} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="160" cy="0" r="140" stroke="#FFFFFF" strokeWidth="0.5" />
                <circle cx="160" cy="0" r="100" stroke="#FFFFFF" strokeWidth="0.5" />
                <circle cx="160" cy="0" r="60" stroke="#FFFFFF" strokeWidth="0.5" />
              </svg>
            </div>
            <div>
              <p className="overline text-parchment/40 font-bold mb-8">{investmentLabel}</p>
              {/* Investment headline — Cormorant italic for the ceremonial weight of commitment */}
              <p
                className="font-heading italic font-normal text-parchment leading-[1.1] mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", letterSpacing: "-0.02em" }}
              >
                {investmentHeadline}
              </p>
              <p className="font-body text-[0.9375rem] text-parchment/45 leading-relaxed font-normal mb-12">
                {investmentBody}
              </p>
            </div>
            <a href={ctaUrl} className="btn-fill group font-body text-[11px] tracking-[0.35em] uppercase px-12 py-5 bg-parchment text-ink font-bold text-center">
              <span className="absolute inset-0 bg-gold-lt" style={{ transform: "translateX(-102%)", transition: "transform 0.5s var(--expo-out)" }} />
              <span className="relative z-10">{ctaLabel} {"\u2192"}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
