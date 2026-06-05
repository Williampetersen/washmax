"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  CalendarClock,
  CheckCircle2,
  Image as ImageIcon,
  MessageCircle,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { AdminAgentsData, AdminAgentSummary, Agent, AgentBooking } from "@/lib/server/agents";
import { formatPrice } from "@/lib/shared/booking";
import { cn } from "@/lib/utils";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
const maxAvatarSizeBytes = 2 * 1024 * 1024;

type Feedback = {
  tone: "success" | "error";
  message: string;
};

const emptyStats: AdminAgentSummary["stats"] = {
  totalAssigned: 0,
  pending: 0,
  accepted: 0,
  rejected: 0,
  inProgress: 0,
  done: 0,
  cancelled: 0,
  currentMonthDone: 0,
  currentMonthCancelled: 0,
  byStatus: [],
  perMonth: [],
};

const makeAgentSummary = (agent: Agent): AdminAgentSummary => ({
  ...agent,
  services: [],
  availability: [],
  unavailableDates: [],
  stats: emptyStats,
  unreadAdminMessages: 0,
});

const mergeAgentSummary = (current: AdminAgentSummary, next: Agent) => ({
  ...current,
  ...next,
});

async function parseJson<T>(response: Response): Promise<T> {
  return (await response.json().catch(() => ({}))) as T;
}

export function AdminAgentsView({
  data,
  saved,
  error,
}: {
  data: AdminAgentsData;
  saved?: string;
  error?: string;
}) {
  const [agents, setAgents] = useState(data.agents);
  const [bookings, setBookings] = useState(data.bookings);
  const [feedback, setFeedback] = useState<Feedback | null>(
    saved === "agent"
      ? { tone: "success", message: "Agent update saved." }
      : error === "agent"
        ? { tone: "error", message: "Agent action could not be completed." }
        : null
  );

  const assignableBookings = useMemo(
    () =>
      bookings
        .filter((booking) => booking.status !== "completed" && booking.status !== "cancelled")
        .sort((left, right) =>
          `${left.appointmentDate}T${left.appointmentTime}`.localeCompare(
            `${right.appointmentDate}T${right.appointmentTime}`
          )
        ),
    [bookings]
  );

  const handleAgentCreated = (agent: Agent) => {
    setAgents((current) => [makeAgentSummary(agent), ...current]);
    setFeedback({ tone: "success", message: "Agent saved successfully." });
  };

  const handleAgentUpdated = (agent: Agent) => {
    setAgents((current) =>
      current.map((item) => (item.id === agent.id ? mergeAgentSummary(item, agent) : item))
    );
    setFeedback({ tone: "success", message: "Agent saved successfully." });
  };

  const handleAgentDeleted = (agentId: string) => {
    setAgents((current) => current.filter((item) => item.id !== agentId));
    setBookings((current) =>
      current.map((booking) =>
        booking.assignedAgentId === agentId
          ? {
              ...booking,
              assignedAgentId: "",
              assignedAgentName: "",
              assignedAgentEmail: "",
              assignedAgentAvatarUrl: "",
            }
          : booking
      )
    );
    setFeedback({ tone: "success", message: "Agent deleted successfully." });
  };

  const handleBookingAssigned = (bookingId: string, agentId: string, note: string) => {
    const targetAgent = agents.find((agent) => agent.id === agentId);
    setBookings((current) =>
      current.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              assignedAgentId: agentId,
              assignedAgentName: targetAgent?.fullName || "",
              assignedAgentEmail: targetAgent?.email || "",
              assignedAgentAvatarUrl: targetAgent?.avatarUrl || "",
              agentNote: note,
            }
          : booking
      )
    );
    setFeedback({ tone: "success", message: "Booking assigned successfully." });
  };

  return (
    <div className="space-y-5">
      {data.databaseError ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-4 text-[13px] font-medium text-red-700">
          Agents could not be loaded: {data.databaseError}
        </div>
      ) : null}

      {feedback ? (
        <div
          className={cn(
            "rounded-3xl border px-4 py-4 text-[13px] font-medium",
            feedback.tone === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-[#CDE6F6] bg-[#F6FBFF] text-[#1A506D]"
          )}
        >
          {feedback.message}
        </div>
      ) : null}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
        <CreateAgentCard
          onCreated={handleAgentCreated}
          onError={(message) => setFeedback({ tone: "error", message })}
        />
        <AgentOverviewPanel agents={agents} bookings={bookings} unread={data.notifications.filter((item) => !item.isRead).length} />
      </div>

      <section className="rounded-3xl border border-white/55 bg-white/[0.65] p-4 shadow-[0_8px_32px_rgba(99,102,241,0.08)] backdrop-blur-2xl">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6366F1]">
              Assignment
            </p>
            <h2 className="mt-1.5 text-xl font-bold text-[#1F2340]">Assign bookings to agents</h2>
          </div>
          <span className="rounded-full border border-[#DDE3F5] bg-white/60 px-3 py-1 text-[12px] font-semibold text-[#4B5563]">
            {assignableBookings.length} active bookings
          </span>
        </div>
        <div className="mt-4 grid gap-3">
          {assignableBookings.length > 0 ? (
            assignableBookings.slice(0, 18).map((booking) => (
              <AssignmentRow
                key={booking.id}
                booking={booking}
                agents={agents}
                onAssigned={handleBookingAssigned}
                onError={(message) => setFeedback({ tone: "error", message })}
              />
            ))
          ) : (
            <EmptyState text="No active bookings are ready for assignment." />
          )}
        </div>
      </section>

      <div className="grid gap-5">
        {agents.length > 0 ? (
          agents.map((agent) => (
            <AgentAdminCard
              key={agent.id}
              agent={agent}
              onUpdated={handleAgentUpdated}
              onDeleted={handleAgentDeleted}
              onError={(message) => setFeedback({ tone: "error", message })}
            />
          ))
        ) : (
          <EmptyState text="No agents yet. Create the first staff profile above." />
        )}
      </div>
    </div>
  );
}

