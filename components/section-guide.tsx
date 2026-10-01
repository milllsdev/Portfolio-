"use client";
import { useEffect, useState } from "react";
const sections = [
  { id: "home", label: "Introduction" },
  { id: "work", label: "Selected work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About me" },
  { id: "skills", label: "Technical toolkit" },
  { id: "activities", label: "Community" },
  { id: "contact", label: "Get in touch" },
];
export function SectionGuide() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let active = 0;
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.4) active = index;
      });
      setCurrent(active);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);
  const next = sections[(current + 1) % sections.length];
  return <aside className="section-guide" aria-label="Page guide" data-paused={paused || undefined}>
    <a href={"#" + next.id} className="guide-link" aria-label={(current === sections.length - 1 ? "Back to " : "Next section: ") + next.label}>
      <svg className="guide-character" viewBox="0 0 72 80" aria-hidden="true">
        <path className="guide-hand" d="M55 39Q69 38 65 50" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M17 39Q6 43 10 50" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M24 64L22 74M47 64L49 74" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <rect x="15" y="9" width="43" height="57" rx="15" fill="#d9e2c8" stroke="currentColor" strokeWidth="2" />
        <path d="M30 10L36 3L42 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <g className="guide-eyes"><circle cx="28" cy="31" r="3" fill="currentColor" /><circle cx="45" cy="31" r="3" fill="currentColor" /></g>
        <path d="M29 43Q36 49 43 43" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M36 53V60M32 56L36 60L40 56" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="guide-caption"><span className="eyebrow">{current === sections.length - 1 ? "Back to top" : "Up next"}</span><span>{next.label} <span aria-hidden="true">{current === sections.length - 1 ? "↑" : "↓"}</span></span></span>
    </a>
    <button type="button" className="guide-pause" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? "Resume motion" : "Pause motion"}</button>
  </aside>;
}
