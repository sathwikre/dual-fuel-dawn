// Source of truth: "Webpage Calculations" in the OM Solutions workbook.
// Keep these values separate from the workbook's "DFK Calculator BMEP" model.
export const POWER_FACTOR = 0.8;
export const ALTERNATOR_EFFICIENCY_PCT = 96;
export const PARASITIC_LOAD_PCT = 10; // B8 formula is B7*0.1; cached example confirms 10%.
export const ENGINE_MECHANICAL_EFFICIENCY_PCT = 90;
export const ENGINE_THERMAL_EFFICIENCY_PCT = 49;
export const DIESEL_LHV_MJ_PER_L = 32;
export const DIESEL_CO2_KG_PER_GJ = 70.55;
export const ANNUAL_OPERATING_MONTHS = 10; // Webpage Calculations annualizes D30/G30 by multiplying by 10.

export type AlternateFuel = "PNG" | "LPG";

/** Fuel properties from D33:I35 of "Webpage Calculations". */
export const ALTERNATE_FUEL_PROPERTIES: Record<
  AlternateFuel,
  {
    lhvMJPerKg: number;
    densityKgPerSm3?: number;
    dieselSubstitutionPct: number;
    co2KgPerGJ: number;
  }
> = {
  PNG: { lhvMJPerKg: 47, densityKgPerSm3: 0.72, dieselSubstitutionPct: 50, co2KgPerGJ: 55.22 },
  LPG: { lhvMJPerKg: 50, dieselSubstitutionPct: 40, co2KgPerGJ: 63.35 },
};

export interface CalculatorInputs {
  gensetRating: number; // kVA
  load: number; // %
  altFuelType: AlternateFuel;
  hoursPerMonth: number;
  dieselPrice: number; // ₹/L
  pngPrice: number; // ₹/Sm³
  lpgPrice: number; // ₹/kg
}

export interface CalculatorResults {
  operatingGensetRating: number;
  electricalPowerKWe: number;
  engineBrakePower: number;
  parasiticLoad: number;
  totalEngineBrakePower: number;
  engineIndicatedPower: number;
  energyInputMJPerHr: number;
  dieselConsumptionLPerHr: number;
  dfDieselConsumptionLPerHr: number;
  alternateFuelConsumptionKgPerHr: number;
  alternateFuelConsumptionBillingUnitPerHr: number;
  alternateFuelBillingUnit: "Sm³" | "kg";
  dieselCostPerHr: number;
  dfDieselCostPerHr: number;
  alternateFuelCostPerHr: number;
  totalDualFuelCostPerHr: number;
  savingPerHour: number;
  savingPerMonth: number;
  savingPerYear: number;
  costReductionPct: number;
  dieselReplacementPct: number;
  dieselCO2KgPerHr: number;
  dfDieselCO2KgPerHr: number;
  alternateFuelCO2KgPerHr: number;
  totalDualFuelCO2KgPerHr: number;
  co2SavingKgPerHr: number;
  monthlyCO2SavingKg: number;
  annualCO2SavingTonnes: number;
}

/**
 * Workbook calculation order and equivalent formulas:
 * B3=B1*B2/100; D1=B3*B4; B7=D1*100/B6; B8=B7*10%; B9=B7+B8;
 * B11=B9/(B10/100); B13=B11/(B12/100); B14=B13*3.6;
 * B23=B14/B17; B26=B23*(1-substitution%); B27=(B23-B26)*B17/B18;
 * PNG bills B27/B20 in Sm³; LPG bills B27 in kg. Costs and CO₂ follow the
 * selected fuel's own units/properties; workbook B28's Sm³ conversion is not
 * applied to LPG because its stated price unit is INR/kg.
 */
