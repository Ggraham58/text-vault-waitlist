import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, getSql } from "@/lib/db";

export async function GET(req: NextRequest) {
  const key =
    req.headers.get("x-admin-key") ||
    req.nextUrl.searchParams.get("key") ||
    "";

  const expected = process.env.ADMIN_KEY;
  if (!expected || key !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "DATABASE_URL is not configured" },
      { status: 503 }
    );
  }

  try {
    await ensureSchema();
    const sql = getSql();
    const signups = await sql`
      SELECT id, email, use_case, comment, pricing_response, variant, created_at
      FROM waitlist_signups
      ORDER BY created_at DESC
      LIMIT 500
    `;
    const events = await sql`
      SELECT event_name, COUNT(*)::int AS count
      FROM funnel_events
      GROUP BY event_name
      ORDER BY count DESC
    `;
    return NextResponse.json({ signups, event_counts: events });
  } catch (err) {
    console.error("admin signups GET error", err);
    return NextResponse.json({ error: "Failed to load signups" }, { status: 500 });
  }
}
