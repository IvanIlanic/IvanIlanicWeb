"use client";

import { useRef, useState } from "react";
import { Arrow } from "./icons";

const links = [
  ["About", "#about"],
  ["Selected work", "#work"],
  ["Travel", "#journeys"],
  ["Diving", "#diving"],
  ["Snowboarding", "#snowboarding"],
  ["Problems & projects", "#projects"],
  ["Contact", "#contact"],
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <a className="header-brand" href="#home" aria-label="Ivan Ilanić, home">
        <span className="monogram" aria-hidden="true">
          ii.
        </span>
        <span>
          IVAN
          <br />
          ILANIĆ
        </span>
      </a>
      <span className="header-edition eyebrow">
        INDEPENDENT MIND. OPEN HORIZONS.
      </span>
      <button
        ref={toggle}
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
        aria-label="Main navigation"
        inert={!open}
      >
        {links.map(([label, href], index) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            <span className="menu-index">0{index + 1}</span>
            {label}
            <Arrow />
          </a>
        ))}
      </nav>
    </header>
  );
}
