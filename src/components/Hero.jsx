import React, { useRef } from "react";
import { profile } from "../data/content";

export default function Hero({ introComplete }) {
  const heroRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = heroRef.current;
    if (!el || window.innerWidth < 992) return;
    const rect = el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    el.style.setProperty("--mx", nx.toFixed(3));
    el.style.setProperty("--my", ny.toFixed(3));
  };

  const handleMouseLeave = () => {
    const el = heroRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "0");
    el.style.setProperty("--my", "0");
  };

  return (
    <section
      id="top"
      ref={heroRef}
      className={`hero-modern ${introComplete ? "is-ready" : "is-waiting"}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle radial spotlight behind the portrait */}
      <div className="hero-spotlight" aria-hidden="true" />

      {/* Desktop 4-Corner Editorial Framing */}
      <div className="hero-corner hero-corner--tl">
        <span className="hero-status-pill">
          <span className="hero-status-dot" />
          Open to Internships &amp; Remote
        </span>
      </div>

      <div className="hero-corner hero-corner--tr">
        <a href="#work" className="hero-arrow-link" title="Explore Engineering Case Studies">
          <span className="hero-arrow-label mono">Explore Systems</span>
          <svg
            className="hero-arrow-unified"
            width="54"
            height="14"
            viewBox="0 0 54 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M0 7H52M52 7L43.5 1.5M52 7L43.5 12.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      <div className="hero-corner hero-corner--bl">
        <span className="hero-corner-meta mono">{profile.name}</span>
        <span className="hero-corner-sub">
          {profile.status} &bull; {profile.institution}
        </span>
        <span className="hero-corner-stack mono">
          Custom PHP 8 MVC &bull; MySQL 3NF &bull; React.js &bull; REST APIs
        </span>
      </div>

      <div className="hero-corner hero-corner--br">
        <span className="hero-corner-meta mono">{profile.location}</span>
        <div className="hero-corner-actions">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-corner-link mono"
          >
            github.com/faheemcodes ↗
          </a>
          <span className="hero-corner-sep">&bull;</span>
          <a href="#contact" className="hero-corner-link mono">
            Contact ↓
          </a>
        </div>
      </div>

      {/* Center Layout: 3D Layered Text Back + Cutout Portrait + Outline Text Front */}
      <div className="hero-center-composition">
        <h1 className="hero-title hero-title--back">DEVLABS</h1>

        <div className="hero-image-wrapper">
          <img
            src="/images/cinematic.jpg"
            alt="Faheem Ahmed Soomro"
            className="hero-profile-image"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            onError={(e) => {
              if (!e.target.dataset.triedPng) {
                e.target.dataset.triedPng = "true";
                e.target.src = "/images/cinematic.png";
              } else if (!e.target.dataset.triedFallback) {
                e.target.dataset.triedFallback = "true";
                e.target.src = "/images/profile.png";
              } else {
                e.target.style.display = "none";
                if (e.target.nextElementSibling) {
                  e.target.nextElementSibling.style.display = "flex";
                }
              }
            }}
          />
          <div className="hero-image-placeholder" style={{ display: "none" }}>
            <div className="hero-silhouette"></div>
          </div>
        </div>

        <h1 className="hero-title hero-title--front" aria-hidden="true">
          DEVLABS
        </h1>
      </div>

      {/* Mobile Editorial Masthead Footer (< 768px) */}
      <div className="hero-mobile-hud">
        <div className="hero-mobile-hud__badge">
          <span className="hero-status-dot" />
          <span className="mono">{profile.availabilityBadge}</span>
        </div>

        <div className="hero-mobile-hud__row">
          <div className="hero-mobile-hud__info">
            <div className="hero-mobile-hud__name mono">{profile.name}</div>
            <div className="hero-mobile-hud__role">
              Final-Year BS Software Engineering &bull; UoS
            </div>
            <div className="hero-mobile-hud__stack mono">
              PHP 8 MVC &bull; MySQL &bull; React.js &bull; REST APIs
            </div>
          </div>
          <a href="#work" className="hero-mobile-hud__cta mono" aria-label="Jump to Projects">
            <span>Projects</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
