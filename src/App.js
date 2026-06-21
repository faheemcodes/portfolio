import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import SchematicRail from "./components/SchematicRail";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

export default function App() {
  return (
    <ThemeProvider>
      <div className="app-shell">
        <SchematicRail />
        <Navbar />
        <main>
          <Hero />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}
