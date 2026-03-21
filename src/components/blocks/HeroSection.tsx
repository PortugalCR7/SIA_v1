"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";
import ScrollIndicator from "@/components/ScrollIndicator";
import MarqueeSection from "@/components/blocks/MarqueeSection";

interface StatItem {
  label: string;
  value: string;
}

interface HeroSectionProps {
  sectionLabel?: string;
  headline: string;
  subheadline?: string;
  statBar?: StatItem[];
  ctaLabel?: string;
  ctaUrl?: string;
  backgroundImage?: any;
  backgroundVideoMp4?: any;
  backgroundVideoWebm?: any;
}

function HeroHeadline({ headline, subheadline }: { headline: string; subheadline?: string }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 1900);
    return () => clearTimeout(timer);
  }, []);

  const subWords = (subheadline ?? "But Something in You Knows You Haven\u2019t Crossed Yet.").split(" ");

  return (
    <h1
      className="font-heading text-parchment leading-[0.9] text-balance mb-12 font-bold"
      style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)", textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
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
      <em
        className="block font-medium italic text-parchment/80 mt-4"
        style={{ fontSize: "clamp(2.25rem, 5vw, 5rem)" }}
      >
        {subWords.map((word, i) => (
          <span
            key={i}
            className="inline-block mr-[0.3em]"
            style={{
              opacity: animate ? 1 : 0,
              transform: animate ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${0.5 + i * 0.04}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${0.5 + i * 0.04}s`,
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
    <div className="hero-stat-bar flex items-center justify-start mt-14 mb-6">
      {statBar.map(({ label, value }, i) => (
        <div
          key={label}
          className={`flex flex-col gap-1.5 px-6 md:px-10 ${
            i > 0 ? "border-l border-parchment/[0.12]" : ""
          } ${i === 0 ? "pl-0" : ""}`}
        >
          <span className="overline text-parchment/30 font-bold text-[0.5rem]">{label}</span>
          <span className="font-heading text-parchment text-lg md:text-xl font-bold leading-none">{value}</span>
        </div>
      ))}
    </div>
  );
}

export default function HeroSection({
  sectionLabel = "Soul Initiation Academy",
  headline,
  subheadline,
  statBar = [
    { label: "Cohort", value: "8" },
    { label: "Duration", value: "6 Months" },
    { label: "Begins", value: "April 2026" },
  ],
  ctaLabel = "Begin Your Application",
  ctaUrl = "#apply",
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

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Video background with image fallback */}
      <div className="absolute inset-0 img-grain">
        <Image
          src="/images/hero-mountain.png"
          alt="A lone figure stands above the clouds at the threshold"
          fill
          className="object-cover object-center img-warm brightness-[0.65]"
          priority
          sizes="100vw"
        />
        <video
          className="hero-video absolute inset-0 w-full h-full object-cover img-warm brightness-[0.65]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-mountain.png"
          aria-hidden="true"
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
          <source src="/videos/hero-loop.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/30 to-ink" />
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

      <Nav siteTitle="Soul Initiation Academy" />

      <div className="relative z-10 flex-1 flex flex-col justify-end px-6 md:px-14 pb-8 md:pb-16 pt-40">
        <p
          className="overline text-parchment/60 font-semibold mb-10 flex items-center gap-6"
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
          <a
            href={ctaUrl}
            className="btn-fill group font-body text-[11px] tracking-[0.35em] uppercase px-12 py-5 bg-parchment text-ink active:scale-[0.98] transition-transform duration-200 cursor-pointer font-bold"
          >
            <span className="absolute inset-0 bg-gold-lt" style={{ transform: "translateX(-102%)", transition: "transform 0.5s var(--expo-out)" }} aria-hidden />
            <span className="relative z-10 flex items-center gap-4">
              {ctaLabel}
              <span className="transition-transform duration-300 group-hover:translate-x-2">{"\u2192"}</span>
            </span>
          </a>

          <div ref={statBarRef} className="will-change-transform">
            <HeroStatBar statBar={statBar} />
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
