import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppShell, Card, Badge } from "@/components/app-shell";
import { Brain, Cpu, Send, Sparkles, User } from "lucide-react";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "WhatsApp Chat Simulator — FlowCore" }] }),
  component: ChatPage,
});

type Msg = {
  from: "customer" | "bot";
  text: string;
  badges?: ("memory" | "cheap" | "strong")[];
};

const script: Msg[] = [
  { from: "customer", text: "Hi, I want to book a thyroid test." },
  { from: "bot", text: "Sure. I can help you book a Thyroid Profile test. Please share your name.", badges: ["cheap"] },
  { from: "customer", text: "My name is Sneha." },
  { from: "bot", text: "Thanks Sneha. Please share your age.", badges: ["memory", "cheap"] },
  { from: "customer", text: "24" },
  { from: "bot", text: "Are you currently fasting? This helps us prepare the test correctly.", badges: ["memory", "cheap"] },
  { from: "customer", text: "Yes" },
  { from: "bot", text: "Please share your address and preferred time slot.", badges: ["cheap"] },
  { from: "customer", text: "KPHB, tomorrow 10 AM" },
  {
    from: "bot",
    text: "Your Thyroid Profile test booking is confirmed for tomorrow at 10 AM. A female technician will be preferred as per lab policy.",
    badges: ["memory", "strong"],
  },
];

const details = [
  { k: "Customer", v: "Sneha" },
  { k: "Test", v: "Thyroid Profile" },
  { k: "Age", v: "24" },
  { k: "Fasting", v: "Yes" },
  { k: "Address", v: "KPHB" },
  { k: "Time Slot", v: "Tomorrow 10 AM" },
  { k: "Status", v: "Booking Confirmed" },
  { k: "Assigned Staff", v: "Anjali" },
  { k: "Memory Applied", v: "Age + fasting status collected" },
];

function ChatPage() {
  const [shown, setShown] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  function play() {
    setShown([]);
    setDone(false);
    let i = 0;
    const next = () => {
      if (i >= script.length) {
        setTyping(false);
        setDone(true);
        return;
      }
      const m = script[i];
      if (m.from === "bot") setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setShown((s) => [...s, m]);
        i++;
        setTimeout(next, m.from === "bot" ? 600 : 850);
      }, m.from === "bot" ? 900 : 200);
    };
    next();
  }

  useEffect(() => { play(); }, []);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [shown, typing]);

  const detailsToShow = details.slice(0, Math.min(details.length, Math.max(1, Math.floor(shown.length * (details.length / script.length)))));

  return (
    <AppShell
      title="WhatsApp Chat Simulator"
      subtitle="Live customer conversation powered by Hindsight memory and routed by cascadeflow."
      actions={
        <button onClick={play} className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium border border-border bg-card hover:bg-muted">
          Replay scenario
        </button>
      }
    >
      <div className="grid lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3 p-0 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-[oklch(0.35_0.05_155)] text-white">
            <div className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold">CarePlus Diagnostics</div>
              <div className="text-[11px] opacity-80">FlowCore agent · online</div>
            </div>
          </div>
          <div
            ref={scrollRef}
            className="h-[520px] overflow-y-auto p-4 space-y-3 bg-[oklch(0.96_0.02_140)] dark:bg-[oklch(0.2_0.03_150)]"
          >
            {shown.map((m, i) => (
              <div key={i} className={`flex ${m.from === "customer" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-sm shadow-soft ${
                  m.from === "customer"
                    ? "bg-[oklch(0.85_0.13_145)] text-[oklch(0.2_0.05_150)] rounded-br-sm"
                    : "bg-card text-card-foreground rounded-bl-sm"
                }`}>
                  <div>{m.text}</div>
                  {m.badges && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {m.badges.includes("memory") && <Badge tone="memory"><Brain className="h-3 w-3" /> Used Hindsight Memory</Badge>}
                      {m.badges.includes("cheap") && <Badge tone="info"><Cpu className="h-3 w-3" /> cascadeflow: cheap model</Badge>}
                      {m.badges.includes("strong") && <Badge tone="brand"><Cpu className="h-3 w-3" /> cascadeflow: strong model</Badge>}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-card px-3.5 py-2 text-sm shadow-soft">
                  <span className="inline-flex gap-1 items-center text-muted-foreground">
                    <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-pulse" />
                    <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-pulse [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-pulse [animation-delay:240ms]" />
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="border-t border-border p-3 flex items-center gap-2 bg-card">
            <input disabled placeholder="Customer typing…" className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            <button disabled className="rounded-lg p-2 gradient-brand text-primary-foreground opacity-70">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <Card>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Live extracted request</h3>
            </div>
            <dl className="mt-4 space-y-2.5 text-sm">
              {detailsToShow.map((d) => (
                <div key={d.k} className="flex items-start justify-between gap-3 border-b border-border last:border-0 pb-2 last:pb-0">
                  <dt className="text-muted-foreground">{d.k}</dt>
                  <dd className="font-medium text-right">{d.v}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card className="bg-gradient-to-br from-accent/40 to-transparent">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Memories applied</h3>
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              <li>• Always ask patient age</li>
              <li>• Ask fasting status</li>
              <li>• Prefer female tech for female customers</li>
            </ul>
            {done && <div className="mt-3 text-xs text-success">Conversation completed → booking pushed to dashboard.</div>}
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
