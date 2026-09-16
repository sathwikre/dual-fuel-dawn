import { useState } from "react";
import type { CalculatorInputs, AltFuelType } from "./calculatorUtils";
import { altFuelUnit, altFuelPriceUnit, validateStep } from "./calculatorUtils";
import { CalculatorProgress } from "./CalculatorProgress";

interface Props {
  onComplete: (inputs: CalculatorInputs) => void;
}

const TOTAL_STEPS = 7;

const defaultInputs: CalculatorInputs = {
  gensetRating: 0,
  load: 0,
  altFuelType: "PNG",
  hoursPerMonth: 40,
  dieselPrice: 0,
  lpgPrice: 0,
  pngPrice: 0,
  dieselConsumption: 0,
  dfDieselConsumption: 0,
  dfAltFuelConsumption: 0,
};

const stepMessages: Record<number, { greeting: string; question: string }> = {
  1: {
    greeting: "Let's calculate your operating economics.",
    question: "Tell me about your genset.",
  },
  2: {
    greeting: "Good.",
    question: "Which alternative fuel are you considering?",
  },
  3: {
    greeting: "Got it.",
    question: "How many hours per month does the genset operate?",
  },
  4: {
    greeting: "Perfect.",
    question: "What are the current fuel prices?",
  },
  5: {
    greeting: "Almost there.",
    question: "What is the diesel consumption in diesel-only mode?",
  },
  6: {
    greeting: "Good.",
    question: "What is the diesel consumption in dual-fuel mode?",
  },
  7: {
    greeting: "One last thing.",
    question: "What is the alternative fuel consumption in dual-fuel mode?",
  },
};

