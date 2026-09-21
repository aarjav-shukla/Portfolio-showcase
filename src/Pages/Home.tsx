import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import Hyperspeed from "@/Components/Hyperspeed";
import { hyperspeedPresets } from "@/Components/HyperSpeedPresets";
import { AsciiEffect } from "@/Components/ui/ascii-effect";
import AnimatedButton from "@/Components/ui/animated-button";
import ShinyText from "@/Components/ShinyText";
import ParticleText from "@/Components/ParticleText";
import { FlipFadeText } from "@/Components/ui/flip-fade-text";
import LogoLoop from "@/Components/LogoLoop";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiGit, SiMongodb } from "react-icons/si";

const techLogos = [
  { node: <SiReact className="text-white text-3xl opacity-90 hover:opacity-100 transition-opacity" />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs className="text-zinc-300 text-3xl opacity-90 hover:opacity-100 transition-opacity" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript className="text-white text-3xl opacity-90 hover:opacity-100 transition-opacity" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss className="text-zinc-300 text-3xl opacity-90 hover:opacity-100 transition-opacity" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiNodedotjs className="text-white text-3xl opacity-90 hover:opacity-100 transition-opacity" />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiPython className="text-zinc-300 text-3xl opacity-90 hover:opacity-100 transition-opacity" />, title: "Python", href: "https://www.python.org" },
  { node: <SiGit className="text-white text-3xl opacity-90 hover:opacity-100 transition-opacity" />, title: "Git", href: "https://git-scm.com" },
  { node: <SiMongodb className="text-zinc-300 text-3xl opacity-90 hover:opacity-100 transition-opacity" />, title: "MongoDB", href: "https://www.mongodb.com" },
];

export const Home = () => {
  const heyTextRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (heyTextRef.current) {
        gsap.fromTo(
          heyTextRef.current,
          { x: -140, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.8,
            ease: 'power2.out',
            delay: 0.35,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Hyperspeed effectOptions={hyperspeedPresets.one} />
      </div>

      <div className="absolute top-0 right-0 bottom-0 w-full lg:w-1/2 h-full z-10 pointer-events-none overflow-hidden">
        <AsciiEffect
          variant="flow"
          imageSrc="/images/portrait.jpg"
          flowSpeed={0.22}
          flowStrength={12}
          mouseRadius={0}
          mouseStrength={0}
          fontSize={10}
          lineHeight={1}
          characterSpacing={1}
          brightnessBoost={2.2}
          contrast={1.1}
          threshold={0.06}
          posterize={16}
          dither="bayer"
          ditherStrength={0.8}
          colors={["#ffffff", "#e4e4e7", "#a1a1aa", "#71717a"]}
          fit="cover"
          scale={1.15}
          backgroundColor="transparent"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-start z-20 pointer-events-none px-8 sm:px-16 md:px-24 lg:px-28">
        <div className="w-full max-w-7xl pointer-events-auto bg-transparent flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="flex flex-col items-start justify-center gap-3 max-w-2xl">
            <AnimatedButton className="font-semibold tracking-wider uppercase mb-1">
              SOFTWARE DEVELOPER
            </AnimatedButton>

            <div className="flex flex-nowrap items-center gap-x-2 sm:gap-x-3 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight whitespace-nowrap">
              <div ref={heyTextRef} className="shrink-0 inline-flex items-center">
                <ShinyText
                  text="He"
                  speed={1}
                  delay={0}
                  color="#b5b5b5"
                  shineColor="#ffffff"
                  spread={120}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={false}
                  className="shrink-0"
                />
                <span className="text-yellow-400 shrink-0">y</span>
                <ShinyText
                  text=", I'm"
                  speed={1}
                  delay={0}
                  color="#b5b5b5"
                  shineColor="#ffffff"
                  spread={120}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={false}
                  className="shrink-0"
                />
              </div>
              <div className="inline-flex h-[42px] sm:h-[70px] md:h-[82px] w-[140px] sm:w-[230px] md:w-[300px] items-center shrink-0">
                <ParticleText
                  className="bg-transparent"
                  text="Aarjav"
                  align="left"
                  particleSize={2.0}
                  density={4}
                  color="#ffffff"
                  highlightColor="#a1a1aa"
                  scatter={190}
                  gatherDuration={1600}
                  stagger={420}
                  pointerRepel={42}
                  repelRadius={120}
                  idleDrift={0}
                  trigger="mount"
                  fontSize="clamp(1.8rem, 4.5vw, 4.5rem)"
                  fontWeight={800}
                  fontFamily="inherit"
                  glow={false}
                />
              </div>
            </div>

            <div className="mt-1">
              <FlipFadeText
                words={[
                  "MernStack.build()",
                  "OpenSource.contribute()",
                  "Building.enjoy()",
                ]}
                interval={5000}
                className="min-h-0 justify-start"
                textClassName="text-lg sm:text-2xl md:text-3xl font-medium text-zinc-300 normal-case tracking-normal"
              />
            </div>

            <div className="w-[300px] sm:w-[500px] md:w-[620px] max-w-full overflow-hidden mt-4 relative">
              <LogoLoop
                logos={techLogos}
                speed={50}
                direction="left"
                logoHeight={36}
                gap={36}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                fadeOutColor="#000000"
                ariaLabel="Technologies"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-72 bg-gradient-to-t from-black via-black/80 to-transparent z-30 pointer-events-none" />
    </section>
  );
};

export default Home;
