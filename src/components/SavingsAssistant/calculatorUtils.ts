// ─────────────────────────────────────────────────────────────────────────────
// INTERNAL ENGINEERING CONSTANTS
// Source: "VIMP BMEP DFK Saving Calculator webpage 16Sep2026.xlsx"
// These are NOT user inputs. Do not expose them to the UI.
// ─────────────────────────────────────────────────────────────────────────────

export const POWER_FACTOR             = 0.8;       // dimensionless
export const ALTERNATOR_EFFICIENCY    = 91;         // %
export const PARASITIC_LOAD_PCT       = 7;          // %
export const ENGINE_THERMAL_EFF       = 39;         // %
export const DIESEL_LHV               = 32;         // MJ/L
export const NG_LHV                   = 49;         // MJ/kg
export const DIESEL_DENSITY           = 0.78;       // kg/L
export const NG_DENSITY               = 0.75;       // kg/Sm³
export const DIESEL_REPLACEMENT_PCT   = 50;         // % (fixed by Excel)
export const DIESEL_CO2_FACTOR        = 70.55;      // kg CO₂/GJ
export const NG_CO2_FACTOR            = 55.22;      // kg CO₂/GJ

// ─────────────────────────────────────────────────────────────────────────────
// INPUT / RESULT TYPES
// ─────────────────────────────────────────────────────────────────────────────

/** Only 6 values collected from the user */
export interface CalculatorInputs {
  gensetRating:  number;   // kVA
  load:          number;   // %
  altFuelType:   "NG";     // always NG — no other options
  hoursPerMonth: number;   // hours/month
  dieselPrice:   number;   // ₹/L
  ngPrice:       number;   // ₹/Sm³
}

export interface CalculatorResults {
  // ── Intermediate engine values (displayed for transparency) ────────────────
  operatingGensetRating:  number;   // kVA
  electricalPowerKWe:     number;   // kWe
  engineBrakePower:       number;   // kW
  parasiticLoad:          number;   // kW
  totalEngineBrakePower:  number;   // kW
  engineIndicatedPower:   number;   // kW
  indicatedEnergyPerHr:   number;   // MJ/hr

  // ── Fuel consumption ───────────────────────────────────────────────────────
  dieselConsumptionLPerHr:    number;   // L/hr
  dfDieselConsumptionLPerHr:  number;   // L/hr
  ngConsumptionKgPerHr:       number;   // kg/hr
  ngConsumptionSm3PerHr:      number;   // Sm³/hr

  // ── Cost ───────────────────────────────────────────────────────────────────
  dieselCostPerHr:        number;   // ₹/hr
  dfDieselCostPerHr:      number;   // ₹/hr
  ngCostPerHr:            number;   // ₹/hr
  totalDualFuelCostPerHr: number;   // ₹/hr
  savingPerHour:          number;   // ₹/hr
  savingPerMonth:         number;   // ₹/month
  savingPerYear:          number;   // ₹/year
  costReductionPct:       number;   // %
  dieselReplacementPct:   number;   // %

