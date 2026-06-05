import {
  BarChart3,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Image as ImageIcon,
  MessageCircle,
  UserRound,
  XCircle,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { AdminAgentsData, AdminAgentSummary, AgentBooking } from "@/lib/server/agents";
import { formatPrice } from "@/lib/shared/booking";
import { cn } from "@/lib/utils";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function AdminAgentsView({
  data,
  saved,
  error,
}: {
  data: AdminAgentsData;
  saved?: string;
  error?: string;
}) {
  const assignableBookings = data.bookings
    .filter((booking) => booking.status !== "completed" && booking.status !== "cancelled")
    .sort((left, right) =>
      `${left.appointmentDate}T${left.appointmentTime}`.localeCompare(
        `${right.appointmentDate}T${right.appointmentTime}`
      )
    );

  return (
    <div className="space-y-5">
      {data.databaseError ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-4 text-[13px] font-medium text-red-700">
          Agents kunne ikke indlaeses: {data.databaseError}
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
          {error === "agent" ? "Agent-handlingen kunne ikke gennemfoeres." : "Agent-opdateringen er gemt."}
        </div>
      ) : null}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
        <CreateAgentCard />
        <AgentOverviewPanel data={data} />
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
              <AssignmentRow key={booking.id} booking={booking} agents={data.agents} />
            ))
          ) : (
            <EmptyState text="No active bookings are ready for assignment." />
          )}
        </div>
      </section>

      <div className="grid gap-5">
        {data.agents.length > 0 ? (
          data.agents.map((agent) => <AgentAdminCard key={agent.id} agent={agent} />)
        ) : (
          <EmptyState text="No agents yet. Create the first staff profile above." />
        )}
      </div>
    </div>
  );
}

function CreateAgentCard() {
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
      <form action="/api/admin/agents" method="POST" className="mt-4 grid gap-3">
        <input type="hidden" name="action" value="create" />
        <Field label="Full name">
          <Input name="full_name" required />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Email">
            <Input type="email" name="email" required />
          </Field>
          <Field label="Phone">
            <Input name="phone" />
          </Field>
        </div>
        <Field label="Password">
          <Input type="password" name="password" required autoComplete="new-password" />
        </Field>
        <Field label="Assigned services">
          <Input name="assigned_services" placeholder="Exterior, Interior, Polishing" />
        </Field>
        <Field label="Working area">
          <Input name="working_area" />
        </Field>
        <Field label="Notes">
          <Textarea name="notes" className="min-h-20" />
        </Field>
        <Button type="submit" className="w-full">
          <CheckCircle2 className="h-5 w-5" />
          Create agent
        </Button>
      </form>
    </section>
  );
}

function AgentOverviewPanel({ data }: { data: AdminAgentsData }) {
  const totalAssigned = data.agents.reduce((sum, agent) => sum + agent.stats.totalAssigned, 0);
  const completed = data.agents.reduce((sum, agent) => sum + agent.stats.done, 0);
  const activeAgents = data.agents.filter((agent) => agent.status === "active").length;
  const unread = data.notifications.filter((item) => !item.isRead).length;
  const cards = [
    { label: "Agents", value: activeAgents.toString(), detail: `${data.agents.length} total`, icon: UserRound },
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
          {data.agents.slice(0, 8).map((agent) => (
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
}: {
  booking: AgentBooking;
  agents: AdminAgentSummary[];
}) {
  const activeAgents = agents.filter((agent) => agent.status === "active");

  return (
    <form
      action={`/api/admin/bookings/${booking.id}/assign-agent`}
      method="POST"
      className="grid gap-3 rounded-2xl border border-white/55 bg-white/55 px-3 py-3 lg:grid-cols-[minmax(0,1fr)_14rem_minmax(10rem,0.35fr)_auto] lg:items-center"
    >
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
        name="agent_id"
        defaultValue={booking.assignedAgentId}
        className="h-10 rounded-2xl border border-[#DDE3F5] bg-white/70 px-3 text-[13px] font-medium text-[#1F2340] outline-none"
        required
      >
        <option value="">Choose agent</option>
        {activeAgents.map((agent) => (
          <option key={agent.id} value={agent.id}>
            {agent.fullName}
          </option>
        ))}
      </select>
      <Input name="note" placeholder="Assignment note" defaultValue={booking.agentNote} />
      <Button type="submit" className="h-10">
        Assign
      </Button>
    </form>
  );
}

function AgentAdminCard({ agent }: { agent: AdminAgentSummary }) {
  return (
    <article className="rounded-3xl border border-white/55 bg-white/[0.65] p-4 shadow-[0_8px_32px_rgba(99,102,241,0.08)] backdrop-blur-2xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 gap-3">
          <AgentAvatar agent={agent} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-xl font-bold text-[#1F2340]">{agent.fullName}</h3>
              <StatusPill status={agent.status} />
            </div>
            <p className="mt-1 truncate text-[13px] font-medium text-[#8E95B5]">
              {agent.email} | {agent.phone || "No phone"}
            </p>
            <p className="mt-1 text-[13px] font-medium text-[#4B5563]">
              {agent.workingArea || "No working area"} | Last login: {agent.lastLoginAt || "-"}
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
        <form action={`/api/admin/agents/${agent.id}`} method="POST" className="grid gap-3">
          <input type="hidden" name="action" value="update" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Full name">
              <Input name="full_name" defaultValue={agent.fullName} required />
            </Field>
            <Field label="Email">
              <Input type="email" name="email" defaultValue={agent.email} required />
            </Field>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Phone">
              <Input name="phone" defaultValue={agent.phone} />
            </Field>
            <Field label="Status">
              <select
                name="status"
                defaultValue={agent.status}
                className="h-10 rounded-2xl border border-[#DDE3F5] bg-white/70 px-3 text-[13px] font-medium text-[#1F2340] outline-none"
              >
                <option value="active">Active</option>
                <option value="disabled">Disabled</option>
              </select>
            </Field>
          </div>
          <Field label="New password">
            <Input type="password" name="password" autoComplete="new-password" placeholder="Leave blank to keep current" />
          </Field>
          <Field label="Assigned services">
            <Input name="assigned_services" defaultValue={agent.assignedServices.join(", ")} />
          </Field>
          <Field label="Working area">
            <Input name="working_area" defaultValue={agent.workingArea} />
          </Field>
          <Field label="Notes">
            <Textarea name="notes" defaultValue={agent.notes} className="min-h-20" />
          </Field>
          <div className="flex flex-wrap gap-2">
            <Button type="submit">Save agent</Button>
            <Button
              type="submit"
              name="action"
              value="delete"
              variant="outline"
              className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-700"
            >
              Delete
            </Button>
          </div>
        </form>

        <div className="grid gap-3">
          <form action={`/api/admin/agents/${agent.id}/avatar`} method="POST" encType="multipart/form-data" className="rounded-2xl border border-white/55 bg-white/50 p-3">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-[#6366F1]" />
              <p className="text-[13px] font-semibold text-[#1F2340]">Avatar upload</p>
            </div>
            <Input type="file" name="avatar" accept="image/png,image/jpeg,image/webp" className="mt-3" />
            <Button type="submit" variant="outline" className="mt-3 w-full">
              Upload avatar
            </Button>
          </form>

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
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EEF0FF] text-lg font-bold text-[#6366F1]">
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
  children: ReactNode;
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
