import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Badge } from "@/components/app-shell";
import { memories } from "@/lib/mock-data";
import { Brain, Sparkles } from "lucide-react";

export const Route = createFileRoute("/memory")({
  head: () => ({ meta: [{ title: "Hindsight Memory — FlowCore" }] }),
  component: MemoryPage,
});

function MemoryPage() {
  const stored = memories;
  const retrieved = memories.filter((m) => m.usedIn.toLowerCase().includes("thyroid") || m.type === "Staff Rule");

  return (
    <AppShell
      title="Hindsight Memory"
      subtitle="Persistent business memory that personalizes every customer conversation."
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Stored Business Memories</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {stored.map((m) => (
              <Card key={m.id}>
                <div className="flex items-center justify-between">
                  <Badge tone={m.type === "Staff Rule" ? "brand" : m.type === "Service Catalog" ? "info" : "memory"}>{m.type}</Badge>
                  <Brain className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-3 text-sm">{m.content}</div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-muted-foreground">Source</div>
                    <div className="font-medium">{m.source}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Used in</div>
                    <div className="font-medium">{m.usedIn}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pt-4">Retrieved memories for current chat</h2>
          <Card>
            <div className="space-y-3">
              {retrieved.map((m) => (
                <div key={m.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                  <div className="text-sm flex-1">
                    <div>{m.content}</div>
                    <div className="text-xs text-muted-foreground mt-1">Source: {m.source} · Used in: {m.usedIn}</div>
                  </div>
                  <Badge tone="success">applied</Badge>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Memory Impact</h2>
          <Card>
            <div className="text-xs text-muted-foreground">Before Hindsight</div>
            <div className="mt-1.5 rounded-lg bg-muted p-3 text-sm">
              Generic booking flow with missing lab-specific details.
            </div>
            <div className="text-xs text-muted-foreground mt-4">After Hindsight</div>
            <div className="mt-1.5 rounded-lg bg-success/10 text-success-foreground p-3 text-sm">
              Personalized diagnostic lab flow that collects age, fasting status, and applies technician preference automatically.
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-accent/30 to-transparent">
            <div className="text-sm font-medium">Memory health</div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-center">
              <Stat k="Memories" v={String(stored.length)} />
              <Stat k="Applied today" v="3" />
              <Stat k="Recall ms" v="120" />
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg border border-border p-2">
      <div className="text-lg font-semibold">{v}</div>
      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{k}</div>
    </div>
  );
}
