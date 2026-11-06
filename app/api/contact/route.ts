import { profile } from "@/lib/content";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  message?: string;
};

/**
 * Optional server path when WEB3FORMS_ACCESS_KEY is set.
 * Default delivery is browser → FormSubmit (see Contact.tsx),
 * because FormSubmit blocks Node/server user-agents.
 */
export async function POST(req: Request) {
  const key = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (!key) {
    return NextResponse.json(
      {
        ok: false,
        error: "Use the on-page form sender.",
        mode: "client",
      },
      { status: 501 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Name, email, and message are required." }, { status: 400 });
  }

  const to = process.env.CONTACT_EMAIL?.trim() || profile.email;
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: key,
      subject: `Portfolio message from ${name}`,
      from_name: name,
      email,
      message,
      to,
    }),
  });

  const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
  if (!res.ok || !json.success) {
    return NextResponse.json(
      { ok: false, error: json.message || "Could not send right now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, to });
}
