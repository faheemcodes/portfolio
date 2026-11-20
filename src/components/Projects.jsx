import React, { useState } from "react";
import SectionTap from "./SectionTap";
import useReveal from "../hooks/useReveal";
import { caseStudies } from "../data/content";

function CaseStudyCard({ study, index }) {
  const [ref, isVisible] = useReveal();
  const [expanded, setExpanded] = useState(false);
  const isLive = Boolean(study.liveDemo);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <article
      ref={ref}
      onMouseMove={handleMouseMove}
      style={{ "--card-delay": `${index * 130}ms` }}
      className={`project-card spotlight-card reveal ${
        isVisible ? "is-visible" : ""
      } ${expanded ? "is-expanded" : ""}`}
      id={`project-${study.index.toLowerCase()}`}
    >
      {/* Top Bar: Index, Repo Slug & Status */}
      <div className="project-card__topbar">
        <div className="project-card__meta">
          <span className="project-card__index mono">{study.index}</span>
          {study.repoSlug && (
            <a
              href={study.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__repo mono"
              title="Open GitHub Repository"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span>{study.repoSlug}</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>

        <span
          className={`case-study__status mono ${
            isLive ? "case-study__status--live" : "case-study__status--dev"
          }`}
        >
          <span className="case-study__status-dot" />
          {study.status}
        </span>
      </div>

      {/* Main Content: Title, Tagline, Metrics & Highlights */}
      <div className="project-card__main">
        <div className="project-card__intro">
          <h3 className="project-card__title">{study.title}</h3>
          <p className="project-card__tagline">{study.tagline}</p>

          {/* Compact 4-Metric Strip */}
          {study.metrics && (
            <div className="project-metrics">
              {study.metrics.map((m, mIdx) => (
                <div
                  className="project-metric"
                  key={m.label}
                  style={{ "--metric-idx": mIdx }}
                >
                  <span className="project-metric__val mono">{m.value}</span>
                  <span className="project-metric__lbl">{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Scannable 4-Bullet Highlights */}
        {study.highlights && (
          <div className="project-card__highlights">
            <span className="project-card__highlights-label mono">
              VERIFIED CODEBASE HIGHLIGHTS
            </span>
            <ul className="project-card__list">
              {study.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Expandable Deep-Dive Drawer (Problem / Architecture / Security / Schema) */}
      {expanded && (
        <div className="project-card__drawer">
          <div className="project-drawer__grid">
            <div className="project-drawer__col">
              <span className="project-drawer__label mono">01 // PROBLEM SOLVED</span>
              <p className="project-drawer__text">{study.problem}</p>
            </div>
            <div className="project-drawer__col">
              <span className="project-drawer__label mono">02 // MVC &amp; DATA FLOW</span>
              <p className="project-drawer__text">{study.architecture}</p>
            </div>
            <div className="project-drawer__col">
              <span className="project-drawer__label mono">03 // DEFENSIVE SECURITY</span>
              <p className="project-drawer__text">{study.security}</p>
            </div>
          </div>

          {study.codebaseSpec && (
            <div className="project-drawer__spec mono">
              <div>
                <strong>PATTERN:</strong> {study.codebaseSpec.pattern}
              </div>
              <div>
                <strong>MODULES:</strong> {study.codebaseSpec.modules}
              </div>
              <div>
                <strong>SCHEMA:</strong> {study.codebaseSpec.schema}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Compact Footer Bar: Tech Chips + Drawer Toggle + Direct Links */}
      <div className="project-card__footer">
        <div className="project-card__stack">
          {study.stack.map((tech, chipIdx) => (
            <span
              className="skill-chip mono"
              key={tech}
              style={{ "--chip-idx": chipIdx }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="project-card__actions">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="project-card__toggle mono"
            aria-expanded={expanded}
          >
            <span>{expanded ? "Hide Architecture" : "Architecture Spec"}</span>
            <span className="project-card__toggle-icon">{expanded ? "−" : "+"}</span>
          </button>

          {study.github && (
            <a
              href={study.github}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study__link mono"
            >
              <span>GitHub</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}

          {study.liveDemo && (
            <a
              href={study.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study__link case-study__link--primary mono"
            >
              <span>Live Demo</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [headRef, headVisible] = useReveal();

  return (
    <section id="work" className="section-projects">
      <div className="shell-container">
        <SectionTap index="§ 02" label="Verified Repositories" />
        <div
          ref={headRef}
          className={`section-intro reveal-group ${
            headVisible ? "is-visible" : ""
          }`}
        >
          <span className="eyebrow stagger-item" style={{ "--i": 0 }}>
            Architecture &amp; Case Studies
          </span>
          <h2 className="section-heading stagger-item" style={{ "--i": 1 }}>
            Real repositories. Scannable at a glance.
          </h2>
          <p className="section-sub mb-5 stagger-item" style={{ "--i": 2 }}>
            Key metrics and verified codebase capabilities upfront — click{" "}
            <span className="mono" style={{ color: "var(--accent)" }}>
              Architecture Spec +
            </span>{" "}
            on any project to inspect its full MVC routing, MySQL schema, and security design.
          </p>
        </div>

        <div className="projects-grid">
          {caseStudies.map((study, idx) => (
            <CaseStudyCard study={study} index={idx} key={study.index} />
          ))}
        </div>
      </div>
    </section>
  );
}
