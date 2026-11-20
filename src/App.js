import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import IntroLoader from "./components/IntroLoader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

export default function App() {
  // Preload intro ALWAYS loads at first
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Scroll to top immediately on mount so the intro and hero are front & center
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <ThemeProvider>
      <div
        className={`app-shell ${
          introComplete ? "intro-is-complete" : "intro-is-active"
        }`}
      >
        {!introComplete && (
          <IntroLoader onComplete={() => setIntroComplete(true)} />
        )}
        <Navbar />
        <main>
          <Hero introComplete={introComplete} />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}