function CreateAgentCard({
  onCreated,
  onError,
}: {
  onCreated: (agent: Agent) => void;
  onError: (message: string) => void;
}) {
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    assignedServices: "",
    workingArea: "",
    notes: "",
  });

  const submit = async () => {
    setPending(true);
    try {
      const response = await fetch("/api/admin/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          password: form.password,
          assignedServices: form.assignedServices
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          workingArea: form.workingArea,
          notes: form.notes,
          status: "active",
        }),
      });
      const payload = await parseJson<{
        success?: boolean;
        agent?: Agent;
        message?: string;
      }>(response);

      if (!response.ok || !payload.success || !payload.agent) {
        onError(payload.message || "Agent could not be created.");
        return;
      }

      onCreated(payload.agent);
      setForm({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        assignedServices: "",
        workingArea: "",
        notes: "",
      });
    } catch {
      onError("Agent could not be created.");
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="rounded-3xl border border-white/55 bg-white/[0.65] p-4 shadow-[0_8px_32px_rgba(99,102,241,0.08)] backdrop-blur-2xl">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#6366F1]">
          <UserRound className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[14px] font-semibold text-[#1F2340]">Create agent</p>
          <p className="text-[12px] font-medium text-[#8E95B5]">Separate login and scoped dashboard access.</p>
        </div>
      </div>
      <div className="mt-4 grid gap-3">
        <Field label="Full name">
          <Input value={form.fullName} onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))} />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Email">
            <Input type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
          </Field>
          <Field label="Phone">
            <Input value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
          </Field>
        </div>
        <Field label="Password">
          <Input type="password" autoComplete="new-password" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} />
        </Field>
        <Field label="Assigned services">
          <Input value={form.assignedServices} onChange={(event) => setForm((current) => ({ ...current, assignedServices: event.target.value }))} placeholder="Exterior, Interior, Polishing" />
        </Field>
        <Field label="Working area">
          <Input value={form.workingArea} onChange={(event) => setForm((current) => ({ ...current, workingArea: event.target.value }))} />
        </Field>
        <Field label="Notes">
          <Textarea value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} className="min-h-20" />
        </Field>
        <Button onClick={submit} disabled={pending} className="w-full">
          <CheckCircle2 className="h-5 w-5" />
          {pending ? "Saving..." : "Create agent"}
        </Button>
      </div>
    </section>
  );
}

