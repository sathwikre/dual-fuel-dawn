import type { CalculatorInputs, CalculatorResults as Results } from "./calculatorUtils";
import { formatINR } from "./calculatorUtils";

interface Props {
  inputs: CalculatorInputs;
  results: Results;
  onReset: () => void;
}

type ResultTone = "positive" | "negative" | "neutral";

const toneColor: Record<ResultTone, string> = {
  positive: "oklch(0.78 0.18 155)",
  negative: "oklch(0.72 0.2 28)",
  neutral: "oklch(0.8 0.02 250)",
};

function toneFor(value: number): ResultTone {
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return "neutral";
}

function Row({ label, value, accent = false, tone, sub }: {
  label: string; value: string; accent?: boolean; tone?: ResultTone; sub?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b-2 border-white/10 last:border-0">
      <span className="text-[13px] font-semibold text-white/80">{label}</span>
      <div className="text-right">
        <span className="text-[15px] font-extrabold"
          style={{ color: "oklch(0.78 0.18 155)" }}>
          {value}
        </span>
        {sub && <span className="ml-1 text-[12px] font-semibold text-white/60">{sub}</span>}
      </div>
    </div>
  );
}

export function CalculatorResults({ inputs, results, onReset }: Props) {
  const {
    dieselConsumptionLPerHr, dfDieselConsumptionLPerHr, ngConsumptionSm3PerHr,
    dieselCostPerHr, dfDieselCostPerHr, ngCostPerHr, totalDualFuelCostPerHr,
    savingPerHour, savingPerMonth, savingPerYear, costReductionPct, dieselReplacementPct,
    dieselCO2KgPerHr, totalDualFuelCO2KgPerHr, co2SavingKgPerHr, annualCO2SavingTonnes,
  } = results;
  const savingTone = toneFor(savingPerHour);

  return (
    <div className="calc-results flex h-full min-h-0 flex-col">
      <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/15 pb-5">
          <div><p className="text-[11px] uppercase tracking-[0.14em] text-[oklch(0.72_0.16_155)]">Dual fuel assessment</p><h3 className="mt-2 text-2xl font-black text-white">Your operating results</h3></div>
          <p className="text-sm text-white/65">{inputs.gensetRating} kVA · {inputs.load}% load · {inputs.hoursPerMonth} hrs/month</p>
        </div>

        <section className="mb-6 overflow-hidden rounded-[8px] border-2 p-6 sm:p-8" style={{ background: savingTone === "positive" ? "oklch(0.72 0.16 155 / 0.12)" : "rgba(255,255,255,0.05)", borderColor: toneColor[savingTone] }}>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-white">Your savings with OM Solutions</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3 md:items-end">
            <SavingsValue label="Saving / hour" value={formatINR(savingPerHour)} sub="per hour" />
            <SavingsValue label="Monthly saving" value={formatINR(savingPerMonth, true)} sub="per month" />
            <SavingsValue label="Annual saving" value={formatINR(savingPerYear, true)} sub="per year" largest />
          </div>
          <div className="mt-7 grid gap-3 border-t border-white/20 pt-5 sm:grid-cols-3">
            <Metric label="Cost reduction" value={`${costReductionPct.toFixed(1)}%`} />
            <Metric label="Diesel replacement" value={`${dieselReplacementPct.toFixed(1)}%`} />
            <Metric label="Annual CO₂ reduction" value={`${annualCO2SavingTonnes.toFixed(2)} tonnes`} />
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-3">
          <ResultGroup title="Fuel consumption" rows={[["Diesel consumption", `${dieselConsumptionLPerHr.toFixed(1)} L/hr`], ["DF diesel consumption", `${dfDieselConsumptionLPerHr.toFixed(1)} L/hr`], ["NG consumption", `${ngConsumptionSm3PerHr.toFixed(1)} Sm³/hr`]]} />
          <ResultGroup title="Operating cost" rows={[["Diesel mode cost", `${formatINR(dieselCostPerHr)}/hr`], ["Dual fuel diesel cost", `${formatINR(dfDieselCostPerHr)}/hr`], ["NG cost", `${formatINR(ngCostPerHr)}/hr`], ["Total dual fuel cost", `${formatINR(totalDualFuelCostPerHr)}/hr`]]} />
          <ResultGroup title="Environmental impact" rows={[["Diesel mode CO₂", `${dieselCO2KgPerHr.toFixed(2)} kg/hr`], ["Dual fuel CO₂", `${totalDualFuelCO2KgPerHr.toFixed(2)} kg/hr`], ["CO₂ saving", `${co2SavingKgPerHr.toFixed(2)} kg/hr`]]} accent />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-white/45">Estimates are based on the OM Solutions BMEP calculation model. Actual savings depend on engine condition, load profile, fuel quality and site conditions.</p>
      </div>
      <div className="shrink-0 border-t border-white/15 px-5 py-4 sm:px-7"><button type="button" onClick={onReset} className="h-11 w-full border-2 border-white/35 text-xs font-extrabold uppercase tracking-[0.1em] text-white transition-colors hover:border-[oklch(0.72_0.16_155)] hover:text-[oklch(0.72_0.16_155)]">Calculate again</button></div>
    </div>
  );
}

