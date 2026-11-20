import React, { useState } from "react";
import SectionTap from "./SectionTap";
import useReveal from "../hooks/useReveal";
import { profile } from "../data/content";

export default function Contact() {
  const year = new Date().getFullYear();
  const [copied, setCopied] = useState(false);
  const [panelRef, panelVisible] = useReveal();

  const handleCopyEmail = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(profile.email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      });
    }
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <>
      <section id="contact" className="contact-section">
        <div className="shell-container">
          <SectionTap index="§ 04" label="Connect & Collaborate" />
          <div
            ref={panelRef}
            onMouseMove={handleMouseMove}
            className={`contact-panel spotlight-card reveal-group ${
              panelVisible ? "is-visible" : ""
            }`}
          >
            <div className="contact-panel__badge mono stagger-item" style={{ "--i": 0 }}>
              <span className="status-indicator" />
              <span>{profile.availabilityBadge}</span>
            </div>

            <h2 className="contact-panel__headline stagger-item" style={{ "--i": 1 }}>
              Ready to contribute to your engineering team.
            </h2>

            <p className="contact-panel__sub stagger-item" style={{ "--i": 2 }}>
              Available for software engineering internships, junior/associate roles, or flexible part-time technical engagements alongside my final-year studies at the University of Sindh. Based in Hyderabad, Sindh; open to remote teams worldwide.
            </p>

            <div className="contact-email-box stagger-item" style={{ "--i": 3 }}>
              <span className="contact-email-box__label mono">DIRECT EMAIL</span>
              <a href={`mailto:${profile.email}`} className="contact-email-box__addr mono">
                {profile.email}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="contact-email-box__copy mono"
                aria-label="Copy email address to clipboard"
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>

            <div className="contact-links stagger-item" style={{ "--i": 4 }}>
              <a
                href={`mailto:${profile.email}`}
                className="btn-engineered btn-engineered--primary"
              >
                <span>Send Email</span>
                <span className="btn-engineered__arrow">→</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-engineered btn-engineered--ghost"
              >
                <span>GitHub (faheemcodes)</span>
                <span className="btn-engineered__arrow">↗</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-engineered btn-engineered--ghost"
              >
                <span>LinkedIn Profile</span>
                <span className="btn-engineered__arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="shell-container site-footer">
        <div className="footer-brand">
          <span className="footer-title mono">
            faheem<span className="nav-brand__dot">.</span>devlabs
          </span>
          <span className="footer-copy">
            © {year} {profile.name} &bull; Final-Year BS Software Engineering, University of Sindh
          </span>
        </div>
        <div className="footer-links">
          <a href="#top">Top ↑</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
      </footer>
    </>
  );
}
