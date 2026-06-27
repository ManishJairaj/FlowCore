import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, Card, Badge } from "@/components/app-shell";
import { getAuditLogs } from "@/lib/api";
import type { AuditRow } from "@/lib/mock-data";
import { Cpu, Brain, Zap } from "lucide-react";

export const Route = createFileRoute("/audit")({
  head: () => ({ meta: [{ title: "Runtime Audit — FlowCore" }] }),
  component: AuditPage,
});

function AuditPage() {
  const [rows, setRows] = useState<AuditRow[]>([]);

  useEffect(() => { getAuditLogs().then(setRows); }, []);

  const stats = [
    { k: "Total Estimated Cost", v: "₹0.068" },
    { k: "Cost Saved", v: "62%" },
    { k: "Average Latency", v: "890ms" },
    { k: "Strong Model Calls", v: "2" },
    { k: "Cheap Model Calls", v: "3" },
  ];

  return (
    <AppShell
      title="cascadeflow Runtime Audit"
      subtitle="Every model decision is logged with cost, latency, and reason."
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((s) => (
          <Card key={s.k} className="p-5">
            <div className="text-xs text-muted-foreground">{s.k}</div>
            <div className="mt-1.5 text-2xl font-semibold">{s.v}</div>
          </Card>
        ))}
      </div>

      <Card className="mt-6 p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-semibold">cascadeflow Runtime Audit Trail</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground">
              <tr>
                {["Task","Model Selected","Reason","Estimated Cost","Latency","Escalated?","Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{r.task}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5">
                      {r.modelTier === "memory" ? <Brain className="h-3.5 w-3.5 text-primary" /> :
                       r.modelTier === "strong" ? <Cpu className="h-3.5 w-3.5 text-primary" /> :
                       <Zap className="h-3.5 w-3.5 text-info" />}
                      {r.model}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.reason}</td>
                  <td className="px-4 py-3 font-mono text-xs">{r.cost}</td>
                  <td className="px-4 py-3 font-mono text-xs">{r.latency}</td>
                  <td className="px-4 py-3">{r.escalated ? <Badge tone="warning">Escalated</Badge> : <Badge>No</Badge>}</td>
                  <td className="px-4 py-3"><Badge tone="success">{r.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="mt-6 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <div className="font-semibold">How cascadeflow decides</div>
            <p className="text-sm text-muted-foreground mt-1 max-w-3xl">
              cascadeflow routes simple tasks to cheaper/faster models and escalates complex workflow tasks to stronger models.
              Every decision is logged with cost, latency, and reason — giving you a transparent runtime that pays for itself.
            </p>
          </div>
        </div>
      </Card>
    </AppShell>
  );
}
