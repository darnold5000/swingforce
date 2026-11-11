import Image from "next/image";
import { coaches } from "@/content/copy";

type Coach = (typeof coaches)[number];

export function CoachCard({ coach, featured = false }: { coach: Coach; featured?: boolean }) {
  return (
    <article className="group overflow-hidden border border-white/10 bg-[#0c0c0c]">
      <div className={`relative overflow-hidden ${featured ? "aspect-[4/5] sm:aspect-[5/6]" : "aspect-[4/5]"}`}>
        <Image
          src={coach.image}
          alt={coach.imageAlt}
          fill
          sizes={featured ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 768px) 30vw, 100vw"}
          className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </div>
      <div className="border-t-2 border-[#f70d0d] p-4 md:p-5">
        {coach.role ? (
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#f70d0d] uppercase">{coach.role}</p>
        ) : null}
        <h3 className={`font-display text-2xl uppercase md:text-3xl ${coach.role ? "mt-1" : ""}`}>{coach.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{coach.bio}</p>
      </div>
    </article>
  );
}
