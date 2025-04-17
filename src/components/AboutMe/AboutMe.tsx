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

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.295Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export function AboutMe({ dictionary }: AboutMeProps) {
  const { name, title, description } = dictionary;
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 space-y-6 [&>h3]:mb-0">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
            <DecryptedText speed={100} text={name} animateOn="view" revealDirection="center" />
          </h3>
          <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
            <DecryptedText speed={100} text={title} animateOn="view" revealDirection="center" />
          </p>
          <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={6} textClassName="text-base text-gray-600 dark:text-gray-400 whitespace-pre-line">
            {description}
          </ScrollReveal>
          <div className="flex justify-center space-x-6 pt-4">
            <a href="https://x.com/taka_ft" target="_blank" rel="noopener noreferrer" aria-label="X profile" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <XIcon />
            </a>
            <a href="https://www.linkedin.com/in/takahiro-fujii-221a7461/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
