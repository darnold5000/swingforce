import { ContactForm } from "@/components/public/contact-form";
import { Eyebrow } from "@/components/public/eyebrow";
import { pageMetadata } from "@/lib/seo";
import { locationLine, site } from "@/lib/site";

export const metadata = pageMetadata(
  `Request a Hitting Lesson in ${locationLine}`,
  `Request a baseball or softball hitting lesson with ${site.name}. Appointment only. Email ${site.email}.`,
  "/contact",
);

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-white/10 px-5 py-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="max-w-4xl font-display text-[2.15rem] leading-[0.92] uppercase md:text-[clamp(3rem,7vw,5.5rem)] md:leading-[0.88]">
            Request a lesson.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 md:mt-6 md:text-lg">
            Swing Force Ohio is a private club in {locationLine}. Training is {site.hoursValue.toLowerCase()}. Send a request
            and we will follow up — this is not online booking.
          </p>
        </div>
      </section>

      <section className="px-5 py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div>
            <h2 className="font-display text-3xl uppercase md:text-4xl">Reach Swing Force</h2>
            <dl className="mt-6 grid gap-5 text-sm">
              <div>
                <dt className="text-[11px] tracking-[0.18em] text-white/45 uppercase">Email</dt>
                <dd className="mt-1 text-lg">
                  <a className="hover:text-white" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.18em] text-white/45 uppercase">Location</dt>
                <dd className="mt-1 text-white/80">{locationLine}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.18em] text-white/45 uppercase">{site.hoursLabel}</dt>
                <dd className="mt-1 text-white/80">{site.hoursValue}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.18em] text-white/45 uppercase">Access</dt>
                <dd className="mt-1 text-white/80">{site.hoursNote}</dd>
              </div>
            </dl>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
