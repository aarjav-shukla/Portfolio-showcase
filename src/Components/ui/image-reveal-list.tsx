import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ImageRevealListItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  number: string;
  href?: string;
}

export interface ImageRevealListProps {
  items: ImageRevealListItem[];
  className?: string;
}

export function ImageRevealList({ items, className }: ImageRevealListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const listItems = containerRef.current.querySelectorAll<HTMLLIElement>(".reveal-item");

    listItems.forEach((item, index) => {
      const fromLeft = index % 2 === 0;
      const xOffset = fromLeft ? -160 : 160;

      gsap.fromTo(
        item,
        {
          x: xOffset,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          },
        }
      );
    });

    ScrollTrigger.refresh();
  }, { scope: containerRef, dependencies: [items] });

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full max-w-[760px] mx-auto overflow-visible px-2 py-4", className)}
    >
      <ul className="list-none bg-zinc-950/80 rounded-2xl p-3 backdrop-blur-md border border-zinc-800/90 shadow-2xl flex flex-col gap-2 overflow-visible">
        {items.map((item) => (
          <li key={item.id} className="reveal-item relative overflow-visible">
            <a
              href={item.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center p-4 sm:p-5 text-white no-underline text-base sm:text-lg font-bold rounded-xl transition-all duration-300 bg-zinc-900/60 hover:bg-zinc-800/90 border border-zinc-800/60 hover:border-zinc-700/80 hover:translate-x-1"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute -left-28 sm:-left-36 top-1/2 -translate-y-1/2 scale-90 w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] rounded-xl object-contain bg-zinc-950 p-2.5 shadow-2xl opacity-0 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-[100] group-hover:opacity-100 group-hover:scale-100 group-hover:-left-32 sm:group-hover:-left-40 border border-zinc-700/80"
              />
              <span className="text-zinc-400 font-mono text-sm sm:text-base mr-5 min-w-[28px] font-bold group-hover:text-zinc-300 transition-colors">
                {item.number}
              </span>
              <span className="text-white group-hover:text-zinc-200 transition-colors">
                {item.title}
              </span>
              {item.subtitle && (
                <span className="ml-auto text-zinc-400 text-xs sm:text-sm font-medium group-hover:text-zinc-200 transition-colors">
                  {item.subtitle}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImageRevealList;
