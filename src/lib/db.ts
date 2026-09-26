import { neon, NeonQueryFunction } from "@neondatabase/serverless";

let sql: NeonQueryFunction<false, false> | null = null;
let schemaReady = false;

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!sql) {
    sql = neon(url);
  }
  return sql;
}

export async function ensureSchema() {
  if (schemaReady) return;
  const db = getSql();
  await db`
    CREATE TABLE IF NOT EXISTS waitlist_signups (
      id            BIGSERIAL PRIMARY KEY,
      email         TEXT NOT NULL,
      use_case      TEXT,
      comment       TEXT,
      pricing_response TEXT,
      variant       TEXT NOT NULL DEFAULT 'hub',
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await db`
    CREATE INDEX IF NOT EXISTS waitlist_signups_created_at_idx
      ON waitlist_signups (created_at DESC)
  `;
  await db`
    CREATE INDEX IF NOT EXISTS waitlist_signups_variant_idx
      ON waitlist_signups (variant)
  `;
  await db`
    CREATE TABLE IF NOT EXISTS funnel_events (
      id            BIGSERIAL PRIMARY KEY,
      event_name    TEXT NOT NULL,
      variant       TEXT,
      metadata      JSONB,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await db`
    CREATE INDEX IF NOT EXISTS funnel_events_created_at_idx
      ON funnel_events (created_at DESC)
  `;
  await db`
    CREATE INDEX IF NOT EXISTS funnel_events_name_idx
      ON funnel_events (event_name)
  `;
  schemaReady = true;
}
