import type { CalculatorInputs, CalculatorResults as Results } from "./calculatorUtils";
import { formatINR, altFuelUnit } from "./calculatorUtils";

interface Props {
  inputs: CalculatorInputs;
  results: Results;
  onReset: () => void;
}

function Row({ label, value, accent = false, sub }: { label: string; value: string; accent?: boolean; sub?: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-[11px] text-white/55">{label}</span>
      <div className="text-right">
        <span className="font-mono text-[12px] font-bold"
          style={{ color: accent ? "oklch(0.72 0.16 155)" : "white" }}>{value}</span>
        {sub && <span className="ml-1 font-mono text-[10px] text-white/35">{sub}</span>}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[8px] border border-white/10 overflow-hidden mb-3">
      <div className="px-4 py-2.5 border-b border-white/10"
        style={{ background: "rgba(255,255,255,0.05)" }}>
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/50">{title}</p>
      </div>
      <div className="px-4 py-1">{children}</div>
    </div>
  );
}

export function CalculatorResults({ inputs, results, onReset }: Props) {
  const {
    dieselModeCostPerHour,
    dfDieselCostPerHour,
    altFuelCostPerHour,
    totalDfCostPerHour,
    savingPerHour,
    savingPerMonth,
    savingPerYear,
    costReductionPct,
    dieselReplacementPct,
    co2DieselModePerHour,
    co2DfTotalPerHour,
    co2ReductionPerHour,
    co2ReductionPerMonth,
    co2ReductionPerYear,
  } = results;

  const saving = savingPerHour > 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }} className="px-5 py-4">

        {/* Case label */}
        <div className="mb-4 pb-3 border-b border-white/10">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[oklch(0.72_0.16_155)]">
            Operating Economics
          </p>
          <h3 className="mt-1 text-[13px] font-extrabold text-white leading-tight">
            {inputs.gensetRating} kVA · {inputs.load}% Load · {inputs.altFuelType}
          </h3>
          <p className="mt-0.5 font-mono text-[10px] text-white/35">
            {inputs.hoursPerMonth} hrs/month
          </p>
        </div>

        {/* Saving due to DFK — hero highlight */}
        <div className="mb-4 rounded-[8px] p-4"
          style={{ background: saving ? "oklch(0.72 0.16 155 / 0.12)" : "rgba(255,255,255,0.05)",
                   border: saving ? "1px solid oklch(0.72 0.16 155 / 0.45)" : "1px solid rgba(255,255,255,0.1)" }}>
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/45 mb-2">
            Saving Due to DFK
          </p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-extrabold" style={{ color: saving ? "oklch(0.72 0.16 155)" : "rgba(255,255,255,0.5)" }}>
                {formatINR(savingPerHour)}
              </p>
              <p className="font-mono text-[10px] text-white/40 mt-0.5">INR / hr</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-white">{formatINR(savingPerMonth, true)}</p>
              <p className="font-mono text-[9px] text-white/35">/ Month</p>
              <p className="mt-1 text-sm font-bold text-white">{formatINR(savingPerYear, true)}</p>
              <p className="font-mono text-[9px] text-white/35">/ Year</p>
            </div>
          </div>
          <div className="mt-3 flex gap-4">
            <div>
              <p className="font-mono text-[9px] text-white/35">Cost Reduction</p>
              <p className="text-sm font-bold text-white">{costReductionPct.toFixed(1)}%</p>
            </div>
            <div>
              <p className="font-mono text-[9px] text-white/35">Diesel Replacement</p>
              <p className="text-sm font-bold" style={{ color: "oklch(0.72 0.16 155)" }}>
                {dieselReplacementPct.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Diesel Mode */}
        <Section title="Diesel Mode">
          <Row label="Diesel Consumption" value={`${inputs.dieselConsumption.toFixed(1)} L/hr`} />
          <Row label="Diesel Cost" value={formatINR(dieselModeCostPerHour)} sub="/hr" />
        </Section>

        {/* Dual-Fuel Mode */}
        <Section title="Dual-Fuel Mode">
          <Row label="DF Diesel" value={`${inputs.dfDieselConsumption.toFixed(1)} L/hr`} />
          <Row label={`DF ${inputs.altFuelType}`}
               value={`${inputs.dfAltFuelConsumption.toFixed(1)} ${altFuelUnit(inputs.altFuelType)}`} />
          <Row label="DF Diesel Cost" value={formatINR(dfDieselCostPerHour)} sub="/hr" />
          <Row label={`${inputs.altFuelType} Cost`} value={formatINR(altFuelCostPerHour)} sub="/hr" />
          <Row label="Total DF Cost" value={formatINR(totalDfCostPerHour)} sub="/hr" accent />
        </Section>

        {/* Environmental Impact */}
        <Section title="Environmental Impact (CO₂)">
          <Row label="CO₂ — Diesel Mode" value={`${co2DieselModePerHour.toFixed(2)} kg/hr`} />
          <Row label="CO₂ — Dual-Fuel Mode"
               value={co2DfTotalPerHour !== null ? `${co2DfTotalPerHour.toFixed(2)} kg/hr` : "—"} />
          <Row label="CO₂ Reduction"
               value={co2ReductionPerHour !== null ? `${co2ReductionPerHour.toFixed(2)} kg/hr` : "—"}
               accent={co2ReductionPerHour !== null && co2ReductionPerHour > 0} />
          {co2ReductionPerMonth !== null && (
            <Row label="CO₂ Reduction / Month"
                 value={`${(co2ReductionPerMonth / 1000).toFixed(2)} tonnes`}
                 accent />
          )}
          {co2ReductionPerYear !== null && (
            <Row label="CO₂ Reduction / Year"
                 value={`${(co2ReductionPerYear / 1000).toFixed(2)} tonnes`}
                 accent />
          )}
          <div className="py-2">
            <p className="text-[9px] text-white/25 leading-relaxed">
              Diesel: 0.03 GJ/L × 70.55 kg CO₂/GJ = 2.1165 kg CO₂/L.
              Natural Gas: 0.05 GJ/kg × 55.22 kg CO₂/GJ = 2.761 kg CO₂/kg.
              Source: OM Solutions client reference.
            </p>
          </div>
        </Section>

        <p className="mt-2 text-[10px] leading-relaxed text-white/25">
          Estimates based on the values provided. Actual savings depend on engine condition,
          load profile, fuel quality and site conditions.
        </p>
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-white/10 px-5 py-4">
        <button type="button" onClick={onReset}
          className="flex h-9 w-full items-center justify-center border border-white/15 text-[10px] font-bold uppercase tracking-[0.1em] text-white/55 transition-colors hover:border-white/30 hover:text-white/80">
          ← Calculate Again
        </button>
      </div>
    </div>
  );
}
