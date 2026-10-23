import { AnimatePresence, motion } from "framer-motion";
import { useAccessibleMotion } from "./motion";
import { useEffect, useState, type ReactNode } from "react";
import {
  Activity,
  ArrowUpDown,
  Clock,
  Columns2,
  Command,
  DollarSign,
  Download,
  Flame,
  GitBranch,
  GitCompare,
  History,
  Layers,
  MousePointer2,
  Pause,
  PauseCircle,
  Play,
  RefreshCw,
  RotateCcw,
  Search,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
  Wrench,
  X,
  Zap,
  TriangleAlert,
  Plus,
} from "lucide-react";

const I = { strokeWidth: 1.75, size: 13 } as const;

/* ---------- primitives ---------- */

function Btn({
  children,
  active,
  primary,
}: {
  children: ReactNode;
  active?: boolean;
  primary?: boolean;
}) {
  return (
    <span
      className={`inline-flex h-7 shrink-0 items-center gap-1 whitespace-nowrap rounded-md border px-2 font-mono text-[11px] transition-colors ${
        primary
          ? "border-deck-fg bg-deck-fg font-semibold text-deck"
          : active
            ? "border-deck-muted bg-deck-raised text-deck-fg"
            : "border-deck-line text-deck-muted hover:border-deck-muted hover:text-deck-fg"
      }`}
    >
      {children}
    </span>
  );
}

function Badge({ children, dashed }: { children: ReactNode; dashed?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[10px] text-deck-fg ${
        dashed ? "border-dashed border-deck-muted" : "border-deck-line bg-deck-raised"
      }`}
    >
      {children}
    </span>
  );
}

/* ---------- top bar ---------- */

export function TopBar({ running = true, pulse = false }: { running?: boolean; pulse?: boolean }) {
  return (
    <div className="flex h-11 items-center gap-2 whitespace-nowrap border-b border-deck-line px-3">
      <div className="flex items-center gap-2">
        <Activity {...I} size={15} className="text-deck-fg" />
        <span className="font-mono text-[11px] font-bold tracking-wider text-deck-fg">AETHERTRACE</span>
        <Badge>DEBUGGER</Badge>
      </div>
      <div className="flex h-7 w-36 shrink-0 items-center gap-1.5 rounded-md border border-deck-line px-2 font-mono text-[11px] text-deck-dim">
        <Search {...I} />
        <span className="flex-1">Search or action...</span>
        <span className="rounded border border-deck-line px-1 text-[9px]">⌘K</span>
      </div>
      <div className="flex h-7 items-center gap-2 rounded-md border border-deck-line px-2 font-mono text-[11px] text-deck-muted">
        <span className={`h-1.5 w-1.5 rounded-full bg-deck-fg ${running ? "animate-pulse" : "opacity-40"}`} />
        <span className="text-[10px] text-deck-fg">{running ? "RUNNING" : "IDLE"}</span>
        <span className="max-w-[120px] truncate text-deck-fg">Tool-Retry-Pipeline-7908</span>
        <span>0 tok</span>
        <span className="text-deck-fg">$0.0000</span>
        <span className="inline-flex items-center gap-1 rounded border border-deck-line px-1.5 text-[10px]">
          <Pause {...I} size={10} /> Pause
        </span>
      </div>
      <div className="ml-auto flex shrink-0 items-center gap-1">
        <Btn><Clock {...I} /> Timeline</Btn>
        <Btn><PauseCircle {...I} /> Breakpoints</Btn>
        <Btn><GitCompare {...I} /> Diff</Btn>
        <Btn><Flame {...I} /> Chaos</Btn>
        <Btn><Shield {...I} /> Shield</Btn>
        <Btn><Upload {...I} /> Import</Btn>
        <Btn><Download {...I} /> Export</Btn>
        <motion.span animate={pulse ? { scale: [1, 0.94, 1] } : {}} transition={{ duration: 0.25 }}>
          <Btn primary><Play {...I} fill="currentColor" /> Simulate Run</Btn>
        </motion.span>
      </div>
    </div>
  );
}

/* ---------- sidebar ---------- */

const RUNS = [
  { name: "Tool-Retry-Pipeline-7908", id: "run_fde00aad-39…", tok: "0 tok", cost: "$0.000000" },
  { name: "Quickstart-Incident-Analysis-8234", id: "run_30db8743-9e…", tok: "212 tok", cost: "$0.000690" },
  { name: "Replay of default-run", id: "run_replay_ed32…", tok: "25 tok", cost: "$0.000000", badge: "Replay" },
  { name: "Forked-Prov-Run-1792634066958", id: "run_602efe25-c2…", tok: "0 tok", cost: "$0.000000", badge: "Fork" },
];

export function Sidebar() {
  return (
    <aside className="flex w-[260px] shrink-0 flex-col gap-2 border-r border-deck-line p-2.5">
      <div className="flex items-center gap-2 px-1 font-mono text-[11px] font-semibold text-deck-fg">
        <Layers {...I} /> RUNS <Badge>50</Badge>
        <RefreshCw {...I} className="ml-auto text-deck-dim" />
      </div>
      <div className="flex gap-1 font-mono text-[9px] text-deck-muted">
        {["ALL", "RUNNING", "COMPLETED", "FORK", "REPLAY"].map((t, i) => (
          <span key={t} className={`rounded px-1.5 py-1 ${i === 0 ? "bg-deck-fg text-deck" : "hover:text-deck-fg"}`}>
            {t}
          </span>
        ))}
      </div>
      {RUNS.map((r, i) => (
        <div
          key={r.name}
          className={`rounded-lg border p-2.5 font-mono transition-colors ${
            i === 0 ? "border-deck-muted bg-deck-panel" : "border-deck-line hover:border-deck-muted"
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-[11px] font-semibold text-deck-fg">{r.name}</span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-deck-fg" />
          </div>
          <div className="mt-1 flex items-center gap-2 text-[10px] text-deck-dim">
            {r.id}
            {r.badge && (
              <Badge>
                {r.badge === "Fork" ? <GitBranch {...I} size={10} /> : <RotateCcw {...I} size={10} />}
                {r.badge}
              </Badge>
            )}
          </div>
          <div className="mt-2 flex justify-between border-t border-deck-line pt-1.5 text-[10px] text-deck-muted">
            <span>{r.tok}</span>
            <span>{r.cost}</span>
          </div>
        </div>
      ))}
    </aside>
  );
}

