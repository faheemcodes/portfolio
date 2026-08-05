import React from "react";
import SectionTap from "./SectionTap";
import useReveal from "../hooks/useReveal";
import { caseStudies } from "../data/content";

function CaseStudyCard({ study }) {
  const [ref, isVisible] = useReveal(0.08);
  return (
    <div ref={ref} className={`case-study reveal ${isVisible ? "is-visible" : ""}`}>
      <div className="case-study__inner">
        <div className="case-study__content">
          <div className="case-study__header">
            <div>
              <span className="case-study__index mono">{study.index}</span>
              <h3 className="case-study__title">{study.title}</h3>
              <p className="case-study__tagline">{study.tagline}</p>
            </div>
            <span className="case-study__status mono">{study.status}</span>
          </div>

          <div className="case-study__body">
            <div className="case-study__flow">
              <div className="case-study__flow-step">
                <span className="case-study__flow-label">Problem</span>
                <p className="case-study__flow-text">{study.problem}</p>
              </div>
              <div className="case-study__flow-step">
                <span className="case-study__flow-label">Architecture</span>
                <p className="case-study__flow-text">{study.architecture}</p>
              </div>
              <div className="case-study__flow-step">
                <span className="case-study__flow-label">Result</span>
                <p className="case-study__flow-text">{study.result}</p>
              </div>
            </div>

            <div className="case-study__stack">
              {study.stack.map((tech) => (
                <span className="skill-chip mono" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Placeholder for project mockups in the future */}
        <div className="case-study__visual">
          <div className="case-study__image-placeholder">
            <span>Project Visual</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="section-projects">
      <div className="shell-container">
        <SectionTap index="§ 03" label="Case Studies" />
        <span className="eyebrow">Project Case Studies</span>
        <h2 className="section-heading">Three systems, three real problems solved.</h2>
        <p className="section-sub mb-5">
          Each project below follows the same lens it was built with: the problem it had to
          solve, the architecture that solved it, and the measurable result.
        </p>

        <div className="projects-grid">
          {caseStudies.map((study) => (
            <CaseStudyCard study={study} key={study.index} />
          ))}
        </div>
      </div>
    </section>
  );
}
