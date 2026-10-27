"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { type TravelPhoto } from "@/data/travel";
import { usePhotoTilt } from "@/hooks/use-photo-tilt";
import { Arrow } from "./icons";

const framesPerStrip = 3;
const formatNumber = (value: number) => String(value).padStart(2, "0");

const stripNotes = [
  "Notes from the road.",
  "A different pace.",
  "Keep looking up.",
  "Lost in the details.",
  "Good company.",
  "Worth the detour.",
];

function FloatingTravelStrip({
  photos,
  index,
  onOpen,
}: {
  photos: TravelPhoto[];
  index: number;
  onOpen: (index: number) => void;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const tilt = usePhotoTilt();
  const { scrollYProgress } = useScroll({
    target: stage,
    offset: ["start end", "end start"],
  });
  const distance = index % 2 === 0 ? 22 : -18;
  const drift = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(drift, { stiffness: 70, damping: 24 });

  return (
    <div
      ref={stage}
      className={`travel-booth-stage travel-booth-stage-${index + 1}`}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.reset}
      onFocus={tilt.onFocus}
      onBlur={tilt.reset}
    >
      <motion.div className="travel-float" style={{ y }}>
        <motion.figure
          className="travel-strip"
          style={{
            rotateX: tilt.rotateX,
            rotateY: tilt.rotateY,
            z: tilt.z,
          }}
        >
          <div className="travel-strip-header">
            <span>NO FIXED PLANS</span>
            <span>
              {photos[0].id} — {photos[photos.length - 1].id}
            </span>
          </div>
          <div className="travel-strip-frames">
            {photos.map((photo, photoIndex) => (
              <div key={photo.id} className="travel-shot">
                <button
                  className="travel-shot-image"
                  aria-label={`View travel photograph ${photo.id}: ${photo.caption}`}
                  aria-haspopup="dialog"
                  onClick={() => {
                    tilt.reset();
                    onOpen(index * framesPerStrip + photoIndex);
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 600px) 65vw, (max-width: 1100px) 30vw, 240px"
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
            <span>{stripNotes[index % stripNotes.length]}</span>
            <span>LEAVE ROOM FOR THE UNEXPECTED</span>
          </figcaption>
        </motion.figure>
      </motion.div>
    </div>
  );
}

export function TravelPhotoBooth({
  photos,
  children,
}: {
  photos: TravelPhoto[];
  children: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const strips = Array.from(
    { length: Math.ceil(photos.length / framesPerStrip) },
    (_, index) =>
      photos.slice(index * framesPerStrip, (index + 1) * framesPerStrip),
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
      <div className="travel-layout">
        {children}
        {strips.map((stripPhotos, index) => (
          <FloatingTravelStrip
            key={stripPhotos[0].id}
            photos={stripPhotos}
            index={index}
            onOpen={openPhoto}
          />
        ))}
      </div>
      <p className="travel-gallery-hint">
        {photos.length} moments. No fixed plans. Choose a photo to see the whole
        frame.
      </p>
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
