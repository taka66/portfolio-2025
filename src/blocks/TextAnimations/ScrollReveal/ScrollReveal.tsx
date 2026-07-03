/*
	Installed from https://reactbits.dev/ts/tailwind/
	Rewritten from gsap/ScrollTrigger to motion's scroll-linked values to
	consolidate animation libraries (and to stop the old cleanup from killing
	every ScrollTrigger on the page).
*/
"use client";
import React, { useRef, useMemo, ReactNode, RefObject } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, MotionValue } from "motion/react";

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
}

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  baseOpacity: number;
  enableBlur: boolean;
  blurStrength: number;
}

const Word: React.FC<WordProps> = ({ children, progress, range, baseOpacity, enableBlur, blurStrength }) => {
  const opacity = useTransform(progress, range, [baseOpacity, 1]);
  const blur = useTransform(progress, range, [blurStrength, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.span className="inline-block word" style={{ opacity, ...(enableBlur ? { filter } : {}), willChange: "opacity" }}>
      {children}
    </motion.span>
  );
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Rotation eases out while the element travels from the viewport bottom
  // to fully scrolled in (was: ScrollTrigger "top bottom" -> "bottom bottom")
  const { scrollYProgress: rotationProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: ["start end", "end end"],
  });
  const rotate = useTransform(rotationProgress, [0, 1], [baseRotation, 0]);

  // Words fade/sharpen in sequence, starting once the element passes 80% of
  // the viewport height (was: "top bottom-=20%" -> "bottom bottom")
  const { scrollYProgress: wordsProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: ["start 0.8", "end end"],
  });

  const { nodes, wordCount } = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    // Split by newline first, keeping the newline characters
    const lines = text.split(/(\n)/);

    let count = 0;
    const parts = lines.map((line, lineIndex) => {
      if (line === "\n") {
        return { type: "br" as const, key: `br-${lineIndex}` };
      }
      return line.split(/(\s+)/).map((part, partIndex) => {
        if (part.match(/^\s+$/)) return { type: "space" as const, text: part, key: `${lineIndex}-${partIndex}` };
        if (part.length > 0) return { type: "word" as const, text: part, index: count++, key: `${lineIndex}-${partIndex}` };
        return null;
      });
    });
    return { nodes: parts.flat(), wordCount: count };
  }, [children]);

  return (
    <motion.div ref={containerRef} className={`my-5 ${containerClassName}`} style={{ rotate, transformOrigin: "0% 50%" }}>
      <p className={`leading-[1.5]  ${textClassName}`}>
        {nodes.map((node) => {
          if (!node) return null;
          if (node.type === "br") return <br key={node.key} />;
          if (node.type === "space") return node.text;
          return (
            <Word
              key={node.key}
              progress={wordsProgress}
              range={[node.index / wordCount, (node.index + 1) / wordCount]}
              baseOpacity={baseOpacity}
              enableBlur={enableBlur}
              blurStrength={blurStrength}
            >
              {node.text}
            </Word>
          );
        })}
      </p>
    </motion.div>
  );
};

export default ScrollReveal;
