import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code,
  Database,
  Globe,
  Stack,
  GitBranch,
  Lightning,
  Terminal,
  Package,
  BracketsCurly,
  Layout,
  Atom,
  Gear,
  Cloud,
  Cube
} from '@phosphor-icons/react';

import ScrollFloat from './ScrollFloat';
import ShinyText from './ShinyText';
import AnimatedButton from './ui/animated-button';

gsap.registerPlugin(ScrollTrigger);

export interface SkillItem {
  name: string;
  icon?: React.ComponentType<any>;
  color?: string;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

interface SkillSectionProps {
  skillsData?: SkillCategory[];
}

export const defaultSkillsData: SkillCategory[] = [
  {
    category: "FRONTEND",
    items: [
      { name: "React", icon: Atom, color: "#ffffff" },
      { name: "Next.js", icon: Globe, color: "#ffffff" },
      { name: "TypeScript", icon: Code, color: "#ffffff" },
      { name: "Tailwind CSS", icon: Layout, color: "#ffffff" },
      { name: "GSAP & Motion", icon: Lightning, color: "#ffffff" },
      { name: "HTML5 / CSS3", icon: Stack, color: "#ffffff" }
    ]
  },
  {
    category: "BACKEND",
    items: [
      { name: "Node.js", icon: Terminal, color: "#ffffff" },
      { name: "Express.js", icon: Gear, color: "#ffffff" },
      { name: "MongoDB", icon: Database, color: "#ffffff" },
      { name: "PostgreSQL", icon: Database, color: "#ffffff" },
      { name: "REST APIs", icon: BracketsCurly, color: "#ffffff" }
    ]
  },
  {
    category: "DEVOPS",
    items: [
      { name: "Docker", icon: Package, color: "#ffffff" },
      { name: "Git & GitHub", icon: GitBranch, color: "#ffffff" },
      { name: "Kubernetes", icon: Cloud, color: "#ffffff" },
      { name: "CI / CD", icon: Gear, color: "#ffffff" },
      { name: "Linux & Cloud", icon: Terminal, color: "#ffffff" }
    ]
  },
  {
    category: "TOOLS",
    items: [
      { name: "Blender", icon: Cube, color: "#ffffff" },
      { name: "Postman", icon: BracketsCurly, color: "#ffffff" },
      { name: "CloudFlare", icon: Code, color: "#ffffff" },

    ]
  }
];

export default function SkillSection({ skillsData = defaultSkillsData }: SkillSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (flowerRef.current) {
      gsap.to(flowerRef.current, {
        rotation: 1800,
        ease: 'none',
        scrollTrigger: {
          trigger: '#skills',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.3,
        }
      });
    }

    const categories = gsap.utils.toArray<HTMLElement>('.skill-category');

    categories.forEach((cat) => {
      const title = cat.querySelector('.category-title');
      const items = cat.querySelectorAll('.skill-item');

      if (!title || !items.length) return;

      gsap.set(title, { x: -50, autoAlpha: 0 });
      gsap.set(items, { y: 30, autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cat,
          start: 'top 98%',
          end: 'top 65%',
          scrub: 0.95
        }
      });

      tl.to(title, {
        x: 0,
        autoAlpha: 1,
        duration: 1.0,
        ease: 'none'
      }).to(items, {
        y: 0,
        autoAlpha: 1,
        duration: 0.95,
        stagger: 0.1,
        ease: 'none'
      }, '-=0.4');
    });

    ScrollTrigger.refresh();
  }, { scope: containerRef });

  return (
    <section
      id="skills"
      className="font-sora relative w-full px-6 md:px-10 py-16 md:py-24 text-white bg-black z-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto mb-12 md:mb-16 flex flex-row items-center justify-between gap-4 md:gap-8">
        <div className="text-left overflow-visible pr-4">
          <ScrollFloat
            animationDuration={5}
            ease="power2.out"
            scrollStart="top bottom-=15%"
            scrollEnd="top center-=10%"
            stagger={0.3}
            highlightChar="I"
            containerClassName="text-left my-0 overflow-visible"
            textClassName="font-sora text-5xl sm:text-7xl md:text-[9rem] lg:text-[12rem] xl:text-[14rem] font-black tracking-tighter text-[#b5b5b5] uppercase leading-none"
          >
            SKILLS
          </ScrollFloat>
        </div>

        <div className="shrink-0 flex items-center justify-center">
          <img
            ref={flowerRef}
            src="/images/flower.png"
            alt="3D Metallic Chrome Flower Graphic"
            className="w-20 h-20 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-56 lg:h-56 object-contain pointer-events-none select-none drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]"
          />
        </div>
      </div>

      <div
        ref={containerRef}
        className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24"
      >
        {skillsData.map((category, idx) => (
          <div
            key={idx}
            className="skill-category flex flex-col md:flex-row md:items-center gap-8 md:gap-16"
          >
            <div className="md:w-1/3 shrink-0">
              <h3 className="category-title pointer-events-auto shrink-0 select-none leading-none whitespace-nowrap">
                <ShinyText
                  text={category.category}
                  disabled={false}
                  speed={3}
                  color="#b5b5b5"
                  shineColor="#ffffff"
                  spread={120}
                  className="text-[clamp(2rem,10vw,3.6rem)] md:text-[4.5rem] font-extrabold uppercase tracking-tight"
                />
              </h3>
            </div>

            <div className="md:w-2/3 flex flex-wrap gap-4 md:gap-6 pointer-events-auto">
              {category.items.map((item, itemIdx) => (
                <AnimatedButton
                  key={itemIdx}
                  as="a"
                  className="skill-item flex items-center gap-2 md:gap-3 bg-black/80 border border-white/15 hover:border-white/40 transition-all rounded-lg md:rounded-xl px-3 py-2 md:px-5 md:py-3 shadow-lg cursor-pointer"
                >
                  {item.icon && (
                    <div className="w-5 h-5 md:w-7 md:h-7 flex items-center justify-center shrink-0 text-[#b5b5b5] group-hover:text-white transition-colors">
                      {React.createElement(item.icon, {
                        size: "100%",
                        weight: "regular",
                        color: "currentColor",
                      })}
                    </div>
                  )}
                  <span className="text-sm md:text-xl font-medium tracking-wide whitespace-nowrap text-[#b5b5b5] group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                </AnimatedButton>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
