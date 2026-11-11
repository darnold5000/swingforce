"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { booking } from "@/config/booking";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:h-[4.25rem] md:px-5">
        <Link href="/" className="shrink-0" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo.png"
            alt={site.name}
            width={840}
            height={620}
            priority
            className="h-11 w-auto md:h-12"
          />
        </Link>
        <nav className="hidden min-w-0 items-center gap-6 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="text-sm font-semibold tracking-[0.16em] text-white/75 uppercase hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f70d0d] aria-[current=page]:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={booking.inquiryHref}
            className={cn(buttonVariants({ size: "md" }), "h-9 shrink-0 px-3 text-xs sm:h-10 sm:px-4 sm:text-sm")}
          >
            <span className="sm:hidden">Lesson</span>
            <span className="hidden sm:inline">{booking.inquiryLabel}</span>
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center border border-white/15 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
    </header>
      {open ? (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-black px-5 py-8 md:hidden">
          <nav className="grid gap-2" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === link.href ? "page" : undefined}
                className="border-b border-white/10 py-3 font-display text-2xl uppercase aria-[current=page]:text-[#f70d0d]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href={booking.inquiryHref}
            onClick={() => setOpen(false)}
            className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full")}
          >
            {booking.inquiryLabel}
          </Link>
        </div>
      ) : null}
    </>
  );
}
