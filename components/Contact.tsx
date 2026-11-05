"use client";

import { profile } from "@/lib/content";
import { FormEvent, useState } from "react";
import { Link001, Link002, Link005 } from "./ui/skiper-ui/skiper40";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`Hello from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="panel scroll-mt-8 px-5 py-10 text-ivory sm:px-8">
      <div className="grid gap-10 sm:grid-cols-2 sm:items-start">
        <div>
          <p className="kicker text-ivory/60">Contact</p>
          <h2 className="display mt-3 max-w-xl text-3xl sm:text-4xl">Write to me. I will read it.</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ivory/70">
            If the role needs someone who will read the data before trusting the score, I would like the
            conversation.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3">
            <Link005 href={`mailto:${profile.email}`} className="display text-3xl italic text-ivory sm:text-4xl">
              {profile.email}
            </Link005>
            <button type="button" onClick={copyEmail} className="text-sm text-ivory/60 hover:text-ivory">
              {copied ? "Copied" : "Copy email"}
            </button>
            <Link002 href={profile.phoneHref} className="text-lg text-ivory">
              {profile.phone}
            </Link002>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link001 href={profile.github} className="text-ivory/80">
              GitHub
            </Link001>
            <Link001 href={profile.linkedin} className="text-ivory/80">
              LinkedIn
            </Link001>
            <a href={profile.resume} download className="link-underline text-ivory/80">
              Resume PDF
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl border border-white/10 bg-card/80 p-6 sm:p-8">
          <p className="text-sm text-ivory/60">
            This opens your email app with the note ready to send. Nothing is stored on a server.
          </p>
          <label className="mt-6 block text-sm" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="mt-2 w-full rounded-xl border border-white/10 bg-transparent px-3 py-3 text-ivory outline-none placeholder:text-ivory/30 focus:border-signal"
            placeholder="Your name"
          />
          <label className="mt-4 block text-sm" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-white/10 bg-transparent px-3 py-3 text-ivory outline-none placeholder:text-ivory/30 focus:border-signal"
            placeholder="you@company.com"
          />
          <label className="mt-4 block text-sm" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-transparent px-3 py-3 text-ivory outline-none placeholder:text-ivory/30 focus:border-signal"
            placeholder="Role, team, or what you would like to talk about."
          />
          <button
            type="submit"
            className="mt-5 rounded-full bg-ivory px-5 py-3 text-sm text-night transition-colors hover:bg-signal hover:text-ivory"
          >
            Compose email
          </button>
        </form>
      </div>
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-6 text-xs text-ivory/50 sm:px-8 lg:px-12">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>
          Bangalore · Information Science · MVJ College of Engineering ·{" "}
          <a href="https://skiper-ui.com" target="_blank" rel="noreferrer" className="link-underline">
            Motion by Skiper UI
          </a>
        </p>
      </footer>
    </section>
  );
}
