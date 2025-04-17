import { AnimatedContent } from "@/components/AnimatedContent/AnimatedContent";
import Threads from "@/blocks/Backgrounds/Threads/Threads";
import { AboutMe } from "@/components/AboutMe/AboutMe";
import { Locale } from "@/i18n/i18n-config";
import { getDictionary } from "@/i18n/dictionaries";
import { ScrollIndicator } from "@/components/ScrollIndicator/ScrollIndicator";

export default async function Home(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const dictData = await getDictionary(lang);
  const aboutme = dictData.AboutMe;

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="relative flex flex-col items-center justify-center min-h-screen p-8 sm:p-20">
        <div className="absolute inset-0 -z-10">
          <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
        </div>
        <div className="flex flex-col gap-[32px] items-center sm:items-start">
          <AnimatedContent />
          <ScrollIndicator text="About me" />
        </div>
      </main>
      <AboutMe dictionary={aboutme} />
      <footer className="flex gap-[24px] flex-wrap items-center justify-center p-8 pb-20">© takahiro fujii</footer>
    </div>
  );
}
