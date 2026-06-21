import React from "react";
import SectionTap from "./SectionTap";
import useReveal from "../hooks/useReveal";
import { skillDomains } from "../data/content";

function DomainCard({ domain }) {
  const [ref, isVisible] = useReveal();
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div ref={ref} className={`domain-card reveal ${isVisible ? "is-visible" : ""}`}>
        <span className="domain-card__index mono">{domain.index}</span>
        <h3 className="domain-card__title">{domain.title}</h3>
        <p className="domain-card__desc">{domain.description}</p>
        <div className="skill-chip-row">
          {domain.skills.map((skill) => (
            <span className="skill-chip mono" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills">
      <div className="shell-container">
        <SectionTap index="§ 02" label="Capabilities" />
        <span className="eyebrow">Skills &amp; Capabilities</span>
        <h2 className="section-heading">Three domains, one connected stack.</h2>
        <p className="section-sub mb-5">
          Each layer is built to interoperate — interfaces, services, and automation that share a
          consistent engineering standard end to end.
        </p>

        <div className="row g-4">
          {skillDomains.map((domain) => (
            <DomainCard domain={domain} key={domain.index} />
          ))}
        </div>
      </div>
    </section>
  );
}
