import { useState } from "react";
import type { CalculatorInputs, GasType } from "./calculatorUtils";
import { gasUnit, gasPriceUnit, validateStep } from "./calculatorUtils";
import { CalculatorProgress } from "./CalculatorProgress";

interface Props {
  onComplete: (inputs: CalculatorInputs) => void;
}

const TOTAL_STEPS = 8;

const defaultInputs: CalculatorInputs = {
  dieselConsumption: 0,
  dieselPrice: 0,
  dualFuelDieselConsumption: 0,
  gasType: "PNG",
  gasConsumption: 0,
  gasPrice: 0,
  operatingHoursPerDay: 10,
  operatingDaysPerMonth: 26,
};

const stepMessages: Record<number, { greeting: string; question: string }> = {
  1: {
    greeting: "Let's calculate your potential savings.",
    question: "How much diesel does your engine consume per hour?",
  },
  2: {
    greeting: "Got it.",
    question: "What is the current diesel price?",
  },
  3: {
    greeting: "Good.",
    question: "How much diesel does it consume per hour in dual-fuel mode?",
  },
  4: {
    greeting: "Perfect.",
    question: "Which gas are you using?",
  },
  5: {
    greeting: "Good choice.",
    question: "How much gas does it consume per hour?",
  },
  6: {
    greeting: "Almost there.",
    question: "What is the gas price?",
  },
  7: {
    greeting: "Nearly done.",
    question: "How many hours does the equipment operate per day?",
  },
  8: {
    greeting: "One last thing.",
    question: "How many days does it operate per month?",
  },
};

