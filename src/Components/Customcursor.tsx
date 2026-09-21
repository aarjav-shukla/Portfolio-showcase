import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CustomCursorProps {
  duration?: number;
}

const CustomCursor = ({ duration = 0.2 }: CustomCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.set(cursor, { xPercent: -10, yPercent: -10 });

    const xTo = gsap.quickTo(cursor, "x", {
      duration,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(cursor, "y", {
      duration,
      ease: "power3.out",
    });

    let rafId = 0;

    const moveCursor = (e: MouseEvent) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        xTo(e.clientX);
        yTo(e.clientY);

        rafId = 0;
      });
    };

    window.addEventListener("mousemove", moveCursor, {
      passive: true,
    });

    window.addEventListener("mousemove", moveCursor);


    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(rafId);
    };
  }, [duration]);

  return <div ref={cursorRef} className="custom-cursor" />;
};

export default CustomCursor;
