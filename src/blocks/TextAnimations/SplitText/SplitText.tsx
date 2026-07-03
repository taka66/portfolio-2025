/*
	Installed from https://reactbits.dev/ts/tailwind/
	Rewritten from @react-spring/web to motion to consolidate animation libraries.
*/
"use client";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

interface SplitTextProps {
  text?: string;
  className?: string;
  /** Per-letter stagger in milliseconds */
  delay?: number;
  /** Duration of each letter's animation in seconds */
  duration?: number;
  easing?: (t: number) => number;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "right" | "center" | "justify" | "start" | "end";
  onLetterAnimationComplete?: () => void;
}

// Matches the previous easeOutCubic default
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const SplitText: React.FC<SplitTextProps> = ({
  text = "",
  className = "",
  delay = 100,
  duration = 0.6,
  easing = easeOutCubic,
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const words = text.split(" ").map((word) => word.split(""));
  const letters = words.flat();
  const animatedCount = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  // Observe the paragraph, not the letters: the paragraph clips its content
  // (overflow-hidden mask effect), so the translated-down letters start
  // outside its box and would never intersect the viewport themselves.
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
    margin: rootMargin as `${number}px`,
  });

  const revealed = isInView || !!shouldReduceMotion;

  const handleLetterComplete = () => {
    if (!revealed) return;
    animatedCount.current += 1;
    if (animatedCount.current === letters.length && onLetterAnimationComplete) {
      onLetterAnimationComplete();
    }
  };

  return (
    <p ref={ref} className={`split-parent overflow-hidden inline ${className}`} style={{ textAlign, whiteSpace: "normal", wordWrap: "break-word" }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.map((letter, letterIndex) => {
            const index = words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) + letterIndex;

            return (
              <motion.span
                key={index}
                className="inline-block transform transition-opacity will-change-transform"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration, delay: (index * delay) / 1000, ease: easing }}
                onAnimationComplete={handleLetterComplete}
              >
                {letter}
              </motion.span>
            );
          })}
          <span style={{ display: "inline-block", width: "0.3em" }}>&nbsp;</span>
        </span>
      ))}
    </p>
  );
};

export default SplitText;
