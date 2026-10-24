import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { useHydrated } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const REPO = "https://github.com/ZLouada/AetherTrace";
export const ICON = { strokeWidth: 1.75, size: 18 } as const;

export function useAccessibleMotion() {
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  return hydrated && reduced;
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useAccessibleMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Two-tone headline: pass the bold word(s) via `bold`. */
export function Headline({
  pre,
  bold,
  post,
  as: Tag = "h2",
  className = "headline-sm",
}: {
  pre?: string;
  bold: string;
  post?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag className={className}>
      {pre && <span>{pre} </span>}
      <span className="font-bold">{bold}</span>
      {post && <span> {post}</span>}
    </Tag>
  );
}

export function WordSwap({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const reduce = useAccessibleMotion();
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span className="relative inline-flex overflow-hidden align-bottom" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          className="inline-block font-bold"
          initial={reduce ? { opacity: 0 } : { y: "60%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={reduce ? { opacity: 0 } : { y: "-60%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[i]}.
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function CopyCommand({ dark = false }: { dark?: boolean }) {
  const [done, setDone] = useState(false);
  const cmd = "npx aethertrace start";
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cmd);
    } catch {
      /* ignore */
    }
    setDone(true);
    toast("Copied to clipboard", { description: cmd });
    setTimeout(() => setDone(false), 1800);
  };
  return (
    <Button
      type="button"
      variant="outline"
      onClick={copy}
      aria-label={`Copy command: ${cmd}`}
      className={`group inline-flex h-12 max-w-full items-center justify-center gap-2 sm:gap-3 rounded-md border pl-3 pr-2 font-mono text-xs sm:pl-5 sm:text-sm transition-colors ${
        dark
          ? "border-ink-line bg-ink text-ink-foreground hover:border-ink-muted"
          : "border-border bg-offwhite text-foreground hover:border-foreground/40"
      }`}
    >
      <span className={dark ? "text-ink-muted" : "text-muted-foreground"}>$</span>
      <span>{done ? "Copied to clipboard" : cmd}</span>
      <span
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm ${
          dark ? "bg-ink-foreground text-ink" : "bg-foreground text-background"
        }`}
      >
        {done ? <Check {...ICON} size={15} /> : <Copy {...ICON} size={15} />}
      </span>
    </Button>
  );
}

/** Renders children at a fixed design width and scales them to fit the container. */
export function Scaled({
  width,
  children,
  minScale = 0,
}: {
  width: number;
  children: ReactNode;
  minScale?: number;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(1);
  const [h, setH] = useState<number | undefined>(undefined);
  const [off, setOff] = useState(0);
  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const update = () => {
      const scale = Math.max(minScale, Math.min(1, o.clientWidth / width));
      setS(scale);
      setOff(Math.max(0, Math.floor((o.clientWidth - width * scale) / 2)));
      setH(i.offsetHeight * scale);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, [width, minScale]);
  return (
    <div ref={outer} className="relative w-full min-w-0 overflow-x-auto overflow-y-hidden overscroll-x-contain" style={{ height: h }}>
      <div style={{ width: width * s, height: h }} aria-hidden />
      <div
        ref={inner}
        style={{ width, left: off, transform: `scale(${s})`, transformOrigin: "top left" }}
        className="absolute top-0"

      >
        {children}
      </div>
    </div>
  );
}
