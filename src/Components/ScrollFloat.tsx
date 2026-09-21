import React, { useEffect, useLayoutEffect, useMemo, useRef, type ReactNode, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  highlightChar?: string;
  highlightIndex?: number;
}

const SHUFFLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*░▒▓█#$&';

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'top bottom-=15%',
  scrollEnd = 'top center-=10%',
  stagger = 0.03,
  highlightChar,
  highlightIndex
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const isShufflingRef = useRef(false);

  const textStr = useMemo(() => (typeof children === 'string' ? children : ''), [children]);

  const splitText = useMemo(() => {
    return textStr.split('').map((char, index) => {
      const isHighlighted =
        (highlightChar && char.toUpperCase() === highlightChar.toUpperCase() && (highlightIndex === undefined || index === highlightIndex)) ||
        (highlightIndex !== undefined && index === highlightIndex);

      return (
        <span
          className={`inline-block word opacity-0 cursor-pointer transition-colors duration-150 ${isHighlighted ? 'text-yellow-400' : ''
            }`}
          key={index}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  }, [textStr, highlightChar, highlightIndex]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const charElements = el.querySelectorAll<HTMLElement>('.word');
    if (charElements.length === 0) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        charElements,
        {
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: '50% 0%'
        },
        {
          duration: animationDuration,
          ease: ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger: stagger,
          immediateRender: true,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
            invalidateOnRefresh: true,
          }
        }
      );
    }, el);


    return () => {
      ctx.revert();
    };
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const charNodes = Array.from(el.querySelectorAll<HTMLElement>('.word'));
    if (charNodes.length === 0) return;

    const origChars = textStr.split('');
    let intervalId: any = null;

    const triggerShuffle = () => {
      if (isShufflingRef.current) return;
      isShufflingRef.current = true;

      const shuffleCount = 6;
      let step = 0;

      intervalId = setInterval(() => {
        step++;
        charNodes.forEach((node, i) => {
          const orig = origChars[i];
          if (orig === ' ') return;

          const charDoneStep = shuffleCount + Math.floor(i * 0.4);
          if (step >= charDoneStep) {
            node.textContent = orig;
          } else {
            node.textContent = SHUFFLE_CHARS[Math.floor(Math.random() * SHUFFLE_CHARS.length)];
          }
        });

        if (step >= shuffleCount + charNodes.length * 0.4 + 2) {
          clearInterval(intervalId);
          charNodes.forEach((node, i) => {
            node.textContent = origChars[i] === ' ' ? '\u00A0' : origChars[i];
          });
          isShufflingRef.current = false;
        }
      }, 35);
    };

    el.addEventListener('mouseenter', triggerShuffle);

    return () => {
      el.removeEventListener('mouseenter', triggerShuffle);
      if (intervalId) clearInterval(intervalId);
      isShufflingRef.current = false;
    };
  }, [textStr]);

  return (
    <h2 ref={containerRef} className={`my-5 overflow-visible ${containerClassName}`}>
      <span className={`inline-block leading-tight pr-6 ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;
