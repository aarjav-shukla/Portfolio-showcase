import React from 'react';
import ScrollFloat from '../Components/ScrollFloat';
import CursorGrid from '@/Components/CursorGrid';
import ProfileCard from '@/Components/ProfileCard';
import PixelAssembleCard from '../Components/PixelAssembleCard';
import pfpImage from '../Images/Pfp.png';
import { MagneticDock } from "@/Components/ui/magnetic-dock";
import { ScrollBasedVelocity } from "@/Components/ui/scroll-based-velocity";
import { FaLinkedin, FaGithub, FaEnvelope, FaXTwitter } from "react-icons/fa6";

const items = [
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: <FaLinkedin className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />,
    onClick: () => window.open("https://www.linkedin.com/in/aarjav-shukla-b5763926b/", "_blank"),
  },
  {
    id: "github",
    label: "GitHub",
    icon: <FaGithub className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />,
    onClick: () => window.open("https://github.com/aarjav-shukla", "_blank"),
  },
  {
    id: "mail",
    label: "Email",
    icon: <FaEnvelope className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />,
    onClick: () => window.location.href = "mailto:aarjavshukla38@gmail.com",
  },
  {
    id: "x",
    label: "X (Twitter)",
    icon: <FaXTwitter className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />,
    onClick: () => window.open("https://x.com/Axrjav_droid", "_blank"),
  },
];

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="font-sora relative w-full px-6 md:px-10 py-16 md:py-24 text-white bg-black z-20 overflow-hidden scroll-mt-24 min-h-[90vh] flex flex-col justify-center items-center gap-8 md:gap-12 text-center"
    >

      <div className="absolute inset-0 z-0 pointer-events-auto">
        <CursorGrid
          cellSize={70}
          color="#a1a1aa"
          radius={140}
          falloff="smooth"
          holdTime={400}
          fadeDuration={800}
          lineWidth={1.2}
          maxOpacity={1}
          fillOpacity={0}
          gridOpacity={0}
          cellRadius={0}
          clickPulse
          pulseSpeed={600}
        />
      </div>


      <div className="absolute inset-x-0 top-[58%] -translate-y-1/2 z-5 pointer-events-none opacity-25 select-none overflow-hidden">
        <ScrollBasedVelocity
          text=" DESIGN - DEVELOP - BUILD - "
          default_velocity={6}
          className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-white drop-shadow-sm md:text-7xl md:leading-[5rem]"
        />
      </div>


      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-1" />


      <div className="max-w-7xl mx-auto w-full relative z-10 flex items-center justify-center pointer-events-none">
        <div className="text-center overflow-visible w-full flex justify-center pointer-events-auto">
          <ScrollFloat
            animationDuration={5}
            ease="power2.out"
            scrollStart="top bottom-=15%"
            scrollEnd="top center-=10%"
            stagger={0.3}
            highlightChar="A"
            highlightIndex={4}
            containerClassName="text-center my-0 overflow-visible flex justify-center w-full"
            textClassName="font-sora text-3xl sm:text-5xl md:text-[5.5rem] lg:text-[7.5rem] xl:text-[9rem] font-black tracking-tighter text-[#b5b5b5] uppercase leading-none whitespace-nowrap"
          >
            CONTACT ME
          </ScrollFloat>
        </div>
      </div>


      <div className="max-w-7xl mx-auto w-full relative z-10 flex justify-center items-center py-2 pointer-events-auto">
        <PixelAssembleCard gridCols={5} gridRows={7}>
          <ProfileCard
            name="Aarjav Shukla"
            title="Software Developer"
            handle="aarjav-shukla"
            status="Online"
            contactText="Contact Me"
            avatarUrl={pfpImage}
            showUserInfo={false}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => window.open('https://github.com/aarjav-shukla', '_blank')}
            behindGlowColor="rgba(250, 204, 21, 0.35)"
            behindGlowEnabled
            innerGradient="linear-gradient(145deg,#18181b 0%,#09090b 100%)"
          />
        </PixelAssembleCard>
      </div>


      <div className="max-w-7xl mx-auto w-full relative z-10 flex justify-center items-center overflow-visible pointer-events-auto">
        <MagneticDock items={items} />
      </div>
    </section>
  );
};

export default Contact;
