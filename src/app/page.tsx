"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";
import FAQAccordion from "@/components/FAQAccordion";

// ── SCROLL REVEAL HOOK ─────────────────────────────────────────────────────────
function useReveal() {
  const observe = useCallback(() => {
    const revealEls = document.querySelectorAll(".reveal, .reveal-fade, .stat-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
    return observer;
  }, []);

  useEffect(() => {
    const observer = observe();
    return () => observer.disconnect();
  }, [observe]);
}

// ── NAV ────────────────────────────────────────────────────────────────────────
function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onScroll = () => {
      if (window.scrollY > 60) {
        nav.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("nav-scrolled");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .nav-scrolled {
          background: rgba(38, 49, 36, 0.92) !important;
          padding-top: 1rem !important;
          padding-bottom: 1rem !important;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
      `}</style>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 backdrop-blur-md transition-all duration-500"
      >
        <div className="flex items-center gap-3">
          <span className="gold-rule hidden md:block" />
          <span className="font-body text-[10px] tracking-[0.38em] text-pure-white/80 uppercase select-none">
            Soul Initiation Academy
          </span>
        </div>
        <a
          href="#apply"
          className="cursor-pointer font-body text-[10px] tracking-[0.22em] uppercase px-6 py-2.5 border border-pure-white/40 text-pure-white/75 relative overflow-hidden group transition-colors duration-300 hover:text-obsidian-moss hover:border-pure-white"
        >
          <span className="absolute inset-0 bg-pure-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          <span className="relative z-10">Apply Now</span>
        </a>
      </nav>
    </>
  );
}

// ── HERO ───────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background image with parallax feel */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-mountain.png"
          alt="A lone figure stands at the threshold above the clouds"
          fill
          className="object-cover object-center scale-[1.04]"
          priority
          sizes="100vw"
        />
        {/* Multi-stop gradient for depth & legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-moss/75 via-obsidian-moss/30 via-[55%] to-obsidian-moss/92" />
        {/* Subtle vignette edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(38,49,36,0.45)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pb-24 md:pb-36 w-full">
        <p className="section-label text-linen-mist/50 mb-8 reveal delay-100">
          <span className="gold-rule opacity-60" />
          Soul Initiation Academy
        </p>
        <h1 className="font-heading text-[clamp(2.75rem,7vw,5.5rem)] text-pure-white leading-[1.03] mb-8 max-w-4xl text-balance reveal delay-200">
          You&apos;ve Done the Work. But Something in You Knows You Haven&apos;t Crossed Yet.
        </h1>
        <p className="font-body text-base md:text-[1.0625rem] text-linen-mist/70 max-w-lg mb-14 leading-relaxed tracking-wide reveal delay-300">
          A six-month initiation for people at a real threshold in their life — not seeking more insight, but a way to move through.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 reveal delay-400">
          <a
            href="#apply"
            className="cursor-pointer group inline-flex items-center gap-3 font-body text-[10px] tracking-[0.28em] uppercase px-10 py-4 bg-pure-white text-obsidian-moss relative overflow-hidden active:scale-[0.98] transition-transform duration-200"
          >
            <span className="absolute inset-0 bg-linen-mist translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <span className="relative z-10 flex items-center gap-3">
              Begin Your Application
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </span>
          </a>
          <p className="font-body text-[10px] tracking-[0.22em] text-linen-mist/40 uppercase">
            Begins April 2026&nbsp;·&nbsp;Small cohort (6–12)&nbsp;·&nbsp;Application required
          </p>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warm-gold/20 to-transparent" />
    </section>
  );
}

// ── DO YOU RECOGNIZE THIS? ──────────────────────────────────────────────────
function Recognition() {
  return (
    <section className="bg-linen-mist section-padding px-6 md:px-12 noise-overlay">
      <div className="max-w-5xl mx-auto relative z-10">
        <p className="section-label text-dried-sage/80 mb-10 reveal">
          <span className="gold-rule" />
          Do You Recognize This?
        </p>
        <h2 className="font-heading text-[clamp(2.25rem,5vw,3.85rem)] text-obsidian-moss leading-[1.06] mb-10 max-w-3xl reveal delay-100">
          There are moments in life when something begins to shift beneath the surface.
        </h2>
        <p className="font-body text-[0.9375rem] text-obsidian-moss/65 max-w-2xl mb-16 leading-relaxed reveal delay-200">
          From the outside, things may still look intact. But internally, the structure that once held you no longer quite does — and you know it, even if you can&apos;t yet name it.
        </p>

        <div className="space-y-0">
          {[
            {
              label: "You've outgrown something",
              body: "A way of working, relating, or living that once fit — and no longer does.",
            },
            {
              label: "Something larger is asking to move through you",
              body: "A sense of pull or pressure that isn't anxiety — it's calling.",
            },
            {
              label: "You're between identities",
              body: "Clarity in some areas, but a lack of orientation in others — without language for where you are.",
            },
            {
              label: "You're not looking to be convinced",
              body: "You already feel this. You're trying to understand what to do with it.",
            },
          ].map(({ label, body }, i) => (
            <div
              key={i}
              className={`flex items-start gap-6 md:gap-10 py-7 border-b border-obsidian-moss/[0.07] group cursor-default reveal delay-${(i + 1) * 100}`}
            >
              <span
                className="font-heading text-[clamp(2rem,3.5vw,2.75rem)] text-warm-gold opacity-30 leading-none shrink-0 select-none group-hover:opacity-60 transition-opacity duration-300"
                aria-hidden="true"
              >
                0{i + 1}
              </span>
              <div className="pt-1">
                <p className="font-heading text-[1.25rem] md:text-[1.4375rem] text-obsidian-moss mb-1 leading-snug group-hover:text-dried-sage transition-colors duration-300">
                  {label}
                </p>
                <p className="font-body text-[0.875rem] text-obsidian-moss/55 leading-relaxed">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── THIS IS NOT CONFUSION. IT'S A THRESHOLD. ───────────────────────────────
function Threshold() {
  return (
    <section className="bg-obsidian-moss section-padding px-6 md:px-12 noise-overlay relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-warm-gold/[0.04] blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <p className="section-label text-dried-sage mb-10 reveal">
          <span className="gold-rule opacity-70" />
          This Is Not Confusion
        </p>
        <h2 className="font-heading text-[clamp(2.25rem,5vw,3.85rem)] text-pure-white leading-[1.06] mb-20 max-w-3xl reveal delay-100">
          It&apos;s a Threshold.
        </h2>

        <div className="grid md:grid-cols-2 gap-14 md:gap-24">
          <div className="reveal delay-200">
            <div className="flex items-center gap-3 mb-7">
              <span className="font-body text-[10px] tracking-[0.3em] text-dried-sage uppercase">What a threshold actually is</span>
            </div>
            <p className="font-heading text-[1.5rem] text-pure-white/90 leading-snug mb-5 italic">
              &ldquo;A genuine life threshold is not a problem to be solved. It is a passage to be moved through.&rdquo;
            </p>
            <p className="font-body text-[0.875rem] text-pure-white/55 leading-relaxed">
              In traditional cultures, these crossings were marked, held, and guided. In modern life, they rarely are.
            </p>
          </div>

          <div className="reveal delay-300">
            <div className="flex items-center gap-3 mb-7">
              <span className="font-body text-[10px] tracking-[0.3em] text-dried-sage uppercase">What happens without structure</span>
            </div>
            <p className="font-body text-[0.875rem] text-pure-white/55 leading-relaxed mb-8">
              Without a container to hold a real threshold, it tends to collapse into something more familiar but far less generative:
            </p>
            <div className="space-y-0">
              {[
                {
                  label: "Prolonged uncertainty",
                  body: "The waiting stretches without a sense of forward movement.",
                },
                {
                  label: "Looping reflection",
                  body: "The same questions cycling without resolution or relief.",
                },
                {
                  label: "Quiet stagnation",
                  body: "Not because something is wrong — but because something real is happening without being named.",
                },
              ].map(({ label, body }, i) => (
                <div
                  key={i}
                  className="flex items-start gap-5 py-5 border-b border-pure-white/[0.07]"
                >
                  <span className="font-heading text-warm-gold text-lg mt-0.5 leading-none shrink-0 opacity-70">
                    —
                  </span>
                  <div>
                    <p className="font-body text-[0.8125rem] text-pure-white/80 font-medium mb-0.5 tracking-wide">
                      {label}
                    </p>
                    <p className="font-body text-[0.8125rem] text-pure-white/45 leading-relaxed">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── THE SOUL INITIATION PROGRAM ──────────────────────────────────────────────
function SoulInitiationProgram() {
  return (
    <section className="bg-linen-mist section-padding px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <p className="section-label text-dried-sage/80 mb-10 reveal">
          <span className="gold-rule" />
          The Soul Initiation Program
        </p>
        <h2 className="font-heading text-[clamp(2.25rem,5vw,3.85rem)] text-obsidian-moss leading-[1.06] mb-5 max-w-3xl reveal delay-100">
          A structured threshold.
        </h2>
        <p className="font-body text-[0.9375rem] text-obsidian-moss/65 max-w-2xl mb-16 leading-relaxed reveal delay-200">
          A six-month container designed to support a specific kind of transition: the reorganization of your life around a deeper center.
        </p>

        {/* This is / This is not */}
        <div className="grid md:grid-cols-2 gap-0 mb-20 reveal delay-300">
          <div className="bg-pure-white p-8 md:p-12 shadow-[0_1px_0_0_rgba(38,49,36,0.08),0_4px_24px_-8px_rgba(38,49,36,0.06)]">
            <p className="font-body text-[10px] tracking-[0.3em] text-dried-sage uppercase mb-8">
              This is not
            </p>
            <div className="space-y-5">
              {[
                "A course or curriculum",
                "Coaching or therapy",
                "A peak experience or retreat",
                "A defined path to a guaranteed outcome",
              ].map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <span className="font-body text-obsidian-moss/25 mt-0.5 leading-none shrink-0 text-base">
                    ×
                  </span>
                  <p className="font-body text-[0.875rem] text-obsidian-moss/55 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-obsidian-moss p-8 md:p-12 shadow-[0_1px_0_0_rgba(255,255,255,0.05),0_4px_24px_-8px_rgba(0,0,0,0.3)]">
            <p className="font-body text-[10px] tracking-[0.3em] text-dried-sage uppercase mb-8">
              This is
            </p>
            <div className="space-y-5">
              {[
                "A rite of passage",
                "A guided crossing",
                "A space where identity can shift — without being rushed or forced",
                "Lived, structured, and supported from beginning to end",
              ].map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <span className="font-heading text-warm-gold text-lg mt-0.5 leading-none shrink-0">
                    —
                  </span>
                  <p className="font-body text-[0.875rem] text-pure-white/70 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pull quote with thick left border */}
        <div className="max-w-2xl border-l-[3px] border-warm-gold pl-8 md:pl-10 reveal delay-400">
          <p className="font-heading text-[1.375rem] md:text-[1.625rem] text-obsidian-moss/80 leading-relaxed mb-5 italic">
            &ldquo;Most people are not lost. They are living from a structure that is no longer true.&rdquo;
          </p>
          <p className="font-body text-[0.875rem] text-obsidian-moss/55 leading-relaxed mb-4">
            You could call it a kind of mistaken identity. The issue isn&apos;t a lack of insight — you likely have plenty of that. The issue is that your life is still organized around something you&apos;ve already outgrown.
          </p>
          <p className="font-body text-[0.875rem] text-obsidian-moss/55 leading-relaxed">
            Initiation is what allows that structure to loosen — and something more aligned to take its place. Not by force, and not through more understanding alone, but through a process that works at the level where the structure actually lives.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── PROCESS ────────────────────────────────────────────────────────────────────
function Process() {
  const phases = [
    {
      phase: "Phase I",
      num: "I",
      name: "Separation",
      description:
        "Stepping back from the structures, identities, and roles that have shaped your life — creating the necessary space for something new to emerge.",
    },
    {
      phase: "Phase II",
      num: "II",
      name: "Descent",
      description:
        "Developing a living relationship with a deeper layer of intelligence — what this work calls Soul. Learning to listen to what has been speaking beneath the noise.",
    },
    {
      phase: "Phase III",
      num: "III",
      name: "Threshold",
      description:
        "A one-day solo ceremony in nature — the SoulQuest — marking the actual crossing. A moment held by the earth, the silence, and the work that came before.",
    },
    {
      phase: "Phase IV",
      num: "IV",
      name: "Return",
      description:
        "Re-entering your life with a different orientation — and learning, with support, how to actually live from it in the day-to-day.",
    },
  ];

  return (
    <section className="bg-obsidian-moss/[0.035] section-padding px-6 md:px-12 noise-overlay">
      <div className="max-w-5xl mx-auto relative z-10">
        <p className="section-label text-dried-sage/80 mb-10 reveal">
          <span className="gold-rule" />
          How It Works
        </p>
        <h2 className="font-heading text-[clamp(2.25rem,5vw,3.85rem)] text-obsidian-moss leading-[1.06] mb-5 max-w-2xl reveal delay-100">
          The Arc of Initiation
        </h2>
        <p className="font-body text-[0.9375rem] text-obsidian-moss/60 max-w-2xl mb-16 leading-relaxed reveal delay-200">
          The program follows a time-tested structure drawn from the deep logic of rites of passage — adapted for the conditions of contemporary life. Each phase builds on the one before it.
        </p>

        <div className="space-y-0">
          {phases.map(({ phase, num, name, description }, i) => (
            <div
              key={phase}
              className={`relative grid md:grid-cols-[200px_1fr] gap-4 md:gap-16 py-10 border-b border-obsidian-moss/[0.08] group cursor-default overflow-hidden reveal delay-${(i + 1) * 100}`}
            >
              {/* Large ghost number */}
              <span
                className="phase-number absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              >
                {num}
              </span>

              <div className="pt-1">
                <p className="font-body text-[10px] tracking-[0.3em] text-dried-sage uppercase mb-3">
                  {phase}
                </p>
                <h3 className="font-heading text-[2rem] md:text-[2.5rem] text-obsidian-moss group-hover:text-dried-sage transition-colors duration-300 leading-tight">
                  {name}
                </h3>
              </div>
              <p className="font-body text-[0.9375rem] text-obsidian-moss/65 leading-relaxed max-w-xl self-center">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── WHAT THIS REQUIRES ──────────────────────────────────────────────────────
function WhatThisRequires() {
  const details = [
    { label: "Duration", value: "6 months", note: "April through September 2026" },
    { label: "Time Commitment", value: "4–6 hrs / week", note: "Sessions, practice, and integration" },
    { label: "Group Sessions", value: "12 live", note: "Via Zoom — recordings available" },
    { label: "1:1 Mentoring", value: "12 sessions", note: "One-on-one support throughout" },
    { label: "The SoulQuest", value: "One day solo", note: "A threshold ceremony held in nature" },
    { label: "Integration", value: "Built in", note: "Guided preparation and ongoing return support" },
  ];

  return (
    <section className="bg-obsidian-moss section-padding px-6 md:px-12 noise-overlay relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_50%,rgba(196,168,130,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <p className="section-label text-dried-sage mb-10 reveal">
          <span className="gold-rule opacity-70" />
          What This Requires
        </p>
        <h2 className="font-heading text-[clamp(2.25rem,5vw,3.85rem)] text-pure-white leading-[1.06] mb-5 max-w-2xl reveal delay-100">
          This work asks something real of you.
        </h2>
        <p className="font-body text-[0.9375rem] text-pure-white/55 max-w-2xl mb-16 leading-relaxed reveal delay-200">
          In time, presence, and willingness to engage what is genuinely unfolding. It is not designed to be fit into the margins. It asks to be met.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
          {details.map(({ label, value, note }, i) => (
            <div
              key={label}
              className={`stat-card md:pr-10 reveal delay-${(i + 1) * 100}`}
            >
              <p className="font-body text-[10px] tracking-[0.3em] text-dried-sage uppercase mb-3">
                {label}
              </p>
              <p className="font-heading text-[2rem] md:text-[2.375rem] text-pure-white mb-1.5 leading-tight">
                {value}
              </p>
              <p className="font-body text-[0.8125rem] text-pure-white/40 leading-relaxed">
                {note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── WHO IT'S FOR ───────────────────────────────────────────────────────────────
function WhoItsFor() {
  return (
    <section className="bg-linen-mist section-padding px-6 md:px-12 noise-overlay">
      <div className="max-w-5xl mx-auto relative z-10">
        <p className="section-label text-dried-sage/80 mb-10 reveal">
          <span className="gold-rule" />
          Who This Is For
        </p>
        <h2 className="font-heading text-[clamp(2.25rem,5vw,3.85rem)] text-obsidian-moss leading-[1.06] mb-5 max-w-3xl reveal delay-100">
          This program is not designed for everyone — and that&apos;s intentional.
        </h2>
        <p className="font-body text-[0.9375rem] text-obsidian-moss/60 max-w-2xl mb-16 leading-relaxed reveal delay-200">
          It is designed for people at a particular kind of moment. If you recognize yourself here, that recognition matters.
        </p>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Tends to be a fit */}
          <div className="bg-pure-white p-8 md:p-12 shadow-[0_2px_40px_-8px_rgba(38,49,36,0.08)] reveal delay-300">
            <p className="font-body text-[10px] tracking-[0.3em] text-dried-sage uppercase mb-8">
              This tends to be a fit for people who:
            </p>
            <div className="space-y-0">
              {[
                "Sense that something in their life is shifting at a deeper level",
                "Have already done significant inner or outer work",
                "Are not looking for quick answers, but for real orientation",
                "Feel ready to engage something meaningful, even if it's uncertain",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 py-5 border-b border-obsidian-moss/[0.07]"
                >
                  <span className="font-heading text-warm-gold text-xl mt-0.5 leading-none shrink-0">
                    —
                  </span>
                  <p className="font-body text-[0.875rem] text-obsidian-moss/70 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Likely not a fit */}
          <div className="bg-obsidian-moss/[0.05] border border-obsidian-moss/[0.07] p-8 md:p-12 reveal delay-400">
            <p className="font-body text-[10px] tracking-[0.3em] text-dried-sage uppercase mb-8">
              This is likely not a fit if you:
            </p>
            <div className="space-y-0">
              {[
                "Are primarily seeking clarity without willingness to change",
                "Want a defined outcome or guaranteed transformation",
                "Are not in a place to make real space for this level of engagement",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 py-5 border-b border-obsidian-moss/[0.07]"
                >
                  <span className="font-body text-obsidian-moss/30 mt-0.5 leading-none shrink-0 text-base">
                    ×
                  </span>
                  <p className="font-body text-[0.875rem] text-obsidian-moss/50 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── WHAT TENDS TO CHANGE ────────────────────────────────────────────────────
function WhatTendsToChange() {
  const changes = [
    {
      label: "Clearer direction",
      body: "A growing sense of what you are oriented toward — even when the full path is still unfolding.",
    },
    {
      label: "Decisions that hold",
      body: "Choices that feel less tentative, less revisited — rooted in something more stable than mood or circumstance.",
    },
    {
      label: "A living relationship with depth",
      body: "An ongoing, felt connection with a deeper layer of intelligence — not as an idea, but as something you can actually access.",
    },
    {
      label: "Life gathering around a new center",
      body: "What was previously ambiguous becomes more legible — not because everything is resolved, but because you are no longer relating to your life in the same way.",
    },
  ];

  return (
    <section className="bg-obsidian-moss/[0.035] section-padding px-6 md:px-12 noise-overlay">
      <div className="max-w-5xl mx-auto relative z-10">
        <p className="section-label text-dried-sage/80 mb-10 reveal">
          <span className="gold-rule" />
          What Tends to Change
        </p>
        <h2 className="font-heading text-[clamp(2.25rem,5vw,3.85rem)] text-obsidian-moss leading-[1.06] mb-5 max-w-3xl reveal delay-100">
          The changes that come through initiation are not always dramatic from the outside.
        </h2>
        <p className="font-body text-[0.9375rem] text-obsidian-moss/60 max-w-2xl mb-16 leading-relaxed reveal delay-200">
          There is no moment where everything is suddenly clear or resolved. But something fundamental reorganizes — and over time, that reorganization becomes visible in how you live.
        </p>

        <div className="grid md:grid-cols-2 gap-0">
          {changes.map(({ label, body }, i) => (
            <div
              key={i}
              className={`border-t border-obsidian-moss/[0.08] pt-8 pb-10 md:pr-14 group cursor-default reveal delay-${(i + 1) * 100}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-0 h-px bg-warm-gold group-hover:w-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0" />
                <h3 className="font-heading text-[1.625rem] md:text-[2rem] text-obsidian-moss leading-tight group-hover:text-dried-sage transition-colors duration-300">
                  {label}
                </h3>
              </div>
              <p className="font-body text-[0.875rem] text-obsidian-moss/55 leading-relaxed pl-0 group-hover:pl-11 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── YOU ARE ACCOMPANIED, NOT LED ────────────────────────────────────────────
function Accompanied() {
  return (
    <section className="bg-obsidian-moss section-padding px-6 md:px-12 noise-overlay relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-warm-gold/[0.035] blur-[120px] pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <p className="section-label text-dried-sage mb-10 reveal">
          <span className="gold-rule opacity-70" />
          Your Guides
        </p>
        <h2 className="font-heading text-[clamp(2.25rem,5vw,3.85rem)] text-pure-white leading-[1.06] mb-16 max-w-2xl reveal delay-100">
          You Are Accompanied, Not Led.
        </h2>

        <div className="grid md:grid-cols-[1fr_auto] gap-16 items-start">
          <div className="max-w-2xl space-y-5 reveal delay-200">
            <p className="font-body text-[0.9375rem] text-pure-white/60 leading-relaxed">
              Each guide in this program has crossed similar terrain themselves. This is not mentorship offered from a distance — it is presence offered from experience. They know what it is to not yet know where you are headed, and to stay in the process anyway.
            </p>
            <p className="font-body text-[0.9375rem] text-pure-white/60 leading-relaxed">
              Their role is not to provide answers or to accelerate your crossing. It is to help you stay in relationship with what is genuinely unfolding — especially at the points where it would be easier to turn away, collapse into certainty, or retreat to familiar ground.
            </p>
            <p className="font-body text-[0.9375rem] text-pure-white/60 leading-relaxed">
              This is not about authority. It is about presence, discernment, and steadiness in the work — offered by people who have earned it through their own passage.
            </p>
          </div>

          {/* Decorative ornament */}
          <div className="hidden md:flex flex-col items-center gap-4 opacity-20 reveal delay-300">
            <div className="w-px h-24 bg-gradient-to-b from-transparent to-warm-gold" />
            <span className="font-heading text-warm-gold text-3xl rotate-45">◆</span>
            <div className="w-px h-24 bg-gradient-to-b from-warm-gold to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ───────────────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    {
      quote: "I didn't need more insight. I needed a way to move.",
      attr: "Program Participant, 2024",
    },
    {
      quote: "Something in my life finally shifted — from the root, not the surface.",
      attr: "Program Participant, 2024",
    },
    {
      quote: "It gave me a way to stay with what I was already sensing, instead of bypassing it.",
      attr: "Program Participant, 2025",
    },
  ];

  return (
    <section className="bg-linen-mist section-padding px-6 md:px-12 noise-overlay">
      <div className="max-w-5xl mx-auto relative z-10">
        <p className="section-label text-dried-sage/80 mb-10 reveal">
          <span className="gold-rule" />
          What Participants Have Said
        </p>
        <h2 className="font-heading text-[clamp(2rem,4.5vw,3.25rem)] text-obsidian-moss leading-[1.06] mb-16 max-w-xl reveal delay-100">
          Words from the threshold
        </h2>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map(({ quote, attr }, i) => (
            <div
              key={i}
              className={`testimonial-card p-8 md:p-10 border border-obsidian-moss/[0.07] reveal delay-${(i + 1) * 100}`}
            >
              <span
                className="font-heading text-[4rem] text-warm-gold leading-none block mb-3 opacity-25 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="font-heading text-[1.25rem] md:text-[1.375rem] text-obsidian-moss/85 leading-[1.35] italic mb-8">
                {quote}
              </p>
              <div className="flex items-center gap-3">
                <span className="gold-rule opacity-40" />
                <p className="font-body text-[10px] tracking-[0.25em] text-obsidian-moss/35 uppercase">
                  {attr}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── INVESTMENT & APPLICATION ───────────────────────────────────────────────────
function Offer() {
  const steps = [
    {
      step: "01",
      label: "Submit your application",
      body: "A short form to help us understand where you are and what is calling you forward.",
    },
    {
      step: "02",
      label: "Receive the full program guide",
      body: "Complete details on structure, schedule, practices, and the SoulQuest ceremony.",
    },
    {
      step: "03",
      label: "Optional conversation",
      body: "If you'd like to explore whether this is the right fit before deciding.",
    },
    {
      step: "04",
      label: "Invitation to join",
      body: "If the program aligns, you'll receive an invitation to confirm your place in the cohort.",
    },
  ];

  return (
    <section
      id="apply"
      className="bg-obsidian-moss/[0.035] section-padding px-6 md:px-12 noise-overlay"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <p className="section-label text-dried-sage/80 mb-10 reveal">
          <span className="gold-rule" />
          Investment &amp; Application
        </p>
        <h2 className="font-heading text-[clamp(2.25rem,5vw,3.85rem)] text-obsidian-moss leading-[1.06] mb-4 max-w-2xl reveal delay-100">
          Soul Initiation Program
        </h2>
        <p className="font-body text-[0.9375rem] text-obsidian-moss/60 mb-16 max-w-2xl leading-relaxed reveal delay-200">
          April through September 2026&nbsp;·&nbsp;6–12 participants&nbsp;·&nbsp;Application required
        </p>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Next steps */}
          <div className="bg-pure-white p-8 md:p-12 shadow-[0_2px_40px_-8px_rgba(38,49,36,0.07)] reveal delay-300">
            <h3 className="font-heading text-[1.625rem] text-obsidian-moss mb-8">
              What the next step looks like
            </h3>
            <div className="space-y-0">
              {steps.map(({ step, label, body }, i) => (
                <div
                  key={step}
                  className="flex items-start gap-6 py-5 border-b border-obsidian-moss/[0.07]"
                >
                  <p className="font-heading text-[1.25rem] text-warm-gold/50 shrink-0 mt-0.5 leading-none w-7">
                    {i + 1}
                  </p>
                  <div>
                    <p className="font-body text-[0.875rem] text-obsidian-moss font-medium mb-1 tracking-wide">
                      {label}
                    </p>
                    <p className="font-body text-[0.8125rem] text-obsidian-moss/50 leading-relaxed">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Investment */}
          <div className="bg-obsidian-moss p-8 md:p-12 flex flex-col justify-between shadow-[0_4px_40px_-8px_rgba(0,0,0,0.3)] reveal delay-400 relative overflow-hidden">
            {/* Corner ornament */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.04]">
              <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="128" cy="0" r="96" stroke="#A89070" strokeWidth="1" fill="none"/>
                <circle cx="128" cy="0" r="60" stroke="#A89070" strokeWidth="1" fill="none"/>
              </svg>
            </div>

            <div>
              <p className="font-body text-[10px] tracking-[0.3em] text-linen-mist/35 uppercase mb-5">
                Investment
              </p>
              <p className="font-heading text-[2rem] md:text-[2.5rem] text-pure-white mb-3 leading-tight">
                Founding Cohort Rate
              </p>
              <div className="h-px bg-gradient-to-r from-warm-gold/40 to-transparent mb-5" />
              <p className="font-body text-[0.8125rem] text-pure-white/40 mb-7">
                Payment plans available upon request.
              </p>
              <p className="font-body text-[0.875rem] text-pure-white/55 leading-relaxed mb-10">
                This is a serious commitment — both financially and personally. The founding cohort rate reflects the real value of the work and the intimacy of the container.
              </p>
            </div>
            <a
              href="mailto:apply@soulinitiationacademy.com"
              className="cursor-pointer group flex items-center justify-center gap-3 font-body text-[10px] tracking-[0.28em] uppercase px-8 py-4 bg-pure-white text-obsidian-moss relative overflow-hidden active:scale-[0.98] transition-transform duration-200"
            >
              <span className="absolute inset-0 bg-linen-mist translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
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
    <section className="bg-linen-mist section-padding px-6 md:px-12 noise-overlay">
      <div className="max-w-3xl mx-auto relative z-10">
        <p className="section-label text-dried-sage/80 mb-10 reveal">
          <span className="gold-rule" />
          Questions
        </p>
        <h2 className="font-heading text-[clamp(2rem,4.5vw,3.25rem)] text-obsidian-moss leading-[1.06] mb-16 reveal delay-100">
          What you might be wondering
        </h2>
        <div className="reveal delay-200">
          <FAQAccordion />
        </div>
      </div>
    </section>
  );
}

// ── FINAL CTA ──────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section
      id="apply-form"
      className="relative py-40 md:py-56 px-6 md:px-12 overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-mountain.png"
          alt="The threshold"
          fill
          className="object-cover object-center scale-[1.06]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-obsidian-moss/88" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_40%,rgba(196,168,130,0.06)_0%,transparent_60%)]" />
      </div>

      {/* Top decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-warm-gold/30" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="section-label justify-center text-dried-sage mb-10 reveal">
          <span className="gold-rule opacity-60" />
          The Threshold Is Here
          <span className="gold-rule opacity-60" />
        </p>
        <h2 className="font-heading text-[clamp(2.75rem,7vw,5rem)] text-pure-white leading-[1.03] mb-8 text-balance reveal delay-100">
          If You Recognize Yourself in This, You May Already Be at the Threshold.
        </h2>
        <p className="font-body text-[0.9375rem] text-pure-white/60 leading-relaxed mb-5 max-w-lg mx-auto reveal delay-200">
          This work is designed precisely for the moment you are in — when something real is happening and you need more than another framework to understand it. You need a structure capable of holding the actual crossing.
        </p>
        <p className="font-body text-[0.9375rem] text-pure-white/60 leading-relaxed mb-14 max-w-lg mx-auto reveal delay-300">
          The April 2026 cohort is small by design. If this speaks to something in you, the application is the first step.
        </p>

        <div className="flex flex-col items-center gap-6 reveal delay-400">
          <a
            href="mailto:apply@soulinitiationacademy.com"
            className="cursor-pointer group inline-flex items-center gap-3 font-body text-[10px] tracking-[0.28em] uppercase px-12 py-5 bg-pure-white text-obsidian-moss relative overflow-hidden active:scale-[0.98] transition-transform duration-200"
          >
            <span className="absolute inset-0 bg-linen-mist translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <span className="relative z-10 flex items-center gap-3">
              Begin Your Application
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </span>
          </a>
          <p className="font-body text-[10px] text-pure-white/30 tracking-[0.22em] uppercase">
            April 2026&nbsp;·&nbsp;6–12 Participants&nbsp;·&nbsp;Application Required
          </p>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-warm-gold/30 to-transparent" />
    </section>
  );
}

// ── FOOTER ─────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-obsidian-moss py-10 px-6 md:px-12 border-t border-pure-white/[0.05]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <span className="gold-rule opacity-40" />
          <span className="font-body text-[10px] tracking-[0.38em] text-pure-white/35 uppercase">
            Soul Initiation Academy
          </span>
        </div>
        <p className="font-body text-[10px] text-pure-white/20 tracking-wider">
          © 2026 Soul Initiation Academy&nbsp;·&nbsp;All rights reserved
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms"].map((link) => (
            <a
              key={link}
              href="#"
              className="font-body text-[10px] text-pure-white/25 hover:text-pure-white/55 transition-colors tracking-[0.2em] uppercase"
            >
              {link}
            </a>
          ))}
          <a
            href="mailto:hello@soulinitiationacademy.com"
            className="font-body text-[10px] text-pure-white/25 hover:text-pure-white/55 transition-colors tracking-[0.2em] uppercase"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── REVEAL ORCHESTRATOR ────────────────────────────────────────────────────────
function RevealProvider() {
  useReveal();
  return null;
}

// ── PAGE ───────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <RevealProvider />
      <Nav />
      <Hero />
      <Recognition />
      <Threshold />
      <SoulInitiationProgram />
      <Process />
      <WhatThisRequires />
      <WhoItsFor />
      <WhatTendsToChange />
      <Accompanied />
      <Testimonials />
      <Offer />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
