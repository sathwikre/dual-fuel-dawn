import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Fuel, Gauge, X } from "lucide-react";
import LOGO from "@/assets/aircompressor/logo.png";
import IMG from "@/assets/img-162.jpg";
import dualFuelImage from "@/assets/gg.jpeg";
import recdImage from "@/assets/image.png";
import pngKitImage from "@/assets/img-085.jpeg";
import lpgKitImage from "@/assets/LPG based Dual Fuel kit.jpeg";
import generatorSetImage from "@/assets/applications/Generator Sets.png";
import marineInboardImage from "@/assets/applications/Marine Inboard Engines.png";
import compressorImage from "@/assets/applications/Diesel Compressor at Construction Site.png";
import borewellImage from "@/assets/borewell.jpeg";
import harvesterImage from "@/assets/applications/Harvester.jpg";
import tractorImage from "@/assets/applications/Tractors & Earth Movers.png";
import earthmoverImage from "@/assets/applications/Quarry Excavator at Work.png";
import "./technology.css";

type EngineCategory = "Power" | "Marine" | "Industrial" | "Agri & construction";
type TechnologyTab = "dualFuel" | "recd";
type FuelTab = "png" | "lpg";
type BenefitCategory = "all" | "env" | "cost" | "engine" | "install";

const MATRIX: Array<{
  title: string;
  description: string;
  category: EngineCategory;
  image: string;
  fuels: string[];
}> = [
  { title: "Diesel Generator set", description: "Dual-fuel operation for diesel generator sets.", category: "Power", image: generatorSetImage, fuels: ["PNG", "CNG", "LPG", "LNG", "Ethanol", "Methanol", "Isobutane"] },
  { title: "Marine Propulsion Engine", description: "Dual-fuel pathways for marine propulsion engines.", category: "Marine", image: marineInboardImage, fuels: ["LPG", "LNG", "Ethanol", "Methanol", "Isobutane"] },
  { title: "Marine Generator set", description: "Dual-fuel operation for marine generator applications.", category: "Marine", image: generatorSetImage, fuels: ["LPG", "LNG", "Ethanol", "Methanol", "Isobutane"] },
  { title: "Diesel engine based Air Compressor", description: "Dual-fuel conversion for diesel engine based air compressors.", category: "Industrial", image: compressorImage, fuels: ["CNG", "LPG", "LNG", "Ethanol", "Methanol", "Isobutane"] },
  { title: "Diesel engine based Borewell", description: "Dual-fuel conversion for diesel engine based borewell pumps.", category: "Agri & construction", image: borewellImage, fuels: ["CNG", "LPG", "LNG", "Ethanol", "Methanol", "Isobutane"] },
  { title: "Diesel engine based Harvester", description: "Dual-fuel conversion for diesel engine based harvesters.", category: "Agri & construction", image: harvesterImage, fuels: ["CNG", "LPG", "LNG", "Ethanol", "Methanol", "Isobutane"] },
  { title: "Diesel engine based Tractor", description: "Dual-fuel conversion for diesel engine based tractors.", category: "Agri & construction", image: tractorImage, fuels: ["CNG", "LPG", "LNG", "Ethanol", "Methanol", "Isobutane"] },
  { title: "Diesel engine based Earthmover", description: "Dual-fuel conversion for diesel engine based earthmovers.", category: "Agri & construction", image: earthmoverImage, fuels: ["CNG", "LPG", "LNG", "Ethanol", "Methanol", "Isobutane"] },
];

const ENGINE_FILTERS: Array<"All" | EngineCategory> = ["All", "Power", "Marine", "Industrial", "Agri & construction"];

const APPROACH = {
  dualFuel: {
    title: "Dual Fuel Kit",
    eyebrow: "During combustion",
    heading: "Reduce In Situ.",
    description: "Controlled introduction of alternate fuel into the engine air flow to reduce diesel consumption and particulate generation during combustion.",
    image: dualFuelImage,
    imageAlt: "Dual Fuel system schematic",
    points: [
      "Reduces particulate generation during combustion",
      "Uses controlled fuel injection with sensors, valves and actuators",
      "Can reduce diesel consumption under suitable operating conditions",
      "Existing diesel operation can be retained",
    ],
  },
  recd: {
    title: "RECD",
    eyebrow: "After generation",
    heading: "Retrofit Emission Control Device",
    description: "Retrofit Emission Control Device added to the diesel engine exhaust to capture particulates.",
    image: recdImage,
    imageAlt: "RECD exhaust emission control device diagram",
    types: [
      {
        label: "Self-Cleaning",
        heading: "Self-Cleaning Type",
        points: ["Back-pressure sensor-based operation", "Additional back pressure on the engine", "Higher power loss", "Higher diesel consumption", "Lower thermal efficiency", "Higher CO₂ emission", "Particulates are generated and then captured", "Disposal of collected particulates is a concern", "Pressure sensor failure can cause major engine damage"],
      },
      {
        label: "Regeneration",
        heading: "Regeneration Type",
        points: ["Back-pressure sensor-based operation", "Additional back pressure on the engine", "Higher power loss", "Higher diesel consumption", "Lower thermal efficiency", "Higher CO₂ emission", "Particulates are generated, captured and then regeneration is performed as per logic", "Pressure sensor failure can cause major engine damage"],
      },
      {
        label: "No Self-Cleaning / Regeneration",
        heading: "No Self-Cleaning / Regeneration",
        points: ["Additional back pressure on the engine", "Higher power loss", "Higher diesel consumption", "Lower thermal efficiency", "Higher CO₂ emission", "Particulates are generated and then captured", "Disposal of collected particulates is a major concern"],
      },
    ],
  },
} as const;

