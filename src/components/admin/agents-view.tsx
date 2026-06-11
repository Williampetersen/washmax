"use client";

import {
  AlertTriangle,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  Clock3,
  History,
  Image as ImageIcon,
  MessageCircle,
  RefreshCw,
  UserRound,
  XCircle,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type {
  AdminAgentsData,
  AdminAgentSummary,
  AgentBooking,
} from "@/lib/server/agents";
import { formatPrice } from "@/lib/shared/booking";
import { cn } from "@/lib/utils";

// ============================================================
// Types for client-side auto-assignment features
// ============================================================
type AgentBalanceItem = {
  agentId: string;
  agentName: string;
  avatarUrl: string;
  totalAssigned: number;
  completed: number;
  pending: number;
  fairnessPercent: number;
};

type ScheduleRow = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
};

type HistoryEntry = {
  id: string;
  bookingId: string;
  customerName: string;
  assignedAt: string;
  assignedBy: string;
  reason: string;
};

// ============================================================
// Constants
// ============================================================
const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// day_of_week 0=Sunday, ordered Mon–Sun for the schedule editor
const SCHEDULE_DAYS: { dayOfWeek: number; label: string }[] = [
  { dayOfWeek: 1, label: "Mandag" },
  { dayOfWeek: 2, label: "Tirsdag" },
  { dayOfWeek: 3, label: "Onsdag" },
  { dayOfWeek: 4, label: "Torsdag" },
  { dayOfWeek: 5, label: "Fredag" },
  { dayOfWeek: 6, label: "Lørdag" },
  { dayOfWeek: 0, label: "Søndag" },
];

const DEFAULT_SCHEDULE: ScheduleRow[] = SCHEDULE_DAYS.map((d) => ({
  dayOfWeek: d.dayOfWeek,
  startTime: "09:00",
  endTime: "17:00",
  isActive: false,
}));