function ResultGroup({ title, rows, accent = false }: { title: string; rows: [string, string][]; accent?: boolean }) {
  return <section className="rounded-[7px] border border-white/15 bg-white/[0.04] p-5"><p className="text-sm font-extrabold uppercase tracking-[0.12em] text-white">{title}</p><div className="mt-4 space-y-4">{rows.map(([label, value]) => <div key={label} className="flex items-start justify-between gap-4"><span className="text-sm font-semibold leading-snug text-white/80">{label}</span><strong className="text-right text-base text-[oklch(0.78_0.18_155)]">{value}</strong></div>)}</div></section>;
}

function SavingsValue({ label, value, sub, largest = false }: { label: string; value: string; sub: string; largest?: boolean }) {
  return <div className={largest ? "md:text-right" : ""}><p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-white">{label}</p><p className={`mt-2 font-black text-[oklch(0.78_0.18_155)] ${largest ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"}`}>{value}</p><p className="mt-1 text-sm font-semibold text-white/75">{sub}</p></div>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div><p className="text-sm font-extrabold uppercase tracking-[0.1em] text-white">{label}</p><p className="mt-1 text-2xl font-black text-[oklch(0.78_0.18_155)]">{value}</p></div>;
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

function LegacyCalculatorResults({ inputs, results, onReset }: Props) {
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

  const savingTone = toneFor(savingPerHour);
  const co2Tone = toneFor(co2SavingKgPerHr);

  return (
    <div className="calc-results" style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
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
            background: savingTone === "positive" ? "oklch(0.72 0.16 155 / 0.12)" : savingTone === "negative" ? "oklch(0.72 0.2 28 / 0.14)" : "rgba(255,255,255,0.05)",
            border: `2px solid ${toneColor[savingTone]}`,
          }}>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/75 mb-2">Saving Due to DFK</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-black" style={{ color: toneColor[savingTone] }}>
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
          </div>
        </div>

        {/* Hero — CO₂ Saving */}
        <div className="mb-5 rounded-[3px] p-5"
          style={{
            background: co2Tone === "positive" ? "oklch(0.72 0.16 155 / 0.12)" : co2Tone === "negative" ? "oklch(0.72 0.2 28 / 0.14)" : "rgba(255,255,255,0.05)",
            border: `2px solid ${toneColor[co2Tone]}`,
          }}>
          <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/75">CO₂ Saving Due to DFK</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-black" style={{ color: toneColor[co2Tone] }}>
                {co2SavingKgPerHr.toFixed(2)} kg
              </p>
              <p className="mt-1 text-[12px] font-bold text-white/70">CO₂ / hr</p>
            </div>
            <div className="text-right">
              <p className="text-[16px] font-extrabold text-white">{(monthlyCO2SavingKg / 1000).toFixed(2)} t</p>
              <p className="text-[11px] font-semibold text-white/65">/ Month</p>
              <p className="mt-2 text-[16px] font-extrabold text-white">{annualCO2SavingTonnes.toFixed(2)} t</p>
              <p className="text-[11px] font-semibold text-white/65">/ Year</p>
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
          <Row label="CO₂ Saving / Hour" value={`${co2SavingKgPerHr.toFixed(2)} kg/hr`} tone={co2Tone} />
          <Row label="CO₂ Saving / Month" value={`${(monthlyCO2SavingKg / 1000).toFixed(2)} tonnes`} tone={toneFor(monthlyCO2SavingKg)} />
          <Row label="CO₂ Saving / Year" value={`${annualCO2SavingTonnes.toFixed(2)} tonnes`} tone={toneFor(annualCO2SavingTonnes)} />
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
