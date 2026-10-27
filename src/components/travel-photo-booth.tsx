"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { type TravelPhoto } from "@/data/travel";
import { usePhotoTilt } from "@/hooks/use-photo-tilt";

export function TravelPhotoBooth({ photos }: { photos: TravelPhoto[] }) {
  const tilt = usePhotoTilt();
  return (
    <div
      className="travel-booth-stage"
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.reset}
    >
      <motion.figure
        className="travel-strip"
        style={{
          rotate: 3,
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          z: tilt.z,
        }}
      >
        <div className="travel-strip-header">
          <span>NO FIXED PLANS</span>
          <span>01 — {String(photos.length).padStart(2, "0")}</span>
        </div>
        <div className="travel-strip-frames">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`travel-shot travel-shot-${photo.id}`}
            >
              <div className="travel-shot-image">
                {photo.src ? (
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 600px) 80vw, 300px"
                  />
                ) : (
                  <div className="travel-shot-placeholder">
                    <span className="eyebrow">FRAME {photo.id}</span>
                    <span>PHOTOGRAPH TO COME</span>
                  </div>
                )}
                <span className="travel-shot-number" aria-hidden="true">
                  {photo.id}
                </span>
              </div>
              <p>{photo.caption}</p>
            </div>
          ))}
        </div>
        <figcaption>
          <span>Notes from the road.</span>
          <span>LEAVE ROOM FOR THE UNEXPECTED</span>
        </figcaption>
      </motion.figure>
    </div>
  );
}
