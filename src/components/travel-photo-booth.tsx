"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { type TravelPhoto } from "@/data/travel";
import { usePhotoTilt } from "@/hooks/use-photo-tilt";
import { Arrow } from "./icons";

const framesPerStrip = 3;
const formatNumber = (value: number) => String(value).padStart(2, "0");

export function TravelPhotoBooth({ photos }: { photos: TravelPhoto[] }) {
  const tilt = usePhotoTilt();
  const stripId = useId();
  const [strip, setStrip] = useState(0);
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const stripCount = Math.ceil(photos.length / framesPerStrip);
  const visiblePhotos = photos.slice(
    strip * framesPerStrip,
    (strip + 1) * framesPerStrip,
  );
  const activePhoto = photos[active];

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  function openPhoto(index: number) {
    trigger.current = document.activeElement as HTMLElement;
    tilt.reset();
    setActive(index);
    setIsOpen(true);
    dialog.current?.showModal();
    closeButton.current?.focus();
  }

  function changePhoto(direction: number) {
    setActive(
      (current) => (current + direction + photos.length) % photos.length,
    );
  }

  return (
    <>
      <div className="travel-booth-gallery">
        <div
          className="travel-booth-stage"
          onPointerMove={tilt.onPointerMove}
          onPointerLeave={tilt.reset}
          onFocus={tilt.onFocus}
          onBlur={tilt.reset}
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
              <span>
                {formatNumber(strip * framesPerStrip + 1)} —{" "}
                {formatNumber(
                  Math.min((strip + 1) * framesPerStrip, photos.length),
                )}
              </span>
            </div>
            <div id={stripId} className="travel-strip-frames">
              {visiblePhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`travel-shot travel-shot-${photo.id}`}
                >
                  <button
                    className="travel-shot-image"
                    aria-label={`View travel photograph ${photo.id}: ${photo.caption}`}
                    aria-haspopup="dialog"
                    onClick={() => openPhoto(strip * framesPerStrip + index)}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 600px) 80vw, 300px"
                      style={{ objectPosition: photo.objectPosition }}
                    />
                    <span className="travel-shot-number" aria-hidden="true">
                      {photo.id}
                    </span>
                    <span className="travel-shot-expand" aria-hidden="true">
                      <Arrow />
                    </span>
                  </button>
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
        <div className="travel-strip-controls">
          <button
            onClick={() => {
              tilt.reset();
              setStrip((strip + stripCount - 1) % stripCount);
            }}
            aria-label="Previous travel strip"
            aria-controls={stripId}
            disabled={stripCount < 2}
          >
            <Arrow direction="left" />
          </button>
          <div role="status" aria-atomic="true">
            <span>
              STRIP {formatNumber(strip + 1)} / {formatNumber(stripCount)}
            </span>
            <span>{photos.length} moments from the road</span>
          </div>
          <button
            onClick={() => {
              tilt.reset();
              setStrip((strip + 1) % stripCount);
            }}
            aria-label="Next travel strip"
            aria-controls={stripId}
            disabled={stripCount < 2}
          >
            <Arrow direction="right" />
          </button>
        </div>
        <p className="travel-gallery-hint">
          Choose a photo to see the whole frame.
        </p>
      </div>
      <dialog
        ref={dialog}
        className="lightbox travel-lightbox"
        aria-label="Travel photograph viewer"
        onClose={() => {
          setIsOpen(false);
          trigger.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            changePhoto(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        <div className="lightbox-top">
          <span className="eyebrow">NOTES FROM THE ROAD</span>
          <button
            ref={closeButton}
            onClick={() => dialog.current?.close()}
            aria-label="Close travel photograph"
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        {isOpen && activePhoto && (
          <>
            <div className="lightbox-image">
              <Image
                key={activePhoto.id}
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                sizes="90vw"
              />
            </div>
            <div className="lightbox-bottom">
              <button
                onClick={() => changePhoto(-1)}
                aria-label="Previous travel photograph"
                disabled={photos.length < 2}
              >
                <Arrow direction="left" />
              </button>
              <div aria-live="polite">
                <h3>{activePhoto.caption}</h3>
                <p>
                  {formatNumber(active + 1)} / {formatNumber(photos.length)}
                </p>
              </div>
              <button
                onClick={() => changePhoto(1)}
                aria-label="Next travel photograph"
                disabled={photos.length < 2}
              >
                <Arrow direction="right" />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
