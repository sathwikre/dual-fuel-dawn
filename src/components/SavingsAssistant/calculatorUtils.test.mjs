import assert from "node:assert/strict";
import test from "node:test";
import { calculate } from "./calculatorUtils.ts";

const webpagePngInputs = {
  gensetRating: 750,
  load: 75,
  altFuelType: "PNG",
  hoursPerMonth: 40,
  dieselPrice: 97,
  pngPrice: 85,
  lpgPrice: 150,
};

function closeTo(actual, expected, tolerance = 1e-9) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${actual} is not within ${tolerance} of ${expected}`,
  );
}

test("matches the Webpage Calculations PNG example inputs and cached Excel outputs", () => {
  const result = calculate(webpagePngInputs);

  // Excel cells B3, D1, B7:B14.
  closeTo(result.operatingGensetRating, 562.5);
  closeTo(result.electricalPowerKWe, 450);
  closeTo(result.engineBrakePower, 468.75);
  closeTo(result.parasiticLoad, 46.875);
  closeTo(result.totalEngineBrakePower, 515.625);
  closeTo(result.engineIndicatedPower, 572.9166666666666);
  closeTo(result.energyInputMJPerHr, 4209.183673469388);

  // Excel cells B23, B26:B28, D23, D26:D31 and G23, G26:G31.
  closeTo(result.dieselConsumptionLPerHr, 131.53698979591837);
  closeTo(result.dfDieselConsumptionLPerHr, 65.76849489795919);
  closeTo(result.alternateFuelConsumptionKgPerHr, 44.778549717759446);
  closeTo(result.alternateFuelConsumptionBillingUnitPerHr, 62.192430163554789);
  closeTo(result.dieselCostPerHr, 12759.088010204083);
  closeTo(result.alternateFuelCostPerHr, 5286.3565639021572);
  closeTo(result.savingPerHour, 1093.1874411998833);
  closeTo(result.savingPerMonth, 43727.497647995333);
  closeTo(result.savingPerYear, 437274.97647995333);
  closeTo(result.dieselCO2KgPerHr, 296.9579081632653);
  closeTo(result.totalDualFuelCO2KgPerHr, 264.69451530612247);
  closeTo(result.co2SavingKgPerHr, 32.263392857142833);
  closeTo(result.monthlyCO2SavingKg, 1290.5357142857133);
  closeTo(result.annualCO2SavingTonnes, 12.905357142857134);
});

test("bills LPG by kg and uses the Webpage Calculations LPG properties", () => {
  const result = calculate({ ...webpagePngInputs, altFuelType: "LPG" });

  assert.equal(result.alternateFuelBillingUnit, "kg");
  closeTo(result.dieselReplacementPct, 40);
  closeTo(result.alternateFuelConsumptionKgPerHr, 33.673469387755105);
  closeTo(result.alternateFuelConsumptionBillingUnitPerHr, result.alternateFuelConsumptionKgPerHr);
  closeTo(result.alternateFuelCostPerHr, result.alternateFuelConsumptionKgPerHr * 150);
  closeTo(
    result.alternateFuelCO2KgPerHr,
    ((result.alternateFuelConsumptionKgPerHr * 50) / 1000) * 63.35,
  );
});

test("recalculates fuel costs from current selected-fuel prices", () => {
  const baseline = calculate(webpagePngInputs);
  const changed = calculate({
    ...webpagePngInputs,
    gensetRating: 500,
    load: 50,
    pngPrice: 100,
    dieselPrice: 110,
  });
  assert.notEqual(changed.dieselConsumptionLPerHr, baseline.dieselConsumptionLPerHr);
  assert.notEqual(changed.alternateFuelCostPerHr, baseline.alternateFuelCostPerHr);
  assert.notEqual(changed.savingPerHour, baseline.savingPerHour);

  const changedHours = calculate({ ...webpagePngInputs, hoursPerMonth: 50 });
  assert.equal(changedHours.savingPerHour, baseline.savingPerHour);
  assert.notEqual(changedHours.savingPerMonth, baseline.savingPerMonth);
  assert.notEqual(changedHours.annualCO2SavingTonnes, baseline.annualCO2SavingTonnes);
});
