import React from "react";
import { profile } from "../data/content";

export default function Hero() {
  return (
    <section id="top" className="hero-modern">
      {/* Corner Details */}
      <div className="hero-corner hero-corner--tl">
        {profile.role}
      </div>
      <div className="hero-corner hero-corner--tr">
        <a href="#work" className="hero-arrow-link">
          <span className="hero-arrow-line"></span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
      <div className="hero-corner hero-corner--bl">
        {profile.name}
      </div>
      <div className="hero-corner hero-corner--br">
        {profile.github.replace('https://', '').replace(/\/$/, '')}
      </div>

      {/* Center Layout: Text Back, Image, Text Front */}
      <div className="hero-center-composition">
        {/* Giant background typography */}
        <h1 className="hero-title hero-title--back">Portfolio</h1>
        
        {/* The user's image goes here. Ensure public/images/profile.png exists! */}
        <div className="hero-image-wrapper">
          <img 
            src="/images/profile.png" 
            alt="Faheem Portfolio Profile" 
            className="hero-profile-image" 
            onError={(e) => {
              // Fallback if image is missing
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="hero-image-placeholder" style={{display: 'none'}}>
            {/* Fallback silhouette if image fails to load */}
            <div className="hero-silhouette"></div>
          </div>
        </div>

        {/* Transparent outline typography that overlaps the image */}
        <h1 className="hero-title hero-title--front" aria-hidden="true">Portfolio</h1>
      </div>
    </section>
  );
}
