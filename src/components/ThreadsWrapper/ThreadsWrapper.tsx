"use client";

import dynamic from "next/dynamic";

const Threads = dynamic(() => import("@/blocks/Backgrounds/Threads/Threads"), {
  ssr: false,
});

interface ThreadsWrapperProps {
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
}

export default function ThreadsWrapper(props: ThreadsWrapperProps) {
  return <Threads {...props} />;
}
