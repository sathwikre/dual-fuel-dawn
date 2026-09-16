interface Props {
  currentStep: number;
  totalSteps: number;
}

const LABELS = ["Genset", "Hours", "Prices"];

export function CalculatorProgress({ currentStep, totalSteps }: Props) {
  const pct = Math.round((currentStep / totalSteps) * 100);
  return (
    <div className="px-5 pt-3 pb-2">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[oklch(0.72_0.16_155)]">
          {LABELS[currentStep - 1]}
        </span>
      </div>
      <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[oklch(0.72_0.16_155)] transition-all duration-400 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-2 flex gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className="h-[3px] flex-1 rounded-full transition-colors duration-300"
            style={{
              background:
                i < currentStep
                  ? "oklch(0.72 0.16 155)"
                  : i === currentStep
                  ? "oklch(0.72 0.16 155 / 0.4)"
                  : "rgba(255,255,255,0.1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
