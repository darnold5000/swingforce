import { NextResponse } from "next/server";
import { z } from "zod";
import { interestOptions, sportsOptions } from "@/content/copy";
import { parseAttribution } from "@/lib/attribution";
import { isEmailConfigured, sendTransactionalEmail } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";

const schema = z.object({
  parentName: z.string().trim().min(1, "Enter a name.").max(120),
  email: z.string().trim().email("Enter a valid email.").max(160),
  phone: z.string().trim().min(7, "Enter a phone number.").max(40),
  athleteAge: z.string().trim().min(1, "Enter athlete age.").max(20),
  sport: z.enum(["baseball", "softball", "both"], { message: "Select baseball or softball." }),
  interest: z.enum(["mechanics", "consistency", "confidence", "performance", "general"], {
    message: "Select a training interest.",
  }),
  message: z.string().trim().max(4000).optional().default(""),
  company: z.string().optional(),
});

function sportLabel(value: string) {
  return sportsOptions.find((option) => option.value === value)?.label ?? value;
}

function interestLabel(value: string) {
  return interestOptions.find((option) => option.value === value)?.label ?? value;
}

export async function POST(request: Request) {
  if (!rateLimit(`contact:${clientIp(request)}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json({ ok: false, message: "Please wait a few minutes and try again." }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, message: "Please complete all required fields." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, message: "Please complete all required fields.", fieldErrors },
      { status: 400 },
    );
  }

  if (parsed.data.company?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const attr = parseAttribution(body);
  const to = process.env.CONTACT_TO_EMAIL?.trim() || site.email;
  const subject = `Lesson request: ${parsed.data.parentName} (${sportLabel(parsed.data.sport)})`;
  const lines = [
    `Name: ${parsed.data.parentName}`,
    `Email: ${parsed.data.email}`,
    `Phone: ${parsed.data.phone}`,
    `Athlete age: ${parsed.data.athleteAge}`,
    `Sport: ${sportLabel(parsed.data.sport)}`,
    `Training interest: ${interestLabel(parsed.data.interest)}`,
    "",
    parsed.data.message ? `Message:\n${parsed.data.message}` : "Message: (none provided)",
  ];

  if (attr.utmSource || attr.utmCampaign || attr.fbclid) {
    lines.push(
      "",
      "Attribution:",
      `utm_source=${attr.utmSource}`,
      `utm_medium=${attr.utmMedium}`,
      `utm_campaign=${attr.utmCampaign}`,
      `utm_content=${attr.utmContent}`,
      `utm_term=${attr.utmTerm}`,
      `fbclid=${attr.fbclid}`,
      `landing=${attr.landingPath}`,
    );
  }

  const text = lines.join("\n");
  const html = `<pre style="font:14px/1.5 ui-sans-serif,system-ui">${text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")}</pre>`;

  if (!isEmailConfigured()) {
    console.info("[contact] Demo capture (email not configured)", { subject, to });
    return NextResponse.json({
      ok: true,
      demo: true,
      message: "Demo mode — configure RESEND_API_KEY and RESEND_FROM_EMAIL to deliver submissions.",
    });
  }

  const sent = await sendTransactionalEmail({
    to,
    subject,
    html,
    text,
    replyTo: parsed.data.email,
  });

  if (!sent.ok) {
    if (sent.skipped) {
      return NextResponse.json({
        ok: true,
        demo: true,
        message: "Demo mode — this request was not emailed to the public inbox.",
      });
    }
    return NextResponse.json(
      { ok: false, message: `Could not send your request right now. Please email ${site.email}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
