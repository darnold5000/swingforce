import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition disabled:pointer-events-none disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f70d0d]",
  {
    variants: {
      variant: {
        primary: "bg-[#f70d0d] text-white hover:bg-[#ff2a2a]",
        secondary: "border border-white/30 bg-transparent text-white hover:border-white hover:bg-white/5",
        ink: "bg-black text-white hover:bg-zinc-900",
        bone: "bg-[#f4f0e8] text-black hover:bg-white",
        ghost: "bg-transparent text-white hover:bg-white/10",
      },
      size: {
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
