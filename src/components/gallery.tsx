"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { photographCategories, photographs } from "@/data/portfolio";
import { Arrow } from "./icons";
import { Reveal } from "./reveal";

const filters = ["All frames", ...photographCategories] as const;
const formatCount = (count: number) => String(count).padStart(2, "0");

export function Gallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All frames");
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const photo = photographs[active];
  const visible = photographs.filter(
    (p) => filter === "All frames" || p.category === filter,
  );

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    const restore = () => {
      setIsOpen(false);
      previousFocus.current?.focus();
    };
    node.addEventListener("close", restore);
    return () => {
      node.removeEventListener("close", restore);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function openPhoto(index: number) {
    previousFocus.current = document.activeElement as HTMLElement;
    setActive(index);
    dialog.current?.showModal();
    setIsOpen(true);
    closeButton.current?.focus();
  }
  function changePhoto(delta: number) {
    setActive(
      (index) => (index + delta + photographs.length) % photographs.length,
    );
  }

  return (
    <>
      <div className="gallery-toolbar">
        <div className="filters" role="group" aria-label="Filter photographs">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
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
        <span className="eyebrow gallery-hint">
          SELECTED PHOTOGRAPHY BY IVAN ILANIĆ
        </span>
      </div>
      <div className="photo-grid">
        {visible.map((p, i) => (
          <Reveal key={p.id} className={`photo-entry photo-entry-${i % 4}`}>
            <button
              className="photo-button"
              onClick={() => openPhoto(photographs.indexOf(p))}
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
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Photography viewer"
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
          <span className="eyebrow">
            FRAME {photo.id} / {formatCount(photographs.length)}
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
            <div className="lightbox-image">
              <Image
                key={photo.id}
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="90vw"
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
