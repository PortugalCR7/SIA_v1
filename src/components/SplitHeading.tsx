"use client";

import { useEffect, useRef } from "react";

interface SplitHeadingProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  /** Stagger delay per word in ms (default 60) */
  stagger?: number;
  /** Base delay before first word in ms (default 0) */
  baseDelay?: number;
  as?: "h2" | "h1" | "h3" | "h4";
}

export default function SplitHeading({
  children,
  className = "",
  style,
  stagger = 60,
  baseDelay = 0,
  as: Tag = "h2",
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("split-words-in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    // Check if already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("split-words-in");
    } else {
      io.observe(el);
    }

    return () => io.disconnect();
  }, []);

  const words = children.split(/\s+/).filter(Boolean);

  return (
    <Tag ref={ref} className={`split-words ${className}`} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          className="split-word"
          style={{ transitionDelay: `${baseDelay + i * stagger}ms` }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
