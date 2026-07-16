import React from "react";

export default function IconSearch({ color = "currentColor", className = "w-5 h-5" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
      <path d="M20 20L16.65 16.65" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
