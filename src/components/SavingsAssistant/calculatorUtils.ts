export type AltFuelType = "PNG" | "LPG";

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT-PROVIDED EMISSION FACTORS (from OM Solutions handwritten note)
// Source: Prasad Parulekar, 12 September
//
// DIESEL:
//   1 litre Diesel = 30 MJ = 0.03 GJ
//   CO₂ generated (Diesel mode) = 70.55 kg CO₂/GJ
//   ∴ 1 litre Diesel → 0.03 × 70.55 = 2.1165 kg CO₂
//
// NATURAL GAS:
//   1 kg Natural Gas = 50 MJ = 0.05 GJ
//   CO₂ generated (NG) = 55.22 kg CO₂/GJ
//   ∴ 1 kg Natural Gas → 0.05 × 55.22 = 2.761 kg CO₂
//
// PNG → kg conversion:
//   NOT provided by client. CO₂ for PNG is therefore NOT calculated
//   until the client confirms the Sm³→kg density conversion.
//   This constant is kept as a placeholder — set to 0 to signal "unavailable".
//   Replace with the client-approved value (e.g. 0.717 kg/Sm³ for pipeline gas)
//   once confirmed.
// ─────────────────────────────────────────────────────────────────────────────

/** Diesel: energy content (GJ per litre) — client value */
export const DIESEL_GJ_PER_LITRE = 0.03;
/** Diesel: CO₂ emission intensity — client value (kg CO₂ / GJ) */
export const DIESEL_CO2_PER_GJ = 70.55;
/** Derived: kg CO₂ per litre of diesel = 0.03 × 70.55 = 2.1165 */
export const DIESEL_CO2_PER_LITRE = DIESEL_GJ_PER_LITRE * DIESEL_CO2_PER_GJ; // 2.1165

/** Natural Gas: energy content (GJ per kg) — client value */
export const NG_GJ_PER_KG = 0.05;
/** Natural Gas: CO₂ emission intensity — client value (kg CO₂ / GJ) */
export const NG_CO2_PER_GJ = 55.22;
/** Derived: kg CO₂ per kg of Natural Gas = 0.05 × 55.22 = 2.761 */
export const NG_CO2_PER_KG = NG_GJ_PER_KG * NG_CO2_PER_GJ; // 2.761

/**
 * PNG volumetric density (kg per Sm³).
 * Client-confirmed value for pipeline natural gas at standard conditions.
 * Source: OM Solutions client reference.
 */
export const PNG_KG_PER_SM3: number = 0.717; // kg / Sm³

// ─────────────────────────────────────────────────────────────────────────────
// INPUT TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface CalculatorInputs {
  // ── A. Genset / Engine information ─────────────────────────────────────────
  gensetRating: number;         // kVA  (e.g. 500)
  load: number;                 // %    (e.g. 75)
  altFuelType: AltFuelType;     // PNG | LPG

  // ── B. Operating information ────────────────────────────────────────────────
  hoursPerMonth: number;        // Hours/month (e.g. 40)

  // ── C. Fuel prices ──────────────────────────────────────────────────────────
  dieselPrice: number;          // INR/litre  (e.g. 94)
  lpgPrice: number;             // INR/kg     (e.g. 190)
  pngPrice: number;             // INR/Sm³    (e.g. 85)

  // ── D. Fuel consumption values ──────────────────────────────────────────────
  // The derivation formula from kVA/load is not provided by the client.
  // These are entered directly by the user (or can be pre-filled once the
  // client provides the engine-parameter formula).
  dieselConsumption: number;            // L/hr  (diesel-only mode, e.g. 78.3)
  dfDieselConsumption: number;          // L/hr  (dual-fuel diesel, e.g. 39.2)
  dfAltFuelConsumption: number;         // Sm³/hr (PNG) or kg/hr (LPG), e.g. 36.7
}

