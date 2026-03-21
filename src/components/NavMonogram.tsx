"use client";

import React from "react";

export default function NavMonogram({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 40 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
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
