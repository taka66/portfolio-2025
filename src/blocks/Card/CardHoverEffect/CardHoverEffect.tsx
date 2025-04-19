"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState, useEffect } from "react";

export const HoverEffect = ({
  items,
  className,
  isSquare = false,
  isDesignMode = false,
}: {
  items: {
    title: string;
    description: string;
    link?: string;
    image?: string;
  }[];
  className?: string;
  isSquare?: boolean;
  isDesignMode?: boolean;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 初期チェック
    checkIfMobile();

    // リサイズ時にチェック
    window.addEventListener("resize", checkIfMobile);

    // クリーンアップ
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

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
          <CardWrapper key={idx} {...wrapperProps} className={cn("relative group block p-2 h-full w-full", isSquare && "aspect-square")} onMouseEnter={() => setHoveredIndex(idx)} onMouseLeave={() => setHoveredIndex(null)}>
            <AnimatePresence>
              {hoveredIndex === idx && !isDesignMode && (
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
            <Card image={item.image} isSquare={isSquare} isHovered={hoveredIndex === idx} isDesignMode={isDesignMode} isMobile={isMobile}>
              <CardTitle className={isDesignMode && !isMobile ? "group-hover:opacity-0 transition-opacity duration-300" : ""}>{item.title}</CardTitle>
              <CardDescription className={isDesignMode && !isMobile ? "group-hover:opacity-0 transition-opacity duration-300" : ""}>{item.description}</CardDescription>
            </Card>
          </CardWrapper>
        );
      })}
    </div>
  );
};

export const Card = ({ className, children, image, isSquare = false, isHovered = false, isDesignMode = false, isMobile = false }: { className?: string; children: React.ReactNode; image?: string; isSquare?: boolean; isHovered?: boolean; isDesignMode?: boolean; isMobile?: boolean }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className={cn("rounded-2xl h-full w-full overflow-hidden bg-white dark:bg-black border border-neutral-200 dark:border-white/[0.2] group-hover:border-neutral-300 dark:group-hover:border-slate-700 relative z-20", isSquare && "aspect-square", className)}>
      {image && (
        <div className={cn("absolute inset-0 w-full h-full z-10", isSquare && "aspect-square")}>
          <div className={cn("relative w-full h-full transition-all duration-500 ease-in-out", isLoading ? "scale-110 blur-xl" : "scale-100 blur-0")}>
            <Image
              src={image}
              alt="Project image"
              fill
              className={cn("transition-all duration-300 ease-in-out", isLoading ? "opacity-0" : isDesignMode && (isHovered || isMobile) ? "opacity-100" : "opacity-[0.15] dark:opacity-20", isSquare ? "object-contain" : "object-cover")}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoad={() => setLoading(false)}
              priority
            />
          </div>
        </div>
      )}
      <div className={cn("relative z-50", isDesignMode && !isMobile && "transition-opacity duration-300", isDesignMode && !isMobile && isHovered && "opacity-0", isDesignMode && "flex flex-col h-full")}>
        {isDesignMode ? <div className={cn("p-6 mt-auto bg-gradient-to-t from-white/80 to-transparent dark:from-black/80 dark:to-transparent", isMobile ? "opacity-90" : "group-hover:opacity-0 transition-opacity duration-300")}>{children}</div> : <div className="p-6">{children}</div>}
      </div>
    </div>
  );
};

export const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <h4 className={cn("text-neutral-900 dark:text-zinc-100 font-bold tracking-wide", className)}>{children}</h4>;
};

export const CardDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <p className={cn("mt-2 text-neutral-600 dark:text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>{children}</p>;
};
