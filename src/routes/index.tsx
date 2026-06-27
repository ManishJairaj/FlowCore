import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  Brain,
  MessageSquare,
  Workflow,
  LayoutDashboard,
  Activity,
  Zap,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FlowCore — Memory-Powered WhatsApp Workflow Agent" },
      { name: "description", content: "FlowCore turns WhatsApp into a memory-powered business operating system for small businesses. Generate workflows, remember preferences with Hindsight, and route tasks intelligently with cascadeflow." },
      { property: "og:title", content: "FlowCore — Memory-Powered WhatsApp Workflow Agent" },
      { property: "og:description", content: "Generate, remember, and execute customer workflows through WhatsApp-style automation." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Workflow, title: "AI Workflow Generator", desc: "Describe your business once. Get a complete WhatsApp workflow." },
  { icon: Brain, title: "Hindsight Business Memory", desc: "Remember owner preferences, rules, and business knowledge." },
  { icon: MessageSquare, title: "WhatsApp Chat Simulator", desc: "Test customer conversations in a realistic chat interface." },
  { icon: LayoutDashboard, title: "Owner Dashboard", desc: "Track bookings, conversations, and operations in one place." },
  { icon: Activity, title: "cascadeflow Runtime Audit", desc: "See which model handled which task, why, and at what cost." },
  { icon: Zap, title: "Cost & Latency Optimization", desc: "Cheap models for simple replies. Strong models for hard reasoning." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 backdrop-blur bg-background/70 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl gradient-brand flex items-center justify-center text-primary-foreground shadow-soft">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-display font-semibold text-lg">FlowCore</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#problem" className="hover:text-foreground">Problem</a>
            <a href="#solution" className="hover:text-foreground">Solution</a>
            <a href="#features" className="hover:text-foreground">Features</a>
            <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/demo"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium border border-border hover:bg-muted"
            >
              Demo Mode
            </Link>
            <Link
              to="/setup"
              className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium gradient-brand text-primary-foreground shadow-soft"
            >
              Start <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative gradient-hero">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-xs text-muted-foreground mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> Hackathon MVP · Diagnostic Lab demo
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight max-w-4xl mx-auto">
            Turn WhatsApp into a{" "}
            <span className="bg-clip-text text-transparent gradient-brand">Memory-Powered</span> Business Operating System
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            FlowCore helps small businesses generate, remember, and execute customer workflows through WhatsApp-style automation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium gradient-brand text-primary-foreground shadow-card"
            >
              Start Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium border border-border bg-card hover:bg-muted"
            >
              View Dashboard
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            {[
              { k: "Cost saved", v: "62%" },
              { k: "Avg latency", v: "890ms" },
              { k: "Memories stored", v: "5" },
              { k: "Bookings today", v: "8" },
            ].map((s) => (
              <div key={s.k} className="rounded-xl border border-border bg-card/70 backdrop-blur p-4 shadow-soft">
                <div className="text-xs text-muted-foreground">{s.k}</div>
                <div className="text-xl font-semibold mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="problem" className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <div className="text-xs font-medium text-primary uppercase tracking-wider">The problem</div>
            <h2 className="text-3xl font-semibold mt-2">Small businesses run their entire operation through WhatsApp.</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Small businesses manually manage WhatsApp orders, bookings, staff, payments, and repeated questions.
              Every conversation starts from zero. Owners answer the same things over and over. Context is lost the
              moment a chat scrolls away.
            </p>
          </div>
          <div className="grid gap-3">
            {[
              "Orders and bookings juggled across chats",
              "Same questions answered every single day",
              "Staff assignments tracked in someone's head",
              "No memory of business rules and preferences",
            ].map((p) => (
              <div key={p} className="rounded-xl border border-border bg-card p-4 flex items-start gap-3 shadow-soft">
                <div className="h-6 w-6 rounded-md bg-destructive/15 text-destructive flex items-center justify-center text-sm">×</div>
                <span className="text-sm">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="solution" className="bg-card/40 border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">The solution</div>
          <h2 className="text-3xl font-semibold mt-2 max-w-3xl">
            Describe your business once. FlowCore does the rest.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl">
            Business owner describes the business. FlowCore generates the workflow. Hindsight remembers preferences.
            cascadeflow routes tasks intelligently to the right model.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {[
              { n: "01", t: "Owner describes business", d: "Name, type, services, staff." },
              { n: "02", t: "AI generates workflow", d: "Step-by-step WhatsApp flow ready to deploy." },
              { n: "03", t: "Hindsight remembers", d: "Feedback turns into permanent business memory." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="text-xs font-mono text-primary">{s.n}</div>
                <div className="font-semibold mt-2">{s.t}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold">Everything you need to run on WhatsApp.</h2>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          Workflow generation, memory, simulator, dashboard, and a transparent runtime — all in one place.
        </p>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-card transition-shadow">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-semibold mt-4">{f.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{f.desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-3xl border border-border gradient-hero p-10 md:p-14 text-center shadow-card">
          <CheckCircle2 className="h-10 w-10 mx-auto text-primary" />
          <h3 className="text-2xl md:text-3xl font-semibold mt-4">Ready to see the full demo?</h3>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Walk through the diagnostic lab story end-to-end: setup → workflow → memory → live chat → audit.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/demo" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium gradient-brand text-primary-foreground shadow-card">
              Run Guided Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/setup" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium border border-border bg-card hover:bg-muted">
              Start with Setup
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© 2026 FlowCore · Hackathon MVP</div>
          <div className="flex gap-4">
            <span>Powered by Hindsight Memory</span>
            <span>· cascadeflow Runtime</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
