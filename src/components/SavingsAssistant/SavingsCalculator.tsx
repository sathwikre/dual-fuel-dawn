import { useState } from "react";
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

  function handleComplete(data: CalculatorInputs) {
    setInputs(data);
    setView("results");
  }

  function handleReset() {
    setInputs(null);
    setView("form");
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
          border-radius: 12px;
          background: oklch(0.14 0.04 158);
          border: 1px solid rgba(45,189,110,0.22);
          box-shadow: 0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05);
        }
        /* Desktop: right-anchored fixed width */
        @media (min-width: 540px) {
          .calc-panel {
            left: auto;
            right: 24px;
            width: 420px;
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
        className="calc-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Dual Fuel Savings Calculator"
      >
        {/* Header — fixed, never scrolls */}
        <div className="shrink-0 flex items-start justify-between gap-3 px-5 py-4 border-b border-white/8">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" stroke="oklch(0.72 0.16 155)" strokeWidth="1.2" />
                <circle cx="7" cy="7" r="1.2" fill="oklch(0.72 0.16 155)" />
              </svg>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[oklch(0.72_0.16_155)]">
                OM Solutions
              </span>
            </div>
            <h2 className="text-[13px] font-extrabold uppercase tracking-[0.05em] text-white leading-tight">
              Dual Fuel Savings Calculator
            </h2>
            <p className="mt-0.5 text-[11px] text-white/45 leading-snug">
              Estimate the potential fuel savings for your engine.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close calculator"
            className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors hover:border-white/30 hover:text-white"
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
