export const ATTR_STORAGE_KEY = "sfo_attr";

export type Attribution = {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  fbclid: string;
  landingPath: string;
};

export const emptyAttribution: Attribution = {
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
  utmTerm: "",
  fbclid: "",
  landingPath: "",
};

function cleanToken(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/[^\w.\-~]/g, "").slice(0, 120);
}

function cleanPath(value: unknown) {
  if (typeof value !== "string") return "";
  const path = value.split("?")[0] ?? "";
  if (!path.startsWith("/") || path.startsWith("//") || path.length > 160) return "";
  return path;
}

export function parseAttribution(input: unknown): Attribution {
  const source = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  return {
    utmSource: cleanToken(source.utmSource ?? source.utm_source),
    utmMedium: cleanToken(source.utmMedium ?? source.utm_medium),
    utmCampaign: cleanToken(source.utmCampaign ?? source.utm_campaign),
    utmContent: cleanToken(source.utmContent ?? source.utm_content),
    utmTerm: cleanToken(source.utmTerm ?? source.utm_term),
    fbclid: cleanToken(source.fbclid),
    landingPath: cleanPath(source.landingPath),
  };
}

export function hasAttribution(attr: Attribution) {
  return Boolean(
    attr.utmSource || attr.utmMedium || attr.utmCampaign || attr.utmContent || attr.utmTerm || attr.fbclid,
  );
}

export function readStoredAttribution(): Attribution {
  if (typeof window === "undefined") return emptyAttribution;
  try {
    const raw = window.sessionStorage.getItem(ATTR_STORAGE_KEY);
    return raw ? parseAttribution(JSON.parse(raw)) : emptyAttribution;
  } catch {
    return emptyAttribution;
  }
}

export function captureAttributionFromParams(params: URLSearchParams, pathname: string) {
  const incoming = parseAttribution({
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
    utm_term: params.get("utm_term"),
    fbclid: params.get("fbclid"),
    landingPath: pathname,
  });

  if (typeof window === "undefined") return incoming;

  const existing = readStoredAttribution();
  const next: Attribution = hasAttribution(existing)
    ? { ...existing, landingPath: existing.landingPath || incoming.landingPath }
    : incoming;

  if (hasAttribution(incoming) && !hasAttribution(existing)) {
    window.sessionStorage.setItem(ATTR_STORAGE_KEY, JSON.stringify(next));
  } else if (!existing.landingPath && next.landingPath) {
    window.sessionStorage.setItem(ATTR_STORAGE_KEY, JSON.stringify(next));
  }

  return next;
}
