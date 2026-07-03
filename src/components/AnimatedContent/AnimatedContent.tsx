"use client";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";

export function AnimatedContent() {
  return (
    <SplitText
      text="takahirofujii.dev"
      className="text-2xl font-semibold text-center"
      delay={150}
      threshold={0.2}
      rootMargin="-50px"
    />
  );
}
