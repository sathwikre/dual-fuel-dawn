import type { CalculatorInputs, CalculatorResults as Results } from "./calculatorUtils";
import { ANNUAL_OPERATING_MONTHS, formatINR } from "./calculatorUtils";
import { Fuel, IndianRupee, Leaf } from "lucide-react";

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
  // Shared top-table figures: lower summary cards must use these exact displayed values.
  const annualFuelCostSavings = Math.ceil(savingPerYear);
  const annualDieselReduction = Math.round(annualDieselSavingLitres);
  const annualCO2ReductionTonnes = Math.ceil(annualCO2SavingTonnes);
  const fuelCostReductionPercent = Math.ceil(costReductionPct);
  const dieselReductionPercent = Math.ceil(dieselReplacementPct);
  const co2ReductionPercent = Math.ceil(co2ReductionPct);
  const summaryCards = [
    {
      title: "Fuel Cost Savings",
      Icon: IndianRupee,
      percent: fuelCostReductionPercent,
      values: [
        {
          period: "Hourly",
          value: results.savingPerHour,
          unit: "/hr",
          currency: true,
        },
        {
          period: "Monthly",
          value: results.savingPerMonth,
          unit: "/month",
          currency: true,
        },
        {
          period: "Annually",
          value: annualFuelCostSavings,
          unit: "/year",
          currency: true,
          compact: true,
        },
      ],
    },
    {
      title: "Diesel Consumption Reduction",
      Icon: Fuel,
      percent: dieselReductionPercent,
      values: [
        {
          period: "Hourly",
          value: dieselConsumptionLPerHr - dfDieselConsumptionLPerHr,
          unit: "L/hr",
          currency: false,
        },
        {
          period: "Monthly",
          value: (dieselConsumptionLPerHr - dfDieselConsumptionLPerHr) * inputs.hoursPerMonth,
          unit: "L/month",
          currency: false,
        },
        {
          period: "Annually",
          value: annualDieselReduction,
          unit: "L/year",
          currency: false,
        },
      ],
    },
    {
      title: "CO₂ Emissions Reduction",
      Icon: Leaf,
      percent: co2ReductionPercent,
      values: [
        {
          period: "Hourly",
          value: co2SavingKgPerHr,
          unit: "kg CO₂/hr",
          currency: false,
        },
        {
          period: "Monthly",
          value: results.monthlyCO2SavingKg,
          unit: "kg CO₂/month",
          currency: false,
        },
        {
          period: "Annually",
          value: annualCO2ReductionTonnes,
          unit: `t CO₂/year · ${(annualCO2ReductionTonnes * 1000).toLocaleString("en-IN")} kg/year`,
          currency: false,
        },
      ],
    },
  ];

  const formatSummaryValue = (value: number, currency: boolean, compact = false) => {
    if (!Number.isFinite(value)) return "—";
    if (currency) {
      return compact ? formatINR(value, true).replace(/ L$/, " Lakh") : formatINR(value);
    }
    return value.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  };

  return (
    <div className="calc-results flex h-full min-h-0 flex-col">
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-3 sm:px-7 sm:py-5">
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
              <tr className="bg-transparent text-[11px] font-extrabold text-white sm:text-lg">
                <td className="break-words border border-white/50 px-0.5 py-2 font-bold sm:px-2">
                  {formatINR(annualFuelCostSavings, true).replace(/ L$/, " Lakh")}
                </td>
                <td className="break-words border border-white/50 px-0.5 py-2 sm:px-2">
                  {fuelCostReductionPercent}
                </td>
                <td className="break-words border border-white/50 px-0.5 py-2 sm:px-2">
                  {annualDieselReduction.toLocaleString("en-IN")}
                </td>
                <td className="break-words border border-white/50 px-0.5 py-2 sm:px-2">
                  {dieselReductionPercent}
                </td>
                <td className="break-words border border-white/50 px-0.5 py-2 sm:px-2">
                  {annualCO2ReductionTonnes}
                </td>
                <td className="break-words border border-white/50 px-0.5 py-2 sm:px-2">
                  {co2ReductionPercent}
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
              amount: formatINR(annualFuelCostSavings, true).replace(/ L$/, " Lakh"),
              percent: fuelCostReductionPercent,
            },
            {
              title: "Diesel Consumption Reduction",
              amountLabel: "Litres / Year",
              amount: annualDieselReduction.toLocaleString("en-IN"),
              percent: dieselReductionPercent,
            },
            {
              title: "CO₂ Emissions Reduction",
              amountLabel: "Tonnes CO₂ / Year",
              amount: annualCO2ReductionTonnes.toLocaleString("en-IN"),
              percent: co2ReductionPercent,
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
        <section
          className="mt-6 border-t border-white/15 pt-5"
          aria-label="Hourly, monthly and annual savings"
        >
          <h4 className="mb-3 text-sm font-extrabold uppercase tracking-[0.12em] text-[oklch(0.72_0.16_155)]">
            Savings Summary
          </h4>
          <div className="grid gap-3 sm:grid-cols-3">
            {summaryCards.map(({ title, Icon, percent, values }) => (
              <article
                key={title}
                className="group rounded-lg border border-white/15 bg-white/[0.04] p-4 shadow-[0_8px_22px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[oklch(0.72_0.16_155)/0.55]"
              >
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-md border border-[oklch(0.72_0.16_155/0.35)] bg-[oklch(0.72_0.16_155/0.1)] text-[oklch(0.72_0.16_155)]">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <h5 className="text-xs font-black uppercase leading-snug tracking-[0.06em] text-white sm:text-sm">
                    {title}
                  </h5>
                </div>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {values.map((item) => (
                    <div key={item.period} className="min-w-0">
                      <p className="text-[9px] font-black uppercase tracking-[0.08em] text-white sm:text-xs">
                        {item.period}
                      </p>
                      <p className="mt-1 break-words text-[11px] font-black leading-tight text-[oklch(0.72_0.16_155)] sm:text-base">
                        {formatSummaryValue(
                          item.value,
                          item.currency,
                          "compact" in item && item.compact,
                        )}
                      </p>
                      <p className="mt-1 break-words text-[9px] font-extrabold leading-tight text-white sm:text-xs">
                        {item.unit}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 border-t border-white/10 pt-2 text-[11px] font-black text-white sm:text-sm">
                  {percent}% reduction
                </p>
              </article>
            ))}
          </div>
        </section>
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
