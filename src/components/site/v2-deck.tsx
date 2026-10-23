import { motion } from "framer-motion";
import { Activity, Clock, Database, FileJson, FlaskConical, GitCompare, Layers, Pin, Play, Search, SlidersHorizontal, Target, X, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { ICON, useAccessibleMotion } from "./motion";

function Tag({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center gap-1 rounded border border-deck-line bg-deck-raised px-1.5 py-0.5 text-[10px] text-deck-muted">{children}</span>;
}

function WindowTitle({ title, icon }: { title: string; icon: ReactNode }) {
  return <div className="flex min-h-11 items-center gap-2 border-b border-deck-line bg-deck-panel px-3 py-2 text-xs font-semibold text-deck-fg">{icon}<span className="min-w-0">{title}</span><X {...ICON} size={13} className="ml-auto shrink-0 text-deck-dim" /></div>;
}

function IncidentNode({ tool = false, compact = false }: { tool?: boolean; compact?: boolean }) {
  return (
    <div className={`rounded-lg border bg-deck-panel ${tool ? "border-deck-muted" : "border-deck-fg"} ${compact ? "w-full min-w-0" : "w-[420px]"}`}>
      <div className="flex items-center justify-between border-b border-deck-line px-4 py-3 text-xs">
        <Tag>{tool ? <Database {...ICON} size={12} /> : <Activity {...ICON} size={12} />} sample-incident-agent</Tag>
        <Tag>{tool ? "TOOL" : "gpt-4o"}</Tag>
      </div>
      <p className="px-4 py-5 font-sans text-sm text-deck-fg">{tool ? 'Tool: database_metrics({"cluster":"prod-db-1"})' : "llm_call invocation"}</p>
      <div className="mx-4 flex justify-between border-t border-deck-line py-2 text-xs text-deck-muted"><span><b className="text-deck-fg">{tool ? "0" : "500"}</b> in → <b className="text-deck-fg">{tool ? "0" : "150"}</b> out</span><span>{tool ? "0 tok" : "~650 tok (est)"}</span></div>
      <div className="flex flex-wrap items-center gap-3 border-t border-deck-line px-4 py-3 text-xs text-deck-muted"><Clock {...ICON} size={13} /> {tool ? "200ms" : "400ms"}<b className="text-deck-fg">{tool ? "$0.00" : "$0.00275"}</b><span className="ml-auto flex gap-1">{!tool && <Tag><Pin {...ICON} size={10} /> Pin</Tag>}<Tag><Zap {...ICON} size={10} /> Critical</Tag></span></div>
    </div>
  );
}

function IncidentGraph({ compact = false }: { compact?: boolean }) {
  const reduce = useAccessibleMotion();
  return (
    <div className={`relative flex min-w-0 flex-1 flex-col items-center dot-grid ${compact ? "px-3 pb-6 pt-14" : "pt-16"}`}>
      <div className="absolute left-3 right-3 top-3 flex flex-wrap gap-2 text-[10px] text-deck-muted"><Tag>DAG: imported-via-rest</Tag><Tag>2 nodes</Tag>{!compact && <><Tag>ALL</Tag><Tag>PINNED (1)</Tag><Tag>Fit View</Tag><Tag>Critical Path</Tag></>}</div>
      <IncidentNode compact={compact} />
      <div className={`relative w-px border-l border-dashed border-deck-muted ${compact ? "h-10" : "h-24"}`}>
        {!reduce && <motion.span aria-hidden className="absolute -left-1 top-0 h-2 w-2 rounded-sm bg-deck-fg" animate={{ y: compact ? [0, 34] : [0, 90], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }} />}
      </div>
      <IncidentNode tool compact={compact} />
      {!compact && <div className="absolute bottom-4 right-4 space-y-2 border border-deck-line bg-deck-panel p-3"><div className="h-5 w-12 bg-deck-fg" /><div className="h-5 w-12 bg-deck-muted" /></div>}
    </div>
  );
}

function IncidentTimeline() {
  return <div className="border-t border-deck-line px-3 py-3 text-[10px] text-deck-muted"><div className="mb-3 flex gap-4"><b className="text-deck-fg">Timeline</b><span>2 events</span><span>400ms window</span></div>{["400ms", "200ms"].map((v, i) => <div key={v} className="mt-2 flex items-center gap-3"><span className="w-24 truncate">#{i + 1} sample-incident</span><Tag>CRITICAL</Tag><div className="h-2 flex-1 border border-deck-line bg-deck-panel"><div className={`${i ? "ml-[12%] w-1/2 bg-deck-muted" : "w-full bg-deck-fg"} h-full`} /></div><span className="w-10 text-right">{v}</span></div>)}</div>;
}

export function UpdatedFlightDeck({ compact = false }: { compact?: boolean }) {
  const runs = ["imported-via-rest", "Multi-Agent Research Pipeline", "Fault Tolerance Test Exp", "Prompt Optimization Matrix", "Biometric Auth Workflow", "API Intelligence Test Run", "Roundtrip Test Run v0.2.0"];
  return (
    <div role="img" aria-label="AetherTrace v0.2.0 Flight Deck with an OpenTelemetry agent trace, critical path and estimated usage" className={`window font-mono text-left ${compact ? "phone-replica w-[360px]" : "w-[1440px]"}`}>
      <div className="flex h-11 items-center gap-2 border-b border-deck-line px-3 text-[10px] text-deck-fg"><Activity {...ICON} size={14} /><b>AETHERTRACE</b><Tag>DEBUGGER</Tag>{compact ? <span className="ml-auto"><Tag>v0.2.0</Tag></span> : <><div className="ml-2 flex w-36 items-center gap-2 text-deck-dim"><Search {...ICON} size={12} /> Search or action...</div><Tag>COMPLETED</Tag><span>imported-via-rest</span><Tag>OTel</Tag><span className="text-deck-muted">650 tok · $0.0027</span><div className="ml-auto flex gap-1">{["Timeline", "Breakpoints", "Diff", "Studio", "Evaluate", "Chaos", "Shield", "Import", "Export"].map((t) => <Tag key={t}>{t}</Tag>)}<span className="inline-flex items-center gap-1 rounded bg-deck-fg px-2 py-1 font-semibold text-deck"><Play {...ICON} size={10} /> Simulate Run</span></div></>}</div>
      <div className={`flex ${compact ? "" : "h-[620px]"}`}>
        {!compact && <aside className="w-[240px] shrink-0 border-r border-deck-line p-3"><div className="mb-4 flex gap-2 text-xs text-deck-fg"><Layers {...ICON} size={13} /> RUNS <Tag>50</Tag></div><div className="mb-3 rounded border border-deck-line p-2 text-[10px] text-deck-dim">Filter runs (e.g. status:error)</div><div className="mb-3 flex gap-2 text-[9px] text-deck-muted">ALL · RUNNING · COMPLETED · FORK · REPLAY</div>{runs.map((r, i) => <div key={r} className={`mb-2 rounded border p-3 ${i ? "border-deck-line" : "border-deck-muted bg-deck-panel"}`}><div className="truncate text-[11px] font-semibold text-deck-fg">{r}</div><div className="mt-2 text-[9px] text-deck-dim">{i > 1 && i < 4 ? "Fork · Mutated" : "run_otel_a1b2c3…"}</div><div className="mt-2 flex justify-between border-t border-deck-line pt-2 text-[9px] text-deck-muted"><span>{i ? "1400 tok" : "650 tok"}</span><span>{i ? "" : "$0.002750"}</span></div></div>)}</aside>}
        <IncidentGraph compact={compact} />
        {!compact && <aside className="w-[320px] shrink-0 border-l border-deck-line"><WindowTitle title="SPAN INSPECTOR" icon={<Search {...ICON} size={13} />} /><div className="flex gap-3 border-b border-deck-line p-3 text-[10px] text-deck-muted"><span className="text-deck-fg">Overview</span><span>Intelligence</span><span>Fork IDE</span><span>JSON</span></div><div className="p-3"><div className="mb-3 flex items-center gap-2 rounded border border-deck-muted p-3 text-[10px] text-deck-fg"><Zap {...ICON} size={11} /> Critical Path Span <span className="ml-auto">400ms</span></div><dl className="space-y-4 border-y border-deck-line py-4 text-[10px]">{[["Span Type", "LLM_CALL"], ["Telemetry Source", "OpenTelemetry OTLP"], ["Agent Name", "sample-incident-agent"], ["Target Model", "gpt-4o"], ["Latency", "400ms"], ["Cost USD", "$0.002750 (estimated)"], ["Tokens", "650 (500 in / 150 out)"], ["Parent Span", "None (Root)"]].map(([k, v]) => <div key={k} className="flex justify-between gap-2"><dt className="text-deck-dim">{k}</dt><dd className="text-deck-fg">{v}</dd></div>)}</dl><div className="mt-4 rounded bg-deck-fg py-2 text-center text-[10px] font-semibold text-deck">Replay From Here ($0.00 Cache Hit)</div><div className="mt-2 rounded border border-deck-line p-2 text-center text-[10px] text-deck-muted">Set Breakpoint on sample-incident-agent</div></div></aside>}
      </div>
      <IncidentTimeline />
    </div>
  );
}

export function ExperimentMock({ compact = false }: { compact?: boolean }) {
  return <div role="img" aria-label="Experiment Studio with replay variants and prompt, model and tool mutations" className={`window font-mono text-left ${compact ? "phone-replica w-[360px]" : "w-[640px]"}`}>
    <WindowTitle title="Experiment Studio · Replay, Mutate & Evaluate" icon={<FlaskConical {...ICON} size={14} />} />
    <div className="flex flex-wrap items-center gap-2 border-b border-deck-line p-3 text-[10px] text-deck-muted"><span>Experiment:</span><Tag>Fault Tolerance Test Exp</Tag><span className="ml-auto">Variants & Mutations</span></div>
    <div className={compact ? "" : "grid grid-cols-[180px_1fr]"}>
      <div className={`p-3 ${compact ? "border-b" : "border-r"} border-deck-line`}><div className="mb-3 text-[10px] text-deck-dim">VARIANTS (2)</div><div className={compact ? "grid grid-cols-2 gap-2" : "space-y-2"}>{[["Valid Sibling", "completed"], ["Faulty Fork Target", "failed"]].map(([name, status], i) => <div key={name} className={`rounded border p-3 ${i ? "border-deck-line" : "border-deck-muted bg-deck-panel"}`}><div className="text-[11px] text-deck-fg">{name}</div><div className="mt-2"><Tag>{status}</Tag></div><div className="mt-2 text-[9px] text-deck-dim">mock_mutated</div></div>)}</div><div className="mt-4 text-[10px] text-deck-muted">+ Add Variant</div></div>
      <div className="space-y-4 p-3"><div className="flex items-center justify-between gap-2 border-b border-deck-line pb-3 text-[11px] text-deck-fg"><b>Valid Sibling</b><Tag><Play {...ICON} size={10} /> Replay Variant</Tag></div><div className="grid grid-cols-2 gap-3 text-[10px]"><div><div className="text-deck-dim">SOURCE RUN</div><div className="mt-1 text-deck-fg">Biometric Auth Workflow</div></div><div><div className="text-deck-dim">FORK SPAN</div><div className="mt-1 text-deck-fg">Root</div></div></div><div className="border-t border-deck-line pt-3"><div className="flex items-center gap-2 text-[11px] font-semibold text-deck-fg"><SlidersHorizontal {...ICON} size={12} /> MUTATIONS STUDIO</div><div className="my-3 rounded border border-dashed border-deck-line p-4 text-center text-[10px] leading-relaxed text-deck-dim">No mutations configured for this variant.</div><div className="text-[10px] text-deck-fg">Add Mutation to Variant</div><div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">{[["Mutation Type", "prompt"], ["Target Span ID", "e.g. span_123"], ["Target Field", "messages"], ["New Value", "Text or JSON"]].map(([k, v]) => <div key={k}><div className="mb-1 text-deck-dim">{k}</div><div className="rounded border border-deck-line bg-deck-panel p-2 text-deck-muted">{v}</div></div>)}</div></div></div>
    </div><div className="flex items-center justify-between border-t border-deck-line p-3 text-[10px] text-deck-dim"><span>Comparison Matrix · Replay History</span><Tag><Play {...ICON} size={10} /> Run All Variants</Tag></div>
  </div>;
}

export function EvaluationMock({ compact = false }: { compact?: boolean }) {
  const metrics = [["Spend", "$0.002750", "Model: $0.002750"], ["Wall Latency", "0.40s", "Critical Path: 0.60s"], ["Tokens", "650", "Prompt: 500 · Out: 150"], ["Reliability", "0 Errors", "Retries: 0"]];
  return <div role="img" aria-label="Evaluation Studio showing three passed assertions and cost, latency, tokens and reliability metrics" className={`window font-mono text-left ${compact ? "phone-replica w-[360px]" : "w-[640px]"}`}>
    <WindowTitle title="Evaluation & Optimization Studio" icon={<Target {...ICON} size={14} />} />
    <div className="flex flex-wrap gap-x-4 gap-y-2 border-b border-deck-line p-3 text-[10px] text-deck-muted"><span className="text-deck-fg">Overview & Metrics</span><span>Assertions 3/3</span><span>Root Cause & Errors</span><span>Optimization Signals 1</span></div>
    <div className="space-y-4 p-4"><div className="border-b border-deck-line pb-4"><div className="flex items-center gap-2 text-[10px] text-deck-dim">EVALUATION VERDICT <Tag>PASS</Tag></div><div className="mt-2 font-sans text-base font-semibold text-deck-fg">3 of 3 Assertions Passed <span className="font-mono text-[10px] font-normal text-deck-muted">(100.0%)</span></div></div><div className={`grid gap-3 ${compact ? "grid-cols-2" : "grid-cols-4"}`}>{metrics.map(([k, v, detail]) => <div key={k} className="border-l border-deck-line pl-3"><div className="text-[10px] text-deck-muted">{k}</div><div className="mt-2 text-sm font-bold text-deck-fg">{v}</div><div className="mt-2 text-[9px] text-deck-dim">{detail}</div></div>)}</div><div className="border-t border-deck-line pt-4"><div className="mb-3 text-[11px] text-deck-fg">Custom Assertion Rules (DSL)</div><pre className="overflow-hidden rounded border border-deck-line bg-deck-panel p-3 text-[11px] leading-relaxed text-deck-muted">{"status == completed\nerrors.count == 0\nretries.count <= 2\ncost <= $0.10\nduration <= 5000ms"}</pre></div><div className="flex items-center justify-between gap-2 text-[10px] text-deck-dim"><span>Evaluation History</span><span className="flex gap-2"><Tag><FileJson {...ICON} size={10} /> JSON</Tag><Tag>Markdown</Tag></span></div></div>
  </div>;
}

export function SemanticDiffMock({ compact = false }: { compact?: boolean }) {
  return <div role="img" aria-label="Diff Arena comparing the research pipeline and imported trace with cost, latency, lineage and provenance differences" className={`window font-mono text-left ${compact ? "phone-replica w-[360px]" : "w-[640px]"}`}>
    <WindowTitle title="DAG Diff Arena" icon={<GitCompare {...ICON} size={14} />} />
    <div className="flex flex-wrap justify-between gap-2 border-b border-deck-line p-3 text-[10px] text-deck-muted"><span>BASE: Multi-Agent Research Pipeline</span><span>TARGET: imported-via-rest</span></div><div className="p-4"><div className="grid grid-cols-2 gap-4 border-b border-deck-line pb-4 text-[10px]">{[["Spend Delta", "$0.042500 → $0.002750"], ["Latency Delta", "4700ms → 600ms"], ["Total Tokens", "3200 → 650"], ["Lineage", "0 Cached · 5 Diverged"]].map(([k, v]) => <div key={k}><div className="text-deck-dim">{k}</div><div className="mt-2 text-deck-fg">{v}</div></div>)}</div><div className="my-4 flex flex-wrap gap-2"><Tag>Git Differs</Tag><Tag>Lockfile Differs</Tag><Tag>Runtime Differs</Tag></div><div className="space-y-2 text-[10px]">{[["sample-incident-agent", "Modified Step"], ["agent_researcher", "Removed in Target"], ["sample-incident-agent", "Diverged Downstream"]].map(([agent, state], i) => <div key={i} className={`flex gap-2 rounded border border-deck-line bg-deck-panel p-3 text-deck-fg ${compact ? "flex-col items-start" : "justify-between"}`}><span>{agent}</span><Tag>{state}</Tag></div>)}</div><div className="mt-4 grid grid-cols-2 gap-3 text-[10px]">{[["Base Run", "gpt-4o-mini", '"tool": "Search Tool Retry 2"'], ["Target Run", "no-model", '"tool_name": "database_metrics"']].map(([name, model, body]) => <div key={name} className="min-w-0 border-t border-deck-line pt-3"><div className="text-deck-fg">{name}</div><div className="mt-2"><Tag>{model}</Tag></div><pre className="mt-3 whitespace-pre-wrap break-words bg-deck-panel p-2 leading-relaxed text-deck-muted">{`{\n ${body}\n}`}</pre></div>)}</div></div>
  </div>;
}