import React from "react";
import { heroMeta, profile } from "../data/content";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__grid-bg" />
      <div className="shell-container">
        <div className="row">
          <div className="col-12 col-xl-10">
            <span className="hero__status">
              <span className="hero__status-dot" />
              Open to full-stack & automation engagements
            </span>

            <h1 className="hero__headline">
              I engineer <em>robust full-stack systems</em> and the automation that keeps them
              running.
            </h1>

            <p className="hero__sub">
              I'm <strong>{profile.name}</strong>, a {profile.role.toLowerCase()} and{" "}
              {profile.status.toLowerCase()}. I build production-grade platforms on{" "}
              <strong>Laravel</strong> and <strong>React</strong>, and connect them to{" "}
              <strong>Python</strong>-driven automation and testing pipelines — so the systems I
              ship don't just work, they stay working.
            </p>

            <div className="hero__cta-row">
              <a href="#work" className="btn-engineered btn-engineered--primary">
                View Case Studies
                <span className="btn-engineered__arrow">→</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-engineered btn-engineered--ghost"
              >
                GitHub Profile
                <span className="btn-engineered__arrow">↗</span>
              </a>
            </div>

            <div className="hero__meta-strip">
              {heroMeta.map((item) => (
                <div className="hero__meta-cell" key={item.label}>
                  <span className="hero__meta-value mono">{item.value}</span>
                  <span className="hero__meta-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
