import React from "react";

/**
 * SchematicRail — fixed vertical blueprint margin shown on large screens.
 * This is the page's structural signature: every section "taps in" to
 * this line via the SectionTap component, echoing an engineering
 * drawing's margin rather than a decorative scroll progress bar.
 */
export default function SchematicRail() {
  return (
    <div className="schematic-rail" aria-hidden="true">
      <div className="schematic-rail__line" />
      <span className="schematic-rail__tag">FAHEEM // FULL-STACK</span>
      <span className="schematic-rail__tag">REV 2026.06</span>
    </div>
  );
}
