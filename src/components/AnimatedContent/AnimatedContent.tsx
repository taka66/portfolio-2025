"use client";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import { easings } from "@react-spring/web";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

export function AnimatedContent() {
  return (
    <SplitText
      text="takahirofujii.dev"
      className="text-2xl font-semibold text-center"
      delay={150}
      animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
      animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
      easing={easings.easeOutCubic}
      threshold={0.2}
      rootMargin="-50px"
      onLetterAnimationComplete={handleAnimationComplete}
    />
  );
}