const labelClass = "block mb-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white/65";
const unitBadge  = "px-2.5 py-2.5 font-mono text-[11px] font-semibold text-white/70 border border-white/10 rounded-r-[6px] bg-white/5 whitespace-nowrap";
const inputClass = "flex-1 bg-white/5 px-3 py-2.5 text-sm font-semibold text-white outline-none placeholder:font-normal placeholder:text-white/30";
const rowClass   = "flex overflow-hidden rounded-[6px] border border-white/15 focus-within:border-[oklch(0.72_0.16_155)] transition-colors";

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
          <p className="text-[13px] font-semibold text-[oklch(0.72_0.16_155)]">{msg?.greeting ?? ""}</p>
          <p className="mt-1 text-sm font-semibold text-white/85">{msg?.question ?? ""}</p>
        </div>

        {/* ── Step 1: Genset Rating + Load ── */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Genset Rating</label>
              <div className={rowClass}>
                <input autoFocus type="number" min={1} placeholder="e.g. 500"
                  value={inputs.gensetRating || ""}
                  onChange={(e) => set("gensetRating", parseFloat(e.target.value) || 0)}
                  className={inputClass} onKeyDown={(e) => e.key === "Enter" && next()} />
                <span className={unitBadge}>kVA</span>
              </div>
            </div>
            <div>
              <label className={labelClass}>Load</label>
              <div className={rowClass}>
                <input type="number" min={1} max={100} placeholder="e.g. 75"
                  value={inputs.load || ""}
                  onChange={(e) => set("load", parseFloat(e.target.value) || 0)}
                  className={inputClass} onKeyDown={(e) => e.key === "Enter" && next()} />
                <span className={unitBadge}>%</span>
              </div>
              <p className="mt-2 text-[11px] font-medium text-white/45">Operating load as a percentage of genset rating.</p>
            </div>
          </div>
        )}

        {/* ── Step 2: Alternative Fuel Type ── */}
        {step === 2 && (
          <div>
            <label className={labelClass}>Alternative Fuel</label>
            <div className="grid grid-cols-2 gap-3 mt-1">
              {(["PNG", "LPG"] as AltFuelType[]).map((f) => (
                <button key={f} type="button" onClick={() => set("altFuelType", f)}
                  className={`rounded-[6px] border py-3.5 text-sm font-bold transition-all ${
                    inputs.altFuelType === f
                      ? "border-[oklch(0.72_0.16_155)] bg-[oklch(0.72_0.16_155/0.12)] text-[oklch(0.72_0.16_155)]"
                      : "border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="mt-3 rounded-[6px] bg-white/4 px-3 py-2.5">
              <p className="text-[11px] text-white/50 leading-relaxed">
                {inputs.altFuelType === "PNG"
                  ? "Piped Natural Gas — consumption measured in Sm³/hr, price in ₹/Sm³."
                  : "Liquefied Petroleum Gas — consumption measured in kg/hr, price in ₹/kg."}
              </p>
            </div>
          </div>
        )}

        {/* ── Step 3: Operating Hours / Month ── */}
        {step === 3 && (
          <div>
            <label className={labelClass}>Hours of Operation / Month</label>
            <div className={rowClass}>
              <input autoFocus type="number" min={1} placeholder="e.g. 40"
                value={inputs.hoursPerMonth || ""}
                onChange={(e) => set("hoursPerMonth", parseFloat(e.target.value) || 0)}
                className={inputClass} onKeyDown={(e) => e.key === "Enter" && next()} />
              <span className={unitBadge}>Hours</span>
            </div>
            <p className="mt-2 text-[11px] text-white/35">
              Total hours the genset runs in dual-fuel mode per month.
            </p>
          </div>
        )}

        {/* ── Step 4: Fuel Prices ── */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Diesel Price</label>
              <div className={rowClass}>
                <span className="px-3 py-2.5 font-mono text-[13px] text-white/55 border-r border-white/10 bg-white/5">₹</span>
                <input autoFocus type="number" min={1} step={0.5} placeholder="e.g. 94"
                  value={inputs.dieselPrice || ""}
                  onChange={(e) => set("dieselPrice", parseFloat(e.target.value) || 0)}
                  className={inputClass} onKeyDown={(e) => e.key === "Enter" && next()} />
                <span className={unitBadge}>INR / litre</span>
              </div>
            </div>
            {inputs.altFuelType === "LPG" && (
              <div>
                <label className={labelClass}>LPG Price</label>
                <div className={rowClass}>
                  <span className="px-3 py-2.5 font-mono text-[13px] text-white/55 border-r border-white/10 bg-white/5">₹</span>
                  <input type="number" min={1} step={0.5} placeholder="e.g. 190"
                    value={inputs.lpgPrice || ""}
                    onChange={(e) => set("lpgPrice", parseFloat(e.target.value) || 0)}
                    className={inputClass} onKeyDown={(e) => e.key === "Enter" && next()} />
                  <span className={unitBadge}>INR / kg</span>
                </div>
              </div>
            )}
            {inputs.altFuelType === "PNG" && (
              <div>
                <label className={labelClass}>PNG Price</label>
                <div className={rowClass}>
                  <span className="px-3 py-2.5 font-mono text-[13px] text-white/55 border-r border-white/10 bg-white/5">₹</span>
                  <input type="number" min={1} step={0.5} placeholder="e.g. 85"
                    value={inputs.pngPrice || ""}
                    onChange={(e) => set("pngPrice", parseFloat(e.target.value) || 0)}
                    className={inputClass} onKeyDown={(e) => e.key === "Enter" && next()} />
                  <span className={unitBadge}>INR / Sm³</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Step 5: Diesel Consumption (diesel-only mode) ── */}
        {step === 5 && (
          <div>
            <label className={labelClass}>Diesel Consumption — Diesel Mode</label>
            <div className={rowClass}>
              <input autoFocus type="number" min={0.1} step={0.1} placeholder="e.g. 78.3"
                value={inputs.dieselConsumption || ""}
                onChange={(e) => set("dieselConsumption", parseFloat(e.target.value) || 0)}
                className={inputClass} onKeyDown={(e) => e.key === "Enter" && next()} />
              <span className={unitBadge}>L / hr</span>
            </div>
            <p className="mt-2 text-[11px] text-white/35">
              Diesel consumed per hour when the engine runs on diesel only.
              Use your genset's test report or fuel-consumption datasheet.
            </p>
          </div>
        )}

        {/* ── Step 6: DF Diesel Consumption ── */}
        {step === 6 && (
          <div>
            <label className={labelClass}>Diesel Consumption — Dual-Fuel Mode</label>
            <div className={rowClass}>
              <input autoFocus type="number" min={0} step={0.1} placeholder="e.g. 39.2"
                value={inputs.dfDieselConsumption || ""}
                onChange={(e) => set("dfDieselConsumption", parseFloat(e.target.value) || 0)}
                className={inputClass} onKeyDown={(e) => e.key === "Enter" && next()} />
              <span className={unitBadge}>L / hr</span>
            </div>
            <p className="mt-2 text-[11px] text-white/35">
              Diesel consumed per hour in dual-fuel operation.
              Must be less than {inputs.dieselConsumption} L/hr (diesel-only value).
            </p>
          </div>
        )}

        {/* ── Step 7: Alt Fuel Consumption ── */}
        {step === 7 && (
          <div>
            <label className={labelClass}>
              {inputs.altFuelType} Consumption — Dual-Fuel Mode
            </label>
            <div className={rowClass}>
              <input autoFocus type="number" min={0.1} step={0.1} placeholder="e.g. 36.7"
                value={inputs.dfAltFuelConsumption || ""}
                onChange={(e) => set("dfAltFuelConsumption", parseFloat(e.target.value) || 0)}
                className={inputClass} onKeyDown={(e) => e.key === "Enter" && next()} />
              <span className={unitBadge}>{altFuelUnit(inputs.altFuelType)}</span>
            </div>
            <p className="mt-2 text-[11px] text-white/35">
              {inputs.altFuelType} consumed per hour during dual-fuel operation.
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="mt-3 rounded-[6px] bg-[oklch(0.64_0.18_28/0.15)] px-3 py-2 text-[11px] text-[oklch(0.64_0.18_28)]">
            {error}
          </p>
        )}
      </div>

      {/* Navigation */}
      <div className="shrink-0 border-t border-white/10 px-5 py-4 flex items-center gap-3">
        {step > 1 && (
          <button type="button" onClick={back}
            className="flex h-10 items-center gap-1.5 border border-white/20 px-4 text-[10px] font-bold uppercase tracking-[0.1em] text-white/60 transition-colors hover:border-white/40 hover:text-white">
            ← Back
          </button>
        )}
        <button type="button" onClick={next}
          className="flex-1 h-10 bg-[oklch(0.72_0.16_155)] text-[oklch(0.19_0.045_158)] text-[10px] font-extrabold uppercase tracking-[0.12em] transition-colors hover:bg-white">
          {step === TOTAL_STEPS ? "Calculate My Savings →" : "Continue →"}
        </button>
      </div>
    </div>
  );
}
