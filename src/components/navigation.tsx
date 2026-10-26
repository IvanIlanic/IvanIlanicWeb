"use client";

import { useState } from "react";
import { Arrow } from "./icons";

const links = [
  ["About", "#about"],
  ["Selected work", "#work"],
  ["Journeys", "#journeys"],
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Ivan Ilanić, home">
        ivan ilanić<span className="brand-dot">®</span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <a className="header-contact" href="#contact">
        Let’s connect <Arrow />
      </a>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close −" : "Menu +"}
      </button>
      <nav
        id="mobile-menu"
        className={`mobile-nav ${open ? "is-open" : ""}`}
        aria-label="Mobile navigation"
        inert={!open}
      >
        {[...links, ["Contact", "#contact"]].map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
            <Arrow />
          </a>
        ))}
      </nav>
    </header>
  );
}
