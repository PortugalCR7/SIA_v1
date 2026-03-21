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
  image?: any;
}

export default function SplitLeftSection({
  sectionLabel = "Do You Recognize This?",
  heading,
  body,
  items = [],
  image,
}: SplitLeftSectionProps) {
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Parallax: image moves at 0.85x scroll speed
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

  // Staggered reveal for numbered items: each staggers by 80ms
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
            }, idx * 80);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="split">
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
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/20" />
        {/* Mobile: gradient overlay on bottom for compositional transition */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F0EBE3] to-transparent md:hidden z-[3]" />
      </div>

      <div className="bg-cream flex flex-col justify-center px-8 md:px-16 xl:px-24 section-py">
        <p className="reveal overline text-ink/40 font-bold mb-10 flex items-center gap-6">
          <span className="rule-gold w-10" />
          {sectionLabel}
        </p>
        <SplitHeading className="font-heading text-ink mb-10 text-balance font-bold"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }} stagger={60} baseDelay={80}>
          {heading}
        </SplitHeading>
        {body && (
          <p className="reveal delay-2 font-body text-[1.125rem] text-ink/70 leading-relaxed mb-12 max-w-xl font-medium">
            {body}
          </p>
        )}

        <div className="space-y-0 max-w-xl">
          {items.map(({ num, label, body: itemBody }, i) => (
            <div
              key={num}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="reveal split-left-item flex items-start gap-8 py-8 border-b border-ink/[0.1] group cursor-default"
            >
              <span className="font-heading text-ink/20 text-3xl leading-none shrink-0 mt-1 select-none group-hover:text-ink/40 transition-colors duration-300">{num}</span>
              <div className="split-left-item-content relative">
                <span className="split-left-gold-line" />
                <p className="font-heading text-[1.5rem] text-ink mb-2 font-bold split-left-title">{label}</p>
                <p className="font-body text-[0.9375rem] text-ink/50 leading-relaxed font-medium split-left-body">{itemBody}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
