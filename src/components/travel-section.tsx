import { travel, travelPhotos } from "@/data/travel";
import { TravelPhotoBooth } from "./travel-photo-booth";
import { Reveal } from "./reveal";
import { Arrow } from "./icons";

export function TravelSection() {
  return (
    <section
      id="journal"
      className="travel-section section-pad"
      aria-labelledby="travel-title"
    >
      <div className="section-label">
        <span className="eyebrow">THE TRAVEL JOURNAL</span>
        <span className="eyebrow">OPEN PLANS. OPEN POSSIBILITIES.</span>
      </div>
      <TravelPhotoBooth photos={travelPhotos}>
        <div className="travel-copy">
          <Reveal>
            <h2 id="travel-title">
              Room for
              <br />
              <em>the unexpected.</em>
            </h2>
            <p className="travel-lead">{travel.story[0]}</p>
            <p>{travel.story[1]}</p>
            <blockquote>{travel.thought}</blockquote>
            <div className="travel-values">
              <span>New perspectives</span>
              <span>Outside my comfort zone</span>
              <span>Open to opportunities</span>
            </div>
            <a href="#contact" className="text-link">
              A place or a story to share?
              <Arrow />
            </a>
          </Reveal>
        </div>
      </TravelPhotoBooth>
    </section>
  );
}