// ─────────────────────────────────────────────────────────────────────────────
// RESULT TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface CalculatorResults {
  // ── Operating economics ─────────────────────────────────────────────────────
  dieselModeCostPerHour: number;    // Diesel Consumption × Diesel Price
  dfDieselCostPerHour: number;      // DF Diesel × Diesel Price
  altFuelCostPerHour: number;       // DF Gas × Gas Price (PNG or LPG)
  totalDfCostPerHour: number;       // dfDiesel + altFuel

  savingPerHour: number;            // dieselMode - totalDF
  savingPerMonth: number;           // savingPerHour × hoursPerMonth
  savingPerYear: number;            // savingPerMonth × 12

  costReductionPct: number;         // (saving / dieselMode) × 100
  dieselReplacementPct: number;     // (dieselCons - dfDieselCons) / dieselCons × 100

  // ── CO₂ ─────────────────────────────────────────────────────────────────────
  // Diesel-mode CO₂ (always available — uses DIESEL_CO2_PER_LITRE)
  co2DieselModePerHour: number;     // dieselConsumption × DIESEL_CO2_PER_LITRE  (kg/hr)

  // Dual-fuel CO₂ — depends on fuel type and available conversion factors
  co2DfDieselPerHour: number;       // dfDieselConsumption × DIESEL_CO2_PER_LITRE (kg/hr)
  /**
   * CO₂ from the alternative fuel per hour.
   * For LPG: dfAltFuelConsumption (kg/hr) × NG_CO2_PER_KG
   * For PNG: requires PNG_KG_PER_SM3 > 0. If unavailable, this is null.
   */
  co2AltFuelPerHour: number | null; // null means "conversion factor not available"

  co2DfTotalPerHour: number | null; // dfDiesel CO₂ + altFuel CO₂ (null if altFuel unknown)
  co2ReductionPerHour: number | null;
  co2ReductionPerMonth: number | null;
  co2ReductionPerYear: number | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATION
// ─────────────────────────────────────────────────────────────────────────────

