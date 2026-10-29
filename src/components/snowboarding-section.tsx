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
              <Image
                src={snowboarding.photo.src}
                alt={snowboarding.photo.alt}
                fill
                sizes="(max-width: 600px) calc(100vw - 48px), 45vw"
              />
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
