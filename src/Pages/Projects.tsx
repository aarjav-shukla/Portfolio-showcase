import React, { useRef } from 'react';

import ScrollFloat from '../Components/ScrollFloat';
import { ScrollSplitCard } from '../Components/ui/scroll-split-card';

const projectCards = [
  {
    brandName: "Publish",
    title: "Medium",
    category: "POSTGRESS // PRISMA",
    description:
      "Full-stack blogging platform built to explore database-driven applications, type-safe ORM workflows and backend architecture.",
    secondDescription:
      "Built while learning Prisma & PostgreSQL — turning database concepts into a working full-stack blogging experience.",
    statNumber: "99",
    statLabel: "%",
    badgeNumber: "01",
    techStack: ["React 19", "Prisma", "Postgress", "Node.js", "Tailwind"],
    accentColor: "#ff4500",
    electricColor: "#b5b5b5",
    liveUrl: "https://github.com/aarjav-shukla/Medium",
  },
  {
    brandName: "Contribute",
    title: "K72",
    category: "REACT // GSAP ",
    description:
      "Creative agency-inspired website exploring cinematic motion, smooth transitions, and scroll-driven interactions with React & GSAP.",
    secondDescription:
      "Motion-driven agency website built to explore GSAP, smooth transitions and scroll-based interactions in React",
    statNumber: "72",
    statLabel: "%",
    badgeNumber: "02",
    techStack: ["React 19", "Gsap", "Framer motion", "Tailwind"],
    accentColor: "#f97316",
    electricColor: "#d4d4d8",
    liveUrl: "https://github.com/aarjav-shukla/k72-react-gsap",
  },
  {
    brandName: "Explore",
    title: "KataLyst",
    category: "EXPRESS // MONGO DB",
    description:
      "A cooperative gig-services platform connecting workers with customers through smart matching, real-time tracking and transparent governance.",
    secondDescription:
      "A full-stack gig-services platform featuring smart worker matching, real-time booking updates and cooperative governance.",
    statNumber: "24",
    statLabel: "7",
    badgeNumber: "03",
    techStack: ["Express", "Docker", "Mongo db", "TypeScript"],
    accentColor: "#ea580c",
    electricColor: "#b5b5b5",
    liveUrl: "https://github.com/aarjav-shukla/KataLyst",
  },
];

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="font-sora relative w-full px-4 sm:px-8 md:px-12 py-16 md:py-24 text-white bg-black z-20 overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/50 to-black pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto mb-10 md:mb-14 flex items-center justify-end">
        <div className="text-right overflow-visible w-full flex justify-end">
          <ScrollFloat
            animationDuration={5}
            ease="power2.out"
            scrollStart="top bottom-=15%"
            scrollEnd="top center-=10%"
            stagger={0.3}
            highlightChar="E"
            containerClassName="text-right my-0 overflow-visible flex justify-end w-full"
            textClassName="font-sora text-4xl sm:text-6xl md:text-[7.5rem] lg:text-[9.5rem] xl:text-[11rem] font-black tracking-tighter text-[#b5b5b5] uppercase leading-none whitespace-nowrap"
          >
            PROJECTS
          </ScrollFloat>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <ScrollSplitCard
          imageSrc="/images/project_banner.jpg"
          cards={projectCards}
        />
      </div>
    </section>
  );
};

export default Projects;
