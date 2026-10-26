import Image from "next/image";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { Gallery } from "@/components/gallery";
import { Arrow } from "@/components/icons";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Hero />
      <main id="main">
        <section
          id="about"
          className="about section-pad"
          aria-labelledby="about-title"
        >
          <div className="section-label">
            <span className="eyebrow">01 / A LITTLE ABOUT ME</span>
            <span className="asterisk" aria-hidden="true">
              ✳
            </span>
          </div>
          <Reveal>
            <h2 id="about-title" className="statement">
              I figure things out.
              <br />
              I bring ideas to life.
              <br />
              <em>I keep exploring.</em>
            </h2>
          </Reveal>
          <div className="about-bottom">
            <div>
              <span className="eyebrow">A FEW WORDS. A BIGGER PICTURE.</span>
              <p className="profile-lead">{profile.introduction[0]}</p>
            </div>
            <div>
              {profile.introduction.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <a href="#projects" className="text-link dark-link">
                See what I’m creating <Arrow />
              </a>
            </div>
          </div>
          <Reveal className="profile-pillars">
            {profile.pillars.map((pillar, index) => (
              <article key={pillar.title}>
                <span className="eyebrow">0{index + 1}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </Reveal>
        </section>

        <section
          id="work"
          className="work section-pad"
          aria-labelledby="work-title"
        >
          <div className="section-label">
            <span className="eyebrow">02 / THROUGH MY EYES</span>
            <span className="eyebrow">PHOTOGRAPHY & VISUAL STORIES</span>
          </div>
          <Reveal className="section-heading">
            <h2 id="work-title">
              The world,
              <br />
              <em>as I see it.</em>
            </h2>
            <p>
              Small moments. Wide-open spaces.
              <br />A reason to look a little closer.
            </p>
          </Reveal>
          <Gallery />
          <p className="sample-note">
            A visual direction in progress. These sample photographs will make
            way for my own photography and films.{" "}
            <a href="#image-credits">
              Image credits <span aria-hidden="true">↗</span>
            </a>
          </p>
        </section>

        <section
          id="journeys"
          className="journey"
          aria-labelledby="journey-title"
        >
          <Image
            src="/images/ocean.jpg"
            alt="Open water stretching toward the horizon"
            fill
            sizes="(max-width: 600px) 160vh, 100vw"
            className="journey-image"
          />
          <div className="journey-shade" />
          <div className="journey-content">
            <span className="eyebrow">03 / THE LONG WAY HOME</span>
            <Reveal>
              <h2 id="journey-title">
                Less ordinary.
                <br />
                <em>More outside.</em>
              </h2>
              <p>
                For the detours, the unfamiliar places,
                <br />
                and the stories we bring back.
              </p>
            </Reveal>
            <a className="text-link" href="#journal">
              The travel journal <Arrow direction="down" />
            </a>
          </div>
          <span className="journey-note eyebrow">
            AN OPEN INVITATION TO EXPLORE
          </span>
        </section>

        <section
          id="journal"
          className="journal section-pad"
          aria-labelledby="journal-title"
        >
          <div className="section-label">
            <span className="eyebrow">FIELD NOTES</span>
            <span className="eyebrow">THE JOURNAL IS JUST BEGINNING</span>
          </div>
          <Reveal className="journal-heading">
            <h2 id="journal-title">
              Every chapter
              <br />
              starts <em>somewhere.</em>
            </h2>
            <p>
              A space for journeys, personal milestones, and the lessons along
              the way. The first stories are still being written.
            </p>
          </Reveal>
          <div className="journal-line">
            <span className="journal-dot" />
            <span className="eyebrow">CHAPTER 01</span>
            <span>Making a little space on the internet.</span>
            <span className="eyebrow journal-status">YOU ARE HERE</span>
          </div>
        </section>

        <section
          id="projects"
          className="projects section-pad"
          aria-labelledby="projects-title"
        >
          <div className="section-label">
            <span className="eyebrow">04 / IDEAS INTO EXISTENCE</span>
            <span className="eyebrow">CODE & CREATIVE EXPERIMENTS</span>
          </div>
          <Reveal className="section-heading">
            <h2 id="projects-title">
              A different kind
              <br />
              of <em>canvas.</em>
            </h2>
            <p>
              Ideas worth trying.
              <br />
              Problems worth solving.
            </p>
          </Reveal>
          <details className="project">
            <summary>
              <div className="project-art" aria-hidden="true">
                <span className="orbit orbit-one" />
                <span className="orbit orbit-two" />
                <span className="orbit orbit-three" />
                <span className="orbit-core" />
                <span className="project-art-label eyebrow">
                  THE PERSONAL UNIVERSE — 001
                </span>
              </div>
              <div className="project-info">
                <span className="eyebrow">IN THE MAKING / WEB EXPERIENCE</span>
                <h3>
                  This little corner
                  <br />
                  of the internet.
                </h3>
                <p>
                  A home for code, photographs, and everything in between. Built
                  one thoughtful detail at a time.
                </p>
                <div className="tags">
                  <span>Next.js</span>
                  <span>TypeScript</span>
                  <span>Motion</span>
                </div>
                <span className="text-link">
                  Behind the build{" "}
                  <span className="project-plus" aria-hidden="true">
                    +
                  </span>
                </span>
              </div>
            </summary>
            <div className="project-details">
              <h4>Designed to feel simple. Built to stay that way.</h4>
              <p>
                Next.js App Router keeps the page and its content on the server.
                Small React components handle the gallery and navigation.
                Tailwind CSS and shared design tokens shape the layout; Motion
                adds subtle entrances with reduced-motion support.
              </p>
              <a
                href="https://github.com/IvanIlanic/IvanIlanicWeb"
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                Explore the repository <Arrow />
              </a>
            </div>
          </details>
        </section>

        <section
          id="contact"
          className="contact section-pad"
          aria-labelledby="contact-title"
        >
          <div className="section-label">
            <span className="eyebrow">05 / THE NEXT CHAPTER</span>
            <span className="eyebrow">
              <i className="status-dot" /> STARTS WITH A CONVERSATION
            </span>
          </div>
          <Reveal>
            <h2 id="contact-title">
              Good things start
              <br />
              with a <em>hello.</em>
              <span className="contact-star" aria-hidden="true">
                ✳
              </span>
            </h2>
          </Reveal>
          <div className="contact-bottom">
            <p>
              Have a problem to solve,
              <br />
              an idea to build, or a story to share?
            </p>
            <a
              href="https://github.com/IvanIlanic"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              Find me on GitHub <Arrow />
            </a>
          </div>
        </section>
      </main>
      <footer className="footer section-pad">
        <div className="footer-row">
          <a className="wordmark" href="#home">
            ivan ilanić<span className="brand-dot">®</span>
          </a>
          <span>Made with intention. Always in progress.</span>
          <a href="#home" className="text-link">
            Back to the top <Arrow />
          </a>
        </div>
        <details id="image-credits" className="credits">
          <summary>Sample photography & credits</summary>
          <p>
            Design preview imagery, not photographs by Ivan. Alpine landscape:{" "}
            <a href="https://unsplash.com/@john_artifexfilms">John Lee</a>.
            Lake:{" "}
            <a href="https://unsplash.com/@tjholowaychuk">Tj Holowaychuk</a>.
            Maple: <a href="https://unsplash.com/@i_am_g">Guillaume Jaillet</a>.
            Ocean: <a href="https://unsplash.com/@yucar">YUCAR FotoGrafik</a>.
            Via Unsplash and the{" "}
            <a href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
              Tailwind Next.js Starter Blog
            </a>
            .
          </p>
        </details>
      </footer>
    </>
  );
}
