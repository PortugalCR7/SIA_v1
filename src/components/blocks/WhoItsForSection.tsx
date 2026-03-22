"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface WhoItem {
  text: string;
}

interface WhoItsForSectionProps {
  sectionLabel?: string;
  heading: string;
  body?: string;
  fitsHeading?: string;
  items?: WhoItem[];
  notFitHeading?: string;
  notFitItems?: WhoItem[];
  image?: unknown;
}

export default function WhoItsForSection({
  sectionLabel = "Who This Is For",
  heading,
  body,
  fitsHeading,
  items = [],
  notFitHeading,
  notFitItems = [],
  image,
}: WhoItsForSectionProps) {
  const fitsRef = useRef<HTMLDivElement>(null);
  const notFitRef = useRef<HTMLDivElement>(null);

  const [fitsActive, setFitsActive] = useState<boolean[]>(items.map(() => false));
  const [notFitActive, setNotFitActive] = useState<boolean[]>(notFitItems.map(() => false));

  useEffect(() => { setFitsActive(items.map(() => false)); }, [items]);
  useEffect(() => { setNotFitActive(notFitItems.map(() => false)); }, [notFitItems]);

  useEffect(() => {
    const el = fitsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((_, i) =>
            setTimeout(() => setFitsActive((p) => { const n = [...p]; n[i] = true; return n; }), i * 140)
          );
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [items]);

  useEffect(() => {
    const el = notFitRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          notFitItems.forEach((_, i) =>
            setTimeout(() => setNotFitActive((p) => { const n = [...p]; n[i] = true; return n; }), i * 140)
          );
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [notFitItems]);

  const imgSrc =
    image && typeof image === "object" && "url" in (image as object)
      ? (image as { url: string }).url
      : "/images/brand-reference.png";
  const imgAlt =
    image && typeof image === "object" && "alt" in (image as object)
      ? (image as { alt: string }).alt
      : "Soul Initiation — Who This Is For";

  return (
    <section className="split">
      {/* ── Image pane ─────────────────────────────────────────── */}
      <div className="split-img relative min-h-[70vw] md:min-h-0 img-grain">
        <Image
          src={imgSrc}
          alt={imgAlt}
          fill
          className="object-cover img-warm"
          sizes="(max-width: 767px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/20" />
      </div>

      {/* ── Content pane ───────────────────────────────────────── */}
      <div className="bg-cream flex flex-col justify-center px-8 md:px-16 xl:px-24 section-py">

        {/* Overline — JetBrains Mono / uppercase / tracked */}
        <p className="reveal overline text-ink/40 font-bold mb-10 flex items-center gap-6">
          <span className="rule-gold w-10" />
          {sectionLabel}
        </p>

        {/* Primary heading — Cormorant 700, second line italic */}
        <h2
          className="reveal delay-1 font-heading text-ink font-bold mb-8"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: "1.05" }}
        >
          {heading.split("\n")[0] ?? heading}
          {heading.split("\n")[1] && (
            <>
              <br />
              <em className="italic font-normal">{heading.split("\n")[1]}</em>
            </>
          )}
        </h2>

        {/* Intro body — Jost 400, contemplative paragraph */}
        {body && (
          <p
            className="reveal delay-2 font-body text-ink/65 max-w-lg mb-10"
            style={{ fontSize: "clamp(0.9375rem, 1.35vw, 1.0625rem)", lineHeight: "1.7" }}
          >
            {body}
          </p>
        )}

        {/* Section divider */}
        <div
          className="reveal delay-2 mb-10"
          style={{ height: "1px", backgroundColor: "rgba(181,168,152,0.45)", maxWidth: "28rem" }}
        />

        {/* ── Fits group ─────────────────────────────────────── */}
        {(fitsHeading || items.length > 0) && (
          <div className="mb-10">
            {/* Fits sub-heading — Cormorant italic, whisper-weight label */}
            {fitsHeading && (
              <p
                className="reveal delay-3 font-heading italic text-ink/45 mb-4"
                style={{ fontSize: "clamp(0.8125rem, 1.05vw, 0.9375rem)", letterSpacing: "0.025em" }}
              >
                {fitsHeading}
              </p>
            )}

            {/* Fit items — full presence: gold dashes, ink text, 1.125rem */}
            <div ref={fitsRef} className="max-w-xl reveal delay-3">
              {items.map(({ text }, i) => (
                <div
                  key={i}
                  className="flex items-start gap-6 py-5 border-b"
                  style={{ borderColor: "rgba(181,168,152,0.35)" }}
                >
                  <span
                    className="font-heading italic text-2xl mt-0.5 leading-none shrink-0 transition-colors duration-700"
                    style={{ color: fitsActive[i] ? "var(--gold)" : "rgba(0,0,0,0.1)" }}
                  >
                    &mdash;
                  </span>
                  {/* Cormorant italic — items read as recognitions, not requirements */}
                  <p className="font-heading italic font-normal text-ink leading-[1.55]"
                     style={{ fontSize: "clamp(1rem, 1.6vw, 1.125rem)" }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Not-fits group — muted, honest, subordinate ──────── */}
        {(notFitHeading || notFitItems.length > 0) && (
          <div className="mt-2">
            {/* Visual breath before the "not a fit" group */}
            <div
              className="reveal delay-4 mb-8"
              style={{ height: "1px", backgroundColor: "rgba(181,168,152,0.22)", maxWidth: "28rem" }}
            />

            {/* Not-fits sub-heading — more receded than fits heading */}
            {notFitHeading && (
              <p
                className="reveal delay-4 font-heading italic text-ink/35 mb-4"
                style={{ fontSize: "clamp(0.8125rem, 1.05vw, 0.9375rem)", letterSpacing: "0.025em" }}
              >
                {notFitHeading}
              </p>
            )}

            {/* Not-fit items — dimmer dashes, muted text, smaller scale */}
            <div ref={notFitRef} className="max-w-xl reveal delay-4">
              {notFitItems.map(({ text }, i) => (
                <div
                  key={i}
                  className="flex items-start gap-6 py-4 border-b"
                  style={{ borderColor: "rgba(181,168,152,0.18)" }}
                >
                  <span
                    className="font-heading italic text-xl mt-0.5 leading-none shrink-0 transition-colors duration-700"
                    style={{ color: notFitActive[i] ? "rgba(181,168,152,0.45)" : "rgba(0,0,0,0.07)" }}
                  >
                    &mdash;
                  </span>
                  {/* Slightly smaller, ink/55 — not a dismissal, a disclosure */}
                  <p
                    className="font-heading italic font-normal text-ink/55 leading-[1.55]"
                    style={{ fontSize: "clamp(0.9375rem, 1.45vw, 1.0625rem)" }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