  // ── CO₂ ────────────────────────────────────────────────────────────────────
  dieselCO2KgPerHr:           number;   // kg/hr
  dfDieselCO2KgPerHr:         number;   // kg/hr
  ngCO2KgPerHr:               number;   // kg/hr
  totalDualFuelCO2KgPerHr:    number;   // kg/hr
  co2SavingKgPerHr:           number;   // kg/hr
  monthlyCO2SavingKg:         number;   // kg/month
  annualCO2SavingTonnes:      number;   // tonnes/year
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN CALCULATION — follows Excel sequence exactly
// ─────────────────────────────────────────────────────────────────────────────

export function calculate(inputs: CalculatorInputs): CalculatorResults {
  const { gensetRating, load, hoursPerMonth, dieselPrice, ngPrice } = inputs;

  // Step 1 — Operating Genset Rating
  const operatingGensetRating = gensetRating * (load / 100);

  // Step 2 — Electrical Power (kWe)
  const electricalPowerKWe = operatingGensetRating * POWER_FACTOR;

  // Step 3 — Engine Brake Power
  const engineBrakePower = (electricalPowerKWe * 100) / ALTERNATOR_EFFICIENCY;

  // Step 4 — Parasitic Load
  const parasiticLoad = (engineBrakePower * PARASITIC_LOAD_PCT) / 100;

  // Step 5 — Total Engine Brake Power
  const totalEngineBrakePower = engineBrakePower + parasiticLoad;

  // Step 6 — Engine Indicated Power (kW = kJ/s)
  const engineIndicatedPower = (totalEngineBrakePower * 100) / ENGINE_THERMAL_EFF;

  // Step 7 — Indicated Energy per Hour (MJ/hr)
  const indicatedEnergyPerHr = engineIndicatedPower * 3.6;

  // ── Pure Diesel ─────────────────────────────────────────────────────────────
  const dieselConsumptionLPerHr = indicatedEnergyPerHr / DIESEL_LHV;
  const dieselCostPerHr         = dieselConsumptionLPerHr * dieselPrice;

  // ── Dual Fuel — NG ──────────────────────────────────────────────────────────
  const dfDieselConsumptionLPerHr = dieselConsumptionLPerHr * (DIESEL_REPLACEMENT_PCT / 100);

  const ngEnergyPerHr         = indicatedEnergyPerHr * (1 - DIESEL_REPLACEMENT_PCT / 100);
  const ngConsumptionKgPerHr  = ngEnergyPerHr / NG_LHV;
  const ngConsumptionSm3PerHr = ngConsumptionKgPerHr / NG_DENSITY;

  const dfDieselCostPerHr        = dfDieselConsumptionLPerHr * dieselPrice;
  const ngCostPerHr              = ngConsumptionSm3PerHr * ngPrice;
  const totalDualFuelCostPerHr   = dfDieselCostPerHr + ngCostPerHr;

  // ── Savings ─────────────────────────────────────────────────────────────────
  const savingPerHour      = dieselCostPerHr - totalDualFuelCostPerHr;
  const savingPerMonth     = savingPerHour * hoursPerMonth;
  const savingPerYear      = savingPerMonth * 12;
  const costReductionPct   = dieselCostPerHr > 0 ? (savingPerHour / dieselCostPerHr) * 100 : 0;
  const dieselReplacementPct =
    dieselConsumptionLPerHr > 0
      ? ((dieselConsumptionLPerHr - dfDieselConsumptionLPerHr) / dieselConsumptionLPerHr) * 100
      : 0;

  // ── CO₂ — using LHV-based GJ methodology from Excel ─────────────────────────
  const dieselCO2KgPerHr        = (dieselConsumptionLPerHr   * DIESEL_LHV / 1000) * DIESEL_CO2_FACTOR;
  const dfDieselCO2KgPerHr      = (dfDieselConsumptionLPerHr * DIESEL_LHV / 1000) * DIESEL_CO2_FACTOR;
  const ngCO2KgPerHr            = (ngConsumptionKgPerHr      * NG_LHV    / 1000) * NG_CO2_FACTOR;
  const totalDualFuelCO2KgPerHr = dfDieselCO2KgPerHr + ngCO2KgPerHr;
  const co2SavingKgPerHr        = dieselCO2KgPerHr - totalDualFuelCO2KgPerHr;
  const monthlyCO2SavingKg      = co2SavingKgPerHr * hoursPerMonth;
  const annualCO2SavingTonnes   = (monthlyCO2SavingKg * 12) / 1000;

  return {
    operatingGensetRating,
    electricalPowerKWe,
    engineBrakePower,
    parasiticLoad,
    totalEngineBrakePower,
    engineIndicatedPower,
    indicatedEnergyPerHr,
    dieselConsumptionLPerHr,
    dfDieselConsumptionLPerHr,
    ngConsumptionKgPerHr,
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
    dfDieselCO2KgPerHr,
    ngCO2KgPerHr,
    totalDualFuelCO2KgPerHr,
    co2SavingKgPerHr,
    monthlyCO2SavingKg,
    annualCO2SavingTonnes,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

export function formatINR(amount: number, compact = false): string {
  const rounded = Math.round(amount);
  if (!compact) return "₹" + rounded.toLocaleString("en-IN");
  const abs = Math.abs(amount);
  if (abs >= 1_00_00_000) return "₹" + (amount / 1_00_00_000).toFixed(2) + " Cr";
  if (abs >= 1_00_000)    return "₹" + (amount / 1_00_000).toFixed(2) + " L";
  if (abs >= 1_000)       return "₹" + (amount / 1_000).toFixed(1) + "K";
  return "₹" + rounded.toLocaleString("en-IN");
}

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION
// ─────────────────────────────────────────────────────────────────────────────

export function validateStep(step: number, inputs: Partial<CalculatorInputs>): string | null {
  switch (step) {
    case 1:
      if (!inputs.gensetRating || inputs.gensetRating <= 0)
        return "Please enter a valid genset rating.";
      if (inputs.load === undefined || inputs.load <= 0 || inputs.load > 100)
        return "Load must be between 1 and 100%.";
      break;
    case 2:
      if (!inputs.hoursPerMonth || inputs.hoursPerMonth <= 0)
        return "Please enter valid operating hours per month.";
      break;
    case 3:
      if (!inputs.dieselPrice || inputs.dieselPrice <= 0)
        return "Please enter a valid diesel price.";
      if (!inputs.ngPrice || inputs.ngPrice <= 0)
        return "Please enter a valid NG price.";
      break;
  }
  return null;
}
