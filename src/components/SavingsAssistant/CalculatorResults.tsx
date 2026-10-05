import type { CalculatorInputs, CalculatorResults as Results } from "./calculatorUtils";
import { ANNUAL_OPERATING_MONTHS, formatINR } from "./calculatorUtils";

interface Props {
  inputs: CalculatorInputs;
  results: Results;
  onReset: () => void;
  onJoinMission: () => void;
}

export function CalculatorResults({ inputs, results, onReset, onJoinMission }: Props) {
  const {
    dieselConsumptionLPerHr,
    dfDieselConsumptionLPerHr,
    savingPerYear,
    costReductionPct,
    dieselReplacementPct,
    dieselCO2KgPerHr,
    co2SavingKgPerHr,
    annualCO2SavingTonnes,
  } = results;
  const annualDieselSavingLitres =
    (dieselConsumptionLPerHr - dfDieselConsumptionLPerHr) *
    inputs.hoursPerMonth *
    ANNUAL_OPERATING_MONTHS;
  const co2ReductionPct = dieselCO2KgPerHr > 0 ? (co2SavingKgPerHr / dieselCO2KgPerHr) * 100 : 0;

  return (
    <div className="calc-results flex h-full min-h-0 flex-col">
      <div className="flex-1 min-h-0 overflow-hidden px-3 py-3 sm:px-7 sm:py-5">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2 border-b border-white/15 pb-3 sm:mb-6 sm:gap-4 sm:pb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-[oklch(0.72_0.16_155)] sm:text-[11px]">
              Dual fuel assessment
            </p>
            <h3 className="mt-1 text-xl font-black text-white sm:mt-2 sm:text-2xl">
              Annual savings
            </h3>
          </div>
          <p className="text-sm text-white/65">
            {inputs.gensetRating} kVA{" · "}
            {inputs.load}% load{" · "}
            {inputs.hoursPerMonth} hrs/month · {inputs.altFuelType}
          </p>
        </div>
        <div className="hidden w-full rounded-[4px] border border-white/60 sm:block">
          <table className="w-full table-fixed border-collapse text-center text-white">
            <thead>
              <tr className="text-[10px] font-extrabold leading-tight text-[oklch(0.72_0.16_155)] sm:text-base">
                <th colSpan={2} className="break-words border border-white/50 px-0.5 py-2 sm:px-2">
                  Fuel Cost Savings
                </th>
                <th colSpan={2} className="break-words border border-white/50 px-0.5 py-2 sm:px-2">
                  Diesel Consumption Reduction
                </th>
                <th colSpan={2} className="break-words border border-white/50 px-0.5 py-2 sm:px-2">
                  CO₂ Emissions Reduction
                </th>
              </tr>
              <tr className="text-[8px] font-bold leading-tight text-[oklch(0.72_0.16_155)] sm:text-sm">
                <th className="break-words border border-white/50 px-0.5 py-2 sm:px-2">
                  INR / Year
                </th>
                <th className="break-words border border-white/50 px-0.5 py-2 sm:px-2">
                  % Reduction
                </th>
                <th className="break-words border border-white/50 px-0.5 py-2 sm:px-2">
                  Litres / Year
                </th>
                <th className="break-words border border-white/50 px-0.5 py-2 sm:px-2">
                  % Reduction
                </th>
                <th className="break-words border border-white/50 px-0.5 py-2 sm:px-2">
                  Tonnes CO₂ / Year
                </th>
                <th className="break-words border border-white/50 px-0.5 py-2 sm:px-2">
                  % Reduction
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white text-[11px] font-extrabold text-slate-900 sm:text-lg">
                <td className="break-words border border-slate-500 px-0.5 py-2 font-bold sm:px-2">
                  {formatINR(Math.ceil(savingPerYear), true).replace(/ L$/, " Lakh")}
                </td>
                <td className="break-words border border-slate-500 px-0.5 py-2 sm:px-2">
                  {Math.ceil(costReductionPct)}
                </td>
                <td className="break-words border border-slate-500 px-0.5 py-2 sm:px-2">
                  {Math.ceil(annualDieselSavingLitres).toLocaleString("en-IN")}
                </td>
                <td className="break-words border border-slate-500 px-0.5 py-2 sm:px-2">
                  {Math.ceil(dieselReplacementPct)}
                </td>
                <td className="break-words border border-slate-500 px-0.5 py-2 sm:px-2">
                  {Math.ceil(annualCO2SavingTonnes)}
                </td>
                <td className="break-words border border-slate-500 px-0.5 py-2 sm:px-2">
                  {Math.ceil(co2ReductionPct)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="space-y-2 sm:hidden">
          {[
            {
              title: "Fuel Cost Savings",
              amountLabel: "INR / Year",
              amount: formatINR(Math.ceil(savingPerYear), true).replace(/ L$/, " Lakh"),
              percent: Math.ceil(costReductionPct),
            },
            {
              title: "Diesel Consumption Reduction",
              amountLabel: "Litres / Year",
              amount: Math.ceil(annualDieselSavingLitres).toLocaleString("en-IN"),
              percent: Math.ceil(dieselReplacementPct),
            },
            {
              title: "CO₂ Emissions Reduction",
              amountLabel: "Tonnes CO₂ / Year",
              amount: Math.ceil(annualCO2SavingTonnes).toLocaleString("en-IN"),
              percent: Math.ceil(co2ReductionPct),
            },
          ].map(({ title, amountLabel, amount, percent }) => (
            <section
              key={title}
              className="rounded-md border border-white/50 bg-white/[0.04] px-3 py-2.5"
            >
              <h4 className="text-xs font-bold text-[oklch(0.72_0.16_155)]">{title}</h4>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-bold text-[oklch(0.72_0.16_155)]">{amountLabel}</p>
                  <p className="text-sm font-bold text-white">{amount}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[oklch(0.72_0.16_155)]">% Reduction</p>
                  <p className="text-sm font-bold text-white">{percent}%</p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
      <div className="shrink-0 border-t border-white/15 px-5 py-4 sm:px-7">
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onReset}
            className="h-11 w-full border-2 border-white/35 text-xs font-extrabold uppercase tracking-[0.1em] text-white transition-colors hover:border-[oklch(0.72_0.16_155)] hover:text-[oklch(0.72_0.16_155)]"
          >
            Calculate again
          </button>
          <a
            href="#contact"
            onClick={onJoinMission}
            className="flex h-11 w-full items-center justify-center border-2 border-[oklch(0.72_0.16_155)] bg-[oklch(0.72_0.16_155)] px-3 text-center text-xs font-extrabold uppercase tracking-[0.1em] text-[oklch(0.14_0.04_158)] transition-colors hover:border-white hover:bg-white"
          >
            Join this Mission
          </a>
        </div>
      </div>
    </div>
  );
}
