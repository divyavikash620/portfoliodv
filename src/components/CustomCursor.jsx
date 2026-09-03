import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // High-performance motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Tight, responsive spring for central precision dot
  const dotX = useSpring(cursorX, { damping: 28, stiffness: 600, mass: 0.2 });
  const dotY = useSpring(cursorY, { damping: 28, stiffness: 600, mass: 0.2 });

  // Silky trailing spring for delicate 3D ring
  const ringX = useSpring(cursorX, { damping: 24, stiffness: 260, mass: 0.5 });
  const ringY = useSpring(cursorY, { damping: 24, stiffness: 260, mass: 0.5 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReduced) return;

    setMounted(true);

    const onMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    const onMouseOver = (e) => {
      const target = e.target;
      const clickable = target.closest(
        "a, button, input, textarea, select, [role='button'], .clickable, summary",
      );
      setHovered(Boolean(clickable));
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Delicate 3D Isometric Trailing Ring (Compact: 18px -> 26px on hover) */}
      <motion.div
        className="absolute -left-[9px] -top-[9px] flex h-[18px] w-[18px] items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
        }}
      >
        <motion.div
          animate={{
            scale: clicked ? 0.75 : hovered ? 1.45 : 1,
            rotateX: hovered ? 35 : 0,
            rotateY: hovered ? 45 : 0,
            rotateZ: hovered ? 90 : 0,
            borderColor: hovered ? "var(--color-accent)" : "rgba(168, 162, 116, 0.4)",
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full rounded-full border border-accent/40"
          style={{
            transformStyle: "preserve-3d",
            perspective: 600,
            boxShadow: hovered
              ? "0 0 12px rgba(168, 162, 116, 0.3)"
              : "0 0 4px rgba(168, 162, 116, 0.1)",
          }}
        />
      </motion.div>

      {/* Sleek Precision Dot (Compact: 4px) */}
      <motion.div
        className="absolute -left-[2px] -top-[2px] flex h-1 w-1 items-center justify-center"
        style={{
          x: dotX,
          y: dotY,
        }}
      >
        <motion.div
          animate={{
            scale: clicked ? 1.6 : hovered ? 0.8 : 1,
            opacity: 1,
          }}
          transition={{ duration: 0.15 }}
          className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_var(--color-accent)]"
        />
      </motion.div>
    </div>
  );
}
