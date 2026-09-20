import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronDown,
  CircleGauge,
  Cog,
  Factory,
  Fuel,
  Gauge,
  Instagram,
  Leaf,
  Linkedin,
  Menu,
  Minus,
  Network,
  Phone,
  Plus,
  RotateCcw,
  ShieldCheck,
  Twitter,
  X,
  Youtube,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SavingsAssistant } from "@/components/SavingsAssistant/SavingsAssistant";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import logoImage from "@/assets/ChatGPT Image Sep 15, 2026, 06_07_17 PM.png";
import founderImage from "@/assets/img-006.jpg";
import schematicImage from "@/assets/imm.jpeg";
import systemImage from "@/assets/gg.jpeg";
import gasHandlingImage from "@/assets/GAS handling system.jpeg";
import exhaustTemperatureSensorsImage from "@/assets/Exhaust Temperature Sensors.jpeg";
import airGasMixerImage from "@/assets/Air Gas Mixer.jpeg";
import lpgPressureRegulatorImage from "@/assets/LPG Pressure regulator (LOT capable).jpeg";
import lpgKitImage from "@/assets/LPG based Dual Fuel kit.jpeg";
import pngKitImage from "@/assets/img-085.jpeg";
import componentImage from "@/assets/img-086.jpg";
import energyMeterImage from "@/assets/img-087.jpg";
import tataImage from "@/assets/img-089.jpg";
import koelImage from "@/assets/img-092.jpg";
import koelImg1 from "@/assets/WhatsApp Image 2026-08-28 at 3.55.36 PM.jpeg";
import koelImg2 from "@/assets/Gross picture DFK2.jpeg";
import birlaImageOne from "@/assets/img-095.jpg";
import birlaImageTwo from "@/assets/img-096.jpg";

// Component images for schematic viewer
import airGasMixerComponent from "@/assets/components/Air Gas Mixer.jpeg";
import controlPanelComponent from "@/assets/components/Control panel.jpg";
import energyMeterComponent from "@/assets/components/Energy meter.jpg";
import exhaustTemperatureSensorsComponent from "@/assets/components/Exhaust Temperature Sensors.jpeg";
import gasHandlingSystemComponent from "@/assets/components/GAS handling system.jpeg";
import gasLeakDetectorComponent from "@/assets/components/Gas Leak Detector.jpeg";
import gasSystemAssemblyComponent from "@/assets/components/Gas system assembly.jpg";
import knockSensorMountingComponent from "@/assets/components/Knock sensor mounting.jpg";
import knockSensorComponent from "@/assets/components/Knock sensor.jpeg";
import lpgPressureRegulatorComponent from "@/assets/components/LPG Pressure regulator (LOT capable).jpeg";

// Hero background images
import heroBg4 from "@/assets/background/bent-van-aeken-0A7YwYhZhWw-unsplash.jpg";
import heroBg5 from "@/assets/background/dusan-veverkolog-SwRy_vjCbhE-unsplash.jpg";
import heroBg6 from "@/assets/background/jonny-gios-dxGvEIJDD6Q-unsplash.jpg";
import heroBg7 from "@/assets/background/jonny-gios-EfdJiKMq1hs-unsplash.jpg";
import heroBg8 from "@/assets/background/jordan-allen-walters-j8QUs2P-_Rs-unsplash.jpg";
import heroBg9 from "@/assets/background/jorge-cesar-wZm7-G8G_ec-unsplash.jpg";
import heroBg10 from "@/assets/background/julia-taubitz-ezegOH-cBFE-unsplash.jpg";
import heroBg11 from "@/assets/background/karsten-wurth-0w-uTa0Xz7w-unsplash.jpg";
import heroBg12 from "@/assets/background/matthew-henry-yETqkLnhsUI-unsplash.jpg";
import heroBg13 from "@/assets/background/paul-einerhand-eysa6RORvl0-unsplash.jpg";
import heroBg14 from "@/assets/background/the-transport-enthusiast-dc-EvvoBu0nBnc-unsplash.jpg";
import heroBg15 from "@/assets/background/valentin-Tk7abNpQ3ZI-unsplash.jpg";
import heroBg16 from "@/assets/background/venti-views-1cqIcrWFQBI-unsplash.jpg";
import heroBg17 from "@/assets/background/worksite-ltd-MVA-zlTQdSE-unsplash.jpg";
import heroBg18 from "@/assets/background/Gross picture DFK2.jpeg";
import heroBg19 from "@/assets/background/IMG_20260206_073508.jpg";
import heroBg20 from "@/assets/background/WhatsApp Image 2026-05-21 at 4.16.08 PM (2).jpeg";
import heroBg21 from "@/assets/background/WhatsApp Image 2026-08-28 at 3.55.36 PM.jpeg";
import heroBg22 from "@/assets/background/image.jpeg";
import heroBg23 from "@/assets/background/arno-senoner-coEeAHagUEo-unsplash.jpg";
import birlaNewsImage from "@/assets/WhatsApp Image 2026-05-21 at 4.16.09 PM.jpeg";
import akwelImage from "@/assets/aqual.jpeg";
import ammeniEngineImage from "@/assets/ammeni engine.jpeg";

// Nevatia Maxgen gallery
import nevatiaMg1 from "@/assets/Nevatia Maxgen/IMG20260804120546 (1).jpg";
import nevatiaMg2 from "@/assets/Nevatia Maxgen/IMG20260804162319.jpg";
import nevatiaMg3 from "@/assets/Nevatia Maxgen/IMG20260804162351.jpg";
import nevatiaMg4 from "@/assets/Nevatia Maxgen/IMG20260804162440.jpg";
import nevatiaMg5 from "@/assets/Nevatia Maxgen/IMG20260804162502.jpg";
import nevatiaMg6 from "@/assets/Nevatia Maxgen/IMG20260805175535.jpg";
import nevatiaMg7 from "@/assets/Nevatia Maxgen/WhatsApp Image 2026-08-04 at 4.39.30 PM (10).jpeg";
import nevatiaMg8 from "@/assets/Nevatia Maxgen/WhatsApp Image 2026-08-04 at 4.39.30 PM (24).jpeg";
import nevatiaMg9 from "@/assets/Nevatia Maxgen/WhatsApp Image 2026-08-04 at 4.39.30 PM (3).jpeg";
import engineImage from "@/assets/img-098.jpg";
import engineDetailImage from "@/assets/img-099.jpg";
import knockSensorImage from "@/assets/Knock sensor.jpeg";
import gasleakdeact from "@/assets/Gas Leak Detector.jpeg"
import generatorImage from "@/assets/img-103.jpg";
import controlPanelImage from "@/assets/img-117.jpg";
import economicsImage from "@/assets/img-150.jpg";
import environmentImage from "@/assets/img-152.jpg";
import marineImage from "@/assets/img-158.jpg";
import marineOutboardImage from "@/assets/Marine Outboard Engines .png";
import marineInboardImage from "@/assets/Marine Inboard Engines.png";
import busesTrucksImage from "@/assets/Trucks & Buses.png";
import generatorSetImage from "@/assets/Generator Sets.png";
import tractorsEarthMoversImage from "@/assets/Tractors & Earth Movers.png";
import producerGasSyngasImage from "@/assets/Producer Gas & Syngas.png";
import liquidFuelsImage from "@/assets/Liquid Fuels.png";
import borewellImage from "@/assets/img-160.jpg";
import compressorImage from "@/assets/img-161.jpg";
import compressorNightImage from "@/assets/img-162.jpg";
import gasSystemImage from "@/assets/img-169.jpg";
import marineDetailImage from "@/assets/img-180.jpg";
import marineDetailImageTwo from "@/assets/img-181.jpg";
import marineEngineImage from "@/assets/img-185.jpg";
import marineEngineImageTwo from "@/assets/img-186.jpg";
import recdImage from "@/assets/image.png";

// Image Gallery — Birla Tisya, Bengaluru
import galleryBirla1 from "@/assets/Image gallery/birla_tisya_bangaloore/WhatsApp Image 2026-05-21 at 4.16.09 PM.jpeg";
import galleryBirla2 from "@/assets/Image gallery/birla_tisya_bangaloore/WhatsApp Image 2026-05-21 at 4.16.08 PM (2).jpeg";
import galleryBirla3 from "@/assets/Image gallery/birla_tisya_bangaloore/IMG20260520124033.jpg";
import galleryBirla4 from "@/assets/Image gallery/birla_tisya_bangaloore/WhatsApp Image 2026-05-20 at 1.19.45 PM.jpeg";
import galleryBirla5 from "@/assets/Image gallery/birla_tisya_bangaloore/WhatsApp Image 2026-05-21 at 4.16.01 PM.jpeg";
import galleryBirla6 from "@/assets/Image gallery/birla_tisya_bangaloore/WhatsApp Image 2026-05-21 at 4.16.03 PM (1).jpeg";
import galleryBirla7 from "@/assets/Image gallery/birla_tisya_bangaloore/WhatsApp Image 2026-05-21 at 4.16.05 PM.jpeg";
import galleryBirla8 from "@/assets/Image gallery/birla_tisya_bangaloore/WhatsApp Image 2026-05-21 at 4.16.08 PM (1).jpeg";

// Borewell gallery
import borewellImg1 from "@/assets/borewell/IMG_20251009_125203.jpg";
import borewellImg2 from "@/assets/borewell/IMG_20251009_131145.jpg";
import borewellImg3 from "@/assets/borewell/IMG_20260206_073457.jpg";
import borewellImg4 from "@/assets/borewell/IMG_20260206_073503.jpg";
import borewellImg5 from "@/assets/borewell/IMG_20260206_073508.jpg";
import borewellImg6 from "@/assets/borewell/image.jpeg";
import borewellImg7 from "@/assets/borewell/IMG_20260206_100059.jpg";

// Air Compressor gallery
import aircomp1 from "@/assets/aircompressor/IMG_20250521_164915.jpg";
import aircomp2 from "@/assets/aircompressor/IMG_20250521_164929.jpg";
import aircomp3 from "@/assets/aircompressor/IMG_20250521_164944.jpg";
import aircomp4 from "@/assets/aircompressor/IMG_20250521_165003.jpg";
import aircomp5 from "@/assets/aircompressor/IMG_20250521_165101.jpg";
import aircomp6 from "@/assets/aircompressor/IMG_20250522_151044.jpg";
import aircomp7 from "@/assets/aircompressor/air.jpeg";

// Marine Propulsion gallery
import marine1 from "@/assets/Marine Propulsion/1.png";
import marine2 from "@/assets/Marine Propulsion/2.png";

