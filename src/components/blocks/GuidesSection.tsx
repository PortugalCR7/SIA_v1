"use client";

import SplitHeading from "@/components/SplitHeading";

interface Guide {
  title: string;
  role: string;
  body: string;
  image?: any;
}

interface GuidesSectionProps {
  sectionLabel?: string;
  heading: string;
  guides?: Guide[];
}

export default function GuidesSection({
  sectionLabel = "Threshold Documents",
  heading,
  guides = [],
}: GuidesSectionProps) {
  return (
    <section className="bg-ink section-py px-6 md:px-14">
      <div className="max-w-6xl mx-auto">
        <p className="reveal overline text-parchment/40 font-bold mb-12 flex items-center gap-6"><span className="rule-gold opacity-40 w-12" />{sectionLabel}</p>
        <SplitHeading className="font-heading text-parchment mb-20 font-bold"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }} stagger={70} baseDelay={80}>
          {heading}
        </SplitHeading>
        <div className="grid md:grid-cols-3 gap-10">
          {guides.map(({ title, role, body }, i) => (
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