const FUELS: Record<FuelTab, {
  label: string;
  eyebrow: string;
  title: string;
  subLabel: string;
  image: string;
  imageAlt: string;
  description: string;
  points: string[];
}> = {
  png: {
    label: "PNG Kit",
    eyebrow: "PNG System",
    title: "Natural Gas Solution.",
    subLabel: "Piped Natural Gas",
    image: pngKitImage,
    imageAlt: "PNG dual-fuel kit",
    description: "PNG dual-fuel systems utilize piped natural gas for continuous, reliable operation with consistent fuel supply and lower operating costs for grid-connected facilities.",
    points: ["Continuous fuel supply via pipeline infrastructure", "Lower fuel cost compared to diesel and LPG", "Clean-burning with minimal environmental impact", "Ideal for facilities with PNG availability", "With PNG, diesel replacement is higher than LPG"],
  },
  lpg: {
    label: "LPG Kit",
    eyebrow: "LPG System",
    title: "LPG-Powered Efficiency.",
    subLabel: "Liquefied Petroleum Gas",
    image: lpgKitImage,
    imageAlt: "LPG dual-fuel kit",
    description: "LPG dual-fuel systems enable diesel engines to operate with LPG as the alternate fuel, offering cost savings and reduced emissions for stationary and mobile applications.",
    points: ["Cost-effective fuel alternative with high availability", "Suitable for generator sets and industrial applications", "Easy integration with existing diesel engines"],
  },
};

const BENEFITS: Array<{
  id: string;
  category: Exclude<BenefitCategory, "all">;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
}> = [
  { id: "particulate", category: "env", title: "Reduces particulate emissions", description: "Supports particulate-matter reduction during combustion.", stat: "Particulate matter", statLabel: "reduction support" },
  { id: "pcb", category: "env", title: "Supports Pollution Control Board particulate-matter reduction requirements", description: "Designed to support applicable particulate-matter requirements.", stat: "PM requirements", statLabel: "check local requirements" },
  { id: "gas-share", category: "cost", title: "Enables gaseous fuel use up to 70% in diesel engines", description: "Actual gaseous-fuel share depends on the engine, application, load and fuel conditions.", stat: "70%", statLabel: "max stated figure" },
  { id: "operating-cost", category: "cost", title: "Saves fuel and operating cost", description: "Potential savings depend on fuel prices and operating conditions.", stat: "Fuel + operating cost", statLabel: "potential savings" },
  { id: "power-level", category: "engine", title: "Same power level as the base diesel engine", description: "Designed to maintain the base diesel engine's power level during dual-fuel operation.", stat: "Base diesel level", statLabel: "power target" },
  { id: "existing-genset", category: "install", title: "No need to replace the existing diesel genset", description: "Retain the existing diesel genset for a dual-fuel upgrade.", stat: "Existing genset", statLabel: "replacement not required" },
  { id: "thermal-efficiency", category: "engine", title: "Higher thermal efficiency", description: "Efficiency can vary with the engine and operating conditions.", stat: "Thermal efficiency", statLabel: "potential improvement" },
  { id: "maintenance", category: "engine", title: "Lesser diesel engine maintenance", description: "Service needs depend on the engine, installation and use.", stat: "Maintenance needs", statLabel: "may be reduced" },
  { id: "base-engine", category: "install", title: "No major modifications to the base diesel engine", description: "The system is designed to integrate without major base-engine changes.", stat: "Base engine", statLabel: "major changes not required" },
  { id: "fuel-mode", category: "install", title: "Flexibility between dual-fuel and 100% diesel mode", description: "Switch between dual-fuel operation and 100% diesel mode.", stat: "Operating modes", statLabel: "dual fuel / diesel" },
  { id: "engine-life", category: "engine", title: "Improved engine life", description: "Engine life depends on installation, operation and maintenance.", stat: "Engine life", statLabel: "designed to support longevity" },
  { id: "installation", category: "install", title: "Quick and easy installation", description: "Installation requirements vary by engine and application.", stat: "Installation", statLabel: "designed to be straightforward" },
];

const BENEFIT_FILTERS: Array<{ id: BenefitCategory; label: string }> = [
  { id: "all", label: "All benefits" },
  { id: "env", label: "Environment" },
  { id: "cost", label: "Cost savings" },
  { id: "engine", label: "Engine health" },
  { id: "install", label: "Installation" },
];

