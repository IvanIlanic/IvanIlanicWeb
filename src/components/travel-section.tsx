import { travelPhotos } from "@/data/travel";
import { TravelPhotoBooth } from "./travel-photo-booth";
import { Reveal } from "./reveal";
import { TravelGlobe } from "./travel-globe";

export function TravelSection() {
  return (
    <section
      id="journal"
      className="travel-section section-pad"
      aria-labelledby="travel-title"
    >
      <div className="section-label">
        <span className="eyebrow">TRAVEL</span>
      </div>
      <TravelPhotoBooth photos={travelPhotos}>
        <div className="travel-copy">
          <Reveal>
            <h2 id="travel-title">
              Room for
              <br />
              <em>the unexpected.</em>
            </h2>
            <p className="travel-intro">
              I like travelling with room in the plan for something unexpected.
              A new place, a conversation, or a chance to take a different route
              can change the direction of a trip. That’s part of what I enjoy.
            </p>
          </Reveal>
        </div>
      </TravelPhotoBooth>
      <TravelGlobe />
    </section>
  );
}
