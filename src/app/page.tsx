"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLoader from "@/components/PageLoader";
import ScrollIndicator from "@/components/ScrollIndicator";
import FAQAccordion from "@/components/FAQAccordion";
import SplitHeading from "@/components/SplitHeading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── REVEAL HOOK ────────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-fade, .stat-line");
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    els.forEach((el) => {
      io.observe(el);
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("in");
      }
    });

    return () => io.disconnect();
  }, []);
}

// ── NAV MONOGRAM (Threshold Arch) ────────────────────────────────────────────
function NavMonogram({ className = "", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 40 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M4 47V20C4 11.163 11.163 4 20 4C28.837 4 36 11.163 36 20V47"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M12 47V22C12 17.582 15.582 14 20 14C24.418 14 28 17.582 28 22V47"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
      <line x1="4" y1="47" x2="36" y2="47" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <circle cx="20" cy="8" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// ── NAV ────────────────────────────────────────────────────────────────────────
function Nav() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const isScrolled = window.scrollY > 80;
      el.classList.toggle("nav-solid", isScrolled);
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={ref}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 py-6 transition-[background-color,border-color] duration-500 backdrop-blur-md"
    >
      <a href="#" className="flex items-center gap-4 text-parchment no-underline">
        <NavMonogram className="w-7 h-auto" />
        <span className="overline text-parchment font-semibold tracking-[0.35em] hidden md:inline">
          Soul Initiation Academy
        </span>
      </a>
      <a
        href="#apply"
        className={`overline btn-fill px-8 py-3.5 border-b font-bold transition-[background-color,color,border-color] duration-500 cursor-pointer no-underline ${
          scrolled
            ? "bg-parchment text-ink border-parchment/30"
            : "border-parchment/30 text-parchment hover:text-ink hover:border-parchment"
        }`}
      >
        <span
          className="absolute inset-0 bg-parchment"
          style={{
            transform: scrolled ? "translateX(0)" : "translateX(-102%)",
            transition: "transform 0.5s var(--expo-out)",
          }}
          aria-hidden
        />
        <span className="relative z-10">Apply Now</span>
      </a>
    </nav>
  );
}

