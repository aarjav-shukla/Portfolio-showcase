import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFloat from '../Components/ScrollFloat';
import TextAnimation from "../Components/ui/staggerText";
import { TypingKeyboard } from "../Components/ui/typing-keyboard";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
    const keyboardWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = keyboardWrapperRef.current;
        if (!el) return;

        const tween = gsap.fromTo(
            el,
            { x: 300, opacity: 0 },
            {
                x: 100,
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top bottom-=15%',
                    end: 'bottom center+=30%',
                    scrub: 0.1,
                }
            }
        );

        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, []);

    return (
        <section id="about" className="font-sora relative min-h-[130vh] w-full bg-black flex flex-col items-center justify-start px-8 sm:px-16 md:px-24 lg:px-28 pt-32 sm:pt-40 pb-36 z-20 overflow-hidden scroll-mt-24">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/40 to-black pointer-events-none" />

            <div className="relative z-10 w-full max-w-7xl mx-auto text-left mb-8 sm:mb-12">
                <ScrollFloat
                    animationDuration={1}
                    ease="power2.out"
                    scrollStart="top bottom-=15%"
                    scrollEnd="top center-=10%"
                    stagger={0.3}
                    highlightChar="U"
                    containerClassName="text-left my-0"
                    textClassName="font-sora text-5xl sm:text-7xl md:text-[9rem] lg:text-[12rem] xl:text-[14rem] font-black tracking-tighter text-[#b5b5b5] uppercase leading-none"
                >
                    ABOUT ME
                </ScrollFloat>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 mt-6 sm:mt-8">
                <div className="w-full lg:w-1/2 flex flex-col pt-4 sm:pt-6">
                    <TextAnimation
                        divideBy="word"
                        delay={0.1}
                        stagger={0.1}
                        scrub={0.8}
                        scrollStart="top bottom-=15%"
                        scrollEnd="top center+=22%"
                        textClassName="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-[#b5b5b5] leading-relaxed"
                    >
                        Hello there! I'm Aarjav Shukla, a CSE student at IIIT Sonepat who somehow turned “I’ll just learn web development” into full-stack development, open source, Devops, DSA, and an ever-growing number of Git branches.
                    </TextAnimation>
                </div>

                <div ref={keyboardWrapperRef} className="w-full lg:w-1/2 flex justify-center lg:justify-end overflow-visible">
                    <TypingKeyboard
                        autoTypeText="const aarjav:Developer = {
    college:IIIT sonepat-B.Tech CSE,
    focus:[
    Full Stack Development,
    Open source contributions,
    DevOps,
    DSA
  ]}"
                        typingSpeed={[100, 130]}
                        scale={1}
                        className="w-full flex items-center justify-center lg:justify-end pointer-events-auto"
                    />
                </div>
            </div>
        </section>
    );
};

export default About;
