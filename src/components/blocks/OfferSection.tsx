"use client";

import { useEffect, useRef } from "react";
import SplitHeading from "@/components/SplitHeading";

interface Step {
  label: string;
  body?: string;
}

interface OfferSectionProps {
  sectionLabel?: string;
  heading: string;
  subheading?: string;
  stepsHeading?: string;
  steps?: Step[];
  investmentLabel?: string;
  investmentHeadline?: string;
  investmentNote?: string;
  investmentBody?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export default function OfferSection({
  sectionLabel = "Investment & Application",
  heading,
  subheading,
  stepsHeading = "What The Next Step Looks Like",
  steps = [],
  investmentLabel = "Investment",
  investmentHeadline = "Founding Cohort Rate",
  investmentNote,
  investmentBody,
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

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      line.style.transform = "scaleY(1)";
      return;
    }

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

  // Concentric rings draw via stroke-dashoffset with 200ms stagger
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const circles = Array.from(svg.querySelectorAll<SVGCircleElement>("circle"));
    const circumferences = [879.6, 628.3, 376.9];

    circles.forEach((circle, i) => {
      circle.style.strokeDasharray = `${circumferences[i]}`;
      if (prefersReduced) {
        circle.style.strokeDashoffset = "0";
        return;
      }
      circle.style.strokeDashoffset = `${circumferences[i]}`;
      circle.style.transition = `stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1) ${i * 200}ms`;
    });

    if (prefersReduced) return;

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

        {/* ── Overline ─────────────────────────────────────────────────────── */}
        <p className="reveal overline text-ink/40 font-bold mb-12 flex items-center gap-6">
          <span className="rule-gold w-12" aria-hidden="true" />
          {sectionLabel}
        </p>

        {/* ── Primary heading — Cormorant italic, ceremonial weight ─────────── */}
        <SplitHeading
          className="font-heading italic text-ink font-semibold"
          style={{
            fontSize: "clamp(2.75rem, 5.5vw, 4.75rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
          stagger={80}
          baseDelay={80}
        >
          {heading}
        </SplitHeading>

        {/* ── Optional subheading — Jost, medium weight ────────────────────── */}
        {subheading && (
          <p
            className="reveal delay-2 font-body text-ink/55 font-medium mt-5 mb-0"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", lineHeight: 1.65 }}
          >
            {subheading}
          </p>
        )}

        {/* ── Two-column grid: steps left / investment right ───────────────── */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 mt-16">

          {/* ── Left card: Next Steps ─────────────────────────────────────── */}
          <div className="reveal delay-3 bg-cream p-10 md:p-14 shadow-lg border border-ink/[0.05]">

            {/* Steps heading — Cormorant italic, intimate sub-heading scale */}
            <h3
              className="font-heading italic font-semibold text-ink mb-10"
              style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)", lineHeight: 1.15 }}
            >
              {stepsHeading}
            </h3>

            <div ref={stepsRef} className="relative">
              {/* Vertical timeline spine */}
              <div
                ref={lineRef}
                className="absolute top-3 bottom-8 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent origin-top pointer-events-none"
                style={{
                  left: "15px",
                  transform: "scaleY(0)",
                  transition: "transform 1.5s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
                aria-hidden="true"
              />

              {steps.map(({ label, body }, i) => (
                <div
                  key={i}
                  className="flex items-start gap-8 py-6 border-b"
                  style={{ borderColor: "rgba(181,168,152,0.3)" }}
                >
                  {/* Step numeral — decorative, opacity progressively increases */}
                  <p
                    className="font-heading italic font-normal shrink-0 w-8 text-center leading-none mt-0.5"
                    style={{
                      fontSize: "clamp(1.5rem, 2vw, 2rem)",
                      color: `rgba(0,0,0,${0.15 + i * 0.08})`,
                    }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </p>

                  <div>
                    {/* Step label — Jost bold, uppercase, tracked */}
                    <p
                      className="font-body font-bold text-ink uppercase mb-2"
                      style={{ fontSize: "0.8125rem", letterSpacing: "0.1em" }}
                    >
                      {label}
                    </p>
                    {/* Step body — Jost regular, comfortable reading measure */}
                    {body && (
                      <p
                        className="font-body font-normal text-ink/58"
                        style={{ fontSize: "0.9rem", lineHeight: 1.72 }}
                      >
                        {body}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right card: Investment ────────────────────────────────────── */}
          <div className="reveal delay-4 bg-ink p-10 md:p-14 flex flex-col justify-between shadow-2xl relative overflow-hidden">

            {/* Decorative concentric rings */}
            <div
              className="absolute top-0 right-0 w-60 h-60 opacity-[0.08] pointer-events-none translate-x-1/4 -translate-y-1/4"
              aria-hidden="true"
            >
              <svg
                ref={svgRef}
                viewBox="0 0 160 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="160" cy="0" r="140" stroke="#FFFFFF" strokeWidth="0.5" />
                <circle cx="160" cy="0" r="100" stroke="#FFFFFF" strokeWidth="0.5" />
                <circle cx="160" cy="0" r="60" stroke="#FFFFFF" strokeWidth="0.5" />
              </svg>
            </div>

            <div>
              {/* Investment overline — Jost bold, small, tracked */}
              <p
                className="font-body font-bold text-parchment/45 uppercase mb-7"
                style={{ fontSize: "0.6875rem", letterSpacing: "0.2em" }}
              >
                {investmentLabel}
              </p>

              {/* Price — Cormorant italic, the climactic number */}
              <p
                className="font-heading italic font-normal text-parchment leading-none mb-4"
                style={{
                  fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                {investmentHeadline}
              </p>

              {/* Payment note — Jost medium, small and calm, factual */}
              {investmentNote && (
                <p
                  className="font-body font-medium text-parchment/55 mb-7"
                  style={{ fontSize: "0.8125rem", lineHeight: 1.6 }}
                >
                  {investmentNote}
                </p>
              )}

              {/* Hairline separator between note and body */}
              <div
                className="mb-7"
                style={{
                  height: "1px",
                  background: "linear-gradient(90deg, rgba(255,255,255,0.12) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />

              {/* Commitment body — Jost regular, generous line-height */}
              {investmentBody && (
                <p
                  className="font-body font-normal text-parchment/60 mb-12"
                  style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}
                >
                  {investmentBody}
                </p>
              )}
            </div>

            {/* CTA — Jost bold, all-caps, fill-sweep animation */}
            <a
              href={ctaUrl}
              className="btn-fill group font-body font-bold text-center cursor-pointer"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                padding: "1.25rem 3rem",
                background: "var(--color-parchment, #E8E4DC)",
                color: "var(--color-ink, #000000)",
                display: "block",
              }}
            >
              <span
                className="absolute inset-0 bg-gold-lt"
                style={{
                  transform: "translateX(-102%)",
                  transition: "transform 0.5s var(--expo-out)",
                }}
                aria-hidden="true"
              />
              <span className="relative z-10">{ctaLabel} &rarr;</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
