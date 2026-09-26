-- Text Vault early-access schema
-- Auto-applied on first API request if tables are missing.
-- You can also run this manually in the Neon SQL Editor.

CREATE TABLE IF NOT EXISTS waitlist_signups (
  id            BIGSERIAL PRIMARY KEY,
  email         TEXT NOT NULL,
  use_case      TEXT,
  comment       TEXT,
  pricing_response TEXT,
  variant       TEXT NOT NULL DEFAULT 'hub',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS waitlist_signups_created_at_idx
  ON waitlist_signups (created_at DESC);

CREATE INDEX IF NOT EXISTS waitlist_signups_variant_idx
  ON waitlist_signups (variant);

CREATE TABLE IF NOT EXISTS funnel_events (
  id            BIGSERIAL PRIMARY KEY,
  event_name    TEXT NOT NULL,
  variant       TEXT,
  metadata      JSONB,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS funnel_events_created_at_idx
  ON funnel_events (created_at DESC);

CREATE INDEX IF NOT EXISTS funnel_events_name_idx
  ON funnel_events (event_name);
