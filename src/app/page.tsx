import Image from "next/image";
import FAQAccordion from "@/components/FAQAccordion";

// ── NAV ────────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5">
      <span className="font-body text-xs tracking-[0.3em] text-pure-white/80 uppercase">
        Soul Initiation Academy
      </span>
      <a
        href="#apply"
        className="font-body text-xs tracking-[0.2em] uppercase px-6 py-2.5 border border-pure-white/60 text-pure-white/80 hover:bg-pure-white hover:text-obsidian-moss transition-all duration-300"
      >
        Apply Now
      </a>
    </nav>
  );
}

// ── HERO ───────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-end">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-mountain.png"
          alt="A lone figure stands at the threshold above the clouds"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient: dark at top (nav legibility) → light mid → very dark at bottom (text legibility) */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-moss/70 via-obsidian-moss/25 to-obsidian-moss/88" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pb-20 md:pb-32 w-full">
        <p className="font-body text-[10px] tracking-[0.35em] text-linen-mist/60 uppercase mb-6">
          Soul Initiation Academy
        </p>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-[82px] text-pure-white leading-[1.04] mb-8 max-w-4xl text-balance">
          You&apos;ve Done the Work. But Something in You Knows You Haven&apos;t
          Crossed Yet.
        </h1>
        <p className="font-body text-base md:text-lg text-linen-mist/75 max-w-xl mb-12 leading-relaxed">
          There is a threshold between achieving and becoming. Between performing
          a life and living one. Soul Initiation Academy exists at that
          threshold.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <a
            href="#apply"
            className="font-body text-xs tracking-[0.25em] uppercase px-10 py-4 bg-pure-white text-obsidian-moss hover:bg-linen-mist transition-colors duration-300"
          >
            Apply Now →
          </a>
          <p className="font-body text-[10px] tracking-[0.25em] text-linen-mist/50 uppercase">
            8 Initiates · One Cohort · By Application Only
          </p>
        </div>
      </div>
    </section>
  );
}

