import Image from "next/image";
import { snowboarding } from "@/data/snowboarding";
import { Reveal } from "./reveal";

export function SnowboardingSection() {
  return (
    <section
      id="snowboarding"
      className="snowboarding section-pad"
      aria-labelledby="snowboarding-title"
    >
      <div className="section-label">
        <span className="eyebrow">05 / CHASING WINTER</span>
        <span className="eyebrow">SNOWBOARDING · A LONG-AWAITED LOVE</span>
      </div>
      <Reveal className="section-heading snow-heading">
        <h2 id="snowboarding-title">
          Some dreams.
          <br />
          <em>Worth the wait.</em>
        </h2>
        <p>
          A board. A mountain.
          <br />A reason to keep going.
        </p>
      </Reveal>

      <div className="snow-story">
        <Reveal className="snow-story-copy">
          <p className="snow-lead">{snowboarding.story[0]}</p>
          <p>{snowboarding.story[1]}</p>
        </Reveal>
        <Reveal>
          <figure className="snow-photo">
            <div className="snow-photo-media">
              {snowboarding.photo.src ? (
                <Image
                  src={snowboarding.photo.src}
                  alt={snowboarding.photo.alt}
                  fill
                  sizes="(max-width: 600px) 100vw, 50vw"
                />
              ) : (
                <div className="snow-photo-placeholder">
                  <span className="eyebrow">THE WINTER CHAPTER</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 600 500"
                    fill="none"
                    className="snow-ridgeline"
                  >
                    <path
                      d="m-20 340 145-125 70 65L335 90l285 245"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="m195 280 75-40 65-150 22 134 63 49 41-29M125 215l-10 88 80-23M-20 390l145-87 130 82 102-161 130 153 133 15M-20 450l195-94 80 29 132-33 140 109 93-20"
                      stroke="currentColor"
                      strokeOpacity=".4"
                    />
                    <path
                      d="M333 260c-110 49 130 41-19 96s-13 49-65 101"
                      stroke="currentColor"
                      strokeOpacity=".65"
                      strokeDasharray="4 8"
                    />
                  </svg>
                  <div>
                    <p>
                      More turns.
                      <br />
                      <em>More possibilities.</em>
                    </p>
                    <span className="eyebrow">PHOTOGRAPH TO COME</span>
                  </div>
                </div>
              )}
            </div>
            <figcaption>
              <span>{snowboarding.photo.caption}</span>
              <span className="eyebrow">WINTER JOURNAL / 01</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <div className="snow-details">
        <div className="snow-riding">
          <span className="eyebrow">ON MY BOARD</span>
          <h3>Always building on it.</h3>
          <ul className="snow-skills">
            {snowboarding.skills.map((skill, index) => (
              <li key={skill}>
                <span className="eyebrow">0{index + 1}</span>
                {skill}
              </li>
            ))}
          </ul>
          <div className="snow-terrain">
            <span className="eyebrow">FAVORITE TERRAIN</span>
            <p>{snowboarding.favoriteTerrain.join(" / ")}</p>
          </div>
        </div>
        <Reveal className="snow-goal">
          <span className="eyebrow">
            THE NEXT CHAPTER · IN THE COMING YEARS
          </span>
          <h3>
            From rider
            <br />
            <em>to instructor.</em>
          </h3>
          <p>{snowboarding.goal}</p>
          <span className="snow-goal-note eyebrow">
            A DIRECTION I WANT TO GROW IN
          </span>
        </Reveal>
      </div>
    </section>
  );
}
