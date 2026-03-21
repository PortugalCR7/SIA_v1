"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitHeading from "@/components/SplitHeading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface NotItem {
  text: string;
}

interface IsItem {
  text: string;
}

interface SplitRightSectionProps {
  sectionLabel?: string;
  heading: string;
  body?: string;
  notItems?: NotItem[];
  isItems?: IsItem[];
  image?: any;
}

export default function SplitRightSection({
  sectionLabel = "The Soul Initiation Program",
  heading,
  body,
  notItems = [],
  isItems = [],
  image,
}: SplitRightSectionProps) {
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Parallax — matches SplitLeft ritual.png treatment
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

  // Comparison grid: × items appear → strikethroughs draw → — items reveal
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const notItemEls = Array.from(grid.querySelectorAll<HTMLElement>(".not-item"));
    const strikes = Array.from(grid.querySelectorAll<HTMLElement>(".strike-line"));
    const isItemEls = Array.from(grid.querySelectorAll<HTMLElement>(".is-item"));

    // Pre-hide — items before ScrollTrigger fires
    gsap.set(isItemEls, { opacity: 0, x: 16 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: grid,
          start: "top 78%",
          once: true,
        },
      });

      // 1. Stagger in × items
      tl.from(notItemEls, {
        opacity: 0,
        y: 10,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out",
      });

      // 2. Draw strikethroughs left-to-right
      tl.to(
        strikes,
        {
          scaleX: 1,
          stagger: 0.12,
          duration: 0.35,
          ease: "power2.inOut",
          transformOrigin: "left center",
        },
        "-=0.05"
      );

      // 3. Reveal — items
      tl.to(
        isItemEls,
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out",
        },
        "+=0.08"
      );
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section className="split">
      <div
        style={{ backgroundColor: "#F0EBE3" }}
        className="flex flex-col justify-center px-8 md:px-16 xl:px-24 section-py order-2 md:order-1"
      >
        <p className="reveal overline text-ink/40 font-bold mb-10 flex items-center gap-6">
          <span className="rule-gold w-10" />
          {sectionLabel}
        </p>
        <SplitHeading className="font-heading text-ink mb-6 text-balance font-bold"
          style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }} stagger={70}>
          {heading}
        </SplitHeading>
        {body && (
          <p className="reveal delay-2 font-body text-[1.125rem] text-ink/70 leading-relaxed mb-14 max-w-xl font-medium">
            {body}
          </p>
        )}

        <div ref={gridRef} className="grid grid-cols-2 gap-0 max-w-xl border border-ink/[0.1]">
          {/* Left: This is not */}
          <div className="bg-cream p-8">
            <p className="overline text-ink/40 font-bold mb-6">This is not</p>
            <div className="space-y-4">
              {notItems.map(({ text }) => (
                <div key={text} className="not-item flex items-start gap-3">
                  <span className="text-ink/30 mt-0.5 text-lg leading-none shrink-0">{"\u00D7"}</span>
                  <p className="relative font-body text-[0.9375rem] text-ink/60 leading-relaxed font-medium">
                    {text}
                    <span
                      className="strike-line absolute left-0 top-1/2 h-[1.5px] w-full bg-ink/50 origin-left"
                      style={{ transform: "scaleX(0) translateY(-50%)" }}
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: This is */}
          <div className="bg-ink p-8">
            <p className="overline text-parchment/50 font-bold mb-6">This is</p>
            <div className="space-y-4">
              {isItems.map(({ text }) => (
                <div key={text} className="is-item flex items-start gap-3">
                  <span className="text-parchment/40 text-xl font-heading shrink-0">{"\u2014"}</span>
                  <p className="font-body text-[0.9375rem] text-parchment/80 leading-relaxed font-bold">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image with parallax */}
      <div
        ref={imgContainerRef}
        className="split-img relative min-h-[70vw] md:min-h-0 order-1 md:order-2 img-grain overflow-hidden"
      >
        <div ref={imgRef} className="absolute inset-[-15%] will-change-transform">
          <Image
            src="/images/ceremony.png"
            alt="A sacred ceremony"
            fill
            className="object-cover img-warm"
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-ink/20" />
      </div>
    </section>
  );
}
