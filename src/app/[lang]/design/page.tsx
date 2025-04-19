import { HoverEffect } from "@/blocks/Card/CardHoverEffect/CardHoverEffect";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/i18n-config";
import { MotionWrapper } from "@/components/MotionWrapper/MotionWrapper";

// Define the type for the design items inline, matching the dictionary structure
interface DesignProject {
  title: string;
  description: string;
  link?: string;
  image?: string;
}

// Define the props for the Design page component
interface DesignPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function Design(props: DesignPageProps) {
  const params = await props.params;
  const dict = await getDictionary(params.lang);

  // Type assertion to ensure dict.DesignPage.projects matches the DesignProject[] type
  const projects: DesignProject[] = dict.DesignPage.projects as DesignProject[];

  return (
    <MotionWrapper className="max-w-5xl mx-auto px-8 pt-24">
      <div className="mb-12">
        <h3 className="text-3xl font-bold mb-3">{dict.DesignPage.heading}</h3>
        <p className="text-gray-700 dark:text-gray-300">{dict.DesignPage.subheading}</p>
      </div>
      <HoverEffect items={projects} isSquare={true} isDesignMode={true} />
    </MotionWrapper>
  );
}
