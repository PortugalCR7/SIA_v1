"use client";

import { useEffect, useRef } from "react";

type CursorState = "default" | "apply" | "view" | "nav" | "link";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const mouse = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Touch devices: hide and bail
    if (window.matchMedia("(pointer: coarse)").matches) return;
    // Reduced motion: bail
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ringEl || !label) return;

    document.body.style.cursor = "none";

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const applyState = (state: CursorState) => {
      dot.dataset.state = state;
      ringEl.dataset.state = state;

      const isTextState = state === "apply" || state === "view";
      label.style.opacity = isTextState ? "1" : "0";
      label.textContent =
        state === "apply" ? "Apply" : state === "view" ? "View" : "";
    };

    const onMouseOver = (e: MouseEvent) => {
      const t = e.target as Element;

      if (
        t.closest(".btn-fill") ||
        t.closest('a[href="#apply"]') ||
        t.closest('a[href^="mailto"]')
      ) {
        applyState("apply");
      } else if (t.closest("img") || t.closest("[data-cursor='view']")) {
        applyState("view");
      } else if (t.closest("nav")) {
        applyState("nav");
      } else if (
        t.closest("a") ||
        t.closest("button") ||
        t.closest("summary") ||
        t.closest("[role='button']")
      ) {
        applyState("link");
      } else {
        applyState("default");
      }
    };

    const onMouseLeave = () => {
      mouse.current = { x: -200, y: -200 };
    };

    // Spring physics loop — ring lerps toward mouse position
    const SPRING = 0.11;
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * SPRING;
      ring.current.y += (mouse.current.y - ring.current.y) * SPRING;

      dot.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`;
      ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" data-state="default" />
      <div ref={ringRef} aria-hidden="true" className="cursor-ring" data-state="default">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  );
}