export function calculate(inputs: CalculatorInputs): CalculatorResults {
  const { gensetRating, load, altFuelType, hoursPerMonth, dieselPrice, pngPrice, lpgPrice } =
    inputs;
  const fuel = ALTERNATE_FUEL_PROPERTIES[altFuelType];

  // Genset rating → load → electrical power → engine brake power.
  const operatingGensetRating = gensetRating * (load / 100);
  const electricalPowerKWe = operatingGensetRating * POWER_FACTOR;
  const engineBrakePower = electricalPowerKWe / (ALTERNATOR_EFFICIENCY_PCT / 100);

  // The selected Webpage Calculations formula is B8=B7*0.1 (10%).
  const parasiticLoad = engineBrakePower * (PARASITIC_LOAD_PCT / 100);
  const totalEngineBrakePower = engineBrakePower + parasiticLoad;
  const engineIndicatedPower = totalEngineBrakePower / (ENGINE_MECHANICAL_EFFICIENCY_PCT / 100);
  const indicatedPowerKJPerSec = engineIndicatedPower;
  const energyInputMJPerHr = (indicatedPowerKJPerSec / (ENGINE_THERMAL_EFFICIENCY_PCT / 100)) * 3.6;

  // Pure diesel consumption → dual-fuel diesel → alternate fuel mass.
  const dieselConsumptionLPerHr = energyInputMJPerHr / DIESEL_LHV_MJ_PER_L;
  const dfDieselConsumptionLPerHr =
    dieselConsumptionLPerHr * (1 - fuel.dieselSubstitutionPct / 100);
  const alternateFuelConsumptionKgPerHr =
    ((dieselConsumptionLPerHr - dfDieselConsumptionLPerHr) * DIESEL_LHV_MJ_PER_L) / fuel.lhvMJPerKg;

  // PNG billing uses Sm³; LPG billing uses kg. Never price LPG by volume.
  const alternateFuelBillingUnit = altFuelType === "PNG" ? "Sm³" : "kg";
  const alternateFuelConsumptionBillingUnitPerHr =
    altFuelType === "PNG"
      ? alternateFuelConsumptionKgPerHr / fuel.densityKgPerSm3!
      : alternateFuelConsumptionKgPerHr;
  const alternateFuelPrice = altFuelType === "PNG" ? pngPrice : lpgPrice;

  // Fuel costs and savings.
  const dieselCostPerHr = dieselConsumptionLPerHr * dieselPrice;
  const dfDieselCostPerHr = dfDieselConsumptionLPerHr * dieselPrice;
  const alternateFuelCostPerHr = alternateFuelConsumptionBillingUnitPerHr * alternateFuelPrice;
  const totalDualFuelCostPerHr = dfDieselCostPerHr + alternateFuelCostPerHr;
  const savingPerHour = dieselCostPerHr - totalDualFuelCostPerHr;
  const savingPerMonth = savingPerHour * hoursPerMonth;
  const savingPerYear = savingPerMonth * ANNUAL_OPERATING_MONTHS;
  const costReductionPct = dieselCostPerHr > 0 ? (savingPerHour / dieselCostPerHr) * 100 : 0;
  const dieselReplacementPct =
    dieselConsumptionLPerHr > 0
      ? ((dieselConsumptionLPerHr - dfDieselConsumptionLPerHr) / dieselConsumptionLPerHr) * 100
      : 0;

  // CO₂ uses the selected fuel's LHV and kg/GJ factor from this same sheet.
  const dieselCO2KgPerHr =
    ((dieselConsumptionLPerHr * DIESEL_LHV_MJ_PER_L) / 1000) * DIESEL_CO2_KG_PER_GJ;
  const dfDieselCO2KgPerHr =
    ((dfDieselConsumptionLPerHr * DIESEL_LHV_MJ_PER_L) / 1000) * DIESEL_CO2_KG_PER_GJ;
  const alternateFuelCO2KgPerHr =
    ((alternateFuelConsumptionKgPerHr * fuel.lhvMJPerKg) / 1000) * fuel.co2KgPerGJ;
  const totalDualFuelCO2KgPerHr = dfDieselCO2KgPerHr + alternateFuelCO2KgPerHr;
  const co2SavingKgPerHr = dieselCO2KgPerHr - totalDualFuelCO2KgPerHr;
  const monthlyCO2SavingKg = co2SavingKgPerHr * hoursPerMonth;
  const annualCO2SavingTonnes = (monthlyCO2SavingKg * ANNUAL_OPERATING_MONTHS) / 1000;

  return {
    operatingGensetRating,
    electricalPowerKWe,
    engineBrakePower,
    parasiticLoad,
    totalEngineBrakePower,
    engineIndicatedPower,
    energyInputMJPerHr,
    dieselConsumptionLPerHr,
    dfDieselConsumptionLPerHr,
    alternateFuelConsumptionKgPerHr,
    alternateFuelConsumptionBillingUnitPerHr,
    alternateFuelBillingUnit,
    dieselCostPerHr,
    dfDieselCostPerHr,
    alternateFuelCostPerHr,
    totalDualFuelCostPerHr,
    savingPerHour,
    savingPerMonth,
    savingPerYear,
    costReductionPct,
    dieselReplacementPct,
    dieselCO2KgPerHr,
    dfDieselCO2KgPerHr,
    alternateFuelCO2KgPerHr,
    totalDualFuelCO2KgPerHr,
    co2SavingKgPerHr,
    monthlyCO2SavingKg,
    annualCO2SavingTonnes,
  };
}

export function formatINR(amount: number, compact = false): string {
  const rounded = Math.round(amount);
  if (!compact) return "₹" + rounded.toLocaleString("en-IN");
  const abs = Math.abs(amount);
  if (abs >= 1_00_00_000) return "₹" + (amount / 1_00_00_000).toFixed(2) + " Cr";
  if (abs >= 1_00_000) return "₹" + (amount / 1_00_000).toFixed(2) + " L";
  if (abs >= 1_000) return "₹" + (amount / 1_000).toFixed(1) + "K";
  return "₹" + rounded.toLocaleString("en-IN");
}

export function validateStep(step: number, inputs: Partial<CalculatorInputs>): string | null {
  switch (step) {
    case 1:
      if (!inputs.gensetRating || inputs.gensetRating <= 0)
        return "Please enter a valid genset rating.";
      if (inputs.load === undefined || inputs.load < 40 || inputs.load > 75)
        return "Load must be between 40 and 75%.";
      break;
    case 2:
      if (!inputs.hoursPerMonth || inputs.hoursPerMonth <= 0)
        return "Please enter valid operating hours per month.";
      break;
    case 3:
      if (!inputs.dieselPrice || inputs.dieselPrice <= 0)
        return "Please enter a valid diesel price.";
      if (inputs.altFuelType === "PNG" && (!inputs.pngPrice || inputs.pngPrice <= 0))
        return "Please enter a valid PNG price.";
      if (inputs.altFuelType === "LPG" && (!inputs.lpgPrice || inputs.lpgPrice <= 0))
        return "Please enter a valid LPG price.";
      break;
  }
  return null;
}
