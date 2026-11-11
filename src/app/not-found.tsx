import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <p className="text-xs font-semibold tracking-[0.22em] text-[#f70d0d] uppercase">404</p>
      <h1 className="mt-3 font-display text-5xl uppercase md:text-7xl">Page not found.</h1>
      <p className="mt-4 max-w-md text-white/70">That page is not on the Swing Force Ohio site.</p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8 inline-flex")}>
        Back to home
      </Link>
    </section>
  );
}
