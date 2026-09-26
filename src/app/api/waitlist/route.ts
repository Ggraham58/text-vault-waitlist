import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, getSql } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const useCase = body.use_case ? String(body.use_case) : null;
    const comment = body.comment ? String(body.comment).slice(0, 2000) : null;
    const pricing = body.pricing_response
      ? String(body.pricing_response)
      : null;
    const variant = body.variant ? String(body.variant) : "hub";

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        {
          error:
            "DATABASE_URL is not configured. Set it in Vercel env vars (see README).",
        },
        { status: 503 }
      );
    }

    await ensureSchema();
    const sql = getSql();

    const rows = await sql`
      INSERT INTO waitlist_signups
        (email, use_case, comment, pricing_response, variant)
      VALUES
        (${email}, ${useCase}, ${comment}, ${pricing}, ${variant})
      RETURNING id, created_at
    `;

    // Also log the funnel events server-side for reliability
    await sql`
      INSERT INTO funnel_events (event_name, variant, metadata)
      VALUES (
        'waitlist_submit',
        ${variant},
        ${JSON.stringify({
          use_case: useCase,
          pricing_response: pricing,
          has_comment: Boolean(comment),
        })}
      )
    `;
    if (useCase) {
      await sql`
        INSERT INTO funnel_events (event_name, variant, metadata)
        VALUES (
          'use_case_selected',
          ${variant},
          ${JSON.stringify({ use_case: useCase })}
        )
      `;
    }
    if (pricing) {
      await sql`
        INSERT INTO funnel_events (event_name, variant, metadata)
        VALUES (
          'pricing_response',
          ${variant},
          ${JSON.stringify({ pricing_response: pricing })}
        )
      `;
    }

    return NextResponse.json({
      ok: true,
      id: rows[0]?.id,
      created_at: rows[0]?.created_at,
    });
  } catch (err) {
    console.error("waitlist POST error", err);
    return NextResponse.json(
      { error: "Failed to save signup" },
      { status: 500 }
    );
  }
}
