"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useInView } from "motion/react";
import { programmingChapters } from "@/data/programming";
import { Arrow } from "./icons";
import "./programming-section.css";

export function ProgrammingSection() {
  const terminal = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const entered = useInView(terminal, { once: true, amount: 0.15 });
  const [active, setActive] = useState(0);

  function navigateTabs(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % programmingChapters.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next =
        (index - 1 + programmingChapters.length) % programmingChapters.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = programmingChapters.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section
      id="programming"
      className="programming section-pad"
      aria-labelledby="programming-title"
    >
      <div className="section-label">
        <span className="eyebrow">06 / A CURIOUS MIND</span>
        <span className="eyebrow">PROGRAMMING · PEOPLE · CYBERSECURITY</span>
      </div>
      <div className="section-heading programming-heading">
        <h2 id="programming-title">
          Always asking
          <br />
          <em>what if?</em>
        </h2>
        <p>
          From writing the code
          <br />
          to questioning how it works.
        </p>
      </div>

      <div
        ref={terminal}
        className={`terminal${entered ? " terminal-entered" : ""}`}
      >
        <div className="terminal-titlebar">
          <span className="terminal-lights" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>ivan@curiosity: ~/field-notes</span>
          <span className="terminal-title-note">PERSONAL LOG</span>
        </div>

        <div className="terminal-workspace">
          <div className="terminal-sidebar">
            <p className="terminal-directory">~/how-i-think/</p>
            <div
              role="tablist"
              aria-label="Programming field notes"
              className="terminal-files"
            >
              {programmingChapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  id={`programming-tab-${chapter.id}`}
                  ref={(element) => {
                    tabs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-controls={`programming-panel-${chapter.id}`}
                  tabIndex={index === active ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => navigateTabs(event, index)}
                >
                  <span className="terminal-file-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span>{chapter.label}</span>
                  <span className="terminal-file-arrow" aria-hidden="true">
                    ↗
                  </span>
                </button>
              ))}
            </div>
            <div className="terminal-sidebar-note">
              <span aria-hidden="true">└─</span> Open a note.
              <br />A little of what drives me.
            </div>
          </div>

          <div className="terminal-editor">
            {programmingChapters.map((chapter, index) => (
              <div
                key={chapter.id}
                id={`programming-panel-${chapter.id}`}
                role="tabpanel"
                aria-labelledby={`programming-tab-${chapter.id}`}
                tabIndex={0}
                hidden={index !== active}
                className="terminal-panel"
              >
                <div className="terminal-command" aria-hidden="true">
                  <span>ivan ~ $</span>
                  <span className="terminal-command-text" key={active}>
                    {chapter.command}
                  </span>
                  <span className="terminal-cursor" />
                </div>
                <div className="terminal-reading" key={`${active}-reading`}>
                  <p className="terminal-filename">{chapter.file}</p>
                  <h3>{chapter.heading}</h3>
                  {chapter.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <ul className="terminal-tags" aria-label="Themes">
                    {chapter.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <p className="terminal-note">
                    <span aria-hidden="true">↳</span> {chapter.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="terminal-pipeline"
          aria-label="My approach: observe, build, question, improve"
        >
          {["Observe", "Build", "Question", "Improve"].map((step, index) => (
            <span
              className="terminal-pipeline-step"
              key={step}
              style={{ "--step": index } as React.CSSProperties}
            >
              <span className="terminal-pipeline-dot" aria-hidden="true" />
              {step}
              {index < 3 && (
                <span
                  className="terminal-pipeline-connector"
                  aria-hidden="true"
                >
                  ──→
                </span>
              )}
            </span>
          ))}
        </div>
        <div className="terminal-statusbar">
          <span>MODE: CURIOUS</span>
          <span>NOTE 0{active + 1} / 04</span>
          <span>STILL LEARNING</span>
        </div>
      </div>
      <div className="programming-footer">
        <p>The questions keep changing. The curiosity stays.</p>
        <a href="#projects" className="text-link">
          Explore what I’ve built <Arrow direction="down" />
        </a>
      </div>
    </section>
  );
}
