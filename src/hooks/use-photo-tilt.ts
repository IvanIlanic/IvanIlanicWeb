"use client";

import { useEffect, useRef, type FocusEvent, type PointerEvent } from "react";
import { useMotionValue, useSpring, useTransform } from "motion/react";

/** A still paper print until a mouse or keyboard focus brings it forward. */
export function usePhotoTilt() {
  const enabled = useRef(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lift = useMotionValue(0);
  const spring = { stiffness: 150, damping: 24 };
  const rotateX = useSpring(x, spring);
  const rotateY = useSpring(y, spring);
  const z = useSpring(lift, spring);
  const sheenX = useTransform(rotateY, [-10, 10], [-70, 70]);
  const sheenOpacity = useTransform(z, [0, 24], [0, 0.7]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      enabled.current = !preference.matches;
      if (preference.matches) {
        for (const value of [x, y, lift, rotateX, rotateY, z]) value.jump(0);
      }
    };
    const reset = () => {
      x.set(0);
      y.set(0);
      lift.set(0);
    };
    update();
    preference.addEventListener("change", update);
    window.addEventListener("blur", reset);
    return () => {
      preference.removeEventListener("change", update);
      window.removeEventListener("blur", reset);
    };
  }, [x, y, lift, rotateX, rotateY, z]);

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!enabled.current || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const normalize = (position: number, start: number, size: number) =>
      Math.max(-1, Math.min(1, ((position - start) / size) * 2 - 1));
    x.set(-normalize(event.clientY, bounds.top, bounds.height) * 8);
    y.set(normalize(event.clientX, bounds.left, bounds.width) * 10);
    lift.set(24);
  }

  function reset() {
    x.set(0);
    y.set(0);
    lift.set(0);
  }
  function onFocus(event: FocusEvent<HTMLDivElement>) {
    if (enabled.current && event.target.matches(":focus-visible")) lift.set(18);
  }

  return {
    onPointerMove,
    reset,
    onFocus,
    rotateX,
    rotateY,
    z,
    sheenX,
    sheenOpacity,
  };
}
