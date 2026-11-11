import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full border border-black/15 bg-white px-3 py-3 text-base text-black outline-none placeholder:text-black/35 focus:border-[#f70d0d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f70d0d]",
        className,
      )}
      {...props}
    />
  );
}
