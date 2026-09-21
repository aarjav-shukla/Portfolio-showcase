import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface PixelAssembleCardProps {
  children: React.ReactNode;
  gridCols?: number;
  gridRows?: number;
  className?: string;
}

export const PixelAssembleCard: React.FC<PixelAssembleCardProps> = ({
  children,
  gridCols = 5,
  gridRows = 7,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pixelGridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !cardRef.current || !pixelGridRef.current) return;

    const pixels = pixelGridRef.current.querySelectorAll('.pixel-block');
    if (!pixels.length) return;

    pixels.forEach((pixel) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 250 + Math.random() * 300;
      const scatterX = Math.cos(angle) * distance;
      const scatterY = Math.sin(angle) * distance;

      gsap.set(pixel, {
        x: scatterX,
        y: scatterY,
        rotation: (Math.random() - 0.5) * 120,
        opacity: 0,
        scale: 0.4 + Math.random() * 0.8,
        force3D: true,
      });
    });

    gsap.set(cardRef.current, { opacity: 0, scale: 0.95, force3D: true });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        end: 'top 35%',
        scrub: 0.2,
      },
    });

    tl.to(pixels, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      force3D: true,
      stagger: {
        grid: [gridRows, gridCols],
        from: 'random',
        amount: 0.3,
      },
      ease: 'power2.out',
    })
    .to(
      cardRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        force3D: true,
        ease: 'power1.out',
      },
      '-=0.35'
    )
    .to(
      pixels,
      {
        opacity: 0,
        duration: 0.25,
        ease: 'power1.in',
      },
      '-=0.2'
    );

    ScrollTrigger.refresh();
  }, { scope: containerRef });

  const totalTiles = gridCols * gridRows;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center justify-center overflow-visible rounded-[30px]",
        className
      )}
    >
      <div
        ref={pixelGridRef}
        className="absolute inset-0 z-20 pointer-events-none grid rounded-[30px] overflow-hidden gap-[1px] p-0.5"
        style={{
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          gridTemplateRows: `repeat(${gridRows}, 1fr)`,
        }}
      >
        {Array.from({ length: totalTiles }).map((_, i) => (
          <div
            key={i}
            className="pixel-block bg-zinc-900 border border-zinc-700/60 rounded-[2px] will-change-transform"
            style={{ width: '100%', height: '100%' }}
          />
        ))}
      </div>

      <div ref={cardRef} className="relative z-10 flex justify-center items-center will-change-transform">
        {children}
      </div>
    </div>
  );
};

export default PixelAssembleCard;
