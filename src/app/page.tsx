import Image from "next/image";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { Gallery } from "@/components/gallery";
import { Arrow } from "@/components/icons";
import { profile } from "@/data/profile";
import { DivingSection } from "@/components/diving-section";
import { SnowboardingSection } from "@/components/snowboarding-section";
import { ProjectsSection } from "@/components/projects-section";
import { EditingStory } from "@/components/editing-story";
import { TravelSection } from "@/components/travel-section";
import { ProgrammingSection } from "@/components/programming-section";
import { ProfileStructuredData } from "@/components/profile-structured-data";

export default function Home() {
  return (
    <>
      <ProfileStructuredData />
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
          <a className="text-link editing-jump" href="#how-i-see">
            How I think about an edit <Arrow direction="down" />
          </a>
          <Gallery />
          <EditingStory />
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
                For unfamiliar places, new opportunities,
                <br />
                and a little room for the unexpected.
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

        <TravelSection />
        <DivingSection />
        <SnowboardingSection />
        <ProgrammingSection />
        <ProjectsSection />

        <section
          id="contact"
          className="contact section-pad"
          aria-labelledby="contact-title"
        >
          <div className="section-label">
            <span className="eyebrow">08 / THE NEXT CHAPTER</span>
            <span className="eyebrow">
              <i className="status-dot" /> STARTS WITH A CONVERSATION
            </span>
          </div>
          <Reveal>
            <h2 id="contact-title">
              Good things start
              <br />
              with a <em>hello.</em>
            </h2>
          </Reveal>
          <div className="contact-bottom">
            <p>{profile.contact.invitation}</p>
            <div className="contact-links">
              <div className="contact-channel">
                <span className="eyebrow">EMAIL</span>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="contact-link"
                >
                  <span>{profile.contact.email}</span>
                  <Arrow />
                </a>
              </div>
              <div className="contact-channel">
                <span className="eyebrow">INSTAGRAM</span>
                <a
                  href={profile.contact.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram: ${profile.contact.instagram.handle}`}
                  className="contact-link"
                >
                  <span>{profile.contact.instagram.handle}</span>
                  <Arrow />
                </a>
              </div>
            </div>
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
          <summary>Photography & image credits</summary>
          <p>
            Selected gallery photography by Ivan Ilanić. The alternate hero
            scenes and fullscreen travel introduction still use design samples.
            Lake:{" "}
            <a href="https://unsplash.com/@tjholowaychuk">Tj Holowaychuk</a>.
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
