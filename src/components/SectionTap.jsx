import React from "react";

/**
 * SectionTap — small index + dividing line + label used at the top of
 * each major section. Encodes real document order (these sections do
 * appear in this sequence on the page) rather than decorative numbering.
 */
export default function SectionTap({ index, label }) {
  return (
    <div className="section-tap" aria-hidden="true">
      <span className="section-tap__index mono">{index}</span>
      <span className="section-tap__line" />
      <span className="section-tap__label">{label}</span>
    </div>
  );
}
