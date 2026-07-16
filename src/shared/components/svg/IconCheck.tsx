import React from "react";

export default function IconCheck({ color = "currentColor", className = "w-4 h-4" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M5 13L9.5 17.5L19 7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