/* ---------- DAG ---------- */

type NodeT = { kind: string; body: string; ms: string };
export const NODES: [NodeT, NodeT, NodeT] = [
  {
    kind: "TOOL",
    body: 'Tool: query_postgres({"sql":"SELECT * FROM accounts WHERE id = 101"})',
    ms: "1ms",
  },
  {
    kind: "TOOL",
    body: 'Tool: query_postgres({"sql":"SELECT * FROM accounts WHERE id = 101","retry":1})',
    ms: "0ms",
  },
  {
    kind: "RETRY",
    body: "Retry attempt #1: DatabaseConnectionTimeout: connection pool exhausted (simulated)",
    ms: "12ms",
  },
];

export function NodeCard({
  n,
  selected,
}: {
  n: NodeT;
  selected?: boolean;
}) {
  const retry = n.kind === "RETRY";
  return (
    <div
      className={`w-[330px] rounded-lg border bg-deck-panel font-mono transition-all duration-300 ${
        selected ? "border-deck-fg ring-4 ring-deck-fg/10" : retry ? "border-dashed border-deck-muted" : "border-deck-line hover:border-deck-muted"
      }`}
    >
      <div className="flex items-center justify-between border-b border-deck-line px-3 py-2">
        <Badge dashed={retry}>
          {retry ? <RotateCcw {...I} size={10} /> : <Wrench {...I} size={10} />} DatabaseOperator
        </Badge>
        <span className="text-[10px] text-deck-muted">{n.kind}</span>
      </div>
      <p className="px-3 pt-2.5 font-sans text-[11.5px] leading-snug text-deck-fg">{n.body}</p>
      <div className="mx-3 mt-2 flex justify-between border-t border-deck-line py-1.5 text-[10px] text-deck-muted">
        <span><b className="text-deck-fg">0</b> in → <b className="text-deck-fg">0</b> out</span>
        <span>0 tok</span>
      </div>
      <div className="flex items-center gap-3 border-t border-deck-line px-3 py-2 text-[10px] text-deck-muted">
        <span className="flex items-center gap-1"><Clock {...I} size={11} /> {n.ms}</span>
        <span className="flex items-center gap-0.5"><DollarSign {...I} size={11} /> <b className="text-deck-fg">0.00</b></span>
      </div>
    </div>
  );
}

