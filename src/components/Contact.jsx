import React from "react";
import SectionTap from "./SectionTap";
import { profile } from "../data/content";

export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <>
      <section id="contact" className="contact-section">
        <div className="shell-container">
          <SectionTap index="§ 05" label="Contact" />
          <div className="contact-panel">
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              Get In Touch
            </span>
            <h2 className="contact-panel__headline">
              Have a system worth building well? Let's talk.
            </h2>
            <p className="contact-panel__sub">
              Open to full-stack development, automation, and AI-integration work — reach out
              directly or find the code itself.
            </p>
            <div className="contact-links">
              <a
                href={`mailto:${profile.email}`}
                className="btn-engineered btn-engineered--primary"
              >
                Email Me
                <span className="btn-engineered__arrow">→</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-engineered btn-engineered--ghost"
              >
                GitHub
                <span className="btn-engineered__arrow">↗</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-engineered btn-engineered--ghost"
              >
                LinkedIn
                <span className="btn-engineered__arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="shell-container site-footer">
        <span className="footer-copy">
          © {year} {profile.name}. Built with React &amp; Bootstrap.
        </span>
        <div className="footer-links">
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
