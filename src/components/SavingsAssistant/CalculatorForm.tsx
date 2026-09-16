import { useState } from "react";
import type { CalculatorInputs } from "./calculatorUtils";
import { validateStep } from "./calculatorUtils";
import { CalculatorProgress } from "./CalculatorProgress";

interface Props {
  onComplete: (inputs: CalculatorInputs) => void;
}

const TOTAL_STEPS = 3;

const defaultInputs: CalculatorInputs = {
  gensetRating:  0,
  load:          0,
  altFuelType:   "NG",
  hoursPerMonth: 40,
  dieselPrice:   0,
  ngPrice:       0,
};

const stepMessages: Record<number, { greeting: string; question: string }> = {
  1: {
    greeting: "Let's calculate your dual-fuel savings.",
    question: "Tell me about your genset.",
  },
  2: {
    greeting: "Good.",
    question: "How many hours per month does it operate?",
  },
  3: {
    greeting: "Almost there.",
    question: "What are the current fuel prices?",
  },
};

const labelClass = "block mb-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-white";
const unitBadge  = "px-3 py-3 text-[12px] font-bold text-white border-l-2 border-white/25 bg-white/10 whitespace-nowrap";
const inputBase  = "flex-1 bg-white/5 px-4 py-3 text-base font-bold text-white outline-none placeholder:text-white/45";
const rowClass   = "flex overflow-hidden border-2 border-white/35 focus-within:border-[oklch(0.72_0.16_155)] focus-within:ring-2 focus-within:ring-[oklch(0.72_0.16_155/0.25)] transition-colors";

export function CalculatorForm({ onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
    setError(null);
  }

  function next() {
    const err = validateStep(step, inputs);
    if (err) { setError(err); return; }
    if (step === TOTAL_STEPS) {
      onComplete(inputs);
    } else {
      setStep((s) => s + 1);
      setError(null);
    }
  }

  function back() {
    if (step > 1) { setStep((s) => s - 1); setError(null); }
  }

  const msg = stepMessages[step];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <CalculatorProgress currentStep={step} totalSteps={TOTAL_STEPS} />

      <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }} className="px-5 py-4">
        {/* Prompt */}
        <div className="mb-5">
          <p className="text-[15px] font-extrabold text-[oklch(0.72_0.16_155)]">{msg?.greeting ?? ""}</p>
          <p className="mt-1 text-[16px] font-semibold text-white">{msg?.question ?? ""}</p>
        </div>

        {/* ── Step 1: Genset Rating + Load + Fuel ── */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Genset Rating</label>
              <div className={rowClass}>
                <input autoFocus type="number" min={1} placeholder="e.g. 500"
                  value={inputs.gensetRating || ""}
                  onChange={(e) => set("gensetRating", parseFloat(e.target.value) || 0)}
                  className={inputBase} onKeyDown={(e) => e.key === "Enter" && next()} />
                <span className={unitBadge}>kVA</span>
              </div>
            </div>
            <div>
              <label className={labelClass}>Load %</label>
              <div className={rowClass}>
                <input type="number" min={1} max={100} placeholder="e.g. 75"
                  value={inputs.load || ""}
                  onChange={(e) => set("load", parseFloat(e.target.value) || 0)}
                  className={inputBase} onKeyDown={(e) => e.key === "Enter" && next()} />
                <span className={unitBadge}>%</span>
              </div>
            </div>
            <div>
              <label className={labelClass}>Alternative Fuel</label>
              <div className="rounded-[6px] border border-[oklch(0.72_0.16_155)/0.5] bg-[oklch(0.72_0.16_155/0.1)] px-4 py-3 flex items-center justify-between">
                <span className="text-sm font-bold text-[oklch(0.72_0.16_155)]">NG</span>
                <span className="font-mono text-[9px] text-white/35 uppercase tracking-[0.1em]">Natural Gas</span>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Operating Hours ── */}
        {step === 2 && (
          <div>
            <label className={labelClass}>Hours of Operation / Month</label>
            <div className={rowClass}>
              <input autoFocus type="number" min={1} placeholder="e.g. 40"
                value={inputs.hoursPerMonth || ""}
                onChange={(e) => set("hoursPerMonth", parseFloat(e.target.value) || 0)}
                className={inputBase} onKeyDown={(e) => e.key === "Enter" && next()} />
              <span className={unitBadge}>hours / month</span>
            </div>
            <p className="mt-2 text-[11px] text-white/35">
              Total hours the genset runs per month during dual-fuel operation.
            </p>
          </div>
        )}

        {/* ── Step 3: Fuel Prices ── */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Diesel Price</label>
              <div className={rowClass}>
                <span className="px-3 py-2.5 font-mono text-[13px] text-white/55 border-r border-white/10 bg-white/5">₹</span>
                <input autoFocus type="number" min={1} step={0.5} placeholder="e.g. 94"
                  value={inputs.dieselPrice || ""}
                  onChange={(e) => set("dieselPrice", parseFloat(e.target.value) || 0)}
                  className={inputBase} onKeyDown={(e) => e.key === "Enter" && next()} />
                <span className={unitBadge}>₹ / L</span>
              </div>
            </div>
            <div>
              <label className={labelClass}>NG Price</label>
              <div className={rowClass}>
                <span className="px-3 py-2.5 font-mono text-[13px] text-white/55 border-r border-white/10 bg-white/5">₹</span>
                <input type="number" min={1} step={0.5} placeholder="e.g. 85"
                  value={inputs.ngPrice || ""}
                  onChange={(e) => set("ngPrice", parseFloat(e.target.value) || 0)}
                  className={inputBase} onKeyDown={(e) => e.key === "Enter" && next()} />
                <span className={unitBadge}>₹ / Sm³</span>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="mt-3 border-2 border-[oklch(0.64_0.18_28/0.65)] bg-[oklch(0.64_0.18_28/0.15)] px-3 py-3 text-[13px] font-bold text-[oklch(0.82_0.16_28)]">
            {error}
          </p>
        )}
      </div>

      {/* Navigation */}
      <div className="shrink-0 border-t-2 border-white/20 px-5 py-4 flex items-center gap-3">
        {step > 1 && (
          <button type="button" onClick={back}
            className="flex h-11 items-center gap-1.5 border-2 border-white/45 px-4 text-[11px] font-extrabold uppercase tracking-[0.08em] text-white transition-colors hover:border-white hover:bg-white/10">
            ← Back
          </button>
        )}
        <button type="button" onClick={next}
          className="flex-1 h-11 bg-[oklch(0.72_0.16_155)] text-[oklch(0.19_0.045_158)] text-[11px] font-black uppercase tracking-[0.1em] transition-colors hover:bg-white">
          {step === TOTAL_STEPS ? "Calculate My Savings →" : "Continue →"}
        </button>
      </div>
    </div>
  );
}
