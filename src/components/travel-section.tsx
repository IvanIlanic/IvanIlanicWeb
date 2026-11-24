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
        <span className="eyebrow">THE TRAVEL JOURNAL</span>
      </div>
      <TravelPhotoBooth photos={travelPhotos}>
        <div className="travel-copy">
          <Reveal>
            <h2 id="travel-title">
              Room for
              <br />
              <em>the unexpected.</em>
            </h2>
          </Reveal>
        </div>
      </TravelPhotoBooth>
      <TravelGlobe />
    </section>
  );
}
