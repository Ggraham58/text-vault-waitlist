import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, getSql } from "@/lib/db";

const ALLOWED = new Set([
  "page_view",
  "hero_cta_click",
  "video_play",
  "waitlist_submit",
  "use_case_selected",
  "pricing_response",
]);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const eventName = String(body.event_name || "");
    const variant = body.variant ? String(body.variant) : null;
    const metadata = body.metadata ?? {};

    if (!ALLOWED.has(eventName)) {
      return NextResponse.json(
        { error: "Invalid event_name" },
        { status: 400 }
      );
    }

    if (!process.env.DATABASE_URL) {
      // Allow local/dev without DB — acknowledge but do not persist
      return NextResponse.json({ ok: true, persisted: false });
    }

    await ensureSchema();
    const sql = getSql();
    await sql`
      INSERT INTO funnel_events (event_name, variant, metadata)
      VALUES (${eventName}, ${variant}, ${JSON.stringify(metadata)})
    `;

    return NextResponse.json({ ok: true, persisted: true });
  } catch (err) {
    console.error("events POST error", err);
    return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
  }
}
