import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Label({ className, ...props }: ComponentProps<"label">) {
  return <label className={cn("text-xs font-semibold tracking-[0.16em] text-black/70 uppercase", className)} {...props} />;
}
