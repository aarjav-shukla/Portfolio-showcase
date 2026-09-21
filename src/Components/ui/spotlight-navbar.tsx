"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavItem {
    label: string;
    href: string;
}

export interface SpotlightNavbarProps {
    items?: NavItem[];
    className?: string;
    onItemClick?: (item: NavItem, index: number) => void;
    defaultActiveIndex?: number;
    activeIndex?: number;
}

export function SpotlightNavbar({
    items = [
        { label: "Home", href: "#" },
        { label: "About", href: "#about" },
        { label: "Projects", href: "#" },
        { label: "Open Source", href: "#" },
        { label: "Contact", href: "#" },
    ],
    className,
    onItemClick,
    defaultActiveIndex = 0,
    activeIndex: controlledActiveIndex,
}: SpotlightNavbarProps) {
    const navRef = useRef<HTMLDivElement>(null);
    const [internalActiveIndex, setInternalActiveIndex] = useState(defaultActiveIndex);
    const [hoverX, setHoverX] = useState<number | null>(null);

    const activeIndex = controlledActiveIndex !== undefined ? controlledActiveIndex : internalActiveIndex;

    const spotlightX = useRef(0);
    const ambienceX = useRef(0);

    useEffect(() => {
        if (controlledActiveIndex !== undefined) return;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY < 150) {
                setInternalActiveIndex(0);
                return;
            }

            let currentActiveIndex = 0;
            items.forEach((item, idx) => {
                const id = item.href.replace('#', '');
                if (!id || id === 'home') return;

                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= window.innerHeight * 0.55) {
                        currentActiveIndex = idx;
                    }
                }
            });

            setInternalActiveIndex(prev => (prev !== currentActiveIndex ? currentActiveIndex : prev));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [items, controlledActiveIndex]);

    useEffect(() => {
        if (!navRef.current) return;
        const nav = navRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = nav.getBoundingClientRect();
            const x = e.clientX - rect.left;
            setHoverX(x);
            spotlightX.current = x;
            nav.style.setProperty("--spotlight-x", `${x}px`);
        };

        const handleMouseLeave = () => {
            setHoverX(null);
            const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
            if (activeItem) {
                const navRect = nav.getBoundingClientRect();
                const itemRect = activeItem.getBoundingClientRect();
                const targetX = itemRect.left - navRect.left + itemRect.width / 2;

                animate(spotlightX.current, targetX, {
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    onUpdate: (v) => {
                        spotlightX.current = v;
                        nav.style.setProperty("--spotlight-x", `${v}px`);
                    }
                });
            }
        };

        nav.addEventListener("mousemove", handleMouseMove);
        nav.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            nav.removeEventListener("mousemove", handleMouseMove);
            nav.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [activeIndex]);

    useEffect(() => {
        if (!navRef.current) return;
        const nav = navRef.current;
        const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);

        if (activeItem) {
            const navRect = nav.getBoundingClientRect();
            const itemRect = activeItem.getBoundingClientRect();
            const targetX = itemRect.left - navRect.left + itemRect.width / 2;

            animate(ambienceX.current, targetX, {
                type: "spring",
                stiffness: 200,
                damping: 20,
                onUpdate: (v) => {
                    ambienceX.current = v;
                    nav.style.setProperty("--ambience-x", `${v}px`);
                },
            });
        }
    }, [activeIndex]);

    const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem, index: number) => {
        const href = item.href;
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            if (!targetId || targetId === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }
        setInternalActiveIndex(index);
        onItemClick?.(item, index);
    };

    return (
        <div className={cn("relative flex justify-center", className)}>
            <nav
                ref={navRef}
                className={cn(
                    "spotlight-nav border border-white/15 bg-zinc-950/80 backdrop-blur-md shadow-lg shadow-black/40",
                    "relative h-11 rounded-full transition-all duration-300 overflow-hidden flex items-center"
                )}
            >
                <ul className="relative flex items-center h-full px-2 gap-1 z-[10]">
                    {items.map((item, idx) => (
                        <li key={idx} className="relative h-full flex items-center justify-center">
                            <a
                                href={item.href}
                                data-index={idx}
                                onClick={(e) => handleItemClick(e, item, idx)}
                                className={cn(
                                    "px-4 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full cursor-pointer",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                                    activeIndex === idx
                                        ? "text-white font-semibold"
                                        : "text-zinc-400 hover:text-white"
                                )}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div
                    className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] transition-opacity duration-300"
                    style={{
                        opacity: hoverX !== null ? 1 : 0,
                        background: `
              radial-gradient(
                120px circle at var(--spotlight-x) 100%, 
                var(--spotlight-color, rgba(255, 255, 255, 0.22)) 0%, 
                transparent 50%
              )
            `
                    }}
                />

                <div
                    className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] z-[2]"
                    style={{
                        background: `
                  radial-gradient(
                    60px circle at var(--ambience-x) 0%, 
                    var(--ambience-color, rgba(255, 255, 255, 0.9)) 0%, 
                    transparent 100%
                  )
                `
                    }}
                />
            </nav>

            <style>{`
        .spotlight-nav {
          --spotlight-color: rgba(255, 255, 255, 0.22);
          --ambience-color: rgba(255, 255, 255, 0.9);
        }
      `}</style>
        </div>
    );
}

