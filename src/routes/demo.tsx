import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Card, Badge } from "@/components/app-shell";
import {
  Building2, Wand2, MessageCircle, Brain, MessageSquare, LayoutDashboard, Activity, PlayCircle, CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/demo")({
  head: () => ({ meta: [{ title: "Demo Mode — FlowCore" }] }),
  component: DemoPage,
});

const steps = [
  { icon: Building2, title: "Owner creates diagnostic lab", desc: "CarePlus Diagnostics is set up with services and staff." },
  { icon: Wand2, title: "AI generates workflow", desc: "FlowCore produces an 11-step WhatsApp customer flow." },
  { icon: MessageCircle, title: "Owner gives correction", desc: "“Always collect age and fasting status. Prefer female techs.”" },
  { icon: Brain, title: "Hindsight stores memory", desc: "3 business rules persisted and linked to the workflow." },
  { icon: MessageSquare, title: "Customer books thyroid test", desc: "Sneha messages on WhatsApp asking for a thyroid test." },
  { icon: Brain, title: "FlowCore recalls memory", desc: "Asks age + fasting status automatically; assigns female tech." },
  { icon: LayoutDashboard, title: "Dashboard creates booking", desc: "Booking appears with all fields and staff assignment." },
  { icon: Activity, title: "cascadeflow audit", desc: "Model routing, cost (₹0.068), and 62% savings logged." },
];

function DemoPage() {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(0);

  async function run() {
    setRunning(true);
    setDone(0);
    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, 750));
      setDone(i + 1);
    }
    setRunning(false);
  }

  return (
    <AppShell
      title="Guided Demo"
      subtitle="The full FlowCore story end-to-end — perfect for a hackathon walkthrough."
      actions={
        <button
          onClick={run}
          disabled={running}
          className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium gradient-brand text-primary-foreground shadow-soft disabled:opacity-60"
        >
          <PlayCircle className="h-4 w-4" /> {running ? "Running demo…" : "Run Demo"}
        </button>
      }
    >
      <div className="relative">
        <div className="absolute left-5 top-2 bottom-2 w-px bg-border" />
        <ol className="space-y-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const active = i < done;
            return (
              <li
                key={i}
                className={`relative pl-14 transition-opacity ${i < done || !running ? "opacity-100" : "opacity-40"}`}
              >
                <div className={`absolute left-1 top-2 h-9 w-9 rounded-xl flex items-center justify-center shadow-soft ${
                  active ? "gradient-brand text-primary-foreground" : "bg-card border border-border text-muted-foreground"
                }`}>
                  {active ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>
                <Card className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-mono text-muted-foreground">Step {String(i + 1).padStart(2, "0")}</div>
                    {active && <Badge tone="success">done</Badge>}
                  </div>
                  <div className="font-semibold mt-1">{s.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.desc}</div>
                </Card>
              </li>
            );
          })}
        </ol>
      </div>

      {done === steps.length && (
        <Card className="mt-6 bg-gradient-to-br from-success/15 to-transparent border-success/30">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <div className="font-semibold">Demo complete</div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            FlowCore generated a workflow, learned from owner feedback, recalled memory in a live customer chat, and
            routed every task through cascadeflow with full audit visibility.
          </p>
        </Card>
      )}
    </AppShell>
  );
}
