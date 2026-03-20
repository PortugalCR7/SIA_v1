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
          A six-month initiation for people at a real threshold in their life —
          not seeking more insight, but a way to move through.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <a
            href="#apply"
            className="font-body text-xs tracking-[0.25em] uppercase px-10 py-4 bg-pure-white text-obsidian-moss hover:bg-linen-mist transition-colors duration-300"
          >
            Apply Now →
          </a>
          <p className="font-body text-[10px] tracking-[0.25em] text-linen-mist/50 uppercase">
            Begins April 2026 · Small cohort (6–12) · Group + 1:1 mentoring · Application required
          </p>
        </div>
      </div>
    </section>
  );
}

// ── DO YOU RECOGNIZE THIS? ──────────────────────────────────────────────────
function Recognition() {
  return (
    <section className="bg-linen-mist py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-[10px] tracking-[0.35em] text-dried-sage uppercase mb-10">
          Do You Recognize This?
        </p>
        <h2 className="font-heading text-4xl md:text-[58px] text-obsidian-moss leading-[1.08] mb-12 max-w-3xl">
          There are moments in life when something begins to shift beneath the
          surface.
        </h2>
        <p className="font-body text-base text-obsidian-moss/70 max-w-2xl mb-16 leading-relaxed">
          From the outside, things may still look intact. But internally, the
          structure that once held you no longer quite does — and you know it,
          even if you can&apos;t yet name it.
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
              className="flex items-start gap-6 py-7 border-b border-obsidian-moss/12"
            >
              <span className="font-heading text-2xl text-dried-sage/70 mt-0.5 leading-none shrink-0">
                ◦
              </span>
              <div>
                <p className="font-body text-base text-obsidian-moss font-medium mb-1">
                  {label}
                </p>
                <p className="font-body text-sm text-obsidian-moss/65 leading-relaxed">
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
    <section className="bg-obsidian-moss py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-[10px] tracking-[0.35em] text-dried-sage uppercase mb-10">
          This Is Not Confusion
        </p>
        <h2 className="font-heading text-4xl md:text-[58px] text-pure-white leading-[1.08] mb-16 max-w-3xl">
          It&apos;s a Threshold.
        </h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <h3 className="font-heading text-2xl text-pure-white mb-5">
              What a threshold actually is
            </h3>
            <p className="font-body text-base text-pure-white/65 leading-relaxed mb-4">
              A genuine life threshold is not a problem to be solved. It is a
              passage to be moved through — a moment when one chapter has ended
              and another has not yet fully begun. In traditional cultures, these
              crossings were marked, held, and guided.
            </p>
            <p className="font-body text-base text-pure-white/65 leading-relaxed">
              In modern life, they rarely are.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-2xl text-pure-white mb-5">
              What happens without structure
            </h3>
            <p className="font-body text-base text-pure-white/65 leading-relaxed mb-8">
              Without a container to hold a real threshold, it tends to collapse
              into something more familiar but far less generative:
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
                  className="flex items-start gap-5 py-5 border-b border-pure-white/12"
                >
                  <span className="font-heading text-xl text-dried-sage mt-0.5 leading-none shrink-0">
                    —
                  </span>
                  <div>
                    <p className="font-body text-sm text-pure-white/85 font-medium mb-0.5">
                      {label}
                    </p>
                    <p className="font-body text-sm text-pure-white/50 leading-relaxed">
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
    <section className="bg-linen-mist py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-[10px] tracking-[0.35em] text-dried-sage uppercase mb-10">
          The Soul Initiation Program
        </p>
        <h2 className="font-heading text-4xl md:text-[58px] text-obsidian-moss leading-[1.08] mb-6 max-w-3xl">
          A structured threshold.
        </h2>
        <p className="font-body text-base text-obsidian-moss/70 max-w-2xl mb-16 leading-relaxed">
          A six-month container designed to support a specific kind of
          transition: the reorganization of your life around a deeper center.
        </p>

        <div className="grid md:grid-cols-2 gap-0 mb-20">
          {/* This is not */}
          <div className="bg-pure-white p-8 md:p-10">
            <p className="font-body text-[10px] tracking-[0.3em] text-dried-sage uppercase mb-8">
              This is not
            </p>
            <div className="space-y-4">
              {[
                "A course or curriculum",
                "Coaching or therapy",
                "A peak experience or retreat",
                "A defined path to a guaranteed outcome",
              ].map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <span className="font-heading text-lg text-obsidian-moss/30 mt-0.5 leading-none shrink-0">
                    ×
                  </span>
                  <p className="font-body text-sm text-obsidian-moss/65 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* This is */}
          <div className="bg-obsidian-moss p-8 md:p-10">
            <p className="font-body text-[10px] tracking-[0.3em] text-dried-sage uppercase mb-8">
              This is
            </p>
            <div className="space-y-4">
              {[
                "A rite of passage",
                "A guided crossing",
                "A space where identity can shift — without being rushed or forced",
                "Lived, structured, and supported from beginning to end",
              ].map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <span className="font-heading text-lg text-dried-sage mt-0.5 leading-none shrink-0">
                    —
                  </span>
                  <p className="font-body text-sm text-pure-white/75 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-2xl border-l-2 border-dried-sage pl-8">
          <p className="font-body text-base text-obsidian-moss/75 leading-relaxed mb-4">
            Most people are not lost. They are living from a structure that is no
            longer true.
          </p>
          <p className="font-body text-base text-obsidian-moss/75 leading-relaxed mb-4">
            You could call it a kind of mistaken identity. The issue isn&apos;t a
            lack of insight — you likely have plenty of that. The issue is that
            your life is still organized around something you&apos;ve already
            outgrown. Your habits, choices, and sense of self are still shaped by
            an older version of who you were.
          </p>
          <p className="font-body text-base text-obsidian-moss/75 leading-relaxed mb-6">
            Initiation is what allows that structure to loosen — and something
            more aligned to take its place. Not by force, and not through more
            understanding alone, but through a process that works at the level
            where the structure actually lives.
          </p>
          <p className="font-heading text-xl text-obsidian-moss italic leading-relaxed">
            The insight was never the missing piece. The missing piece was a
            structure capable of honoring what is actually happening — and
            supporting you through it.
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
      name: "Separation",
      description:
        "Stepping back from the structures, identities, and roles that have shaped your life — creating the necessary space for something new to emerge.",
    },
    {
      phase: "Phase II",
      name: "Descent",
      description:
        "Developing a living relationship with a deeper layer of intelligence — what this work calls Soul. Learning to listen to what has been speaking beneath the noise.",
    },
    {
      phase: "Phase III",
      name: "Threshold",
      description:
        "A one-day solo ceremony in nature — the SoulQuest — marking the actual crossing. A moment held by the earth, the silence, and the work that came before.",
    },
    {
      phase: "Phase IV",
      name: "Return",
      description:
        "Re-entering your life with a different orientation — and learning, with support, how to actually live from it in the day-to-day.",
    },
  ];

  return (
    <section className="bg-obsidian-moss/[0.04] py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-[10px] tracking-[0.35em] text-dried-sage uppercase mb-10">
          How It Works
        </p>
        <h2 className="font-heading text-4xl md:text-[58px] text-obsidian-moss leading-[1.08] mb-6 max-w-2xl">
          The Arc of Initiation
        </h2>
        <p className="font-body text-base text-obsidian-moss/65 max-w-2xl mb-16 leading-relaxed">
          The program follows a time-tested structure drawn from the deep logic
          of rites of passage — adapted for the conditions of contemporary life.
          Each phase builds on the one before it.
        </p>

        <div className="space-y-0">
          {phases.map(({ phase, name, description }) => (
            <div
              key={phase}
              className="grid md:grid-cols-[220px_1fr] gap-4 md:gap-16 py-10 border-b border-obsidian-moss/12"
            >
              <div className="pt-1">
                <p className="font-body text-[10px] tracking-[0.3em] text-dried-sage uppercase mb-2">
                  {phase}
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

// ── WHAT THIS REQUIRES ──────────────────────────────────────────────────────
function WhatThisRequires() {
  const details = [
    { label: "Duration", value: "6 months", note: "April through September 2026" },
    { label: "Time Commitment", value: "4–6 hours per week", note: "Sessions, practice, and integration" },
    { label: "Group Sessions", value: "12 live sessions", note: "Via Zoom — recordings available" },
    { label: "1:1 Mentoring", value: "12 private sessions", note: "One-on-one support throughout" },
    { label: "The SoulQuest", value: "One day solo", note: "A threshold ceremony held in nature" },
    { label: "Integration", value: "Built in", note: "Guided preparation and ongoing return support" },
  ];

  return (
    <section className="bg-obsidian-moss py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-[10px] tracking-[0.35em] text-dried-sage uppercase mb-10">
          What This Requires
        </p>
        <h2 className="font-heading text-4xl md:text-[58px] text-pure-white leading-[1.08] mb-6 max-w-2xl">
          This work asks something real of you.
        </h2>
        <p className="font-body text-base text-pure-white/60 max-w-2xl mb-16 leading-relaxed">
          In time, presence, and willingness to engage what is genuinely
          unfolding. It is not designed to be fit into the margins. It asks to be
          met.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
          {details.map(({ label, value, note }) => (
            <div
              key={label}
              className="border-t border-pure-white/15 pt-7 pb-8 md:pr-10"
            >
              <p className="font-body text-[10px] tracking-[0.3em] text-dried-sage uppercase mb-3">
                {label}
              </p>
              <p className="font-heading text-2xl md:text-3xl text-pure-white mb-2 leading-tight">
                {value}
              </p>
              <p className="font-body text-sm text-pure-white/45 leading-relaxed">
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
    <section className="bg-linen-mist py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-[10px] tracking-[0.35em] text-dried-sage uppercase mb-10">
          Who This Is For
        </p>
        <h2 className="font-heading text-4xl md:text-[58px] text-obsidian-moss leading-[1.08] mb-6 max-w-3xl">
          This program is not designed for everyone — and that&apos;s intentional.
        </h2>
        <p className="font-body text-base text-obsidian-moss/65 max-w-2xl mb-16 leading-relaxed">
          It is designed for people at a particular kind of moment. If you
          recognize yourself here, that recognition matters.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Tends to be a fit */}
          <div className="bg-pure-white p-8 md:p-10">
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
                  className="flex items-start gap-4 py-5 border-b border-obsidian-moss/10"
                >
                  <span className="font-heading text-xl text-dried-sage mt-0.5 leading-none shrink-0">
                    —
                  </span>
                  <p className="font-body text-sm text-obsidian-moss/75 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Likely not a fit */}
          <div className="bg-obsidian-moss/[0.06] p-8 md:p-10">
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
                  className="flex items-start gap-4 py-5 border-b border-obsidian-moss/10"
                >
                  <span className="font-heading text-xl text-obsidian-moss/25 mt-0.5 leading-none shrink-0">
                    ×
                  </span>
                  <p className="font-body text-sm text-obsidian-moss/55 leading-relaxed">
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
    <section className="bg-obsidian-moss/[0.04] py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-[10px] tracking-[0.35em] text-dried-sage uppercase mb-10">
          What Tends to Change
        </p>
        <h2 className="font-heading text-4xl md:text-[58px] text-obsidian-moss leading-[1.08] mb-6 max-w-3xl">
          The changes that come through initiation are not always dramatic from
          the outside.
        </h2>
        <p className="font-body text-base text-obsidian-moss/65 max-w-2xl mb-16 leading-relaxed">
          There is no moment where everything is suddenly clear or resolved. But
          something fundamental reorganizes — and over time, that reorganization
          becomes visible in how you live.
        </p>

        <div className="grid md:grid-cols-2 gap-0">
          {changes.map(({ label, body }, i) => (
            <div
              key={i}
              className="border-t border-obsidian-moss/12 pt-8 pb-10 md:pr-14"
            >
              <h3 className="font-heading text-2xl md:text-3xl text-obsidian-moss mb-4 leading-tight">
                {label}
              </h3>
              <p className="font-body text-sm text-obsidian-moss/65 leading-relaxed">
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
    <section className="bg-obsidian-moss py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-[10px] tracking-[0.35em] text-dried-sage uppercase mb-10">
          Your Guides
        </p>
        <h2 className="font-heading text-4xl md:text-[58px] text-pure-white leading-[1.08] mb-16 max-w-2xl">
          You Are Accompanied, Not Led.
        </h2>

        <div className="max-w-2xl space-y-6">
          <p className="font-body text-base text-pure-white/65 leading-relaxed">
            Each guide in this program has crossed similar terrain themselves.
            This is not mentorship offered from a distance — it is presence
            offered from experience. They know what it is to not yet know where
            you are headed, and to stay in the process anyway.
          </p>
          <p className="font-body text-base text-pure-white/65 leading-relaxed">
            Their role is not to provide answers or to accelerate your crossing.
            It is to help you stay in relationship with what is genuinely
            unfolding — especially at the points where it would be easier to turn
            away, collapse into certainty, or retreat to familiar ground.
          </p>
          <p className="font-body text-base text-pure-white/65 leading-relaxed">
            This is not about authority. It is about presence, discernment, and
            steadiness in the work — offered by people who have earned it through
            their own passage.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ───────────────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    "I didn't need more insight. I needed a way to move.",
    "Something in my life finally shifted — from the root, not the surface.",
    "It gave me a way to stay with what I was already sensing, instead of bypassing it.",
  ];

  return (
    <section className="bg-linen-mist py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-[10px] tracking-[0.35em] text-dried-sage uppercase mb-10">
          What Participants Have Said
        </p>
        <h2 className="font-heading text-4xl md:text-5xl text-obsidian-moss leading-[1.08] mb-16 max-w-xl">
          Words from the threshold
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((quote, i) => (
            <div
              key={i}
              className="border border-obsidian-moss/12 bg-pure-white p-8 md:p-10"
            >
              <p className="font-heading text-xl md:text-2xl text-obsidian-moss/85 leading-relaxed italic">
                &ldquo;{quote}&rdquo;
              </p>
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
      className="bg-obsidian-moss/[0.04] py-24 md:py-36 px-6 md:px-12"
    >
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-[10px] tracking-[0.35em] text-dried-sage uppercase mb-10">
          Investment & Application
        </p>
        <h2 className="font-heading text-4xl md:text-[58px] text-obsidian-moss leading-[1.08] mb-6 max-w-2xl">
          Soul Initiation Program
        </h2>
        <p className="font-body text-base text-obsidian-moss/65 mb-16 max-w-2xl leading-relaxed">
          April through September 2026 · 6–12 participants · Application required
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Next steps */}
          <div className="bg-pure-white p-8 md:p-10">
            <h3 className="font-heading text-2xl text-obsidian-moss mb-8">
              What the next step looks like
            </h3>
            <div className="space-y-0">
              {steps.map(({ step, label, body }) => (
                <div
                  key={step}
                  className="flex items-start gap-5 py-5 border-b border-obsidian-moss/10"
                >
                  <p className="font-body text-[10px] tracking-[0.25em] text-dried-sage uppercase shrink-0 mt-1">
                    {step}
                  </p>
                  <div>
                    <p className="font-body text-sm text-obsidian-moss font-medium mb-1">
                      {label}
                    </p>
                    <p className="font-body text-sm text-obsidian-moss/55 leading-relaxed">
                      {body}
                    </p>
                  </div>
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
              <p className="font-heading text-3xl md:text-4xl text-pure-white mb-4 leading-tight">
                Founding Cohort Rate
              </p>
              <p className="font-body text-sm text-pure-white/50 mb-8">
                Payment plans available upon request.
              </p>
              <p className="font-body text-sm text-pure-white/65 leading-relaxed mb-10">
                This is a serious commitment — both financially and personally.
                The founding cohort rate reflects the real value of the work and
                the intimacy of the container.
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
    <section className="bg-linen-mist py-24 md:py-36 px-6 md:px-12">
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
          If You Recognize Yourself in This, You May Already Be at the Threshold.
        </h2>
        <p className="font-body text-base text-pure-white/65 leading-relaxed mb-6 max-w-lg mx-auto">
          This work is designed precisely for the moment you are in — when
          something real is happening and you need more than another framework to
          understand it. You need a structure capable of holding the actual
          crossing.
        </p>
        <p className="font-body text-base text-pure-white/65 leading-relaxed mb-12 max-w-lg mx-auto">
          The April 2026 cohort is small by design. If this speaks to something
          in you, the application is the first step.
        </p>
        <a
          href="mailto:apply@soulinitiationacademy.com"
          className="inline-block font-body text-xs tracking-[0.25em] uppercase px-12 py-5 bg-pure-white text-obsidian-moss hover:bg-linen-mist transition-colors duration-300"
        >
          Begin Your Application →
        </a>
        <p className="font-body text-[10px] text-pure-white/35 mt-8 tracking-[0.2em] uppercase">
          April 2026 · 6–12 Participants · Application Required
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
