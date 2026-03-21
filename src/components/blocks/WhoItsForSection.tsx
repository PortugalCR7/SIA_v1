"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface WhoItem {
  text: string;
}

interface WhoItsForSectionProps {
  sectionLabel?: string;
  heading: string;
  items?: WhoItem[];
  image?: any;
}

export default function WhoItsForSection({
  sectionLabel = "Who This Is For",
  heading,
  items = [],
  image,
}: WhoItsForSectionProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [dashActive, setDashActive] = useState<boolean[]>(items.map(() => false));

  useEffect(() => {
    setDashActive(items.map(() => false));
  }, [items.length]);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((_, i) =>
            setTimeout(() => {
              setDashActive((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 140)
          );
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    io.observe(container);
    return () => io.disconnect();
  }, [items.length]);

  return (
    <section className="split">
      <div className="split-img relative min-h-[70vw] md:min-h-0 img-grain">
        <Image src="/images/brand-reference.png" alt="Soul Initiation — brand reference" fill className="object-cover img-warm" sizes="(max-width: 767px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/20" />
      </div>
      <div className="bg-cream flex flex-col justify-center px-8 md:px-16 xl:px-24 section-py">
        <p className="reveal overline text-ink/40 font-bold mb-10 flex items-center gap-6"><span className="rule-gold w-10" />{sectionLabel}</p>
        <h2 className="reveal delay-1 font-heading text-ink mb-8 font-bold" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: "1.05" }}>
          {heading.split("\n")[0] ?? heading}
          {heading.split("\n")[1] && (
            <>
              <br />
              <em className="italic font-bold">{heading.split("\n")[1]}</em>
            </>
          )}
        </h2>
        <div ref={listRef} className="space-y-0 max-w-xl reveal delay-3">
          {items.map(({ text }, i) => (
            <div key={i} className="flex items-start gap-6 py-6 border-b border-ink/[0.1]">
              <span
                className="font-heading text-2xl mt-0.5 leading-none shrink-0 transition-colors duration-700"
                style={{ color: dashActive[i] ? "var(--gold)" : "rgba(0,0,0,0.15)" }}
              >
                {"\u2014"}
              </span>
              <p className="font-body text-[1rem] text-ink font-bold leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
