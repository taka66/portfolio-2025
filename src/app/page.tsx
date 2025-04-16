import { AnimatedContent } from "@/components/AnimatedContent/AnimatedContent";
import Threads from "@/blocks/Backgrounds/Threads/Threads";
import { AboutMe } from "@/components/AboutMe/AboutMe";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="relative flex flex-col items-center justify-center min-h-screen p-8 sm:p-20">
        <div className="absolute inset-0 -z-10">
          <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
        </div>
        <div className="flex flex-col gap-[32px] items-center sm:items-start">
          <AnimatedContent />
        </div>
      </main>
      <AboutMe />
      <footer className="flex gap-[24px] flex-wrap items-center justify-center p-8 pb-20">© takahiro fujii</footer>
    </div>
  );
}
