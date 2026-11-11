"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureAttributionFromParams } from "@/lib/attribution";

export function AttributionCapture() {
  const pathname = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    captureAttributionFromParams(params, pathname);
  }, [params, pathname]);

  return null;
}
