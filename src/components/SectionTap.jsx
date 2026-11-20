import React from "react";
import useReveal from "../hooks/useReveal";

/**
 * SectionTap — small index + animated dividing line + label used at the top
 * of each major section. Draws its line horizontally on scroll reveal.
 */
export default function SectionTap({ index, label }) {
  const [ref, isVisible] = useReveal(0.15);

  return (
    <div
      ref={ref}
      className={`section-tap ${isVisible ? "is-visible" : ""}`}
      aria-hidden="true"
    >
      <span className="section-tap__index mono">{index}</span>
      <span className="section-tap__line" />
      <span className="section-tap__label">{label}</span>
    </div>
  );
}
