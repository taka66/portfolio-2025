"use client";

interface ScrollIndicatorProps {
  text: string;
}

export const ScrollIndicator = ({ text }: ScrollIndicatorProps) => {
  const scrollToNextSection = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight,
      behavior: "smooth",
    });
  };

  return (
    <div onClick={scrollToNextSection} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce cursor-pointer hover:text-gray-700 transition-colors">
      <span className="text-sm text-gray-500 hover:text-gray-700 transition-colors whitespace-nowrap">{text}</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  );
};
