export type GasType = "PNG" | "CNG" | "LPG";

export interface CalculatorInputs {
  // Step 1 — Diesel consumption (diesel-only mode)
  dieselConsumption: number;        // L/hr
  // Step 2 — Diesel price
  dieselPrice: number;              // ₹/L
  // Step 3 — Dual-fuel diesel consumption
  dualFuelDieselConsumption: number; // L/hr
  // Step 4 — Gas type
  gasType: GasType;
  // Step 5 — Gas consumption
  gasConsumption: number;           // Sm³/hr (PNG/CNG) or kg/hr (LPG)
  // Step 6 — Gas price
  gasPrice: number;                 // ₹/Sm³ or ₹/kg
  // Step 7 — Operating hours per day
  operatingHoursPerDay: number;
  // Step 8 — Operating days per month
  operatingDaysPerMonth: number;
}

export interface CalculatorResults {
  // Per-hour costs
  dieselOnlyCostPerHour: number;
  dualFuelDieselCostPerHour: number;
  gasCostPerHour: number;
  dualFuelCostPerHour: number;
  // Savings
  hourlySaving: number;
  dailySaving: number;
  monthlySaving: number;
  annualSaving: number;
  // Diesel metrics
  dieselReplacementPct: number;     // auto-calculated from both consumption values
  costReductionPct: number;
  // Volume metrics
  hourlyDieselReduction: number;    // L/hr
  monthlyDieselReduction: number;   // L/month
  annualDieselReduction: number;    // L/year
}

export function calculate(inputs: CalculatorInputs): CalculatorResults {
  const {
    dieselConsumption,
    dieselPrice,
    dualFuelDieselConsumption,
    gasConsumption,
    gasPrice,
    operatingHoursPerDay,
    operatingDaysPerMonth,
  } = inputs;

  const dieselOnlyCostPerHour     = dieselConsumption * dieselPrice;
  const dualFuelDieselCostPerHour = dualFuelDieselConsumption * dieselPrice;
  const gasCostPerHour            = gasConsumption * gasPrice;
  const dualFuelCostPerHour       = dualFuelDieselCostPerHour + gasCostPerHour;

  const hourlySaving  = dieselOnlyCostPerHour - dualFuelCostPerHour;
  const dailySaving   = hourlySaving * operatingHoursPerDay;
  const monthlySaving = dailySaving * operatingDaysPerMonth;
  const annualSaving  = monthlySaving * 12;

  const dieselReplacementPct =
    dieselConsumption > 0
      ? ((dieselConsumption - dualFuelDieselConsumption) / dieselConsumption) * 100
      : 0;

  const costReductionPct =
    dieselOnlyCostPerHour > 0
      ? (hourlySaving / dieselOnlyCostPerHour) * 100
      : 0;

  const hourlyDieselReduction  = dieselConsumption - dualFuelDieselConsumption;
  const monthlyDieselReduction = hourlyDieselReduction * operatingHoursPerDay * operatingDaysPerMonth;
  const annualDieselReduction  = monthlyDieselReduction * 12;

  return {
    dieselOnlyCostPerHour,
    dualFuelDieselCostPerHour,
    gasCostPerHour,
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
  };
}

/** Indian currency formatter */
export function formatINR(amount: number, compact = false): string {
  const rounded = Math.round(amount);
  if (!compact) {
    return "₹" + rounded.toLocaleString("en-IN");
  }
  const abs = Math.abs(amount);
  if (abs >= 1_00_00_000) return "₹" + (amount / 1_00_00_000).toFixed(2) + " Cr";
  if (abs >= 1_00_000)    return "₹" + (amount / 1_00_000).toFixed(2) + " L";
  if (abs >= 1_000)       return "₹" + (amount / 1_000).toFixed(1) + "K";
  return "₹" + rounded.toLocaleString("en-IN");
}

export function gasUnit(gasType: GasType): string {
  return gasType === "LPG" ? "kg/hr" : "Sm³/hr";
}

export function gasPriceUnit(gasType: GasType): string {
  return gasType === "LPG" ? "₹/kg" : "₹/Sm³";
}

export function validateStep(
  step: number,
  inputs: Partial<CalculatorInputs>
): string | null {
  switch (step) {
    case 1:
      if (!inputs.dieselConsumption || inputs.dieselConsumption <= 0)
        return "Please enter a valid diesel consumption.";
      break;
    case 2:
      if (!inputs.dieselPrice || inputs.dieselPrice <= 0)
        return "Please enter a valid diesel price.";
      break;
    case 3:
      if (inputs.dualFuelDieselConsumption === undefined || inputs.dualFuelDieselConsumption < 0)
        return "Please enter a valid dual-fuel diesel consumption.";
      if (
        inputs.dieselConsumption !== undefined &&
        inputs.dualFuelDieselConsumption > inputs.dieselConsumption
      )
        return "Dual-fuel diesel consumption cannot be higher than diesel-only consumption.";
      break;
    case 4:
      if (!inputs.gasType) return "Please select a gas type.";
      break;
    case 5:
      if (!inputs.gasConsumption || inputs.gasConsumption <= 0)
        return "Please enter a valid gas consumption.";
      break;
    case 6:
      if (!inputs.gasPrice || inputs.gasPrice <= 0)
        return "Please enter a valid gas price.";
      break;
    case 7:
      if (
        !inputs.operatingHoursPerDay ||
        inputs.operatingHoursPerDay <= 0 ||
        inputs.operatingHoursPerDay > 24
      )
        return "Operating hours must be between 1 and 24.";
      break;
    case 8:
      if (
        !inputs.operatingDaysPerMonth ||
        inputs.operatingDaysPerMonth <= 0 ||
        inputs.operatingDaysPerMonth > 31
      )
        return "Operating days must be between 1 and 31.";
      break;
  }
  return null;
}
