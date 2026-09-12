import type { CalculatorInputs, CalculatorResults as Results } from "./calculatorUtils";
import { formatINR } from "./calculatorUtils";

interface Props {
  inputs: CalculatorInputs;
  results: Results;
  onReset: () => void;
}

function StatCard({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div
      className="rounded-[8px] border p-4 flex flex-col gap-1"
      style={{
        borderColor: accent ? "oklch(0.72 0.16 155 / 0.5)" : "rgba(255,255,255,0.1)",
        background: accent ? "oklch(0.72 0.16 155 / 0.1)" : "rgba(255,255,255,0.04)",
      }}
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">{label}</span>
      <span
        className="text-xl font-extrabold leading-tight"
        style={{ color: accent ? "oklch(0.72 0.16 155)" : "white" }}
      >
        {value}
      </span>
      <span className="font-mono text-[9px] text-white/40">{sub}</span>
    </div>
  );
}

function BarRow({
  label,
  value,
  maxValue,
  displayVal,
  accent = false,
}: {
  label: string;
  value: number;
  maxValue: number;
  displayVal: string;
  accent?: boolean;
}) {
  const pct = maxValue > 0 ? Math.min((value / maxValue) * 100, 100) : 0;
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-[10px] text-white/50">{label}</span>
        <span className="font-mono text-[10px]" style={{ color: accent ? "oklch(0.72 0.16 155)" : "rgba(255,255,255,0.7)" }}>{displayVal}</span>
      </div>
      <div className="h-[6px] rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: accent ? "oklch(0.72 0.16 155)" : "rgba(255,255,255,0.35)",
          }}
        />
      </div>
    </div>
  );
}

