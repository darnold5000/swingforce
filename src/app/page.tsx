import Image from "next/image";
import Link from "next/link";
import { Brain, Crosshair, Target, Trophy } from "lucide-react";
import { CoachCard } from "@/components/public/coach-card";
import { Eyebrow } from "@/components/public/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { booking } from "@/config/booking";
import { benefits, coaches, mission, sports, startSteps } from "@/content/copy";
import { pageMetadata } from "@/lib/seo";
import { locationLine, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const benefitIcons = [Crosshair, Target, Brain, Trophy];

export const metadata = pageMetadata(
  `Baseball & Softball Hitting Instruction in ${locationLine} | ${site.name}`,
  site.description,
  "/",
  true,
);

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-black">
        <div className="relative min-h-[min(88svh,44rem)]">
          <Image
            src="/images/hero.jpg"
            alt="Swing Force Ohio — baseball and softball hitting instruction"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20 md:via-black/40 md:to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto flex min-h-[min(88svh,44rem)] max-w-6xl items-end px-5 pb-10 pt-24 md:pb-16">
            <div className="max-w-2xl">
              <p className="rise text-[11px] font-semibold tracking-[0.22em] text-white/80 uppercase md:text-xs">
                {locationLine} · Private hitting club
              </p>
              <h1 className="rise delay-1 mt-3 font-display text-[2.35rem] leading-[0.9] uppercase md:text-[clamp(3.2rem,6vw,5.4rem)] md:leading-[0.88]">
                Hitting is a work of art.
              </h1>
              <p className="rise delay-2 mt-4 max-w-xl text-sm leading-relaxed text-white/80 md:text-lg">
                Let Swing Force help you build, perfect, and maintain your masterpiece — personalized baseball and softball
                hitting instruction.
              </p>
              <div className="rise delay-3 mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href={booking.inquiryHref} className={cn(buttonVariants({ size: "lg" }))}>
                  {booking.inquiryLabel}
                </Link>
                <Link href="/about#coaches" className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
                  Meet Our Coaches
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <Eyebrow>Training philosophy</Eyebrow>
            <h2 className="font-display text-[1.85rem] leading-[0.95] uppercase md:text-4xl">Personalized. Proven. Data-driven.</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75 md:text-base">{mission}</p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden border border-white/10 md:aspect-[4/4.4]">
            <Image
              src="/images/softball.jpg"
              alt="Softball player fielding during a game"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover object-[center_20%]"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0c0c0c] px-5 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>What athletes build</Eyebrow>
          <h2 className="font-display text-[1.85rem] uppercase md:text-4xl">The work behind the swing.</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefitIcons[index];
              return (
                <li key={benefit.title} className="border border-white/10 bg-black p-4 md:p-5">
                  <Icon className="size-5 text-[#f70d0d]" aria-hidden />
                  <h3 className="mt-3 font-display text-2xl uppercase">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{benefit.copy}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="px-5 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Training</Eyebrow>
          <h2 className="font-display text-[1.85rem] uppercase md:text-4xl">Baseball and softball.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            Same standard for both sports: personalized hitting instruction, proven fundamentals, and coaching that tracks
            progress.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {sports.map((sport) => (
              <article key={sport.title} className="border border-white/10 border-t-[#f70d0d] border-t-2 bg-[#0c0c0c] p-5 md:p-6">
                <h3 className="font-display text-2xl uppercase md:text-3xl">{sport.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{sport.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 px-5 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>The team</Eyebrow>
              <h2 className="font-display text-[1.85rem] uppercase md:text-4xl">Meet the coaches.</h2>
            </div>
            <Link href="/about#coaches" className="text-sm font-semibold tracking-[0.14em] text-[#f70d0d] uppercase hover:text-[#ff2a2a]">
              Full team
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {coaches.map((coach, index) => (
              <CoachCard key={coach.slug} coach={coach} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Get started</Eyebrow>
          <h2 className="font-display text-[1.85rem] uppercase md:text-4xl">How a lesson starts.</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {startSteps.map((item) => (
              <li key={item.step} className="border border-white/10 p-5">
                <span className="font-display text-2xl text-[#f70d0d]">{item.step}</span>
                <h3 className="mt-2 font-display text-2xl uppercase">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/55" />
        <div className="relative mx-auto max-w-6xl px-5 py-12 md:py-16">
          <Eyebrow>Appointment only</Eyebrow>
          <h2 className="max-w-3xl font-display text-[1.85rem] leading-[0.95] uppercase md:text-5xl">
            Ready for your athlete to train with Swing Force?
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
            {site.hoursNote} {site.hoursLabel}: {site.hoursValue}. Send a lesson request and we will follow up.
          </p>
          <Link href={booking.inquiryHref} className={cn(buttonVariants({ size: "lg" }), "mt-6 inline-flex")}>
            {booking.inquiryLabel}
          </Link>
        </div>
      </section>
    </>
  );
}
