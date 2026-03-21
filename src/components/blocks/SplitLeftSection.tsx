"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import SplitHeading from "@/components/SplitHeading";

interface SplitItem {
  num: string;
  label: string;
  body: string;
}

interface SplitLeftSectionProps {
  sectionLabel?: string;
  heading: string;
  body?: string;
  items?: SplitItem[];
  image?: unknown;
}

export default function SplitLeftSection({
  sectionLabel = "Do You Recognize This?",
  heading,
  body,
  items = [],
}: SplitLeftSectionProps) {
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Parallax: image moves at 0.15× container height offset
  useEffect(() => {
    const container = imgContainerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh - rect.top) / (vh + rect.height);
      const offset = (progress - 0.5) * rect.height * 0.15;
      img.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Staggered reveal for items
  useEffect(() => {
    const els = itemsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = els.indexOf(entry.target as HTMLDivElement);
            setTimeout(() => {
              entry.target.classList.add("in");
            }, idx * 90);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="split">
      {/* ── Image panel ──────────────────────────────────────────────── */}
      <div ref={imgContainerRef} className="split-img relative min-h-[70vw] md:min-h-0 img-grain overflow-hidden">
        <div ref={imgRef} className="absolute inset-[-15%] will-change-transform">
          <Image
            src="/images/ritual.png"
            alt="A solitary figure in the ancient forest"
            fill
            className="object-cover object-center img-warm"
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        </div>
        {/* Lateral gradient edge — creates atmospheric bleed into content panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-ink/30" />
        {/* Mobile: bottom fade into cream */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#F0EBE3] to-transparent md:hidden z-[3]" />
      </div>

      {/* ── Content panel ────────────────────────────────────────────── */}
      <div className="bg-cream flex flex-col justify-center px-8 md:px-16 xl:px-24 section-py">
        {/* Section overline */}
        <p className="reveal overline text-ink/40 font-bold mb-10 flex items-center gap-6">
          <span className="rule-gold w-10" />
          {sectionLabel}
        </p>

        {/* Section heading */}
        <SplitHeading
          className="font-heading text-ink mb-10 text-balance font-bold"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          stagger={60}
          baseDelay={80}
        >
          {heading}
        </SplitHeading>

        {/* Intro body — Cormorant italic for the solemn, manifesto register */}
        {body && (
          <p className="reveal delay-2 font-heading italic font-normal text-[1.2rem] md:text-[1.3125rem] text-ink/70 leading-[1.65] mb-14 max-w-xl">
            {body}
          </p>
        )}

        {/* Recognition items */}
        <div className="max-w-xl">
          {items.map(({ num, label, body: itemBody }, i) => (
            <div
              key={num}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="reveal split-left-item relative flex items-start gap-7 py-8 border-b group cursor-default"
              style={{ borderColor: "rgba(181,168,152,0.35)" }}
            >
              {/* Ghost numeral — large, background, barely there */}
              <span
                className="absolute -right-2 top-1/2 -translate-y-1/2 font-heading font-bold select-none pointer-events-none transition-opacity duration-500 group-hover:opacity-[0.07]"
                style={{
                  fontSize: "clamp(4rem, 8vw, 7rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.05em",
                  color: "var(--ink)",
                  opacity: 0.03,
                }}
                aria-hidden="true"
              >
                {num}
              </span>

              {/* Inline numeral — small mono overline treatment */}
              <span className="font-mono text-[0.6rem] tracking-[0.3em] text-ink/25 leading-none shrink-0 mt-[0.35rem] select-none group-hover:text-ink/50 transition-colors duration-400">
                {num.padStart(2, "0")}
              </span>

              <div className="split-left-item-content relative">
                <span className="split-left-gold-line" />
                {/* Label in Cormorant italic — ceremonial, poetic */}
                <p className="font-heading italic text-[1.4375rem] leading-[1.2] text-ink mb-2.5 font-semibold split-left-title">
                  {label}
                </p>
                <p className="font-body text-[0.9375rem] text-ink/55 leading-relaxed font-normal split-left-body">
                  {itemBody}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing compositional rule */}
        <div
          className="reveal delay-4 mt-14 h-px bg-gold/50"
          style={{ width: "clamp(2rem, 5vw, 3rem)" }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
