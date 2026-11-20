import React from "react";
import useReveal from "../hooks/useReveal";
import { profile, heroMeta } from "../data/content";

export default function About() {
  const [leftRef, leftVisible] = useReveal();
  const [rightRef, rightVisible] = useReveal();

  return (
    <section id="about" className="about-editorial">
      <div className="about-editorial__container">
        {/* Left Column: Heading and verified credentials */}
        <div
          ref={leftRef}
          className={`about-editorial__left reveal-group ${
            leftVisible ? "is-visible" : ""
          }`}
        >
          <div className="about-editorial__eyebrow mono stagger-item" style={{ "--i": 0 }}>
            <span className="status-indicator" />
            <span>{profile.brand} &bull; Engineering Profile</span>
          </div>

          <h2 className="about-editorial__heading stagger-item" style={{ "--i": 1 }}>
            ABOUT
            <br />
            ME
          </h2>

          <div className="about-editorial__stats">
            {heroMeta.map((stat, i) => (
              <div
                key={i}
                className="editorial-stat stagger-item"
                style={{ "--i": i + 2 }}
              >
                <span className="editorial-stat__value">{stat.value}</span>
                <span className="editorial-stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Grounded, honest positioning */}
        <div
          ref={rightRef}
          className={`about-editorial__right reveal-group ${
            rightVisible ? "is-visible" : ""
          }`}
        >
          <p className="about-editorial__lead stagger-item" style={{ "--i": 0 }}>
            Hi, I'm <span className="about-name-accent">{profile.name}</span> — a software engineering student building reliable systems from first principles.
          </p>

          <p className="about-editorial__body stagger-item" style={{ "--i": 1 }}>
            I am currently in my final year of{" "}
            <strong>BS Software Engineering at the University of Sindh, Jamshoro</strong>, based in Hyderabad, Sindh, Pakistan. I focus on backend architecture and clean frontend engineering, prioritizing clear data flow, relational database design, and defensive security over superficial abstractions.
          </p>

          <p className="about-editorial__body stagger-item" style={{ "--i": 2 }}>
            Rather than relying on black-box scaffolding, I architect systems using{" "}
            <strong>custom PHP MVC</strong>, <strong>MySQL</strong> (3NF relational schema design, PDO prepared statements, CSRF/XSS mitigations),{" "}
            <strong>JavaScript (ES6+)</strong>, and <strong>React.js</strong>. Every module is written so I can explain and defend its trade-offs line-by-line in a technical review.
          </p>

          <div className="about-availability-card spotlight-card stagger-item" style={{ "--i": 3 }}>
            <div className="about-availability-card__header mono">
              <span className="status-indicator" />
              <span>CURRENT STATUS &amp; AVAILABILITY</span>
            </div>
            <p className="about-availability-card__text">{profile.availability}</p>
          </div>

          <div className="about-editorial__actions stagger-item" style={{ "--i": 4 }}>
            <a href="#work" className="btn-engineered btn-engineered--primary">
              <span>Inspect Case Studies</span>
              <span className="btn-engineered__arrow">↓</span>
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
              href={`mailto:${profile.email}`}
              className="btn-engineered btn-engineered--ghost"
            >
              <span>{profile.email}</span>
            </a>
          </div>

          <div className="about-editorial__signature stagger-item" style={{ "--i": 5 }}>
            <span className="sig-name">{profile.brand}</span>
            <span className="sig-title">
              {profile.name} — {profile.status} ({profile.institution})
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
