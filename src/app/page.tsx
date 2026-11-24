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
          id="work"
          className="work section-pad"
          aria-labelledby="work-title"
        >
          <Reveal className="section-heading work-heading">
            <h2 id="work-title">Selected <em>photography.</em></h2>
          </Reveal>
          <Gallery />
          <EditingStory />
        </section>

        <section
          id="about"
          className="about section-pad"
          aria-labelledby="about-title"
        >
          <Reveal>
            <h2 id="about-title" className="statement">Behind the camera.</h2>
            <p className="profile-lead">{profile.introduction}</p>
            <a href="#projects" className="text-link">
              See my other projects <Arrow />
            </a>
          </Reveal>
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
            <span className="eyebrow">THE NEXT CHAPTER</span>
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
          <p>Gallery photography by Ivan Ilanić.</p>
        </details>
      </footer>
    </>
  );
}
