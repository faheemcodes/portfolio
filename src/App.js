import React, { useState } from "react";
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
  const [introComplete, setIntroComplete] = useState(() => {
    if (typeof window === "undefined") return false;
    const hash = window.location.hash;
    const isOtherSection = Boolean(hash && hash !== "#" && hash !== "#top");
    const isScrolledDown = window.scrollY > 80;
    return isOtherSection || isScrolledDown;
  });

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