// ── RECOGNITION ────────────────────────────────────────────────────────────────
function Recognition() {
  return (
    <section className="bg-linen-mist py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-[10px] tracking-[0.35em] text-dried-sage uppercase mb-10">
          If You&apos;re Here
        </p>
        <h2 className="font-heading text-4xl md:text-[58px] text-obsidian-moss leading-[1.08] mb-16 max-w-3xl">
          You have built a life that looks like success.{" "}
          <em>And something in you is still waiting.</em>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 mt-4">
          <div className="space-y-6">
            <p className="font-body text-base text-obsidian-moss/75 leading-relaxed">
              You&apos;ve done the inner work. The therapy. The retreats. The
              books. You understand yourself — your patterns, your wounds, your
              gifts. And yet something remains unmoved.
            </p>
            <p className="font-body text-base text-obsidian-moss/75 leading-relaxed">
              Not broken. Not lost. Just… not yet fully here.
            </p>
            <p className="font-body text-base text-obsidian-moss/75 leading-relaxed">
              There is a version of you that has already crossed — that lives
              from the depth of their soul, not from strategy, identity, or the
              need to prove anything.
            </p>
            <p className="font-body text-base text-obsidian-moss/75 leading-relaxed">
              Soul Initiation Academy is for the moment you are ready to stop
              preparing and begin arriving.
            </p>
          </div>

          <div className="space-y-0">
            {[
              "You lead, create, or build — but sense there is something more true waiting beneath the role",
              "You feel the gap between who you perform and who you actually are",
              "You've outgrown your old story, but haven't yet written what comes next",
              "You're ready for something that goes deeper than growth — into initiation",
              "You know that what brought you here will not take you further",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-5 border-b border-obsidian-moss/12"
              >
                <span className="font-heading text-2xl text-dried-sage/70 mt-0.5 leading-none">
                  ◦
                </span>
                <p className="font-body text-base text-obsidian-moss/75 leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── WHAT IS ────────────────────────────────────────────────────────────────────
function WhatIs() {
  return (
    <section className="bg-obsidian-moss py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-[10px] tracking-[0.35em] text-dried-sage uppercase mb-10">
          The Work
        </p>
        <h2 className="font-heading text-4xl md:text-[58px] text-pure-white leading-[1.08] mb-6 max-w-3xl">
          Soul Initiation is not personal development. It is the end of the
          person you&apos;ve been performing.
        </h2>
        <p className="font-body text-base text-pure-white/60 max-w-2xl mb-20 leading-relaxed">
          In every culture across time, initiation has marked the crossing from
          one identity into a truer, deeper one. That is the work we do —
          together, in depth, with full presence.
        </p>

        <div className="grid md:grid-cols-3 gap-0">
          {[
            {
              title: "Not Coaching",
              body: "This is not a program where someone guides you toward a better strategy or more refined version of your current self. This is a container for dissolving what is no longer true.",
            },
            {
              title: "Not Therapy",
              body: "We are not here to heal the wounded child, though healing may arise. We are here to meet the sovereign self that was never broken — only hidden.",
            },
            {
              title: "An Initiation",
              body: "Initiation marks the crossing from one identity into a more essential one. We create that threshold deliberately, safely, and with the depth the work deserves.",
            },
          ].map(({ title, body }) => (
            <div
              key={title}
              className="border-t border-pure-white/15 pt-8 pb-8 md:pr-10"
            >
              <h3 className="font-heading text-2xl md:text-3xl text-pure-white mb-4">
                {title}
              </h3>
              <p className="font-body text-sm text-pure-white/55 leading-relaxed">
                {body}
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
  const archetypes = [
    {
      label: "The Visionary at the Edge",
      description:
        "You have built something significant — a company, a body of work, a life of impact. But you feel the edge of what's possible from your current self. Something larger is pressing to emerge. You sense it in the quiet moments.",
    },
    {
      label: "The Seeker Who Has Done the Work",
      description:
        "You have invested deeply in your growth — therapy, retreat, ceremony, mentorship. You are not a beginner. You are at the threshold that most programs cannot take you through. This one can.",
    },
    {
      label: "The Leader in Transition",
      description:
        "A chapter is ending and you know it. You feel it in your bones. The question is not what's next — it is who you will become as you step through. That becoming is what we hold space for.",
    },
  ];

  return (
    <section className="bg-linen-mist py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-[10px] tracking-[0.35em] text-dried-sage uppercase mb-10">
          Who This Is For
        </p>
        <h2 className="font-heading text-4xl md:text-[58px] text-obsidian-moss leading-[1.08] mb-16 max-w-2xl">
          This is for those who are ready to cross.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {archetypes.map(({ label, description }, i) => (
            <div key={label} className="bg-pure-white p-8 md:p-10">
              <p className="font-body text-[10px] tracking-[0.3em] text-dried-sage uppercase mb-5">
                0{i + 1}
              </p>
              <h3 className="font-heading text-2xl md:text-3xl text-obsidian-moss mb-6 leading-tight">
                {label}
              </h3>
              <p className="font-body text-sm text-obsidian-moss/65 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PROCESS ────────────────────────────────────────────────────────────────────
function Process() {
  const gates = [
    {
      gate: "Gate I",
      name: "Descent",
      description:
        "Before anything new can emerge, we descend into what is true — beneath the roles, the achievements, the constructed self. This is not a comfortable gate. It is a necessary one. We do not rush it.",
    },
    {
      gate: "Gate II",
      name: "Dissolution",
      description:
        "The identity that has carried you here must be honored — and released. This gate is about letting the old story complete itself, with full dignity and depth. Nothing is forced. Everything is met.",
    },
    {
      gate: "Gate III",
      name: "Revelation",
      description:
        "In the space that dissolution creates, something essential becomes visible. Not a plan. Not a strategy. A knowing — of who you are when no longer performing, no longer striving, no longer proving.",
    },
    {
      gate: "Gate IV",
      name: "Emergence",
      description:
        "The initiated self steps forward. Not as a new persona — but as the most authentic version of who you have always been, now expressed from depth rather than effort. This is the crossing.",
    },
  ];

  return (
    <section className="bg-obsidian-moss/[0.04] py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-[10px] tracking-[0.35em] text-dried-sage uppercase mb-10">
          The Journey
        </p>
        <h2 className="font-heading text-4xl md:text-[58px] text-obsidian-moss leading-[1.08] mb-16 max-w-2xl">
          The Four Gates of Initiation
        </h2>

        <div className="space-y-0">
          {gates.map(({ gate, name, description }) => (
            <div
              key={gate}
              className="grid md:grid-cols-[220px_1fr] gap-4 md:gap-16 py-10 border-b border-obsidian-moss/12"
            >
              <div className="pt-1">
                <p className="font-body text-[10px] tracking-[0.3em] text-dried-sage uppercase mb-2">
                  {gate}
                </p>
                <h3 className="font-heading text-3xl md:text-4xl text-obsidian-moss">
                  {name}
                </h3>
              </div>
              <p className="font-body text-base text-obsidian-moss/70 leading-relaxed max-w-xl self-center">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ───────────────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    {
      quote:
        "I came into this program successful and exhausted. I leave it knowing who I actually am. That distinction changes everything — the decisions I make, the way I lead, the way I live.",
      name: "Alexandra M.",
      role: "Founder & CEO",
    },
    {
      quote:
        "This was not what I expected — it was far more real. The work cut through every story I was still hiding behind. I am not the same person who entered. I am grateful for that.",
      name: "David R.",
      role: "Executive Director",
    },
    {
      quote:
        "I have done many transformational programs. Nothing prepared me for the depth of what happened here. The word 'initiation' is exactly right. You cross something you cannot uncross.",
      name: "Sophia L.",
      role: "Creative Director & Entrepreneur",
    },
  ];

  return (
    <section className="bg-obsidian-moss py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-[10px] tracking-[0.35em] text-dried-sage uppercase mb-10">
          From Those Who Have Crossed
        </p>
        <h2 className="font-heading text-4xl md:text-5xl text-pure-white leading-[1.08] mb-16 max-w-xl">
          Words from the threshold
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role }) => (
            <div
              key={name}
              className="border border-pure-white/12 p-8 md:p-10 flex flex-col justify-between"
            >
              <p className="font-heading text-xl md:text-2xl text-pure-white/88 leading-relaxed italic mb-10">
                &ldquo;{quote}&rdquo;
              </p>
              <div className="border-t border-pure-white/12 pt-6">
                <p className="font-body text-sm text-pure-white font-medium">
                  {name}
                </p>
                <p className="font-body text-[10px] text-pure-white/45 tracking-[0.2em] uppercase mt-1">
                  {role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── OFFER ──────────────────────────────────────────────────────────────────────
function Offer() {
  const includes = [
    "6 months of deep, immersive container — 24 weeks of intentional work",
    "Weekly 90-minute group initiation sessions with the full cohort",
    "Monthly 1:1 integration sessions (3 private sessions total)",
    "The Soul Initiation framework and supporting materials",
    "A community of 8 fellow initiates — your threshold companions",
    "Lifetime access to all session recordings",
  ];

  return (
    <section
      id="apply"
      className="bg-linen-mist py-24 md:py-36 px-6 md:px-12"
    >
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-[10px] tracking-[0.35em] text-dried-sage uppercase mb-10">
          The Offering
        </p>
        <h2 className="font-heading text-4xl md:text-[58px] text-obsidian-moss leading-[1.08] mb-6">
          Soul Initiation Program
        </h2>
        <p className="font-body text-base text-obsidian-moss/65 mb-16 max-w-2xl leading-relaxed">
          A six-month immersive container for visionaries ready to cross from
          performing their life to living from their soul.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Includes */}
          <div className="bg-pure-white p-8 md:p-10">
            <h3 className="font-heading text-2xl text-obsidian-moss mb-8">
              What is included
            </h3>
            <div className="space-y-5">
              {includes.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <span className="font-heading text-xl text-dried-sage mt-0.5 leading-none">
                    —
                  </span>
                  <p className="font-body text-sm text-obsidian-moss/75 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Investment */}
          <div className="bg-obsidian-moss p-8 md:p-10 flex flex-col justify-between">
            <div>
              <p className="font-body text-[10px] tracking-[0.3em] text-linen-mist/45 uppercase mb-5">
                Investment
              </p>
              <p className="font-heading text-6xl md:text-7xl text-pure-white mb-2 leading-none">
                $12,000
              </p>
              <p className="font-body text-sm text-pure-white/50 mb-8">
                Payment plans available. Cohort begins April 2026.
              </p>
              <p className="font-body text-sm text-pure-white/65 leading-relaxed mb-10">
                This program is offered by application only. We accept 8
                initiates per cohort to ensure the depth and intimacy the work
                requires. Each application is reviewed personally.
              </p>
            </div>
            <a
              href="#apply-form"
              className="block text-center font-body text-xs tracking-[0.25em] uppercase px-8 py-4 bg-pure-white text-obsidian-moss hover:bg-linen-mist transition-colors duration-300"
            >
              Begin Your Application
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ────────────────────────────────────────────────────────────────────────
function FAQ() {
  return (
    <section className="bg-obsidian-moss/[0.04] py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <p className="font-body text-[10px] tracking-[0.35em] text-dried-sage uppercase mb-10">
          Questions
        </p>
        <h2 className="font-heading text-4xl md:text-5xl text-obsidian-moss leading-[1.08] mb-16">
          What you might be wondering
        </h2>
        <FAQAccordion />
      </div>
    </section>
  );
}

// ── FINAL CTA ──────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section
      id="apply-form"
      className="relative py-36 md:py-52 px-6 md:px-12"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-mountain.png"
          alt="The threshold"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-obsidian-moss/82" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="font-body text-[10px] tracking-[0.35em] text-dried-sage uppercase mb-8">
          The Threshold Is Here
        </p>
        <h2 className="font-heading text-5xl md:text-7xl text-pure-white leading-[1.04] mb-8 text-balance">
          Are you ready to cross?
        </h2>
        <p className="font-body text-base text-pure-white/65 leading-relaxed mb-12 max-w-lg mx-auto">
          Applications for the April 2026 cohort are now open. Only 8 initiates
          will be accepted. This is a genuine threshold — step through only if
          you are ready.
        </p>
        <a
          href="mailto:apply@soulinitiationacademy.com"
          className="inline-block font-body text-xs tracking-[0.25em] uppercase px-12 py-5 bg-pure-white text-obsidian-moss hover:bg-linen-mist transition-colors duration-300"
        >
          Begin Your Application →
        </a>
        <p className="font-body text-[10px] text-pure-white/35 mt-8 tracking-[0.2em] uppercase">
          You will receive a response within 3 business days
        </p>
      </div>
    </section>
  );
}

// ── FOOTER ─────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-obsidian-moss py-10 px-6 md:px-12 border-t border-pure-white/8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <span className="font-body text-[10px] tracking-[0.35em] text-pure-white/40 uppercase">
          Soul Initiation Academy
        </span>
        <p className="font-body text-[10px] text-pure-white/25 tracking-wider">
          © 2026 Soul Initiation Academy · All rights reserved
        </p>
        <div className="flex gap-6">
          <a
            href="#"
            className="font-body text-[10px] text-pure-white/35 hover:text-pure-white/65 transition-colors tracking-[0.2em] uppercase"
          >
            Privacy
          </a>
          <a
            href="#"
            className="font-body text-[10px] text-pure-white/35 hover:text-pure-white/65 transition-colors tracking-[0.2em] uppercase"
          >
            Terms
          </a>
          <a
            href="mailto:hello@soulinitiationacademy.com"
            className="font-body text-[10px] text-pure-white/35 hover:text-pure-white/65 transition-colors tracking-[0.2em] uppercase"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── PAGE ───────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Recognition />
      <WhatIs />
      <WhoItsFor />
      <Process />
      <Testimonials />
      <Offer />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
