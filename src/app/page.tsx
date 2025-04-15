"use client";

import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import Threads from "@/blocks/Backgrounds/Threads/Threads";
import { easings } from "@react-spring/web";
import { AboutMe } from "@/components/AboutMe/AboutMe";

const handleAnimationComplete: () => void = () => {
  console.log("All letters have animated!");
};

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="relative flex flex-col items-center justify-center min-h-screen p-8 sm:p-20">
        <div className="absolute inset-0 -z-10">
          <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
        </div>
        <div className="flex flex-col gap-[32px] items-center sm:items-start">
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
        </div>
      </main>
      <AboutMe />
      <footer className="flex gap-[24px] flex-wrap items-center justify-center p-8 pb-20">
        Takahiro Fujii
      </footer>
    </div>
  );
}