const labelClass = "block mb-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/50";
const unitBadge  = "px-2.5 py-2.5 font-mono text-[11px] text-white/55 border border-white/10 rounded-r-[6px] bg-white/5 whitespace-nowrap";

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
        {/* Conversational prompt */}
        <div className="mb-5">
          <p className="text-[13px] font-semibold text-[oklch(0.72_0.16_155)]">{msg?.greeting ?? ""}</p>
          <p className="mt-1 text-sm text-white/80">{msg?.question ?? ""}</p>
        </div>

        {/* ── Step 1: Diesel Consumption ── */}
        {step === 1 && (
          <div>
            <label className={labelClass}>Diesel Consumption</label>
            <div className="flex overflow-hidden rounded-[6px] border border-white/15 focus-within:border-[oklch(0.72_0.16_155)] transition-colors">
              <input
                autoFocus
                type="number"
                min={0.1}
                step={0.1}
                placeholder="e.g. 32"
                value={inputs.dieselConsumption || ""}
                onChange={(e) => set("dieselConsumption", parseFloat(e.target.value) || 0)}
                className="flex-1 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30"
                onKeyDown={(e) => e.key === "Enter" && next()}
              />
              <span className={unitBadge}>L / hr</span>
            </div>
            <p className="mt-2 text-[11px] text-white/35">
              How much diesel does your engine consume per hour in diesel-only operation?
            </p>
          </div>
        )}

        {/* ── Step 2: Diesel Price ── */}
        {step === 2 && (
          <div>
            <label className={labelClass}>Diesel Price</label>
            <div className="flex overflow-hidden rounded-[6px] border border-white/15 focus-within:border-[oklch(0.72_0.16_155)] transition-colors">
              <span className="px-3 py-2.5 font-mono text-[13px] text-white/55 border-r border-white/10 bg-white/5">₹</span>
              <input
                autoFocus
                type="number"
                min={1}
                step={0.5}
                placeholder="e.g. 92"
                value={inputs.dieselPrice || ""}
                onChange={(e) => set("dieselPrice", parseFloat(e.target.value) || 0)}
                className="flex-1 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30"
                onKeyDown={(e) => e.key === "Enter" && next()}
              />
              <span className={unitBadge}>/ L</span>
            </div>
            <p className="mt-2 text-[11px] text-white/35">Current diesel price per litre.</p>
          </div>
        )}

        {/* ── Step 3: Dual-Fuel Diesel Consumption ── */}
        {step === 3 && (
          <div>
            <label className={labelClass}>Dual-Fuel Diesel Consumption</label>
            <div className="flex overflow-hidden rounded-[6px] border border-white/15 focus-within:border-[oklch(0.72_0.16_155)] transition-colors">
              <input
                autoFocus
                type="number"
                min={0}
                step={0.1}
                placeholder="e.g. 11"
                value={inputs.dualFuelDieselConsumption || ""}
                onChange={(e) => set("dualFuelDieselConsumption", parseFloat(e.target.value) || 0)}
                className="flex-1 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30"
                onKeyDown={(e) => e.key === "Enter" && next()}
              />
              <span className={unitBadge}>L / hr</span>
            </div>
            <p className="mt-2 text-[11px] text-white/35">
              Diesel consumed per hour after operating in dual-fuel mode. Must be less than {inputs.dieselConsumption} L/hr.
            </p>
          </div>
        )}

        {/* ── Step 4: Gas Type ── */}
        {step === 4 && (
          <div>
            <label className={labelClass}>Gas Type</label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {(["PNG", "CNG", "LPG"] as GasType[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => set("gasType", g)}
                  className={`rounded-[6px] border py-3 text-sm font-semibold transition-all ${
                    inputs.gasType === g
                      ? "border-[oklch(0.72_0.16_155)] bg-[oklch(0.72_0.16_155/0.12)] text-[oklch(0.72_0.16_155)]"
                      : "border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-white/35">
              {inputs.gasType === "PNG" && "Piped Natural Gas — consumption in Sm³/hr, price in ₹/Sm³."}
              {inputs.gasType === "CNG" && "Compressed Natural Gas — consumption in Sm³/hr, price in ₹/Sm³."}
              {inputs.gasType === "LPG" && "Liquefied Petroleum Gas — consumption in kg/hr, price in ₹/kg."}
            </p>
          </div>
        )}

        {/* ── Step 5: Gas Consumption ── */}
        {step === 5 && (
          <div>
            <label className={labelClass}>Gas Consumption</label>
            <div className="flex overflow-hidden rounded-[6px] border border-white/15 focus-within:border-[oklch(0.72_0.16_155)] transition-colors">
              <input
                autoFocus
                type="number"
                min={0.1}
                step={0.1}
                placeholder="e.g. 14"
                value={inputs.gasConsumption || ""}
                onChange={(e) => set("gasConsumption", parseFloat(e.target.value) || 0)}
                className="flex-1 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30"
                onKeyDown={(e) => e.key === "Enter" && next()}
              />
              <span className={unitBadge}>{gasUnit(inputs.gasType)}</span>
            </div>
            <p className="mt-2 text-[11px] text-white/35">
              Actual gas consumption per hour during dual-fuel operation.
            </p>
          </div>
        )}

        {/* ── Step 6: Gas Price ── */}
        {step === 6 && (
          <div>
            <label className={labelClass}>Gas Price</label>
            <div className="flex overflow-hidden rounded-[6px] border border-white/15 focus-within:border-[oklch(0.72_0.16_155)] transition-colors">
              <span className="px-3 py-2.5 font-mono text-[13px] text-white/55 border-r border-white/10 bg-white/5">₹</span>
              <input
                autoFocus
                type="number"
                min={1}
                step={0.5}
                placeholder="e.g. 65"
                value={inputs.gasPrice || ""}
                onChange={(e) => set("gasPrice", parseFloat(e.target.value) || 0)}
                className="flex-1 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30"
                onKeyDown={(e) => e.key === "Enter" && next()}
              />
              <span className={unitBadge}>{gasPriceUnit(inputs.gasType)}</span>
            </div>
          </div>
        )}

        {/* ── Step 7: Operating Hours ── */}
        {step === 7 && (
          <div>
            <label className={labelClass}>Operating Hours</label>
            <div className="flex overflow-hidden rounded-[6px] border border-white/15 focus-within:border-[oklch(0.72_0.16_155)] transition-colors">
              <input
                autoFocus
                type="number"
                min={1}
                max={24}
                placeholder="e.g. 10"
                value={inputs.operatingHoursPerDay || ""}
                onChange={(e) => set("operatingHoursPerDay", parseFloat(e.target.value) || 0)}
                className="flex-1 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30"
                onKeyDown={(e) => e.key === "Enter" && next()}
              />
              <span className={unitBadge}>hours / day</span>
            </div>
            <p className="mt-2 text-[11px] text-white/35">Must be between 1 and 24.</p>
          </div>
        )}

        {/* ── Step 8: Operating Days ── */}
        {step === 8 && (
          <div>
            <label className={labelClass}>Operating Days</label>
            <div className="flex overflow-hidden rounded-[6px] border border-white/15 focus-within:border-[oklch(0.72_0.16_155)] transition-colors">
              <input
                autoFocus
                type="number"
                min={1}
                max={31}
                placeholder="e.g. 26"
                value={inputs.operatingDaysPerMonth || ""}
                onChange={(e) => set("operatingDaysPerMonth", parseFloat(e.target.value) || 0)}
                className="flex-1 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30"
                onKeyDown={(e) => e.key === "Enter" && next()}
              />
              <span className={unitBadge}>days / month</span>
            </div>
            <p className="mt-2 text-[11px] text-white/35">Must be between 1 and 31.</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="mt-3 rounded-[6px] bg-[oklch(0.64_0.18_28/0.15)] px-3 py-2 text-[11px] text-[oklch(0.64_0.18_28)]">{error}</p>
        )}
      </div>

      {/* Nav buttons */}
      <div className="shrink-0 border-t border-white/10 px-5 py-4 flex items-center gap-3">
        {step > 1 && (
          <button
            type="button"
            onClick={back}
            className="flex h-10 items-center gap-1.5 border border-white/20 px-4 text-[10px] font-bold uppercase tracking-[0.1em] text-white/60 transition-colors hover:border-white/40 hover:text-white"
          >
            ← Back
          </button>
        )}
        <button
          type="button"
          onClick={next}
          className="flex-1 h-10 bg-[oklch(0.72_0.16_155)] text-[oklch(0.19_0.045_158)] text-[10px] font-extrabold uppercase tracking-[0.12em] transition-colors hover:bg-white"
        >
          {step === TOTAL_STEPS ? "Calculate My Savings →" : "Continue →"}
        </button>
      </div>
    </div>
  );
}
