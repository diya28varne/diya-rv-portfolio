"use client";

import { profile } from "@/lib/content";
import { FormEvent, useState, type ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [statusText, setStatusText] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    setSending(true);
    setStatus("idle");
    setStatusText("");

    try {
      // Prefer Web3Forms via our API when configured; otherwise FormSubmit from the browser
      // (FormSubmit blocks server/Node requests with Cloudflare 1010).
      const apiRes = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const apiJson = (await apiRes.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        mode?: string;
      };

      if (apiRes.ok && apiJson.ok) {
        setStatus("sent");
        setStatusText(`Sent — it will arrive at ${profile.email}.`);
        form.reset();
        return;
      }

      if (apiJson.mode !== "client" && apiRes.status !== 501) {
        throw new Error(apiJson.error || "Send failed");
      }

      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(profile.email)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _replyto: email,
          _subject: `Portfolio message from ${name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        success?: boolean | string;
        message?: string;
      };
      const ok = res.ok && (json.success === true || json.success === "true");
      if (!ok) {
        throw new Error(json.message || "Could not send right now.");
      }

      setStatus("sent");
      setStatusText(
        `Sent to ${profile.email}. If this is the first message ever, open the confirmation email from FormSubmit once.`,
      );
      form.reset();
    } catch (err) {
      setStatus("error");
      setStatusText(
        err instanceof Error
          ? `${err.message} You can also email ${profile.email} directly.`
          : `Could not send. Email ${profile.email} directly.`,
      );
    } finally {
      setSending(false);
    }
  }



  return (
    <section id="contact" className="scroll-mt-8 px-3 py-12 text-ivory sm:px-5 sm:py-16">
      <Reveal tone="section">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-ivory/80 uppercase">
            Contact
          </span>
          <h2 className="display mt-5 max-w-3xl text-[clamp(2rem,5vw,3.4rem)] leading-[1.08] tracking-[-0.03em] text-white">
            Let&apos;s connect, collaborate &amp; create.
          </h2>
        </div>
      </Reveal>

      <Reveal delay={0.1} tone="card">
        <div className="mt-10 grid gap-4 lg:grid-cols-2 lg:items-stretch">
          <form
            onSubmit={onSubmit}
            className="flex flex-col rounded-[1.4rem] border border-white/10 bg-[rgba(8,11,16,0.72)] p-6 text-left sm:p-8"
          >
            <label className="block text-sm font-medium text-white" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-3 py-3 text-ivory outline-none placeholder:text-ivory/30 focus:border-white/40"
              placeholder="Your name"
            />

            <label className="mt-4 block text-sm font-medium text-white" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-3 py-3 text-ivory outline-none placeholder:text-ivory/30 focus:border-white/40"
              placeholder="you@example.com"
            />

            <label className="mt-4 block text-sm font-medium text-white" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="mt-2 w-full flex-1 resize-y rounded-xl border border-white/10 bg-black/35 px-3 py-3 text-ivory outline-none placeholder:text-ivory/30 focus:border-white/40"
              placeholder="Tell me about your project..."
            />

            <button
              type="submit"
              disabled={sending}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-[#0a0c12] transition-transform hover:scale-[1.015] disabled:opacity-50 sm:w-auto"
            >
              <SendIcon />
              {sending ? "Sending…" : "Send message"}
            </button>
            {status !== "idle" ? (
              <p
                className={`mt-3 text-sm ${status === "sent" ? "text-signal-deep" : "text-red-300"}`}
                role="status"
              >
                {statusText}
              </p>
            ) : (
              <p className="mt-3 text-xs text-ivory/40">
                Messages go to {profile.email}.
              </p>
            )}
          </form>

          <div className="flex flex-col justify-between rounded-[1.4rem] border border-white/10 bg-[rgba(8,11,16,0.72)] p-6 text-left sm:p-8">
            <div>
              <h3 className="display text-3xl text-white sm:text-4xl">Get in touch</h3>
              <ul className="mt-8 space-y-5">
                <li className="flex items-start gap-3">
                  <MailIcon />
                  <div className="min-w-0">
                    <a
                      href={`mailto:${profile.email}`}
                      className="block break-all text-[0.98rem] text-ivory transition-colors hover:text-white"
                    >
                      {profile.email}
                    </a>
                    <button
                      type="button"
                      onClick={() => void copyEmail()}
                      className="mt-1 text-xs text-ivory/45 transition-colors hover:text-ivory/70"
                    >
                      {copied ? "Copied" : "Copy email"}
                    </button>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-ivory">
                  <PinIcon />
                  <span>{profile.location}</span>
                </li>
                <li>
                  <a
                    href={profile.phoneHref}
                    className="flex items-center gap-3 text-ivory transition-colors hover:text-white"
                  >
                    <PhoneIcon />
                    <span>{profile.phone}</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <SocialCircle href={profile.github} label="GitHub">
                <GitHubIcon />
              </SocialCircle>
              <SocialCircle href={profile.linkedin} label="LinkedIn">
                <LinkedInIcon />
              </SocialCircle>
              <SocialCircle href={profile.twitter} label="X">
                <TwitterXIcon />
              </SocialCircle>
              <SocialCircle href={profile.instagram} label="Instagram">
                <InstagramIcon />
              </SocialCircle>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08} tone="section">
        <div className="mt-20 flex flex-col items-center text-center">
          <img
            src="/me/diya.jpg?v=7"
            alt=""
            width={72}
            height={72}
            className="size-[4.5rem] rounded-2xl object-cover object-[center_18%]"
          />
          <p className="display mt-6 max-w-xl text-[clamp(1.6rem,3.5vw,2.4rem)] leading-[1.1] tracking-[-0.03em] text-white">
            Let&apos;s build something remarkable together.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-4 text-sm text-ivory/70 transition-colors hover:text-white sm:text-base"
          >
            {profile.email}
          </a>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <SocialCircle href={profile.github} label="GitHub">
              <GitHubIcon />
            </SocialCircle>
            <SocialCircle href={profile.linkedin} label="LinkedIn">
              <LinkedInIcon />
            </SocialCircle>
            <SocialCircle href={profile.twitter} label="X">
              <TwitterXIcon />
            </SocialCircle>
            <SocialCircle href={profile.instagram} label="Instagram">
              <InstagramIcon />
            </SocialCircle>
          </div>
        </div>
      </Reveal>

      <footer className="mt-14 flex flex-wrap items-center justify-center gap-3 border-t border-white/10 px-2 pt-6 text-xs text-ivory/45">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
      </footer>
    </section>
  );
}

function SocialCircle({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  const className =
    "inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-ivory/85 transition-colors hover:border-white hover:text-white";

  if (!href) {
    return (
      <span aria-label={`${label} (link coming soon)`} className={`${className} opacity-55`}>
        {children}
      </span>
    );
  }

  return (
    <a href={href} aria-label={label} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 11.5 20 4l-5.5 16-3.2-6.3L4 11.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-white">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-white">
      <path
        d="M12 21s7-5.2 7-11.2A7 7 0 1 0 5 9.8C5 15.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-white">
      <path
        d="M7.5 3.8h2.2l1.2 4.1-1.7 1.2a12.5 12.5 0 0 0 5.5 5.5l1.2-1.7 4.1 1.2v2.2A2.2 2.2 0 0 1 18 18.5 14.7 14.7 0 0 1 5.5 6a2.2 2.2 0 0 1 2-2.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 1.2a6.8 6.8 0 0 0-2.1 13.3c.3 0 .5-.1.5-.4v-1.2c-1.9.4-2.3-.8-2.3-.8-.3-.7-.7-.9-.7-.9-.6-.4 0-.4 0-.4.6.1 1 .7 1 .7.6 1 1.5.7 1.9.5.1-.4.2-.7.4-.8-1.5-.2-3.1-.8-3.1-3.3a2.6 2.6 0 0 1 .7-1.8 2.4 2.4 0 0 1 .1-1.8s.6-.2 1.8.7a6.2 6.2 0 0 1 3.3 0c1.2-.9 1.8-.7 1.8-.7a2.4 2.4 0 0 1 .1 1.8 2.6 2.6 0 0 1 .7 1.8c0 2.5-1.6 3.1-3.1 3.3.3.2.5.6.5 1.3v1.9c0 .2.2.4.5.4A6.8 6.8 0 0 0 8 1.2z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.5 9.5H3.7V20h2.8V9.5ZM5.1 4A1.65 1.65 0 1 0 5.12 7.3 1.65 1.65 0 0 0 5.1 4ZM20.3 20h-2.8v-5.6c0-1.7-.7-2.3-1.7-2.3s-1.9.8-1.9 2.4V20H11V9.5h2.7v1.4c.5-.9 1.7-1.7 3.3-1.7 2.3 0 3.3 1.4 3.3 4.2V20Z"
      />
    </svg>
  );
}

function TwitterXIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M17.5 3h2.8l-6.1 7 7.2 9.5h-5.6l-4.4-5.8L5.6 19.5H2.8l6.5-7.5L2.5 3h5.7l4 5.3L17.5 3zm-1 15.1h1.6L7.6 4.8H6L16.5 18.1z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1.05" fill="currentColor" />
    </svg>
  );
}
