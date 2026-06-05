import { revalidateTag, unstable_cache } from "next/cache";
import { getAdminDashboardData, getPortalData } from "@/lib/server/bookings";
import { getBookingSetupData } from "@/lib/server/booking-setup";
import { getAdminAgentsData, getAgentDashboardData } from "@/lib/server/agents";

export const cacheTags = {
  adminDashboard: "admin-dashboard",
  adminAgents: "admin-agents",
  bookingSetup: "booking-setup",
  agentDashboard: (agentId: string) => `agent-dashboard:${agentId}`,
  customerPortal: (token: string) => `customer-portal:${token}`,
} as const;

export const getCachedAdminDashboardData = async () =>
  unstable_cache(getAdminDashboardData, ["admin-dashboard"], {
    tags: [cacheTags.adminDashboard],
    revalidate: 30,
  })();

export const getCachedAdminAgentsData = async () =>
  unstable_cache(getAdminAgentsData, ["admin-agents"], {
    tags: [cacheTags.adminAgents],
    revalidate: 30,
  })();

export const getCachedBookingSetupData = async () =>
  unstable_cache(getBookingSetupData, ["booking-setup"], {
    tags: [cacheTags.bookingSetup],
    revalidate: 30,
  })();

export const getCachedAgentDashboardData = async (agentId: string) =>
  unstable_cache(() => getAgentDashboardData(agentId), ["agent-dashboard", agentId], {
    tags: [cacheTags.agentDashboard(agentId)],
    revalidate: 30,
  })();

export const getCachedPortalData = async (token: string) =>
  unstable_cache(() => getPortalData(token), ["customer-portal", token], {
    tags: [cacheTags.customerPortal(token)],
    revalidate: 30,
  })();

export const revalidateAdminDashboardCache = () => {
  revalidateTag(cacheTags.adminDashboard, "max");
};

export const revalidateAdminAgentsCache = () => {
  revalidateTag(cacheTags.adminAgents, "max");
};

export const revalidateBookingSetupCache = () => {
  revalidateTag(cacheTags.bookingSetup, "max");
};

export const revalidateAgentDashboardCache = (agentId: string) => {
  if (agentId) {
    revalidateTag(cacheTags.agentDashboard(agentId), "max");
  }
};

export const revalidateCustomerPortalCache = (token: string) => {
  if (token) {
    revalidateTag(cacheTags.customerPortal(token), "max");
  }
};
