BEGIN;

-- ============================================================
-- Auto-Assignment System Migration
-- Assumes: agents.id and bookings.id are TEXT (existing schema)
-- Note: agents.status column already exists ('active'|'disabled')
--       The ADD COLUMN IF NOT EXISTS below is a safe no-op.
-- ============================================================

-- Add cumulative assignment counter to agents
ALTER TABLE agents
  ADD COLUMN IF NOT EXISTS total_assigned INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_assigned_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS postal_code TEXT;

-- Add assignment tracking columns to bookings
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS assignment_attempts INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS pending_assignment BOOLEAN DEFAULT false;

-- Backfill total_assigned from existing booking records
UPDATE agents a
SET total_assigned = (
  SELECT COUNT(*)
  FROM bookings b
  WHERE b.assigned_agent_id = a.id
)
WHERE total_assigned = 0 OR total_assigned IS NULL;

-- ============================================================
-- agent_schedules: admin-managed working hours per agent
-- Used by autoAssignAgent to check if agent is working
-- day_of_week: 0=Sunday, 1=Monday ... 6=Saturday (JS Date.getDay())
-- ============================================================
CREATE TABLE IF NOT EXISTS agent_schedules (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TEXT NOT NULL DEFAULT '09:00',
  end_time TEXT NOT NULL DEFAULT '17:00',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(agent_id, day_of_week)
);

CREATE INDEX IF NOT EXISTS agent_schedules_agent_idx
  ON agent_schedules (agent_id, is_active);

-- ============================================================
-- assignment_log: immutable audit trail of all assignments
-- assigned_by: 'system' = autoAssignAgent, 'admin' = manual
-- ============================================================
CREATE TABLE IF NOT EXISTS assignment_log (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  agent_id TEXT REFERENCES agents(id) ON DELETE SET NULL,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  assigned_by TEXT DEFAULT 'system' CHECK (assigned_by IN ('system', 'admin')),
  reason TEXT
);

CREATE INDEX IF NOT EXISTS assignment_log_booking_idx
  ON assignment_log (booking_id, assigned_at DESC);

CREATE INDEX IF NOT EXISTS assignment_log_agent_idx
  ON assignment_log (agent_id, assigned_at DESC);

CREATE INDEX IF NOT EXISTS assignment_log_pending_idx
  ON bookings (id, pending_assignment)
  WHERE pending_assignment = true;

COMMIT;
