import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Coins,
  Database,
  Eye,
  FileDown,
  GitCompare,
  Github,
  Hourglass,
  Lock,
  Scale,
  ShieldOff,
  Shuffle,
  SquareTerminal,
  Command,
  CloudOff,
  ArrowUpRight,
  Radar,
  Target,
  Network,
  GitBranch,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { CopyCommand, Headline, ICON, REPO, Reveal, Scaled, WordSwap, useAccessibleMotion } from "@/components/site/motion";
import {
  BreakpointMock,
  ChaosMock,
  DiffMini,

  ForkMock,
  LoopMock,
  PaletteMock,
} from "@/components/site/deck";
import { EvaluationMock, ExperimentMock, SemanticDiffMock, UpdatedFlightDeck } from "@/components/site/v2-deck";

const DESC =
  "AetherTrace is the free, open-source, local-first debugger and experimentation platform for AI agents. Observe, intercept, replay, compare and evaluate agent execution.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AetherTrace | Wireshark for AI Agents" },
      { name: "description", content: DESC },
      { property: "og:title", content: "AetherTrace | Wireshark for AI Agents" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AetherTrace | Wireshark for AI Agents" },
      { name: "twitter:description", content: DESC },
    ],
  }),
  component: Index,
});

function GitHubButton({ dark = false, label = "GitHub" }: { dark?: boolean; label?: string }) {
  return (
    <a
      href={REPO}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors ${
        dark
          ? "border-ink-line text-ink-foreground hover:bg-ink-foreground hover:text-ink"
          : "border-border bg-background text-foreground hover:border-foreground"
      }`}
    >
      <Github {...ICON} size={16} /> {label}
    </a>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <nav className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 sm:flex sm:gap-8 md:px-8" aria-label="Main">
        <a href="#top" className="min-w-0 truncate font-mono text-base font-extrabold sm:text-lg">
          AETHERTRACE
        </a>
        <ul className="hidden gap-7 text-sm text-muted-foreground md:flex">
          <li><a className="hover:text-foreground" href="#features">Features</a></li>
          <li><a className="hover:text-foreground" href="#studios">Studios</a></li>
          <li><a className="hover:text-foreground" href="#integrations">Integrations</a></li>
          <li><a className="hover:text-foreground" href="#open-source">Open source</a></li>
        </ul>
        <a
          href={REPO}
          target="_blank"
          rel="noreferrer"
          className="ml-auto inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85"
        >
          <Github {...ICON} size={15} /> GitHub
        </a>
      </nav>
    </header>
  );
}

function Wordmark({ dark = false }: { dark?: boolean }) {
  const reduce = useAccessibleMotion();
  const wordmark = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const element = wordmark.current;
    if (!element) return;
    const fit = () => {
      const size = parseFloat(getComputedStyle(element).fontSize);
      const lettersWidth = Array.from(element.children).reduce((total, letter) => total + letter.getBoundingClientRect().width, 0);
      if (lettersWidth > 0) element.style.fontSize = `${size * element.clientWidth / lettersWidth * 0.995}px`;
    };
    const observer = new ResizeObserver(fit);
    observer.observe(element);
    void document.fonts.ready.then(fit);
    return () => observer.disconnect();
  }, []);
  return (
    <p ref={wordmark} aria-label="AetherTrace" className={`wordmark select-none whitespace-nowrap ${dark ? "text-ink-foreground" : "text-foreground"}`}>
      {"AETHERTRACE".split("").map((c, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: "40%", filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          whileHover={reduce ? {} : { y: "-8%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          {c}
        </motion.span>
      ))}
    </p>
  );
}

function Hero() {
  const reduce = useAccessibleMotion();
  const { scrollYProgress } = useScroll();
  const lift = useTransform(scrollYProgress, [0, 0.15], [0, -60]);
  return (
    <section id="top" className="overflow-hidden bg-background pb-14 pt-8 sm:pb-24 sm:pt-12 md:pt-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Wordmark />
        <Reveal delay={0.05}>
          <p className="label-mono mt-7 flex flex-wrap items-center gap-3 text-muted-foreground sm:mt-8"><span className="border border-foreground px-2 py-1 text-foreground">v0.2.0</span> Wireshark for AI agents</p>
          <h1 className="headline-sm mt-5 max-w-5xl">
            The local debugger <span className="font-bold">for AI agents.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg md:text-xl">{DESC}</p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
            <CopyCommand />
            <GitHubButton label="View on GitHub" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2 font-mono sm:mt-6 text-xs text-muted-foreground">
            <span className="whitespace-nowrap rounded-full border border-border px-2 py-1">MIT</span>
            <span className="whitespace-nowrap rounded-full border border-border px-2 py-1">Free & open source</span>
            <span className="whitespace-nowrap rounded-full border border-border px-2 py-1">Local-first</span>
          </div>
        </Reveal>
      </div>
      <div className="mx-auto mt-8 max-w-[1340px] sm:mt-16 px-3 md:px-8" style={{ perspective: 1800 }}>
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, rotateX: 22, y: 60, scale: 0.94 }}
          animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "50% 0%", y: reduce ? 0 : lift }}
        >
          <div className="sm:hidden">
            <Scaled width={360}>
              <UpdatedFlightDeck compact />
            </Scaled>
          </div>
          <div className="hidden sm:block">
            <Scaled width={1440} minScale={0.42}>
              <UpdatedFlightDeck />
            </Scaled>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

const PROBLEMS = [
  { icon: Coins, t: "Runaway token costs", d: "Agents stuck in loops burn money before anyone notices." },
  { icon: Shuffle, t: "Hard-to-reproduce failures", d: "Logs alone do not capture execution state, ancestry or the environment." },
  { icon: ShieldOff, t: "Sensitive agent data", d: "Prompts and tool results can contain secrets that should not end up in telemetry." },
  { icon: FileDown, t: "Changes without evidence", d: "A new prompt is not an improvement until you compare and evaluate the result." },
];

function Problem() {
  return (
    <section className="bg-offwhite py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="label-mono text-muted-foreground">The problem</p>
          <Headline pre="Multi-agent" bold="spaghetti." className="headline-sm mt-5" />
        </Reveal>
        <div className="mt-8 grid sm:mt-16 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.06}>
              <article className="card-surface h-full p-7">
                <p.icon {...ICON} size={22} />
                <h3 className="mt-10 text-lg font-semibold tracking-tight">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuiltFor() {
  return (
    <section className="border-b border-border bg-background py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
        <Reveal>
          <h2 className="headline-sm">
            Built for <WordSwap words={["AI Engineers", "Agent Builders", "Open Source"]} />
          </h2>
        </Reveal>
      </div>
    </section>
  );
}

const PILLARS = [
  { icon: Eye, t: "Observe", d: "Trace agents, models, tools, retries, HTTP requests and errors in a live DAG." },
  { icon: Radar, t: "Intercept", d: "Pause execution, inspect state, mutate prompts and mock tool responses." },
  { icon: Hourglass, t: "Replay", d: "Fork runs and reuse cached execution prefixes for controlled experiments." },
  { icon: GitCompare, t: "Compare", d: "Align spans semantically to reveal changes in behavior, cost and latency." },
  { icon: Target, t: "Evaluate", d: "Check reliability, tokens and topology with structured assertions." },
  { icon: Network, t: "Optimize", d: "Find cost hotspots, critical paths, retry chains and prompt bloat." },
];

function Pillars() {
  return (
    <section id="features" className="bg-offwhite py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="headline-sm max-w-4xl">
            Understand. Experiment. Evaluate. <span className="font-bold">One workstation.</span>
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-x-8 sm:mt-12 sm:grid-cols-2 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.08}>
              <div className="flex h-full flex-col border-t border-border py-7">
                <span className="inline-flex h-8 w-8 items-center justify-center">
                  <p.icon {...ICON} size={22} />
                </span>
                <h3 className="mt-4 text-2xl font-bold">{p.t}</h3>
                <p className="mt-2 text-muted-foreground">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Feature({
  i,
  label,
  pre,
  bold,
  body,
  mock,
  width = 640,
  mobileMock,
}: {
  i: number;
  label: string;
  pre: string;
  bold: string;
  body: string;
  mock: ReactNode;
  width?: number;
  mobileMock?: ReactNode;
}) {
  const flip = i % 2 === 1;
  return (
    <section className={`${i % 2 ? "bg-offwhite" : "bg-background"} py-16 sm:py-20 md:py-24`}>
      <div className="mx-auto grid max-w-7xl min-w-0 items-center gap-8 sm:gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className={flip ? "min-w-0 lg:order-2" : "min-w-0"}>
          <p className="label-mono text-muted-foreground">{String(i + 1).padStart(2, "0")} / {label}</p>
          <h2 className="mt-5 text-4xl font-light leading-[1.08] sm:text-5xl lg:text-6xl">
            {pre} <span className="font-bold">{bold}</span>
          </h2>
          <p className="mt-5 max-w-lg text-base sm:mt-6 sm:text-lg leading-relaxed text-muted-foreground">{body}</p>
        </Reveal>
        <Reveal delay={0.1} className={flip ? "min-w-0 lg:order-1" : "min-w-0"}>
          {mobileMock && <div className="sm:hidden"><Scaled width={360}>{mobileMock}</Scaled></div>}
          <div className={mobileMock ? "hidden sm:block" : ""}><Scaled width={width}>
            {mock}
          </Scaled></div>
        </Reveal>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    label: "Visual debugging",
    pre: "Follow every step.",
    bold: "Find the failure.",
    body: "Navigate the live DAG and timeline, pin important spans and aggregate selected metrics. Follow retry chains, critical paths and causal relationships back to the source.",
    mock: <LoopMock />,
    mobileMock: <LoopMock compact />,
  },
  {
    label: "Time travel",
    pre: "Rewind and fork",
    bold: "with context intact.",
    body: "Fork a previous execution while preserving lineage and provenance. Reuse cached prefixes where available. Choose cache-only, safe or live replay; live replay requires explicit confirmation.",
    mock: <ForkMock />,
    mobileMock: <ForkMock compact />,
  },
  {
    label: "Breakpoints",
    pre: "Pause and edit",
    bold: "thoughts mid-flight.",
    body: "Live breakpoints pause matching requests for inspection. Mutate prompts, tool arguments or mock responses before resuming. Conditional expressions run without arbitrary JavaScript evaluation.",
    mock: <BreakpointMock />,
    mobileMock: <BreakpointMock compact />,
  },
  {
    label: "Chaos engine",
    pre: "Break your agents",
    bold: "before production.",
    body: "Inject synthetic 429 rate limits, 502 upstream crashes, latency delays and malformed JSON.",
    mock: <ChaosMock />,
    mobileMock: <ChaosMock compact />,
  },
  {
    label: "Trace bundles",
    pre: "Share bugs like",
    bold: "Wireshark packets.",
    body: "Export runs as portable .trace.json bundles and import them into another Flight Deck. Preserve lineage, provenance and replay context. Existing v0.1.0 traces remain compatible.",
    mock: <PaletteMock />,
    mobileMock: <PaletteMock compact />,
  },
];

function Studios() {
  return <div id="studios">
    <section className="border-y border-border bg-ink py-14 text-ink-foreground sm:py-20"><div className="mx-auto max-w-7xl px-5 md:px-8"><Reveal><p className="label-mono text-ink-muted">New in v0.2.0</p><h2 className="headline-sm mt-5 max-w-4xl">From debugging to <span className="font-bold">verified experiments.</span></h2><p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">Change a prompt. Try another model. Replay the variant. Compare what changed and evaluate what improved.</p></Reveal></div></section>
    <Feature i={5} label="Experiment Studio" pre="One run." bold="Multiple possibilities." body="Create persistent experiments from existing traces. Mutate prompts, models, tool arguments or mock responses, batch-replay variants and preserve their ancestry. Review replay history and send results to Diff Arena." mock={<ExperimentMock />} mobileMock={<ExperimentMock compact />} />
    <Feature i={6} label="Evaluation Studio" pre="Better agents." bold="Concrete evidence." body="Evaluate cost, latency, tokens, reliability and execution topology with safe, structured assertions. Inspect error clusters and root causes, review optimization signals and export redacted JSON or Markdown reports." mock={<EvaluationMock />} mobileMock={<EvaluationMock compact />} />
    <Feature i={7} label="Semantic Diff Arena" pre="Not just different JSON." bold="Different behavior." body="Align executions semantically to compare tool calls, models, retries and graph structure. See cost and latency deltas alongside lineage and provenance differences before deciding whether a change is a regression." mock={<SemanticDiffMock />} mobileMock={<SemanticDiffMock compact />} />
  </div>;
}

function SmallCards() {
  const cards = [
    { icon: Scale, t: "Diff Arena", d: "Compare two runs side by side.", extra: <DiffMini /> },
    {
      icon: SquareTerminal,
      t: "Regression checks",
      d: "Compare runs and check structured assertions.",
      extra: (
        <div className="rounded-lg border border-deck-line bg-deck-panel p-3 font-mono text-[11px] text-deck-fg">
          <span className="text-deck-dim">$</span> aethertrace assert
        </div>
      ),
    },
    {
      icon: Command,
      t: "Command palette",
      d: "Search runs, spans, tools, models and saved queries.",
      extra: (
        <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
          {["status:error", "event:tool", "cost:>0.10"].map((c) => (
            <span key={c} className="rounded border border-deck-line px-1.5 py-0.5 text-deck-muted">{c}</span>
          ))}
        </div>
      ),
    },
  ];
  return (
    <section className="bg-background py-16 sm:py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-3 md:px-8">
        {cards.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.06} className="min-w-0">
            <article className="flex h-full flex-col border-t border-border py-7">
              <div className="flex items-center gap-2">
                <c.icon {...ICON} />
                <h3 className="font-semibold tracking-tight">{c.t}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
              <div className="mt-6 rounded-lg bg-deck p-3">{c.extra}</div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", t: "Start the proxy and Flight Deck", code: "npx aethertrace start" },
  { n: "02", t: "Point your SDK baseURL at the proxy", code: 'baseURL: "http://localhost:4000/v1"', note: "Works with OpenAI, Anthropic, Ollama or local models." },
  { n: "03", t: "Open the Flight Deck", code: "http://localhost:3000" },
];

function HowItWorks() {
  return (
    <section id="how" className="bg-ink py-16 text-ink-foreground sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="label-mono text-ink-muted">How it works</p>
          <Headline pre="Start local." bold="Trace your first run." className="headline-sm mt-5" />
        </Reveal>
        <ol className="mt-8 grid sm:mt-16 gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <li className="card-ink flex h-full flex-col p-7 font-mono">
                <span className="text-sm text-muted-foreground">{s.n}</span>
                <h3 className="mt-8 font-sans text-xl font-semibold tracking-tight">{s.t}</h3>
                <code className="mt-5 block break-words rounded-xl bg-offwhite px-3 py-3 text-xs sm:px-4 sm:text-[13px]">{s.code}</code>
                {s.note && <p className="mt-3 text-xs text-muted-foreground">{s.note}</p>}
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <p className="mt-10 font-mono text-sm text-ink-muted">
            Optional: <span className="text-ink-foreground">npx aethertrace sim</span> dispatches a 5-agent DAG simulation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function WorksWith() {
  const items = ["OpenTelemetry", "LangChain", "LangGraph", "TypeScript", "Python", "OpenAI", "Anthropic", "Ollama"];
  return (
    <section id="integrations" className="border-b border-border bg-background py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="label-mono text-muted-foreground">Integrate your stack</p>
        <h2 className="headline-sm mt-5 max-w-4xl">Your agents. Your telemetry. <span className="font-bold">One local view.</span></h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">{[
          { icon: Network, title: "OpenTelemetry", body: "Import OTLP/HTTP Protobuf-JSON traces and map GenAI attributes into native agent events. Imported telemetry is redacted before storage.", code: "POST /v1/traces" },
          { icon: GitBranch, title: "LangChain & LangGraph", body: "TypeScript and Python callback handlers preserve parent-child relationships across LLM, tool and chain execution.", code: "LLM · TOOL · CHAIN" },
          { icon: SquareTerminal, title: "SDK instrumentation", body: "Wrap OpenAI calls, tools and agents. Context propagation preserves ancestry across nested TypeScript and Python execution.", code: "wrapOpenAI · wrapTool · wrapAgent" },
        ].map(({ icon: Icon, title, body, code }) => <article key={title} className="min-w-0 border-t border-border py-6"><Icon {...ICON} /><h3 className="mt-4 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p><code className="mt-5 block break-words font-mono text-xs">{code}</code></article>)}</div>
        <ul className="sr-only">{items.map((t) => <li key={t}>{t}</li>)}</ul>
        <div aria-hidden className="mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee flex w-max gap-14 text-3xl font-light tracking-tight md:text-6xl">
            {[...items, ...items].map((t, i) => (
              <span key={i} className="text-muted-foreground transition-colors hover:text-foreground">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LocalFirst() {
  const pts = [
    { icon: Database, t: "SQLite (WAL) on your machine", d: "Everything lives locally in .trace.sqlite." },
    { icon: CloudOff, t: "No cloud account required", d: "Run locally or in a developer-controlled environment. Docker support includes persistent storage and healthchecks." },
    { icon: Lock, t: "MIT licensed", d: "100% free and open source. No subscription or hosted backend required." },
    { icon: ShieldCheck, t: "Security built in", d: "Recursive secret redaction, SSRF protection and a security audit trail. Search and exported reports are scrubbed." },
    { icon: GitBranch, t: "Reproducibility with provenance", d: "Capture Git, source, dependency and environment context. See warnings when the conditions for reproduction change." },
    { icon: Hourglass, t: "Replay with guardrails", d: "Distinguish pure, read-only, mutating and unknown tools. Mutating tools can be mocked; live replay requires confirmation." },
  ];
  return (
    <section id="open-source" className="bg-offwhite py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="label-mono mb-5 text-muted-foreground">Local-first by design</p>
          <Headline pre="Your traces." bold="Your workstation." className="headline-sm max-w-4xl" />
        </Reveal>
        <div className="mt-8 grid sm:mt-16 gap-5 md:grid-cols-3">
          {pts.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.06}>
              <div className="card-surface h-full p-7">
                <p.icon {...ICON} size={22} />
                <h3 className="mt-8 text-lg font-semibold tracking-tight">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-ink py-20 text-ink-foreground sm:py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
        <Reveal>
          <h2 className="headline mx-auto max-w-5xl">
            Understand every step. <span className="font-bold">Verify every change.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center">
            <CopyCommand dark />
            <GitHubButton dark />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink-line bg-ink text-ink-muted">
      <div className="mx-auto max-w-7xl overflow-hidden px-5 pt-16 md:px-8">
        <Wordmark dark />
      </div>
      <div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 sm:flex sm:flex-wrap sm:items-center sm:gap-6 font-mono text-xs md:px-8">
        <span className="font-bold tracking-wider text-ink-foreground">AETHERTRACE</span>
        <nav className="flex flex-wrap gap-x-5 gap-y-1 sm:ml-auto sm:gap-6" aria-label="Footer">
          <a className="inline-flex min-h-11 items-center hover:text-ink-foreground" href={`${REPO}/blob/main/LICENSE`} target="_blank" rel="noreferrer">MIT license</a>
          <a className="inline-flex items-center gap-1 inline-flex min-h-11 items-center hover:text-ink-foreground" href={REPO} target="_blank" rel="noreferrer">GitHub <ArrowUpRight {...ICON} size={12} /></a>
          <a className="inline-flex min-h-11 items-center hover:text-ink-foreground" href={`${REPO}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noreferrer">Contributing</a>
        </nav>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <BuiltFor />
        <Pillars />
        {FEATURES.map((f, i) => (
          <Feature key={f.label} i={i} {...f} />
        ))}
        <Studios />
        <SmallCards />
        <HowItWorks />
        <WorksWith />
        <LocalFirst />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
