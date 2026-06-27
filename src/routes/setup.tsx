import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Card, Badge } from "@/components/app-shell";
import { Building2, ListChecks, Users, Wand2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/setup")({
  head: () => ({ meta: [{ title: "Business Setup — FlowCore" }] }),
  component: SetupPage,
});

function SetupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [services] = useState(["CBC Test", "Thyroid Profile", "Diabetes Package", "Vitamin D Test"]);
  const [staff] = useState([
    { name: "Rahul", role: "Technician" },
    { name: "Anjali", role: "Technician" },
    { name: "Priya", role: "Report Coordinator" },
  ]);

  async function handleGenerate() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1100));
    navigate({ to: "/workflow" });
  }

  return (
    <AppShell
      title="Business Setup"
      subtitle="Describe your business once. FlowCore will use this to generate the WhatsApp workflow and seed Hindsight memory."
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-4 w-4 text-primary" />
              <h2 className="font-semibold">Business profile</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Business Name">
                <input
                  defaultValue="CarePlus Diagnostics"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                />
              </Field>
              <Field label="Business Type">
                <input
                  defaultValue="Diagnostic Lab"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Business Description">
                <textarea
                  rows={4}
                  defaultValue="We run a diagnostic lab. Customers book blood tests through WhatsApp. Technicians collect samples from home. Reports are generated and sent to customers."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm resize-none"
                />
              </Field>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-4">
              <ListChecks className="h-4 w-4 text-primary" />
              <h2 className="font-semibold">Services offered</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <Badge key={s} tone="brand">{s}</Badge>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-4 w-4 text-primary" />
              <h2 className="font-semibold">Staff</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {staff.map((s) => (
                <div key={s.name} className="rounded-xl border border-border p-4">
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.role}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-primary" />
              <div className="font-semibold">Generate workflow</div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              FlowCore will produce a complete WhatsApp customer journey for your lab, ready to validate.
            </p>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium gradient-brand text-primary-foreground shadow-soft disabled:opacity-60"
            >
              {loading ? "Generating workflow…" : (<>Generate AI Workflow <ArrowRight className="h-4 w-4" /></>)}
            </button>
            <div className="mt-4 text-xs text-muted-foreground space-y-1">
              <div>✓ Uses business description</div>
              <div>✓ Seeds Hindsight memory</div>
              <div>✓ Routes via cascadeflow</div>
            </div>
          </Card>
          <Card>
            <div className="text-sm font-medium">Already set up?</div>
            <Link to="/dashboard" className="text-sm text-primary inline-flex items-center gap-1 mt-1">
              Go to dashboard <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
