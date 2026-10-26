import { diving, divePhotos } from "@/data/diving";
import { Reveal } from "./reveal";
import { DivingPhotoGallery } from "./diving-photo-gallery";

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

      <DivingPhotoGallery photos={divePhotos} />

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
