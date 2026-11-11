export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY?.trim() && process.env.RESEND_FROM_EMAIL?.trim());
}

function isEmailSandboxEnabled() {
  const value = process.env.EMAIL_SANDBOX?.trim().toLowerCase();
  return value === "1" || value === "true" || value === "yes";
}

function protectedEmailAddresses() {
  const fromEnv = (process.env.EMAIL_PROTECT_ADDRESSES || "swingforceohio@gmail.com")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
  return new Set(fromEnv);
}

function sandboxRedirectAddress() {
  return (process.env.EMAIL_SANDBOX_REDIRECT || process.env.CONTACT_TO_EMAIL || "").trim().toLowerCase();
}

export function resolveOutboundEmail(to: string) {
  const original = to.trim().toLowerCase();
  if (!isEmailSandboxEnabled() || !protectedEmailAddresses().has(original)) {
    return { to: original, suppressed: false as const, redirected: false as const, original };
  }

  const redirect = sandboxRedirectAddress();
  if (redirect && redirect !== original) {
    return { to: redirect, suppressed: false as const, redirected: true as const, original };
  }

  return { to: original, suppressed: true as const, redirected: false as const, original };
}

export function formatResendFrom() {
  const raw = process.env.RESEND_FROM_EMAIL?.trim();
  if (!raw) return "Swing Force Ohio <onboarding@resend.dev>";
  if (raw.includes("<") && raw.includes(">")) return raw;
  return `Swing Force Ohio <${raw}>`;
}

export async function sendTransactionalEmail(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) {
  const resolved = resolveOutboundEmail(input.to);
  if (resolved.suppressed) {
    return { ok: false as const, skipped: true as const, reason: "sandbox" as const };
  }

  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) {
    return { ok: false as const, skipped: true as const, reason: "missing_api_key" as const };
  }

  const from = formatResendFrom();
  const subject = resolved.redirected ? `[Sandbox — was ${resolved.original}] ${input.subject}` : input.subject;
  const replyTo = input.replyTo?.trim() || process.env.RESEND_REPLY_TO?.trim();
  const payload: Record<string, unknown> = {
    from,
    to: [resolved.to],
    subject,
    html: input.html,
    text: input.text,
  };
  if (replyTo) payload.reply_to = replyTo;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${key}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("[email] Resend failed", response.status, detail);
    return { ok: false as const, skipped: false as const, reason: "resend_error" as const };
  }

  return { ok: true as const };
}
