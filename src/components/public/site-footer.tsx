import Image from "next/image";
import Link from "next/link";
import { booking } from "@/config/booking";
import { locationLine, navLinks, site } from "@/lib/site";

export function FooterCredit() {
  return (
    <p className="flex flex-wrap items-center gap-1.5 text-xs text-white/55">
      <span>Powered by the</span>
      <Link
        href={site.signalWorks.url}
        target="_blank"
        rel="noreferrer"
        title={site.signalWorks.title}
        className="inline-flex items-center gap-1.5 font-semibold text-white/80 underline-offset-2 hover:text-white hover:underline"
      >
        <Image src="/signal-works-icon.png" alt="" width={16} height={16} className="size-4" />
        {site.signalWorks.name}
      </Link>
    </p>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-4 md:gap-10 md:py-14">
        <div>
          <Image src="/brand/logo.png" alt={site.name} width={840} height={620} className="h-12 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
            Personalized baseball and softball hitting instruction in {locationLine}.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-white/45 uppercase">Explore</p>
          <ul className="mt-4 grid gap-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link className="text-white/75 hover:text-white" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="text-white/75 hover:text-white" href={booking.inquiryHref}>
                {booking.inquiryLabel}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-white/45 uppercase">Visit</p>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            {locationLine}
            <br />
            {site.hoursNote}
          </p>
          <p className="mt-3 text-sm text-white/65">
            {site.hoursLabel}: {site.hoursValue}
          </p>
          <p className="mt-3 text-sm">
            <a className="text-white/75 hover:text-white" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-white/45 uppercase">Stay connected</p>
          <ul className="mt-4 flex gap-3">
            <li>
              <a
                href={site.social.instagram}
                className="grid size-10 place-items-center border border-white/15 text-white/80 hover:border-white hover:text-white"
                aria-label="Instagram"
              >
                <SocialMark name="instagram" />
              </a>
            </li>
            <li>
              <a
                href={site.social.facebook}
                className="grid size-10 place-items-center border border-white/15 text-white/80 hover:border-white hover:text-white"
                aria-label="Facebook"
              >
                <SocialMark name="facebook" />
              </a>
            </li>
            <li>
              <a
                href={site.social.youtube}
                className="grid size-10 place-items-center border border-white/15 text-white/80 hover:border-white hover:text-white"
                aria-label="YouTube"
              >
                <SocialMark name="youtube" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/45">
            © {site.year} {site.name}
          </p>
          <FooterCredit />
        </div>
      </div>
    </footer>
  );
}

function SocialMark({ name }: { name: "instagram" | "facebook" | "youtube" }) {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
      {name === "instagram" ? (
        <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 7.2A2.7 2.7 0 1 1 14.7 12 2.7 2.7 0 0 1 12 14.7zM17.4 6.4a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z" />
      ) : null}
      {name === "facebook" ? (
        <path d="M14.5 8.5V6.8c0-.7.5-1.3 1.3-1.3H17V3h-2.2C12.4 3 11 4.5 11 6.8v1.7H9v2.5h2V21h3.2v-10h2.2l.4-2.5z" />
      ) : null}
      {name === "youtube" ? (
        <path d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM9.8 15.6V8.8l6.2 3.4z" />
      ) : null}
    </svg>
  );
}
