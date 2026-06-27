// Mock service layer. Swap with real backend endpoints later.
import { initialWorkflow, memoryAwareWorkflow, memories, bookings, auditLogs } from "./mock-data";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function generateWorkflow() {
  await wait(900);
  return { workflow: initialWorkflow, status: "validated" };
}

export async function storeMemory(text: string) {
  await wait(700);
  return {
    stored: [
      "Always collect patient age before confirming blood tests.",
      "Ask fasting status before test confirmation.",
      "Prefer female technician for female customers.",
    ],
    updatedWorkflow: memoryAwareWorkflow,
    raw: text,
  };
}

export async function retrieveMemory() {
  await wait(300);
  return memories;
}

export async function sendChatMessage(_msg: string) {
  await wait(400);
  return { ok: true };
}

export async function getAuditLogs() {
  await wait(250);
  return auditLogs;
}

export async function getDashboardData() {
  await wait(250);
  return {
    stats: {
      totalConversations: 24,
      activeBookings: 8,
      reportsPending: 3,
      completedToday: 12,
      costSaved: "62%",
    },
    bookings,
  };
}