function Connector() {
  return <div className="mx-auto h-7 w-px border-l border-dashed border-deck-muted" />;
}

export function Dag({ visible = 3, selected = -1 }: { visible?: number; selected?: number }) {
  return (
    <div className="relative flex-1 dot-grid">
      <div className="absolute left-3 top-3 flex gap-2">
        <span className="inline-flex h-7 items-center gap-2 rounded-md border border-deck-line bg-deck px-2.5 font-mono text-[11px] text-deck-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-deck-fg" /> DAG: <b className="text-deck-fg">Tool-Retry-Pipeline-7908</b>
          <Badge>3 nodes</Badge>
        </span>
        <Btn><ArrowUpDown {...I} /> Vertical</Btn>
      </div>
      <div className="flex flex-col items-center pt-14">
        {NODES.map((n, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{ opacity: i < visible ? 1 : 0, y: i < visible ? 0 : 10 }}
            transition={{ duration: 0.35 }}
          >
            {i > 0 && <Connector />}
            <NodeCard n={n} selected={selected === i} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------- timeline ---------- */

const BARS = [
  { left: 0, w: 7, ms: "1ms", at: "+0ms", kind: "TOOL" },
  { left: 89.6, w: 6.5, ms: "0ms", at: "+199ms", kind: "TOOL" },
  { left: 92, w: 6, ms: "12ms", at: "+210ms", kind: "RETRY" },
];

export function Timeline({ visible = 3, compact = false }: { visible?: number; compact?: boolean }) {
  return (
    <div className="border-t border-deck-line font-mono text-[10px]">
      <div className="flex items-center gap-3 border-b border-deck-line px-3 py-2 text-deck-muted sm:gap-4">
        <span className="font-semibold text-deck-fg">Timeline</span>
        <span>3 events</span>
        <span className="flex items-center gap-1"><Clock {...I} size={11} /> 222ms window</span>
        {!compact && (
          <span className="ml-auto text-deck-dim">Press <span className="rounded border border-deck-line px-1">T</span> to toggle</span>
        )}
      </div>
      <div className="space-y-1.5 px-3 py-2.5">
        {BARS.map((b, i) => (
          <div key={i} className="flex items-center gap-2 text-deck-muted sm:gap-3">
            <span className="w-4 text-deck-dim">#{i + 1}</span>
            <span className={`${compact ? "w-24" : "w-36"} truncate text-deck-fg`}>DatabaseOperator <span className="text-deck-dim">({b.kind})</span></span>
            <div className="relative h-3 flex-1 rounded-sm bg-deck-panel">
              <motion.div
                className={`absolute top-0 h-3 rounded-sm border border-deck-muted bg-deck-raised pl-1 text-[8px] leading-3 text-deck-fg ${b.kind === "RETRY" ? "border-dashed" : ""}`}
                style={{ left: `${b.left}%` }}
                initial={false}
                animate={{ width: i < visible ? `${b.w}%` : "0%", opacity: i < visible ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {!compact && b.ms}
              </motion.div>
            </div>
            {compact && <span className="w-9 shrink-0 text-right text-deck-fg">{b.ms}</span>}
            <span className="w-12 shrink-0 text-right">{b.at}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ---------- inspector ---------- */

export function Inspector({ tab = "Overview" as "Overview" | "Fork IDE" | "JSON", onClose }: { tab?: "Overview" | "Fork IDE" | "JSON"; onClose?: boolean }) {
  return (
    <div className="flex h-full w-[320px] flex-col border-l border-deck-line bg-deck font-mono">
      <div className="flex items-center justify-between border-b border-deck-line px-3 py-2.5">
        <span className="text-[11px] font-bold tracking-wider text-deck-fg">INSPECTOR</span>
        {onClose && <X {...I} className="text-deck-dim" />}
      </div>
      <div className="flex gap-1 border-b border-deck-line px-3 py-2 text-[10px]">
        {(["Overview", "Fork IDE", "JSON"] as const).map((t) => (
          <span key={t} className={`rounded px-2 py-1 ${t === tab ? "bg-deck-fg text-deck" : "text-deck-muted"}`}>{t}</span>
        ))}
      </div>
      <div className="flex gap-2 px-3 py-3">
        <Btn><RotateCcw {...I} /> Replay From Here</Btn>
        <Btn active><GitBranch {...I} /> Fork From Here</Btn>
      </div>
      {tab === "Fork IDE" ? (
        <div className="space-y-2 px-3 text-[10.5px]">
          <div className="text-deck-dim">MODEL</div>
          <div className="rounded-md border border-deck-line bg-deck-panel px-2 py-1.5 text-deck-fg">gpt-4o-mini</div>
          <div className="text-deck-dim">PROMPT</div>
          <div className="rounded-md border border-deck-muted bg-deck-panel p-2 leading-relaxed text-deck-fg">
            {'{ "sql": "SELECT * FROM accounts WHERE id = 101",'}
            <br />
            {'  "retry": 1 }'}
            <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-deck-fg align-middle" />
          </div>
          <div className="flex items-center gap-2 pt-1 text-deck-muted">
            <Zap {...I} size={11} /> Ancestors replay in <b className="text-deck-fg">0ms</b> at <b className="text-deck-fg">$0.00</b>
          </div>
        </div>
      ) : (
        <dl className="divide-y divide-deck-line border-y border-deck-line text-[10.5px]">
          {[
            ["Span Type", "TOOL_CALL"],
            ["Agent Name", "DatabaseOperator"],
            ["Latency", "1ms"],
            ["Cost USD", "$0.000000"],
            ["Tokens", "0"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between px-3 py-2">
              <dt className="text-deck-dim">{k}</dt>
              <dd className="text-deck-fg">{v}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

/* ---------- cursor ---------- */

export function Cursor({ x, y, clicking }: { x: number; y: number; clicking: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 z-30"
      animate={{ x, y }}
      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      aria-hidden
    >
      <motion.div animate={{ scale: clicking ? 0.8 : 1 }} transition={{ duration: 0.15 }}>
        <MousePointer2 size={22} strokeWidth={1.75} className="fill-deck-fg text-deck drop-shadow" />
      </motion.div>
      <AnimatePresence>
        {clicking && (
          <motion.span
            className="absolute -left-3 -top-3 h-6 w-6 rounded-full border border-deck-fg"
            initial={{ scale: 0.3, opacity: 1 }}
            animate={{ scale: 1.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- full Flight Deck (hero) ---------- */

type Step = { x: number; y: number; click?: boolean; wait: number; apply?: (s: DeckState) => DeckState };
type DeckState = { visible: number; selected: number; inspector: boolean; running: boolean };

const INITIAL: DeckState = { visible: 3, selected: -1, inspector: false, running: true };

const SCRIPT: Step[] = [
  { x: 640, y: 420, wait: 900 },
  { x: 1395, y: 18, wait: 1000 },
  { x: 1395, y: 18, click: true, wait: 300, apply: () => ({ visible: 0, selected: -1, inspector: false, running: true }) },
  { x: 1300, y: 120, wait: 500, apply: (s) => ({ ...s, visible: 1 }) },
  { x: 1050, y: 200, wait: 500, apply: (s) => ({ ...s, visible: 2 }) },
  { x: 900, y: 300, wait: 700, apply: (s) => ({ ...s, visible: 3 }) },
  { x: 850, y: 170, wait: 900 },
  { x: 850, y: 170, click: true, wait: 300, apply: (s) => ({ ...s, selected: 0 }) },
  { x: 850, y: 170, wait: 500, apply: (s) => ({ ...s, inspector: true }) },
  { x: 1240, y: 200, wait: 2600 },
  { x: 1240, y: 200, wait: 600, apply: (s) => ({ ...s, inspector: false, selected: -1 }) },
];

function useDeckScript(live: boolean) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<DeckState>(live ? INITIAL : { ...INITIAL, selected: 0, inspector: true });
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    if (!live) return;
    const s = SCRIPT[step];
    if (!s) return;
    let t2: ReturnType<typeof setTimeout> | undefined;
    const t = setTimeout(() => {
      if (s.click) {
        setClicking(true);
        t2 = setTimeout(() => setClicking(false), 250);
      }
      const apply = s.apply;
      if (apply) setState((prev) => apply(prev));
      setStep((v) => (v + 1) % SCRIPT.length);
    }, s.wait);
    return () => {
      clearTimeout(t);
      if (t2) clearTimeout(t2);
    };
  }, [step, live]);

  return { state, clicking, cur: SCRIPT[step] };
}

export const MOBILE_DECK_W = 420;

export function FlightDeckMobile({ animate = true }: { animate?: boolean }) {
  const reduce = useAccessibleMotion();
  const live = animate && !reduce;
  const { state } = useDeckScript(live);

  return (
    <div className="window relative w-[420px] select-none text-left" role="img" aria-label="AetherTrace Flight Deck showing a three node execution DAG and timeline">
      <div className="flex h-11 items-center gap-2 whitespace-nowrap border-b border-deck-line px-3">
        <Activity {...I} size={15} className="text-deck-fg" />
        <span className="font-mono text-[11px] font-bold tracking-wider text-deck-fg">AETHERTRACE</span>
        <Badge>DEBUGGER</Badge>
        <span className="ml-auto">
          <Btn primary><Play {...I} fill="currentColor" /> Simulate Run</Btn>
        </span>
      </div>
      <div className="relative dot-grid flex flex-col items-center px-4 pb-4 pt-12">
        <span className="absolute left-3 top-3 inline-flex h-7 items-center gap-2 rounded-md border border-deck-line bg-deck px-2.5 font-mono text-[10px] text-deck-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-deck-fg" /> DAG: <b className="text-deck-fg">Tool-Retry-Pipeline</b>
          <Badge>3 nodes</Badge>
        </span>
        {NODES.map((n, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{ opacity: i < state.visible ? 1 : 0, y: i < state.visible ? 0 : 10 }}
            transition={{ duration: 0.35 }}
          >
            {i > 0 && <Connector />}
            <NodeCard n={n} selected={state.selected === i} />
          </motion.div>
        ))}
      </div>
      <Timeline visible={state.visible} compact />

    </div>
  );
}

export function FlightDeck({ animate = true }: { animate?: boolean }) {
  const reduce = useAccessibleMotion();
  const live = animate && !reduce;
  const { state, clicking, cur } = useDeckScript(live);
  if (!cur) return null;


  return (
    <div className="window relative h-[790px] w-[1440px] select-none text-left" role="img" aria-label="AetherTrace Flight Deck showing a three node execution DAG, runs sidebar, timeline and inspector">
      <TopBar running={state.running} pulse={clicking && cur.x > 1300} />
      <div className="flex h-[calc(790px-44px-118px)]">
        <Sidebar />
        <Dag visible={state.visible} selected={state.selected} />
      </div>
      <Timeline visible={state.visible} />
      <AnimatePresence>
        {state.inspector && (
          <motion.div
            className="absolute bottom-0 right-0 top-11 z-20 shadow-2xl"
            initial={{ x: 330 }}
            animate={{ x: 0 }}
            exit={{ x: 330 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Inspector onClose />
          </motion.div>
        )}
      </AnimatePresence>
      {live && <Cursor x={cur.x} y={cur.y} clicking={clicking} />}
    </div>
  );
}

/* ---------- smaller windows for feature sections ---------- */

export function MiniWindow({ title, icon, children, compact = false }: { title: string; icon: ReactNode; children: ReactNode; compact?: boolean }) {
  return (
    <div className={`window text-left font-mono ${compact ? "phone-replica w-[360px]" : "w-[640px]"}`}>
      <div className="flex items-center gap-2 border-b border-deck-line px-4 py-3 text-[12px] font-semibold text-deck-fg">
        {icon}
        {title}
        <X {...I} className="ml-auto text-deck-dim" />
      </div>
      {children}
    </div>
  );
}

export function LoopMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`window ${compact ? "phone-replica w-[360px]" : "w-[640px]"}`}>
      <div className="flex h-[340px]">
        <div className="flex flex-1 flex-col items-center gap-0 pt-6 dot-grid">
          <NodeCard n={NODES[0]} />
          <Connector />
          <NodeCard n={NODES[2]} selected />
        </div>
      </div>
      <Timeline compact={compact} />
    </div>
  );
}

export function ForkMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`window flex ${compact ? "phone-replica w-[360px] flex-col" : "h-[420px] w-[640px]"}`}>
      <div className="flex flex-1 flex-col items-center pt-8 dot-grid">
        <div className="scale-[0.85] origin-top">
          <NodeCard n={NODES[0]} />
          <Connector />
          <NodeCard n={NODES[1]} selected />
        </div>
      </div>
      <div className={compact ? "[&>div]:w-full [&>div]:border-l-0 [&>div]:border-t [&>div]:pb-4" : ""}><Inspector tab="Fork IDE" /></div>
    </div>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span className={`relative inline-block h-5 w-9 rounded-full border transition-colors duration-500 ${on ? "border-deck-fg bg-deck-fg" : "border-deck-line bg-deck-raised"}`}>
      <span className={`absolute top-0.5 h-3.5 w-3.5 rounded-full transition-all duration-500 ${on ? "left-[18px] bg-deck" : "left-0.5 bg-deck-muted"}`} />
    </span>
  );
}

function useLoopFlag(ms = 2400) {
  const reduce = useAccessibleMotion();
  const [on, setOn] = useState(true);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setOn((v) => !v), ms);
    return () => clearInterval(t);
  }, [ms, reduce]);
  return on;
}

export function BreakpointMock({ compact = false }: { compact?: boolean }) {
  const on = useLoopFlag();
  return (
    <MiniWindow title="Breakpoint & Interception Rules" icon={<PauseCircle {...I} size={15} />} compact={compact}>
      <div className="space-y-3 p-4 text-[11px]">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-deck-line p-3">
          <div>
            <div className="flex items-center gap-1.5 font-semibold text-deck-fg"><ShieldCheck {...I} /> Live Socket Interception</div>
            <div className="mt-0.5 text-[10px] text-deck-muted">Hold matching requests open at proxy socket level until human resolution</div>
          </div>
          <Toggle on={on} />
        </div>
        <div className={`grid gap-3 ${compact ? "grid-cols-1" : "grid-cols-2"}`}>
          {[["Break on Agent Names", "e.g. Coder, Researcher"], ["Break on Models", "e.g. gpt-4o, claude-3-5"]].map(([t, p]) => (
            <div key={t} className="rounded-lg border border-deck-line p-3">
              <div className="mb-2 font-semibold text-deck-fg">{t}</div>
              <div className="flex gap-1.5">
                <span className="flex-1 rounded border border-deck-line px-2 py-1.5 text-deck-dim">{p}</span>
                <span className="rounded border border-deck-line px-2 py-1.5 text-deck-fg">Add</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 font-semibold text-deck-fg">
          <SlidersHorizontal {...I} /> Conditional Breakpoints <Badge>{on ? "1 active" : "0 active"}</Badge>
        </div>
        <div className="rounded-lg border border-deck-line p-3">
          <div className={`grid gap-2 text-[10px] ${compact ? "grid-cols-1" : "grid-cols-3"}`}>
            {[["Field Path", "tool_name"], ["Operator", "equals"], ["Value", "query_postgres"]].map(([k, v]) => (
              <div key={k}>
                <div className="mb-1 text-deck-dim">{k}</div>
                <div className="rounded border border-deck-line px-2 py-1.5 text-deck-fg">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-end">
            <Btn primary><Plus {...I} /> Add Rule</Btn>
          </div>
        </div>
      </div>
    </MiniWindow>
  );
}

export function ChaosMock({ compact = false }: { compact?: boolean }) {
  const on = useLoopFlag(2600);
  const rows = [
    { icon: <Clock {...I} />, label: "Artificial Latency Delay:", v: on ? 2500 : 0, max: 10000, unit: " ms" },
    { icon: <TriangleAlert {...I} />, label: "Synthetic HTTP 429 Rate Limit:", v: on ? 25 : 0, max: 100, unit: "%" },
    { icon: <Zap {...I} />, label: "Synthetic HTTP 502 Upstream Failure:", v: on ? 10 : 0, max: 100, unit: "%" },
    { icon: <Columns2 {...I} />, label: "Malformed / Corrupted JSON Rate:", v: on ? 15 : 0, max: 100, unit: "%" },
  ];
  return (
    <MiniWindow title="Chaos Engineering Engine" icon={<Flame {...I} size={15} />} compact={compact}>
      <div className="space-y-4 p-4 text-[11px]">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-deck-line p-3">
          <div>
            <div className="font-semibold text-deck-fg">Global Chaos Fault Injection</div>
            <div className="mt-0.5 text-[10px] text-deck-muted">Probabilistically inject failures across all agent calls</div>
          </div>
          <Toggle on={on} />
        </div>
        {rows.map((r) => (
          <div key={r.label}>
            <div className="mb-2 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 text-deck-fg">
              {r.icon} <span>{r.label}</span>
              <span className="ml-auto font-semibold">{r.v}{r.unit}</span>
            </div>
            <div className="relative h-1 rounded-full bg-deck-raised">
              <div className="absolute inset-y-0 left-0 rounded-full bg-deck-fg transition-all duration-700" style={{ width: `${(r.v / r.max) * 100}%` }} />
              <div className="absolute -top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border border-deck bg-deck-fg transition-all duration-700" style={{ left: `${(r.v / r.max) * 100}%` }} />
            </div>
          </div>
        ))}
        <div className="flex justify-end gap-3 pt-1">
          <span className="px-2 py-1.5 text-deck-muted">Cancel</span>
          <Btn primary><ShieldCheck {...I} /> Arm Chaos Engine</Btn>
        </div>
      </div>
    </MiniWindow>
  );
}

const PALETTE = [
  { icon: Pause, label: "Pause Execution" },
  { icon: Clock, label: "Toggle Execution Timeline" },
  { icon: PauseCircle, label: "Toggle Breakpoints Interception" },
  { icon: GitCompare, label: "Open Run Diff Arena" },
  { icon: Flame, label: "Open Chaos Engineering Engine" },
  { icon: Download, label: "Export Trace (.trace.json)" },
];

export function PaletteMock({ highlight = 5, compact = false }: { highlight?: number; compact?: boolean }) {
  return (
    <div className={`window ${compact ? "phone-replica w-[360px]" : "w-[640px]"} text-left font-mono`}>
      <div className="flex items-center gap-2 border-b border-deck-line px-4 py-3 text-[12px] text-deck-muted">
        <Search {...I} size={15} />
        <span className="text-deck-fg">{compact ? "" : "export"}</span>
        <span className="h-3.5 w-px animate-pulse bg-deck-fg" />
        <span className="ml-auto rounded border border-deck-line px-1.5 text-[10px]">ESC</span>
      </div>
      <div className="flex gap-1.5 border-b border-deck-line px-4 py-2 text-[10px]">
        {["status:error", "event:tool", "cost:>0.10"].map((c) => (
          <span key={c} className="rounded border border-deck-line px-1.5 py-0.5 text-deck-muted">{c}</span>
        ))}
      </div>
      <ul className="p-2 text-[11.5px]">
        {PALETTE.map(({ icon: Ic, label }, i) => (
          <li key={label} className={`flex items-center gap-2.5 rounded-md px-3 py-2 ${i === highlight ? "bg-deck-raised text-deck-fg" : "text-deck-muted"}`}>
            <Ic {...I} /> {label}
            {i === highlight && <span className="ml-auto text-[10px] text-deck-dim">↵</span>}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-1.5 border-t border-deck-line px-4 py-2 text-[10px] text-deck-dim">
        <Command {...I} size={11} />K to open
        <History {...I} size={11} className="ml-auto" />
      </div>
    </div>
  );
}

export function DiffMini() {
  return (
    <div className="grid grid-cols-2 gap-2 break-words font-mono text-[10px]">
      {[["Spend Delta", "$0.000690", "$0.000000"], ["Latency Delta", "579ms", "13ms"]].map(([k, a, b]) => (
        <div key={k} className="rounded-lg border border-deck-line bg-deck-panel p-2.5">
          <div className="text-deck-muted">{k}</div>
          <div className="mt-1.5 flex flex-wrap items-center gap-1 text-deck-fg"><s className="text-deck-dim">{a}</s> → <b>{b}</b></div>
        </div>
      ))}
    </div>
  );
}
