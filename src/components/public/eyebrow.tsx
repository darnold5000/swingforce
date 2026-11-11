import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  light = false,
  className,
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-2 flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase md:mb-3 md:text-xs md:tracking-[0.28em]",
        light ? "text-black/70" : "text-white/80",
        className,
      )}
    >
      <span className="h-px w-8 bg-[#f70d0d]" />
      {children}
    </p>
  );
}
