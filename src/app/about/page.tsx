import Image from "next/image";
import Link from "next/link";
import { CoachCard } from "@/components/public/coach-card";
import { Eyebrow } from "@/components/public/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { booking } from "@/config/booking";
import { coaches, mission, theWhy } from "@/content/copy";
import { pageMetadata } from "@/lib/seo";
import { locationLine, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata(
  `About ${site.name}`,
  `${theWhy.body} Personalized baseball and softball hitting instruction in ${locationLine}.`,
  "/about",
);

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-white/10 px-5 py-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>About</Eyebrow>
          <h1 className="max-w-4xl font-display text-[2.15rem] leading-[0.92] uppercase md:text-[clamp(3rem,7vw,5.5rem)] md:leading-[0.88]">
            {theWhy.title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/75 md:mt-6 md:text-lg">{theWhy.body}</p>
        </div>
      </section>

      <section className="px-5 py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative aspect-[4/5] overflow-hidden border border-white/10 md:aspect-[4/4.6]">
            <Image
              src="/images/softball.jpg"
              alt="Softball player fielding during a game"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover object-[center_18%]"
            />
          </div>
          <div>
            <Eyebrow>Coaching philosophy</Eyebrow>
            <h2 className="font-display text-[1.85rem] leading-[0.95] uppercase md:text-4xl">
              Personalized instruction. Real skill. Real confidence.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75 md:text-base">{mission}</p>
          </div>
        </div>
      </section>

      <section id="coaches" className="scroll-mt-24 border-y border-white/10 bg-[#0c0c0c] px-5 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Our team</Eyebrow>
          <h2 className="font-display text-[1.85rem] uppercase md:text-4xl">Coach C.J. and the Swing Force team.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {coaches.map((coach, index) => (
              <CoachCard key={coach.slug} coach={coach} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>How we work</Eyebrow>
          <h2 className="font-display text-[1.85rem] uppercase md:text-4xl">A private club, by appointment.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
            {site.hoursNote} Training is in {locationLine}. {site.hoursLabel}: {site.hoursValue}. Send a lesson
            request and Swing Force will follow up.
          </p>
          <Link href={booking.inquiryHref} className={cn(buttonVariants({ size: "lg" }), "mt-6 inline-flex")}>
            {booking.inquiryLabel}
          </Link>
        </div>
      </section>
    </>
  );
}
