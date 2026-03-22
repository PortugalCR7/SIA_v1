"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ScrollIndicator from "@/components/ScrollIndicator";
import MarqueeSection from "@/components/blocks/MarqueeSection";

interface StatItem {
  label: string;
  value: string;
}

interface MediaObject {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface HeroSectionProps {
  sectionLabel?: string;
  headline: string;
  subheadline?: string;
  tagline?: string;
  statBar?: StatItem[];
  bottomCaption?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  backgroundImage?: MediaObject | null;
  backgroundVideoMp4?: MediaObject | null;
  backgroundVideoWebm?: MediaObject | null;
}

function HeroHeadline({ headline, subheadline }: { headline: string; subheadline?: string }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 1900);
    return () => clearTimeout(timer);
  }, []);

  const resolvedSubheadline = subheadline ?? "But Something in You Knows You Haven\u2019t Crossed Yet.";
  const subWords = resolvedSubheadline.split(" ");

  return (
    <h1
      className="font-heading text-parchment leading-[0.88] text-balance mb-10 font-bold"
      style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)", textShadow: "0 12px 40px rgba(0,0,0,0.65)" }}
    >
      <span
        className="inline-block"
        style={{
          clipPath: animate ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          transition: "clip-path 1.2s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {headline.split("\n")[0] ?? headline}
      </span>
      <br className="hidden md:block" />
      <span
        className="inline-block"
        style={{
          clipPath: animate ? "inset(0 0 0 0)" : "inset(0 0 0 100%)",
          transition: "clip-path 1.2s cubic-bezier(0.16,1,0.3,1) 0.15s",
        }}
      >
        {" "}{headline.split("\n")[1] ?? ""}
      </span>
      {/* Subheadline — Cormorant italic for the ceremonial weight of the italic cut */}
      <em
        className="block font-heading font-normal italic text-parchment/75 mt-5"
        style={{ fontSize: "clamp(1.875rem, 4.5vw, 4.25rem)", lineHeight: 1.1 }}
      >
        {subWords.map((word, i) => (
          <span
            key={i}
            className="inline-block mr-[0.28em]"
            style={{
              opacity: animate ? 1 : 0,
              transform: animate ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${0.52 + i * 0.042}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.52 + i * 0.042}s`,
            }}
          >
            {word}
          </span>
        ))}
      </em>
    </h1>
  );
}

function HeroStatBar({ statBar }: { statBar: StatItem[] }) {
  return (
    <div className="hero-stat-bar flex items-center justify-start mt-2 mb-6">
      {statBar.map(({ label, value }, i) => (
        <div
          key={label}
          className={`flex flex-col gap-2 px-6 md:px-10 ${i > 0 ? "border-l border-parchment/[0.1]" : ""} ${i === 0 ? "pl-0" : ""}`}
        >
          {/* Pro-Max: minimum 10px for overline/caption labels — bumped from 8px */}
          <span className="overline text-parchment/35 tracking-[0.45em]" style={{ fontSize: "clamp(0.625rem, 0.7vw, 0.6875rem)" }}>{label}</span>
          {/* Cormorant italic numerals for editorial gravitas */}
          <span className="font-heading italic text-parchment text-[1.375rem] md:text-[1.625rem] font-normal leading-none" style={{ letterSpacing: "-0.02em" }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

export default function HeroSection({
  sectionLabel = "Soul Initiation Academy",
  headline,
  subheadline,
  tagline,
  statBar = [
    { label: "Cohort", value: "8" },
    { label: "Duration", value: "6 Months" },
    { label: "Begins", value: "April 2026" },
  ],
  bottomCaption,
  ctaLabel = "Begin Your Application",
  ctaUrl = "#apply",
  backgroundImage,
  backgroundVideoMp4,
  backgroundVideoWebm,
}: HeroSectionProps) {
  const [ctaVisible, setCtaVisible] = useState(false);
  const headlineRef = useRef<HTMLDivElement>(null);
  const statBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setCtaVisible(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  // Parallax: headline at 0.25× scroll speed, stat bar at 0.45×
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (headlineRef.current) {
        headlineRef.current.style.transform = `translateY(${-y * 0.25}px)`;
      }
      if (statBarRef.current) {
        statBarRef.current.style.transform = `translateY(${-y * 0.45}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Resolve media URLs — CMS values take priority, static assets are fallbacks
  const bgImageSrc = backgroundImage?.url ?? "/images/hero-mountain.png";
  const bgImageAlt = backgroundImage?.alt ?? "A lone figure stands above the clouds at the threshold";
  const videoMp4Src = backgroundVideoMp4?.url ?? "/videos/hero-loop.mp4";
  const videoWebmSrc = backgroundVideoWebm?.url ?? "/videos/hero-loop.webm";

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Image + video background */}
      <div className="absolute inset-0 img-grain">
        <Image
          src={bgImageSrc}
          alt={bgImageAlt}
          fill
          className="object-cover object-center img-warm brightness-[0.55]"
          priority
          sizes="100vw"
        />
        <video
          className="hero-video absolute inset-0 w-full h-full object-cover img-warm brightness-[0.55]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={bgImageSrc}
          aria-hidden="true"
        >
          <source src={videoMp4Src} type="video/mp4" />
          <source src={videoWebmSrc} type="video/webm" />
        </video>

        {/* Vertical gradient: heavy dark at top and bottom, atmospheric middle */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/15 to-ink" />

        {/* Radial vignette: darkens corners for cinematic depth */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* 444 Ghost Watermark */}
      <span
        className="absolute bottom-24 right-6 md:right-14 z-[1] font-heading font-bold select-none pointer-events-none breathe-444"
        style={{
          fontSize: "clamp(8rem, 20vw, 20rem)",
          lineHeight: 0.85,
          letterSpacing: "-0.04em",
          color: "var(--parchment)",
        }}
        aria-hidden="true"
      >
        444
      </span>

      <div className="relative z-10 flex-1 flex flex-col justify-end px-6 md:px-14 pb-8 md:pb-16 pt-40">
        {/* Section overline */}
        <p
          className="overline text-parchment/50 font-semibold mb-10 flex items-center gap-6"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <span className="rule-gold w-12" />
          {sectionLabel}
        </p>

        <div ref={headlineRef} className="will-change-transform">
          <HeroHeadline headline={headline} subheadline={subheadline} />
        </div>

        <div
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          {/* Tagline — body prose bridging headline to CTA */}
          {tagline && (
            <p
              className="font-body text-parchment/65 mb-8 max-w-lg leading-[1.68]"
              style={{ fontSize: "clamp(0.9375rem, 1.15vw, 1.0625rem)" }}
            >
              {tagline}
            </p>
          )}

          {/* Editorial gold separator before CTA block */}
          <div
            className="mb-8 h-px bg-gold/40"
            style={{ width: "clamp(2.5rem, 8vw, 5rem)" }}
            aria-hidden="true"
          />

          <a
            href={ctaUrl}
            className="btn-fill group font-body text-[10.5px] tracking-[0.4em] uppercase px-12 py-[1.1rem] bg-parchment text-ink active:scale-[0.98] transition-transform duration-200 cursor-pointer font-bold"
          >
            <span
              className="absolute inset-0 bg-gold-lt"
              style={{ transform: "translateX(-102%)", transition: "transform 0.5s var(--expo-out)" }}
              aria-hidden
            />
            <span className="relative z-10 flex items-center gap-4">
              {ctaLabel}
              <span className="transition-transform duration-300 group-hover:translate-x-2">{"\u2192"}</span>
            </span>
          </a>

          <div ref={statBarRef} className="will-change-transform">
            <HeroStatBar statBar={statBar} />
            {/* Bottom caption — editorial footnote beneath stats */}
            {bottomCaption && (
              <p
                className="font-heading italic text-parchment/40 mt-3 leading-snug"
                style={{ fontSize: "clamp(0.6875rem, 0.85vw, 0.75rem)", letterSpacing: "0.14em" }}
              >
                {bottomCaption}
              </p>
            )}
          </div>
        </div>
      </div>

      <ScrollIndicator />
      <MarqueeSection
        row1={[
          "Soul Initiation Academy",
          "Cross the Threshold",
          "Six Months \u00b7 Cohort of 8",
          "April 2026",
          "Application Required",
          "A Guided Crossing",
          "Not a Course. A Rite of Passage.",
        ]}
        row2={[
          "Separation \u00b7 Descent \u00b7 Threshold \u00b7 Return",
          "The Work Beneath the Work",
          "Soul. Not Ego.",
          "Cohort VIII \u00b7 April MMXXVI",
          "What Cannot Be Rushed",
          "Witness. Hold. Guide.",
          "The Crossing Begins",
        ]}
      />
    </section>
  );
}