function AgentOverviewPanel({
  agents,
  bookings,
  unread,
}: {
  agents: AdminAgentSummary[];
  bookings: AgentBooking[];
  unread: number;
}) {
  const totalAssigned = agents.reduce((sum, agent) => sum + agent.stats.totalAssigned, 0);
  const completed = agents.reduce((sum, agent) => sum + agent.stats.done, 0);
  const activeAgents = agents.filter((agent) => agent.status === "active").length;
  const cards = [
    { label: "Agents", value: activeAgents.toString(), detail: `${agents.length} total`, icon: UserRound },
    { label: "Assigned", value: totalAssigned.toString(), detail: "All agent tasks", icon: CalendarClock },
    { label: "Done", value: completed.toString(), detail: "Completed by agents", icon: CheckCircle2 },
    { label: "Unread", value: unread.toString(), detail: "Admin notifications", icon: MessageCircle },
  ];

  return (
    <section className="rounded-3xl border border-white/55 bg-white/[0.65] p-4 shadow-[0_8px_32px_rgba(99,102,241,0.08)] backdrop-blur-2xl">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-2xl border border-white/55 bg-white/55 px-3 py-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[12px] font-medium text-[#8E95B5]">{item.label}</p>
                  <p className="mt-1 text-2xl font-bold text-[#1F2340]">{item.value}</p>
                  <p className="text-[12px] font-medium text-[#4B5563]">{item.detail}</p>
                </div>
                <Icon className="h-5 w-5 text-[#6366F1]" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 rounded-2xl border border-white/55 bg-white/50 p-3">
        <div className="mb-3 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-[#6366F1]" />
          <p className="text-[14px] font-semibold text-[#1F2340]">Agent workload</p>
        </div>
        <div className="grid gap-2">
          {agents.slice(0, 8).map((agent) => (
            <div key={agent.id} className="grid gap-1">
              <div className="flex justify-between gap-3 text-[12px] font-semibold text-[#4B5563]">
                <span>{agent.fullName}</span>
                <span>{agent.stats.totalAssigned}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#E7EAF6]">
                <div
                  className="h-full rounded-full bg-[#6366F1]"
                  style={{ width: `${Math.min(100, agent.stats.totalAssigned * 12)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AssignmentRow({
  booking,
  agents,
  onAssigned,
  onError,
}: {
  booking: AgentBooking;
  agents: AdminAgentSummary[];
  onAssigned: (bookingId: string, agentId: string, note: string) => void;
  onError: (message: string) => void;
}) {
  const [agentId, setAgentId] = useState(booking.assignedAgentId);
  const [note, setNote] = useState(booking.agentNote);
  const [pending, setPending] = useState(false);
  const activeAgents = agents.filter((agent) => agent.status === "active");

  const submit = async () => {
    setPending(true);
    try {
      const response = await fetch(`/api/admin/bookings/${booking.id}/assign-agent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ agentId, note }),
      });
      const payload = await parseJson<{ success?: boolean; message?: string }>(response);
      if (!response.ok || !payload.success) {
        onError(payload.message || "Booking could not be assigned.");
        return;
      }

      onAssigned(booking.id, agentId, note);
    } catch {
      onError("Booking could not be assigned.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="grid gap-3 rounded-2xl border border-white/55 bg-white/55 px-3 py-3 lg:grid-cols-[minmax(0,1fr)_14rem_minmax(10rem,0.35fr)_auto] lg:items-center">
      <div className="min-w-0">
        <p className="truncate text-[13px] font-semibold text-[#1F2340]">
          {booking.customerName || booking.customerEmail} | {booking.packageLabel}
        </p>
        <p className="mt-1 truncate text-[12px] font-medium text-[#8E95B5]">
          {booking.appointmentLabel} | {formatPrice(booking.total)}
        </p>
        <p className="mt-1 text-[12px] font-semibold text-[#6366F1]">
          {booking.assignedAgentName ? `Assigned to ${booking.assignedAgentName}` : "Unassigned"}
        </p>
      </div>
      <select
        value={agentId}
        onChange={(event) => setAgentId(event.target.value)}
        className="h-10 rounded-2xl border border-[#DDE3F5] bg-white/70 px-3 text-[13px] font-medium text-[#1F2340] outline-none"
      >
        <option value="">Choose agent</option>
        {activeAgents.map((agent) => (
          <option key={agent.id} value={agent.id}>
            {agent.fullName}
          </option>
        ))}
      </select>
      <Input value={note} onChange={(event) => setNote(event.target.value)} placeholder="Assignment note" />
      <Button onClick={submit} disabled={pending || !agentId} className="h-10">
        {pending ? "Saving..." : "Assign"}
      </Button>
    </div>
  );
}

function AgentAdminCard({
  agent,
  onUpdated,
  onDeleted,
  onError,
}: {
  agent: AdminAgentSummary;
  onUpdated: (agent: Agent) => void;
  onDeleted: (agentId: string) => void;
  onError: (message: string) => void;
}) {
  const [form, setForm] = useState({
    fullName: agent.fullName,
    email: agent.email,
    phone: agent.phone,
    password: "",
    status: agent.status,
    assignedServices: agent.assignedServices.join(", "),
    workingArea: agent.workingArea,
    notes: agent.notes,
  });
  const [pending, setPending] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(agent.avatarUrl);
  const [previewUrl, setPreviewUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPending, setAvatarPending] = useState(false);
  const [localFeedback, setLocalFeedback] = useState<Feedback | null>(null);

  const displayedAvatar = previewUrl || avatarUrl;

  const saveAgent = async () => {
    setPending(true);
    setLocalFeedback(null);
    try {
      const response = await fetch(`/api/admin/agents/${agent.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          password: form.password || undefined,
          status: form.status,
          assignedServices: form.assignedServices
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          workingArea: form.workingArea,
          notes: form.notes,
        }),
      });
      const payload = await parseJson<{
        success?: boolean;
        agent?: Agent;
        message?: string;
      }>(response);
      if (!response.ok || !payload.success || !payload.agent) {
        onError(payload.message || "Agent could not be saved.");
        return;
      }

      onUpdated(payload.agent);
      setForm((current) => ({ ...current, password: "" }));
      setAvatarUrl(payload.agent.avatarUrl);
      setLocalFeedback({ tone: "success", message: payload.message || "Agent saved successfully." });
    } catch {
      onError("Agent could not be saved.");
    } finally {
      setPending(false);
    }
  };

  const deleteAgent = async () => {
    setPending(true);
    try {
      const response = await fetch(`/api/admin/agents/${agent.id}`, {
        method: "DELETE",
      });
      const payload = await parseJson<{ success?: boolean; message?: string }>(response);
      if (!response.ok || !payload.success) {
        onError(payload.message || "Agent could not be deleted.");
        return;
      }

      onDeleted(agent.id);
    } catch {
      onError("Agent could not be deleted.");
    } finally {
      setPending(false);
    }
  };

  const handleAvatarSelected = (file: File | null) => {
    if (!file) {
      setAvatarFile(null);
      setPreviewUrl("");
      return;
    }

    if (!allowedImageTypes.includes(file.type)) {
      setAvatarFile(null);
      setPreviewUrl("");
      setLocalFeedback({ tone: "error", message: "Invalid image file. Use JPG, PNG, or WebP." });
      return;
    }

    if (file.size > maxAvatarSizeBytes) {
      setAvatarFile(null);
      setPreviewUrl("");
      setLocalFeedback({ tone: "error", message: "Image is too large. Maximum size is 2MB." });
      return;
    }

    setAvatarFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setLocalFeedback(null);
  };

  const saveAvatar = async () => {
    if (!avatarFile) {
      setLocalFeedback({ tone: "error", message: "Please choose an image file first." });
      return;
    }

    setAvatarPending(true);
    try {
      const formData = new FormData();
      formData.set("avatar", avatarFile);

      const response = await fetch(`/api/admin/agents/${agent.id}/avatar`, {
        method: "POST",
        headers: {
          "x-requested-with": "fetch",
          accept: "application/json",
        },
        body: formData,
      });
      const payload = await parseJson<{
        success?: boolean;
        avatarUrl?: string;
        agent?: Agent;
        message?: string;
      }>(response);
      if (!response.ok || !payload.success || !payload.avatarUrl || !payload.agent) {
        setPreviewUrl("");
        setAvatarFile(null);
        onError(payload.message || "Avatar could not be saved.");
        return;
      }

      setAvatarUrl(payload.avatarUrl);
      setPreviewUrl("");
      setAvatarFile(null);
      onUpdated(payload.agent);
      setLocalFeedback({ tone: "success", message: payload.message || "Avatar saved successfully." });
    } catch {
      setPreviewUrl("");
      setAvatarFile(null);
      onError("Avatar could not be saved.");
    } finally {
      setAvatarPending(false);
    }
  };

  return (
    <article className="rounded-3xl border border-white/55 bg-white/[0.65] p-4 shadow-[0_8px_32px_rgba(99,102,241,0.08)] backdrop-blur-2xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 gap-3">
          <AgentAvatar name={agent.fullName} email={agent.email} avatarUrl={displayedAvatar} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-xl font-bold text-[#1F2340]">{form.fullName}</h3>
              <StatusPill status={form.status} />
            </div>
            <p className="mt-1 truncate text-[13px] font-medium text-[#8E95B5]">
              {form.email} | {form.phone || "No phone"}
            </p>
            <p className="mt-1 text-[13px] font-medium text-[#4B5563]">
              {form.workingArea || "No working area"} | Last login: {agent.lastLoginAt || "-"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center sm:min-w-[18rem]">
          <SmallStat label="Assigned" value={agent.stats.totalAssigned.toString()} />
          <SmallStat label="Accepted" value={agent.stats.accepted.toString()} />
          <SmallStat label="Done" value={agent.stats.done.toString()} />
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Full name">
              <Input value={form.fullName} onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))} />
            </Field>
            <Field label="Email">
              <Input type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
            </Field>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Phone">
              <Input value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
            </Field>
            <Field label="Status">
              <select
                value={form.status}
                onChange={(event) => setForm((current) => ({ ...current, status: event.target.value === "disabled" ? "disabled" : "active" }))}
                className="h-10 rounded-2xl border border-[#DDE3F5] bg-white/70 px-3 text-[13px] font-medium text-[#1F2340] outline-none"
              >
                <option value="active">Active</option>
                <option value="disabled">Disabled</option>
              </select>
            </Field>
          </div>
          <Field label="New password">
            <Input type="password" autoComplete="new-password" placeholder="Leave blank to keep current" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} />
          </Field>
          <Field label="Assigned services">
            <Input value={form.assignedServices} onChange={(event) => setForm((current) => ({ ...current, assignedServices: event.target.value }))} />
          </Field>
          <Field label="Working area">
            <Input value={form.workingArea} onChange={(event) => setForm((current) => ({ ...current, workingArea: event.target.value }))} />
          </Field>
          <Field label="Notes">
            <Textarea value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} className="min-h-20" />
          </Field>
          <div className="flex flex-wrap gap-2">
            <Button onClick={saveAgent} disabled={pending}>{pending ? "Saving..." : "Save agent"}</Button>
            <Button
              onClick={deleteAgent}
              disabled={pending}
              variant="outline"
              className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-700"
            >
              Delete
            </Button>
          </div>
          {localFeedback ? (
            <p className={cn("text-xs font-medium", localFeedback.tone === "error" ? "text-red-700" : "text-[#08745a]")}>
              {localFeedback.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-3">
          <div className="rounded-2xl border border-white/55 bg-white/50 p-3">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-[#6366F1]" />
              <p className="text-[13px] font-semibold text-[#1F2340]">Avatar upload</p>
            </div>
            <Input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="mt-3"
              onChange={(event) => handleAvatarSelected(event.target.files?.[0] || null)}
            />
            <Button onClick={saveAvatar} disabled={avatarPending || !avatarFile} variant="outline" className="mt-3 w-full">
              {avatarPending ? "Saving avatar..." : "Save avatar"}
            </Button>
          </div>

          <div className="rounded-2xl border border-white/55 bg-white/50 p-3">
            <p className="text-[13px] font-semibold text-[#1F2340]">Services</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {agent.services.length > 0 ? (
                agent.services.map((service) => (
                  <span
                    key={service.id}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[12px] font-semibold",
                      service.isEnabled
                        ? "border-[#10B981]/20 bg-[#10B981]/10 text-[#047857]"
                        : "border-[#DDE3F5] bg-white/60 text-[#8E95B5]"
                    )}
                  >
                    {service.serviceName}
                  </span>
                ))
              ) : (
                <span className="text-[12px] font-medium text-[#8E95B5]">No services yet.</span>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/55 bg-white/50 p-3">
            <p className="text-[13px] font-semibold text-[#1F2340]">Availability</p>
            <div className="mt-2 grid gap-1.5">
              {agent.availability.length > 0 ? (
                agent.availability.map((item) => (
                  <div key={item.id} className="flex justify-between gap-3 text-[12px] font-medium text-[#4B5563]">
                    <span>{weekdays[item.weekday] || `Day ${item.weekday}`}</span>
                    <span>{item.isAvailable ? `${item.startTime} - ${item.endTime}` : "Not available"}</span>
                  </div>
                ))
              ) : (
                <span className="text-[12px] font-medium text-[#8E95B5]">Agent has not set availability.</span>
              )}
            </div>
          </div>

          <form action={`/api/admin/agents/${agent.id}/chat`} method="POST" className="rounded-2xl border border-white/55 bg-white/50 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[13px] font-semibold text-[#1F2340]">Chat with admin</p>
              <span className="rounded-full bg-[#F59E0B]/10 px-2.5 py-1 text-[12px] font-semibold text-[#92400E]">
                {agent.unreadAdminMessages} unread
              </span>
            </div>
            <Textarea name="message" placeholder="Send a private message to this agent" className="mt-3 min-h-20" required />
            <Button type="submit" variant="outline" className="mt-3 w-full">
              <MessageCircle className="h-5 w-5" />
              Send message
            </Button>
          </form>
        </div>
      </div>
    </article>
  );
}

function AgentAvatar({
  name,
  email,
  avatarUrl,
}: {
  name: string;
  email: string;
  avatarUrl: string;
}) {
  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt={`${name || email} avatar`}
        className="h-14 w-14 shrink-0 rounded-2xl object-cover ring-1 ring-white/70"
      />
    );
  }

  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EEF0FF] text-lg font-bold text-[#6366F1]">
      {(name || email || "A").slice(0, 2).toUpperCase()}
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
      {isActive ? "Active" : "Disabled"}
    </span>
  );
}

function SmallStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/55 bg-white/55 px-2.5 py-2">
      <span className="block truncate text-[11px] font-medium text-[#8E95B5]">{label}</span>
      <strong className="mt-1 block truncate text-[13px] text-[#1F2340]">{value}</strong>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1.5 text-[13px] font-medium text-[#1F2340]">
      <span>{label}</span>
      {children}
    </label>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-[#DDE3F5] bg-white/55 px-4 py-5 text-[13px] font-medium text-[#8E95B5]">
      {text}
    </div>
  );
}
