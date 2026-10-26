"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { type DivePhoto } from "@/data/diving";
import { usePhotoTilt } from "@/hooks/use-photo-tilt";
import { Arrow } from "./icons";
import { Reveal } from "./reveal";

const printAngles = [-6, 4, -3];

function PolaroidPhoto({
  photo,
  index,
  onOpen,
}: {
  photo: DivePhoto;
  index: number;
  onOpen: () => void;
}) {
  const tilt = usePhotoTilt();
  return (
    <Reveal className={`diving-frame diving-frame-${photo.id}`}>
      <div
        className="polaroid-stage"
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.reset}
        onFocus={tilt.onFocus}
        onBlur={tilt.reset}
      >
        <motion.figure
          className="polaroid-card"
          style={{
            rotate: printAngles[index % printAngles.length],
            rotateX: tilt.rotateX,
            rotateY: tilt.rotateY,
            z: tilt.z,
          }}
        >
          <button
            className="polaroid-open"
            onClick={onOpen}
            disabled={!photo.src}
            aria-label={`View ${photo.caption}`}
          >
            <span className="diving-photo-media">
              {photo.src ? (
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 600px) 90vw, 34vw"
                />
              ) : (
                <span className="diving-placeholder">
                  <span className="eyebrow">FRAME {photo.id}</span>
                  <span className="eyebrow">PHOTOGRAPH TO COME</span>
                </span>
              )}
              <motion.span
                aria-hidden="true"
                className="polaroid-sheen"
                style={{ x: tilt.sheenX, opacity: tilt.sheenOpacity }}
              />
              {photo.src && (
                <span className="polaroid-expand" aria-hidden="true">
                  <Arrow />
                </span>
              )}
            </span>
          </button>
          <figcaption>
            <span className="polaroid-caption">{photo.caption}</span>
            <span className="polaroid-index">{photo.id}</span>
            <span className="polaroid-note">FROM MY DIVE JOURNAL</span>
          </figcaption>
        </motion.figure>
      </div>
    </Reveal>
  );
}

export function DivingPhotoGallery({ photos }: { photos: DivePhoto[] }) {
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const available = photos.filter((photo) => photo.src);
  const photo = available[active];

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    const restore = () => {
      setIsOpen(false);
      trigger.current?.focus();
    };
    node.addEventListener("close", restore);
    return () => node.removeEventListener("close", restore);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  function openPhoto(item: DivePhoto) {
    const index = available.indexOf(item);
    if (index < 0) return;
    trigger.current = document.activeElement as HTMLElement;
    setActive(index);
    dialog.current?.showModal();
    setIsOpen(true);
    closeButton.current?.focus();
  }
  function changePhoto(direction: number) {
    setActive(
      (current) => (current + direction + available.length) % available.length,
    );
  }

  return (
    <>
      <div className="diving-photos" aria-label="Dive photographs">
        {photos.map((item, index) => (
          <PolaroidPhoto
            key={item.id}
            photo={item}
            index={index}
            onOpen={() => openPhoto(item)}
          />
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox dive-lightbox"
        aria-label="Dive photograph viewer"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            changePhoto(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            changePhoto(-1);
          }
        }}
      >
        <div className="lightbox-top">
          <span className="eyebrow">FROM MY DIVE JOURNAL</span>
          <button
            ref={closeButton}
            onClick={() => dialog.current?.close()}
            aria-label="Close dive photograph"
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        {photo?.src && (
          <>
            <div className="lightbox-image">
              <Image src={photo.src} alt={photo.alt} fill sizes="90vw" />
            </div>
            <div className="lightbox-bottom">
              <button
                onClick={() => changePhoto(-1)}
                aria-label="Previous dive photograph"
                disabled={available.length < 2}
              >
                <Arrow direction="left" />
              </button>
              <div aria-live="polite">
                <h3>{photo.caption}</h3>
                <p>
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(available.length).padStart(2, "0")}
                </p>
              </div>
              <button
                onClick={() => changePhoto(1)}
                aria-label="Next dive photograph"
                disabled={available.length < 2}
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