// ============================================================
// Main view
// ============================================================
export function AdminAgentsView({
  data,
  saved,
  error,
}: {
  data: AdminAgentsData;
  saved?: string;
  error?: string;
}) {
  const [autoEnabled, setAutoEnabled] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("washmax_autoAssignment") !== "false";
    }
    return true;
  });
  const [balance, setBalance] = useState<AgentBalanceItem[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [assigningAll, setAssigningAll] = useState(false);
  const [allAssignResult, setAllAssignResult] = useState("");

  const fetchStats = useCallback(async () => {
    try {
      setLoadingStats(true);
      const res = await fetch("/api/admin/dashboard/stats", {
        cache: "no-store",
      });
      if (res.ok) {
        const stats = await res.json();
        setBalance(stats.agentBalance ?? []);
        setPendingCount(stats.pendingAssignment ?? 0);
        setPendingIds(stats.pendingBookingIds ?? []);
      }
    } catch {
      // silent fail — UI stays with stale/empty data
    } finally {
      setLoadingStats(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleToggle = () => {
    const next = !autoEnabled;
    setAutoEnabled(next);
    localStorage.setItem("washmax_autoAssignment", String(next));
  };

  const handleAssignAll = async () => {
    if (pendingIds.length === 0) return;
    setAssigningAll(true);
    setAllAssignResult("");

    let succeeded = 0;
    let failed = 0;
    for (const bookingId of pendingIds) {
      try {
        const res = await fetch("/api/admin/agents/assign-next", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId }),
        });
        const result = await res.json();
        if (result.success) succeeded++;
        else failed++;
      } catch {
        failed++;
      }
    }

    setAllAssignResult(
      `${succeeded} tildelt${failed > 0 ? `, ${failed} fejlede` : ""}.`
    );
    await fetchStats();
    setAssigningAll(false);
  };

  const assignableBookings = data.bookings
    .filter(
      (booking) =>
        booking.status !== "completed" && booking.status !== "cancelled"
    )
    .sort((a, b) =>
      `${a.appointmentDate}T${a.appointmentTime}`.localeCompare(
        `${b.appointmentDate}T${b.appointmentTime}`
      )
    );

  return (
    <div className="space-y-5">
      {data.databaseError ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-4 text-[13px] font-medium text-red-700">
          Agents kunne ikke indlæses: {data.databaseError}
        </div>
      ) : null}

      {saved === "agent" || error === "agent" ? (
        <div
          className={cn(
            "rounded-3xl border px-4 py-4 text-[13px] font-medium",
            error === "agent"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-[#CDE6F6] bg-[#F6FBFF] text-[#1A506D]"
          )}
        >
          {error === "agent"
            ? "Agent-handlingen kunne ikke gennemføres."
            : "Agent-opdateringen er gemt."}
        </div>
      ) : null}

      {/* ---- Section A: Auto-Assignment Control Panel ---- */}
      <AutoAssignPanel
        autoEnabled={autoEnabled}
        onToggle={handleToggle}
        pendingCount={pendingCount}
        pendingIds={pendingIds}
        balance={balance}
        loading={loadingStats}
        assigningAll={assigningAll}
        allAssignResult={allAssignResult}
        onAssignAll={handleAssignAll}
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
        <CreateAgentCard />
        <AgentOverviewPanel data={data} />
      </div>

      {/* ---- Section B: Assign Bookings (upgraded) ---- */}
      <section className="rounded-3xl border border-white/55 bg-white/[0.65] p-4 shadow-[0_8px_32px_rgba(0,167,184,0.08)] backdrop-blur-2xl">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#00A7B8]">
              Tildeling
            </p>
            <h2 className="mt-1.5 text-xl font-bold text-[#111827]">
              Tildel bookinger til agents
            </h2>
          </div>
          <span className="rounded-full border border-[#DCEEF2] bg-white/60 px-3 py-1 text-[12px] font-semibold text-[#6B7280]">
            {assignableBookings.length} aktive bookinger
          </span>
        </div>
        <div className="mt-4 grid gap-3">
          {assignableBookings.length > 0 ? (
            assignableBookings.slice(0, 18).map((booking) => (
              <AssignmentRow
                key={booking.id}
                booking={booking}
                agents={data.agents}
                autoEnabled={autoEnabled}
                onAssigned={fetchStats}
              />
            ))
          ) : (
            <EmptyState text="Ingen aktive bookinger klar til tildeling." />
          )}
        </div>
      </section>

      <div className="grid gap-5">
        {data.agents.length > 0 ? (
          data.agents.map((agent) => (
            <AgentAdminCard key={agent.id} agent={agent} />
          ))
        ) : (
          <EmptyState text="Ingen agents endnu. Opret den første profil ovenfor." />
        )}
      </div>
    </div>
  );
}

// ============================================================
// Section A — Auto-Assignment Control Panel
// ============================================================
function AutoAssignPanel({
  autoEnabled,
  onToggle,
  pendingCount,
  pendingIds,
  balance,
  loading,
  assigningAll,
  allAssignResult,
  onAssignAll,
}: {
  autoEnabled: boolean;
  onToggle: () => void;
  pendingCount: number;
  pendingIds: string[];
  balance: AgentBalanceItem[];
  loading: boolean;
  assigningAll: boolean;
  allAssignResult: string;
  onAssignAll: () => void;
}) {
  const avgAssigned =
    balance.length > 0
      ? balance.reduce((sum, a) => sum + a.totalAssigned, 0) / balance.length
      : 0;

  return (
    <section className="rounded-3xl border border-white/55 bg-white/[0.65] p-4 shadow-[0_8px_32px_rgba(0,167,184,0.08)] backdrop-blur-2xl">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EEFBFC] text-[#00A7B8]">
          <Zap className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#00A7B8]">
            Auto-tildeling
          </p>
          <h2 className="text-xl font-bold text-[#111827]">
            Automatisk tildeling
          </h2>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Left — Controls */}
        <div className="space-y-4">
          {/* Toggle row */}
          <div className="flex items-center justify-between rounded-2xl border border-white/55 bg-white/50 px-4 py-3">
            <div>
              <p className="text-[13px] font-semibold text-[#111827]">
                Auto-tildeling aktiv
              </p>
              <p className="text-[12px] font-medium text-[#6B7280]">
                Slå automatisk agent-tildeling til/fra
              </p>
            </div>
            <button
              type="button"
              onClick={onToggle}
              aria-label="Slå auto-tildeling til/fra"
              className={cn(
                "relative h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A7B8]",
                autoEnabled ? "bg-[#00A7B8]" : "bg-[#D1D5DB]"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
                  autoEnabled ? "translate-x-5" : "translate-x-0.5"
                )}
              />
            </button>
          </div>

          {/* Pending count + assign-all */}
          <div className="rounded-2xl border border-white/55 bg-white/50 px-4 py-3 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[13px] font-semibold text-[#111827]">
                Ventende bookinger
              </p>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-[12px] font-bold",
                  pendingCount > 0
                    ? "bg-[#FEF3C7] text-[#92400E]"
                    : "bg-[#D1FAE5] text-[#065F46]"
                )}
              >
                {loading ? "…" : `${pendingCount} ventende`}
              </span>
            </div>

            {allAssignResult && (
              <p className="text-[12px] font-semibold text-[#10B981]">
                {allAssignResult}
              </p>
            )}

            <Button
              type="button"
              onClick={onAssignAll}
              disabled={!autoEnabled || assigningAll || pendingIds.length === 0}
              className="w-full"
            >
              {assigningAll ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Zap className="h-4 w-4" />
              )}
              {assigningAll ? "Tildeler…" : "Tildel alle ventende"}
            </Button>
          </div>
        </div>

        {/* Right — Agent Balance */}
        <div className="rounded-2xl border border-white/55 bg-white/50 p-3">
          <div className="mb-3 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[#00A7B8]" />
            <p className="text-[14px] font-semibold text-[#111827]">
              Agent arbejdsfordeling
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-5 w-5 animate-spin text-[#00A7B8]" />
            </div>
          ) : balance.length === 0 ? (
            <p className="text-[13px] font-medium text-[#6B7280]">
              Ingen aktive agents.
            </p>
          ) : (
            <div className="space-y-3">
              {balance.map((agent) => {
                const isUnbalanced =
                  avgAssigned > 0 && agent.totalAssigned > avgAssigned * 1.2;
                return (
                  <div key={agent.agentId}>
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EEFBFC] text-[11px] font-bold text-[#00A7B8]">
                          {(agent.agentName || "A").slice(0, 2).toUpperCase()}
                        </span>
                        <span className="truncate text-[12px] font-semibold text-[#111827]">
                          {agent.agentName}
                        </span>
                        {isUnbalanced && (
                          <span
                            title="Ubalance opdaget — denne agent har væsentligt mere arbejde end gennemsnittet"
                            className="shrink-0"
                          >
                            <AlertTriangle className="h-4 w-4 text-[#F59E0B]" />
                          </span>
                        )}
                      </div>
                      <span className="shrink-0 text-[11px] font-medium text-[#6B7280]">
                        {agent.totalAssigned} tildelt / {agent.completed}{" "}
                        afsluttet
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#DCEEF2]">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          isUnbalanced ? "bg-[#F59E0B]" : "bg-[#00A7B8]"
                        )}
                        style={{
                          width: `${Math.min(100, agent.fairnessPercent)}%`,
                        }}
                      />
                    </div>
                    <p className="mt-0.5 text-right text-[11px] font-medium text-[#6B7280]">
                      {agent.fairnessPercent}% af det samlede arbejde
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Create Agent Card (unchanged)
// ============================================================
function CreateAgentCard() {
  return (
    <section className="rounded-3xl border border-white/55 bg-white/[0.65] p-4 shadow-[0_8px_32px_rgba(0,167,184,0.08)] backdrop-blur-2xl">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EEFBFC] text-[#00A7B8]">
          <UserRound className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[14px] font-semibold text-[#111827]">
            Opret agent
          </p>
          <p className="text-[12px] font-medium text-[#6B7280]">
            Separat login og afgrænset dashboard-adgang.
          </p>
        </div>
      </div>
      <form action="/api/admin/agents" method="POST" className="mt-4 grid gap-3">
        <input type="hidden" name="action" value="create" />
        <Field label="Fuldt navn">
          <Input name="full_name" required />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Email">
            <Input type="email" name="email" required />
          </Field>
          <Field label="Telefon">
            <Input name="phone" />
          </Field>
        </div>
        <Field label="Adgangskode">
          <Input
            type="password"
            name="password"
            required
            autoComplete="new-password"
          />
        </Field>
        <Field label="Tildelte services">
          <Input
            name="assigned_services"
            placeholder="Udvendig, Indvendig, Polering"
          />
        </Field>
        <Field label="Arbejdsområde">
          <Input name="working_area" />
        </Field>
        <Field label="Noter">
          <Textarea name="notes" className="min-h-20" />
        </Field>
        <Button type="submit" className="w-full">
          <CheckCircle2 className="h-5 w-5" />
          Opret agent
        </Button>
      </form>
    </section>
  );
}

// ============================================================
// Agent Overview Panel (unchanged)
// ============================================================
function AgentOverviewPanel({ data }: { data: AdminAgentsData }) {
  const totalAssigned = data.agents.reduce(
    (sum, agent) => sum + agent.stats.totalAssigned,
    0
  );
  const completed = data.agents.reduce(
    (sum, agent) => sum + agent.stats.done,
    0
  );
  const activeAgents = data.agents.filter(
    (agent) => agent.status === "active"
  ).length;
  const unread = data.notifications.filter((item) => !item.isRead).length;

  const cards = [
    {
      label: "Agents",
      value: activeAgents.toString(),
      detail: `${data.agents.length} total`,
      icon: UserRound,
    },
    {
      label: "Tildelt",
      value: totalAssigned.toString(),
      detail: "Alle agent-opgaver",
      icon: CalendarClock,
    },
    {
      label: "Færdig",
      value: completed.toString(),
      detail: "Afsluttet af agents",
      icon: CheckCircle2,
    },
    {
      label: "Ulæste",
      value: unread.toString(),
      detail: "Admin notifikationer",
      icon: MessageCircle,
    },
  ];

  return (
    <section className="rounded-3xl border border-white/55 bg-white/[0.65] p-4 shadow-[0_8px_32px_rgba(0,167,184,0.08)] backdrop-blur-2xl">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-2xl border border-white/55 bg-white/55 px-3 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[12px] font-medium text-[#6B7280]">
                    {item.label}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-[#111827]">
                    {item.value}
                  </p>
                  <p className="text-[12px] font-medium text-[#6B7280]">
                    {item.detail}
                  </p>
                </div>
                <Icon className="h-5 w-5 text-[#00A7B8]" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 rounded-2xl border border-white/55 bg-white/50 p-3">
        <div className="mb-3 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-[#00A7B8]" />
          <p className="text-[14px] font-semibold text-[#111827]">
            Agent arbejdsbyrde
          </p>
        </div>
        <div className="grid gap-2">
          {data.agents.slice(0, 8).map((agent) => (
            <div key={agent.id} className="grid gap-1">
              <div className="flex justify-between gap-3 text-[12px] font-semibold text-[#6B7280]">
                <span>{agent.fullName}</span>
                <span>{agent.stats.totalAssigned}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#DCEEF2]">
                <div
                  className="h-full rounded-full bg-[#00A7B8]"
                  style={{
                    width: `${Math.min(100, agent.stats.totalAssigned * 12)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section B — Assignment Row (upgraded with Auto button)
// ============================================================
function AssignmentRow({
  booking,
  agents,
  autoEnabled,
  onAssigned,
}: {
  booking: AgentBooking;
  agents: AdminAgentSummary[];
  autoEnabled: boolean;
  onAssigned: () => void;
}) {
  const [autoResult, setAutoResult] = useState<"success" | "error" | null>(
    null
  );
  const [autoAgentName, setAutoAgentName] = useState("");
  const [autoLoading, setAutoLoading] = useState(false);

  const handleAutoAssign = async () => {
    setAutoLoading(true);
    setAutoResult(null);
    try {
      const res = await fetch("/api/admin/agents/assign-next", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: booking.id }),
      });
      const data = await res.json();
      if (data.success) {
        setAutoResult("success");
        setAutoAgentName(data.agentName ?? "");
        onAssigned();
        setTimeout(() => setAutoResult(null), 3000);
      } else {
        setAutoResult("error");
        setTimeout(() => setAutoResult(null), 3000);
      }
    } catch {
      setAutoResult("error");
      setTimeout(() => setAutoResult(null), 3000);
    } finally {
      setAutoLoading(false);
    }
  };

  const activeAgents = agents.filter((agent) => agent.status === "active");
  const formId = `assign-form-${booking.id}`;

  return (
    <div className="grid gap-3 rounded-2xl border border-white/55 bg-white/55 px-3 py-3 lg:grid-cols-[minmax(0,1fr)_14rem_minmax(10rem,0.35fr)_auto_auto] lg:items-center">
      {/* Booking info */}
      <div className="min-w-0">
        <p className="truncate text-[13px] font-semibold text-[#111827]">
          {booking.customerName || booking.customerEmail} |{" "}
          {booking.packageLabel}
        </p>
        <p className="mt-1 truncate text-[12px] font-medium text-[#6B7280]">
          {booking.appointmentLabel} | {formatPrice(booking.total)}
        </p>
        <p className="mt-1 text-[12px] font-semibold text-[#00A7B8]">
          {booking.assignedAgentName
            ? `Tildelt til ${booking.assignedAgentName}`
            : "Ikke tildelt"}
        </p>
      </div>

      {/* Agent select — associated with hidden form via form attribute */}
      <select
        name="agent_id"
        form={formId}
        defaultValue={booking.assignedAgentId}
        className="h-10 rounded-2xl border border-[#DCEEF2] bg-white/70 px-3 text-[13px] font-medium text-[#111827] outline-none"
        required
      >
        <option value="">Vælg agent</option>
        {activeAgents.map((agent) => (
          <option key={agent.id} value={agent.id}>
            {agent.fullName}
          </option>
        ))}
      </select>

      {/* Note input */}
      <Input
        name="note"
        form={formId}
        placeholder="Note"
        defaultValue={booking.agentNote}
      />

      {/* Manual submit */}
      <Button type="submit" form={formId} className="h-10">
        Tildel
      </Button>

      {/* Auto-assign button / inline result */}
      <div className="flex min-w-[7rem] items-center justify-end">
        {autoResult === "success" ? (
          <span className="text-[12px] font-semibold text-[#10B981] transition-all duration-200">
            ✓ Tildelt til {autoAgentName}
          </span>
        ) : autoResult === "error" ? (
          <span className="text-[12px] font-semibold text-[#F59E0B]">
            ⚠ Ingen tilgængelig agent
          </span>
        ) : (
          <Button
            type="button"
            onClick={handleAutoAssign}
            disabled={!autoEnabled || autoLoading}
            variant="outline"
            className="h-8 border-[#00A7B8] px-3 text-[12px] text-[#00A7B8] hover:bg-[#EEFBFC] hover:text-[#00A7B8] transition-all duration-200"
          >
            {autoLoading ? (
              <RefreshCw className="h-3 w-3 animate-spin" />
            ) : (
              <Zap className="h-3 w-3" />
            )}
            Auto
          </Button>
        )}
      </div>

      {/* Hidden form that handles manual assignment (full page submit) */}
      <form
        id={formId}
        action={`/api/admin/bookings/${booking.id}/assign-agent`}
        method="POST"
        className="hidden"
      />
    </div>
  );
}

// ============================================================
// Agent Admin Card — with Sections C (Tidsplan) + D (Historik)
// ============================================================
type AgentTab = "tilgaengelighed" | "tidsplan" | "chat" | "historik";

function AgentAdminCard({ agent }: { agent: AdminAgentSummary }) {
  const [activeTab, setActiveTab] = useState<AgentTab>("tilgaengelighed");

  const tabs: { key: AgentTab; label: string }[] = [
    { key: "tilgaengelighed", label: "Tilgængelighed" },
    { key: "tidsplan", label: "Tidsplan" },
    { key: "chat", label: "Chat" },
    { key: "historik", label: "Historik" },
  ];

  return (
    <article className="rounded-3xl border border-white/55 bg-white/[0.65] p-4 shadow-[0_8px_32px_rgba(0,167,184,0.08)] backdrop-blur-2xl">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 gap-3">
          <AgentAvatar agent={agent} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-xl font-bold text-[#111827]">
                {agent.fullName}
              </h3>
              <StatusPill status={agent.status} />
            </div>
            <p className="mt-1 truncate text-[13px] font-medium text-[#6B7280]">
              {agent.email} | {agent.phone || "Ingen telefon"}
            </p>
            <p className="mt-1 text-[13px] font-medium text-[#6B7280]">
              {agent.workingArea || "Intet arbejdsområde"} | Sidst logget ind:{" "}
              {agent.lastLoginAt || "—"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center sm:min-w-[18rem]">
          <SmallStat label="Tildelt" value={agent.stats.totalAssigned.toString()} />
          <SmallStat label="Accepteret" value={agent.stats.accepted.toString()} />
          <SmallStat label="Færdig" value={agent.stats.done.toString()} />
        </div>
      </div>

      {/* Body: edit form (left) + right panel (right) */}
      <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Left: Edit form (unchanged) */}
        <form
          action={`/api/admin/agents/${agent.id}`}
          method="POST"
          className="grid gap-3"
        >
          <input type="hidden" name="action" value="update" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Fuldt navn">
              <Input name="full_name" defaultValue={agent.fullName} required />
            </Field>
            <Field label="Email">
              <Input
                type="email"
                name="email"
                defaultValue={agent.email}
                required
              />
            </Field>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Telefon">
              <Input name="phone" defaultValue={agent.phone} />
            </Field>
            <Field label="Status">
              <select
                name="status"
                defaultValue={agent.status}
                className="h-10 rounded-2xl border border-[#DCEEF2] bg-white/70 px-3 text-[13px] font-medium text-[#111827] outline-none"
              >
                <option value="active">Aktiv</option>
                <option value="disabled">Deaktiveret</option>
              </select>
            </Field>
          </div>
          <Field label="Ny adgangskode">
            <Input
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="Lad stå tomt for at beholde nuværende"
            />
          </Field>
          <Field label="Tildelte services">
            <Input
              name="assigned_services"
              defaultValue={agent.assignedServices.join(", ")}
            />
          </Field>
          <Field label="Arbejdsområde">
            <Input name="working_area" defaultValue={agent.workingArea} />
          </Field>
          <Field label="Noter">
            <Textarea
              name="notes"
              defaultValue={agent.notes}
              className="min-h-20"
            />
          </Field>
          <div className="flex flex-wrap gap-2">
            <Button type="submit">Gem agent</Button>
            <Button
              type="submit"
              name="action"
              value="delete"
              variant="outline"
              className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-700"
            >
              Slet
            </Button>
          </div>
        </form>

        {/* Right: Avatar + Services + Tabbed panels */}
        <div className="grid gap-3">
          {/* Avatar upload */}
          <form
            action={`/api/admin/agents/${agent.id}/avatar`}
            method="POST"
            encType="multipart/form-data"
            className="rounded-2xl border border-white/55 bg-white/50 p-3"
          >
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-[#00A7B8]" />
              <p className="text-[13px] font-semibold text-[#111827]">
                Avatar upload
              </p>
            </div>
            <Input
              type="file"
              name="avatar"
              accept="image/png,image/jpeg,image/webp"
              className="mt-3"
            />
            <Button type="submit" variant="outline" className="mt-3 w-full">
              Upload avatar
            </Button>
          </form>

          {/* Services */}
          <div className="rounded-2xl border border-white/55 bg-white/50 p-3">
            <p className="text-[13px] font-semibold text-[#111827]">
              Services
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {agent.services.length > 0 ? (
                agent.services.map((service) => (
                  <span
                    key={service.id}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[12px] font-semibold",
                      service.isEnabled
                        ? "border-[#10B981]/20 bg-[#10B981]/10 text-[#047857]"
                        : "border-[#DCEEF2] bg-white/60 text-[#6B7280]"
                    )}
                  >
                    {service.serviceName}
                  </span>
                ))
              ) : (
                <span className="text-[12px] font-medium text-[#6B7280]">
                  Ingen services endnu.
                </span>
              )}
            </div>
          </div>

          {/* Tabbed panel */}
          <div className="rounded-2xl border border-white/55 bg-white/50 overflow-hidden">
            {/* Tab header */}
            <div className="flex gap-0 border-b border-white/55 bg-white/30 px-2 pt-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "rounded-t-xl px-3 py-2 text-[12px] font-semibold transition-all duration-150",
                    activeTab === tab.key
                      ? "bg-white/80 text-[#00A7B8] shadow-sm"
                      : "text-[#6B7280] hover:text-[#111827]"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-3">
              {activeTab === "tilgaengelighed" && (
                <AvailabilityTab agent={agent} />
              )}
              {activeTab === "tidsplan" && (
                <ScheduleTab agentId={agent.id} />
              )}
              {activeTab === "chat" && <ChatTab agent={agent} />}
              {activeTab === "historik" && (
                <HistoryTab agentId={agent.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// ============================================================
// Tab: Tilgængelighed (existing content, extracted)
// ============================================================
function AvailabilityTab({ agent }: { agent: AdminAgentSummary }) {
  return (
    <div className="grid gap-1.5">
      {agent.availability.length > 0 ? (
        agent.availability.map((item) => (
          <div
            key={item.id}
            className="flex justify-between gap-3 text-[12px] font-medium text-[#6B7280]"
          >
            <span>{weekdays[item.weekday] ?? `Dag ${item.weekday}`}</span>
            <span>
              {item.isAvailable
                ? `${item.startTime} – ${item.endTime}`
                : "Ikke tilgængelig"}
            </span>
          </div>
        ))
      ) : (
        <span className="text-[12px] font-medium text-[#6B7280]">
          Agent har ikke sat tilgængelighed.
        </span>
      )}
    </div>
  );
}

// ============================================================
// Section C — Tab: Tidsplan (weekly schedule editor)
// ============================================================
function ScheduleTab({ agentId }: { agentId: string }) {
  const [schedule, setSchedule] = useState<ScheduleRow[]>(DEFAULT_SCHEDULE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetch(`/api/admin/agents/${agentId}/schedule`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data: ScheduleRow[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setSchedule(
            DEFAULT_SCHEDULE.map((row) => {
              const saved = data.find((d) => d.dayOfWeek === row.dayOfWeek);
              return saved ? { ...saved } : row;
            })
          );
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [agentId]);

  const updateRow = (dayOfWeek: number, changes: Partial<ScheduleRow>) => {
    setSchedule((prev) =>
      prev.map((row) =>
        row.dayOfWeek === dayOfWeek ? { ...row, ...changes } : row
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/agents/${agentId}/schedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schedule),
      });
      if (res.ok) {
        setToast("Tidsplan gemt");
        setTimeout(() => setToast(""), 3000);
      } else {
        setToast("Fejl ved gemning");
        setTimeout(() => setToast(""), 3000);
      }
    } catch {
      setToast("Fejl ved gemning");
      setTimeout(() => setToast(""), 3000);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-6">
        <RefreshCw className="h-5 w-5 animate-spin text-[#00A7B8]" />
      </div>
    );
  }

  return (
    <div>
      {toast && (
        <p
          className={cn(
            "mb-3 text-[12px] font-semibold",
            toast.startsWith("Fejl") ? "text-red-600" : "text-[#10B981]"
          )}
        >
          {toast}
        </p>
      )}

      <div className="space-y-1.5">
        {SCHEDULE_DAYS.map((day) => {
          const row =
            schedule.find((r) => r.dayOfWeek === day.dayOfWeek) ??
            DEFAULT_SCHEDULE[0]!;
          return (
            <div
              key={day.dayOfWeek}
              className={cn(
                "grid grid-cols-[auto_1fr] items-center gap-3 rounded-xl px-3 py-2 transition-colors duration-150",
                row.isActive ? "bg-[#EEFBFC]" : "bg-white/40"
              )}
            >
              {/* Toggle + label */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    updateRow(day.dayOfWeek, { isActive: !row.isActive })
                  }
                  className={cn(
                    "relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 focus:outline-none",
                    row.isActive ? "bg-[#00A7B8]" : "bg-[#D1D5DB]"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200",
                      row.isActive ? "translate-x-4" : "translate-x-0.5"
                    )}
                  />
                </button>
                <span className="w-16 text-[12px] font-semibold text-[#111827]">
                  {day.label}
                </span>
              </div>

              {/* Time inputs */}
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={row.startTime}
                  onChange={(e) =>
                    updateRow(day.dayOfWeek, { startTime: e.target.value })
                  }
                  disabled={!row.isActive}
                  className="h-8 rounded-xl border border-[#DCEEF2] bg-white/70 px-2 text-[12px] outline-none transition-opacity disabled:opacity-40"
                />
                <span className="text-[12px] font-medium text-[#6B7280]">–</span>
                <input
                  type="time"
                  value={row.endTime}
                  onChange={(e) =>
                    updateRow(day.dayOfWeek, { endTime: e.target.value })
                  }
                  disabled={!row.isActive}
                  className="h-8 rounded-xl border border-[#DCEEF2] bg-white/70 px-2 text-[12px] outline-none transition-opacity disabled:opacity-40"
                />
              </div>
            </div>
          );
        })}
      </div>

      <Button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="mt-3 w-full"
      >
        {saving ? (
          <RefreshCw className="h-4 w-4 animate-spin" />
        ) : (
          <CheckCircle2 className="h-4 w-4" />
        )}
        Gem tidsplan
      </Button>
    </div>
  );
}

// ============================================================
// Tab: Chat (existing content, extracted)
// ============================================================
function ChatTab({ agent }: { agent: AdminAgentSummary }) {
  return (
    <form
      action={`/api/admin/agents/${agent.id}/chat`}
      method="POST"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] font-semibold text-[#111827]">
          Chat med admin
        </p>
        <span className="rounded-full bg-[#F59E0B]/10 px-2.5 py-1 text-[12px] font-semibold text-[#92400E]">
          {agent.unreadAdminMessages} ulæste
        </span>
      </div>
      <Textarea
        name="message"
        placeholder="Send en privat besked til denne agent"
        className="mt-3 min-h-20"
        required
      />
      <Button type="submit" variant="outline" className="mt-3 w-full">
        <MessageCircle className="h-5 w-5" />
        Send besked
      </Button>
    </form>
  );
}

// ============================================================
// Section D — Tab: Historik (assignment log per agent)
// ============================================================
function HistoryTab({ agentId }: { agentId: string }) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/agents/${agentId}/history`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setHistory(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [agentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-6">
        <RefreshCw className="h-5 w-5 animate-spin text-[#00A7B8]" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <p className="text-[12px] font-medium text-[#6B7280]">
        Ingen tildelingshistorik endnu.
      </p>
    );
  }

  return (
    <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
      {history.map((entry) => (
        <div
          key={entry.id}
          className="rounded-xl border border-white/55 bg-white/50 px-3 py-2"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-[#111827]">
                {entry.customerName || `Booking …${entry.bookingId.slice(-8)}`}
              </p>
              <p className="text-[11px] font-medium text-[#6B7280]">
                ID: …{entry.bookingId.slice(-8)}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-bold",
                  entry.assignedBy === "system"
                    ? "bg-[#EEFBFC] text-[#00A7B8]"
                    : "bg-[#FEF3C7] text-[#92400E]"
                )}
              >
                {entry.assignedBy === "system" ? "System" : "Admin"}
              </span>
              <span className="text-[10px] font-medium text-[#6B7280]">
                {new Date(entry.assignedAt).toLocaleDateString("da-DK", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
          {entry.reason && (
            <p className="mt-1 truncate text-[11px] font-medium text-[#6B7280]">
              {entry.reason}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Shared small components
// ============================================================
function AgentAvatar({ agent }: { agent: AdminAgentSummary }) {
  if (agent.avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={agent.avatarUrl}
        alt=""
        className="h-14 w-14 shrink-0 rounded-2xl object-cover ring-1 ring-white/70"
      />
    );
  }
  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EEFBFC] text-lg font-bold text-[#00A7B8]">
      {(agent.fullName || agent.email || "A").slice(0, 2).toUpperCase()}
    </span>
  );
}

function StatusPill({ status }: { status: string }) {
  const isActive = status === "active";
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-1 text-[12px] font-semibold",
        isActive
          ? "border-[#10B981]/20 bg-[#10B981]/10 text-[#047857]"
          : "border-[#EF4444]/20 bg-[#EF4444]/10 text-[#B91C1C]"
      )}
    >
      {isActive ? "Aktiv" : "Deaktiveret"}
    </span>
  );
}

function SmallStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/55 bg-white/55 px-2.5 py-2">
      <span className="block truncate text-[11px] font-medium text-[#6B7280]">
        {label}
      </span>
      <strong className="mt-1 block truncate text-[13px] text-[#111827]">
        {value}
      </strong>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-1.5 text-[13px] font-medium text-[#111827]">
      <span>{label}</span>
      {children}
    </label>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-[#DCEEF2] bg-white/55 px-4 py-5 text-[13px] font-medium text-[#6B7280]">
      {text}
    </div>
  );
}
