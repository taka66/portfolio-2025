/*
	Refactored to use framer-motion
*/
"use client";
import React, { useMemo, useRef, ReactNode, ElementType } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealProps {
  as?: ElementType;
  children: ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  as: Component = "div",
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
}) => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: ["start end", "end end"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [baseRotation, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [baseOpacity, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [blurStrength, 0]);
  const blurFilter = useTransform(blur, (v) => (enableBlur ? `blur(${v}px)` : "none"));

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    const lines = text.split(/(\n)/);

    return lines.map((line, lineIndex) => {
      if (line === "\n") {
        return <br key={`br-${lineIndex}`} />;
      }
      return line.split(/(\s+)/).map((part, partIndex) => {
        if (part.match(/^\s+$/)) {
          return part;
        }
        if (part.length > 0) {
          return (
            <span className="inline-block word" key={`${lineIndex}-${partIndex}`}>
              {part}
            </span>
          );
        }
        return null;
      });
    });
  }, [children]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionComponent = motion.create(Component as any);

  return (
    <MotionComponent
      ref={containerRef}
      className={`my-5 ${containerClassName}`}
      style={{ rotate, transformOrigin: "0% 50%" }}
    >
      <motion.p 
        className={`leading-[1.5] ${textClassName}`}
        style={{ 
            opacity,
            filter: blurFilter
        }}
      >
        {splitText}
      </motion.p>
    </MotionComponent>
  );
};

export default ScrollReveal;
