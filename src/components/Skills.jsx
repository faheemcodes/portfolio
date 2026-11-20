import React from "react";
import SectionTap from "./SectionTap";
import useReveal from "../hooks/useReveal";
import { skillDomains } from "../data/content";

function DomainCard({ domain, index }) {
  const [ref, isVisible] = useReveal();

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        style={{ "--card-delay": `${index * 160}ms` }}
        className={`domain-card spotlight-card reveal ${
          isVisible ? "is-visible" : ""
        }`}
      >
        <div className="domain-card__top">
          <span className="domain-card__index mono">DOMAIN // {domain.index}</span>
          {domain.code && <span className="domain-card__code mono">{domain.code}</span>}
        </div>
        <h3 className="domain-card__title">{domain.title}</h3>
        <p className="domain-card__desc">{domain.description}</p>
        <div className="skill-chip-row">
          {domain.skills.map((skill, chipIdx) => (
            <span
              className="skill-chip mono"
              key={skill}
              style={{ "--chip-idx": chipIdx }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [headRef, headVisible] = useReveal();

  return (
    <section id="skills">
      <div className="shell-container">
        <SectionTap index="§ 01" label="Core Competencies" />
        <div
          ref={headRef}
          className={`section-intro reveal-group ${
            headVisible ? "is-visible" : ""
          }`}
        >
          <span className="eyebrow stagger-item" style={{ "--i": 0 }}>
            Technical Stack &amp; Skills
          </span>
          <h2 className="section-heading stagger-item" style={{ "--i": 1 }}>
            Verified stack. Defendable code.
          </h2>
          <p className="section-sub mb-5 stagger-item" style={{ "--i": 2 }}>
            Core engineering strengths focused on relational data integrity, custom MVC backend architecture, and accessible, responsive user interfaces. No inflated buzzwords.
          </p>
        </div>

        <div className="row g-4">
          {skillDomains.map((domain, idx) => (
            <DomainCard domain={domain} index={idx} key={domain.index} />
          ))}
        </div>
      </div>
    </section>
  );
}
