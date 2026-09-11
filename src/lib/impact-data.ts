export const impactData = {
  // Presentation-only values. Replace this module with an API client when verified telemetry is available.
  metrics: [
    { label: "INSTALLATION LOCATIONS", value: "02", note: "Pune · Bengaluru" },
    { label: "PROJECT TYPES", value: "04", note: "Profiled installations" },
    { label: "DUAL-FUEL POTENTIAL", value: "70%", note: "Up to, where applicable" },
  ],
  months: [{ label: "JAN", height: 31 }, { label: "FEB", height: 47 }, { label: "MAR", height: 39 }, { label: "APR", height: 66 }, { label: "MAY", height: 58 }, { label: "JUN", height: 79 }, { label: "JUL", height: 70 }],
} as const;
