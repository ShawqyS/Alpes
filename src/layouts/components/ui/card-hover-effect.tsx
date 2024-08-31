"use client"

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const backgroundImages = [
    "url('https://jifpak.kallegroup.com/fileadmin/_processed_/3/c/csm_kalle-jifpak-content-diamond-pattern_29c5e8f882.jpg')",
    "url('https://jifpak.kallegroup.com/fileadmin/_processed_/4/e/csm_kalle-jifpak-content-ripple-pattern_b09c6d4db0.jpg')",
    "url('https://jifpak.kallegroup.com/fileadmin/_processed_/5/5/csm_kalle-jifpak-content-spiral-pattern_bce2a77c17.jpg')",
    "url('https://jifpak.kallegroup.com/fileadmin/_processed_/b/3/csm_kalle-jifpak-content-rib-pattern_12986b9365.jpg')",
    "url('https://jifpak.kallegroup.com/fileadmin/_processed_/6/0/csm_kalle-jifpak-content-square-pattern_737c56e5d1.jpg')",
    "url('https://jifpak.kallegroup.com/fileadmin/_processed_/9/e/csm_kalle-jifpak-content-smoth-pattern_dc32ba20c2.jpg')",
  ];

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
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
          <Card
            className="bg-cover bg-center"
            style={{
              backgroundImage: backgroundImages[idx % backgroundImages.length],
            }}
          >
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
  style,
}: {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
      style={style}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-white tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
