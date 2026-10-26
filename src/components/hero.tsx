import Image from "next/image";
import { Arrow } from "./icons";
import { Reveal } from "./reveal";
import { Navigation } from "./navigation";

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <Image
        src="/images/alpine.jpg"
        alt="Sunlit peaks reflected in the still turquoise water of Moraine Lake"
        fill
        preload
        sizes="(max-width: 600px) 150vh, 100vw"
        className="hero-image"
      />
      <div className="hero-shade" />
      <Navigation />
      <div className="hero-topline">
        <span className="eyebrow">
          <i className="status-dot" /> A LIFE LED BY CURIOSITY
        </span>
        <span className="eyebrow hero-edition">PERSONAL JOURNAL — VOL. 01</span>
      </div>
      <div className="hero-content">
        <Reveal>
          <p className="eyebrow hero-kicker">
            DEVELOPER. IMAGE MAKER. EXPLORER.
          </p>
          <h1 id="hero-title">
            Ivan Ilanić<span>.</span>
          </h1>
        </Reveal>
        <Reveal className="hero-description" delay={0.15}>
          <p>
            Building things. Chasing light.
            <br />
            Taking the long way home.
          </p>
          <a className="text-link" href="#work">
            Step inside my world <Arrow />
          </a>
        </Reveal>
      </div>
      <div className="hero-footer">
        <a className="scroll-link eyebrow" href="#about">
          <span className="scroll-circle">
            <Arrow direction="down" />
          </span>
          SCROLL TO EXPLORE
        </a>
        <span className="hero-footnote">
          A little code. A little wilderness.
          <br />
          <span>A different way of seeing.</span>
        </span>
        <span className="frame-counter eyebrow">
          01 <span>/</span> 05
        </span>
      </div>
    </section>
  );
}
