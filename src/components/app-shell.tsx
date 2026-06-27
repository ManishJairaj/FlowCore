import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Home,
  Workflow,
  MessageSquare,
  LayoutDashboard,
  Brain,
  Activity,
  PlayCircle,
  Settings,
  Sparkles,
} from "lucide-react";

type NavItem = { to: string; label: string; icon: typeof Home; exact?: boolean };
const nav: NavItem[] = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/setup", label: "Setup", icon: Settings },
  { to: "/workflow", label: "Workflow", icon: Workflow },
  { to: "/chat", label: "Chat Simulator", icon: MessageSquare },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/memory", label: "Memory", icon: Brain },
  { to: "/audit", label: "Runtime Audit", icon: Activity },
  { to: "/demo", label: "Demo Mode", icon: PlayCircle },
];

export function AppShell({ children, title, subtitle, actions }: { children: ReactNode; title?: string; subtitle?: string; actions?: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-card/50 backdrop-blur">
        <Link to="/" className="flex items-center gap-2 px-5 h-16 border-b border-border">
          <div className="h-9 w-9 rounded-xl gradient-brand flex items-center justify-center text-primary-foreground shadow-soft">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="font-display font-semibold text-base leading-tight">FlowCore</div>
            <div className="text-[11px] text-muted-foreground leading-tight">WhatsApp OS for SMBs</div>
          </div>
        </Link>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to as "/"}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 m-3 rounded-xl border border-border bg-muted/40">
          <div className="text-xs text-muted-foreground">Demo workspace</div>
          <div className="text-sm font-medium">CarePlus Diagnostics</div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden h-14 border-b border-border bg-card/60 backdrop-blur flex items-center px-4 gap-2">
          <div className="h-8 w-8 rounded-lg gradient-brand flex items-center justify-center text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="font-display font-semibold">FlowCore</div>
        </header>
        {(title || actions) && (
          <div className="border-b border-border bg-card/30">
            <div className="px-6 lg:px-10 py-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                {title && <h1 className="text-2xl font-semibold">{title}</h1>}
                {subtitle && <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{subtitle}</p>}
              </div>
              {actions && <div className="flex gap-2">{actions}</div>}
            </div>
          </div>
        )}
        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card text-card-foreground shadow-soft p-6 ${className}`}>
      {children}
    </div>
  );
}

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "brand" | "success" | "warning" | "info" | "memory" }) {
  const tones: Record<string, string> = {
    default: "bg-muted text-muted-foreground",
    brand: "bg-primary/10 text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-foreground",
    info: "bg-info/15 text-info",
    memory: "bg-accent text-accent-foreground",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