export const Route = createFileRoute("/")({
  component: OmSolutionsHome,
  head: () => ({
    meta: [
      { title: "OM Solutions | Dual Fuel Kits & Alternate Fuel Solutions" },
      {
        name: "description",
        content:
          "OM Solutions provides dual-fuel and alternate-fuel solutions for diesel engines, generators, marine applications, trucks, buses, tractors, earth movers and industrial applications.",
      },
      { property: "og:title", content: "OM Solutions | Dual Fuel Kits & Alternate Fuel Solutions" },
      {
        property: "og:description",
        content: "Smarter power, lower fuel cost and cleaner performance through dual-fuel conversion solutions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const navItems = [
  ["Home", "home"],
  ["Technology", "technology"],
  ["About", "about"],
  ["Regulations", "regulations"],
  ["Gallery", "gallery"],
  ["News", "field"],
  ["Contact", "contact"],
] as const;

const regulationsData = [
  { name: "Andhra Pradesh", pdf: "/documents/regulations/Andhra Pradesh - andhara.pdf" },
  { name: "Delhi ", pdf: "/documents/regulations/Delhi - Year-2023_CAQM-Direction-No.-76.pdf" },
  { name: "Goa", pdf: "/documents/regulations/Goa - Year-2023_Goa-State-Pollution-Control-Board-Dated-28th-March-2023.pdf" },
  { name: "Gujarat", pdf: "/documents/regulations/Gujrat - Year-2023-Gujarat-Circular-26-10-2023.pdf" },
  { name: "Haryana", pdf: "/documents/regulations/Haryana - Year-2020_Haryana_NCR_500_RECD_DFK.pdf" },
  { name: "Jammu & Kashmir", pdf: "/documents/regulations/Jammu & Kashmir - Year-2021_JK_NCR_125_RECD_DFK.pdf" },
  { name: "Karnataka", pdf: "/documents/regulations/Karnataka - Year-2024-Karnataka-Notification-12-jun-2024.pdf" },
  { name: "Kerala", pdf: "/documents/regulations/Kerala - Kerala-SPCB-Order-Dated-15-05-2023.pdf" },
  { name: "Maharashtra", pdf: "/documents/regulations/Maharashtra - Year-2023_DG-Set-Circular-02-06-2023.pdf" },
  { name: "Odisha", pdf: "/documents/regulations/Odisha - 2023-Odisha-Circular-DG-Sets-15730-dtd.-6.10.2023-2.pdf" },
  { name: "Tamil Nadu", pdf: "/documents/regulations/Tamil Nadu - Year-2021_Notice_Followup_RECD_DFK-1.pdf" },
] as const;

// Schematic component configuration for interactive viewer
type SchematicComponent = {
  id: string;
  name: string;
  image?: string;
  secondaryImages?: { label: string; image: string }[];
  hotspot: { x: number; y: number; width: number; height: number };
  description?: string;
};

const schematicComponents: SchematicComponent[] = [
  {
    id: "gas-air-mixer",
    name: "Gas Air Mixer",
    image: airGasMixerComponent,
    hotspot: { x: 10, y: 33, width: 12, height: 10 },
  },
  {
    id: "control-panel",
    name: "Control Panel",
    image: controlPanelComponent,
    hotspot: { x: 15, y: 80, width: 15, height: 12 },
  },
  {
    id: "energy-meter",
    name: "Energy Meter",
    image: energyMeterComponent,
    hotspot: { x: 45, y: 55, width: 10, height: 8 },
  },
  {
    id: "egt-sensor",
    name: "EGT Sensor",
    image: exhaustTemperatureSensorsComponent,
    hotspot: { x: 60, y: 60, width: 8, height: 8 },
  },
  {
    id: "knock-sensor",
    name: "Knock Sensor",
    image: knockSensorComponent,
    secondaryImages: [{ label: "Installation View", image: knockSensorMountingComponent }],
    hotspot: { x: 45, y: 75, width: 8, height: 8 },
  },
  {
    id: "gas-pressure-regulator",
    name: "Gas Pressure Regulator",
    image: lpgPressureRegulatorComponent,
    hotspot: { x: 60, y: 40, width: 10, height: 10 },
  },
  {
    id: "air-filter",
    name: "Air Filter",
    hotspot: { x: 10, y: 45, width: 10, height: 10 },
  },
  {
    id: "gas-filter",
    name: "Gas Filter",
    hotspot: { x: 70, y: 40, width: 8, height: 8 },
  },
  {
    id: "gas-flow-control",
    name: "Gas Flow Control",
    hotspot: { x: 25, y: 25, width: 8, height: 8 },
  },
  {
    id: "diesel-engine",
    name: "Diesel Engine",
    hotspot: { x: 50, y: 65, width: 20, height: 20 },
  },
  {
    id: "alternator",
    name: "Alternator",
    hotspot: { x: 78, y: 75, width: 12, height: 12 },
  },
];

const fuelColumns = ["PNG", "CNG", "LPG", "LNG", "Ethanol", "Methanol", "Isobutane"] as const;

const fuelArchitecture = [
  { application: "Diesel Generator set", supported: ["PNG", "CNG", "LPG", "LNG", "Ethanol", "Methanol", "Isobutane"] },
  { application: "Marine Propulsion Engine", supported: ["LPG", "LNG", "Ethanol", "Methanol", "Isobutane"] },
  { application: "Marine Generator set", supported: ["LPG", "LNG", "Ethanol", "Methanol", "Isobutane"] },
  { application: "Diesel engine based Air Compressor", supported: ["CNG", "LPG", "LNG", "Ethanol", "Methanol", "Isobutane"] },
  { application: "Diesel engine based Borewell", supported: ["CNG", "LPG", "LNG", "Ethanol", "Methanol", "Isobutane"] },
  { application: "Diesel engine based Harvester", supported: ["CNG", "LPG", "LNG", "Ethanol", "Methanol", "Isobutane"] },
  { application: "Diesel engine based Tractor", supported: ["CNG", "LPG", "LNG", "Ethanol", "Methanol", "Isobutane"] },
  { application: "Diesel engine based Earthmover", supported: ["CNG", "LPG", "LNG", "Ethanol", "Methanol", "Isobutane"] },
] as const;

const benefits = [
  "Reduces particulate emissions",
  "Supports Pollution Control Board particulate-matter reduction requirements",
  "Enables gaseous fuel use up to 70% in diesel engines",
  "Saves fuel and operating cost",
  "Same power level as the base diesel engine",
  "No need to replace the existing diesel genset",
  "Higher thermal efficiency",
  "Lesser diesel engine maintenance",
  "No major modifications to the base diesel engine",
  "Flexibility between dual-fuel and 100% diesel mode",
  "Improved engine life",
  "Quick and easy installation",
];

const comparisonRows = [
  ["Capital Investment", "Very High Capital Investment", "Very High Capital Investment", "Medium to High Capital Investment", "Very Low Capital Investment"],
  ["Fuel Flexibility", "No fuel flexibility", "No fuel flexibility", "No fuel flexibility", "Fuel flexibility (Diesel / Dual Fuel)"],
  ["Existing Genset Modification", "Needs replacement", "Needs replacement", "No replacement · Exhaust modification", "No replacement · Gas Air Mixer added in intake"],
  ["Technology Limitations", "Sensitive technology", "Sensitive technology", "Higher engine back pressure · PM disposal", "Effective between 30 to 80% load · Min 30% diesel required"],
  ["Operating Cost", "Low fuel cost", "Higher fuel cost", "Higher fuel cost", "Lower fuel cost · Very low maintenance cost"],
  ["Service Skillset", "Very high skillset", "Very high skillset", "No special skillset required", "No special skillset required"],
];

const recdTypes = {
  selfCleaning: {
    label: "Self-Cleaning",
    heading: "Self-Cleaning Type",
    points: [
      "Back-pressure sensor-based operation",
      "Additional back pressure on the engine",
      "Higher power loss",
      "Higher diesel consumption",
      "Lower thermal efficiency",
      "Higher CO₂ emission",
      "Particulates are generated and then captured",
      "Disposal of collected particulates is a concern",
      "Pressure sensor failure can cause major engine damage",
    ],
  },
  regeneration: {
    label: "Regeneration",
    heading: "Regeneration Type",
    points: [
      "Back-pressure sensor-based operation",
      "Additional back pressure on the engine",
      "Higher power loss",
      "Higher diesel consumption",
      "Lower thermal efficiency",
      "Higher CO₂ emission",
      "Particulates are generated, captured and then regeneration is performed as per logic",
      "Pressure sensor failure can cause major engine damage",
    ],
  },
  noRegeneration: {
    label: "No Self-Cleaning / Regeneration",
    heading: "No Self-Cleaning / Regeneration",
    points: [
      "Additional back pressure on the engine",
      "Higher power loss",
      "Higher diesel consumption",
      "Lower thermal efficiency",
      "Higher CO₂ emission",
      "Particulates are generated and then captured",
      "Disposal of collected particulates is a major concern",
    ],
  },
} as const;

type RecdType = keyof typeof recdTypes;

const dualFuelConsiderations = [
  { id: "gasAvailability", label: "Gas Availability", statement: "Dual Fuel mode is possible only with Alternate fuel / Gas availability." },
  { id: "loadDefinition", label: "Load Definition", statement: "Appropriate load definition is VIMP." },
  { id: "weather", label: "Weather Conditions", statement: "Diesel replacement is sensitive to weather conditions." },
  { id: "loadCycle", label: "Load Cycle", statement: "Diesel replacement is dependent on Engine Application (Load cycle)." },
  { id: "fuelQuality", label: "Fuel Quality", statement: "Diesel replacement is dependent on Fuel Quality." },
  { id: "engineHealth", label: "Engine Health", statement: "Appropriate sensing is needed for engine health monitoring." },
] as const;

type DualFuelConsideration = (typeof dualFuelConsiderations)[number]["id"];

const componentGallery = [
  ["Gas Handling System for PNG", gasHandlingImage],
  ["Exhaust Temperature Sensors", exhaustTemperatureSensorsImage],
  ["Air Gas Mixer", airGasMixerImage],
  ["LPG Pressure regulator (LOT capable)", lpgPressureRegulatorImage],
  ["Energy meter", energyMeterImage],
  ["Control panel", controlPanelImage],
  ["Gas system assembly", gasSystemImage],
  ["Knock sensor mounting", engineDetailImage],
  ["Knock Sensor", knockSensorImage],
  ["Gas Leak Detector",gasleakdeact]
] as const;

const galleryItems = [
  ["TATA 125 kVA · LPG installation", tataImage, "Installations"],
  ["KOEL 320 kVA · PNG installation", koelImage, "Installations"],
  ["Birla Tisya · Bengaluru", birlaImageOne, "Birla Tisya"],
  ["Birla Tisya · generator detail", birlaImageTwo, "Birla Tisya"],
  ["Birla Tisya · engine components", engineImage, "Birla Tisya"],
  ["MaxGen Energy · gas system", gasSystemImage, "MaxGen Energy"],
  ["Borewell application", borewellImage, "Applications"],
  ["Air compressor application", compressorImage, "Applications"],
  ["Marine propulsion", marineImage, "Applications"],
  ["Marine propulsion · field detail", marineDetailImage, "Applications"],
  ["Marine engine installation", marineEngineImage, "Applications"],
  ["Dual-fuel control panel", controlPanelImage, "Products"],
] as const;

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Small delay so the page loads first, then typing begins
    const startTimer = setTimeout(() => setStarted(true), 400);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, 38);
    return () => clearTimeout(timer);
  }, [started, displayed, text]);

  // Split at "decarbonise" to preserve the line break
  const breakIdx = text.indexOf("decarbonise");
  const line1 = displayed.slice(0, Math.min(displayed.length, breakIdx));
  const line2 = displayed.length > breakIdx ? displayed.slice(breakIdx) : "";

  return (
    <>
      {line1}
      {displayed.length >= breakIdx && <br />}
      {line2}
      {/* blinking cursor while typing */}
      {displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[0.85em] bg-white align-middle ml-1 animate-pulse" />
      )}
    </>
  );
}

