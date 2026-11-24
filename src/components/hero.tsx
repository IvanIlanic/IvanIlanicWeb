"use client";

import Image, { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";
import { Arrow } from "./icons";
import { Reveal } from "./reveal";
import { Navigation } from "./navigation";

const heroPhoto = {
  src: "/images/IvanHero.jpg",
  alt: "A person silhouetted against a deep blue sky and an orange sunset horizon",
};

export function Hero() {
  const parallax = usePointerParallax();
  // Reuse Next's optimized image route for the lettering instead of fetching
  // the full-resolution original a second time as a CSS background.
  const texture = getImageProps({
    src: heroPhoto.src,
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
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          fill
          preload
          sizes="(max-width: 600px) 150vh, 100vw"
          className="hero-image"
        />
      </motion.div>
      <div className="hero-shade" />
      <Navigation />
      <motion.div className="hero-center" style={parallax.foreground}>
        <Reveal>
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
      <div className="hero-footer">
        <a
          href="#work"
          className="hero-scroll"
          aria-label="Browse selected photography"
        >
          <span className="eyebrow">DISCOVER</span>
          <Arrow direction="down" />
        </a>
      </div>
    </section>
  );
}
