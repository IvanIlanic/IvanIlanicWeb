import Image from "next/image";
import { projects, type ProjectCaseStudy } from "@/data/projects";
import { Arrow } from "./icons";
import { Reveal } from "./reveal";

function ProjectArtwork({ theme }: { theme: ProjectCaseStudy["theme"] }) {
  return (
    <div className={`case-art case-art-${theme}`} aria-hidden="true">
      {theme === "beerluga" ? (
        <>
          <span className="case-art-label eyebrow">
            BEERLUGA / PROJECT IDENTITY
          </span>
          <svg className="case-map" viewBox="0 0 500 500" fill="none">
            <path
              d="M-30 80 100 160 170 130 280 240 400 170 540 240M-20 230 110 210 220 330 380 290 510 380M80-20 150 100 110 210 140 400 80 520M300-20 260 100 280 240 220 330 270 520M420-20 400 170 380 290 420 520"
              stroke="currentColor"
              strokeWidth="18"
            />
            <path
              d="M-50 400c160-110 180 180 360 40s100-190 260-180"
              stroke="currentColor"
              strokeWidth="38"
            />
          </svg>
          <Image
            src="/projects/beerluga-mascot.png"
            alt=""
            width={280}
            height={420}
            className="case-mascot"
          />
          <span className="case-art-footer eyebrow">
            A MAP. A PLAN. A HAPPY HOUR.
          </span>
        </>
      ) : theme === "defend" ? (
        <>
          <span className="case-art-label eyebrow">
            DEFEND THE FLAG / PROJECT IDENTITY
          </span>
          <svg className="case-shield" viewBox="0 0 280 300" fill="none">
            <path
              d="m140 20 100 40v80c0 68-100 136-100 136S40 208 40 140V60z"
              stroke="currentColor"
            />
            <path
              d="m140 55 70 28v57c0 43-70 100-70 100S70 183 70 140V83zM140 55v185M70 140h140"
              stroke="currentColor"
              strokeOpacity=".4"
            />
          </svg>
          <Image
            src="/projects/defend-the-flag-wordmark.png"
            alt=""
            width={460}
            height={106}
            className="case-wordmark"
          />
          <span className="case-art-footer eyebrow">
            BUILD / SECURE / LEARN
          </span>
        </>
      ) : (
        <>
          <span className="case-art-label eyebrow">
            KAZUNI NINA / STOREFRONT EXAMPLE
          </span>
          <p className="case-business-type">
            Local.
            <br />
            <em>Digital.</em>
            <br />
            Connected.
          </p>
          <div className="case-business-flow">
            <span>Products</span>
            <Arrow direction="right" />
            <span>Requests</span>
            <Arrow direction="right" />
            <span>Appointments</span>
          </div>
        </>
      )}
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="projects section-pad"
      aria-labelledby="projects-title"
    >
      <div className="section-label">
        <span className="eyebrow">07 / PROBLEMS INTO POSSIBILITIES</span>
        <span className="eyebrow">PRODUCTS / LEARNING / SMALL BUSINESSES</span>
      </div>
      <Reveal className="section-heading">
        <h2 id="projects-title">
          Real problems.
          <br />
          <em>Things I build.</em>
        </h2>
        <p>
          A useful question.
          <br />A thoughtful way forward.
        </p>
      </Reveal>
      <p className="projects-intro">
        From finding a happy hour to learning cybersecurity or running a small
        business, I’m interested in the places where a clearer digital
        experience can make a difference.
      </p>
      <div className="case-studies">
        {projects.map((project) => (
          <article
            key={project.id}
            className={`case-study case-study-${project.theme}`}
            aria-labelledby={`case-${project.id}-title`}
          >
            <Reveal>
              <ProjectArtwork theme={project.theme} />
            </Reveal>
            <div className="case-copy">
              <p className="eyebrow case-category">
                {project.id} / {project.category}
              </p>
              <h3 id={`case-${project.id}-title`}>{project.title}</h3>
              <p className="case-headline">{project.headline}</p>
              <div className="case-explanation">
                <h4>The problem</h4>
                <p>{project.problem}</p>
              </div>
              <div className="case-explanation">
                <h4>My approach</h4>
                <p>{project.approach}</p>
              </div>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <details className="case-details">
                <summary>
                  Take a closer look<span aria-hidden="true">+</span>
                </summary>
                <div>
                  <h4>{project.detail.title}</h4>
                  <p>{project.detail.body}</p>
                </div>
              </details>
              <div className="case-links">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={
                      link.href.startsWith("https:") ? "_blank" : undefined
                    }
                    rel={
                      link.href.startsWith("https:") ? "noreferrer" : undefined
                    }
                    className="text-link"
                  >
                    {link.label}
                    <Arrow />
                  </a>
                ))}
                {project.paperUrl && (
                  <a
                    href={project.paperUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-link"
                  >
                    Read the paper
                    <Arrow />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
