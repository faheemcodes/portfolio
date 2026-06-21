import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const NAV_ITEMS = [
  { href: "#skills", label: "Capabilities" },
  { href: "#work", label: "Case Studies" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-nav">
      <div className="shell-container">
        <a href="#top" className="brand" onClick={closeMenu}>
          Faheem<span className="brand__dot">.</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-switch"
            onClick={toggleTheme}
            role="switch"
            aria-checked={theme === "light"}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <span className="theme-switch__thumb">{theme === "dark" ? "☾" : "☀"}</span>
          </button>

          <button
            type="button"
            className="btn-mobile-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? "✕" : "≡"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
