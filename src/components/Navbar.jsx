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
      <div className="nav-pill">
        {/* Left: Brand */}
        <a href="#top" className="nav-brand" onClick={closeMenu}>
          Faheem<span className="nav-brand__dot">.</span>
        </a>

        {/* Center: Links */}
        <nav className="nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="nav-actions">
          <button
            type="button"
            className="nav-theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            )}
          </button>

          {/* Mobile menu toggle (visible only on small screens) */}
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
