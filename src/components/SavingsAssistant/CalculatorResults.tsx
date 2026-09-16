import type { CalculatorInputs, CalculatorResults as Results } from "./calculatorUtils";
import { formatINR } from "./calculatorUtils";

interface Props {
  inputs: CalculatorInputs;
  results: Results;
  onReset: () => void;
}

function Row({ label, value, accent = false, sub }: {
  label: string; value: string; accent?: boolean; sub?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b-2 border-white/10 last:border-0">
      <span className="text-[13px] font-semibold text-white/80">{label}</span>
      <div className="text-right">
        <span className="text-[15px] font-extrabold"
          style={{ color: accent ? "oklch(0.72 0.16 155)" : "white" }}>
          {value}
        </span>
        {sub && <span className="ml-1 text-[12px] font-semibold text-white/60">{sub}</span>}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[3px] border-2 border-white/20 overflow-hidden mb-4">
      <div className="px-4 py-3 border-b-2 border-white/20" style={{ background: "rgba(255,255,255,0.08)" }}>
        <p className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-white">{title}</p>
      </div>
      <div className="px-4 py-1">{children}</div>
    </div>
  );
}

export function CalculatorResults({ inputs, results, onReset }: Props) {
  const {
    operatingGensetRating,
    electricalPowerKWe,
    engineBrakePower,
    totalEngineBrakePower,
    engineIndicatedPower,
    dieselConsumptionLPerHr,
    dfDieselConsumptionLPerHr,
    ngConsumptionSm3PerHr,
    dieselCostPerHr,
    dfDieselCostPerHr,
    ngCostPerHr,
    totalDualFuelCostPerHr,
    savingPerHour,
    savingPerMonth,
    savingPerYear,
    costReductionPct,
    dieselReplacementPct,
    dieselCO2KgPerHr,
    totalDualFuelCO2KgPerHr,
    co2SavingKgPerHr,
    monthlyCO2SavingKg,
    annualCO2SavingTonnes,
  } = results;

  const saving = savingPerHour > 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }} className="px-5 py-4">

        {/* Header */}
        <div className="mb-4 pb-3 border-b border-white/10">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[oklch(0.72_0.16_155)]">
            Operating Economics
          </p>
          <h3 className="mt-1 text-[17px] font-black text-white leading-tight">
            {inputs.gensetRating} kVA · {inputs.load}% Load · NG
          </h3>
          <p className="mt-1 text-[12px] font-semibold text-white/65">
            {inputs.hoursPerMonth} hrs/month · ₹{inputs.dieselPrice}/L diesel · ₹{inputs.ngPrice}/Sm³ NG
          </p>
        </div>

        {/* Hero — Saving Due to DFK */}
        <div className="mb-5 rounded-[3px] p-5"
          style={{
            background: saving ? "oklch(0.72 0.16 155 / 0.12)" : "rgba(255,255,255,0.05)",
            border: saving ? "1px solid oklch(0.72 0.16 155 / 0.45)" : "1px solid rgba(255,255,255,0.1)",
          }}>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/75 mb-2">Saving Due to DFK</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-black" style={{ color: saving ? "oklch(0.72 0.16 155)" : "rgba(255,255,255,0.5)" }}>
                {formatINR(savingPerHour)}
              </p>
              <p className="text-[12px] font-bold text-white/70 mt-1">INR / hr</p>
            </div>
            <div className="text-right">
              <p className="text-[16px] font-extrabold text-white">{formatINR(savingPerMonth, true)}</p>
              <p className="text-[11px] font-semibold text-white/65">/ Month</p>
              <p className="mt-2 text-[16px] font-extrabold text-white">{formatINR(savingPerYear, true)}</p>
              <p className="text-[11px] font-semibold text-white/65">/ Year</p>
            </div>
          </div>
          <div className="mt-3 flex gap-4">
            <div>
              <p className="text-[11px] font-bold text-white/65">Cost Reduction</p>
              <p className="text-[16px] font-extrabold text-white">{costReductionPct.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-white/65">Diesel Replacement</p>
              <p className="text-[16px] font-extrabold" style={{ color: "oklch(0.72 0.16 155)" }}>
                {dieselReplacementPct.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] text-white/35">CO₂ Saving / yr</p>
              <p className="text-sm font-bold" style={{ color: "oklch(0.72 0.16 155)" }}>
                {annualCO2SavingTonnes.toFixed(2)} t
              </p>
            </div>
          </div>
        </div>

        {/* Fuel Consumption */}
        <Section title="Fuel Consumption">
          <Row label="Diesel (diesel-only mode)" value={`${dieselConsumptionLPerHr.toFixed(1)} L/hr`} />
          <Row label="DF Diesel (dual-fuel mode)" value={`${dfDieselConsumptionLPerHr.toFixed(1)} L/hr`} />
          <Row label="NG Consumption" value={`${ngConsumptionSm3PerHr.toFixed(1)} Sm³/hr`} accent />
        </Section>

        {/* Operating Cost */}
        <Section title="Operating Cost">
          <Row label="Diesel Mode" value={formatINR(dieselCostPerHr)} sub="/hr" />
          <Row label="DF Diesel Cost" value={formatINR(dfDieselCostPerHr)} sub="/hr" />
          <Row label="NG Cost" value={formatINR(ngCostPerHr)} sub="/hr" />
          <Row label="Total Dual-Fuel Cost" value={formatINR(totalDualFuelCostPerHr)} sub="/hr" accent />
        </Section>

        {/* Engine Parameters */}
        <Section title="Engine Parameters">
          <Row label="Operating Genset Rating" value={`${operatingGensetRating.toFixed(0)} kVA`} />
          <Row label="Electrical Power" value={`${electricalPowerKWe.toFixed(1)} kWe`} />
          <Row label="Engine Brake Power" value={`${engineBrakePower.toFixed(1)} kW`} />
          <Row label="Total Engine Brake Power" value={`${totalEngineBrakePower.toFixed(1)} kW`} />
          <Row label="Engine Indicated Power" value={`${engineIndicatedPower.toFixed(1)} kW`} />
        </Section>

        {/* CO₂ Reduction */}
        <Section title="Environmental Impact (CO₂)">
          <Row label="CO₂ — Diesel Mode" value={`${dieselCO2KgPerHr.toFixed(2)} kg/hr`} />
          <Row label="CO₂ — Dual-Fuel Mode" value={`${totalDualFuelCO2KgPerHr.toFixed(2)} kg/hr`} />
          <Row label="CO₂ Saving / Hour" value={`${co2SavingKgPerHr.toFixed(2)} kg/hr`} accent />
          <Row label="CO₂ Saving / Month" value={`${(monthlyCO2SavingKg / 1000).toFixed(2)} tonnes`} />
          <Row label="CO₂ Saving / Year" value={`${annualCO2SavingTonnes.toFixed(2)} tonnes`} accent />
          <div className="py-2">
            <p className="text-[9px] text-white/25 leading-relaxed">
              Diesel: 32 MJ/L × 70.55 kg CO₂/GJ. NG: 49 MJ/kg × 55.22 kg CO₂/GJ.
              Source: OM Solutions Excel calculator.
            </p>
          </div>
        </Section>

        <p className="mt-2 text-[10px] leading-relaxed text-white/25">
          Estimates based on the OM Solutions BMEP calculation model. Actual savings depend on engine condition,
          load profile, fuel quality and site conditions.
        </p>
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-white/10 px-5 py-4">
        <button type="button" onClick={onReset}
          className="flex h-11 w-full items-center justify-center border-2 border-white/35 text-[12px] font-extrabold uppercase tracking-[0.08em] text-white transition-colors hover:border-white hover:text-white">
          ← Calculate Again
        </button>
      </div>
    </div>
  );
}
