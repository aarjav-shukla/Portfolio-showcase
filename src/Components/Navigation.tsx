import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { SpotlightNavbar } from "@/Components/ui/spotlight-navbar";
import { MusicPlayer } from "./ui/music-player";

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Open Source", href: "#opensource" },
  { label: "Contact", href: "#contact" }
];

export const Navigation = () => {
  const navRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (navRef.current) {
        gsap.fromTo(
          navRef.current,
          { y: -100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.8,
            ease: 'power2.out',
            delay: 0.2,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
        <div ref={navRef}>
          <SpotlightNavbar items={navItems} />
        </div>
      </div>

      <div className="fixed top-2 right-2 sm:top-3 sm:right-3 z-50 pointer-events-auto scale-[0.1] sm:scale-[0.28] md:scale-[0.32] origin-top-right">
        <MusicPlayer
          src="https://youtu.be/8c399HPb01s?si=8Gmz926v5Wqj1a-s"
          coverArt="https://rukminim3.flixcart.com/image/480/640/kz4gh3k0/poster/j/s/c/medium-dark-tv-series-matte-finish-poster-posterpoint9403-original-imagb785huquwedz.jpeg?q=90"
          className="w-full max-w-xs"
        />
      </div>
    </>
  );
};

export default Navigation;