export function CalculatorResults({ inputs, results, onReset }: Props) {
  const {
    dieselOnlyCostPerHour,
    dualFuelCostPerHour,
    hourlySaving,
    dailySaving,
    monthlySaving,
    annualSaving,
    dieselReplacementPct,
    costReductionPct,
    hourlyDieselReduction,
    monthlyDieselReduction,
    annualDieselReduction,
  } = results;

  const saving = hourlySaving > 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }} className="px-5 py-4">

        {/* Header */}
        <div className="mb-4 pb-4 border-b border-white/10">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[oklch(0.72_0.16_155)]">
            Here's your estimated savings.
          </p>
          <h3 className="mt-1 text-base font-extrabold text-white leading-tight">
            {saving
              ? `You could save ${formatINR(annualSaving, true)} per year`
              : "Dual-fuel costs exceed diesel-only at these values"}
          </h3>
          {!saving && (
            <p className="mt-1 text-[11px] text-[oklch(0.64_0.18_28)]">
              Check your gas price and consumption — dual-fuel may cost more at current inputs.
            </p>
          )}
        </div>

        {/* Diesel replacement — hero metric */}
        <div
          className="mb-4 rounded-[8px] p-4 flex items-center justify-between"
          style={{ background: "oklch(0.72 0.16 155 / 0.12)", border: "1px solid oklch(0.72 0.16 155 / 0.4)" }}
        >
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">Diesel Replacement</p>
            <p className="mt-0.5 text-2xl font-extrabold text-[oklch(0.72_0.16_155)]">
              {dieselReplacementPct.toFixed(1)}%
            </p>
            <p className="text-[10px] text-white/40">auto-calculated from your inputs</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">Cost Reduction</p>
            <p className="mt-0.5 text-xl font-extrabold text-white">{costReductionPct.toFixed(1)}%</p>
          </div>
        </div>

        {/* 4 savings cards */}
        <div className="grid grid-cols-2 gap-2">
          <StatCard label="Savings / Hour"  value={formatINR(hourlySaving)}          sub="/hr"    accent={saving} />
          <StatCard label="Daily Savings"   value={formatINR(dailySaving)}           sub="/day" />
          <StatCard label="Monthly Savings" value={formatINR(monthlySaving, true)}   sub="/month" />
          <StatCard label="Annual Savings"  value={formatINR(annualSaving, true)}    sub="/year"  accent={saving} />
        </div>

        {/* Cost comparison */}
        <div className="mt-4 rounded-[8px] border border-white/10 p-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40 mb-3">Fuel Cost per Hour</p>
          <div className="flex gap-3">
            <div className="flex-1 rounded-[6px] bg-white/5 p-3 text-center">
              <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-white/40">Before</p>
              <p className="mt-1 text-base font-bold text-white">{formatINR(dieselOnlyCostPerHour)}</p>
              <p className="text-[10px] text-white/40">Diesel only</p>
            </div>
            <div className="flex items-center text-white/30 text-lg">→</div>
            <div
              className="flex-1 rounded-[6px] p-3 text-center"
              style={{ background: "oklch(0.72 0.16 155 / 0.1)", border: "1px solid oklch(0.72 0.16 155 / 0.3)" }}
            >
              <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-[oklch(0.72_0.16_155)]">After</p>
              <p className="mt-1 text-base font-bold text-[oklch(0.72_0.16_155)]">{formatINR(dualFuelCostPerHour)}</p>
              <p className="text-[10px] text-[oklch(0.72_0.16_155/0.6)]">Diesel + Gas</p>
            </div>
          </div>
          {saving && (
            <div className="mt-3 text-center rounded-[6px] py-2" style={{ background: "oklch(0.72 0.16 155 / 0.12)" }}>
              <span className="font-mono text-[11px] text-[oklch(0.72_0.16_155)]">
                {formatINR(hourlySaving)} saved every hour
              </span>
            </div>
          )}
        </div>

        {/* Diesel consumption comparison */}
        <div className="mt-4 rounded-[8px] border border-white/10 p-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40 mb-3">Diesel Consumption</p>
          <div className="space-y-2">
            <BarRow label="Before" value={inputs.dieselConsumption} maxValue={inputs.dieselConsumption} displayVal={`${inputs.dieselConsumption.toFixed(1)} L/hr`} />
            <BarRow label="After"  value={inputs.dualFuelDieselConsumption} maxValue={inputs.dieselConsumption} displayVal={`${inputs.dualFuelDieselConsumption.toFixed(1)} L/hr`} accent />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-white/35">Reduction</p>
              <p className="mt-0.5 text-sm font-bold text-white">{hourlyDieselReduction.toFixed(1)} L/hr</p>
            </div>
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-white/35">Monthly</p>
              <p className="mt-0.5 text-sm font-bold text-white">{Math.round(monthlyDieselReduction).toLocaleString("en-IN")} L</p>
            </div>
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-white/35">Annual</p>
              <p className="mt-0.5 text-sm font-bold text-[oklch(0.72_0.16_155)]">{Math.round(annualDieselReduction).toLocaleString("en-IN")} L</p>
            </div>
          </div>
        </div>

        {/* Reference case */}
        <div className="mt-4 rounded-[8px] border border-white/8 bg-white/3 p-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/35 mb-2">Real OM Solutions Result</p>
          <div className="flex gap-4 text-sm">
            <div>
              <span className="font-bold text-[oklch(0.72_0.16_155)]">65%</span>
              <span className="ml-1 text-[11px] text-white/50">diesel replacement</span>
            </div>
            <div>
              <span className="font-bold text-white">34%</span>
              <span className="ml-1 text-[11px] text-white/50">fuel-cost saving</span>
            </div>
          </div>
          <p className="mt-2 text-[10px] text-white/30 leading-relaxed">
            KOEL 320 kVA · Diesel + PNG · Reference installation. Actual results vary by application.
          </p>
        </div>

        <p className="mt-4 text-[10px] leading-relaxed text-white/25">
          Estimates only. Actual savings depend on engine load, operating conditions, fuel quality and fuel prices.
        </p>
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-white/10 px-5 py-4 space-y-2">
        <a
          href="#contact"
          className="flex h-10 w-full items-center justify-center bg-[oklch(0.72_0.16_155)] text-[oklch(0.19_0.045_158)] text-[10px] font-extrabold uppercase tracking-[0.12em] transition-colors hover:bg-white"
        >
          Talk to Our Technical Team →
        </a>
        <button
          type="button"
          onClick={onReset}
          className="flex h-9 w-full items-center justify-center border border-white/15 text-[10px] font-bold uppercase tracking-[0.1em] text-white/55 transition-colors hover:border-white/30 hover:text-white/80"
        >
          ← Calculate Again
        </button>
      </div>
    </div>
  );
}
