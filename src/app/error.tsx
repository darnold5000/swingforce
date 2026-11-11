"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <p className="text-xs font-semibold tracking-[0.22em] text-[#f70d0d] uppercase">Error</p>
      <h1 className="mt-3 font-display text-5xl uppercase md:text-7xl">Something went wrong.</h1>
      <p className="mt-4 max-w-md text-white/70">Refresh and try again, or email swingforceohio@gmail.com.</p>
      <Button type="button" size="lg" className="mt-8" onClick={reset}>
        Try again
      </Button>
    </section>
  );
}
