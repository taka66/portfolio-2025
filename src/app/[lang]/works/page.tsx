import { HoverEffect } from "@/blocks/Card/CardHoverEffect/CardHoverEffect";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/i18n-config";
import { MotionWrapper } from "@/components/MotionWrapper/MotionWrapper";

// Define the type for the project items inline, matching the dictionary structure
interface Project {
  title: string;
  description: string;
  link?: string;
}

// Define the props for the Works page component
interface WorksPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function Works(props: WorksPageProps) {
  const params = await props.params;
  const dict = await getDictionary(params.lang);

  // Type assertion to ensure dict.WorksPage.projects matches the Project[] type
  const projects: Project[] = dict.WorksPage.projects as Project[];

  return (
    <MotionWrapper className="max-w-5xl mx-auto px-8 pt-24">
      <div className="mb-12">
        <h3 className="text-3xl font-bold mb-3">{dict.WorksPage.heading}</h3>
        <p className="text-gray-700 dark:text-gray-300">{dict.WorksPage.subheading}</p>
      </div>
      <HoverEffect items={projects} />
    </MotionWrapper>
  );
}
