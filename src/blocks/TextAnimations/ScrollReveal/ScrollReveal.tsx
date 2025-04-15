/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

import React, { useEffect, useRef, useMemo, ReactNode, RefObject, ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  as?: ElementType;
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ as: Component = "div", children, scrollContainerRef, enableBlur = true, baseOpacity = 0.1, baseRotation = 3, blurStrength = 4, containerClassName = "", textClassName = "", rotationEnd = "bottom bottom", wordAnimationEnd = "bottom bottom" }) => {
  const containerRef = useRef<HTMLElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    // Split by newline first, keeping the newline characters
    const lines = text.split(/(\n)/);

    return lines.map((line, lineIndex) => {
      if (line === "\n") {
        // Render a <br> tag for explicit newlines
        return <br key={`br-${lineIndex}`} />;
      }
      // For non-newline parts, split by other whitespace and wrap words
      return line.split(/(\s+)/).map((part, partIndex) => {
        // Preserve existing whitespace handling (might collapse visually)
        if (part.match(/^\s+$/)) {
          // Return non-newline whitespace as is (browser might collapse it)
          // We return it to maintain spacing logic if needed, though \n is handled above.
          return part;
        }
        if (part.length > 0) {
          // Wrap actual words in spans for animation
          return (
            <span className="inline-block word" key={`${lineIndex}-${partIndex}`}>
              {part}
            </span>
          );
        }
        return null; // Handle potential empty strings from splitting
      });
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "none",
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom",
          end: rotationEnd,
          scrub: true,
        },
      }
    );

    const wordElements = el.querySelectorAll<HTMLElement>(".word");

    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: "opacity" },
      {
        ease: "none",
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom-=20%",
          end: wordAnimationEnd,
          scrub: true,
        },
      }
    );

    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: "none",
          filter: "blur(0px)",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom-=20%",
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <Component ref={containerRef} className={`my-5 ${containerClassName}`}>
      <p className={`leading-[1.5]  ${textClassName}`}>{splitText}</p>
    </Component>
  );
};

export default ScrollReveal;