const CONS = [
  { id: "gasAvailability", label: "Gas Availability", statement: "Dual Fuel mode is possible only with Alternate fuel / Gas availability." },
  { id: "loadDefinition", label: "Load Definition", statement: "Appropriate load definition is VIMP." },
  { id: "loadCycle", label: "Load Cycle", statement: "Diesel replacement is dependent on Engine Application (Load cycle)." },
  { id: "fuelQuality", label: "Fuel Quality", statement: "Diesel replacement is dependent on Fuel Quality." },
  { id: "engineHealth", label: "Engine Health", statement: "Appropriate sensing is needed for engine health monitoring." },
  { id: "weather", label: "Weather Conditions", statement: "Diesel replacement is sensitive to weather conditions." },
];

const ROWS = [
  ["Capital Investment", "Very High Capital Investment", "Very High Capital Investment", "Medium to High Capital Investment", "Very Low Capital Investment"],
  ["Fuel Flexibility", "No fuel flexibility", "No fuel flexibility", "No fuel flexibility", "Fuel flexibility (Diesel / Dual Fuel)"],
  ["Existing Genset Modification", "Needs replacement", "Needs replacement", "No replacement · Exhaust modification", "No replacement · Gas Air Mixer added in intake"],
  ["Technology Limitations", "Sensitive technology", "Sensitive technology", "Higher engine back pressure · PM disposal", "Effective between 30 to 80% load · Min 30% diesel required"],
  ["Operating Cost", "Low fuel cost", "Higher fuel cost", "Higher fuel cost", "Lower fuel cost · Very low maintenance cost"],
  ["Service Skillset", "Very high skillset", "Very high skillset", "No special skillset required", "No special skillset required"],
] as const;

const SECTIONS = [
  ["technology-matrix", "Technology matrix"],
  ["technology-approach", "Technology"],
  ["technology-fuels", "Fuel systems"],
  ["technology-benefits", "Benefits"],
  ["technology-considerations", "Considerations"],
  ["technology-comparison", "Comparison"],
] as const;

function CountUpSeventy() {
  const [value, setValue] = useState(0);
  const statRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = statRef.current;
    if (!element) return;
    let started = false;
    let frameId = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting || started) return;
      started = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setValue(70);
        observer.disconnect();
        return;
      }
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / 800, 1);
        setValue(Math.round(progress * 70));
        if (progress < 1) frameId = requestAnimationFrame(animate);
      };
      frameId = requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: 0.45 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <span ref={statRef}>{value}%</span>;
}

function tabKeyDown(event: KeyboardEvent<HTMLElement>, current: string, choices: readonly string[], choose: (value: string) => void) {
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
  event.preventDefault();
  const currentIndex = choices.indexOf(current);
  const direction = event.key === "ArrowRight" ? 1 : -1;
  const next = choices[(currentIndex + direction + choices.length) % choices.length];
  if (next) choose(next);
}

function valueTone(value: string, isRecommended: boolean) {
  if (isRecommended) return "positive";
  if (/sensitive technology|needs replacement|very high|higher fuel cost|no fuel flexibility/i.test(value)) return "negative";
  if (/medium to high|back pressure|pm disposal|effective between|very high skillset/i.test(value)) return "caution";
  if (/low fuel cost|no replacement|no special skillset/i.test(value)) return "positive";
  return "neutral";
}

