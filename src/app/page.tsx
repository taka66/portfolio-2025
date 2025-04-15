"use client";

import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import Threads from "@/blocks/Backgrounds/Threads/Threads";
import { easings } from "@react-spring/web";
import GooeyNav from "@/blocks/Components/GooeyNav/GooeyNav";

const handleAnimationComplete: () => void = () => {
  console.log("All letters have animated!");
};

const items: { label: string; href: string }[] = [
  { label: "Home", href: "#" },
  { label: "Works", href: "#" },
  { label: "Blog", href: "https://note.com/takahirofujii/" },
];

export default function Home() {
  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="absolute inset-0 -z-10">
        <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
      </div>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
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
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Takahiro Fujii
      </footer>
    </div>
  );
}
