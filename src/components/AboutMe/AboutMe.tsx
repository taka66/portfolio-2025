import DecryptedText from "@/blocks/TextAnimations/DecryptedText/DecryptedText";
import ScrollReveal from "@/blocks/TextAnimations/ScrollReveal/ScrollReveal";
import React from "react";

interface AboutMeProps {
  dictionary: {
    name: string;
    title: string;
    description: string;
  };
}

export function AboutMe({ dictionary }: AboutMeProps) {
  const { name, title, description } = dictionary;
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 space-y-6">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
            <DecryptedText speed={100} text={name} animateOn="view" revealDirection="center" />
          </h3>
          <p className="text-base text-gray-600 dark:text-gray-400 font-medium">{title}</p>
          <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={6} textClassName="text-base text-gray-600 dark:text-gray-400 whitespace-pre-line">
            {description}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
