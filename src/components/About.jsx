import React from "react";
import { profile, heroMeta } from "../data/content";

export default function About() {
  return (
    <section id="about" className="about-editorial">
      <div className="about-editorial__container">
        
        {/* Left Column: Huge typography and stats */}
        <div className="about-editorial__left">
          <h2 className="about-editorial__heading">THE<br/>VISION</h2>
          
          <div className="about-editorial__stats">
            {heroMeta.map((stat, i) => (
              <div key={i} className="editorial-stat">
                <span className="editorial-stat__value">{stat.value}</span>
                <span className="editorial-stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Text content */}
        <div className="about-editorial__right">
          <p className="about-editorial__lead">
            I am a {profile.role} focusing on crafting interactive digital experiences. 
          </p>
          <p className="about-editorial__body">
            Bridging the gap between premium front-end aesthetics and robust back-end architecture, I build applications that are as visually striking as they are performant. My workflow revolves around modern toolchains, clean system design, and an obsessive attention to microscopic UI details.
          </p>
          <p className="about-editorial__body">
            Currently in my final year of Software Engineering, I am actively taking on challenging projects that demand a high degree of technical polish and creative problem-solving.
          </p>

          <div className="about-editorial__signature">
            <span className="sig-name">{profile.name}</span>
            <span className="sig-title">{profile.status}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
