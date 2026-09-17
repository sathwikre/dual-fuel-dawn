import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import type { CalculatorInputs } from "./calculatorUtils";
import { calculate } from "./calculatorUtils";
import { CalculatorForm } from "./CalculatorForm";
import { CalculatorResults } from "./CalculatorResults";

interface Props {
  onClose: () => void;
}

type View = "form" | "results";

export function SavingsCalculator({ onClose }: Props) {
  const [view, setView] = useState<View>("form");
  const [inputs, setInputs] = useState<CalculatorInputs | null>(null);
  const [panelWidth, setPanelWidth] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  function handleComplete(data: CalculatorInputs) {
    setInputs(data);
    setView("results");
  }

  function handleReset() {
    setInputs(null);
    setView("form");
  }

  function startResize(event: ReactMouseEvent<HTMLDivElement>) {
    const initialWidth = panelRef.current?.getBoundingClientRect().width;
    if (!initialWidth) return;

    const startX = event.clientX;
    const resize = (moveEvent: MouseEvent) => {
      const nextWidth = Math.min(Math.max(initialWidth + startX - moveEvent.clientX, 340), window.innerWidth - 48);
      setPanelWidth(nextWidth);
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
        style={panelWidth ? { width: `${panelWidth}px` } : undefined}
        role="dialog"
        aria-modal="true"
        aria-label="Dual Fuel Savings Calculator"
      >
        <div
          role="separator"
          aria-label="Drag to resize calculator"
          aria-orientation="vertical"
          onMouseDown={startResize}
          className="absolute inset-y-0 left-0 z-10 hidden w-3 cursor-ew-resize items-center justify-center sm:flex"
        >
          <span className="h-14 w-px bg-[oklch(0.72_0.16_155)] opacity-70 transition-all hover:h-24 hover:w-0.5 hover:opacity-100" />
        </div>
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
