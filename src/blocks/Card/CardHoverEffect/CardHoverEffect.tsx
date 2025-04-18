"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link?: string;
    image?: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 py-0", className)}>
      {items.map((item, idx) => {
        const CardWrapper = item.link ? "a" : "div";
        const wrapperProps = item.link
          ? {
              href: item.link,
              target: "_blank",
              rel: "noopener noreferrer",
            }
          : {};

        return (
          <CardWrapper key={idx} {...wrapperProps} className="relative group block p-2 h-full w-full" onMouseEnter={() => setHoveredIndex(idx)} onMouseLeave={() => setHoveredIndex(null)}>
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-400/70 dark:bg-slate-800/[0.8] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card image={item.image}>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </CardWrapper>
        );
      })}
    </div>
  );
};

export const Card = ({ className, children, image }: { className?: string; children: React.ReactNode; image?: string }) => {
  return (
    <div className={cn("rounded-2xl h-full w-full overflow-hidden bg-white dark:bg-black border border-neutral-200 dark:border-white/[0.2] group-hover:border-neutral-300 dark:group-hover:border-slate-700 relative z-20", className)}>
      {image && (
        <div className="absolute inset-0 w-full h-full z-10">
          <Image src={image} alt="Project image" fill className="object-cover opacity-[0.25] dark:opacity-20" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>
      )}
      <div className="relative z-50">
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <h4 className={cn("text-neutral-900 dark:text-zinc-100 font-bold tracking-wide mt-4", className)}>{children}</h4>;
};

export const CardDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <p className={cn("mt-8 text-neutral-600 dark:text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>{children}</p>;
};
