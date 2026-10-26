"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { useMotionValue, useSpring, useTransform } from "motion/react";

const pointerQuery =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/** Move compositor layers without re-rendering React on each pointer event. */
export function usePointerParallax() {
  const enabled = useRef(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 26 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 26 });
  const backgroundX = useTransform(smoothX, [-1, 1], [32, -32]);
  const backgroundY = useTransform(smoothY, [-1, 1], [16, -16]);
  const foregroundX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const foregroundY = useTransform(smoothY, [-1, 1], [-6, 6]);

  useEffect(() => {
    const query = window.matchMedia(pointerQuery);
    const updatePreference = () => {
      enabled.current = query.matches;
      if (!query.matches) {
        pointerX.jump(0);
        pointerY.jump(0);
        smoothX.jump(0);
        smoothY.jump(0);
      }
    };
    const reset = () => {
      pointerX.set(0);
      pointerY.set(0);
    };
    updatePreference();
    query.addEventListener("change", updatePreference);
    window.addEventListener("blur", reset);
    return () => {
      query.removeEventListener("change", updatePreference);
      window.removeEventListener("blur", reset);
    };
  }, [pointerX, pointerY, smoothX, smoothY]);

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    if (!enabled.current || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const clamp = (value: number) => Math.max(-1, Math.min(1, value));
    pointerX.set(clamp(((event.clientX - bounds.left) / bounds.width) * 2 - 1));
    pointerY.set(clamp(((event.clientY - bounds.top) / bounds.height) * 2 - 1));
  }

  function onPointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return {
    onPointerMove,
    onPointerLeave,
    background: { x: backgroundX, y: backgroundY },
    foreground: { x: foregroundX, y: foregroundY },
  };
}
