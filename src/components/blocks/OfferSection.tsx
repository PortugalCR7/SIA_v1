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
            <h3 className="font-heading text-[2.25rem] text-ink mb-10 font-bold">{stepsHeading}</h3>
            <div ref={stepsRef} className="relative">
              {/* Vertical timeline spine */}
              <div
                ref={lineRef}
                className="absolute top-3 bottom-8 w-px bg-gradient-to-b from-ink/25 via-ink/12 to-transparent origin-top pointer-events-none"
                style={{ left: "15px", transform: "scaleY(0)", transition: "transform 1.5s cubic-bezier(0.16,1,0.3,1) 0.2s" }}
              />
              {steps.map(({ label, body }, i) => (
                <div key={i} className="flex items-start gap-8 py-6 border-b border-ink/[0.08] relative">
                  <p
                    className="font-heading text-[2rem] font-bold shrink-0 w-8 text-center"
                    style={{ color: `rgba(27,25,22,${0.15 + i * 0.07})` }}
                  >
                    {i + 1}
                  </p>
                  <div>
                    <p className="font-body text-[1rem] text-ink font-bold mb-2 uppercase tracking-wide">{label}</p>
                    <p className="font-body text-[0.875rem] text-ink/50 font-medium">{body}</p>
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
              <p className="font-heading text-parchment text-3xl md:text-5xl font-bold mb-6">{investmentHeadline}</p>
              <p className="font-body text-[0.9375rem] text-parchment/40 leading-relaxed font-medium mb-12">
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
