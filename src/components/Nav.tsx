"use client";

import { useEffect, useRef, useState } from "react";
import NavMonogram from "@/components/NavMonogram";

interface NavLink {
  label: string;
  url: string;
  isExternal: boolean;
}

interface NavProps {
  siteTitle: string;
  navLinks?: NavLink[];
}

export default function Nav({ siteTitle, navLinks = [] }: NavProps) {
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
          {siteTitle}
        </span>
      </a>
      {navLinks.map(({ label, url, isExternal }) => (
        <a
          key={url}
          href={url}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="overline text-parchment/60 hover:text-parchment transition-colors duration-300 hidden md:inline font-bold no-underline"
        >
          {label}
        </a>
      ))}
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
