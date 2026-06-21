import React from "react";
import SectionTap from "./SectionTap";
import { experience, certifications } from "../data/content";

export default function Experience() {
  return (
    <section id="experience">
      <div className="shell-container">
        <SectionTap index="§ 04" label="Experience & Education" />
        <span className="eyebrow">Background</span>
        <h2 className="section-heading">Currently building, currently learning.</h2>
        <p className="section-sub mb-5">
          Formal study and independent engineering work, running in parallel.
        </p>

        <div className="row g-5">
          <div className="col-12 col-lg-7">
            <h3 className="h5 mb-4">Education &amp; Track Record</h3>
            <div>
              {experience.map((item, i) => (
                <div className="timeline-item" key={item.title}>
                  <div className="timeline-item__rail">
                    <div
                      className={`timeline-item__node ${
                        item.hollow ? "timeline-item__node--hollow" : ""
                      }`}
                    />
                    {i !== experience.length - 1 && <div className="timeline-item__rail-line" />}
                  </div>
                  <div>
                    <span className="timeline-item__period">{item.period}</span>
                    <h4 className="timeline-item__title">{item.title}</h4>
                    <p className="timeline-item__desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <h3 className="h5 mb-4">Certifications</h3>
            {certifications.map((cert) => (
              <div className="cert-card" key={cert.title}>
                <div className="cert-card__icon mono">{cert.code}</div>
                <div>
                  <div className="cert-card__title">{cert.title}</div>
                  <div className="cert-card__issuer">{cert.issuer}</div>
                </div>
              </div>
            ))}
            <div className="cert-card" style={{ opacity: 0.5, borderStyle: "dashed" }}>
              <div className="cert-card__icon mono">+</div>
              <div>
                <div className="cert-card__title">More in progress</div>
                <div className="cert-card__issuer">Continuous learning</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
