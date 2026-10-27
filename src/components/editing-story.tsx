"use client";

import { getImageProps } from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { editingStory } from "@/data/editing-story";

function subscribeReducedMotion(listener: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}
const getReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getServerReducedMotion = () => true;
type Playback = "idle" | "playing" | "paused" | "complete";

function MarkerNote({
  progress,
  x,
  y,
  width,
  rotation = -3,
  children,
}: {
  progress: MotionValue<number>;
  x: number;
  y: number;
  width: number;
  rotation?: number;
  children: string;
}) {
  const clipId = `marker-${useId().replace(/:/g, "")}`;
  const writtenWidth = useTransform(progress, [0.08, 1], [0, width]);

  return (
    <g transform={`rotate(${rotation} ${x} ${y})`}>
      <defs>
        <clipPath id={clipId}>
          <motion.rect
            x={x - 5}
            y={y - 40}
            height="58"
            style={{ width: writtenWidth }}
          />
        </clipPath>
      </defs>
      <text x={x} y={y} clipPath={`url(#${clipId})`}>
        {children}
      </text>
    </g>
  );
}

export function EditingStory() {
  const id = useId().replace(/:/g, "");
  const frame = useRef<HTMLDivElement>(null);
  const near = useInView(frame, { margin: "300px", once: true });
  const visible = useInView(frame, { amount: 0.65 });
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const progress = useMotionValue(0);
  const playback = useMotionValue<Playback>("idle");
  const controls = useRef<ReturnType<typeof animate> | null>(null);
  const started = useRef(false);
  const previousStep = useRef(0);
  const [activeStep, setActiveStep] = useState(0);
  const [status, setStatus] = useState<Playback>("idle");
  const [ready, setReady] = useState(false);
  const [notesVisible, setNotesVisible] = useState(true);
  const texture = getImageProps({
    src: editingStory.image.src,
    alt: "",
    width: 640,
    height: 960,
  }).props.src;
  const shadow = useTransform(progress, [0.04, 0.23], [0, 1]);
  const subject = useTransform(progress, [0.29, 0.48], [0, 1]);
  const background = useTransform(progress, [0.54, 0.73], [0, 0.36]);
  const light = useTransform(progress, [0.8, 1], [0, 0.8]);
  const shadowMark = useTransform(progress, [0, 0.14], [0, 1]);
  const subjectMark = useTransform(progress, [0.25, 0.39], [0, 1]);
  const backgroundMark = useTransform(progress, [0.5, 0.64], [0, 1]);
  const flareMark = useTransform(progress, [0.75, 0.89], [0, 1]);

  useMotionValueEvent(progress, "change", (value) => {
    const step = Math.min(3, Math.floor(value * 4));
    if (step !== previousStep.current) {
      previousStep.current = step;
      setActiveStep(step);
    }
  });
  useMotionValueEvent(playback, "change", (value) => setStatus(value));

  const play = useCallback(
    (restart = false) => {
      controls.current?.stop();
      if (restart) progress.jump(0);
      playback.set("playing");
      controls.current = animate(progress, 1, {
        duration: Math.max(0.4, (1 - progress.get()) * editingStory.duration),
        ease: "linear",
        onComplete: () => playback.set("complete"),
      });
    },
    [progress, playback],
  );

  const pause = useCallback(() => {
    controls.current?.stop();
    playback.set(progress.get() >= 1 ? "complete" : "paused");
  }, [progress, playback]);

  useEffect(() => {
    if (!ready || !reduced) return;
    controls.current?.stop();
    progress.jump(1);
    playback.set("complete");
  }, [ready, reduced, progress, playback]);

  useEffect(() => {
    if (!ready || reduced) return;
    if (!visible) {
      if (playback.get() === "playing") pause();
      return;
    }
    if (!started.current) {
      started.current = true;
      play();
    }
  }, [ready, reduced, visible, play, pause, progress, playback]);
  useEffect(() => () => controls.current?.stop(), []);

  function chooseStep(index: number) {
    controls.current?.stop();
    progress.jump(index === 3 ? 1 : (index + 1) / 4 - 0.01);
    playback.set(index === 3 ? "complete" : "paused");
    started.current = true;
  }

  return (
    <section
      id="how-i-see"
      className="editing-story"
      aria-labelledby="editing-story-title"
    >
      <div className="section-label">
        <span className="eyebrow">BEHIND THE FRAME</span>
        <span className="eyebrow">A LOOK INSIDE THE EDIT</span>
      </div>
      <div className="editing-heading">
        <h3 id="editing-story-title">
          First, I see a frame.
          <br />
          <em>Then, the possibilities.</em>
        </h3>
        <p>
          The little notes in my head
          <br />
          before I touch a slider.
        </p>
      </div>
      <div className="editing-layout">
        <div>
          <div
            id={`${id}-frame`}
            ref={frame}
            className="editing-frame"
            data-step={activeStep + 1}
            data-playback={status}
          >
            <svg
              viewBox="0 0 640 960"
              className="editing-canvas"
              role="img"
              aria-label={editingStory.image.alt}
            >
              <title>{editingStory.image.alt}</title>
              <defs>
                <image
                  id={`${id}-photo`}
                  href={near ? texture : undefined}
                  width="640"
                  height="960"
                  preserveAspectRatio="xMidYMid slice"
                  onLoad={() => setReady(true)}
                />
                <filter id={`${id}-shadow`} colorInterpolationFilters="sRGB">
                  <feComponentTransfer>
                    <feFuncR type="gamma" exponent="0.7" />
                    <feFuncG type="gamma" exponent="0.7" />
                    <feFuncB type="gamma" exponent="0.7" />
                  </feComponentTransfer>
                </filter>
                <filter id={`${id}-subject`} colorInterpolationFilters="sRGB">
                  <feComponentTransfer>
                    <feFuncR type="gamma" amplitude="1.08" exponent="0.88" />
                    <feFuncG type="gamma" amplitude="1.08" exponent="0.88" />
                    <feFuncB type="gamma" amplitude="1.08" exponent="0.88" />
                  </feComponentTransfer>
                </filter>
                <filter id={`${id}-soft`}>
                  <feGaussianBlur stdDeviation="7" />
                </filter>
                <filter id={`${id}-exposure`} colorInterpolationFilters="sRGB">
                  <feComponentTransfer>
                    <feFuncR type="linear" slope="1.6" />
                    <feFuncG type="linear" slope="1.6" />
                    <feFuncB type="linear" slope="1.6" />
                  </feComponentTransfer>
                </filter>
                <mask id={`${id}-shadows`}>
                  <g fill="white" filter={`url(#${id}-soft)`}>
                    <ellipse cx="118" cy="585" rx="67" ry="70" />
                    <ellipse cx="376" cy="580" rx="59" ry="78" />
                    <ellipse cx="541" cy="580" rx="34" ry="64" />
                    <ellipse cx="242" cy="584" rx="120" ry="33" />
                    <ellipse cx="18" cy="570" rx="43" ry="76" />
                  </g>
                </mask>
                <mask id={`${id}-body`}>
                  <path
                    d={editingStory.bodyPath}
                    fill="white"
                    filter={`url(#${id}-soft)`}
                  />
                </mask>
                <mask id={`${id}-background`}>
                  <rect width="640" height="960" fill="white" />
                  <g fill="black">
                    <path d={editingStory.subjectPath} />
                    <path d="M0 368 57 389 88 484 70 620 0 655Z" />
                  </g>
                </mask>
                <linearGradient
                  id={`${id}-light-gradient`}
                  x1="100%"
                  y1="0%"
                  x2="22%"
                  y2="76%"
                >
                  <stop stopColor="white" />
                  <stop offset=".25" stopColor="white" stopOpacity=".85" />
                  <stop offset=".62" stopColor="white" stopOpacity=".25" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <mask id={`${id}-light-mask`}>
                  <rect
                    width="640"
                    height="960"
                    fill={`url(#${id}-light-gradient)`}
                  />
                </mask>
              </defs>
              <use href={`#${id}-photo`} />
              <motion.g style={{ opacity: shadow }}>
                <use
                  href={`#${id}-photo`}
                  mask={`url(#${id}-shadows)`}
                  filter={`url(#${id}-shadow)`}
                />
              </motion.g>
              <motion.g style={{ opacity: subject }}>
                <use
                  href={`#${id}-photo`}
                  mask={`url(#${id}-body)`}
                  filter={`url(#${id}-subject)`}
                />
              </motion.g>
              <motion.rect
                width="640"
                height="960"
                fill="#06121c"
                mask={`url(#${id}-background)`}
                style={{ opacity: background }}
              />
              <motion.g className="editing-light" style={{ opacity: light }}>
                <use
                  href={`#${id}-photo`}
                  mask={`url(#${id}-light-mask)`}
                  filter={`url(#${id}-exposure)`}
                />
              </motion.g>
              <g
                className="editing-annotations"
                aria-hidden="true"
                style={{ visibility: notesVisible ? "visible" : "hidden" }}
              >
                <motion.g
                  className="edit-mark edit-mark-shadow"
                  style={{ opacity: shadowMark }}
                >
                  <motion.path
                    d="M73 605c-38-91 62-111 92-40s-46 130-81 66M328 578c-12-83 88-107 104-26s-77 140-100 60M103 723q-28-31-2-73m-2 1-10 12m10-12 8 14"
                    style={{ pathLength: shadowMark }}
                  />
                  <MarkerNote progress={shadowMark} x={48} y={754} width={320}>
                    lift these shadows
                  </MarkerNote>
                </motion.g>
                <motion.g
                  className="edit-mark edit-mark-subject"
                  style={{ opacity: subjectMark }}
                >
                  <motion.path
                    d={editingStory.bodyPath}
                    style={{ pathLength: subjectMark }}
                  />
                  <motion.path
                    d="M412 260q-34 13-52 52m0 0-1-16m1 16 15-7"
                    style={{ pathLength: subjectMark }}
                  />
                  <MarkerNote progress={subjectMark} x={337} y={225} width={300}>
                    let the subjects
                  </MarkerNote>
                  <MarkerNote
                    progress={subjectMark}
                    x={363}
                    y={261}
                    width={210}
                    rotation={-1}
                  >
                    stand out
                  </MarkerNote>
                </motion.g>
                <motion.g
                  className="edit-mark edit-mark-background"
                  style={{ opacity: backgroundMark }}
                >
                  <motion.path
                    d="M39 111q80 28 64 120m0 0-8-14m8 14 10-12M29 284l40-20m-24 42 33-16"
                    style={{ pathLength: backgroundMark }}
                  />
                  <MarkerNote
                    progress={backgroundMark}
                    x={25}
                    y={84}
                    width={350}
                    rotation={2}
                  >
                    quiet the background
                  </MarkerNote>
                </motion.g>
                <motion.g
                  className="edit-mark edit-mark-flare"
                  style={{ opacity: flareMark }}
                >
                  <motion.path
                    d="M429 111q17-35 93-35m0 0-14-8m14 8-13 10M552 110q-15-58 32-60t35 50M556 139l-17 21m60-34 11 22"
                    style={{ pathLength: flareMark }}
                  />
                  <MarkerNote progress={flareMark} x={381} y={47} width={250}>
                    a little light
                  </MarkerNote>
                </motion.g>
              </g>
            </svg>
            {!ready && (
              <span className="editing-loading eyebrow">LOADING THE FRAME</span>
            )}
          </div>
          <div className="editing-frame-caption">
            <span>{editingStory.image.caption}</span>
            <span className="eyebrow">01 / HOW I SEE IT</span>
          </div>
        </div>
        <div className="editing-notes">
          <span className="eyebrow editing-notes-label">WHAT I’M THINKING</span>
          <ol className="editing-steps">
            {editingStory.steps.map((step, index) => (
              <li
                key={step.title}
                className={activeStep === index ? "is-current" : ""}
              >
                <button
                  onClick={() => chooseStep(index)}
                  aria-current={activeStep === index ? "step" : undefined}
                  aria-controls={`${id}-frame`}
                >
                  <span className="eyebrow">0{index + 1}</span>
                  <span>{step.title}</span>
                </button>
                <p>{step.note}</p>
              </li>
            ))}
          </ol>
          <p
            id={`${id}-active-note`}
            className="editing-mobile-note"
            aria-live="polite"
          >
            {editingStory.steps[activeStep].note}
          </p>
          <div className="editing-controls">
            {!reduced && (
              <>
                <button
                  onClick={() => {
                    started.current = true;
                    play(true);
                  }}
                  disabled={!ready}
                >
                  Replay
                </button>
                <button
                  onClick={() => (status === "playing" ? pause() : play())}
                  disabled={
                    !ready || status === "complete" || status === "idle"
                  }
                >
                  {status === "paused" ? "Continue" : "Pause"}
                </button>
              </>
            )}
            <button
              aria-pressed={notesVisible}
              onClick={() => setNotesVisible(!notesVisible)}
            >
              {notesVisible ? "Hide notes" : "Show notes"}
            </button>
          </div>
          <p className="editing-footnote">
            {reduced
              ? "Choose a step to explore the edit without animation."
              : "The sequence begins when the photo comes into view. Pause it, replay it, or choose a thought to jump ahead."}
          </p>
        </div>
      </div>
    </section>
  );
}
