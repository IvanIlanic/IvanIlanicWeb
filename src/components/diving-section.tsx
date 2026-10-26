import Image from "next/image";
import { diving, divePhotos } from "@/data/diving";
import { Reveal } from "./reveal";

export function DivingSection() {
  return (
    <section
      id="diving"
      className="diving section-pad"
      aria-labelledby="diving-title"
    >
      <div className="section-label">
        <span className="eyebrow">04 / BENEATH THE SURFACE</span>
        <span className="eyebrow">SCUBA DIVING · A PERSONAL JOURNEY</span>
      </div>
      <Reveal className="section-heading diving-heading">
        <h2 id="diving-title">
          Where I find
          <br />
          <em>my quiet.</em>
        </h2>
        <p>
          A calmer mind.
          <br />A different world.
        </p>
      </Reveal>

      <div className="diving-story">
        <Reveal>
          <p className="diving-lead">{diving.story[0]}</p>
        </Reveal>
        <div>
          {diving.story.slice(1).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="diving-photos" aria-label="Dive photographs">
        {divePhotos.map((photo) => (
          <Reveal
            key={photo.id}
            className={`diving-frame diving-frame-${photo.id}`}
          >
            <figure>
              <div className="diving-photo-media">
                {photo.src ? (
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 600px) 100vw, 36vw"
                  />
                ) : (
                  <div className="diving-placeholder">
                    <span className="eyebrow">FRAME {photo.id}</span>
                    <span className="eyebrow">PHOTOGRAPH TO COME</span>
                  </div>
                )}
              </div>
              <figcaption>
                <span>{photo.caption}</span>
                <span className="eyebrow">{photo.id}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <div className="diving-progression">
        <span className="eyebrow">THE JOURNEY SO FAR</span>
        <ol className="diving-qualifications">
          {diving.qualifications.map((qualification, index) => (
            <li
              key={qualification.title}
              className={qualification.completed ? "is-complete" : "is-next"}
            >
              <span className="eyebrow">0{index + 1}</span>
              <h3>{qualification.title}</h3>
              <p>
                <span className="diving-status-dot" aria-hidden="true" />
                {qualification.status}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
