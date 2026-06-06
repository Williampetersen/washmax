import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import { isDatabaseConfigured } from "@/lib/server/db";
import { getCachedAgentDashboardData } from "@/lib/server/cache-tags";
import { AgentDashboard, type AgentView } from "@/components/agent/agent-dashboard";

export const metadata: Metadata = {
  title: "Agent dashboard",
  description: "Clean Wash agent dashboard.",
  alternates: {
    canonical: "/agent",
  },
};

const views: AgentView[] = [
  "overview",
  "calendar",
  "tasks",
  "availability",
  "services",
  "chat",
  "profile",
];

export default async function AgentPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const cookieStore = await cookies();
  const session = getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);
  if (!session) {
    redirect("/agent/login");
  }

  if (!isDatabaseConfigured()) {
    redirect("/agent/login?error=config");
  }

  const data = await getCachedAgentDashboardData(session.agentId);
  if (!data) {
    redirect("/agent/login?error=session");
  }

  const params = await searchParams;
  const rawView = Array.isArray(params.view) ? params.view[0] : params.view || "overview";
  const view = views.includes(rawView as AgentView) ? (rawView as AgentView) : "overview";
  const saved = Array.isArray(params.saved) ? params.saved[0] : params.saved || "";
  const error = Array.isArray(params.error) ? params.error[0] : params.error || "";

  return (
    <AgentDashboard
      data={data}
      initialView={view}
      saved={saved}
      error={error}
    />
  );
}
