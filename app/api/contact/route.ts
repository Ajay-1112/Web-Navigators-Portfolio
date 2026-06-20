import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  try {
    const data = contactSchema.parse(payload);
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();

    if (!accessKey) {
      return NextResponse.json(
        {
          error:
            "Contact form is not configured. Add WEB3FORMS_ACCESS_KEY to your environment variables.",
        },
        { status: 503 },
      );
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://web-navigators-portfolio.vercel.app";

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: siteUrl,
        Origin: siteUrl,
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New Project Inquiry from ${data.name}`,
        from_name: data.name,
        name: data.name,
        email: data.email,
        message: data.projectDetails,
      }),
    });

    let result: { success?: boolean; message?: string };
    try {
      result = (await response.json()) as { success?: boolean; message?: string };
    } catch {
      return NextResponse.json(
        { error: "Email service returned an invalid response. Please try again." },
        { status: 502 },
      );
    }

    if (!response.ok || !result.success) {
      return NextResponse.json(
        { error: result.message ?? "Failed to send your message. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.issues[0]?.message ?? "Invalid form submission.";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Something went wrong while sending your message." },
      { status: 500 },
    );
  }
}
