/*
	Refactored to use framer-motion
*/
"use client";
import { motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface SplitTextProps {
  text?: string;
  className?: string;
  delay?: number;
  animationFrom?: { opacity: number; transform: string };
  animationTo?: { opacity: number; transform: string };
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "right" | "center" | "justify" | "start" | "end";
  onLetterAnimationComplete?: () => void;
  easing?: (t: number) => number; // Kept for compatibility but not used directly in framer-motion variants in this simple implementation
}

const SplitText: React.FC<SplitTextProps> = ({
  text = "",
  className = "",
  delay = 100,
  animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
  animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const words = text.split(" ").map((word) => word.split(""));
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Convert transform string to object for framer-motion if possible, or use style
  // For simplicity, we'll assume the transform string is compatible or we map it.
  // However, framer-motion prefers x/y/z.
  // Let's parse the simple translate3d(0,40px,0) case or just use the string in style.
  // Framer motion 'animate' prop handles style objects.

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000, // delay is in ms
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { 
        opacity: animationFrom.opacity,
        transform: animationFrom.transform 
    },
    visible: { 
        opacity: animationTo.opacity, 
        transform: animationTo.transform,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
  };

  return (
    <motion.p
      ref={ref}
      className={`split-parent overflow-hidden inline ${className}`}
      style={{ textAlign, whiteSpace: "normal", wordWrap: "break-word" }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      onAnimationComplete={() => {
          if (onLetterAnimationComplete) onLetterAnimationComplete();
      }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.map((letter, letterIndex) => {
            const index = words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) + letterIndex;
            return (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block will-change-transform"
              >
                {letter}
              </motion.span>
            );
          })}
          <span style={{ display: "inline-block", width: "0.3em" }}>&nbsp;</span>
        </span>
      ))}
    </motion.p>
  );
};

export default SplitText;