export function calculate(inputs: CalculatorInputs): CalculatorResults {
  const {
    altFuelType,
    hoursPerMonth,
    dieselPrice,
    lpgPrice,
    pngPrice,
    dieselConsumption,
    dfDieselConsumption,
    dfAltFuelConsumption,
  } = inputs;

  // ── Operating economics ────────────────────────────────────────────────────

  const dieselModeCostPerHour = dieselConsumption * dieselPrice;
  const dfDieselCostPerHour   = dfDieselConsumption * dieselPrice;

  // Gas cost depends on selected fuel
  const gasPrice = altFuelType === "LPG" ? lpgPrice : pngPrice;
  const altFuelCostPerHour = dfAltFuelConsumption * gasPrice;

  const totalDfCostPerHour = dfDieselCostPerHour + altFuelCostPerHour;

  const savingPerHour  = dieselModeCostPerHour - totalDfCostPerHour;
  const savingPerMonth = savingPerHour * hoursPerMonth;
  const savingPerYear  = savingPerMonth * 12;

  const costReductionPct =
    dieselModeCostPerHour > 0
      ? (savingPerHour / dieselModeCostPerHour) * 100
      : 0;

  const dieselReplacementPct =
    dieselConsumption > 0
      ? ((dieselConsumption - dfDieselConsumption) / dieselConsumption) * 100
      : 0;

  // ── CO₂ ────────────────────────────────────────────────────────────────────

  // Diesel-mode CO₂ — always calculable
  const co2DieselModePerHour = dieselConsumption * DIESEL_CO2_PER_LITRE;
  const co2DfDieselPerHour   = dfDieselConsumption * DIESEL_CO2_PER_LITRE;

  // Alt-fuel CO₂
  let co2AltFuelPerHour: number | null;
  if (altFuelType === "LPG") {
    // LPG consumption is already in kg/hr — use NG_CO2_PER_KG directly
    co2AltFuelPerHour = dfAltFuelConsumption * NG_CO2_PER_KG;
  } else {
    // PNG: consumption is Sm³/hr — requires PNG_KG_PER_SM3 to convert
    if (PNG_KG_PER_SM3 > 0) {
      const pngKgPerHour = dfAltFuelConsumption * PNG_KG_PER_SM3;
      co2AltFuelPerHour = pngKgPerHour * NG_CO2_PER_KG;
    } else {
      co2AltFuelPerHour = null; // Conversion factor not yet confirmed by client
    }
  }

  const co2DfTotalPerHour =
    co2AltFuelPerHour !== null ? co2DfDieselPerHour + co2AltFuelPerHour : null;

  const co2ReductionPerHour =
    co2DfTotalPerHour !== null ? co2DieselModePerHour - co2DfTotalPerHour : null;

  const co2ReductionPerMonth =
    co2ReductionPerHour !== null ? co2ReductionPerHour * hoursPerMonth : null;

  const co2ReductionPerYear =
    co2ReductionPerMonth !== null ? co2ReductionPerMonth * 12 : null;

  return {
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
    co2DfDieselPerHour,
    co2AltFuelPerHour,
    co2DfTotalPerHour,
    co2ReductionPerHour,
    co2ReductionPerMonth,
    co2ReductionPerYear,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Indian currency formatter — whole rupees, compact for large values */
export function formatINR(amount: number, compact = false): string {
  const rounded = Math.round(amount);
  if (!compact) return "₹" + rounded.toLocaleString("en-IN");
  const abs = Math.abs(amount);
  if (abs >= 1_00_00_000) return "₹" + (amount / 1_00_00_000).toFixed(2) + " Cr";
  if (abs >= 1_00_000)    return "₹" + (amount / 1_00_000).toFixed(2) + " L";
  if (abs >= 1_000)       return "₹" + (amount / 1_000).toFixed(1) + "K";
  return "₹" + rounded.toLocaleString("en-IN");
}

export function altFuelUnit(fuel: AltFuelType): string {
  return fuel === "LPG" ? "kg/hr" : "Sm³/hr";
}

export function altFuelPriceUnit(fuel: AltFuelType): string {
  return fuel === "LPG" ? "₹/kg" : "₹/Sm³";
}

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION
// ─────────────────────────────────────────────────────────────────────────────

export function validateStep(
  step: number,
  inputs: Partial<CalculatorInputs>
): string | null {
  switch (step) {
    case 1: // Genset info
      if (!inputs.gensetRating || inputs.gensetRating <= 0)
        return "Please enter a valid genset rating.";
      if (inputs.load === undefined || inputs.load <= 0 || inputs.load > 100)
        return "Load must be between 1 and 100%.";
      break;
    case 2: // Alt fuel type
      if (!inputs.altFuelType) return "Please select an alternative fuel.";
      break;
    case 3: // Operating hours
      if (!inputs.hoursPerMonth || inputs.hoursPerMonth <= 0)
        return "Please enter valid operating hours per month.";
      break;
    case 4: // Fuel prices
      if (!inputs.dieselPrice || inputs.dieselPrice <= 0)
        return "Please enter a valid diesel price.";
      if (inputs.altFuelType === "LPG" && (!inputs.lpgPrice || inputs.lpgPrice <= 0))
        return "Please enter a valid LPG price.";
      if (inputs.altFuelType === "PNG" && (!inputs.pngPrice || inputs.pngPrice <= 0))
        return "Please enter a valid PNG price.";
      break;
    case 5: // Diesel consumption
      if (!inputs.dieselConsumption || inputs.dieselConsumption <= 0)
        return "Please enter a valid diesel consumption.";
      break;
    case 6: // DF Diesel consumption
      if (inputs.dfDieselConsumption === undefined || inputs.dfDieselConsumption < 0)
        return "Please enter a valid dual-fuel diesel consumption.";
      if (inputs.dieselConsumption !== undefined && inputs.dfDieselConsumption > inputs.dieselConsumption)
        return "Dual-fuel diesel consumption cannot exceed diesel-only consumption.";
      break;
    case 7: // Alt fuel consumption
      if (!inputs.dfAltFuelConsumption || inputs.dfAltFuelConsumption <= 0)
        return "Please enter a valid alternative fuel consumption.";
      break;
  }
  return null;
}