export function TechnologyStandalone() {
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0][0]);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [engineFilter, setEngineFilter] = useState<"All" | EngineCategory>("All");
  const [selectedEngine, setSelectedEngine] = useState<(typeof MATRIX)[number] | null>(null);
  const [technologyTab, setTechnologyTab] = useState<TechnologyTab>("dualFuel");
  const [recdTypeIndex, setRecdTypeIndex] = useState(0);
  const [fuelTab, setFuelTab] = useState<FuelTab>("png");
  const [benefitFilter, setBenefitFilter] = useState<BenefitCategory>("all");
  const [load, setLoad] = useState(55);
  const currentApproach = APPROACH[technologyTab];
  const currentFuel = FUELS[fuelTab];
  const currentRecd = APPROACH.recd.types[recdTypeIndex] ?? APPROACH.recd.types[0];
  const visibleBenefits = useMemo(
    () => BENEFITS.filter((benefit) => benefitFilter === "all" || benefit.category === benefitFilter),
    [benefitFilter],
  );
  const filteredMatrix = useMemo(
    () => MATRIX.filter((engine) => engineFilter === "All" || engine.category === engineFilter),
    [engineFilter],
  );
  const effectiveLoad = load >= 30 && load <= 80;

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const sections = SECTIONS.map(([id]) => document.getElementById(id)).filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.2, 0.5, 0.8] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedEngine) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setSelectedEngine(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedEngine]);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <main className="tech-page min-h-screen bg-[#F2F7F4] text-[#163324]">
      <header className="tech-header sticky top-0 z-40 border-b border-[#0B2A1A]/10 bg-[#F2F7F4]/95 backdrop-blur-xl">
        <div className="h-[3px] bg-[#0B2A1A]/10"><div className="tech-progress h-full bg-[#1F9D61] transition-[width] duration-100" style={{ width: `${progress}%` }} /></div>
        <div className="mx-auto flex min-h-[72px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <a href="/#home" className="flex shrink-0 items-center gap-2.5 text-[#0B2A1A]" aria-label="OM Solutions home">
            <img src={LOGO} alt="OM Solutions" className="size-10 object-contain" />
            <span className="text-sm font-extrabold uppercase tracking-[0.08em] sm:text-base">OM Solutions</span>
          </a>
          <nav aria-label="Technology sections" className="hidden items-center gap-1 lg:flex">
            {SECTIONS.map(([id, label]) => <button key={id} type="button" onClick={() => scrollToSection(id)} aria-current={activeSection === id ? "location" : undefined} className={`rounded-full px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F9D61] xl:px-4 xl:text-sm ${activeSection === id ? "bg-[#0B2A1A] text-white" : "text-[#52665a] hover:bg-white hover:text-[#0B2A1A]"}`}>{label}</button>)}
          </nav>
          <a href="/#contact" className="hidden shrink-0 items-center gap-2 rounded-full bg-[#1F9D61] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#167d4b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B2A1A] sm:inline-flex">Request a quote <ArrowUpRight className="size-4" /></a>
          <button type="button" aria-label={menuOpen ? "Close section menu" : "Open section menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="grid size-10 place-items-center rounded-full border border-[#0B2A1A]/15 text-[#0B2A1A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F9D61] lg:hidden">{menuOpen ? <X className="size-5" /> : <ChevronRight className="size-5" />}</button>
        </div>
        {menuOpen && <nav aria-label="Technology sections" className="grid gap-1 border-t border-[#0B2A1A]/10 px-4 py-3 sm:grid-cols-2 lg:hidden">
          {SECTIONS.map(([id, label]) => <button key={id} type="button" onClick={() => scrollToSection(id)} aria-current={activeSection === id ? "location" : undefined} className={`rounded-lg px-3 py-3 text-left text-sm font-semibold focus-visible:outline-2 focus-visible:outline-[#1F9D61] ${activeSection === id ? "bg-[#0B2A1A] text-white" : "text-[#52665a] hover:bg-white"}`}>{label}</button>)}
          <a href="/#contact" className="mt-1 rounded-lg bg-[#1F9D61] px-3 py-3 text-center text-sm font-bold text-white sm:col-span-2">Request a quote</a>
        </nav>}
      </header>

      <section className="relative isolate overflow-hidden bg-[#0B2A1A] text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_15%,rgba(31,157,97,.24),transparent_50%)]" />
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:py-24">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78d6a4] sm:text-xs">OM Solutions · Technology</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">Technology for cleaner, more flexible engine operation.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">Explore supported alternate-fuel pathways, dual-fuel systems and emission-control options.</p>
            <button type="button" onClick={() => scrollToSection("technology-matrix")} className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#1F9D61] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#2bb476] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Explore technology <ArrowRight className="size-4" /></button>
          </div>
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-2 shadow-2xl">
            <img src={IMG} alt="Industrial engine application" fetchPriority="high" className="aspect-[4/3] w-full rounded-[22px] object-cover" />
            <div className="absolute bottom-6 left-6 rounded-2xl border border-white/15 bg-[#0B2A1A]/85 px-4 py-3 backdrop-blur"><span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[#78d6a4]">Dual Fuel · Operating range</span><strong className="mt-1 block text-xl">30–80% Load</strong></div>
          </div>
        </div>
      </section>

      <section id="technology-matrix" className="tech-section scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeading eyebrow="Technology matrix" title="Dual fuel technology architecture" description="Explore supported alternate-fuel pathways across engine applications." />
          <div role="group" aria-label="Filter by engine type" className="mt-8 flex gap-2 overflow-x-auto pb-2">
            {ENGINE_FILTERS.map((filter) => <button key={filter} type="button" aria-pressed={engineFilter === filter} onClick={() => setEngineFilter(filter)} className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F9D61] ${engineFilter === filter ? "border-[#0B2A1A] bg-[#0B2A1A] text-white" : "border-[#0B2A1A]/15 bg-white text-[#52665a] hover:border-[#1F9D61] hover:text-[#0B2A1A]"}`}>{filter}</button>)}
          </div>
          <div className="mt-5 grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredMatrix.map((engine) => <button key={engine.title} type="button" onClick={() => setSelectedEngine(engine)} aria-label={`View details for ${engine.title}`} className="tech-card group flex h-full flex-col overflow-hidden rounded-2xl border border-[#0B2A1A]/10 bg-white text-left shadow-[0_8px_30px_rgba(11,42,26,.06)] transition duration-300 hover:-translate-y-1 hover:border-[#1F9D61]/40 hover:shadow-[0_18px_48px_rgba(11,42,26,.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F9D61]">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#dce9e1]"><img src={engine.image} alt={engine.title} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.045] motion-reduce:transition-none" /><span className="absolute left-4 top-4 rounded-full bg-[#0B2A1A]/90 px-3 py-1.5 text-[11px] font-bold text-white">{engine.category}</span></div>
              <div className="flex flex-1 flex-col p-5 sm:p-6"><h3 className="text-lg font-bold text-[#0B2A1A]">{engine.title}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-[#52665a]">{engine.description}</p><div className="mt-4 flex flex-wrap gap-1.5">{engine.fuels.map((fuel) => <span key={fuel} className="rounded-full bg-[#e8f4ec] px-2.5 py-1 font-mono text-[10px] font-semibold text-[#226344]">{fuel}</span>)}</div><span className="mt-5 inline-flex items-center gap-2 border-t border-[#0B2A1A]/10 pt-4 text-sm font-bold text-[#167d4b]">View application details <ArrowUpRight className="size-4" /></span></div>
            </button>)}
          </div>
        </div>
      </section>

      <section id="technology-approach" className="tech-section scroll-mt-24 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeading eyebrow="Technology" title="Dual Fuel Kit vs RECD" description="Two different approaches to particulate reduction." />
          <div role="tablist" aria-label="Technology comparison" className="mt-8 inline-flex rounded-xl border border-[#0B2A1A]/10 bg-[#e9f1ec] p-1.5">
            {(["dualFuel", "recd"] as const).map((tab) => <button key={tab} type="button" role="tab" id={`${tab}-approach-tab`} aria-selected={technologyTab === tab} aria-controls="approach-panel" tabIndex={technologyTab === tab ? 0 : -1} onKeyDown={(event) => tabKeyDown(event, technologyTab, ["dualFuel", "recd"], (value) => setTechnologyTab(value as TechnologyTab))} onClick={() => setTechnologyTab(tab)} className={`rounded-lg px-5 py-3 text-sm font-bold transition ${technologyTab === tab ? "bg-[#0B2A1A] text-white shadow" : "text-[#52665a] hover:text-[#0B2A1A]"}`}>{tab === "dualFuel" ? "Dual Fuel" : "RECD"}</button>)}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#0B2A1A]/10 bg-[#F2F7F4] px-4 py-3 sm:px-5">
            <span className="text-sm font-semibold text-[#52665a]">Treatment stage</span>
            <button type="button" role="switch" aria-checked={technologyTab === "dualFuel"} aria-label="Switch between during combustion and after generation" onClick={() => setTechnologyTab((tab) => tab === "dualFuel" ? "recd" : "dualFuel")} className="flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F9D61]"><span className={`relative h-7 w-12 rounded-full transition-colors ${technologyTab === "dualFuel" ? "bg-[#1F9D61]" : "bg-[#0B2A1A]"}`}><span className={`absolute top-1 size-5 rounded-full bg-white shadow transition-transform ${technologyTab === "dualFuel" ? "translate-x-1" : "translate-x-6"}`} /></span><span className="text-sm font-bold text-[#0B2A1A]">{currentApproach.eyebrow}</span></button>
          </div>
          <article id="approach-panel" role="tabpanel" aria-labelledby={`${technologyTab}-approach-tab`} className="mt-5 grid overflow-hidden rounded-3xl border border-[#0B2A1A]/10 bg-white shadow-[0_16px_50px_rgba(11,42,26,.08)] lg:grid-cols-[.92fr_1.08fr]">
            <div className="relative min-h-64 bg-[#e8f0eb] lg:min-h-[460px]"><img key={currentApproach.image} src={currentApproach.image} alt={currentApproach.imageAlt} loading="lazy" className="absolute inset-0 size-full object-cover" /><span className="absolute bottom-5 left-5 rounded-full bg-[#0B2A1A]/90 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white">{currentApproach.eyebrow}</span></div>
            <div className="p-6 sm:p-9 lg:p-10"><p className={`font-mono text-[10px] font-bold uppercase tracking-[0.16em] ${technologyTab === "dualFuel" ? "text-[#1F9D61]" : "text-[#b45309]"}`}>{currentApproach.title}</p><h3 className="mt-3 text-3xl font-extrabold leading-tight text-[#0B2A1A]">{currentApproach.heading}</h3><p className="mt-4 max-w-xl text-sm leading-7 text-[#52665a]">{currentApproach.description}</p>
              {technologyTab === "dualFuel" ? <ul className="mt-7 grid gap-4 sm:grid-cols-2">{APPROACH.dualFuel.points.map((point) => <li key={point} className="flex gap-3 text-sm leading-6 text-[#294d38]"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#e3f3e9] text-[#16804d]"><Check className="size-3.5 stroke-[3]" /></span>{point}</li>)}</ul> : <div className="mt-6"><div role="tablist" aria-label="RECD type" className="flex gap-2 overflow-x-auto pb-2">{APPROACH.recd.types.map((type, index) => <button key={type.label} type="button" role="tab" id={`recd-type-${index}-tab`} aria-selected={recdTypeIndex === index} aria-controls="recd-type-panel" tabIndex={recdTypeIndex === index ? 0 : -1} onKeyDown={(event) => tabKeyDown(event, String(recdTypeIndex), APPROACH.recd.types.map((_, i) => String(i)), (value) => setRecdTypeIndex(Number(value)))} onClick={() => setRecdTypeIndex(index)} className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-[#1F9D61] ${recdTypeIndex === index ? "border-[#9a3412] bg-[#9a3412] text-white" : "border-[#0B2A1A]/15 bg-white text-[#52665a] hover:border-[#9a3412]"}`}>{type.label}</button>)}</div><div id="recd-type-panel" role="tabpanel" aria-labelledby={`recd-type-${recdTypeIndex}-tab`} className="mt-4 rounded-2xl border border-[#0B2A1A]/10 bg-[#F2F7F4] p-5"><h4 className="font-bold text-[#0B2A1A]">{currentRecd.heading}</h4><ul className="mt-4 grid gap-3 sm:grid-cols-2">{currentRecd.points.map((point) => <li key={point} className="flex gap-2.5 text-sm leading-6 text-[#33483a]"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#b45309]" />{point}</li>)}</ul></div></div>}
            </div>
          </article>
        </div>
      </section>

      <section id="technology-fuels" className="tech-section scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeading eyebrow="Fuel systems" title="LPG & PNG Dual Fuel Kits" description="Dual-fuel solutions for different gas types and applications." />
          <div role="tablist" aria-label="Fuel kit comparison" className="mt-8 flex max-w-xl rounded-xl border border-[#0B2A1A]/10 bg-white p-1.5 shadow-sm">
            {(["png", "lpg"] as const).map((tab) => <button key={tab} type="button" role="tab" id={`${tab}-fuel-tab`} aria-selected={fuelTab === tab} aria-controls="fuel-panel" tabIndex={fuelTab === tab ? 0 : -1} onKeyDown={(event) => tabKeyDown(event, fuelTab, ["png", "lpg"], (value) => setFuelTab(value as FuelTab))} onClick={() => setFuelTab(tab)} className={`flex-1 rounded-lg px-4 py-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F9D61] ${fuelTab === tab ? "bg-[#0B2A1A] text-white shadow" : "text-[#52665a] hover:text-[#0B2A1A]"}`}><span className="block text-sm font-bold">{FUELS[tab].label}</span><span className={`mt-1 block font-mono text-[9px] uppercase tracking-[0.1em] ${fuelTab === tab ? "text-white/65" : "text-[#718176]"}`}>{FUELS[tab].eyebrow}</span></button>)}
          </div>
          <article id="fuel-panel" role="tabpanel" aria-labelledby={`${fuelTab}-fuel-tab`} className="tech-content-swap mt-5 grid min-h-[440px] overflow-hidden rounded-3xl border border-[#0B2A1A]/10 bg-white shadow-[0_16px_50px_rgba(11,42,26,.08)] lg:grid-cols-[.85fr_1.15fr]">
            <div className="relative min-h-64 bg-[#e8f0eb] lg:min-h-full"><img key={currentFuel.image} src={currentFuel.image} alt={currentFuel.imageAlt} loading="lazy" className="absolute inset-0 size-full object-cover" /><span className={`absolute left-5 top-5 rounded-full px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] ${fuelTab === "png" ? "bg-[#1d4ed8] text-white" : "bg-[#b45309] text-white"}`}>{currentFuel.eyebrow}</span></div>
            <div className="flex flex-col p-6 sm:p-9 lg:p-10"><p className={`font-mono text-[10px] font-bold uppercase tracking-[0.16em] ${fuelTab === "png" ? "text-[#1d4ed8]" : "text-[#b45309]"}`}>{fuelTab === "png" ? "PNG Dual Fuel" : "LPG Dual Fuel"}</p><div className="mt-2 flex flex-wrap items-start justify-between gap-3"><h3 className="text-3xl font-extrabold text-[#0B2A1A]">{currentFuel.title}</h3><span className={`rounded-full px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] ${fuelTab === "png" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-800"}`}>{currentFuel.subLabel}</span></div><p className="mt-4 max-w-2xl text-sm leading-7 text-[#52665a]">{currentFuel.description}</p><ul className="mt-6 grid flex-1 content-start gap-4 border-t border-[#0B2A1A]/10 pt-5 sm:grid-cols-2">{currentFuel.points.map((point) => <li key={point} className="flex gap-3 text-sm leading-6 text-[#294d38]"><span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${fuelTab === "png" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-800"}`}><Check className="size-3.5 stroke-[3]" /></span>{point}</li>)}</ul></div>
          </article>
        </div>
      </section>

      <section id="technology-benefits" className="tech-section scroll-mt-24 bg-[#0B2A1A] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-end"><SectionHeading dark eyebrow="Why dual fuel" title="Benefits of using a Dual Fuel kit" description="The 70% figure is the maximum gaseous fuel use stated in the profile and depends on engine, application, load and fuel conditions." />
            <div className="flex items-end gap-4 rounded-3xl border border-white/15 bg-white/[.06] p-6 sm:p-8"><div className="min-w-0"><span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#78d6a4]">Gaseous fuel use</span><strong className="mt-2 block text-6xl font-extrabold tracking-tight text-white sm:text-7xl"><CountUpSeventy /></strong><span className="mt-2 block text-sm text-white/65">max stated figure</span></div><div className="mb-2 ml-auto grid size-14 shrink-0 place-items-center rounded-2xl bg-[#1F9D61]/20 text-[#78d6a4]"><Fuel className="size-7" /></div></div>
          </div>
          <div role="group" aria-label="Filter benefits by category" className="mt-9 flex gap-2 overflow-x-auto pb-2">{BENEFIT_FILTERS.map((filter) => <button key={filter.id} type="button" aria-pressed={benefitFilter === filter.id} onClick={() => setBenefitFilter(filter.id)} className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#78d6a4] ${benefitFilter === filter.id ? "border-[#78d6a4] bg-[#78d6a4] text-[#0B2A1A]" : "border-white/20 text-white/70 hover:border-white/50 hover:text-white"}`}>{filter.label}</button>)}</div>
          <div aria-live="polite" className="mt-5 grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">{visibleBenefits.map((benefit, index) => <article key={benefit.id} className="tech-benefit-card flex h-full min-h-48 flex-col rounded-2xl border border-white/10 bg-white/[.06] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#78d6a4]/45 hover:bg-white/[.09] motion-reduce:transition-none sm:p-6"><span className="flex size-9 items-center justify-center rounded-xl bg-[#1F9D61]/20 text-[#78d6a4]"><Check className="size-4 stroke-[3]" /></span><h3 className="mt-4 text-base font-bold leading-snug text-white">{benefit.title}</h3><p className="mt-2 flex-1 text-sm leading-6 text-white/65">{benefit.description}</p><div className="mt-4 border-t border-white/10 pt-3"><span className="block text-sm font-semibold text-[#78d6a4]">{benefit.id === "gas-share" ? <><CountUpSeventy /> gaseous fuel use</> : benefit.stat}</span><span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.1em] text-white/45">{benefit.statLabel}</span></div><span className="sr-only">Filtered benefit {index + 1}</span></article>)}</div>
        </div>
      </section>

      <section id="technology-considerations" className="tech-section scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeading eyebrow="Operating considerations" title="Challenges while using a Dual Fuel Kit" description="Dual-fuel performance depends on operating conditions. These considerations should be evaluated for the intended engine application." />
          <div className="mt-9 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
            <div className="rounded-3xl bg-[#0B2A1A] p-6 text-white shadow-[0_18px_45px_rgba(11,42,26,.15)] sm:p-8"><div className="flex items-start justify-between gap-3"><div><span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#78d6a4]">Dual Fuel · Operating range</span><h3 className="mt-2 text-2xl font-bold">30–80% Load</h3></div><Gauge className="size-7 text-[#78d6a4]" /></div><div className="tech-load-gauge mx-auto mt-6 grid size-56 place-items-center rounded-full" style={{ "--load-angle": `${load * 3.6}deg` } as CSSProperties & { "--load-angle": string }}><div className="grid size-44 place-items-center rounded-full bg-[#0B2A1A] text-center"><div><span className="block text-5xl font-extrabold tabular-nums">{load}%</span><span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.13em] text-white/55">typical load</span></div></div></div><label htmlFor="engine-load" className="mt-5 block text-sm font-semibold">Adjust engine load</label><input id="engine-load" type="range" min="0" max="100" step="1" value={load} onChange={(event) => setLoad(Number(event.currentTarget.value))} aria-describedby="load-effectiveness" className="mt-3 w-full accent-[#78d6a4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#78d6a4]" /><div className="mt-1 flex justify-between font-mono text-[10px] text-white/55"><span>0%</span><span>100%</span></div><p id="load-effectiveness" aria-live="polite" className={`mt-5 rounded-xl px-4 py-3 text-sm font-semibold ${effectiveLoad ? "bg-[#1F9D61]/20 text-[#a4efc5]" : "bg-amber-400/15 text-amber-200"}`}>{effectiveLoad ? "Within the stated 30% to 80% effective load range." : "Outside the stated 30% to 80% effective load range."}</p><p className="mt-3 text-xs leading-5 text-white/50">Diesel replacement is effective between 30% to 80% load.</p></div>
            <div className="grid items-stretch gap-3 sm:grid-cols-2">{CONS.map((item, index) => <article key={item.id} className="flex min-h-40 flex-col rounded-2xl border border-[#0B2A1A]/10 bg-white p-5 shadow-[0_8px_25px_rgba(11,42,26,.045)]"><span className="font-mono text-[10px] font-bold tracking-[0.14em] text-[#1F9D61]">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-3 text-base font-bold text-[#0B2A1A]">{item.label}</h3><p className="mt-2 text-sm leading-6 text-[#52665a]">{item.statement}</p></article>)}</div>
          </div>
        </div>
      </section>

      <section id="technology-comparison" className="tech-section scroll-mt-24 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading eyebrow="Technology comparison" title="Comparison of technology options to comply SPCB notification for PM reduction" description="Compare the listed options across capital investment, fuel flexibility, modification, limitations, operating cost and service skillset." />
          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#0B2A1A]/10 shadow-[0_16px_50px_rgba(11,42,26,.08)] focus-visible:outline-2 focus-visible:outline-[#1F9D61]" tabIndex={0} aria-label="Scrollable technology comparison table">
            <table className="w-full min-w-[980px] border-collapse text-left text-sm"><thead className="sticky top-0 z-10"><tr className="bg-[#0B2A1A] text-white"><th scope="col" className="sticky left-0 z-20 min-w-48 bg-[#0B2A1A] px-5 py-5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/65">Category</th><th scope="col" className="min-w-48 px-5 py-5 font-semibold">New Gas Genset CPCB-IV+</th><th scope="col" className="min-w-48 px-5 py-5 font-semibold">New Diesel Genset CPCB-IV+</th><th scope="col" className="min-w-56 px-5 py-5 font-semibold">Retrofit Emission Control Device</th><th scope="col" className="min-w-56 bg-[#1F9D61] px-5 py-5 font-semibold text-white"><span className="block">Dual Fuel Kit</span><span className="mt-1 inline-block rounded-full bg-white/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em]">Recommended</span></th></tr></thead><tbody>{ROWS.map((row) => <tr key={row[0]} className="border-t border-[#0B2A1A]/10 transition-colors hover:bg-[#F2F7F4]"><th scope="row" className="sticky left-0 z-[1] bg-[#f7faf8] px-5 py-5 font-semibold text-[#0B2A1A]">{row[0]}</th>{row.slice(1).map((value, index) => <td key={`${row[0]}-${index}`} className={`px-5 py-5 ${index === 3 ? "bg-[#e9f6ee]/65" : "bg-white"}`}><span className={`inline-block rounded-full px-3 py-1.5 text-xs font-semibold leading-5 ${valueTone(value, index === 3) === "positive" ? "bg-[#e4f4e9] text-[#17643d]" : valueTone(value, false) === "negative" ? "bg-[#fce9e7] text-[#9f332b]" : valueTone(value, false) === "caution" ? "bg-[#fff2d8] text-[#8c570b]" : "bg-slate-100 text-slate-700"}`}>{value}</span></td>)}</tr>)}</tbody></table>
          </div>
        </div>
      </section>

      <footer className="bg-[#0B2A1A] px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-10"><div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-white/[.045] p-6 sm:flex-row sm:items-center sm:p-9"><div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#78d6a4]">OM Solutions</p><h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Talk to us about your engine.</h2><p className="mt-2 text-sm leading-6 text-white/65">Discuss your application, gas availability and operating conditions with our team.</p></div><a href="/#contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1F9D61] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#2bb476] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Request a quote <ArrowRight className="size-4" /></a></div><p className="mx-auto mt-8 max-w-[1280px] font-mono text-[9px] uppercase tracking-[0.12em] text-white/35">© OM Solutions · Cleaner power for a changing India</p></footer>

      {selectedEngine && <div className="fixed inset-0 z-[60] flex justify-end bg-[#081b11]/55 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedEngine(null); }}><aside role="dialog" aria-modal="true" aria-labelledby="engine-detail-title" className="tech-drawer h-full w-full max-w-xl overflow-y-auto bg-[#F2F7F4] shadow-2xl"><div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#0B2A1A]/10 bg-[#F2F7F4]/95 px-5 py-4 backdrop-blur"><span className="rounded-full bg-[#0B2A1A] px-3 py-1.5 text-xs font-bold text-white">{selectedEngine.category}</span><button type="button" onClick={() => setSelectedEngine(null)} aria-label="Close engine details" className="grid size-10 place-items-center rounded-full border border-[#0B2A1A]/15 text-[#0B2A1A] focus-visible:outline-2 focus-visible:outline-[#1F9D61]"><X className="size-5" /></button></div><img src={selectedEngine.image} alt={selectedEngine.title} className="aspect-[16/10] w-full object-cover" /><div className="p-6 sm:p-8"><h2 id="engine-detail-title" className="text-3xl font-extrabold text-[#0B2A1A]">{selectedEngine.title}</h2><p className="mt-4 text-base leading-7 text-[#52665a]">{selectedEngine.description}</p><h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-[#0B2A1A]">Supported fuel pathways</h3><div className="mt-3 flex flex-wrap gap-2">{selectedEngine.fuels.map((fuel) => <span key={fuel} className="rounded-full bg-[#e2f0e7] px-3 py-2 font-mono text-xs font-semibold text-[#226344]">{fuel}</span>)}</div><p className="mt-8 rounded-xl border border-[#1F9D61]/20 bg-white p-4 text-sm leading-6 text-[#52665a]">Explore supported alternate-fuel pathways across engine applications.</p></div></aside></div>}
    </main>
  );
}

function SectionHeading({ eyebrow, title, description, dark = false }: { eyebrow: string; title: string; description: string; dark?: boolean }) {
  return <div className="max-w-3xl"><p className={`font-mono text-[10px] font-bold uppercase tracking-[0.17em] sm:text-xs ${dark ? "text-[#78d6a4]" : "text-[#1F9D61]"}`}>{eyebrow}</p><h2 className={`mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[42px] ${dark ? "text-white" : "text-[#0B2A1A]"}`}>{title}</h2><p className={`mt-4 max-w-2xl text-sm leading-7 sm:text-base ${dark ? "text-white/65" : "text-[#607166]"}`}>{description}</p></div>;
}
