import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, getAdminSession } from "@/lib/server/admin-session";
import { AGENT_COOKIE_NAME, getAgentSession } from "@/lib/server/agent-session";
import type { InvoiceActor } from "@/lib/server/invoices";

export const getInvoiceRequestActor = async (): Promise<InvoiceActor | null> => {
  const cookieStore = await cookies();
  const admin = getAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (admin) {
    return { actorType: "admin", actorId: admin.email };
  }
  const agent = getAgentSession(cookieStore.get(AGENT_COOKIE_NAME)?.value);
  if (agent) {
    return {
      actorType: "agent",
      actorId: agent.agentId,
      agentId: agent.agentId,
    };
  }
  return null;
};
