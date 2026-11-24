"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  featuredPhotographCount,
  photographCategories,
  photographs,
} from "@/data/portfolio";
import { Arrow } from "./icons";
import { Reveal } from "./reveal";

const filters = ["All frames", ...photographCategories] as const;
const formatCount = (count: number) => String(count).padStart(2, "0");

export function Gallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All frames");
  const [showAll, setShowAll] = useState(false);
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const firstAdditionalPhoto = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const collection = photographs.filter(
    (p) => filter === "All frames" || p.category === filter,
  );
  const photo = collection[active];
  const visible =
    filter === "All frames" && !showAll
      ? collection.slice(0, featuredPhotographCount)
      : collection;

  useEffect(() => {
    if (showAll) firstAdditionalPhoto.current?.focus();
  }, [showAll]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function openPhoto(index: number, trigger: HTMLButtonElement) {
    previousFocus.current = trigger;
    setActive(index);
    dialog.current?.showModal();
    setIsOpen(true);
    closeButton.current?.focus();
  }
  function changePhoto(delta: number) {
    setActive(
      (index) => (index + delta + collection.length) % collection.length,
    );
  }

  return (
    <>
      <div className="gallery-toolbar">
        <div className="filters" role="group" aria-label="Filter photographs">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setActive(0);
              }}
              aria-pressed={filter === f}
            >
              {f}
              <span>
                {formatCount(
                  f === "All frames"
                    ? photographs.length
                    : photographs.filter((item) => item.category === f).length,
                )}
              </span>
            </button>
          ))}
        </div>
        <button
          className="text-link gallery-browse"
          onClick={(event) => {
            setFilter("All frames");
            openPhoto(0, event.currentTarget);
          }}
          aria-haspopup="dialog"
        >
          Browse all {photographs.length} fullscreen
        </button>
      </div>
      <div className="photo-grid">
        {visible.map((p, i) => (
          <Reveal key={p.id} className={`photo-entry photo-entry-${i % 4}`}>
            <button
              ref={
                filter === "All frames" && i === featuredPhotographCount
                  ? firstAdditionalPhoto
                  : undefined
              }
              className="photo-button"
              onClick={(event) => openPhoto(i, event.currentTarget)}
              aria-label={`View ${p.title}`}
              aria-haspopup="dialog"
            >
              <div
                className="photo-image"
                style={{ aspectRatio: `${p.width} / ${p.height}` }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes={
                    visible.length % 2 === 1 && i === visible.length - 1
                      ? "(max-width: 700px) 90vw, 980px"
                      : "(max-width: 700px) 90vw, 55vw"
                  }
                />
                <span className="photo-category eyebrow">{p.category}</span>
                <span className="photo-open">
                  <Arrow />
                </span>
              </div>
              <div className="photo-caption">
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.location}</p>
                </div>
                <span className="eyebrow">{p.id}</span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
      {filter === "All frames" && !showAll && (
        <button
          className="text-link gallery-browse gallery-expand"
          onClick={() => setShowAll(true)}
        >
          View all {photographs.length} photos
        </button>
      )}
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Photography viewer"
        onClose={() => {
          setIsOpen(false);
          previousFocus.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            changePhoto(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            changePhoto(-1);
          }
        }}
      >
        <div className="lightbox-top">
          <span className="eyebrow" aria-live="polite">
            FRAME {formatCount(active + 1)} / {formatCount(collection.length)}
          </span>
          <button
            ref={closeButton}
            onClick={() => dialog.current?.close()}
            aria-label="Close photograph"
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        {isOpen && (
          <>
            <div
              className="lightbox-image"
              onTouchStart={(event) => {
                const { clientX, clientY } = event.touches[0];
                touchStart.current = { x: clientX, y: clientY };
              }}
              onTouchCancel={() => {
                touchStart.current = null;
              }}
              onTouchEnd={(event) => {
                const start = touchStart.current;
                touchStart.current = null;
                if (!start) return;
                const { clientX, clientY } = event.changedTouches[0];
                const deltaX = clientX - start.x;
                if (
                  Math.abs(deltaX) > 45 &&
                  Math.abs(deltaX) > Math.abs(clientY - start.y)
                ) {
                  changePhoto(deltaX < 0 ? 1 : -1);
                }
              }}
            >
              <Image
                key={photo.id}
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="100vw"
                loading="eager"
              />
            </div>
            <div className="lightbox-bottom">
              <button
                onClick={() => changePhoto(-1)}
                aria-label="Previous photograph"
              >
                <Arrow direction="left" />
              </button>
              <div aria-live="polite">
                <h3>{photo.title}</h3>
                <p>
                  {photo.location} · Photography by {photo.credit}
                </p>
              </div>
              <button
                onClick={() => changePhoto(1)}
                aria-label="Next photograph"
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