function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef0 = useRef<HTMLImageElement>(null);
  const imgRef1 = useRef<HTMLImageElement>(null);
  const imgRef2 = useRef<HTMLImageElement>(null);
  const imgRef3 = useRef<HTMLImageElement>(null);
  const imgRef4 = useRef<HTMLImageElement>(null);
  const imgRef5 = useRef<HTMLImageElement>(null);
  const imgRef6 = useRef<HTMLImageElement>(null);
  const imgRef7 = useRef<HTMLImageElement>(null);
  const imgRef8 = useRef<HTMLImageElement>(null);
  const imgRef9 = useRef<HTMLImageElement>(null);
  const imgRef10 = useRef<HTMLImageElement>(null);
  const imgRef11 = useRef<HTMLImageElement>(null);
  const imgRef12 = useRef<HTMLImageElement>(null);
  const imgRef13 = useRef<HTMLImageElement>(null);
  const imgRef14 = useRef<HTMLImageElement>(null);
  const imgRef15 = useRef<HTMLImageElement>(null);
  const imgRef16 = useRef<HTMLImageElement>(null);
  const imgRef17 = useRef<HTMLImageElement>(null);
  const imgRef18 = useRef<HTMLImageElement>(null);
  const imgRef19 = useRef<HTMLImageElement>(null);
  const imgRef20 = useRef<HTMLImageElement>(null);
  const imgRef21 = useRef<HTMLImageElement>(null);
  const imgRef22 = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgs = [imgRef0.current, imgRef1.current, imgRef2.current, imgRef3.current, imgRef4.current, imgRef5.current, imgRef6.current, imgRef7.current, imgRef8.current, imgRef9.current, imgRef10.current, imgRef11.current, imgRef12.current, imgRef13.current, imgRef14.current, imgRef15.current, imgRef16.current, imgRef17.current, imgRef18.current, imgRef19.current, imgRef20.current, imgRef21.current, imgRef22.current].filter(Boolean) as HTMLImageElement[];

    let raf: number;
    let t = 0;

    // Slide state
    const SLIDE_DURATION = 220;   // frames each slide holds (~7s at 30fps)
    const FADE_DURATION  = 55;    // crossfade length in frames
    let current = 0;
    let frameInSlide = 0;

    // Particles ”” heat-haze style
    const COUNT = 60;
    type Particle = { x: number; y: number; vx: number; vy: number; size: number; alpha: number; pulse: number };
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random(),
      y: 0.5 + Math.random() * 0.6,
      vx: (Math.random() - 0.5) * 0.00015,
      vy: -(Math.random() * 0.00025 + 0.00006),
      size: Math.random() * 2.4 + 0.5,
      alpha: Math.random() * 0.45 + 0.08,
      pulse: Math.random() * Math.PI * 2,
    }));

    function resize() {
      if (!canvas) return;
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function drawImage(img: HTMLImageElement, alpha: number, zoom: number, panX: number, panY: number) {
      if (!canvas || !ctx || !img.naturalWidth) return;
      const W = canvas.width, H = canvas.height;
      const iw = img.naturalWidth, ih = img.naturalHeight;
      const scale = Math.max(W / iw, H / ih) * zoom;
      const dw = iw * scale, dh = ih * scale;
      const dx = (W - dw) / 2 + panX * W;
      const dy = (H - dh) / 2 + panY * H;
      ctx.globalAlpha = alpha;
      ctx.filter = "saturate(0.75) brightness(0.88)";
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.filter = "none";
      ctx.globalAlpha = 1;
    }

    function draw() {
      if (!canvas || !ctx || imgs.length === 0) { raf = requestAnimationFrame(draw); return; }
      const W = canvas.width, H = canvas.height;
      t += 1;
      frameInSlide += 1;

      ctx.clearRect(0, 0, W, H);

      // Current slide Ken-Burns params
      const progress = frameInSlide / SLIDE_DURATION;
      const zoom    = 1 + progress * 0.07;
      const panX    = -progress * 0.02;
      const panY    = -progress * 0.01;

      const next = (current + 1) % imgs.length;

      if (frameInSlide >= SLIDE_DURATION - FADE_DURATION) {
        // Crossfade phase
        const fadeProgress = (frameInSlide - (SLIDE_DURATION - FADE_DURATION)) / FADE_DURATION;
        const alphaA = 1 - fadeProgress;
        const alphaB = fadeProgress;
        drawImage(imgs[current]!, alphaA, zoom, panX, panY);
        drawImage(imgs[next]!, alphaB, 1, 0, 0);
      } else {
        drawImage(imgs[current]!, 1, zoom, panX, panY);
      }

      if (frameInSlide >= SLIDE_DURATION) {
        current = next;
        frameInSlide = 0;
      }

      // â”€â”€ Vignette â”€â”€
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, H * 0.9);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(5,14,10,0.22)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      // â”€â”€ Subtle diagonal light sweep â”€â”€
      const sweepT = (t * 0.007) % 2.2;
      if (sweepT < 1.4) {
        const sx = (sweepT / 1.4) * (W + 500) - 250;
        const sg = ctx.createLinearGradient(sx - 220, 0, sx + 220, H);
        sg.addColorStop(0,   "rgba(200,255,180,0)");
        sg.addColorStop(0.5, "rgba(200,255,180,0.06)");
        sg.addColorStop(1,   "rgba(200,255,180,0)");
        ctx.fillStyle = sg;
        ctx.fillRect(0, 0, W, H);
      }

      // â”€â”€ Particles â”€â”€
      for (const p of particles) {
        p.x     += p.vx;
        p.y     += p.vy;
        p.pulse += 0.018;
        if (p.y < -0.04) { p.y = 1.0; p.x = Math.random(); }
        if (p.x < -0.04) p.x = 1.04;
        if (p.x >  1.04) p.x = -0.04;
        const a = p.alpha * (0.55 + 0.45 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,255,120,${a})`;
        ctx.shadowBlur  = 12;
        ctx.shadowColor = "#9ddf60";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    }

    // Wait for at least one image to load before starting
    let started = false;
    const onLoad = () => { if (!started) { started = true; draw(); } };
    imgs.forEach((img: HTMLImageElement) => {
      if (img.complete && img.naturalWidth > 0) onLoad();
      else img.addEventListener("load", onLoad, { once: true });
    });
    if (imgs.every((i: HTMLImageElement) => i.complete && i.naturalWidth > 0)) { if (!started) { started = true; draw(); } }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <>
      {/* Preload images — hidden off-screen */}
      <img ref={imgRef0}  src={heroBg4}  alt="" aria-hidden="true" className="sr-only" />
      <img ref={imgRef1}  src={heroBg5}  alt="" aria-hidden="true" className="sr-only" />
      <img ref={imgRef2}  src={heroBg6}  alt="" aria-hidden="true" className="sr-only" />
      <img ref={imgRef3}  src={heroBg7}  alt="" aria-hidden="true" className="sr-only" />
      <img ref={imgRef4}  src={heroBg8}  alt="" aria-hidden="true" className="sr-only" />
      <img ref={imgRef5}  src={heroBg9}  alt="" aria-hidden="true" className="sr-only" />
      <img ref={imgRef6}  src={heroBg10} alt="" aria-hidden="true" className="sr-only" />
      <img ref={imgRef7}  src={heroBg11} alt="" aria-hidden="true" className="sr-only" />
      <img ref={imgRef8}  src={heroBg12} alt="" aria-hidden="true" className="sr-only" />
      <img ref={imgRef9}  src={heroBg13} alt="" aria-hidden="true" className="sr-only" />
      <img ref={imgRef10} src={heroBg14} alt="" aria-hidden="true" className="sr-only" />
      <img ref={imgRef11} src={heroBg15} alt="" aria-hidden="true" className="sr-only" />
      <img ref={imgRef12} src={heroBg16} alt="" aria-hidden="true" className="sr-only" />
      <img ref={imgRef13} src={heroBg17} alt="" aria-hidden="true" className="sr-only" />
      <img ref={imgRef14} src={heroBg18} alt="" aria-hidden="true" className="sr-only" />
      <img ref={imgRef15} src={heroBg19} alt="" aria-hidden="true" className="sr-only" />
      <img ref={imgRef16} src={heroBg20} alt="" aria-hidden="true" className="sr-only" />
      <img ref={imgRef17} src={heroBg21} alt="" aria-hidden="true" className="sr-only" />
      <img ref={imgRef18} src={heroBg22} alt="" aria-hidden="true" className="sr-only" />
      <img ref={imgRef19} src={heroBg23} alt="" aria-hidden="true" className="sr-only" />
      {/* Canvas renders everything */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 z-[0] h-full w-full"
        style={{ pointerEvents: "none" }}
      />
    </>
  );
}

function SectionLabel({ index, children, dark = false }: { index: string; children: string; dark?: boolean }) {
  return (
    <div className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] ${dark ? "text-signal" : "text-primary"}`}>
      <span>{index}</span>
      <span className={dark ? "text-background/55" : "text-muted-foreground"}>{children}</span>
    </div>
  );
}

function ImageButton({ src, alt, caption, onClick, className = "" }: { src: string; alt: string; caption?: string; onClick: () => void; className?: string }) {
  return (
    <button type="button" onClick={onClick} className={`group relative block w-full overflow-hidden text-left ${className}`} aria-label={`Open ${alt}`}>
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
      {caption ? <span className="absolute inset-x-0 bottom-0 bg-panel/80 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">{caption}</span> : null}
    </button>
  );
}

function OmSolutionsHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [techDrawerOpen, setTechDrawerOpen] = useState(false);
  const [appGallery, setAppGallery] = useState<{ title: string; images: string[]; index: number } | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [technologyView, setTechnologyView] = useState<"dualFuel" | "recd">("dualFuel");
  const [fuelKitView, setFuelKitView] = useState<"lpg" | "png">("lpg");
  const [recdType, setRecdType] = useState<RecdType>("selfCleaning");
  const [selectedConsideration, setSelectedConsideration] = useState<DualFuelConsideration>("gasAvailability");
  const [selectedFuelApplication, setSelectedFuelApplication] = useState(0);
  const [selectedFuel, setSelectedFuel] = useState<(typeof fuelColumns)[number] | null>(null);
  const [dealershipModalOpen, setDealershipModalOpen] = useState(false);
  const [mobileRegulationsOpen, setMobileRegulationsOpen] = useState(false);
  
  // Schematic viewer state
  const [schematicViewerOpen, setSchematicViewerOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<SchematicComponent | null>(null);
  const [schematicZoom, setSchematicZoom] = useState(1);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [componentImageIndex, setComponentImageIndex] = useState(0);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
        setTechDrawerOpen(false);
        setAppGallery(null);
        setDealershipModalOpen(false);
        setSchematicViewerOpen(false);
        setSelectedComponent(null);
      }
      if (schematicViewerOpen && selectedComponent) {
        const currentIndex = schematicComponents.findIndex(c => c.id === selectedComponent.id);
        if (event.key === "ArrowLeft" && currentIndex > 0) {
          setSelectedComponent(schematicComponents[currentIndex - 1]);
          setComponentImageIndex(0);
        }
        if (event.key === "ArrowRight" && currentIndex < schematicComponents.length - 1) {
          setSelectedComponent(schematicComponents[currentIndex + 1]);
          setComponentImageIndex(0);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [schematicViewerOpen, selectedComponent]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>('a[href="mailto:omsolns18@gmail.com"]').forEach((link) => {
      link.href = "mailto:support.omsolutions@gmail.com";
      const address = link.querySelector("span span:last-child");
      if (address) address.textContent = "support.omsolutions@gmail.com";
      else link.textContent = "support.omsolutions@gmail.com";
    });
  }, []);

  const openImage = (src: string, alt: string) => setSelectedImage({ src, alt });
  const openSchematicViewer = () => {
    setSchematicViewerOpen(true);
    setSelectedComponent(null);
    setSchematicZoom(1);
    setComponentImageIndex(0);
  };
  const closeMenu = () => setMenuOpen(false);
  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/xppznglk", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setFormSent(true);
        form.reset();
      } else {
        alert("Something went wrong. Please email us directly at support.omsolutions@gmail.com");
      }
    } catch {
      alert("Could not send. Please email us directly at support.omsolutions@gmail.com");
    }
  };

  const navScrolled = scrolled || menuOpen;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header
        style={{ transition: "height .35s ease, background .35s ease, backdrop-filter .35s ease" }}
        className={[
          "fixed inset-x-0 top-0 z-50 flex flex-col",
          navScrolled
            ? "h-[72px] bg-[rgba(13,23,19,0.88)] backdrop-blur-[16px]"
            : "h-[85px] bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex w-full flex-1 max-w-[1440px] items-center justify-between px-[4.5vw]">
          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 xl:flex ml-4">
            {navItems.map(([label, id]) => (
              label === "Regulations" ? (
                <div
                  key={id}
                  className="relative group/regulations"
                >
                  <button
                    className="flex items-center gap-1 whitespace-nowrap text-[13px] font-extrabold uppercase tracking-[0.11em] text-white/86 transition-colors duration-200 hover:text-[#b6ff72]"
                  >
                    {label}
                    <ChevronDown className="size-3 transition-transform duration-200 group-hover/regulations:rotate-180" />
                  </button>
                  
                  {/* Dropdown */}
                  <div className="absolute left-0 top-full opacity-0 invisible group-hover/regulations:opacity-100 group-hover/regulations:visible transition-all duration-300">
                    <div className="relative w-[440px] overflow-hidden rounded-xl border border-white/15 bg-[#0a120f]/98 backdrop-blur-md shadow-[0_25px_80px_rgba(0,0,0,0.5)] mt-3">
                      <div className="border-b border-white/12 bg-gradient-to-b from-white/[0.04] to-transparent px-6 py-5">
                        <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-white">Pollution Control Board Notifications</p>
                        <p className="mt-2 text-xs leading-relaxed text-white/55">Official notifications and directions related to DG-set emission control and cleaner power generation.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-px bg-white/8 p-5">
                        {regulationsData.map((reg) => (
                          <a
                            key={reg.name}
                            href={reg.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between gap-2 rounded-lg bg-[#0a120f] px-4 py-3 text-xs font-semibold text-white/75 transition-all duration-200 hover:bg-[#b6ff72]/12 hover:text-[#b6ff72]"
                          >
                            {reg.name}
                            <ArrowRight className="size-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={id}
                  href={`#${id}`}
                  className="whitespace-nowrap text-[13px] font-extrabold uppercase tracking-[0.11em] text-white/86 transition-colors duration-200 hover:text-[#b6ff72]"
                >
                  {label}
                </a>
              )
            ))}
            <button
              onClick={() => setDealershipModalOpen(true)}
              className="group hidden items-center gap-2 whitespace-nowrap rounded-lg bg-[#b6ff72] px-5 py-2.5 text-[13px] font-extrabold uppercase tracking-[0.11em] text-[#0d1f16] transition-all duration-200 hover:bg-[#a3e065] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6ff72] sm:inline-flex"
            >
              Dealership
              <span className="text-[13px] font-normal leading-none transition-transform duration-200 group-hover:translate-x-0.5">↗</span>
            </button>
          </nav>

          {/* Hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[6px] border-0 bg-transparent p-2 text-white xl:hidden"
          >
            <span
              style={{
                display: "block",
                height: "1px",
                width: "23px",
                background: "currentColor",
                transition: "transform .25s, opacity .25s",
                transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                height: "1px",
                width: "23px",
                background: "currentColor",
                transition: "opacity .25s",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                height: "1px",
                width: "23px",
                background: "currentColor",
                transition: "transform .25s, opacity .25s",
                transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
              }}
            />
          </button>

          {/* Brand */}
          <a
            href="#home"
            onClick={closeMenu}
            aria-label="OM Solutions home"
            className="flex shrink-0 items-center gap-2.5 text-white no-underline"
          >
            <img
              src={logoImage}
              alt="OM Solutions"
              className="h-9 w-9 rounded-full object-cover ring-1 ring-white/30"
            />
            <span className="text-[16px] font-extrabold tracking-[0.08em] uppercase leading-none">
              OM Solutions
            </span>
          </a>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="border-t border-white/15 bg-[#0d1713] px-6 pb-7 pt-5 xl:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map(([label, id]) => (
                label === "Regulations" ? (
                  <div key={id}>
                    <button
                      onClick={() => setMobileRegulationsOpen(!mobileRegulationsOpen)}
                      className="flex w-full items-center justify-between border-b border-white/10 py-3 text-[13px] font-extrabold uppercase tracking-[0.11em] text-white/80 transition-colors hover:text-[#b6ff72]"
                    >
                      {label}
                      <ChevronDown className={`size-4 transition-transform duration-200 ${mobileRegulationsOpen ? "rotate-180" : ""}`} />
                    </button>
                    {mobileRegulationsOpen && (
                      <div className="border-b border-white/12 bg-gradient-to-b from-white/[0.03] to-transparent py-5 animate-in slide-in-from-top-2 duration-300">
                        <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">Pollution Control Board Notifications</p>
                        <div className="flex flex-col gap-1">
                          {regulationsData.map((reg) => (
                            <a
                              key={reg.name}
                              href={reg.pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={closeMenu}
                              className="group flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-xs font-semibold text-white/65 transition-colors hover:bg-[#b6ff72]/10 hover:text-[#b6ff72]"
                            >
                              {reg.name}
                              <ArrowRight className="size-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={closeMenu}
                    className="border-b border-white/10 py-3 text-[13px] font-extrabold uppercase tracking-[0.11em] text-white/80 transition-colors hover:text-[#b6ff72]"
                  >
                    {label}
                  </a>
                )
              ))}
              <button
                onClick={() => {
                  setDealershipModalOpen(true);
                  closeMenu();
                }}
                className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#b6ff72] px-5 py-2.5 text-[13px] font-extrabold uppercase tracking-[0.11em] text-[#0d1f16] transition-all duration-200 hover:bg-[#a3e065] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6ff72]"
              >
                Dealership <span className="text-[13px] font-normal leading-none transition-transform duration-200 group-hover:translate-x-0.5">↗</span>
              </button>
            </div>
          </nav>
        )}
      </header>

      <main>
        <section id="home" className="relative isolate min-h-[100svh] overflow-hidden bg-panel">
          {/* Animated hero background */}
          <HeroBackground />
          {/* Dark gradient overlay so text stays readable */}
          <div className="absolute inset-0 z-[2]" style={{ background: "linear-gradient(90deg,rgba(7,18,12,.28) 0%,rgba(8,20,14,.14) 55%,rgba(8,20,14,.05)), linear-gradient(0deg,rgba(7,18,12,.28),transparent 46%)" }} />
          <div className="relative z-[3] mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col items-center justify-end px-5 pt-[85px] pb-32 text-center lg:px-16">
            <div className="max-w-4xl rise-in">
              <h1 className="mt-0 text-[clamp(32px,4.5vw,64px)] font-light leading-[1.1] tracking-[-0.02em] text-white">
                <TypewriterText text="Our purpose is to clean and decarbonise the air" />
              </h1>
              <p className="mt-7 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white sm:text-base"><span className="h-px w-8 bg-[#b6ff72]" />We are OM Solutions<span className="h-px w-8 bg-[#b6ff72]" /></p>
              <div className="mt-7">
                <a href="https://wa.me/917387591083" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center border border-white bg-transparent px-7 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-[#0b1f15]">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
          <div className="absolute bottom-7 right-5 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-background/45 lg:flex lg:right-10 z-[3]"><span className="h-px w-10 bg-signal" /> Field-ready conversion systems</div>
        </section>

        {/* OM / 04 Primary product - Dual Fuel Kit */}
        <section id="kit" className="bg-white">
          <div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div><SectionLabel index="OM / 04">Primary product</SectionLabel><h2 className="mt-5 text-4xl font-extrabold tracking-tight lg:text-6xl text-gray-900">OM Solutions<br />Dual Fuel Kit</h2><p className="mt-6 max-w-xl text-base leading-relaxed text-gray-600">A dual-fuel system allows a diesel engine to use diesel together with an alternate gaseous fuel, reducing diesel consumption while maintaining engine operation.</p><div className="mt-8 grid grid-cols-2 gap-3"><div className="rounded-[9px] border border-gray-200 bg-gray-50 p-4"><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-gray-500">Fuel mode</p><p className="mt-2 font-mono text-lg text-gray-900">Dual=Diesel+NG</p></div><div className="rounded-[9px] border border-gray-200 bg-gray-50 p-4"><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-gray-500">Gas usage</p><p className="mt-2 text-sm font-semibold text-gray-900">up to 70%</p></div><div className="rounded-[9px] border border-gray-200 bg-gray-50 p-4"><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-gray-500">Control</p><p className="mt-2 font-mono text-lg text-gray-900">Sensors + valves</p></div><div className="rounded-[9px] border border-gray-200 bg-gray-50 p-4"><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-gray-500">Existing genset</p><p className="mt-2 font-mono text-lg text-gray-900">No replacement</p></div></div></div>
              <div className="rounded-[12px] border border-gray-200 bg-gray-50 p-4 sm:p-6"><div className="flex items-center justify-between"><p className="font-mono text-xs uppercase tracking-[0.18em] text-gray-500">System schematic</p><span className="flex items-center gap-2 font-mono text-[10px] text-[#b6ff72]"><span className="size-2 rounded-full bg-[#b6ff72]" /> Interactive view</span></div><button type="button" className="mt-5 block w-full overflow-hidden rounded-[8px] bg-white" onClick={openSchematicViewer}><img src={schematicImage} alt="Dual fuel kit schematic" className="aspect-[1.75/1] w-full object-contain transition-transform duration-500 hover:scale-[1.02]" /></button><div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-2 font-mono text-[10px] text-gray-600 sm:grid-cols-3"><span>· Air Filter</span><span>· Gas Air Mixer</span><span>· Gas Filter</span><span>· Pressure Regulator</span><span>· Gas Flow Control</span><span>· Knock Sensor</span><span>· EGT Sensor</span><span>· Control Panel</span><span>· Energy Meter</span></div></div>
            </div>
          </div>
        </section>

        {/* ——— Cinematic "Explore Technology" banner —— */}
        <section id="technology" className="relative isolate min-h-[480px] overflow-hidden">
          <img
            src={compressorNightImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "saturate(0.6) brightness(0.55)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(7,20,13,0.82)] via-[rgba(7,20,13,0.55)] to-[rgba(7,20,13,0.25)]" />
          <div className="relative z-10 flex min-h-[480px] flex-col justify-end px-5 pb-16 pt-24 lg:px-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#b6ff72]">OM Solutions · Technology</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
             Focused on<br />Alternate Fuels for <br/>I.C. Engines
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">
              To make engine operation cleaner and more cost-effective, we need to make the shift to intelligent dual-fuel systems.
            </p>
            <button
              type="button"
              onClick={() => setTechDrawerOpen(true)}
              className="mt-8 inline-flex w-fit items-center gap-3 bg-[#b6ff72] px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#0d1f16] transition-colors hover:bg-white"
            >
              Explore Technology <ArrowRight className="size-4" />
            </button>
          </div>
        </section>

        {/* â”€â”€ Tech Drawer â”€â”€ */}
        {techDrawerOpen && (
          <div
            className="fixed inset-0 z-[55] flex flex-col bg-background"
            role="dialog"
            aria-modal="true"
            aria-label="OM Solutions Technology"
          >
            {/* Drawer header — full-width dark nav matching the main site */}
            <div className="sticky top-0 z-10 flex items-center justify-between bg-panel px-[4.5vw] py-5">
              {/* Brand */}
              <a
                href="#home"
                onClick={() => setTechDrawerOpen(false)}
                className="flex items-center gap-2.5 rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b6ff72]"
                aria-label="OM Solutions — return to home"
              >
                <img src={logoImage} alt="OM Solutions" className="h-9 w-9 rounded-full object-cover ring-1 ring-white/20" />
                <span className="text-[15px] font-extrabold uppercase tracking-[0.08em] text-white">OM Solutions</span>
              </a>

              {/* Section links — hidden on mobile */}
              <nav className="hidden items-center gap-6 xl:flex">
              {[["Technology Matrix", "dr-solutions"], ["Technology", "dr-tech"], ["Benefits", "dr-benefits"], ["Considerations", "dr-considerations"], ["Comparison", "dr-compare"]].map(([label, id]) => (
                  <a key={id} href={`#${id}`} className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.11em] text-white/75 transition-colors hover:text-[#b6ff72]">{label}</a>
                ))}
              </nav>

              {/* Close */}
              <button
                type="button"
                onClick={() => setTechDrawerOpen(false)}
                className="flex items-center gap-2.5 border border-white/30 px-4 py-3 text-[10px] font-extrabold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white/10"
                aria-label="Close technology panel"
              >
                Close <X className="size-3.5" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">

              <section id="dr-solutions" className="bg-background">
                <div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
                  <div className="flex flex-wrap items-end justify-between gap-6">
                    <div>
                      <SectionLabel index="OM / 03">Technology matrix</SectionLabel>
                      <h2 className="mt-5 text-4xl font-extrabold tracking-tight lg:text-5xl">Dual fuel technology architecture</h2>
                    </div>
                    <p className="max-w-md text-sm leading-relaxed text-muted-foreground">Explore supported alternate-fuel pathways across engine applications.</p>
                  </div>

                  {/* Premium Compatibility Matrix */}
                  <div className="mt-10 overflow-hidden rounded-[20px] border border-border/60 bg-[#f9faf8] shadow-[0_8px_40px_rgba(11,31,21,0.07)]">
                    {/* Matrix header bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 bg-white px-7 py-5">
                      <p className="text-sm font-bold uppercase tracking-[0.12em] text-foreground">Fuel Compatibility Matrix</p>
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full" style={{ background: "oklch(0.72 0.16 155)" }} />
                        <span className="text-sm font-semibold text-foreground">Supported pathway</span>
                      </div>
                    </div>

                    {/* Scrollable table */}
                    <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
                      <table className="w-full min-w-[680px] border-collapse">
                        {/* Fuel column headers */}
                        <thead>
                          <tr className="border-b border-border/40">
                            <th scope="col" className="sticky left-0 z-20 min-w-[160px] sm:min-w-[260px] bg-[#f9faf8] px-3 sm:px-7 py-4 sm:py-6 text-left">
                              <span className="text-[10px] sm:text-sm font-bold uppercase tracking-[0.1em] text-foreground">Application</span>
                            </th>
                            {fuelColumns.map((fuel) => (
                              <th key={fuel} scope="col" className={`min-w-[62px] sm:min-w-[88px] px-1 sm:px-2 py-4 sm:py-6 text-center transition-colors ${selectedFuel === fuel ? "bg-primary/10" : ""}`}>
                                <button type="button" onClick={() => setSelectedFuel(selectedFuel === fuel ? null : fuel)} aria-pressed={selectedFuel === fuel} className="flex w-full flex-col items-center gap-1 rounded-[6px] py-1 focus-visible:outline-2 focus-visible:outline-primary">
                                  <span className={`size-1.5 rounded-full ${selectedFuel === fuel ? "bg-primary" : "bg-border/60"}`} />
                                  <span className="text-[9px] sm:text-xs font-bold uppercase tracking-[0.06em] sm:tracking-[0.08em] text-foreground">{fuel}</span>
                                </button>
                              </th>
                            ))}
                          </tr>
                        </thead>

                        {/* Application rows */}
                        <tbody>
                          {fuelArchitecture.map(({ application, supported }, index) => (
                            <tr key={application} className={`group border-b border-border/40 last:border-0 transition-colors hover:bg-primary/[0.04] ${selectedFuelApplication === index ? "bg-primary/[0.06]" : ""}`}>
                              {/* Application name — sticky */}
                              <th scope="row" className={`sticky left-0 z-10 px-3 sm:px-7 py-3 sm:py-5 text-left transition-colors ${selectedFuelApplication === index ? "bg-primary-soft" : "bg-[#f9faf8] group-hover:bg-primary/[0.04]"}`}>
                                <button type="button" onClick={() => setSelectedFuelApplication(index)} className="flex w-full items-center gap-2 sm:gap-3 text-left focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4">
                                  <span className={`shrink-0 font-mono text-[9px] sm:text-xs font-bold tracking-[0.1em] transition-all duration-200 ${selectedFuelApplication === index ? "text-primary" : "text-primary/70 group-hover:text-primary"}`}>
                                    {String(index + 1).padStart(2, "0")}
                                  </span>
                                  <span className="text-[11px] sm:text-base font-semibold sm:font-bold leading-snug text-foreground">
                                    {application}
                                  </span>
                                </button>
                              </th>

                              {/* Fuel cells */}
                              {fuelColumns.map((fuel) => {
                                const isSupported = (supported as readonly string[]).includes(fuel);
                                return (
                                  <td key={fuel} className={`px-0.5 sm:px-2 py-2 sm:py-4 text-center transition-colors duration-200 ${selectedFuel === fuel ? "bg-primary/[0.06]" : ""}`}>
                                    {isSupported ? (
                                      <button
                                        type="button"
                                        onClick={() => { setSelectedFuelApplication(index); setSelectedFuel(fuel); }}
                                        aria-label={`${application} supports ${fuel}`}
                                        className={`mx-auto grid size-7 sm:size-10 place-items-center rounded-[5px] sm:rounded-[6px] border text-primary transition-all duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 group-hover:border-primary/50 group-hover:bg-primary/15 ${selectedFuelApplication === index && selectedFuel === fuel ? "ring-2 ring-primary ring-offset-2" : ""}`}
                                        style={{
                                          background: "oklch(0.72 0.16 155 / 0.09)",
                                          borderColor: "oklch(0.72 0.16 155 / 0.28)",
                                        }}
                                      >
                                        <Check className="size-3 sm:size-4 stroke-[3]" />
                                      </button>
                                    ) : (
                                      <button type="button" onClick={() => { setSelectedFuelApplication(index); setSelectedFuel(fuel); }} aria-label={`${application} does not support ${fuel}`} className="mx-auto grid size-7 sm:size-10 place-items-center text-sm sm:text-base font-medium text-muted-foreground/40 transition-colors duration-200 group-hover:text-muted-foreground/60 focus-visible:outline-2 focus-visible:outline-primary">
                                        —
                                      </button>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    Supported pathways are subject to engine configuration, fuel availability and application requirements.
                  </p>
                </div>
              </section>

              <section id="dr-tech" className="border-b border-border">
                <div className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-20">
                  <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
                    <div><SectionLabel index="OM / 05">Technology</SectionLabel><h2 className="mt-5 text-4xl font-extrabold tracking-tight lg:text-5xl">Dual Fuel Kit vs RECD</h2></div>
                    <p className="max-w-xl text-base leading-relaxed text-muted-foreground">Two different approaches to particulate reduction.</p>
                  </div>

                  <div className="mt-9 overflow-hidden rounded-[12px] border border-border bg-background shadow-[0_18px_45px_-35px_rgba(10,28,22,0.55)]">
                    <div role="tablist" aria-label="Technology comparison" className="grid grid-cols-2 border-b border-border bg-secondary/65 p-2">
                      {(["dualFuel", "recd"] as const).map((view) => {
                        const active = technologyView === view;
                        const isDualFuel = view === "dualFuel";
                        return <button key={view} id={`${view}-tab`} type="button" role="tab" aria-selected={active} aria-controls="technology-panel" onClick={() => setTechnologyView(view)} className={`flex items-center gap-3 rounded-[8px] px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal ${active ? "bg-panel text-background shadow-sm" : "text-muted-foreground hover:bg-background hover:text-primary"}`}>
                          <span className={`grid size-8 shrink-0 place-items-center rounded-[6px] ${active ? "bg-signal text-panel" : isDualFuel ? "bg-primary/10 text-primary" : "bg-danger/10 text-danger"}`}>{isDualFuel ? <Fuel className="size-4" /> : <ShieldCheck className="size-4" />}</span>
                          <span><span className="block text-sm font-bold sm:text-base">{isDualFuel ? "Dual Fuel" : "RECD"}</span><span className={`mt-0.5 block font-mono text-[9px] uppercase tracking-[0.1em] ${active ? "text-background/55" : "text-muted-foreground"}`}>{isDualFuel ? "During combustion" : "After generation"}</span></span>
                        </button>;
                      })}
                    </div>

                    <article id="technology-panel" role="tabpanel" aria-labelledby={`${technologyView}-tab`} className="min-h-[332px] bg-background">
                      {technologyView === "dualFuel" ? (
                        <div key="dual-fuel" className="grid h-full animate-in fade-in slide-in-from-bottom-1 duration-300 lg:grid-cols-[0.78fr_1.22fr]">
                          <button type="button" className="relative flex min-h-52 items-center justify-center overflow-hidden bg-panel p-6" onClick={() => openImage(systemImage, "OM Solutions dual-fuel kit schematic")} aria-label="Open Dual Fuel schematic"><span className="absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[0.16em] text-signal">Air intake system</span><img src={systemImage} alt="Dual Fuel system schematic" loading="lazy" className="relative mt-5 max-h-52 w-full object-contain transition-transform duration-300 hover:scale-[1.02]" /></button>
                          <div className="p-5 sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">Dual Fuel</p><h3 className="mt-2 text-2xl font-bold">Reduce In Situ.</h3></div><span className="hidden rounded-full bg-primary-soft px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-primary sm:block">Engine air flow</span></div><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Controlled introduction of alternate fuel into the engine air flow to reduce diesel consumption and particulate generation during combustion.</p><div className="mt-5 grid gap-x-5 gap-y-3 border-t border-border pt-4 sm:grid-cols-2">{["Reduces particulate generation during combustion", "Uses controlled fuel injection with sensors, valves and actuators", "Can reduce diesel consumption under suitable operating conditions", "Existing diesel operation can be retained"].map((point) => <div key={point} className="flex gap-2 text-xs leading-snug"><Check className="mt-0.5 size-3.5 shrink-0 text-signal" />{point}</div>)}</div></div>
                        </div>
                      ) : (
                        <div key={`${recdType}-recd`} className="grid h-full animate-in fade-in slide-in-from-bottom-1 duration-300 lg:grid-cols-[0.78fr_1.22fr]">
                          <div className="relative flex min-h-52 items-center justify-center overflow-hidden bg-panel p-6"><span className="absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[0.16em] text-signal">Exhaust system</span><img src={recdImage} alt="RECD exhaust emission control device diagram" loading="lazy" className="relative mt-5 max-h-52 w-full object-contain opacity-85" /></div>
                          <div className="p-5 sm:p-7"><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-danger">RECD</p><h3 className="mt-2 text-2xl font-bold">RECD <span className="text-muted-foreground">(Retrofit Emission Control Device)</span></h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Retrofit Emission Control Device added to the diesel engine exhaust to capture particulates.</p><div role="tablist" aria-label="RECD type" className="mt-4 flex gap-2 overflow-x-auto pb-1">{(Object.keys(recdTypes) as RecdType[]).map((type) => <button key={type} type="button" role="tab" aria-selected={recdType === type} onClick={() => setRecdType(type)} className={`shrink-0 rounded-full border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal ${recdType === type ? "border-primary bg-primary text-primary-foreground" : "border-border bg-secondary text-muted-foreground hover:border-primary/40"}`}>{recdTypes[type].label}</button>)}</div><div className="mt-4 border-t border-border pt-4"><h4 className="text-sm font-bold">{recdTypes[recdType].heading}</h4><div className="mt-3 grid gap-x-5 gap-y-2 sm:grid-cols-2">{recdTypes[recdType].points.map((point) => <p key={point} className="flex gap-2 text-xs leading-snug text-muted-foreground"><span className="mt-1.5 size-1 shrink-0 rounded-full bg-danger" />{point}</p>)}</div></div></div>
                        </div>
                      )}
                    </article>
                  </div>
                </div>
              </section>

              {/* LPG & PNG Dual Fuel Kits Section */}
              <section id="dr-fuel-kits" className="border-b border-border">
                <div className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-20">
                  <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
                    <div><SectionLabel index="OM / 06">Fuel Systems</SectionLabel><h2 className="mt-5 text-4xl font-extrabold tracking-tight lg:text-5xl">LPG & PNG Dual Fuel Kits</h2></div>
                    <p className="max-w-xl text-base leading-relaxed text-muted-foreground">Dual-fuel solutions for different gas types and applications.</p>
                  </div>

                  <div className="mt-9 overflow-hidden rounded-[12px] border border-border bg-background shadow-[0_18px_45px_-35px_rgba(10,28,22,0.55)]">
                    <div role="tablist" aria-label="Fuel kit comparison" className="grid grid-cols-2 border-b border-border bg-secondary/65 p-2">
                      {(["lpg", "png"] as const).map((view) => {
                        const active = fuelKitView === view;
                        const isLpg = view === "lpg";
                        return <button key={view} id={`${view}-tab`} type="button" role="tab" aria-selected={active} aria-controls="fuel-kit-panel" onClick={() => setFuelKitView(view)} className={`flex items-center gap-3 rounded-[8px] px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal ${active ? "bg-panel text-background shadow-sm" : "text-muted-foreground hover:bg-background hover:text-primary"}`}>
                          <span className={`grid size-8 shrink-0 place-items-center rounded-[6px] ${active ? "bg-signal text-panel" : isLpg ? "bg-orange-500/10 text-orange-500" : "bg-blue-500/10 text-blue-500"}`}><Zap className="size-4" /></span>
                          <span><span className="block text-sm font-bold sm:text-base">{isLpg ? "LPG Kit" : "PNG Kit"}</span><span className={`mt-0.5 block font-mono text-[9px] uppercase tracking-[0.1em] ${active ? "text-background/55" : "text-muted-foreground"}`}>{isLpg ? "LPG System" : "PNG System"}</span></span>
                        </button>;
                      })}
                    </div>

                    <article id="fuel-kit-panel" role="tabpanel" aria-labelledby={`${fuelKitView}-tab`} className="min-h-[332px] bg-background">
                      {fuelKitView === "lpg" ? (
                        <div key="lpg" className="grid h-full animate-in fade-in slide-in-from-bottom-1 duration-300 lg:grid-cols-[0.78fr_1.22fr]">
                          <button type="button" className="relative flex min-h-52 items-center justify-center overflow-hidden bg-panel p-6" onClick={() => openImage(lpgKitImage, "OM Solutions LPG dual-fuel kit")} aria-label="Open LPG kit image"><span className="absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[0.16em] text-orange-500">LPG System</span><img src={lpgKitImage} alt="LPG dual-fuel kit" loading="lazy" className="relative mt-5 max-h-52 w-full object-contain transition-transform duration-300 hover:scale-[1.02]" /></button>
                          <div className="p-5 sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-orange-500">LPG Dual Fuel</p><h3 className="mt-2 text-2xl font-bold">LPG-Powered Efficiency.</h3></div><span className="hidden rounded-full bg-orange-100 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-orange-600 sm:block">Liquefied Petroleum Gas</span></div><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">LPG dual-fuel systems enable diesel engines to operate with LPG as the alternate fuel, offering cost savings and reduced emissions for stationary and mobile applications.</p><div className="mt-5 grid gap-x-5 gap-y-3 border-t border-border pt-4 sm:grid-cols-2">{["Cost-effective fuel alternative with high availability", "Clean combustion with lower particulate emissions", "Suitable for generator sets and industrial applications", "Easy integration with existing diesel engines"].map((point) => <div key={point} className="flex gap-2 text-xs leading-snug"><Check className="mt-0.5 size-3.5 shrink-0 text-orange-500" />{point}</div>)}</div></div>
                        </div>
                      ) : (
                        <div key="png" className="grid h-full animate-in fade-in slide-in-from-bottom-1 duration-300 lg:grid-cols-[0.78fr_1.22fr]">
                          <button type="button" className="relative flex min-h-52 items-center justify-center overflow-hidden bg-panel p-6" onClick={() => openImage(pngKitImage, "OM Solutions PNG dual-fuel kit")} aria-label="Open PNG kit image"><span className="absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[0.16em] text-blue-500">PNG System</span><img src={pngKitImage} alt="PNG dual-fuel kit" loading="lazy" className="relative mt-5 max-h-52 w-full object-contain transition-transform duration-300 hover:scale-[1.02]" /></button>
                          <div className="p-5 sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-blue-500">PNG Dual Fuel</p><h3 className="mt-2 text-2xl font-bold">Natural Gas Solution.</h3></div><span className="hidden rounded-full bg-blue-100 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-blue-600 sm:block">Piped Natural Gas</span></div><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">PNG dual-fuel systems utilize piped natural gas for continuous, reliable operation with consistent fuel supply and lower operating costs for grid-connected facilities.</p><div className="mt-5 grid gap-x-5 gap-y-3 border-t border-border pt-4 sm:grid-cols-2">{["Continuous fuel supply via pipeline infrastructure", "Lower fuel cost compared to diesel and LPG", "Clean-burning with minimal environmental impact", "Ideal for facilities with PNG availability"].map((point) => <div key={point} className="flex gap-2 text-xs leading-snug"><Check className="mt-0.5 size-3.5 shrink-0 text-blue-500" />{point}</div>)}</div></div>
                        </div>
                      )}
                    </article>
                  </div>
                </div>
              </section>

              <section id="dr-benefits" className="bg-secondary/40">
                <div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28"><div className="flex flex-wrap items-end justify-between gap-6"><div><SectionLabel index="OM / 06">Why dual fuel</SectionLabel><h2 className="mt-5 text-4xl font-extrabold tracking-tight lg:text-6xl">Benefits of using a Dual Fuel kit</h2></div><p className="max-w-md text-sm leading-relaxed text-muted-foreground">The 70% figure is the maximum gaseous fuel use stated in the profile and depends on engine, application, load and fuel conditions.</p></div><div className="mt-12 grid gap-px overflow-hidden rounded-[12px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{benefits.map((benefit, index) => <div key={benefit} className={`flex gap-4 bg-background p-5 ${index < 4 ? "lg:p-7" : ""}`}><span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-signal text-panel`}><Check className="size-3.5" /></span><div><p className="text-sm font-semibold leading-snug">{benefit}</p>{index === 2 ? <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Maximum stated figure</p> : null}</div></div>)}</div></div>
              </section>

              <section id="dr-considerations" className="border-b border-border bg-background">
                <div className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-20">
                  <div className="flex flex-wrap items-end justify-between gap-5"><div><SectionLabel index="OM / 07">Operating considerations</SectionLabel><h2 className="mt-4 text-3xl font-extrabold tracking-tight lg:text-4xl">Challenges while using a Dual Fuel Kit</h2></div><p className="max-w-md text-sm leading-relaxed text-muted-foreground">Dual-fuel performance depends on operating conditions. These considerations should be evaluated for the intended engine application.</p></div>
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-[9px] border border-border bg-secondary/45 px-5 py-4"><div><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">Operating range</p><p className="mt-1 text-sm font-semibold">Diesel replacement is effective between 30% to 80% load.</p></div><span className="rounded-full bg-primary px-4 py-2 font-mono text-xs font-bold text-primary-foreground">30–80% LOAD</span></div>
                  <div className="mt-4 grid gap-3 lg:grid-cols-2 lg:gap-5">
                    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">{dualFuelConsiderations.slice(0, 3).map((item, index) => <button key={item.id} type="button" onClick={() => setSelectedConsideration(item.id)} aria-pressed={selectedConsideration === item.id} className={`rounded-[8px] border px-4 py-3 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal ${selectedConsideration === item.id ? "border-signal bg-background shadow-sm" : "border-border bg-secondary/45 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-background"}`}><span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">0{index + 1} · {item.label}</span><span className="mt-1.5 block text-sm leading-snug">{item.statement}</span></button>)}</div>
                    <div className="relative flex min-h-[268px] flex-col items-center justify-center overflow-hidden rounded-[12px] bg-panel px-6 text-center text-background"><div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(182,255,114,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(182,255,114,0.24)_1px,transparent_1px)] [background-size:24px_24px]" /><span className="relative grid size-16 place-items-center rounded-full border border-signal/40 bg-signal/10 font-mono text-lg font-bold text-signal">DF</span><p className="relative mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-signal">Dual Fuel · Operating Range</p><span className="relative mt-3 rounded-full border border-signal/40 bg-background/10 px-4 py-2 font-mono text-xs font-bold text-signal">30–80% Load</span><p className="relative mt-3 max-w-[210px] text-[10px] leading-relaxed text-background/55">Diesel replacement is effective between 30% to 80% load.</p></div>
                    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">{dualFuelConsiderations.slice(3).map((item, index) => <button key={item.id} type="button" onClick={() => setSelectedConsideration(item.id)} aria-pressed={selectedConsideration === item.id} className={`rounded-[8px] border px-4 py-3 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal ${selectedConsideration === item.id ? "border-signal bg-background shadow-sm" : "border-border bg-secondary/45 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-background"}`}><span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">0{index + 4} · {item.label}</span><span className="mt-1.5 block text-sm leading-snug">{item.statement}</span></button>)}</div>
                  </div>
                  <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"></p>
                </div>
              </section>

              <section id="dr-compare" className="border-b border-border">
                <div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28"><SectionLabel index="OM / 09">Technology comparison</SectionLabel><div className="mt-5 flex flex-wrap items-end justify-between gap-6"><h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Comparison of technology options to comply SPCB notification for PM reduction</h2><p className="max-w-sm text-sm leading-relaxed text-muted-foreground"></p></div><div className="mt-12 overflow-x-auto rounded-[12px] border border-border"><table className="w-full min-w-[980px] border-collapse text-left text-sm"><thead><tr className="bg-panel text-background"><th className="w-[18%] px-5 py-4 font-mono text-[10px] uppercase tracking-[0.12em] text-background/65">Category</th><th className="px-5 py-4 font-semibold">New Gas Genset CPCB-IV+</th><th className="px-5 py-4 font-semibold">New Diesel Genset CPCB-IV+</th><th className="px-5 py-4 font-semibold">Retrofit Emission Control Device</th><th className="bg-primary px-5 py-4 font-semibold text-primary-foreground">Dual Fuel Kit</th></tr></thead><tbody>{comparisonRows.map((row) => <tr key={row[0]} className="border-t border-border"><th className="px-5 py-5 font-semibold">{row[0]}</th><td className="px-5 py-5 text-muted-foreground">{row[1]}</td><td className="px-5 py-5 text-muted-foreground">{row[2]}</td><td className="px-5 py-5 text-muted-foreground">{row[3]}</td><td className="bg-primary-soft px-5 py-5 font-semibold text-primary">{row[4]}</td></tr>)}</tbody></table></div></div>
              </section>

              {/* Close button at bottom */}
              <div className="flex justify-center bg-panel py-10">
                <button
                  type="button"
                  onClick={() => setTechDrawerOpen(false)}
                  className="inline-flex items-center gap-3 border border-white/25 px-7 py-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/10"
                >
                  <X className="size-3.5" /> Close Technology Panel
                </button>
              </div>

            </div>
          </div>
        )}

        <section id="gallery" className="bg-background">
          <div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <SectionLabel index="OM / 17">Image gallery</SectionLabel>
                <h2 className="mt-5 text-4xl font-extrabold tracking-tight lg:text-6xl">In the field.</h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Installations from the field. Click any image to view the full gallery.</p>
            </div>

            {/* Installation galleries — 2×2 grid */}
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {/* TATA 125 kVA */}
              <article className="group overflow-hidden rounded-[11px] border border-border bg-background cursor-pointer"
                onClick={() => setAppGallery({ title: "Sai Sound Service (Amane Engineers), Waki (B)", images: [tataImage], index: 0 })}>
                <div className="relative overflow-hidden aspect-[1.25/1]">
                  <img src={tataImage} alt="TATA 125 kVA LPG installation" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-panel/0 transition-colors group-hover:bg-panel/20" />
                  <span className="absolute bottom-3 right-3 rounded-full bg-panel/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white">1 photo</span>
                </div>
                <div className="flex items-end justify-between gap-4 p-5">
                  <div>
                    <h3 className="text-xl font-bold">Sai Sound Service (Amane Engineers), Waki (B)</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
                      <li><span className="font-medium text-foreground">Genset:</span> TATA 125 kVA CPCB-II</li>
                      <li><span className="font-medium text-foreground">Fuel strategy:</span> Diesel + LPG (LOT)</li>
                      <li><span className="font-medium text-foreground">Operating load:</span> 60–85%</li>
                    </ul>
                  </div>
                  <ArrowDownRight className="mb-1 size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                </div>
              </article>

              {/* KOEL 320 kVA */}
              <article className="group overflow-hidden rounded-[11px] border border-border bg-background cursor-pointer"
                onClick={() => setAppGallery({ title: "Akwel Automotive India Pvt Ltd", images: [koelImg1, koelImg2], index: 0 })}>
                <div className="relative overflow-hidden aspect-[1.25/1]">
                  <img src={koelImg1} alt="KOEL 320 kVA PNG installation" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-panel/0 transition-colors group-hover:bg-panel/20" />
                  <span className="absolute bottom-3 right-3 rounded-full bg-panel/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white">2 photos</span>
                </div>
                <div className="flex items-end justify-between gap-4 p-5">
                  <div>
                    <h3 className="text-xl font-bold">Akwel Automotive India Pvt Ltd</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
                      <li><span className="font-medium text-foreground">Genset:</span> KOEL 320 kVA CPCB-II</li>
                      <li><span className="font-medium text-foreground">Fuel strategy:</span> Diesel + PNG (300 bar)</li>
                      <li><span className="font-medium text-foreground">Operating load:</span> 50–80%</li>
                      <li><span className="font-medium text-foreground">Annual Fuel Cost Saving:</span> ₹3.96 lakhs</li>
                      <li><span className="font-medium text-foreground">Annual CO₂ Reduction:</span> 6.13 tonnes</li>
                    </ul>
                  </div>
                  <ArrowDownRight className="mb-1 size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                </div>
              </article>

              {/* Birla Tisya */}
              <article className="group overflow-hidden rounded-[11px] border border-border bg-background cursor-pointer"
                onClick={() => setAppGallery({ title: "Birla Tisya, Bengaluru", images: [galleryBirla1, galleryBirla2, galleryBirla3, galleryBirla4, galleryBirla5, galleryBirla6, galleryBirla7, galleryBirla8], index: 0 })}>
                <div className="relative overflow-hidden aspect-[1.25/1]">
                  <img src={galleryBirla1} alt="Birla Tisya Bengaluru installation" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-panel/0 transition-colors group-hover:bg-panel/20" />
                  <span className="absolute bottom-3 right-3 rounded-full bg-panel/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white">8 photos</span>
                </div>
                <div className="flex items-end justify-between gap-4 p-5">
                  <div>
                    <h3 className="text-xl font-bold">Birla Tisya, Bengaluru</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
                      <li><span className="font-medium text-foreground">Gensets:</span> FMTU 1010 kVA CPCB-IV+ × 2; Greaves 200 kVA CPCB-IV+</li>
                      <li><span className="font-medium text-foreground">Fuel strategy:</span> Diesel + PNG (1 bar)</li>
                      <li><span className="font-medium text-foreground">Operating load:</span> 50–60%</li>
                    </ul>
                  </div>
                  <ArrowDownRight className="mb-1 size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                </div>
              </article>

              {/* Nevatia Maxgen */}
              <article className="group overflow-hidden rounded-[11px] border border-border bg-background cursor-pointer"
                onClick={() => setAppGallery({ title: "Nevatia Steels & Alloys, Boisar, Tarapur", images: [nevatiaMg1, nevatiaMg2, nevatiaMg3, nevatiaMg4, nevatiaMg5, nevatiaMg6, nevatiaMg7, nevatiaMg8, nevatiaMg9], index: 0 })}>
                <div className="relative overflow-hidden aspect-[1.25/1]">
                  <img src={nevatiaMg1} alt="Nevatia Steel MaxGen Energy dual-fuel installation" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-panel/0 transition-colors group-hover:bg-panel/20" />
                  <span className="absolute bottom-3 right-3 rounded-full bg-panel/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white">9 photos</span>
                </div>
                <div className="flex items-end justify-between gap-4 p-5">
                  <div>
                    <h3 className="text-xl font-bold">Nevatia Steels & Alloys, Boisar, Tarapur</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
                      <li><span className="font-medium text-foreground">Genset:</span> MTU 1000 kVA CPCB-II</li>
                      <li><span className="font-medium text-foreground">Fuel strategy:</span> Diesel + PNG (1 bar)</li>
                      <li><span className="font-medium text-foreground">Operating load:</span> 60–80%</li>
                       <li><span className="font-medium text-foreground">Annual Fuel Cost Saving:</span> ₹18.42 lakhs</li>
                      <li><span className="font-medium text-foreground">Annual CO₂ Reduction:</span> 22.36 tonnes</li>
                    </ul>
                  </div>
                  <ArrowDownRight className="mb-1 size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                </div>
              </article>

            </div>
          </div>
        </section>

        {/* Other applications section */}
        <section id="other-applications" className="bg-secondary/40">
          <div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
            <SectionLabel index="OM / 15">Other applications</SectionLabel>
            <div className="mt-5 flex flex-wrap items-end justify-between gap-5">
              <h2 className="text-4xl font-extrabold tracking-tight lg:text-6xl">Applications other than gensets.</h2>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">Click any application to view all installation images.</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {([
                { title: "Borewell", desc: "Dual-fuel kits for borewell pump sets.", images: [ borewellImg3,borewellImg1, borewellImg2, borewellImg5, borewellImg4, borewellImg6, borewellImg7] },
                { title: "Air Compressor", desc: "Field installation for air-compressor applications.", images: [aircomp7,aircomp1, aircomp2, aircomp3, aircomp4, aircomp5, aircomp6] },
                { title: "Marine Propulsion", desc: "Marine propulsion with dual-fuel conversion.", images: [marine1, marine2] },
              ] as { title: string; desc: string; images: string[] }[]).map((app) => (
                <article key={app.title} className="group cursor-pointer overflow-hidden rounded-[11px] border border-border bg-background" onClick={() => setAppGallery({ title: app.title, images: app.images, index: 0 })}>
                  <div className="relative overflow-hidden aspect-[1.25/1]">
                    <img src={app.images[0]} alt={app.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-panel/0 transition-colors group-hover:bg-panel/30" />
                    <span className="absolute bottom-3 right-3 rounded-full bg-panel/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white">{app.images.length} photos</span>
                  </div>
                  <div className="flex items-end justify-between gap-4 p-5">
                    <div><h3 className="text-xl font-bold">{app.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{app.desc}</p></div>
                    <ArrowDownRight className="mb-1 size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Customer Stories / News ── */}
        <section id="field" className="border-t border-border bg-background">
          <div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">

            <h2 className="text-4xl font-extrabold tracking-tight lg:text-6xl">Memories</h2>

            {/* Category tabs */}
            <div className="mt-6 flex flex-wrap gap-6 border-b border-border pb-4">
              {["All", "Installations", "Generator", "Marine"].map((tab, i) => (
                <span key={tab} className={`cursor-default pb-4 text-sm font-medium transition-colors ${i === 0 ? "-mb-px border-b-2 border-foreground text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{tab}</span>
              ))}
            </div>

            {/* News grid */}
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

              <article className="group cursor-default">
                <div className="overflow-hidden">
                  <img
                    src={akwelImage}
                    alt="OM Solutions team with client at Akwel Automotive Pune handover"
                    className="aspect-[1.5/1] w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold leading-snug">OM Solutions hands over a successfully commissioned KOEL 320 kVA PNG dual-fuel system to the team at Akwel Automotive, Pune — 65% diesel replaced from day one.</h3>              </article>

              <article className="group cursor-default">
                <div className="overflow-hidden">
                  <img
                    src={birlaNewsImage}
                    alt="Client team at Birla Tisya Bengaluru celebrating dual-fuel conversion"
                    className="aspect-[1.5/1] w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold leading-snug">Om Solutions, installed 3 nos of Dual Fuel kits at Birla Tisya, Bengaluru. The gensets total capacity rated 2.2 MVA are ready to run on Dual Fuel with Diesel & Piped Natural Gas.</h3>
              </article>

              <article className="group cursor-default">
                <div className="overflow-hidden">
                  <img
                    src={ammeniEngineImage}
                    alt="OM Solutions founder with client discussing dual-fuel kit"
                    className="aspect-[1.5/1] w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold leading-snug">OM Solutions successfully installs Dual Fuel kit based on LPG for TATA 125 kVA at Amane Engineers — 45% diesel replaced at 75–80% load.</h3>
              </article>

            </div>

            <p className="mt-8 text-xs text-muted-foreground"></p>
          </div>
        </section>

        {/* About section - moved here */}
        <section id="about" className="border-b border-border">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:py-28">
            <div>
              <SectionLabel index="OM / 02">About OM Solutions</SectionLabel>
              <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight lg:text-6xl">Focused on Alternate Fuels for Internal Combustion Engines</h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">OM Solutions was established in 2021 by <strong className="text-foreground">Prasad Parulekar (IIT Bombay)</strong>, with 20+ years of alternate-fuel-based power generation experience.</p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">The company delivers alternate-fuel and dual-fuel solutions across engine and industrial applications from generator sets and commercial vehicles to marine propulsion, tractors, earth movers, producer gas and liquid fuels.</p>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="rounded-[6px] border border-border bg-secondary px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">IIT Bombay Mtech Energy Science</span>
                <span className="rounded-[6px] border border-border bg-secondary px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Cummins India experience</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-3">
              <div className="rounded-[10px] bg-panel p-4 text-background sm:p-5">
                <p className="font-mono text-3xl leading-none text-signal sm:text-4xl">2021</p>
                <p className="mt-2 text-sm text-background/60">Company established</p>
              </div>
              <div className="rounded-[10px] bg-primary p-4 text-primary-foreground sm:p-5">
                <p className="font-mono text-[clamp(1.45rem,5vw,2.75rem)] leading-[1.05] tracking-[-0.04em]">20+ Years of Industry Experience</p>
                <p className="mt-2 text-sm text-primary-foreground/75">Extensive in alternate-fuel-based power generation</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden bg-panel text-background"><img src={generatorImage} alt="OM Solutions generator installation" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-20" /><div className="absolute inset-0 bg-panel/90" /><div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-28"><div><SectionLabel index="OM / 18" dark>Consultation</SectionLabel><h2 className="mt-5 text-4xl font-extrabold tracking-tight lg:text-6xl">Talk to Our Technical Team</h2><p className="mt-6 max-w-md text-base leading-relaxed text-background/70">Share your engine, application and fuel availability for a technical conversation about dual-fuel suitability.</p><div className="mt-10 space-y-5"><a href="mailto:omsolns18@gmail.com" className="flex items-start gap-4 text-sm text-background/80 transition-colors hover:text-signal"><span className="grid size-9 place-items-center rounded-[6px] bg-background/10 text-signal">@</span><span><span className="block font-mono text-[10px] uppercase tracking-[0.13em] text-background/45">Email</span><span className="mt-1 block">omsolns18@gmail.com</span></span></a><div className="flex items-start gap-4 text-sm text-background/80"><span className="grid size-9 place-items-center rounded-[6px] bg-background/10 text-signal"><Phone className="size-4" /></span><span><span className="block font-mono text-[10px] uppercase tracking-[0.13em] text-background/45">Contact</span><a href="https://wa.me/917387591083" target="_blank" rel="noopener noreferrer" className="mt-1 block transition-colors hover:text-signal">+91 73875 91083<span className="font-mono text-[9px] text-signal">WhatsApp</span></a></span></div><div className="flex items-start gap-4 text-sm text-background/80"><span className="grid size-9 place-items-center rounded-[6px] bg-background/10 text-signal"><Factory className="size-4" /></span><span><span className="block font-mono text-[10px] uppercase tracking-[0.13em] text-background/45">Office</span><span className="mt-1 block leading-relaxed">29A, Sairam Park, Near Cipla Foundation,<br />Warje, Pune, Maharashtra, India 411058</span></span></div></div></div><div className="glass-panel rounded-[13px] p-6 sm:p-8"><form onSubmit={submitForm} className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-xs font-medium text-background/70">Name<input required name="name" className="h-11 rounded-[6px] border border-background/15 bg-background/5 px-3 text-sm text-background outline-none placeholder:text-background/35 focus:border-signal" placeholder="Your name" /></label><label className="grid gap-2 text-xs font-medium text-background/70">Company<input required name="company" className="h-11 rounded-[6px] border border-background/15 bg-background/5 px-3 text-sm text-background outline-none placeholder:text-background/35 focus:border-signal" placeholder="Company name" /></label><label className="grid gap-2 text-xs font-medium text-background/70">Phone<input name="phone" className="h-11 rounded-[6px] border border-background/15 bg-background/5 px-3 text-sm text-background outline-none placeholder:text-background/35 focus:border-signal" placeholder="+91" /></label><label className="grid gap-2 text-xs font-medium text-background/70">Email<input required type="email" name="email" className="h-11 rounded-[6px] border border-background/15 bg-background/5 px-3 text-sm text-background outline-none placeholder:text-background/35 focus:border-signal" placeholder="you@company.com" /></label><label className="grid gap-2 text-xs font-medium text-background/70 sm:col-span-2">Application / Requirement<select name="application" className="h-11 rounded-[6px] border border-background/15 bg-panel px-3 text-sm text-background outline-none focus:border-signal"><option>Choose an application</option><option>Generator set</option><option>Marine engine</option><option>Truck or bus</option><option>Tractor or earth mover</option><option>Other industrial application</option></select></label><label className="grid gap-2 text-xs font-medium text-background/70 sm:col-span-2">Message<textarea required name="message" rows={4} className="rounded-[6px] border border-background/15 bg-background/5 px-3 py-3 text-sm text-background outline-none placeholder:text-background/35 focus:border-signal" placeholder="Tell us about the engine, load profile and fuel availability." /></label><div className="sm:col-span-2"><Button type="submit" className="h-12 w-full rounded-[7px] bg-primary text-sm font-semibold text-primary-foreground shadow-none hover:bg-primary/90">{formSent ? "Request noted ”” thank you" : "Get a Consultation"} <ArrowRight className="size-4" /></Button><p className="mt-3 font-mono text-[10px] text-background/40"></p></div></form></div></div></section>
      </main>

      <footer className="border-t border-border bg-background"><div className="mx-auto max-w-[1440px] px-5 py-12 lg:px-10"><div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-sm"><div className="flex items-center gap-3"><img src={logoImage} alt="OM Solutions" className="h-10 w-12 object-contain" /><div><p className="font-extrabold tracking-tight">OM SOLUTIONS</p><p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Dual Fuel Systems</p></div></div><p className="mt-5 font-mono text-[11px] leading-relaxed text-muted-foreground">Smarter Power ”“ Lower Fuel Cost ”“ Cleaner Performance</p><div className="mt-6 flex items-center gap-3"><a href="https://linkedin.com/company/om-solutions" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-[7px] border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"><Linkedin className="size-4" /></a><a href="https://youtube.com/@omsolutions" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded-[7px] border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"><Youtube className="size-4" /></a><a href="https://twitter.com/omsolutions" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="grid h-9 w-9 place-items-center rounded-[7px] border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"><Twitter className="size-4" /></a><a href="https://instagram.com/omsolutions" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-[7px] border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"><Instagram className="size-4" /></a></div></div><div className="grid gap-10 sm:grid-cols-2"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Quick links</p><nav className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 text-sm">{navItems.map(([label, id]) => <a key={id} href={`#${id}`} className="transition-colors hover:text-primary">{label}</a>)}</nav></div><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Contact</p><div className="mt-4 space-y-2 text-sm text-muted-foreground"><a href="mailto:omsolns18@gmail.com" className="block hover:text-primary">omsolns18@gmail.com</a><a href="https://wa.me/917387591083" target="_blank" rel="noopener noreferrer" className="block hover:text-primary">+91 73875 91083 <span className="font-mono text-[9px] text-primary">WhatsApp</span></a><p>Warje, Pune, Maharashtra</p></div></div></div></div><div className="mt-10 flex flex-col gap-2 border-t border-border pt-5 font-mono text-[10px] text-muted-foreground sm:flex-row sm:justify-between"><span>© 2026 OM Solutions. All Rights Reserved.</span><span>Dual Fuel &amp; RECD Technology</span></div></div></footer>

      {selectedImage ? <div className="fixed inset-0 z-[60] flex items-center justify-center bg-panel/90 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={selectedImage.alt} onClick={() => setSelectedImage(null)}><div className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-[10px] border border-background/15 bg-background" onClick={(event) => event.stopPropagation()}><Button type="button" variant="outline" size="icon" className="absolute right-3 top-3 z-10 rounded-[6px] border-border bg-background/85" aria-label="Close image viewer" onClick={() => setSelectedImage(null)}><X /></Button><img src={selectedImage.src} alt={selectedImage.alt} className="max-h-[86vh] max-w-full object-contain" /></div></div> : null}

      {/* Interactive Schematic Viewer */}
      {schematicViewerOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0a0f0d]/95 p-4 backdrop-blur-sm"
          onClick={() => setSchematicViewerOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Dual Fuel Kit Schematic Viewer"
        >
          <div
            className="relative flex flex-col overflow-hidden rounded-[14px] bg-[#0d1410] shadow-2xl w-full"
            style={{ maxWidth: "90vw", maxHeight: "90vh", border: "1px solid rgba(182,255,114,0.15)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between px-5 py-4 border-b border-white/10">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#b6ff72]">
                  {selectedComponent ? "Component Detail" : "System Schematic"}
                </p>
                <h3 className="text-lg font-extrabold text-white leading-tight">
                  {selectedComponent ? selectedComponent.name : "Dual Fuel Kit"}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                {!selectedComponent && (
                  <>
                    <button
                      type="button"
                      onClick={() => setSchematicZoom(Math.max(0.5, schematicZoom - 0.25))}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                      aria-label="Zoom out"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="font-mono text-sm text-white/50 w-12 text-center">{Math.round(schematicZoom * 100)}%</span>
                    <button
                      type="button"
                      onClick={() => setSchematicZoom(Math.min(3, schematicZoom + 0.25))}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                      aria-label="Zoom in"
                    >
                      <Plus className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSchematicZoom(1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                      aria-label="Reset zoom"
                    >
                      <RotateCcw className="size-4" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSchematicViewerOpen(false);
                    setSelectedComponent(null);
                    setSchematicZoom(1);
                    setComponentImageIndex(0);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close viewer"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Content */}
            {selectedComponent ? (
              // Component Detail View
              <div className="relative flex min-h-0 flex-1 flex-col">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedComponent(null);
                    setComponentImageIndex(0);
                  }}
                  className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-lg border border-white/15 bg-black/50 px-3 py-2 text-sm font-semibold text-white/80 transition-colors hover:bg-black/70 hover:text-white"
                  aria-label="Back to schematic"
                >
                  <ArrowLeft className="size-4" />
                  Back to Schematic
                </button>

                <div className="flex min-h-0 flex-1 items-center justify-center bg-black/30 p-6">
                  {selectedComponent.image ? (
                    <div className="relative flex flex-col items-center">
                      <img
                        src={
                          componentImageIndex === 0 && selectedComponent.secondaryImages
                            ? selectedComponent.secondaryImages[componentImageIndex]?.image || selectedComponent.image
                            : selectedComponent.secondaryImages && componentImageIndex > 0
                            ? selectedComponent.secondaryImages[componentImageIndex - 1]?.image
                            : selectedComponent.image
                        }
                        alt={selectedComponent.name}
                        className="max-h-[60vh] max-w-full object-contain"
                      />
                      {selectedComponent.secondaryImages && selectedComponent.secondaryImages.length > 0 && (
                        <div className="mt-4 flex gap-2">
                          <button
                            type="button"
                            onClick={() => setComponentImageIndex(0)}
                            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                              componentImageIndex === 0
                                ? "bg-[#b6ff72] text-[#0d1410]"
                                : "bg-white/10 text-white/60 hover:bg-white/15"
                            }`}
                          >
                            Component
                          </button>
                          {selectedComponent.secondaryImages.map((img, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setComponentImageIndex(idx + 1)}
                              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                                componentImageIndex === idx + 1
                                  ? "bg-[#b6ff72] text-[#0d1410]"
                                  : "bg-white/10 text-white/60 hover:bg-white/15"
                              }`}
                            >
                              {img.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Placeholder for components without images
                    <div className="flex flex-col items-center justify-center text-center p-8">
                      <div className="grid size-16 place-items-center rounded-full border-2 border-dashed border-white/20">
                        <Cog className="size-6 text-white/30" />
                      </div>
                      <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-white/40">
                        Component image coming soon
                      </p>
                      <p className="mt-2 text-base font-semibold text-white/60">{selectedComponent.name}</p>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex shrink-0 items-center justify-between border-t border-white/10 px-5 py-4">
                  <button
                    type="button"
                    onClick={() => {
                      const currentIndex = schematicComponents.findIndex(c => c.id === selectedComponent.id);
                      if (currentIndex > 0) {
                        setSelectedComponent(schematicComponents[currentIndex - 1]);
                        setComponentImageIndex(0);
                      }
                    }}
                    disabled={schematicComponents.findIndex(c => c.id === selectedComponent.id) === 0}
                    className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:text-white/60"
                    aria-label="Previous component"
                  >
                    <ArrowLeft className="size-4" />
                    Previous
                  </button>
                  <span className="font-mono text-xs text-white/40">
                    {schematicComponents.findIndex(c => c.id === selectedComponent.id) + 1} / {schematicComponents.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const currentIndex = schematicComponents.findIndex(c => c.id === selectedComponent.id);
                      if (currentIndex < schematicComponents.length - 1) {
                        setSelectedComponent(schematicComponents[currentIndex + 1]);
                        setComponentImageIndex(0);
                      }
                    }}
                    disabled={schematicComponents.findIndex(c => c.id === selectedComponent.id) === schematicComponents.length - 1}
                    className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:text-white/60"
                    aria-label="Next component"
                  >
                    Next
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            ) : (
              // Schematic View with Hotspots
              <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black/30 p-6 overflow-hidden">
                <div
                  className="relative"
                  style={{ transform: `scale(${schematicZoom})`, transformOrigin: "center" }}
                >
                  <img
                    src={schematicImage}
                    alt="Dual Fuel Kit Schematic"
                    className="max-h-[60vh] max-w-full object-contain"
                  />
                  {/* Hotspots */}
                  {schematicComponents.map((component) => (
                    <button
                      key={component.id}
                      type="button"
                      onClick={() => {
                        setSelectedComponent(component);
                        setComponentImageIndex(0);
                      }}
                      onMouseEnter={() => setHoveredComponent(component.id)}
                      onMouseLeave={() => setHoveredComponent(null)}
                      className="absolute rounded-full border-2 transition-all duration-200"
                      style={{
                        left: `${component.hotspot.x}%`,
                        top: `${component.hotspot.y}%`,
                        width: `${component.hotspot.width}%`,
                        height: `${component.hotspot.height}%`,
                        borderColor: hoveredComponent === component.id ? "rgba(182,255,114,0.8)" : "rgba(182,255,114,0.3)",
                        backgroundColor: hoveredComponent === component.id ? "rgba(182,255,114,0.15)" : "transparent",
                        boxShadow: hoveredComponent === component.id ? "0 0 20px rgba(182,255,114,0.4)" : "none",
                      }}
                      aria-label={`View ${component.name}`}
                    >
                      {/* Tooltip */}
                      {hoveredComponent === component.id && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#0d1410] border border-[#b6ff72]/30 px-3 py-1.5 text-sm font-semibold text-white shadow-lg">
                          {component.name}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {appGallery && (
        <div
          className="fixed inset-0 z-[65] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setAppGallery(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${appGallery.title} gallery`}
        >
          <div
            className="relative flex flex-col overflow-hidden rounded-[14px] bg-[oklch(0.14_0.04_158)] shadow-2xl w-full"
            style={{ maxWidth: 520, maxHeight: "90svh", border: "1px solid rgba(255,255,255,0.1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between px-4 py-3 border-b border-white/8">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-signal">Application Gallery</p>
                <h3 className="text-sm font-extrabold text-white leading-tight">{appGallery.title}</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-white/40">{appGallery.index + 1} / {appGallery.images.length}</span>
                <button type="button" onClick={() => setAppGallery(null)} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:bg-white/10 hover:text-white" aria-label="Close gallery">
                  <X className="size-3.5" />
                </button>
              </div>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black/30">
              <img src={appGallery.images[appGallery.index]} alt={`${appGallery.title} ${appGallery.index + 1}`} className="w-full object-contain" style={{ maxHeight: "60svh" }} />
              {appGallery.index > 0 && (
                <button type="button" onClick={() => setAppGallery({ ...appGallery, index: appGallery.index - 1 })} className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-xl text-white transition-colors hover:bg-white/15" aria-label="Previous image">&#8249;</button>
              )}
              {appGallery.index < appGallery.images.length - 1 && (
                <button type="button" onClick={() => setAppGallery({ ...appGallery, index: appGallery.index + 1 })} className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-xl text-white transition-colors hover:bg-white/15" aria-label="Next image">&#8250;</button>
              )}
            </div>
            <div className="flex shrink-0 items-center justify-center gap-2 border-t border-white/8 px-4 py-3">
              {appGallery.images.map((img, i) => (
                <button key={i} type="button" onClick={() => setAppGallery({ ...appGallery, index: i })} className={`h-14 w-14 shrink-0 overflow-hidden rounded-[6px] border-2 transition-all ${i === appGallery.index ? "border-signal opacity-100 scale-105" : "border-transparent opacity-45 hover:opacity-80"}`} aria-label={`View image ${i + 1}`}>
                  <img src={img} alt={`${appGallery.title} thumbnail ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dealership Modal */}
      <Dialog open={dealershipModalOpen} onOpenChange={setDealershipModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Dealership Opportunities</DialogTitle>
            <DialogDescription className="text-base">
              We are currently processing dealership appointments across India.
              Please check back soon for more information.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button
              onClick={() => setDealershipModalOpen(false)}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <SavingsAssistant />
    </div>
  );
}
