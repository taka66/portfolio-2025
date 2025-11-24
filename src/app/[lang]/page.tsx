"use client";

import { AnimatedContent } from "@/components/AnimatedContent/AnimatedContent";
import Threads from "@/blocks/Backgrounds/Threads/Threads";
import { AboutMe } from "@/components/AboutMe/AboutMe";
import { Locale } from "@/i18n/i18n-config";
import { getDictionary } from "@/i18n/dictionaries";
import { ScrollIndicator } from "@/components/ScrollIndicator/ScrollIndicator";
import { MotionWrapper } from "@/components/MotionWrapper/MotionWrapper";
import { useEffect, useState } from "react";

export default function Home(props: { params: Promise<{ lang: Locale }> }) {
  const [aboutmeDict, setAboutmeDict] = useState<{
    name: string;
    title: string;
    description: string;
    skills?: {
      tech: {
        label: string;
        items: string[];
      };
      management: {
        label: string;
        items: string[];
      };
    };
  } | null>(null);

  useEffect(() => {
    const loadDictionary = async () => {
      const { lang } = await props.params;
      const dictData = await getDictionary(lang);
      setAboutmeDict(dictData.AboutMe);
    };
    loadDictionary();
  }, [props.params]);


  if (!aboutmeDict) {
    return null;
  }

  return (
    <MotionWrapper className="font-[family-name:var(--font-geist-sans)]">
      <main className="relative flex flex-col items-center -mt-16 h-[100svh]">
        <div className="absolute inset-0 -z-10">
          <Threads amplitude={1} distance={0.1} enableMouseInteraction={true} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col gap-[32px] items-center sm:items-start">
            <AnimatedContent />
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ScrollIndicator text="About me" />
        </div>
      </main>
      <AboutMe dictionary={aboutmeDict} />
    </MotionWrapper>
  );
}
