"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ElectricBorder from "../ElectricBorder";
import PixelTransition from "../PixelTransition";
import ShinyText from "../ShinyText";
import AnimatedButton from "./animated-button";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollSplitCardItem {
  title: string;
  description: string;
  secondDescription?: string;
  brandName?: string;
  category?: string;
  statNumber?: string;
  statLabel?: string;
  badgeNumber?: string;
  accentColor?: string;
  bgColor?: string;
  textColor?: string;
  electricColor?: string;
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  icon?: React.ReactNode;
}

export interface ScrollSplitCardProps {
  className?: string;
  imageSrc: string;
  cards: ScrollSplitCardItem[];
}

export function ScrollSplitCard({
  className,
  imageSrc,
  cards,
}: ScrollSplitCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const card0Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const startTextRef = useRef<HTMLDivElement>(null);
  const endTextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const cardElements = [card0Ref.current, card1Ref.current, card2Ref.current].filter((el): el is HTMLDivElement => el !== null);
    if (cardElements.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2200",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(
      startTextRef.current,
      {
        opacity: 0,
        y: -25,
        duration: 0.2,
        ease: "power1.out",
      },
      0
    );

    tl.to(
      cardsWrapperRef.current,
      {
        scale: 0.94,
        duration: 0.4,
        ease: "power2.out",
      },
      0
    );

    tl.to(
      card0Ref.current,
      {
        x: -56,
        borderRadius: "18px",
        duration: 0.4,
        ease: "power2.out",
      },
      0
    );

    tl.to(
      card1Ref.current,
      {
        borderRadius: "18px",
        duration: 0.4,
        ease: "power2.out",
      },
      0
    );

    tl.to(
      card2Ref.current,
      {
        x: 56,
        borderRadius: "18px",
        duration: 0.4,
        ease: "power2.out",
      },
      0
    );

    tl.to(
      cardElements,
      {
        rotateY: 180,
        duration: 0.5,
        ease: "power2.inOut",
        stagger: 0.05,
      },
      0.35
    );

    tl.to(
      card0Ref.current,
      {
        rotateZ: 4,
        x: -28,
        duration: 0.5,
        ease: "power2.out",
      },
      0.4
    );

    tl.to(
      card2Ref.current,
      {
        rotateZ: -4,
        x: 28,
        duration: 0.5,
        ease: "power2.out",
      },
      0.4
    );

    tl.to(
      cardsWrapperRef.current,
      {
        y: -35,
        duration: 0.3,
        ease: "power1.out",
      },
      0.75
    );

    tl.fromTo(
      endTextRef.current,
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
      0.75
    );

    ScrollTrigger.refresh();
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-screen flex flex-col items-center justify-center overflow-hidden [perspective:1200px] select-none",
        className,
      )}
    >
      <div
        ref={startTextRef}
        className="absolute top-[10%] sm:top-[12%] left-0 right-0 text-center z-20 pointer-events-none"
      >
        <span className="text-xs sm:text-sm font-semibold tracking-widest text-zinc-400 uppercase bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
          Scroll to unveil projects
        </span>
      </div>

      <div
        ref={cardsWrapperRef}
        className="flex h-[380px] sm:h-[430px] md:h-[460px] w-full max-w-5xl px-4 relative [transform-style:preserve-3d]"
      >
        {cards.slice(0, 3).map((card, i) => {
          const cardRef = i === 0 ? card0Ref : i === 1 ? card1Ref : card2Ref;

          return (
            <div
              key={i}
              ref={cardRef}
              className="relative h-full flex-1 [transform-style:preserve-3d] transition-shadow duration-300"
              style={{ zIndex: i === 0 ? 1 : i === 2 ? 3 : 2 }}
            >
              <div
                className="absolute inset-0 overflow-hidden [backface-visibility:hidden] rounded-[18px] border border-white/15 shadow-2xl"
                style={{ zIndex: 2 }}
              >
                <div
                  className="absolute inset-0 h-full w-[300%]"
                  style={{
                    left: `${-100 * i}%`,
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                  }}
                />
              </div>

              <div
                className="absolute inset-0 [backface-visibility:hidden] antialiased [text-rendering:optimizeLegibility]"
                style={{
                  transform: "rotateY(180deg)",
                  zIndex: 1,
                }}
              >
                <ElectricBorder
                  color={card.electricColor || "#b5b5b5"}
                  speed={1}
                  chaos={0.12}
                  borderRadius={18}
                  className="h-full w-full"
                >
                  <PixelTransition
                    gridSize={10}
                    pixelColor="#b5b5b5"
                    once={false}
                    animationStepDuration={0.4}
                    aspectRatio="0%"
                    className="w-full h-full rounded-[18px] !p-0"
                    firstContent={
                      <div className="h-full w-full rounded-[18px] overflow-hidden bg-zinc-950 border border-zinc-800/90 text-white flex flex-col font-sora shadow-2xl relative select-none antialiased">
                        <div className="flex flex-row h-[28%] sm:h-[30%] w-full border-b border-zinc-800/90">
                          <div className="flex-1 bg-zinc-900 p-3 sm:p-5 flex items-center justify-between border-r border-zinc-800/90">
                            <span className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-white font-sora antialiased drop-shadow-sm">
                              {card.brandName || "Canvas"}
                              <span className="text-yellow-400">.</span>
                            </span>
                          </div>

                          <div className="w-[65px] sm:w-[85px] h-full bg-zinc-800/90 flex items-center justify-center relative overflow-hidden shrink-0 border-l border-zinc-800/90">
                            <div
                              className="absolute inset-0 opacity-70"
                              style={{
                                background:
                                  "radial-gradient(circle at center, #ffffff 0%, #71717a 50%, #27272a 100%)",
                              }}
                            />
                            <div className="absolute inset-0 opacity-20 bg-[conic-gradient(from_0deg,#ffffff,#3f3f46,#ffffff,#3f3f46,#ffffff)]" />
                            <span className="relative z-10 text-xs sm:text-sm font-black tracking-widest text-zinc-100 uppercase border border-zinc-700 bg-zinc-950/90 px-2 py-0.5 rounded shadow-sm">
                              {card.badgeNumber || `0${i + 1}`}
                            </span>
                          </div>
                        </div>

                        <div className="flex-1 flex flex-row w-full overflow-hidden">
                          <div className="w-[34%] sm:w-[32%] border-r border-zinc-800/90 flex flex-col h-full shrink-0">
                            <div className="h-[35%] bg-black border-b border-zinc-800/90 relative overflow-hidden">
                              <div
                                className="absolute inset-0 opacity-25"
                                style={{
                                  backgroundImage:
                                    "repeating-linear-gradient(45deg, #ffffff, #ffffff 2px, transparent 2px, transparent 7px)",
                                }}
                              />
                            </div>

                            <div className="flex-1 p-2 sm:p-4 flex flex-col items-center justify-between bg-gradient-to-b from-zinc-900 to-zinc-950 text-white relative overflow-hidden">
                              <span className="text-3xl sm:text-5xl font-black tracking-tighter leading-none mt-2 sm:mt-3 text-white antialiased drop-shadow-sm">
                                {card.statNumber || "99"}
                              </span>
                              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-800 text-yellow-400 flex items-center justify-center text-[10px] sm:text-xs font-black shadow-md border border-zinc-700">
                                {card.statLabel || "%"}
                              </div>
                            </div>
                          </div>

                          <div className="flex-1 bg-zinc-950 p-3.5 sm:p-5 flex flex-col justify-between overflow-hidden">
                            <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest border-b border-zinc-800/90 pb-1.5 mb-1">
                              <span>←</span>
                              <span className="truncate mx-1">
                                {card.category || "PROJECT"}
                              </span>
                              <span>→</span>
                            </div>

                            <div className="my-auto">
                              <h4 className="text-base sm:text-xl md:text-2xl font-black text-white leading-tight tracking-tight mb-1 sm:mb-1.5 antialiased drop-shadow-sm">
                                {card.title}
                              </h4>
                              <p className="text-[11px] sm:text-xs md:text-sm text-zinc-200 font-medium leading-relaxed line-clamp-3 antialiased">
                                {card.description}
                              </p>
                            </div>

                            <div className="pt-1 flex items-center justify-end text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">
                              <a
                                href={
                                  card.liveUrl ||
                                  "https://github.com/aarjav-shukla"
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1 hover:text-yellow-400 transition-colors cursor-pointer relative z-30 pointer-events-auto"
                              >
                                Hover for details →
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                    secondContent={
                      <div className="h-full w-full rounded-[18px] overflow-hidden bg-zinc-950 border border-zinc-800 text-white flex flex-col font-sora shadow-2xl relative select-none antialiased p-4 sm:p-6 justify-between">
                        <div className="flex items-center justify-between border-b border-zinc-800/90 pb-2.5">
                          <span className="text-xs font-mono font-extrabold text-zinc-400 uppercase tracking-widest">
                            {card.brandName || "PROJECT"}
                            <span className="text-yellow-400">.</span>
                          </span>
                          <span className="text-xs font-mono font-bold text-zinc-400 border border-zinc-800 bg-zinc-900/80 px-2 py-0.5 rounded">
                            {card.badgeNumber || `0${i + 1}`}
                          </span>
                        </div>

                        <div className="my-auto flex flex-col gap-2.5">
                          <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                            {card.title}
                          </h3>
                          <p className="text-[11px] sm:text-xs md:text-sm text-zinc-300 font-medium leading-relaxed line-clamp-3">
                            {card.secondDescription || card.description}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {(
                              card.techStack || [
                                "React",
                                "TypeScript",
                                "Tailwind",
                                "GSAP",
                              ]
                            ).map((tech, techIdx) => (
                              <span
                                key={techIdx}
                                className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 uppercase hover:border-zinc-700 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-zinc-800/90 flex items-center justify-between">
                          <a
                            href={
                              card.liveUrl || "https://github.com/aarjav-shukla"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-full text-center py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider border border-zinc-700/80 hover:border-yellow-400/60 transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer relative z-30 pointer-events-auto"
                          >
                            View on Github ↗
                          </a>
                        </div>
                      </div>
                    }
                  />
                </ElectricBorder>
              </div>
            </div>
          );
        })}
      </div>

      <div
        ref={endTextRef}
        className="absolute bottom-[6%] sm:bottom-[8%] left-0 right-0 text-center z-20 flex flex-col items-center gap-3.5 sm:gap-5 pointer-events-auto"
      >
        <AnimatedButton
          as="a"
          href="https://github.com/aarjav-shukla"
          target="_blank"
          rel="noopener noreferrer"
          className="font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-zinc-950 border border-zinc-700/80 hover:border-yellow-400/60 shadow-2xl cursor-pointer shrink-0 z-30 flex items-center gap-2 group"
        >
          <span>View All Projects</span>

        </AnimatedButton>

        <ShinyText
          text="Not just code. Things I’ve built."
          disabled={false}
          speed={4}
          color="#a1a1aa"
          shineColor="#ffffff"
          spread={120}
          className="text-xl sm:text-3xl font-bold tracking-tight font-sora pointer-events-none"
        />
      </div>
    </div>
  );
}
