"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { interestOptions, sportsOptions } from "@/content/copy";
import { readStoredAttribution } from "@/lib/attribution";
import { site } from "@/lib/site";

type FieldErrors = Record<string, string>;

export function ContactForm() {
  const [done, setDone] = useState(false);
  const [demo, setDemo] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const lock = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (done) successRef.current?.focus();
  }, [done]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    lock.current = true;
    setPending(true);
    setMessage("");
    setErrors({});
    let saved = false;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          parentName: data.get("parentName"),
          email: data.get("email"),
          phone: data.get("phone"),
          athleteAge: data.get("athleteAge"),
          sport: data.get("sport"),
          interest: data.get("interest"),
          message: data.get("message"),
          company: data.get("company"),
          ...readStoredAttribution(),
        }),
      });
      const body = (await response.json()) as {
        ok?: boolean;
        demo?: boolean;
        message?: string;
        fieldErrors?: FieldErrors;
      };
      if (!response.ok || !body.ok) {
        setErrors(body.fieldErrors ?? {});
        setMessage(body.message || "The request could not be sent.");
        return;
      }
      saved = true;
      setDemo(Boolean(body.demo));
      setDone(true);
    } catch {
      setMessage(`The request could not be sent. Email ${site.email} and we will help you get started.`);
    } finally {
      if (!saved) {
        lock.current = false;
        setPending(false);
      }
    }
  }

  if (done) {
    return (
      <div
        id="lesson-form"
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="scroll-mt-24 bg-[#f4f0e8] p-6 text-black outline-none sm:p-8"
      >
        <p className="text-xs font-semibold tracking-[0.22em] text-[#f70d0d] uppercase">Lesson request</p>
        <h2 className="mt-3 font-display text-4xl leading-none uppercase sm:text-5xl">Request received.</h2>
        <p className="mt-4 text-base leading-relaxed text-black/75">
          {demo
            ? "This is a working demo form. Your request was captured in this preview. Email delivery activates once Resend is configured for Swing Force."
            : `${site.name} will follow up by email to talk through training and arrange a time. Lessons are by appointment only — you do not have a confirmed date yet.`}
        </p>
        <p className="mt-3 text-sm text-black/60">
          Questions in the meantime? Email{" "}
          <a className="font-semibold underline-offset-2 hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form id="lesson-form" onSubmit={onSubmit} className="relative scroll-mt-24 bg-[#f4f0e8] p-6 text-black sm:p-8" noValidate>
      <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="text-xs font-semibold tracking-[0.22em] text-[#f70d0d] uppercase">Lesson inquiry</p>
      <h2 className="mt-3 font-display text-3xl leading-none uppercase sm:text-4xl">Request a lesson.</h2>
      <p className="mt-3 text-sm leading-relaxed text-black/70">
        A parent or guardian should submit this form. {site.name} follows up to schedule — this is not online booking.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Parent / customer name" htmlFor="parentName" error={errors.parentName}>
          <Input id="parentName" name="parentName" autoComplete="name" required maxLength={120} />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" required maxLength={160} />
        </Field>
        <Field label="Phone" htmlFor="phone" error={errors.phone}>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" required maxLength={40} />
        </Field>
        <Field label="Athlete age" htmlFor="athleteAge" error={errors.athleteAge}>
          <Input id="athleteAge" name="athleteAge" inputMode="numeric" required maxLength={20} placeholder="e.g. 12" />
        </Field>
        <Field label="Baseball or softball" htmlFor="sport" error={errors.sport}>
          <Select id="sport" name="sport" required defaultValue="">
            <option value="" disabled>
              Select sport
            </option>
            {sportsOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Training interest" htmlFor="interest" error={errors.interest}>
          <Select id="interest" name="interest" required defaultValue="">
            <option value="" disabled>
              Select interest
            </option>
            {interestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Message" htmlFor="message" error={errors.message} className="sm:col-span-2">
          <Textarea id="message" name="message" maxLength={4000} placeholder="Tell us about your athlete." />
        </Field>
      </div>
      {message ? <p className="mt-4 text-sm text-[#9f1239]">{message}</p> : null}
      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={pending}>
        {pending ? "Sending…" : "Send lesson request"}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor}>{label}</Label>
      <div className="mt-1.5">{children}</div>
      {error ? <p className="mt-1 text-xs text-[#9f1239]">{error}</p> : null}
    </div>
  );
}
