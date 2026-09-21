import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextAnimationProps {
  children: React.ReactNode;
  delay?: number;
  divideBy?: "word" | "letter";
  className?: string;
  textClassName?: string;
  scrub?: boolean | number;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

const SHUFFLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*░▒▓█#$&';

const TextAnimation: React.FC<TextAnimationProps> = ({
  children,
  divideBy = "word",
  className = "",
  textClassName = "",
  scrub = 1,
  scrollStart = "top bottom-=15%",
  scrollEnd = "bottom center+=10%",
  stagger = 0.08,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isShufflingRef = useRef(false);

  let rawText = children;
  if (typeof rawText !== "string") {
    if (typeof rawText === "number" || typeof rawText === "boolean") {
      rawText = String(rawText);
    } else {
      console.warn("TextAnimation only supports plain text/string children.");
      return <>{children}</>;
    }
  }

  const text = rawText as string;
  const parts = divideBy === "letter" ? text.split("") : text.split(" ");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll(".stagger-part");

    gsap.fromTo(
      targets,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: divideBy === "letter" ? 0.03 : stagger,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: scrollStart,
          end: scrollEnd,
          scrub: typeof scrub === "boolean" ? (scrub ? 1 : false) : scrub,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === el) trigger.kill();
      });
    };
  }, [divideBy, scrub, scrollStart, scrollEnd, stagger]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const targetNodes = Array.from(el.querySelectorAll<HTMLElement>(".stagger-part"));
    if (targetNodes.length === 0) return;

    let intervalId: any = null;

    const triggerShuffle = () => {
      if (isShufflingRef.current) return;
      isShufflingRef.current = true;

      const shuffleCount = 5;
      let step = 0;

      intervalId = setInterval(() => {
        step++;
        targetNodes.forEach((node, i) => {
          const originalText = divideBy === "letter"
            ? (parts[i] === " " ? "\u00A0" : parts[i])
            : parts[i] + "\u00A0";

          const charDoneStep = shuffleCount + Math.floor(i * 0.2);
          if (step >= charDoneStep) {
            node.textContent = originalText;
          } else {
            const partStr = parts[i];
            let randStr = "";
            for (let k = 0; k < partStr.length; k++) {
              randStr += SHUFFLE_CHARS[Math.floor(Math.random() * SHUFFLE_CHARS.length)];
            }
            node.textContent = divideBy === "letter" ? randStr : randStr + "\u00A0";
          }
        });

        if (step >= shuffleCount + targetNodes.length * 0.2 + 2) {
          clearInterval(intervalId);
          targetNodes.forEach((node, i) => {
            node.textContent = divideBy === "letter"
              ? (parts[i] === " " ? "\u00A0" : parts[i])
              : parts[i] + "\u00A0";
          });
          isShufflingRef.current = false;
        }
      }, 35);
    };

    el.addEventListener("mouseenter", triggerShuffle);

    return () => {
      el.removeEventListener("mouseenter", triggerShuffle);
      if (intervalId) clearInterval(intervalId);
      isShufflingRef.current = false;
    };
  }, [text, divideBy, parts]);

  return (
    <span ref={containerRef} className={`inline-block cursor-pointer select-none ${className}`}>
      {parts.map((part, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden relative align-top py-1"
        >
          <span className={`stagger-part inline-block will-change-transform ${textClassName}`}>
            {divideBy === "letter"
              ? part === " "
                ? "\u00A0"
                : part
              : part + "\u00A0"}
          </span>
        </span>
      ))}
    </span>
  );
};

export default TextAnimation;
