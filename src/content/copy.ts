export const mission =
  "Our mission is to provide personalized performance instruction that emphasizes proven baseball and softball hitting fundamentals, while leveraging advanced technology and data-driven analysis to accelerate performance. We focus on athletic skill development, confidence, and mental toughness, helping athletes of all levels refine their technique and deepen their understanding of the game. By tracking progress with cutting-edge tools, we ensure each player receives high-impact coaching that helps them reach their full potential, both on and off the field.";

export const theWhy = {
  title: "The Why",
  body: "Life is challenging and unforgiving, so is parenting. Swing Force Ohio believes that sports are more than just games; they are powerful tools for personal growth. Our real mission is to build young athletes, helping them develop not only their athletic skills but also the life lessons that come with teamwork, perseverance, and hard work.",
};

export const benefits = [
  {
    title: "Mechanics",
    copy: "Proven baseball and softball hitting fundamentals, taught one athlete at a time so the swing makes sense — not just the result.",
  },
  {
    title: "Consistency",
    copy: "Progress is tracked with data-driven tools so each session builds on the last, and technique holds up when it counts.",
  },
  {
    title: "Confidence",
    copy: "High-impact coaching that develops mental toughness alongside the swing, so athletes trust their work in the box.",
  },
  {
    title: "Performance",
    copy: "Athletic skill development aimed at each player's full potential — on the field, and in how they compete.",
  },
] as const;

export const sports = [
  {
    title: "Baseball hitting",
    copy: "Personalized instruction grounded in proven baseball hitting fundamentals, with technology and analysis that help each hitter refine technique.",
  },
  {
    title: "Softball hitting",
    copy: "The same high-impact approach for softball — mechanics, confidence, and a deeper understanding of the game, built around the athlete in front of us.",
  },
] as const;

export const coaches = [
  {
    slug: "cj",
    name: "Coach C.J.",
    role: "",
    image: "/images/coach-cj.jpg",
    imageAlt: "Coach C.J. of Swing Force Ohio",
    bio: "Coach C.J. is a former two sport collegiate athlete and currently refining the art of coaching athletic performance. Coach C.J. believes in building a strong athletic foundation and refining specific skill sets along the way.",
  },
  {
    slug: "becky",
    name: "Becky",
    role: "",
    image: "/images/becky.jpg",
    imageAlt: "Becky of Swing Force Ohio",
    bio: "Becky is the driving force and the brains of the operation at Swing Force. Becky's education background and kind heart make her the perfect teammate.",
  },
  {
    slug: "alfred",
    name: "Alfred",
    role: "Director of Security & Facilities",
    image: "/images/alfred.jpg",
    imageAlt: "Alfred, director of security and facilities management at Swing Force Ohio",
    bio: "Alfred is the director of security and facilities management at Swing Force. Known to greet all guests and assess them for the character traits that align with Swing Force values.",
  },
] as const;

export const startSteps = [
  {
    step: "01",
    title: "Request a lesson",
    copy: "Tell us about your athlete. A parent or guardian should send the inquiry — we train by appointment only.",
  },
  {
    step: "02",
    title: "We follow up",
    copy: "Swing Force contacts you by email to talk through training and arrange a time. This is a private club, not a walk-in facility.",
  },
  {
    step: "03",
    title: "Train with purpose",
    copy: "Personalized hitting instruction with Coach C.J. — mechanics, confidence, and a plan that fits the athlete.",
  },
] as const;

export const sportsOptions = [
  { value: "baseball", label: "Baseball" },
  { value: "softball", label: "Softball" },
  { value: "both", label: "Both" },
] as const;

export const interestOptions = [
  { value: "mechanics", label: "Hitting mechanics" },
  { value: "consistency", label: "Consistency & timing" },
  { value: "confidence", label: "Confidence & mental approach" },
  { value: "performance", label: "Performance development" },
  { value: "general", label: "General inquiry" },
] as const;

export type SportValue = (typeof sportsOptions)[number]["value"];
export type InterestValue = (typeof interestOptions)[number]["value"];
