import { AnimatedContent } from "@/components/AnimatedContent/AnimatedContent";
import Threads from "@/blocks/Backgrounds/Threads/Threads";
import { AboutMe } from "@/components/AboutMe/AboutMe";
import { Locale } from "@/i18n/i18n-config";
import { getDictionary } from "@/i18n/dictionaries";
import { ScrollIndicator } from "@/components/ScrollIndicator/ScrollIndicator";
import { MotionWrapper } from "@/components/MotionWrapper/MotionWrapper";

interface HomePageProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata(props: HomePageProps) {
  const { lang } = await props.params;
  return {
    alternates: {
      canonical: lang === "ja" ? "/" : `/${lang}`,
      languages: { ja: "/", en: "/en" },
    },
  };
}

export default async function Home(props: HomePageProps) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);

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
      <AboutMe dictionary={dict.AboutMe} />
    </MotionWrapper>
  );
}
