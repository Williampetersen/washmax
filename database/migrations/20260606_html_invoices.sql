BEGIN;

ALTER TABLE invoices
  ADD COLUMN IF NOT EXISTS agent_id TEXT,
  ADD COLUMN IF NOT EXISTS created_by_role TEXT DEFAULT 'system',
  ADD COLUMN IF NOT EXISTS invoice_html TEXT,
  ADD COLUMN IF NOT EXISTS invoice_subject TEXT,
  ADD COLUMN IF NOT EXISTS invoice_notes TEXT,
  ADD COLUMN IF NOT EXISTS created_by_id TEXT,
  ADD COLUMN IF NOT EXISTS public_token TEXT,
  ADD COLUMN IF NOT EXISTS customer_email TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'DKK',
  ADD COLUMN IF NOT EXISTS subtotal_amount INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS vat_amount INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_amount INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_error TEXT;

UPDATE invoices
SET
  status = CASE WHEN status = 'generated' THEN 'ready' ELSE status END,
  invoice_html = COALESCE(invoice_html, html_snapshot),
  created_by_id = COALESCE(created_by_id, created_by_user_id),
  subtotal_amount = COALESCE(NULLIF(subtotal_amount, 0), subtotal_ex_moms_dkk, 0),
  vat_amount = COALESCE(NULLIF(vat_amount, 0), moms_amount_dkk, 0),
  total_amount = COALESCE(NULLIF(total_amount, 0), total_incl_moms_dkk, 0),
  public_token = COALESCE(
    NULLIF(public_token, ''),
    MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT || id) ||
    MD5(id || CLOCK_TIMESTAMP()::TEXT || RANDOM()::TEXT)
  );

CREATE UNIQUE INDEX IF NOT EXISTS invoices_public_token_unique_idx
ON invoices (public_token);

CREATE INDEX IF NOT EXISTS invoices_customer_created_idx
ON invoices (customer_id, created_at DESC);

COMMIT;
