"use client";

interface MarqueeSectionProps {
  row1: string[];
  row2: string[];
}

export default function MarqueeSection({ row1, row2 }: MarqueeSectionProps) {
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
