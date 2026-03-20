"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import FAQAccordion from "@/components/FAQAccordion";

// ── REVEAL HOOK ────────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-fade, .stat-line");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ── NAV ────────────────────────────────────────────────────────────────────────
function Nav() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      el.classList.toggle("nav-solid", window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={ref}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 py-6 transition-all duration-500 backdrop-blur-sm"
    >
      <span className="overline text-parchment/80 tracking-[0.32em]">
        Soul Initiation Academy
      </span>
      <a
        href="#apply"
        className="overline btn-fill px-7 py-3 border border-parchment/35 text-parchment/75 hover:text-ink hover:border-parchment transition-colors duration-300 cursor-pointer"
        style={{ "--tw-bg-opacity": "1" } as React.CSSProperties}
      >
        <span
          className="absolute inset-0 bg-parchment"
          style={{ transform: "translateX(-102%)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
          aria-hidden
        />
        <span className="relative z-10">Apply Now</span>
      </a>
    </nav>
  );
}

// ── MARQUEE TICKER ─────────────────────────────────────────────────────────────
function Marquee() {
  const items = [
    "Soul Initiation Academy",
    "Cross the Threshold",
    "Six Months · Cohort of 8",
    "April 2026",
    "Application Required",
    "A Guided Crossing",
    "Not a Course. A Rite of Passage.",
  ];
  const repeated = [...items, ...items];

  return (
    <div className="bg-ink py-4 overflow-hidden border-y border-parchment/[0.06]">
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span key={i} className="overline text-parchment/50 mx-10 whitespace-nowrap">
            {item}
            <span className="ml-10 text-gold opacity-60">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── HERO ───────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Full-bleed background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-mountain.png"
          alt="A lone figure stands above the clouds at the threshold"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/40 to-ink/95" />
      </div>

      <Nav />

      {/* Content — bottom-anchored */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-6 md:px-14 pb-20 md:pb-28 pt-40">
        <p className="reveal overline text-parchment/45 mb-8 flex items-center gap-4">
          <span className="rule-gold" />
          Soul Initiation Academy · April 2026
        </p>

        <h1 className="reveal delay-1 font-heading text-parchment leading-[1.02] text-balance mb-10"
          style={{ fontSize: "clamp(3.25rem, 7.5vw, 7.5rem)" }}>
          You&apos;ve Done<br className="hidden md:block" /> the Work.
          <em className="block font-light italic text-parchment/70" style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)" }}>
            But Something in You Knows<br className="hidden md:block" /> You Haven&apos;t Crossed Yet.
          </em>
        </h1>

        <div className="reveal delay-2 flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10">
          <a
            href="#apply"
            className="btn-fill group font-body text-[10px] tracking-[0.28em] uppercase px-10 py-4 bg-parchment text-ink active:scale-[0.98] transition-transform duration-200 cursor-pointer"
          >
            <span className="absolute inset-0 bg-gold-lt" style={{ transform: "translateX(-102%)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }} aria-hidden />
            <span className="relative z-10 flex items-center gap-3">
              Begin Your Application
              <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
            </span>
          </a>
          <p className="overline text-parchment/35">
            Cohort of 8&nbsp;&nbsp;·&nbsp;&nbsp;6 Months&nbsp;&nbsp;·&nbsp;&nbsp;Application Required
          </p>
        </div>
      </div>

      <Marquee />
    </section>
  );
}

// ── SPLIT SECTION (image left, text right) ────────────────────────────────────
function SplitLeft() {
  return (
    <section className="split">
      {/* Image */}
      <div className="split-img relative min-h-[70vw] md:min-h-0">
        <Image
          src="/images/ritual.png"
          alt="A solitary figure in the ancient forest — a threshold passage"
          fill
          className="object-cover object-center"
          sizes="(max-width: 767px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/10" />
      </div>

      {/* Text */}
      <div className="bg-cream flex flex-col justify-center px-8 md:px-16 xl:px-20 section-py">
        <p className="reveal overline text-sage/70 mb-8 flex items-center gap-4">
          <span className="rule-gold" />
          Do You Recognize This?
        </p>
        <h2 className="reveal delay-1 font-heading text-ink mb-8 text-balance"
          style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)" }}>
          There are moments when something begins to shift beneath the surface.
        </h2>
        <p className="reveal delay-2 font-body text-[0.9375rem] text-ink/60 leading-relaxed mb-10 max-w-lg">
          From the outside, things may still look intact. But internally, the structure that once held you no longer quite does — and you know it, even if you can&apos;t yet name it.
        </p>

        <div className="space-y-0 max-w-lg">
          {[
            { num: "01", label: "You've outgrown something", body: "A way of working, relating, or living that once fit — and no longer does." },
            { num: "02", label: "Something larger is asking to move through you", body: "A sense of pull or pressure that isn't anxiety — it's calling." },
            { num: "03", label: "You're between identities", body: "Without language for where you are — but knowing you can't go back." },
            { num: "04", label: "You're not looking to be convinced", body: "You already feel this. You're trying to understand what to do with it." },
          ].map(({ num, label, body }, i) => (
            <div
              key={num}
              className={`reveal delay-${i + 1} flex items-start gap-6 py-6 border-b border-ink/[0.07] group cursor-default`}
            >
              <span className="font-heading text-gold/40 text-2xl leading-none shrink-0 mt-1 select-none group-hover:text-gold/70 transition-colors duration-300">
                {num}
              </span>
              <div>
                <p className="font-heading text-[1.125rem] text-ink mb-1 group-hover:text-sage transition-colors duration-300">{label}</p>
                <p className="font-body text-[0.8125rem] text-ink/50 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── THRESHOLD STATEMENT (dark section full-width) ─────────────────────────────
function ThresholdStatement() {
  return (
    <section className="bg-ink section-py px-6 md:px-14 relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(164,140,106,0.07)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <p className="reveal overline text-sage mb-10 flex items-center gap-4">
          <span className="rule-gold opacity-60" />
          This Is Not Confusion
        </p>

        {/* Giant statement */}
        <div className="mb-20 md:mb-28">
          <h2 className="reveal delay-1 font-heading text-parchment leading-[1.0] mb-0"
            style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}>
            It&apos;s a
          </h2>
          <h2 className="reveal delay-2 font-heading text-gold leading-[0.95] text-balance"
            style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)", fontStyle: "italic" }}>
            Threshold.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <div className="reveal delay-3">
            <p className="font-heading text-[1.5rem] md:text-[1.875rem] text-parchment/85 italic leading-snug mb-5">
              &ldquo;A genuine life threshold is not a problem to be solved. It is a passage to be moved through.&rdquo;
            </p>
            <p className="font-body text-[0.875rem] text-parchment/45 leading-relaxed">
              In traditional cultures, these crossings were marked, held, and guided. In modern life, they rarely are — and so the threshold is endured rather than entered.
            </p>
          </div>

          <div className="reveal delay-4 space-y-0">
            <p className="font-body text-[0.875rem] text-parchment/40 mb-6 leading-relaxed">
              Without a structure to hold a real threshold, it collapses into:
            </p>
            {[
              { label: "Prolonged uncertainty", body: "The waiting stretches without forward movement." },
              { label: "Looping reflection", body: "The same questions cycling without resolution." },
              { label: "Quiet stagnation", body: "Not because something is wrong — but because something real is happening without being named." },
            ].map(({ label, body }, i) => (
              <div key={i} className="flex items-start gap-5 py-5 border-b border-parchment/[0.07]">
                <span className="font-heading text-gold/60 text-xl leading-none shrink-0 mt-0.5">—</span>
                <div>
                  <p className="font-body text-[0.8125rem] text-parchment/75 font-medium mb-0.5">{label}</p>
                  <p className="font-body text-[0.8125rem] text-parchment/40 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SPLIT RIGHT (image right, text left) ──────────────────────────────────────
function SplitRight() {
  return (
    <section className="split">
      {/* Text */}
      <div className="bg-parchment flex flex-col justify-center px-8 md:px-16 xl:px-20 section-py order-2 md:order-1">
        <p className="reveal overline text-sage/70 mb-8 flex items-center gap-4">
          <span className="rule-gold" />
          The Soul Initiation Program
        </p>
        <h2 className="reveal delay-1 font-heading text-ink mb-5 text-balance"
          style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)" }}>
          A structured threshold.
        </h2>
        <p className="reveal delay-2 font-body text-[0.9375rem] text-ink/60 leading-relaxed mb-12 max-w-lg">
          A six-month container — not a course, not a retreat, not coaching. A rite of passage. A lived crossing from one version of your life to another.
        </p>

        {/* This Is / This Is Not */}
        <div className="grid grid-cols-2 gap-0 max-w-lg reveal delay-3">
          <div className="bg-ink/[0.04] border border-ink/[0.07] p-6">
            <p className="overline text-sage/60 mb-5">This is not</p>
            <div className="space-y-3">
              {["A course or curriculum", "Coaching or therapy", "A peak experience or retreat", "A guaranteed outcome"].map((t) => (
                <div key={t} className="flex items-start gap-2.5">
                  <span className="text-ink/25 mt-0.5 text-sm leading-none shrink-0">×</span>
                  <p className="font-body text-[0.8125rem] text-ink/50 leading-relaxed">{t}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-ink p-6">
            <p className="overline text-sage mb-5">This is</p>
            <div className="space-y-3">
              {["A rite of passage", "A guided crossing", "A space for identity to shift", "Lived, structured, supported"].map((t) => (
                <div key={t} className="flex items-start gap-2.5">
                  <span className="text-gold/70 text-lg mt-0.5 leading-none shrink-0 font-heading">—</span>
                  <p className="font-body text-[0.8125rem] text-parchment/65 leading-relaxed">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="split-img relative min-h-[70vw] md:min-h-0 order-1 md:order-2">
        <Image
          src="/images/ceremony.png"
          alt="A sacred ceremony — hands holding earth"
          fill
          className="object-cover object-center"
          sizes="(max-width: 767px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-ink/10" />
      </div>
    </section>
  );
}

// ── PROCESS ────────────────────────────────────────────────────────────────────
function Process() {
  const phases = [
    { num: "I",   name: "Separation", body: "Stepping back from the structures, identities, and roles that shaped your life — creating space for something new to emerge." },
    { num: "II",  name: "Descent",    body: "Developing a living relationship with a deeper layer of intelligence — what this work calls Soul. Learning to listen to what has been speaking beneath the noise." },
    { num: "III", name: "Threshold",  body: "A one-day solo ceremony in nature — the SoulQuest — marking the actual crossing. A moment held by the earth, the silence, and the work that came before." },
    { num: "IV",  name: "Return",     body: "Re-entering your life with a different orientation — and learning, with support, how to actually live from it in the day-to-day." },
  ];

  return (
    <section className="bg-cream section-py px-6 md:px-14">
      <div className="max-w-5xl mx-auto">
        <p className="reveal overline text-sage/70 mb-10 flex items-center gap-4">
          <span className="rule-gold" />
          How It Works
        </p>
        <h2 className="reveal delay-1 font-heading text-ink mb-4 text-balance"
          style={{ fontSize: "clamp(2.25rem, 5vw, 4.25rem)" }}>
          The Arc of Initiation
        </h2>
        <p className="reveal delay-2 font-body text-[0.9375rem] text-ink/55 max-w-2xl mb-16 md:mb-20 leading-relaxed">
          The program follows a time-tested structure drawn from the deep logic of rites of passage — adapted for the conditions of contemporary life.
        </p>

        <div>
          {phases.map(({ num, name, body }, i) => (
            <div
              key={num}
              className={`phase-row reveal delay-${i + 1} group relative grid md:grid-cols-[100px_200px_1fr] gap-4 md:gap-10 py-10 md:py-12 border-b border-ink/[0.07] items-start cursor-default overflow-hidden`}
            >
              {/* Ghost number */}
              <span className="phase-ghost absolute right-4 top-1/2 -translate-y-1/2 select-none hidden md:block">
                {num}
              </span>

              {/* Phase label */}
              <div className="pt-1.5">
                <p className="overline text-gold/60">{`Phase ${num}`}</p>
              </div>

              {/* Name */}
              <h3 className="font-heading text-[2rem] md:text-[2.5rem] text-ink group-hover:text-sage transition-colors duration-300 leading-none pt-0 md:pt-1">
                {name}
              </h3>

              {/* Body */}
              <p className="font-body text-[0.9375rem] text-ink/60 leading-relaxed max-w-xl">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── STATS / WHAT THIS REQUIRES ────────────────────────────────────────────────
function WhatThisRequires() {
  const details = [
    { label: "Duration",          value: "6 Months",     note: "April through September 2026" },
    { label: "Time / Week",       value: "4–6 Hours",    note: "Sessions, practice, and integration" },
    { label: "Group Sessions",    value: "12 Live",      note: "Via Zoom — recordings available" },
    { label: "1:1 Mentoring",     value: "12 Sessions",  note: "One-on-one support throughout" },
    { label: "The SoulQuest",     value: "1 Day Solo",   note: "A threshold ceremony in nature" },
    { label: "Integration",       value: "Built In",     note: "Guided preparation and return support" },
  ];

  return (
    <section className="bg-ink section-py px-6 md:px-14 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_60%,rgba(164,140,106,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <p className="reveal overline text-sage mb-10 flex items-center gap-4">
          <span className="rule-gold opacity-60" />
          What This Requires
        </p>
        <h2 className="reveal delay-1 font-heading text-parchment mb-4 text-balance"
          style={{ fontSize: "clamp(2.25rem, 5vw, 4.25rem)" }}>
          This work asks something real of you.
        </h2>
        <p className="reveal delay-2 font-body text-[0.9375rem] text-parchment/45 max-w-2xl mb-16 md:mb-20 leading-relaxed">
          In time, presence, and willingness to meet what is genuinely unfolding. It is not designed to be fit into the margins.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
          {details.map(({ label, value, note }, i) => (
            <div
              key={label}
              className={`stat-line reveal delay-${i + 1} pr-8 pb-10`}
            >
              <p className="overline text-sage mb-3">{label}</p>
              <p className="font-heading text-parchment leading-tight mb-1.5"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
                {value}
              </p>
              <p className="font-body text-[0.8125rem] text-parchment/35 leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── WHO IT'S FOR ──────────────────────────────────────────────────────────────
function WhoItsFor() {
  return (
    <section className="split">
      {/* Image */}
      <div className="split-img relative min-h-[70vw] md:min-h-0">
        <Image
          src="/images/mountain-vista.png"
          alt="A figure at the summit — the moment of crossing"
          fill
          className="object-cover object-center"
          sizes="(max-width: 767px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/15" />
      </div>

      {/* Text */}
      <div className="bg-cream flex flex-col justify-center px-8 md:px-16 xl:px-20 section-py">
        <p className="reveal overline text-sage/70 mb-8 flex items-center gap-4">
          <span className="rule-gold" />
          Who This Is For
        </p>
        <h2 className="reveal delay-1 font-heading text-ink mb-5 text-balance"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
          Not designed for everyone — and that&apos;s intentional.
        </h2>
        <p className="reveal delay-2 font-body text-[0.9375rem] text-ink/55 leading-relaxed mb-10 max-w-md">
          This program is for people at a particular kind of moment. If you recognize yourself here, that recognition matters.
        </p>

        <div className="space-y-0 max-w-lg reveal delay-3">
          {[
            "Sense that something in their life is shifting at a deeper level",
            "Have already done significant inner or outer work",
            "Are not looking for quick answers, but for real orientation",
            "Feel ready to engage something meaningful, even if it's uncertain",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 py-5 border-b border-ink/[0.07]">
              <span className="font-heading text-gold text-xl mt-0.5 leading-none shrink-0">—</span>
              <p className="font-body text-[0.875rem] text-ink/65 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── WHAT TENDS TO CHANGE ──────────────────────────────────────────────────────
function Outcomes() {
  const changes = [
    { label: "Clearer direction",           body: "A growing sense of what you are oriented toward — even when the full path is still unfolding." },
    { label: "Decisions that hold",         body: "Choices that feel less tentative, rooted in something more stable than mood or circumstance." },
    { label: "A living relationship with depth", body: "An ongoing, felt connection with a deeper layer of intelligence — not as an idea, but something you can access." },
    { label: "Life gathering around a new center", body: "What was ambiguous becomes more legible — not because everything is resolved, but because you are no longer relating to your life in the same way." },
  ];

  return (
    <section className="bg-parchment section-py px-6 md:px-14">
      <div className="max-w-5xl mx-auto">
        <p className="reveal overline text-sage/70 mb-10 flex items-center gap-4">
          <span className="rule-gold" />
          What Tends to Change
        </p>
        <h2 className="reveal delay-1 font-heading text-ink mb-5 text-balance"
          style={{ fontSize: "clamp(2.25rem, 5vw, 4.25rem)" }}>
          The reorganization is felt from the inside out.
        </h2>
        <p className="reveal delay-2 font-body text-[0.9375rem] text-ink/55 max-w-2xl mb-16 leading-relaxed">
          There is no moment where everything is suddenly resolved. But something fundamental shifts — and over time, that shift becomes visible in how you live.
        </p>

        <div className="grid md:grid-cols-2 gap-0">
          {changes.map(({ label, body }, i) => (
            <div
              key={i}
              className={`reveal delay-${i + 1} group border-t border-ink/[0.07] pt-8 pb-10 md:pr-16 cursor-default`}
            >
              <div className="flex items-center gap-0 mb-4 overflow-hidden">
                <span className="w-0 h-px bg-gold group-hover:w-10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 mr-0 group-hover:mr-4" />
                <h3 className="font-heading text-[1.625rem] md:text-[2rem] text-ink group-hover:text-sage transition-colors duration-300 leading-tight">
                  {label}
                </h3>
              </div>
              <p className="font-body text-[0.875rem] text-ink/50 leading-relaxed transition-all duration-500 group-hover:pl-14">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── GUIDES ────────────────────────────────────────────────────────────────────
function Guides() {
  return (
    <section className="bg-ink section-py px-6 md:px-14 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div>
            <p className="reveal overline text-sage mb-10 flex items-center gap-4">
              <span className="rule-gold opacity-60" />
              Your Guides
            </p>
            <h2 className="reveal delay-1 font-heading text-parchment mb-8"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}>
              Accompanied,<br />
              <em className="italic text-gold">not led.</em>
            </h2>
            <div className="space-y-5 reveal delay-2">
              <p className="font-body text-[0.9375rem] text-parchment/55 leading-relaxed">
                Each guide has crossed similar terrain themselves. This is not mentorship from a distance — it is presence offered from experience.
              </p>
              <p className="font-body text-[0.9375rem] text-parchment/55 leading-relaxed">
                Their role is not to provide answers or to accelerate your crossing — but to help you stay in relationship with what is genuinely unfolding, especially where it would be easier to turn away.
              </p>
            </div>
          </div>

          {/* Pull quote */}
          <div className="reveal delay-3 border-l-[2px] border-gold/40 pl-8 md:pl-10">
            <p className="font-heading text-[1.5rem] md:text-[1.875rem] text-parchment/80 italic leading-snug mb-6">
              &ldquo;This is not about authority. It is about presence, discernment, and steadiness in the work — offered by people who have earned it through their own passage.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <span className="rule-gold opacity-40" />
              <p className="overline text-parchment/30">Soul Initiation Academy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
function Testimonials() {
  const quotes = [
    { q: "I didn't need more insight. I needed a way to move.", a: "Program Participant, 2024" },
    { q: "Something in my life finally shifted — from the root, not the surface.", a: "Program Participant, 2024" },
    { q: "It gave me a way to stay with what I was already sensing, instead of bypassing it.", a: "Program Participant, 2025" },
  ];

  return (
    <section className="bg-cream section-py px-6 md:px-14">
      <div className="max-w-5xl mx-auto">
        <p className="reveal overline text-sage/70 mb-10 flex items-center gap-4">
          <span className="rule-gold" />
          What Participants Have Said
        </p>
        <h2 className="reveal delay-1 font-heading text-ink mb-16 md:mb-20"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
          Words from the threshold
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map(({ q, a }, i) => (
            <div
              key={i}
              className={`t-card reveal delay-${i + 1} bg-parchment p-8 md:p-10 border border-ink/[0.06]`}
            >
              <span className="font-heading text-[4rem] text-gold/20 leading-none block mb-3 select-none" aria-hidden>
                &ldquo;
              </span>
              <p className="font-heading text-[1.25rem] md:text-[1.375rem] text-ink/85 italic leading-[1.35] mb-8">
                {q}
              </p>
              <div className="flex items-center gap-3">
                <span className="rule-gold opacity-35" />
                <p className="overline text-ink/35">{a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── OFFER / APPLICATION ───────────────────────────────────────────────────────
function Offer() {
  const steps = [
    { n: "01", label: "Submit your application",      body: "A short form to help us understand where you are and what is calling you forward." },
    { n: "02", label: "Receive the full program guide", body: "Complete details on structure, schedule, practices, and the SoulQuest ceremony." },
    { n: "03", label: "Optional conversation",         body: "If you'd like to explore whether this is the right fit before deciding." },
    { n: "04", label: "Invitation to join",            body: "If the program aligns, you'll receive an invitation to confirm your place." },
  ];

  return (
    <section id="apply" className="bg-parchment section-py px-6 md:px-14">
      <div className="max-w-5xl mx-auto">
        <p className="reveal overline text-sage/70 mb-10 flex items-center gap-4">
          <span className="rule-gold" />
          Investment &amp; Application
        </p>
        <h2 className="reveal delay-1 font-heading text-ink mb-4"
          style={{ fontSize: "clamp(2.25rem, 5vw, 4.25rem)" }}>
          Soul Initiation Program
        </h2>
        <p className="reveal delay-2 font-body text-[0.9375rem] text-ink/55 mb-16 leading-relaxed">
          April through September 2026&nbsp;·&nbsp;6–12 participants&nbsp;·&nbsp;Application required
        </p>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Steps */}
          <div className="reveal delay-3 bg-cream p-8 md:p-12 shadow-[0_2px_40px_-8px_rgba(24,24,15,0.07)]">
            <h3 className="font-heading text-[1.875rem] text-ink mb-8">What the next step looks like</h3>
            <div>
              {steps.map(({ n, label, body }, i) => (
                <div key={n} className="flex items-start gap-6 py-5 border-b border-ink/[0.07]">
                  <p className="font-heading text-gold/45 text-[1.5rem] shrink-0 leading-none mt-0.5">{i + 1}</p>
                  <div>
                    <p className="font-body text-[0.875rem] text-ink font-medium mb-1">{label}</p>
                    <p className="font-body text-[0.8125rem] text-ink/45 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Investment card */}
          <div className="reveal delay-4 bg-ink p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-[0_4px_40px_-8px_rgba(0,0,0,0.35)]">
            {/* Corner arcs ornament */}
            <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.05] pointer-events-none">
              <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="160" cy="0" r="120" stroke="#A48C6A" strokeWidth="1" />
                <circle cx="160" cy="0" r="80"  stroke="#A48C6A" strokeWidth="1" />
                <circle cx="160" cy="0" r="40"  stroke="#A48C6A" strokeWidth="1" />
              </svg>
            </div>

            <div>
              <p className="overline text-parchment/30 mb-5">Investment</p>
              <p className="font-heading text-parchment leading-tight mb-3"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
                Founding Cohort Rate
              </p>
              <div className="h-px bg-gradient-to-r from-gold/40 to-transparent my-5" />
              <p className="font-body text-[0.8125rem] text-parchment/35 mb-6">Payment plans available upon request.</p>
              <p className="font-body text-[0.875rem] text-parchment/50 leading-relaxed mb-10">
                This is a serious commitment — both financially and personally. The founding cohort rate reflects the real value of the work and the intimacy of the container.
              </p>
            </div>

            <a
              href="mailto:apply@soulinitiationacademy.com"
              className="btn-fill group font-body text-[10px] tracking-[0.28em] uppercase px-8 py-4 bg-parchment text-ink active:scale-[0.98] transition-transform duration-200 cursor-pointer justify-center"
            >
              <span className="absolute inset-0 bg-gold-lt" style={{ transform: "translateX(-102%)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }} aria-hidden />
              <span className="relative z-10 flex items-center gap-3">
                Begin Your Application
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FAQ() {
  return (
    <section className="bg-cream section-py px-6 md:px-14">
      <div className="max-w-3xl mx-auto">
        <p className="reveal overline text-sage/70 mb-10 flex items-center gap-4">
          <span className="rule-gold" />
          Questions
        </p>
        <h2 className="reveal delay-1 font-heading text-ink mb-16"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
          What you might be wondering
        </h2>
        <div className="reveal delay-2">
          <FAQAccordion />
        </div>
      </div>
    </section>
  );
}

// ── FINAL CTA ─────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section id="apply-form" className="relative py-44 md:py-60 px-6 md:px-14 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/mountain-vista.png"
          alt="The threshold"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_40%,rgba(164,140,106,0.08)_0%,transparent_65%)]" />
      </div>

      {/* Top ornament */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0">
        <div className="w-px h-14 bg-gradient-to-b from-transparent to-gold/30" />
        <span className="font-heading text-gold/30 text-xl rotate-45">◆</span>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="reveal overline text-sage mb-10 flex items-center justify-center gap-4">
          <span className="rule-gold opacity-50" />
          The Threshold Is Here
          <span className="rule-gold opacity-50" />
        </p>

        <h2 className="reveal delay-1 font-heading text-parchment leading-[1.02] mb-8 text-balance"
          style={{ fontSize: "clamp(2.75rem, 7vw, 6rem)" }}>
          If You Recognize Yourself in This, You May Already Be at the Threshold.
        </h2>

        <p className="reveal delay-2 font-body text-[0.9375rem] text-parchment/55 leading-relaxed mb-4 max-w-xl mx-auto">
          This work is designed precisely for the moment you are in — when something real is happening and you need more than another framework.
        </p>
        <p className="reveal delay-3 font-body text-[0.9375rem] text-parchment/55 leading-relaxed mb-14 max-w-xl mx-auto">
          The April 2026 cohort is small by design. If this speaks to something in you, the application is the first step.
        </p>

        <div className="reveal delay-4 flex flex-col items-center gap-6">
          <a
            href="mailto:apply@soulinitiationacademy.com"
            className="btn-fill group font-body text-[10px] tracking-[0.28em] uppercase px-12 py-5 bg-parchment text-ink active:scale-[0.98] transition-transform duration-200 cursor-pointer"
          >
            <span className="absolute inset-0 bg-gold-lt" style={{ transform: "translateX(-102%)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }} aria-hidden />
            <span className="relative z-10 flex items-center gap-3">
              Begin Your Application
              <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
            </span>
          </a>
          <p className="overline text-parchment/25">April 2026&nbsp;·&nbsp;6–12 Participants&nbsp;·&nbsp;Application Required</p>
        </div>
      </div>

      {/* Bottom ornament */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0">
        <span className="font-heading text-gold/30 text-xl rotate-45">◆</span>
        <div className="w-px h-14 bg-gradient-to-b from-gold/30 to-transparent" />
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-ink py-10 px-6 md:px-14 border-t border-parchment/[0.05]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <span className="rule-gold opacity-35" />
          <span className="overline text-parchment/30">Soul Initiation Academy</span>
        </div>
        <p className="font-body text-[10px] text-parchment/18 tracking-wider">
          © 2026 Soul Initiation Academy&nbsp;·&nbsp;All rights reserved
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a key={l} href={l === "Contact" ? "mailto:hello@soulinitiationacademy.com" : "#"}
              className="overline text-parchment/22 hover:text-parchment/55 transition-colors">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ── REVEAL BRIDGE ─────────────────────────────────────────────────────────────
function RevealBridge() { useReveal(); return null; }

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <RevealBridge />
      <Hero />
      <SplitLeft />
      <ThresholdStatement />
      <SplitRight />
      <Process />
      <WhatThisRequires />
      <WhoItsFor />
      <Outcomes />
      <Guides />
      <Testimonials />
      <Offer />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
