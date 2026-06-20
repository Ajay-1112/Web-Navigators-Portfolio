import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  projectDetails: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const payload = contactSchema.parse(await request.json());
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      return NextResponse.json(
        {
          error:
            "Contact form is not configured. Add WEB3FORMS_ACCESS_KEY to your environment variables.",
        },
        { status: 503 },
      );
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New Project Inquiry from ${payload.name}`,
        from_name: payload.name,
        name: payload.name,
        email: payload.email,
        message: payload.projectDetails,
      }),
    });

    const result = (await response.json()) as { success?: boolean; message?: string };

    if (!response.ok || !result.success) {
      return NextResponse.json(
        { error: result.message ?? "Failed to send your message. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }
}
