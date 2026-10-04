import type { CalculatorInputs, CalculatorResults as Results } from "./calculatorUtils";
import { formatINR } from "./calculatorUtils";

interface Props {
  inputs: CalculatorInputs;
  results: Results;
  onReset: () => void;
  onJoinMission: () => void;
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

export function CalculatorResults({ inputs, results, onReset, onJoinMission }: Props) {
  const {
    dieselConsumptionLPerHr, dfDieselConsumptionLPerHr, savingPerYear,
    costReductionPct, dieselReplacementPct, dieselCO2KgPerHr, co2SavingKgPerHr,
    annualCO2SavingTonnes,
  } = results;
  const annualDieselSavingLitres = (dieselConsumptionLPerHr - dfDieselConsumptionLPerHr) * inputs.hoursPerMonth * 12;
  const co2ReductionPct = dieselCO2KgPerHr > 0 ? (co2SavingKgPerHr / dieselCO2KgPerHr) * 100 : 0;

  return (
    <div className="calc-results flex h-full min-h-0 flex-col">
      <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/15 pb-5">
          <div><p className="text-[11px] uppercase tracking-[0.14em] text-[oklch(0.72_0.16_155)]">Dual fuel assessment</p><h3 className="mt-2 text-2xl font-black text-white">Annual savings</h3></div>
          <p className="text-sm text-white/65">{inputs.gensetRating} kVA{" \u00b7 "}{inputs.load}% load{" \u00b7 "}{inputs.hoursPerMonth} hrs/month</p>
        </div>
        <div className="overflow-x-auto rounded-[4px] border border-white/60">
          <table className="w-full min-w-[540px] table-fixed border-collapse text-center text-white">
            <thead>
              <tr className="text-sm font-extrabold text-[oklch(0.72_0.16_155)] sm:text-base">
                <th colSpan={2} className="border border-white/50 px-2 py-2">Fuel Cost Savings</th>
                <th colSpan={2} className="border border-white/50 px-2 py-2">Diesel Consumption Reduction</th>
                <th colSpan={2} className="border border-white/50 px-2 py-2">CO₂ Emissions Reduction</th>
              </tr>
              <tr className="text-xs font-bold text-[oklch(0.72_0.16_155)] sm:text-sm">
                <th className="border border-white/50 px-2 py-2">INR / Year</th><th className="border border-white/50 px-2 py-2">% Reduction</th>
                <th className="border border-white/50 px-2 py-2">Litres / Year</th><th className="border border-white/50 px-2 py-2">% Reduction</th>
                <th className="border border-white/50 px-2 py-2">Tonnes CO₂ / Year</th><th className="border border-white/50 px-2 py-2">% Reduction</th>
              </tr>
            </thead>
            <tbody><tr className="bg-white text-base font-extrabold text-slate-900 sm:text-lg">
              <td className="border border-slate-500 px-2 py-2">{formatINR(Math.ceil(savingPerYear), true).slice(1)}</td>
              <td className="border border-slate-500 px-2 py-2">{Math.ceil(costReductionPct)}</td>
              <td className="border border-slate-500 px-2 py-2">{Math.ceil(annualDieselSavingLitres).toLocaleString("en-IN")}</td>
              <td className="border border-slate-500 px-2 py-2">{Math.ceil(dieselReplacementPct)}</td>
              <td className="border border-slate-500 px-2 py-2">{Math.ceil(annualCO2SavingTonnes)}</td>
              <td className="border border-slate-500 px-2 py-2">{Math.ceil(co2ReductionPct)}</td>
            </tr></tbody>
          </table>
        </div>
      </div>
      <div className="shrink-0 border-t border-white/15 px-5 py-4 sm:px-7"><div className="grid gap-3 sm:grid-cols-2"><button type="button" onClick={onReset} className="h-11 w-full border-2 border-white/35 text-xs font-extrabold uppercase tracking-[0.1em] text-white transition-colors hover:border-[oklch(0.72_0.16_155)] hover:text-[oklch(0.72_0.16_155)]">Calculate again</button><a href="#contact" onClick={onJoinMission} className="flex h-11 w-full items-center justify-center border-2 border-[oklch(0.72_0.16_155)] bg-[oklch(0.72_0.16_155)] px-3 text-center text-xs font-extrabold uppercase tracking-[0.1em] text-[oklch(0.14_0.04_158)] transition-colors hover:border-white hover:bg-white">Join this Mission</a></div></div>
    </div>
  );
}
function ResultGroup({ title, rows, accent = false }: { title: string; rows: [string, string][]; accent?: boolean }) {
  return <section className="rounded-[7px] border border-white/15 bg-white/[0.04] p-5"><p className="text-sm font-extrabold uppercase tracking-[0.12em] text-white">{title}</p><div className="mt-4 space-y-4">{rows.map(([label, value]) => <div key={label} className="flex items-start justify-between gap-4"><span className="text-sm font-semibold leading-snug text-white/80">{label}</span><strong className="text-right text-base text-[oklch(0.78_0.18_155)]">{value}</strong></div>)}</div></section>;
}

function SavingsValue({ label, value, sub }: { label: string; value: string; sub: string; largest?: boolean }) {
  return <div className="min-w-0"><p className="text-[9px] font-extrabold uppercase leading-tight tracking-[0.06em] text-white sm:text-xs sm:tracking-[0.1em]">{label}</p><p className="mt-2 break-words text-base font-black leading-none sm:text-3xl lg:text-4xl" style={{ color: "oklch(0.78 0.18 155)" }}>{value}</p><p className="mt-1 text-[10px] font-extrabold text-white sm:text-xs">{sub}</p></div>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0"><p className="text-[9px] font-extrabold uppercase leading-tight tracking-[0.06em] text-white sm:text-xs sm:tracking-[0.1em]">{label}</p><p className="mt-2 break-words text-base font-black leading-none sm:text-3xl lg:text-4xl" style={{ color: "oklch(0.78 0.18 155)" }}>{value}</p></div>;
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
            {inputs.gensetRating} kVA Â· {inputs.load}% Load Â· NG
          </h3>
          <p className="mt-1 text-[12px] font-semibold text-white/65">
            {inputs.hoursPerMonth} hrs/month Â· â‚¹{inputs.dieselPrice}/L diesel Â· â‚¹{inputs.ngPrice}/SmÂ³ NG
          </p>
        </div>

        {/* Hero â€” Saving Due to DFK */}
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

        {/* Hero â€” COâ‚‚ Saving */}
        <div className="mb-5 rounded-[3px] p-5"
          style={{
            background: co2Tone === "positive" ? "oklch(0.72 0.16 155 / 0.12)" : co2Tone === "negative" ? "oklch(0.72 0.2 28 / 0.14)" : "rgba(255,255,255,0.05)",
            border: `2px solid ${toneColor[co2Tone]}`,
          }}>
          <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/75">COâ‚‚ Saving Due to DFK</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-black" style={{ color: toneColor[co2Tone] }}>
                {co2SavingKgPerHr.toFixed(2)} kg
              </p>
              <p className="mt-1 text-[12px] font-bold text-white/70">COâ‚‚ / hr</p>
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
          <Row label="NG Consumption" value={`${ngConsumptionSm3PerHr.toFixed(1)} SmÂ³/hr`} accent />
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

        {/* COâ‚‚ Reduction */}
        <Section title="Environmental Impact (COâ‚‚)">
          <Row label="COâ‚‚ â€” Diesel Mode" value={`${dieselCO2KgPerHr.toFixed(2)} kg/hr`} />
          <Row label="COâ‚‚ â€” Dual-Fuel Mode" value={`${totalDualFuelCO2KgPerHr.toFixed(2)} kg/hr`} />
          <Row label="COâ‚‚ Saving / Month" value={`${(monthlyCO2SavingKg / 1000).toFixed(2)} tonnes`} tone={toneFor(monthlyCO2SavingKg)} />
          <Row label="COâ‚‚ Saving / Year" value={`${annualCO2SavingTonnes.toFixed(2)} tonnes`} tone={toneFor(annualCO2SavingTonnes)} />
          <div className="py-2">
            <p className="text-[9px] text-white/25 leading-relaxed">
              Diesel: 32 MJ/L Ã— 70.55 kg COâ‚‚/GJ. NG: 49 MJ/kg Ã— 55.22 kg COâ‚‚/GJ.
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
          â† Calculate Again
        </button>
      </div>
    </div>
  );
}
