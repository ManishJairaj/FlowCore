import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, Card, Badge } from "@/components/app-shell";
import { getDashboardData } from "@/lib/api";
import type { Booking } from "@/lib/mock-data";
import { MessageSquare, CalendarCheck, FileText, CheckCheck, PiggyBank } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — FlowCore" }] }),
  component: DashboardPage,
});

const statusTone: Record<Booking["status"], "info" | "brand" | "warning" | "success" | "default"> = {
  "Booking Confirmed": "info",
  "Technician Assigned": "brand",
  "Sample Collected": "warning",
  "Report Sent": "success",
  Completed: "success",
};

function DashboardPage() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getDashboardData>> | null>(null);

  useEffect(() => { getDashboardData().then(setData); }, []);

  if (!data) {
    return (
      <AppShell title="Owner Dashboard" subtitle="Updating dashboard…">
        <Card><div className="text-sm text-muted-foreground">Loading dashboard…</div></Card>
      </AppShell>
    );
  }

  const stats = [
    { k: "Total Conversations", v: data.stats.totalConversations, icon: MessageSquare, tone: "text-info" },
    { k: "Active Bookings", v: data.stats.activeBookings, icon: CalendarCheck, tone: "text-primary" },
    { k: "Reports Pending", v: data.stats.reportsPending, icon: FileText, tone: "text-warning" },
    { k: "Completed Today", v: data.stats.completedToday, icon: CheckCheck, tone: "text-success" },
    { k: "Estimated AI Cost Saved", v: data.stats.costSaved, icon: PiggyBank, tone: "text-success" },
  ];

  return (
    <AppShell title="Owner Dashboard" subtitle="CarePlus Diagnostics · live operations">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.k} className="p-5">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">{s.k}</div>
                <Icon className={`h-4 w-4 ${s.tone}`} />
              </div>
              <div className="mt-2 text-2xl font-semibold">{s.v}</div>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Bookings</h2>
            <p className="text-xs text-muted-foreground mt-0.5">All bookings created by FlowCore conversations.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground">
              <tr>
                {["Customer","Service","Age","Fasting","Time Slot","Status","Staff","Memory","Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.bookings.map((b) => (
                <tr key={b.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{b.customer}</td>
                  <td className="px-4 py-3">{b.service}</td>
                  <td className="px-4 py-3">{b.age}</td>
                  <td className="px-4 py-3">{b.fasting}</td>
                  <td className="px-4 py-3">{b.slot}</td>
                  <td className="px-4 py-3"><Badge tone={statusTone[b.status]}>{b.status}</Badge></td>
                  <td className="px-4 py-3">{b.staff}</td>
                  <td className="px-4 py-3">{b.memoryApplied ? <Badge tone="memory">Yes</Badge> : "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      <Action>Assign Technician</Action>
                      <Action>Mark Sample Collected</Action>
                      <Action>Send Report</Action>
                      <Action>Complete Request</Action>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}

function Action({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium hover:bg-muted">
      {children}
    </button>
  );
}