// ── MARQUEE TICKER ─────────────────────────────────────────────────────────────
function Marquee() {
  const row1 = [
    "Soul Initiation Academy",
    "Cross the Threshold",
    "Six Months \u00b7 Cohort of 8",
    "April 2026",
    "Application Required",
    "A Guided Crossing",
    "Not a Course. A Rite of Passage.",
  ];
  const row2 = [
    "Separation \u00b7 Descent \u00b7 Threshold \u00b7 Return",
    "The Work Beneath the Work",
    "Soul. Not Ego.",
    "Cohort VIII \u00b7 April MMXXVI",
    "What Cannot Be Rushed",
    "Witness. Hold. Guide.",
    "The Crossing Begins",
  ];

  return (
    <div className="bg-ink overflow-hidden border-y border-parchment/[0.06]">
      {/* Row 1 — forward, 50s */}
      <div className="py-3 overflow-hidden">
        <div className="marquee-track">
          {[...row1, ...row1].map((item, i) => (
            <span key={i} className="overline text-parchment/50 mx-10 whitespace-nowrap">
              {item}
              <span className="ml-10 text-gold opacity-60">&#x2726;</span>
            </span>
          ))}
        </div>
      </div>
      {/* Row 2 — reverse, 75s, dimmer */}
      <div className="py-3 overflow-hidden border-t border-parchment/[0.04]">
        <div className="marquee-track-reverse">
          {[...row2, ...row2].map((item, i) => (
            <span key={i} className="overline text-parchment/25 mx-10 whitespace-nowrap">
              {item}
              <span className="ml-10 text-gold opacity-30">&#x2726;</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── HERO HEADLINE (Cinematic Split Animation) ────────────────────────────────
function HeroHeadline() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 1900);
    return () => clearTimeout(timer);
  }, []);

  const subWords = "But Something in You Knows You Haven\u2019t Crossed Yet.".split(" ");

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
        You&apos;ve Done
      </span>
      <br className="hidden md:block" />
      <span
        className="inline-block"
        style={{
          clipPath: animate ? "inset(0 0 0 0)" : "inset(0 0 0 100%)",
          transition: "clip-path 1.2s cubic-bezier(0.16,1,0.3,1) 0.15s",
        }}
      >
        {" "}the Work.
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

// ── HERO STAT BAR ─────────────────────────────────────────────────────────────
function HeroStatBar() {
  return (
    <div className="hero-stat-bar flex items-center justify-start mt-14 mb-6">
      {[
        { label: "Cohort", value: "8" },
        { label: "Duration", value: "6 Months" },
        { label: "Begins", value: "April 2026" },
      ].map(({ label, value }, i) => (
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

// ── HERO ───────────────────────────────────────────────────────────────────────
function Hero() {
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

      <Nav />

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
          Soul Initiation Academy
        </p>

        <div ref={headlineRef} className="will-change-transform">
          <HeroHeadline />
        </div>

        <div
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          <a
            href="#apply"
            className="btn-fill group font-body text-[11px] tracking-[0.35em] uppercase px-12 py-5 bg-parchment text-ink active:scale-[0.98] transition-transform duration-200 cursor-pointer font-bold"
          >
            <span className="absolute inset-0 bg-gold-lt" style={{ transform: "translateX(-102%)", transition: "transform 0.5s var(--expo-out)" }} aria-hidden />
            <span className="relative z-10 flex items-center gap-4">
              Begin Your Application
              <span className="transition-transform duration-300 group-hover:translate-x-2">{"\u2192"}</span>
            </span>
          </a>

          <div ref={statBarRef} className="will-change-transform">
            <HeroStatBar />
          </div>
        </div>
      </div>

      <ScrollIndicator />
      <Marquee />
    </section>
  );
}

// ── SPLIT LEFT ────────────────────────────────────────────────────────────────
function SplitLeft() {
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
    const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!items.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = items.indexOf(entry.target as HTMLDivElement);
            setTimeout(() => {
              entry.target.classList.add("in");
            }, idx * 80);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const items = [
    { num: "01", label: "You\u2019ve outgrown something", body: "A way of living that once fit \u2014 and no longer does." },
    { num: "02", label: "Something larger is asking to move through you", body: "A sense of pressure that isn\u2019t anxiety \u2014 it\u2019s calling." },
    { num: "03", label: "You\u2019re between identities", body: "Without language for where you are \u2014 but knowing you can\u2019t go back." },
    { num: "04", label: "You\u2019re not looking to be convinced", body: "You already feel this. You\u2019re trying to understand what to do." },
  ];

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
          Do You Recognize This?
        </p>
        <SplitHeading className="font-heading text-ink mb-10 text-balance font-bold"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }} stagger={60} baseDelay={80}>
          There are moments when something begins to shift beneath the surface.
        </SplitHeading>
        <p className="reveal delay-2 font-body text-[1.125rem] text-ink/70 leading-relaxed mb-12 max-w-xl font-medium">
          From the outside, things may still look intact. But internally, the structure that once held you no longer quite does.
        </p>

        <div className="space-y-0 max-w-xl">
          {items.map(({ num, label, body }, i) => (
            <div
              key={num}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="reveal split-left-item flex items-start gap-8 py-8 border-b border-ink/[0.1] group cursor-default"
            >
              <span className="font-heading text-ink/20 text-3xl leading-none shrink-0 mt-1 select-none group-hover:text-ink/40 transition-colors duration-300">{num}</span>
              <div className="split-left-item-content relative">
                <span className="split-left-gold-line" />
                <p className="font-heading text-[1.5rem] text-ink mb-2 font-bold split-left-title">{label}</p>
                <p className="font-body text-[0.9375rem] text-ink/50 leading-relaxed font-medium split-left-body">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── THRESHOLD STATEMENT (SCROLL-PINNED CINEMATIC) ─────────────────────────────
function ThresholdStatement() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const wrapperHeight = wrapper.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const total = wrapperHeight - viewportHeight;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showItsA = progress > 0.05;
  const showThreshold = progress > 0.2;
  const showPulse = progress > 0.35;
  const showContent = progress > 0.5;
  const showContentRight = progress > 0.65;

  return (
    <div ref={wrapperRef} style={{ height: "200vh" }} className="relative">
      <section className="sticky top-0 h-screen bg-ink px-6 md:px-14 overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(255,255,255,0.07)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10 w-full">
          <p
            className="overline text-parchment/60 font-bold mb-12 flex items-center gap-6"
            style={{ opacity: showItsA ? 1 : 0, transform: showItsA ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s var(--expo), transform 0.7s var(--expo)" }}
          >
            <span className="rule-gold opacity-50 w-12" />
            This Is Not Confusion
          </p>

          <div className="mb-24 md:mb-32">
            <h2 className="font-heading text-parchment leading-[0.9] text-balance font-bold" style={{ fontSize: "clamp(4.5rem, 11vw, 11rem)" }}>
              <span
                className="inline-block"
                style={{ opacity: showItsA ? 1 : 0, transform: showItsA ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.7s var(--expo), transform 0.7s var(--expo)" }}
              >
                It&apos;s a{" "}
              </span>
              <em
                className="inline-block italic"
                style={{
                  color: showPulse ? "#C8B89A" : "var(--parchment)",
                  opacity: showThreshold ? 1 : 0,
                  transform: showThreshold ? "translateX(0)" : "translateX(80px)",
                  textShadow: showPulse ? "0 0 40px rgba(200,184,154,0.3)" : "none",
                  transition: "opacity 0.9s var(--expo), transform 0.9s var(--expo)",
                }}
              >
                Threshold.
              </em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div
              style={{ opacity: showContent ? 1 : 0, transform: showContent ? "translateY(0)" : "translateY(32px)", transition: "opacity 1s var(--expo), transform 1s var(--expo)" }}
            >
              <p className="font-heading text-[2.5rem] md:text-[3rem] text-parchment font-bold italic leading-tight mb-8">
                &ldquo;A genuine life threshold is not a problem to be solved. It is a passage to be moved through.&rdquo;
              </p>
              <p className="font-body text-[1rem] text-parchment/60 leading-relaxed font-medium">
                In traditional cultures, these crossings were marked, held, and guided. In modern life, they rarely are.
              </p>
            </div>
            <div
              className="space-y-0"
              style={{ opacity: showContentRight ? 1 : 0, transform: showContentRight ? "translateY(0)" : "translateY(32px)", transition: "opacity 1s var(--expo), transform 1s var(--expo)" }}
            >
              <p className="font-body text-[0.9375rem] text-parchment/50 mb-8 font-bold uppercase tracking-widest">The Modern Collapse:</p>
              {[
                { label: "Prolonged uncertainty", body: "The waiting stretches without forward movement." },
                { label: "Looping reflection", body: "The same questions cycling without resolution." },
                { label: "Quiet stagnation", body: "Something real is happening without being named." },
              ].map(({ label, body }, i) => (
                <div key={i} className="flex items-start gap-6 py-6 border-b border-parchment/[0.1]">
                  <span className="font-heading text-parchment/40 text-2xl leading-none shrink-0 mt-0.5">{"\u2014"}</span>
                  <div>
                    <p className="font-body text-[0.9375rem] text-parchment font-bold mb-1.5">{label}</p>
                    <p className="font-body text-[0.875rem] text-parchment/40 leading-relaxed font-medium">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── SPLIT RIGHT ───────────────────────────────────────────────────────────────
function SplitRight() {
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

    const notItems = Array.from(grid.querySelectorAll<HTMLElement>(".not-item"));
    const strikes = Array.from(grid.querySelectorAll<HTMLElement>(".strike-line"));
    const isItems = Array.from(grid.querySelectorAll<HTMLElement>(".is-item"));

    // Pre-hide — items before ScrollTrigger fires
    gsap.set(isItems, { opacity: 0, x: 16 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: grid,
          start: "top 78%",
          once: true,
        },
      });

      // 1. Stagger in × items
      tl.from(notItems, {
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
        isItems,
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
          The Soul Initiation Program
        </p>
        <SplitHeading className="font-heading text-ink mb-6 text-balance font-bold"
          style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }} stagger={70}>
          A structured threshold.
        </SplitHeading>
        <p className="reveal delay-2 font-body text-[1.125rem] text-ink/70 leading-relaxed mb-14 max-w-xl font-medium">
          A six-month container {"\u2014"} not a course, not a retreat, not coaching. A rite of passage.
        </p>

        <div ref={gridRef} className="grid grid-cols-2 gap-0 max-w-xl border border-ink/[0.1]">
          {/* Left: This is not */}
          <div className="bg-cream p-8">
            <p className="overline text-ink/40 font-bold mb-6">This is not</p>
            <div className="space-y-4">
              {["A course or curriculum", "Coaching or therapy", "A peak experience", "A guaranteed outcome"].map((t) => (
                <div key={t} className="not-item flex items-start gap-3">
                  <span className="text-ink/30 mt-0.5 text-lg leading-none shrink-0">{"\u00D7"}</span>
                  <p className="relative font-body text-[0.9375rem] text-ink/60 leading-relaxed font-medium">
                    {t}
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
              {["A rite of passage", "A guided crossing", "A space for identity shift", "Lived, structured"].map((t) => (
                <div key={t} className="is-item flex items-start gap-3">
                  <span className="text-parchment/40 text-xl font-heading shrink-0">{"\u2014"}</span>
                  <p className="font-body text-[0.9375rem] text-parchment/80 leading-relaxed font-bold">{t}</p>
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

// ── PROCESS (HORIZONTAL SCROLL) ──────────────────────────────────────────────
function Process() {
  const phases = [
    { num: "I",   name: "Separation", body: "Stepping back from the structures and roles that shaped your life." },
    { num: "II",  name: "Descent",    body: "Developing a living relationship with a deeper layer of intelligence \u2014 Soul." },
    { num: "III", name: "Threshold",  body: "A one-day solo ceremony in nature \u2014 the SoulQuest \u2014 marking the actual crossing." },
    { num: "IV",  name: "Return",     body: "Re-entering your life with a different orientation \u2014 and learning how to live from it." },
  ];

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
          opacity: 0.09, y: 0, scale: 1.04, duration: 2, stagger: 0.25, ease: "power2.out",
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

  if (isMobile) {
    return (
      <section className="bg-cream section-py px-6">
        <p className="reveal overline text-ink/40 font-bold mb-12 flex items-center gap-6">
          <span className="rule-gold w-10" />How It Works
        </p>
        <SplitHeading className="font-heading text-ink mb-6 text-balance font-bold"
          style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }} stagger={80} baseDelay={80}>
          The Arc of Initiation
        </SplitHeading>
        <p className="reveal delay-2 font-body text-[1.125rem] text-ink/50 max-w-3xl mb-16 leading-relaxed font-medium">
          adapted from the deep logic of rites of passage for contemporary life.
        </p>
        {phases.map(({ num, name, body }, i) => (
          <div key={num} className={`reveal delay-${i + 1} relative py-10 border-b border-ink/[0.1]`}>
            <p className="overline text-ink/30 font-bold mb-4">{`Phase ${num}`}</p>
            <h3 className="font-heading text-[2.5rem] text-ink mb-4 font-bold">{name}</h3>
            <p className="font-body text-[1rem] text-ink/70 leading-relaxed font-medium">{body}</p>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="arc-section bg-cream overflow-hidden relative">
      <div ref={trackRef} className="arc-track flex items-stretch relative" style={{ width: `${phases.length * 100}vw`, minHeight: "100vh" }}>
        <div className="absolute top-[55%] left-[6vw] pointer-events-none z-10" style={{ width: "calc(100% - 12vw)", height: "1px" }}>
          <div ref={connectorRef} className="w-full h-full origin-left" style={{ transform: "scaleX(0)", background: "linear-gradient(90deg, var(--gold) 0%, var(--gold-lt) 50%, var(--gold) 100%)", opacity: 0.35 }} />
        </div>
        {phases.map(({ num, name, body }) => (
          <div key={num} className="arc-panel relative flex flex-col justify-center px-[8vw]" style={{ width: "100vw", minHeight: "100vh" }}>
            <span className="phase-ghost-h absolute select-none pointer-events-none" style={{ right: "-8vw", top: "50%", transform: "translateY(-50%)", fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16rem, 30vw, 32rem)", fontWeight: 300, lineHeight: 0.8, color: "var(--ink)", opacity: 0, letterSpacing: "-0.06em" }}>{num}</span>
            <div className="absolute top-[55%] left-[6vw] -translate-y-1/2 z-20">
              <span className="relative inline-block">
                <span className="arc-node-ring absolute inset-0 rounded-full border border-gold pointer-events-none" style={{ opacity: 0, transformOrigin: "center" }} />
                <span className="arc-node block w-3 h-3 rounded-full border-2 border-ink/20 bg-cream transition-colors duration-500" style={{ transform: "scale(0.6)" }} />
              </span>
            </div>
            <div className="relative z-10 max-w-2xl">
              <p className="overline text-ink/30 font-bold mb-8">{`Phase ${num}`}</p>
              <h3 className="font-heading text-ink mb-8 font-bold" style={{ fontSize: "clamp(3rem, 5vw, 5rem)" }}>{name}</h3>
              <p className="font-body text-[1.0625rem] text-ink/70 leading-relaxed max-w-lg font-medium">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── WHAT THIS REQUIRES — helpers ─────────────────────────────────────────────
function getStatBorderClasses(i: number): string {
  // 6 items in a 2-col (mobile) / 3-col (desktop) grid
  const mobileRight   = i % 2 === 0;  // left col → right border
  const mobileBottom  = i < 4;         // rows 0-1 → bottom border
  const desktopRight  = i % 3 !== 2;  // not last col
  const desktopBottom = i < 3;         // row 0 only
  return [
    "border-parchment/10",
    mobileRight   ? "border-r"      : "",
    mobileBottom  ? "border-b"      : "",
    desktopRight  && !mobileRight   ? "md:border-r"   : "",
    !desktopRight  && mobileRight   ? "md:border-r-0" : "",
    desktopBottom && !mobileBottom  ? "md:border-b"   : "",
    !desktopBottom && mobileBottom  ? "md:border-b-0" : "",
  ].filter(Boolean).join(" ");
}

function StatCard({ label, value, note, index }: { label: string; value: string; note: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [displayNum, setDisplayNum] = useState(0);

  const match     = value.match(/^(\d+)([\s\S]*)$/);
  const targetNum = match ? parseInt(match[1], 10) : 0;
  const suffix    = match ? match[2] : "";
  const hasNumber = !!match && targetNum > 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !hasNumber) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayNum(targetNum);
      return;
    }
    const duration   = 1400;
    const startDelay = index * 100;
    let startTime: number | null = null;
    let frameId: number;
    const animate = (ts: number) => {
      if (startTime === null) startTime = ts;
      const elapsed  = ts - startTime - startDelay;
      if (elapsed < 0) { frameId = requestAnimationFrame(animate); return; }
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setDisplayNum(Math.round(eased * targetNum));
      if (progress < 1) frameId = requestAnimationFrame(animate);
      else setDisplayNum(targetNum);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [visible, hasNumber, targetNum, index]);

  return (
    <div ref={ref} className={`reveal delay-${Math.min(index + 1, 5)} p-8 md:p-10 ${getStatBorderClasses(index)}`}>
      <p className="overline text-parchment/50 font-bold mb-4">{label}</p>
      <p className="font-heading text-parchment leading-tight mb-3 font-bold" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
        {hasNumber ? `${displayNum}${suffix}` : value}
      </p>
      <p className="font-body text-[0.875rem] text-parchment/50 leading-relaxed font-medium">{note}</p>
    </div>
  );
}

// ── WHAT THIS REQUIRES ────────────────────────────────────────────────────────
function WhatThisRequires() {
  const details = [
    { label: "Duration",       value: "6 Months",      note: "April through September 2026" },
    { label: "Time / Week",    value: "4\u20136 Hours", note: "Sessions and practice" },
    { label: "Group Sessions", value: "12 Live",        note: "Via Zoom" },
    { label: "1:1 Mentoring",  value: "12 Sessions",    note: "One-on-one support" },
    { label: "The SoulQuest",  value: "1 Day Solo",     note: "A ceremony in nature" },
    { label: "Integration",    value: "Built In",       note: "Guided return support" },
  ];
  return (
    <section className="bg-ink section-py px-6 md:px-14 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_60%,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <p className="reveal overline text-parchment/50 font-bold mb-12 flex items-center gap-6"><span className="rule-gold opacity-40 w-12" />What This Requires</p>
        <SplitHeading className="font-heading text-parchment mb-8 text-balance font-bold"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }} stagger={50} baseDelay={80}>
          This work asks something real of you.
        </SplitHeading>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-0 mt-20">
          {details.map(({ label, value, note }, i) => (
            <StatCard key={label} label={label} value={value} note={note} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── WHO IT'S FOR ──────────────────────────────────────────────────────────────
function WhoItsFor() {
  const listRef = useRef<HTMLDivElement>(null);
  const [dashActive, setDashActive] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0, 1, 2, 3].forEach((i) =>
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
  }, []);

  const items = [
    "Sense that something in life is shifting at a deeper level",
    "Have already done significant inner or outer work",
    "Are not looking for quick answers",
    "Feel ready to engage something meaningful",
  ];

  return (
    <section className="split">
      <div className="split-img relative min-h-[70vw] md:min-h-0 img-grain">
        <Image src="/images/brand-reference.png" alt="Soul Initiation — brand reference" fill className="object-cover img-warm" sizes="(max-width: 767px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/20" />
      </div>
      <div className="bg-cream flex flex-col justify-center px-8 md:px-16 xl:px-24 section-py">
        <p className="reveal overline text-ink/40 font-bold mb-10 flex items-center gap-6"><span className="rule-gold w-10" />Who This Is For</p>
        <h2 className="reveal delay-1 font-heading text-ink mb-8 font-bold" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: "1.05" }}>
          Not designed
          <br />
          <em className="italic font-bold">for everyone.</em>
        </h2>
        <div ref={listRef} className="space-y-0 max-w-xl reveal delay-3">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-6 py-6 border-b border-ink/[0.1]">
              <span
                className="font-heading text-2xl mt-0.5 leading-none shrink-0 transition-colors duration-700"
                style={{ color: dashActive[i] ? "var(--gold)" : "rgba(0,0,0,0.15)" }}
              >
                {"\u2014"}
              </span>
              <p className="font-body text-[1rem] text-ink font-bold leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── OUTCOMES ──────────────────────────────────────────────────────────────────
function Outcomes() {
  const changes = [
    { label: "Clearer direction", body: "A growing sense of what you are oriented toward." },
    { label: "Decisions that hold", body: "Choices rooted in something more stable than mood." },
    { label: "A living relationship with depth", body: "An ongoing connection with a deeper intelligence." },
    { label: "Life gathering around a new center", body: "What was ambiguous becomes more legible." },
  ];
  return (
    <section className="bg-parchment section-py px-6 md:px-14">
      <div className="max-w-6xl mx-auto">
        <p className="reveal overline text-ink/40 font-bold mb-12 flex items-center gap-6"><span className="rule-gold w-12" />What Tends to Change</p>
        <SplitHeading className="font-heading text-ink mb-0 font-bold max-w-5xl"
          style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }} stagger={55} baseDelay={80}>
          The reorganization is felt from the inside out.
        </SplitHeading>
        <div className="grid md:grid-cols-2 gap-x-12 mt-12">
          {changes.map(({ label, body }, i) => (
            <div key={i} className={`reveal delay-${i + 1} group border-t border-ink/[0.1] pt-10 pb-12 md:pr-16 cursor-default transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(0,0,0,0.06)]`}>
              <div className="flex items-center gap-0 mb-6 overflow-hidden"><span className="w-0 h-px bg-ink group-hover:w-12 transition-[width,margin-right] duration-500 shrink-0 mr-0 group-hover:mr-6" />
                <h3 className="font-heading text-[2rem] md:text-[2.5rem] text-ink group-hover:translate-x-2 transition-transform duration-300 font-bold">{label}</h3>
              </div>
              <p className="font-body text-[1rem] text-ink/60 group-hover:text-ink/80 leading-relaxed font-medium transition-colors duration-500 translate-y-1 group-hover:translate-y-0">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── GUIDES ────────────────────────────────────────────────────────────────────
function Guides() {
  const items = [
    { title: "The Art of Listening", role: "Orientation Guide", body: "A practice for meeting the silence before a crossing." },
    { title: "Archetypal Descent",   role: "Mapping Guide",      body: "Exploration of patterns when identity shifts." },
    { title: "Ritual & Threshold",  role: "Ceremony Guide",     body: "Foundational structures for marking transitions." },
  ];
  return (
    <section className="bg-ink section-py px-6 md:px-14">
      <div className="max-w-6xl mx-auto">
        <p className="reveal overline text-parchment/40 font-bold mb-12 flex items-center gap-6"><span className="rule-gold opacity-40 w-12" />Threshold Documents</p>
        <SplitHeading className="font-heading text-parchment mb-20 font-bold"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }} stagger={70} baseDelay={80}>
          Foundations for the crossing
        </SplitHeading>
        <div className="grid md:grid-cols-3 gap-10">
          {items.map(({ title, role, body }, i) => (
            <div
              key={i}
              className={`reveal delay-${i + 1} flex flex-col group cursor-pointer transition-transform duration-500 ease-out hover:scale-[1.02]`}
            >
              {/* Atmospheric placeholder: layered gradient + grain + ghost numeral */}
              <div className="aspect-[4/3] mb-0 overflow-hidden relative border border-parchment/10 transition-colors duration-500 group-hover:border-parchment/20">
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  style={{
                    background: i === 0
                      ? "radial-gradient(ellipse at 30% 40%, rgba(200,184,154,0.18) 0%, transparent 70%), linear-gradient(160deg, #1a1612 0%, #0d0b09 50%, #151210 100%)"
                      : i === 1
                      ? "radial-gradient(ellipse at 70% 60%, rgba(180,165,140,0.15) 0%, transparent 65%), linear-gradient(200deg, #0e0c0a 0%, #1a1814 55%, #0a0908 100%)"
                      : "radial-gradient(ellipse at 50% 30%, rgba(210,195,165,0.20) 0%, transparent 60%), linear-gradient(140deg, #13110f 0%, #1c1915 50%, #0f0d0b 100%)",
                  }}
                />
                {/* SVG grain overlay */}
                <div
                  className="absolute inset-0 opacity-[0.32] mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    backgroundSize: "180px 180px",
                  }}
                />
                {/* Ghost Roman numeral */}
                <span
                  className="absolute inset-0 flex items-end justify-end p-5 font-heading text-parchment/[0.07] select-none leading-none transition-opacity duration-500 group-hover:opacity-0"
                  style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}
                  aria-hidden="true"
                >
                  {["I", "II", "III"][i]}
                </span>
              </div>

              {/* Gold accent line — animates in on hover */}
              <div className="h-px w-0 bg-gradient-to-r from-[#C8B89A] to-transparent mb-8 transition-[width] duration-500 ease-out group-hover:w-full" />

              <p className="overline text-parchment/30 font-bold mb-4 tracking-widest">{role}</p>
              <h3 className="font-heading text-[1.75rem] text-parchment mb-6 font-bold">{title}</h3>
              <p className="font-body text-[0.9375rem] text-parchment/40 leading-relaxed font-medium">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
function Testimonials() {
  const quotes = [
    { q: "I didn\u2019t need more insight. I needed a way to move.", a: "S.M. \u2014 Executive, Cohort 2024" },
    { q: "Something shifted \u2014 from the root, not the surface.", a: "A.R. \u2014 Architect, Cape Town" },
    { q: "It gave me a way to stay with what I was sensing.", a: "J.K. \u2014 Therapist, Cohort 2025" },
  ];
  // Staggered vertical rhythm: card 2 drops 24px, card 3 returns to baseline
  const offsets = ["", "md:mt-6", ""];
  return (
    <section className="bg-cream section-py px-6 md:px-14">
      <div className="max-w-6xl mx-auto">
        <p className="reveal overline text-ink/40 font-bold mb-12 flex items-center gap-6"><span className="rule-gold w-10" />Participants</p>
        <SplitHeading className="font-heading text-ink mb-20 font-bold"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }} stagger={70} baseDelay={80}>
          Words from the threshold
        </SplitHeading>
        <div className="grid md:grid-cols-3 gap-8 md:items-start">
          {quotes.map(({ q, a }, i) => (
            <div key={i} className={`t-card group reveal delay-${i + 1} relative overflow-hidden bg-parchment p-10 md:p-12 border border-ink/[0.08] hover:border-ink/[0.18] transition-colors duration-500 shadow-sm ${offsets[i]}`}>
              {/* Full-bleed typographic gesture — absolute behind content */}
              <span aria-hidden="true" className="absolute -top-6 -left-3 font-heading text-[9rem] text-ink/[0.07] group-hover:text-ink/[0.13] transition-colors duration-500 leading-none pointer-events-none select-none">&ldquo;</span>
              <p className="relative font-heading text-[1.5rem] md:text-[1.75rem] text-ink italic leading-snug mb-10 font-bold mt-10">{q}</p>
              <div className="flex items-center gap-4"><span className="rule-gold opacity-40 w-8" /><p className="overline text-ink/40 font-bold">{a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── OFFER ────────────────────────────────────────────────────────────────────
function Offer() {
  const steps = [
    { n: "01", label: "Submit your application", body: "A short form to help us understand where you are." },
    { n: "02", label: "Receive the full guide", body: "Complete details on schedule and practices." },
    { n: "03", label: "Optional conversation", body: "Explore whether this is the right fit." },
    { n: "04", label: "Invitation to join", body: "If the program aligns, receive an invitation." },
  ];

  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Vertical timeline spine draws down on scroll entry
  useEffect(() => {
    const container = stepsRef.current;
    const line = lineRef.current;
    if (!container || !line) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            line.style.transform = "scaleY(1)";
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(container);
    return () => io.disconnect();
  }, []);

  // Concentric rings draw themselves via stroke-dashoffset with 200ms stagger
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const circles = Array.from(svg.querySelectorAll<SVGCircleElement>("circle"));
    const circumferences = [879.6, 628.3, 376.9]; // 2π × r for r=140, 100, 60
    circles.forEach((circle, i) => {
      circle.style.strokeDasharray = `${circumferences[i]}`;
      circle.style.strokeDashoffset = `${circumferences[i]}`;
      circle.style.transition = `stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1) ${i * 200}ms`;
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            circles.forEach((circle) => { circle.style.strokeDashoffset = "0"; });
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(svg.parentElement!);
    return () => io.disconnect();
  }, []);

  return (
    <section id="apply" className="bg-parchment section-py px-6 md:px-14">
      <div className="max-w-6xl mx-auto">
        <p className="reveal overline text-ink/40 font-bold mb-12 flex items-center gap-6"><span className="rule-gold w-12" />Investment &amp; Application</p>
        <SplitHeading className="font-heading text-ink mb-6 font-bold"
          style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }} stagger={80} baseDelay={80}>
          Soul Initiation Program
        </SplitHeading>
        <p className="reveal delay-2 font-body text-[1.125rem] text-ink/50 mb-20 font-medium">April through September 2026&nbsp;·&nbsp;6{"\u2013"}12 participants</p>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div className="reveal delay-3 bg-cream p-10 md:p-14 shadow-lg border border-ink/[0.05]">
            <h3 className="font-heading text-[2.25rem] text-ink mb-10 font-bold">The next step</h3>
            <div ref={stepsRef} className="relative">
              {/* Vertical timeline spine */}
              <div
                ref={lineRef}
                className="absolute top-3 bottom-8 w-px bg-gradient-to-b from-ink/25 via-ink/12 to-transparent origin-top pointer-events-none"
                style={{ left: "15px", transform: "scaleY(0)", transition: "transform 1.5s cubic-bezier(0.16,1,0.3,1) 0.2s" }}
              />
              {steps.map(({ n, label, body }, i) => (
                <div key={n} className="flex items-start gap-8 py-6 border-b border-ink/[0.08] relative">
                  <p
                    className="font-heading text-[2rem] font-bold shrink-0 w-8 text-center"
                    style={{ color: `rgba(27,25,22,${0.15 + i * 0.07})` }}
                  >
                    {i + 1}
                  </p>
                  <div>
                    <p className="font-body text-[1rem] text-ink font-bold mb-2 uppercase tracking-wide">{label}</p>
                    <p className="font-body text-[0.875rem] text-ink/50 font-medium">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal delay-4 bg-ink p-10 md:p-14 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-60 h-60 opacity-[0.1] pointer-events-none translate-x-1/4 -translate-y-1/4">
              <svg ref={svgRef} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="160" cy="0" r="140" stroke="#FFFFFF" strokeWidth="0.5" />
                <circle cx="160" cy="0" r="100" stroke="#FFFFFF" strokeWidth="0.5" />
                <circle cx="160" cy="0" r="60" stroke="#FFFFFF" strokeWidth="0.5" />
              </svg>
            </div>
            <div>
              <p className="overline text-parchment/40 font-bold mb-8">Investment</p>
              <p className="font-heading text-parchment text-3xl md:text-5xl font-bold mb-6">Founding Cohort Rate</p>
              <p className="font-body text-[0.9375rem] text-parchment/40 leading-relaxed font-medium mb-12">
                Disclosed upon application. Payment plans available.
              </p>
            </div>
            <a href="#apply-form" className="btn-fill group font-body text-[11px] tracking-[0.35em] uppercase px-12 py-5 bg-parchment text-ink font-bold text-center">
              <span className="absolute inset-0 bg-gold-lt" style={{ transform: "translateX(-102%)", transition: "transform 0.5s var(--expo-out)" }} />
              <span className="relative z-10">Begin Your Application {"\u2192"}</span>
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
      <div className="max-w-4xl mx-auto">
        <p className="reveal overline text-ink/40 font-bold mb-12 flex items-center gap-6"><span className="rule-gold w-10" />FAQ</p>
        <SplitHeading className="font-heading text-ink mb-16 font-bold"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }} stagger={70} baseDelay={80}>
          Questions at the Threshold
        </SplitHeading>
        <FAQAccordion faqs={[
          {
            question: "How is this different from other coaching or transformation programs?",
            answer: [
              "Most programs work on the level of behavior, mindset, or strategy. Soul Initiation works at the level of identity and soul.",
              "We are not here to optimize who you are — we are here to help you discover who you actually are beneath the roles, the achievements, and the constructed self.",
            ],
          },
          {
            question: "Is this a spiritual or religious program?",
            answer: [
              "Soul Initiation Academy is not affiliated with any religion. We draw on the archetypal wisdom present across many traditions — but the work is experiential, not doctrinal.",
              "You bring your own cosmology. We simply create the depth of container for it to be lived.",
            ],
          },
          {
            question: "Do I need to have done therapy or previous inner work?",
            answer: [
              "This program is designed for people who have already done meaningful inner work — therapy, retreat, ceremony, mentorship. This is not an entry-level offering.",
              "If you are new to personal development, we recommend beginning there first. This is for those who have already been walking the path.",
            ],
          },
          {
            question: "What is the time commitment?",
            answer: [
              "Weekly group sessions run 90 minutes. We recommend an additional 1–2 hours per week for reflection, journaling, and integration.",
              "Depth requires space. The program runs for six months.",
            ],
          },
          {
            question: "What happens after I apply?",
            answer: [
              "We will reach out within 3 business days to schedule a conversation.",
              "This call is not a sales call — it is a genuine exploration of whether this program and cohort are the right fit for you at this moment. Mutual discernment matters to us.",
            ],
          },
          {
            question: "Why only 8 initiates per cohort?",
            answer: [
              "The depth this work requires cannot happen in a large group. Eight people is deliberate.",
              "It creates the intimacy, safety, and collective field necessary for genuine initiation. Every cohort becomes its own sacred container.",
            ],
          },
        ]} />
      </div>
    </section>
  );
}

// ── FINAL CTA ─────────────────────────────────────────────────────────────────
function FinalCTA() {
  const circleRef = useRef<SVGSVGElement>(null);

  // Concentric rings draw themselves on scroll entry
  useEffect(() => {
    const svg = circleRef.current;
    if (!svg) return;
    const circles = Array.from(svg.querySelectorAll<SVGCircleElement>("circle"));
    const circumferences = [1319.5, 879.6, 565.5, 314.2]; // 2π × r for r=210,140,90,50
    circles.forEach((circle, i) => {
      circle.style.strokeDasharray = `${circumferences[i]}`;
      circle.style.strokeDashoffset = `${circumferences[i]}`;
      circle.style.transition = `stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1) ${i * 350}ms`;
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            circles.forEach((circle) => { circle.style.strokeDashoffset = "0"; });
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative py-60 md:py-80 px-6 md:px-14 overflow-hidden">
      {/* Background: pure ink gradient — no photo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(200,184,154,0.07) 0%, transparent 60%), linear-gradient(180deg, #0d0b09 0%, #1a1612 50%, #080604 100%)",
        }}
      />
      {/* SVG grain */}
      <div
        className="absolute inset-0 opacity-[0.28] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />
      {/* Concentric rings — centered, full-bleed presence */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          ref={circleRef}
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[min(110vw,800px)] h-[min(110vw,800px)] opacity-[0.14]"
          aria-hidden="true"
        >
          <circle cx="250" cy="250" r="210" stroke="#C8B89A" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="140" stroke="#C8B89A" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="90"  stroke="#C8B89A" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="50"  stroke="#C8B89A" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Overline */}
        <p className="reveal overline text-parchment/40 font-bold mb-12 flex items-center justify-center gap-6">
          <span className="rule-gold opacity-40 w-10" />
          The Threshold Is Here
          <span className="rule-gold opacity-40 w-10" />
        </p>

        {/* Primary headline — the emotional close */}
        <SplitHeading className="font-heading text-parchment leading-[1.0] mb-12 font-bold text-balance"
          style={{ fontSize: "clamp(3rem, 7vw, 7rem)", textShadow: "0 10px 40px rgba(0,0,0,0.6)" }} stagger={45} baseDelay={0}>
          If You Recognize Yourself in This, You May Already Be at the Threshold.
        </SplitHeading>

        {/* Body copy */}
        <div className="reveal delay-1 max-w-2xl mx-auto mb-16 space-y-5">
          <p className="font-body text-[1.0625rem] text-parchment/60 leading-relaxed font-medium">
            This work is designed precisely for the moment you are in — when something real is happening and you need more than another framework.
          </p>
          <p className="font-body text-[1.0625rem] text-parchment/60 leading-relaxed font-medium">
            The April 2026 cohort is small by design. If this speaks to something in you, the application is the first step.
          </p>
        </div>

        {/* CTA */}
        <div className="reveal delay-2 flex flex-col items-center gap-12">
          <a
            href="#apply-form"
            className="btn-fill group font-body text-[11px] tracking-[0.35em] uppercase px-14 py-6 bg-parchment text-ink font-bold"
          >
            <span className="absolute inset-0 bg-gold-lt" style={{ transform: "translateX(-102%)", transition: "transform 0.5s var(--expo-out)" }} aria-hidden />
            <span className="relative z-10">Begin Your Application {"\u2192"}</span>
          </a>
          {/* 444 — watermark brand seal */}
          <p
            className="font-heading text-parchment font-bold select-none leading-none breathe-444"
            style={{ fontSize: "clamp(4rem,12vw,10rem)" }}
            aria-hidden="true"
          >
            444
          </p>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <>
      {/* Decorative seal — visual closure before footer */}
      <div className="bg-ink flex justify-center py-10">
        <NavMonogram className="w-8 h-10 text-parchment" style={{ opacity: 0.15 }} aria-hidden="true" />
      </div>

      <footer className="bg-ink text-parchment pt-16 pb-12 px-6 md:px-14 border-t border-parchment/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16 mb-24">
            <div>
              <p className="font-heading text-2xl mb-8 font-bold">SOUL INITIATION ACADEMY</p>
              <p className="text-parchment/40 font-medium">A private institution for mature soul-initiation practices.</p>
            </div>
            <div>
              <p className="overline text-white/20 font-bold mb-8">Contact</p>
              <a href="mailto:apply@soulinitiationacademy.com" className="text-parchment/60 hover:text-parchment font-bold border-b border-transparent hover:border-parchment/30 transition-colors">apply@soulinitiationacademy.com</a>
            </div>
            <div className="flex flex-col justify-between gap-10">
              <p className="text-parchment/20 uppercase tracking-[0.3em] font-bold">444 {"\u00B7"} EST. MMXXIV</p>
              {/* Social links */}
              <div className="flex items-center gap-6">
                <a
                  href="https://www.instagram.com/soulinitiationacademy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-parchment/30 hover:text-parchment transition-colors duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/soulinitiationacademy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-parchment/30 hover:text-parchment transition-colors duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/[0.05] pt-12 text-center md:text-left">
            <p className="text-parchment/30 uppercase tracking-widest font-bold">{"\u00A9"} 2026 Soul Initiation Arc {"\u00B7"} All rites reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function Home() {
  useReveal();
  return (
    <main className="bg-ink min-h-screen">
      <PageLoader />
      <Hero />
      <ThresholdStatement />
      <SplitLeft />
      <Process />
      <SplitRight />
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
