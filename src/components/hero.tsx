"use client";

import Image, { getImageProps } from "next/image";
import { useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";
import { Arrow } from "./icons";
import { Reveal } from "./reveal";
import { Navigation } from "./navigation";
import { profile } from "@/data/profile";

// Deliberately manual: no autoplay or continuous animation in the background.
const scenes = [
  {
    label: "Dusk",
    src: "/images/IvanHero.jpg",
    alt: "A person silhouetted against a deep blue sky and an orange sunset horizon",
    note: "CHASING THE LAST LIGHT.",
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
  // Reuse Next's optimized image route for the lettering instead of fetching
  // the full-resolution original a second time as a CSS background.
  const texture = getImageProps({
    src: scene.src,
    alt: "",
    width: 960,
    height: 640,
  }).props.src;

  return (
    <section
      onPointerMove={parallax.onPointerMove}
      onPointerLeave={parallax.onPointerLeave}
      id="home"
      className="hero"
      aria-labelledby="hero-title"
      style={{ "--scene-image": `url("${texture}")` } as CSSProperties}
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
          <p className="eyebrow hero-kicker">
            {profile.roles.join(". ").toUpperCase()}.
          </p>
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
      <nav className="scene-nav" aria-label="Choose a hero scene">
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
          Solving problems.
          <br />
          Creating. Exploring.
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
