import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import type { CalculatorInputs } from "./calculatorUtils";
import { calculate } from "./calculatorUtils";
import { CalculatorForm } from "./CalculatorForm";
import { CalculatorResults } from "./CalculatorResults";

interface Props {
  onClose: () => void;
}

type View = "form" | "results";
type ResizeEdge = "left" | "right" | "top" | "bottom";
type PanelBox = { left: number; top: number; width: number; height: number };

export function SavingsCalculator({ onClose }: Props) {
  const [view, setView] = useState<View>("form");
  const [inputs, setInputs] = useState<CalculatorInputs | null>(null);
  const [panelBox, setPanelBox] = useState<PanelBox | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  function handleComplete(data: CalculatorInputs) {
    setInputs(data);
    setView("results");
  }

  function handleReset() {
    setInputs(null);
    setView("form");
  }

  function startResize(edge: ResizeEdge, event: ReactMouseEvent<HTMLDivElement>) {
    event.preventDefault();
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;

    const initialBox = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    const startX = event.clientX;
    const startY = event.clientY;
    const resize = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      const nextBox = { ...initialBox };

      if (edge === "left") {
        nextBox.left = Math.min(Math.max(24, initialBox.left + dx), initialBox.left + initialBox.width - 340);
        nextBox.width = initialBox.width + initialBox.left - nextBox.left;
      } else if (edge === "right") {
        nextBox.width = Math.min(Math.max(340, initialBox.width + dx), window.innerWidth - initialBox.left - 24);
      } else if (edge === "top") {
        nextBox.top = Math.min(Math.max(24, initialBox.top + dy), initialBox.top + initialBox.height - 420);
        nextBox.height = initialBox.height + initialBox.top - nextBox.top;
      } else {
        nextBox.height = Math.min(Math.max(420, initialBox.height + dy), window.innerHeight - initialBox.top - 24);
      }

      setPanelBox(nextBox);
    };
    const stopResize = () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResize);
    };

    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  }

  const results = inputs ? calculate(inputs) : null;

  return (
    <>
      <style>{`
        @keyframes calcSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .calc-panel {
          animation: calcSlideIn 0.3s cubic-bezier(0.34,1.2,0.64,1) both;
          /* Mobile default: full width with 8px margins */
          position: fixed;
          left: 8px;
          right: 8px;
          bottom: 88px;
          max-height: calc(100svh - 110px);
          z-index: 99;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 8px;
          background: oklch(0.14 0.04 158);
          border: 2px solid rgba(84, 222, 145, 0.65);
          box-shadow: 0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05);
          font-family: Arial, Helvetica, sans-serif;
        }
        .calc-panel input {
          min-height: 48px;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
        }
        .calc-panel input::placeholder { font-weight: 500; }
        .calc-panel button { min-height: 44px; font-size: 11px; font-weight: 800; }
        .calc-results, .calc-results * { font-weight: 800 !important; }
        .calc-panel .rounded-\[6px\], .calc-panel .rounded-\[8px\], .calc-panel .rounded-full { border-radius: 3px; }
        .calc-panel .border-white\/10, .calc-panel .border-white\/15, .calc-panel .border-white\/20 { border-width: 2px; }
        /* Desktop: right-anchored fixed width */
        @media (min-width: 540px) {
          .calc-panel {
            left: auto;
            right: 24px;
            width: 420px;
            min-width: 340px;
            min-height: 420px;
            max-width: calc(100vw - 48px);
          }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[98] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className="calc-panel"
        style={panelBox ? { left: `${panelBox.left}px`, top: `${panelBox.top}px`, right: "auto", bottom: "auto", width: `${panelBox.width}px`, height: `${panelBox.height}px` } : undefined}
        role="dialog"
        aria-modal="true"
        aria-label="Dual Fuel Savings Calculator"
      >
        <div role="separator" aria-label="Resize calculator from the left" aria-orientation="vertical" onMouseDown={(event) => startResize("left", event)} className="absolute inset-y-3 left-0 z-10 hidden w-3 cursor-ew-resize items-center justify-center sm:flex"><span className="h-14 w-px bg-[oklch(0.72_0.16_155)] opacity-70" /></div>
        <div role="separator" aria-label="Resize calculator from the right" aria-orientation="vertical" onMouseDown={(event) => startResize("right", event)} className="absolute inset-y-3 right-0 z-10 hidden w-3 cursor-ew-resize items-center justify-center sm:flex"><span className="h-14 w-px bg-[oklch(0.72_0.16_155)] opacity-70" /></div>
        <div role="separator" aria-label="Resize calculator from the top" aria-orientation="horizontal" onMouseDown={(event) => startResize("top", event)} className="absolute inset-x-3 top-0 z-10 hidden h-3 cursor-ns-resize items-center justify-center sm:flex"><span className="h-px w-14 bg-[oklch(0.72_0.16_155)] opacity-70" /></div>
        <div role="separator" aria-label="Resize calculator from the bottom" aria-orientation="horizontal" onMouseDown={(event) => startResize("bottom", event)} className="absolute inset-x-3 bottom-0 z-10 hidden h-3 cursor-ns-resize items-center justify-center sm:flex"><span className="h-px w-14 bg-[oklch(0.72_0.16_155)] opacity-70" /></div>
        {/* Header — fixed, never scrolls */}
        <div className="shrink-0 flex items-start justify-between gap-3 border-b-2 border-white/20 px-5 py-5">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" stroke="oklch(0.72 0.16 155)" strokeWidth="1.2" />
                <circle cx="7" cy="7" r="1.2" fill="oklch(0.72 0.16 155)" />
              </svg>
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[oklch(0.72_0.16_155)]">
                OM Solutions
              </span>
            </div>
            <h2 className="text-[16px] font-black uppercase tracking-[0.04em] text-white leading-tight">
              Dual Fuel Savings Calculator
            </h2>
            <p className="mt-1 text-[13px] font-medium text-white/75 leading-snug">
              Estimate the potential fuel savings for your engine.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close calculator"
            className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/45 text-white transition-colors hover:border-white hover:bg-white/10"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body — takes remaining height, children handle their own scroll */}
        <div style={{ flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {view === "form" && <CalculatorForm onComplete={handleComplete} />}
          {view === "results" && results && inputs && (
            <CalculatorResults inputs={inputs} results={results} onReset={handleReset} />
          )}
        </div>
      </div>
    </>
  );
}
