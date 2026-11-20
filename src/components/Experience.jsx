import React from "react";
import SectionTap from "./SectionTap";
import useReveal from "../hooks/useReveal";
import { experience, certifications } from "../data/content";

export default function Experience() {
  const [headRef, headVisible] = useReveal(0.24);
  const [ref, isVisible] = useReveal(0.18);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="experience">
      <div className="shell-container">
        <SectionTap index="§ 03" label="Background & Education" />
        <div
          ref={headRef}
          className={`section-intro reveal-group ${
            headVisible ? "is-visible" : ""
          }`}
        >
          <span className="eyebrow stagger-item" style={{ "--i": 0 }}>
            Academic &amp; Professional Journey
          </span>
          <h2 className="section-heading stagger-item" style={{ "--i": 1 }}>
            Rigorous fundamentals, continuous practice.
          </h2>
          <p className="section-sub mb-5 stagger-item" style={{ "--i": 2 }}>
            Final-year Software Engineering degree at University of Sindh, practical team leadership internship at TECHNIFY, and hands-on systems architecture.
          </p>
        </div>

        <div
          ref={ref}
          className={`row g-5 reveal-group ${isVisible ? "is-visible" : ""}`}
        >
          <div className="col-12 col-lg-7">
            <div className="subsection-header stagger-item" style={{ "--i": 0 }}>
              <span className="subsection-header__tag mono">TRACK // 01</span>
              <h3 className="subsection-header__title">Education &amp; Experience</h3>
            </div>
            <div className="timeline-list">
              {experience.map((item, i) => (
                <div
                  className="timeline-item stagger-item"
                  style={{ "--i": i + 1 }}
                  key={item.title}
                >
                  <div className="timeline-item__rail">
                    <div
                      className={`timeline-item__node ${
                        item.hollow ? "timeline-item__node--hollow" : ""
                      }`}
                    />
                    {i !== experience.length - 1 && (
                      <div className="timeline-item__rail-line" />
                    )}
                  </div>
                  <div
                    className="timeline-item__card spotlight-card"
                    onMouseMove={handleMouseMove}
                  >
                    <div className="timeline-item__meta">
                      <span className="timeline-item__period mono">{item.period}</span>
                      {item.organization && (
                        <span className="timeline-item__org mono">{item.organization}</span>
                      )}
                    </div>
                    <h4 className="timeline-item__title">{item.title}</h4>
                    <p className="timeline-item__desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="subsection-header stagger-item" style={{ "--i": 1 }}>
              <span className="subsection-header__tag mono">TRACK // 02</span>
              <h3 className="subsection-header__title">Certifications &amp; Academic Focus</h3>
            </div>
            {certifications.map((cert, cIdx) => (
              <div
                className="cert-card spotlight-card stagger-item"
                style={{ "--i": cIdx + 2 }}
                onMouseMove={handleMouseMove}
                key={cert.title}
              >
                <div className="cert-card__icon mono">{cert.code}</div>
                <div>
                  <div className="cert-card__title">{cert.title}</div>
                  <div className="cert-card__issuer">{cert.issuer}</div>
                </div>
              </div>
            ))}
            <div
              className="cert-card cert-card--active spotlight-card stagger-item"
              style={{ "--i": 4 }}
              onMouseMove={handleMouseMove}
            >
              <div className="cert-card__icon mono">FYP</div>
              <div>
                <div className="cert-card__title">Final-Year Project Defense &amp; Deployment</div>
                <div className="cert-card__issuer">
                  Faculty FYP Portal &bull; Custom PHP MVC &amp; MySQL
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
