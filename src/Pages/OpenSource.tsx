import React from 'react';
import ScrollFloat from '../Components/ScrollFloat';
import ShinyText from '../Components/ShinyText';
import { GithubCalendar } from '@/Components/ui/github-calendar';
import { ImageRevealList, type ImageRevealListItem } from '@/Components/ui/image-reveal-list';
import StatsCounter from '@/Components/ui/stats-counter';
import AnimatedButton from '@/Components/ui/animated-button';
import CursorGrid from '@/Components/CursorGrid';
import eventyayImg from '@/Images/6295529.jpg';
import submittyImg from '@/Images/10768785.png';
import kanaDojoImg from '@/Images/240290321.png';

const items: ImageRevealListItem[] = [
  {
    id: "1",
    title: "Eventyay",
    subtitle: "Eventyay is an open source event management platform by FOSSASIA.",
    image: eventyayImg,
    number: "01",
    href: "https://github.com/fossasia/eventyay",
  },
  {
    id: "2",
    title: "Submitty",
    subtitle: "Submitty is an open source course management platform.",
    image: submittyImg,
    number: "02",
    href: "https://github.com/aarjav-shukla/Submitty",
  },
  {
    id: "3",
    title: "Kana-Dojo",
    subtitle: "An aesthetic and highly customizable platform for mastering Japanese",
    image: kanaDojoImg,
    number: "03",
    href: "https://github.com/lingdojo/kana-dojo",
  },
];

const OpenSource: React.FC = () => {
  return (
    <section
      id="opensource"
      className="font-sora relative w-full px-6 md:px-10 py-16 md:py-24 text-white bg-black z-20 overflow-hidden scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-12 relative z-10">
        <div className="text-left overflow-visible pr-4">
          <ScrollFloat
            animationDuration={5}
            ease="power2.out"
            scrollStart="top bottom-=15%"
            scrollEnd="top center-=10%"
            stagger={0.3}
            highlightChar="O"
            highlightIndex={0}
            containerClassName="text-left my-0 overflow-visible w-full"
            textClassName="font-sora text-3xl sm:text-5xl md:text-[5.5rem] lg:text-[7.5rem] xl:text-[9rem] font-black tracking-tighter text-[#b5b5b5] uppercase leading-none whitespace-nowrap"
          >
            OPEN SOURCE
          </ScrollFloat>
        </div>


        <div className="w-full flex justify-center py-4 overflow-visible">
          <GithubCalendar username="aarjav-shukla" colorSchema="yellow" />
        </div>


        <div className="w-full flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-2 overflow-visible">

          <AnimatedButton
            className="rounded-2xl bg-zinc-950/90 border border-zinc-800/80 px-6 py-3.5 shadow-xl backdrop-blur-md hover:border-yellow-400/50 cursor-pointer text-left font-normal"
          >
            <div className="flex items-center gap-3">
              <StatsCounter
                value={8}
                suffix="+"
                duration={2}
                className="text-2xl sm:text-4xl font-black font-sora text-white tracking-tight"
              />
              <span className="text-xs sm:text-sm font-semibold text-zinc-400 font-sora uppercase tracking-widest border-l border-zinc-800 pl-3">
                PRs Merged
              </span>
            </div>
          </AnimatedButton>


          <AnimatedButton
            className="rounded-2xl bg-zinc-950/90 border border-zinc-800/80 px-6 py-3.5 shadow-xl backdrop-blur-md hover:border-yellow-400/50 cursor-pointer text-left font-normal"
          >
            <div className="flex items-center gap-3">
              <StatsCounter
                value={10}
                suffix="+"
                duration={2}
                className="text-2xl sm:text-4xl font-black font-sora text-white tracking-tight"
              />
              <span className="text-xs sm:text-sm font-semibold text-zinc-400 font-sora uppercase tracking-widest border-l border-zinc-800 pl-3">
                Orgs Explored
              </span>
            </div>
          </AnimatedButton>
        </div>


        <div className="w-full max-w-[760px] mx-auto flex flex-col items-start gap-4 pt-4 overflow-visible px-2">
          <ShinyText
            text="Some open source orgs I have contributed to"
            disabled={false}
            speed={4}
            color="#a1a1aa"
            shineColor="#ffffff"
            spread={120}
            className="text-lg sm:text-2xl font-bold tracking-tight font-sora text-left"
          />

          <ImageRevealList items={items} className="px-0 w-full" />


          <div className="w-full flex justify-end pt-1">
            <ShinyText
              text="..many more"
              disabled={false}
              speed={4}
              color="#a1a1aa"
              shineColor="#ffffff"
              spread={120}
              className="text-base sm:text-xl font-bold tracking-tight font-sora text-right cursor-pointer hover:underline"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
