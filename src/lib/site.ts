export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const navLinks = [
  { href: "/" as const, label: "Home" },
  { href: "/about" as const, label: "About" },
  { href: "/contact" as const, label: "Contact" },
];

export const site = {
  name: "Swing Force Ohio",
  shortName: "Swing Force",
  tagline: "Hitting is a work of art. Let Swing Force help you build, perfect, and maintain your masterpiece.",
  description:
    "Personalized baseball and softball hitting instruction in LaGrange, Ohio. Proven fundamentals, data-driven coaching, and training that builds confidence and mental toughness.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "swingforceohio@gmail.com",
  year: 2026,
  city: "LaGrange",
  state: "Ohio",
  stateAbbr: "OH",
  country: "US",
  privateClub: true,
  hoursLabel: "Monday–Sunday",
  hoursValue: "Appointment only",
  hoursNote: "Private club — not open to the public.",
  social: {
    instagram: "https://instagram.com/swingforceohio",
    facebook: "https://facebook.com/profile.php?id=61579654184529",
    youtube: "https://youtube.com/channel/UC-B1Ln8vqyA-8mVhR_IeFtQ",
  },
  signalWorks: {
    name: "Signal Works Platform",
    url: "https://hiresignalworks.com",
    title: "Professional websites, software & AI solutions.",
  },
} as const;

export const locationLine = `${site.city}, ${site.state}`;
