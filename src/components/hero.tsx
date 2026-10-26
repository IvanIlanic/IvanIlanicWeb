"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";
import { Arrow } from "./icons";
import { Reveal } from "./reveal";
import { Navigation } from "./navigation";

// Deliberately manual: no autoplay or continuous animation in the background.
const scenes = [
  {
    label: "Peaks",
    src: "/images/alpine.jpg",
    alt: "Rocky mountain peaks reflected in an alpine lake",
    note: "THE HIGHER YOU GO, THE MORE YOU SEE.",
  },
  {
    label: "Tides",
    src: "/images/ocean.jpg",
    alt: "Quiet open water stretching toward the horizon",
    note: "A LITTLE FURTHER FROM THE FAMILIAR.",
  },
  {
    label: "Still",
    src: "/images/lake.jpg",
    alt: "An empty wooden jetty reaching into a forest-lined lake",
    note: "SOME MOMENTS ASK YOU TO STAY.",
  },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const parallax = usePointerParallax();
  const scene = scenes[active];

  return (
    <section
      onPointerMove={parallax.onPointerMove}
      onPointerLeave={parallax.onPointerLeave}
      id="home"
      className="hero"
      aria-labelledby="hero-title"
      style={{ "--scene-image": `url("${scene.src}")` } as CSSProperties}
    >
      <motion.div className="hero-parallax" style={parallax.background}>
        <Image
          key={scene.src}
          src={scene.src}
          alt={scene.alt}
          fill
          preload={active === 0}
          loading={active === 0 ? undefined : "eager"}
          sizes="(max-width: 600px) 150vh, 100vw"
          className="hero-image"
        />
      </motion.div>
      <div className="hero-shade" />
      <Navigation />
      <motion.div className="hero-center" style={parallax.foreground}>
        <Reveal>
          <p className="eyebrow hero-kicker">CODE. CAMERA. CURIOSITY.</p>
          <h1 id="hero-title" aria-label="Ivan Ilanić">
            <span className="hero-lettering" aria-hidden="true">
              IVAN
            </span>
            <span className="hero-surname" aria-hidden="true">
              ILANIĆ
            </span>
          </h1>
        </Reveal>
      </motion.div>
      <nav className="scene-nav" aria-label="Choose a landscape">
        {scenes.map((item, index) => (
          <button
            key={item.label}
            aria-pressed={index === active}
            onClick={() => setActive(index)}
          >
            <span className="scene-number">0{index + 1}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="hero-footer">
        <p className="hero-intro">
          A developer’s mind.
          <br />
          An explorer’s eye.
        </p>
        <a
          href="#about"
          className="hero-scroll"
          aria-label="Discover more about Ivan"
        >
          <span className="eyebrow">DISCOVER</span>
          <Arrow direction="down" />
        </a>
        <div className="hero-index" aria-live="polite">
          <p className="eyebrow">{scene.note}</p>
          <span className="frame-counter">
            0{active + 1}
            <span> / 03</span>
          </span>
        </div>
      </div>
    </section>
  );
}
