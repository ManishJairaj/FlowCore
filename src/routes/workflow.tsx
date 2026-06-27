import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, Card, Badge } from "@/components/app-shell";
import { generateWorkflow, storeMemory } from "@/lib/api";
import { initialWorkflow, memoryAwareWorkflow, type WorkflowStep } from "@/lib/mock-data";
import { ArrowRight, CheckCircle2, ChevronRight, Brain, Rocket, MessageSquarePlus } from "lucide-react";

export const Route = createFileRoute("/workflow")({
  head: () => ({ meta: [{ title: "Workflow — FlowCore" }] }),
  component: WorkflowPage,
});

function WorkflowPage() {
  const [loading, setLoading] = useState(true);
  const [workflow, setWorkflow] = useState<WorkflowStep[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(
    "Always collect patient age and fasting status before confirming a blood test. Also prefer female technicians for female customers."
  );
  const [storing, setStoring] = useState(false);
  const [memoryStored, setMemoryStored] = useState<string[] | null>(null);

  useEffect(() => {
    generateWorkflow().then((r) => {
      setWorkflow(r.workflow);
      setLoading(false);
    });
  }, []);

  async function handleStore() {
    setStoring(true);
    const r = await storeMemory(feedback);
    setMemoryStored(r.stored);
    setWorkflow(r.updatedWorkflow);
    setStoring(false);
  }

  return (
    <AppShell
      title="Generated WhatsApp Workflow"
      subtitle="Validated step-by-step customer journey, ready to deploy or refine with owner feedback."
      actions={
        <>
          <Link to="/chat" className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium border border-border bg-card hover:bg-muted">
            Try in Chat <ArrowRight className="h-4 w-4" />
          </Link>
          <button className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium gradient-brand text-primary-foreground shadow-soft">
            <Rocket className="h-4 w-4" /> Deploy Workflow
          </button>
        </>
      }
    >
      {loading ? (
        <Card><div className="text-sm text-muted-foreground">Generating workflow…</div></Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <Badge tone="success"><CheckCircle2 className="h-3 w-3" /> Workflow Validated Successfully</Badge>
                  {memoryStored && <Badge tone="memory"><Brain className="h-3 w-3" /> Using Hindsight Memory</Badge>}
                </div>
                <button
                  onClick={() => setShowFeedback((v) => !v)}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium border border-border hover:bg-muted"
                >
                  <MessageSquarePlus className="h-3.5 w-3.5" /> Add Owner Feedback
                </button>
              </div>

              <ol className="space-y-2">
                {workflow.map((step, i) => (
                  <li key={step.id} className="flex items-start gap-3 rounded-xl border border-border bg-background/60 p-3.5">
                    <div className="h-7 w-7 shrink-0 rounded-lg bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm">{step.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{step.description}</div>
                    </div>
                    {memoryStored && memoryAwareWorkflow.includes(step) && !initialWorkflow.some(s => s.title === step.title) && (
                      <Badge tone="memory">memory</Badge>
                    )}
                  </li>
                ))}
              </ol>
            </Card>

            {showFeedback && (
              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold">Owner feedback → Hindsight memory</h3>
                </div>
                <textarea
                  rows={3}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell FlowCore how to improve this workflow…"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm resize-none"
                />
                <button
                  onClick={handleStore}
                  disabled={storing}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium gradient-brand text-primary-foreground shadow-soft disabled:opacity-60"
                >
                  {storing ? "Retrieving Hindsight memory…" : "Update Workflow & Store Memory"}
                </button>

                {memoryStored && (
                  <div className="mt-5 rounded-xl border border-border bg-accent/40 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className="h-4 w-4 text-success" /> Memory Stored
                    </div>
                    <div className="mt-3 grid sm:grid-cols-2 gap-3 text-xs">
                      <KV k="Memory Type" v="Business Preference" />
                      <KV k="Source" v="Owner Feedback" />
                    </div>
                    <ul className="mt-3 space-y-1.5 text-sm">
                      {memoryStored.map((m) => (
                        <li key={m} className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card>
              <h3 className="font-semibold text-sm">Validation checklist</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {[
                  "Customer details collected",
                  "Service selection included",
                  "Staff assignment included",
                  "Status tracking included",
                  "Customer notifications included",
                ].map((c) => (
                  <li key={c} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" /> {c}
                  </li>
                ))}
              </ul>
            </Card>

            {memoryStored && (
              <Card>
                <h3 className="font-semibold text-sm">Before vs After Hindsight</h3>
                <div className="mt-3 text-xs">
                  <div className="text-muted-foreground">Before:</div>
                  <div className="mt-1 rounded-lg bg-muted p-2.5">Ask test → name → address → confirm booking</div>
                  <div className="text-muted-foreground mt-3">After:</div>
                  <div className="mt-1 rounded-lg bg-success/10 text-success-foreground p-2.5">
                    Ask test → name → <b>age</b> → <b>fasting status</b> → address → confirm
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-muted-foreground">{k}</div>
      <div className="font-medium">{v}</div>
    </div>
  );
}
