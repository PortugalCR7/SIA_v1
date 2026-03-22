"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitHeading from "@/components/SplitHeading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Phase {
  numeral: string;
  name: string;
  body: string;
}

interface ProcessSectionProps {
  sectionLabel?: string;
  heading: string;
  subheading?: string;
  phases?: Phase[];
}

export default function ProcessSection({
  sectionLabel = "How It Works",
  heading,
  subheading,
  phases = [],
}: ProcessSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    const connector = connectorRef.current;
    if (!section || !track || !connector) return;

    const ctx = gsap.context(() => {
      const totalScroll = track.scrollWidth - window.innerWidth;

      const ghosts = track.querySelectorAll<HTMLElement>(".phase-ghost-h");
      gsap.fromTo(ghosts,
        { opacity: 0, y: 40, scale: 1 },
        {
          opacity: 0.07, y: 0, scale: 1.04, duration: 2, stagger: 0.25, ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      gsap.to(track, {
        x: -totalScroll, ease: "none",
        scrollTrigger: { trigger: section, pin: true, scrub: 1, end: () => `+=${totalScroll}`, invalidateOnRefresh: true },
      });

      gsap.to(connector, {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: section, scrub: 1, start: "top top", end: () => `+=${totalScroll}` },
      });

      const dots = track.querySelectorAll<HTMLElement>(".arc-node");
      dots.forEach((dot, i) => {
        const ring = dot.parentElement?.querySelector<HTMLElement>(".arc-node-ring");
        gsap.to(dot, {
          scale: 1, backgroundColor: "var(--gold)", borderColor: "var(--gold)",
          scrollTrigger: {
            trigger: section, scrub: true,
            start: () => `top+=${(totalScroll / phases.length) * i} top`,
            end: () => `top+=${(totalScroll / phases.length) * (i + 0.5)} top`,
            onEnter: () => {
              if (ring) {
                gsap.fromTo(ring,
                  { scale: 1, opacity: 1 },
                  { scale: 2.5, opacity: 0, duration: 0.8, ease: "power2.out" }
                );
              }
            },
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile, phases.length]);

  /* ── Mobile layout ───────────────────────────────────────────────────── */
  if (isMobile) {
    return (
      <section className="bg-cream section-py px-6">
        <p className="reveal overline text-ink/40 font-bold mb-12 flex items-center gap-6">
          <span className="rule-gold w-10" />{sectionLabel}
        </p>
        <SplitHeading
          className="font-heading italic text-ink mb-6 text-balance font-semibold"
          style={{ fontSize: "clamp(3rem, 6vw, 5rem)", letterSpacing: "-0.02em", lineHeight: 1.05 }}
          stagger={80}
          baseDelay={80}
        >
          {heading}
        </SplitHeading>
        {subheading && (
          <p className="reveal delay-2 font-heading italic font-normal text-[1.125rem] text-ink/55 max-w-3xl mb-16 leading-relaxed whitespace-pre-line">
            {subheading}
          </p>
        )}

        {phases.map(({ numeral, name, body }, i) => (
          <div
            key={numeral}
            className={`reveal delay-${i + 1} relative py-10 border-b`}
            style={{ borderColor: "rgba(181,168,152,0.35)" }}
          >
            {/* Phase overline */}
            <p className="overline text-ink/30 font-bold mb-4">{`Phase ${numeral}`}</p>

            {/* Gold micro-rule — breath between overline and title */}
            <span
              className="block mb-5 h-px bg-gold/55"
              style={{ width: "2rem" }}
              aria-hidden="true"
            />

            {/* Phase name — Cormorant italic for the ceremonial register */}
            <h3 className="font-heading italic text-[2.5rem] leading-[1.1] text-ink mb-5 font-semibold">
              {name}
            </h3>
            <p className="font-body text-[0.9375rem] text-ink/70 leading-relaxed font-normal whitespace-pre-line">{body}</p>
          </div>
        ))}
      </section>
    );
  }

  /* ── Desktop layout ──────────────────────────────────────────────────── */
  return (
    <>
      {/* Section heading — normal scroll flow, above the pinned track */}
      <div className="bg-cream px-[8vw] pt-32 pb-20">
        <p className="reveal overline text-ink/40 font-bold mb-12 flex items-center gap-6">
          <span className="rule-gold w-10" />{sectionLabel}
        </p>
        <SplitHeading
          className="font-heading italic text-ink font-semibold"
          style={{
            fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
            marginBottom: "2rem",
          }}
          stagger={60}
          baseDelay={100}
        >
          {heading}
        </SplitHeading>
        {subheading && (
          <p
            className="reveal delay-3 font-heading italic font-normal text-ink/55 max-w-3xl leading-relaxed whitespace-pre-line"
            style={{ fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)" }}
          >
            {subheading}
          </p>
        )}
      </div>

      {/* Pinned horizontal scroll — phases only */}
      <section ref={sectionRef} className="arc-section bg-cream overflow-hidden relative">
        <div
          ref={trackRef}
          className="arc-track flex items-stretch relative"
          style={{ width: `${phases.length * 100}vw`, minHeight: "100vh" }}
        >
          {/* Gold connector line that draws across all panels */}
          <div
            className="absolute top-[55%] left-[6vw] pointer-events-none z-10"
            style={{ width: "calc(100% - 12vw)", height: "1px" }}
          >
            <div
              ref={connectorRef}
              className="w-full h-full origin-left"
              style={{
                transform: "scaleX(0)",
                background: "linear-gradient(90deg, var(--gold) 0%, var(--gold-lt) 50%, var(--gold) 100%)",
                opacity: 0.45,
              }}
            />
          </div>

          {phases.map(({ numeral, name, body }) => (
            <div
              key={numeral}
              className="arc-panel relative flex flex-col justify-center px-[8vw]"
              style={{ width: "100vw", minHeight: "100vh" }}
            >
              {/* Ghost numeral watermark — large, right-bled, barely there */}
              <span
                className="phase-ghost-h absolute select-none pointer-events-none"
                style={{
                  right: "-8vw",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(16rem, 30vw, 32rem)",
                  fontWeight: 300,
                  lineHeight: 0.8,
                  color: "var(--ink)",
                  opacity: 0,
                  letterSpacing: "-0.06em",
                }}
              >
                {numeral}
              </span>

              {/* Node dot + ring on connector line */}
              <div className="absolute top-[55%] left-[6vw] -translate-y-1/2 z-20">
                <span className="relative inline-block">
                  <span
                    className="arc-node-ring absolute inset-0 rounded-full border border-gold pointer-events-none"
                    style={{ opacity: 0, transformOrigin: "center" }}
                  />
                  <span
                    className="arc-node block w-3 h-3 rounded-full border-2 border-ink/20 bg-cream transition-colors duration-500"
                    style={{ transform: "scale(0.6)" }}
                  />
                </span>
              </div>

              {/* Phase content */}
              <div className="relative z-10 max-w-2xl">
                {/* Phase overline */}
                <p className="overline text-ink/30 font-bold mb-5">{`Phase ${numeral}`}</p>

                {/* Gold micro-rule — typographic breath between overline and title */}
                <span
                  className="block mb-7 h-px bg-gold/55"
                  style={{ width: "2.25rem" }}
                  aria-hidden="true"
                />

                {/* Phase name — Cormorant italic */}
                <h3
                  className="font-heading italic text-ink mb-8 font-semibold"
                  style={{ fontSize: "clamp(3rem, 5vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
                >
                  {name}
                </h3>

                <p
                  className="font-body text-ink/72 leading-relaxed max-w-lg font-normal whitespace-pre-line"
                  style={{ fontSize: "clamp(1rem, 1.2vw, 1.125rem)" }}
                >
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
