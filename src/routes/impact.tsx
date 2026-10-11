import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, Building2, Clock3, Fuel, IndianRupee, Leaf, MapPin, Pause, Power } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import indiaMapImage from "@/assets/Marine Propulsion/image.png";

export const Route = createFileRoute("/impact")({ component: ImpactPage });

// All figures are demonstration data. Replace this object with validated telemetry when available.
const demo = {
  metrics: [
    { label: "DIESEL DISPLACED", value: "58K", unit: "L", icon: Fuel, color: "var(--color-signal)" },
    { label: "FUEL COST SAVED", value: "₹50", unit: "Lakh", icon: IndianRupee, color: "#82e6bd" },
    { label: "CO₂ REDUCED", value: "31.6", unit: "t", icon: Leaf, color: "#70d6ac" },
    { label: "SOOT / PM REDUCED", value: "1.9", unit: "t", icon: Activity, color: "#52bf97" },
    { label: "DUAL-FUEL OPERATING HOURS", value: "1.26M", unit: "hrs", icon: Clock3, color: "#63dfbe" },
  ],
  emissions: [{ name: "CO₂ REDUCED", value: 31.6 }, { name: "PM / SOOT REDUCED", value: 1.9 }],
  fuel: [{ name: "Gaseous Fuel", value: 70 }, { name: "Diesel", value: 30 }],
  timeline: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, i) => ({ month, value: [1, 3, 5, 7, 10, 13, 17, 21, 25, 28, 30, 31.6][i] })),
};

const siteStatus = [
  { icon: Building2, value: "20", label: "INSTALLATIONS" },
  { icon: Power, value: "12", label: "RUNNING NOW" },
  { icon: Pause, value: "8", label: "STANDBY / OFFLINE" },
];

const networkStats = [
  { icon: Building2, value: "20", label: "sites (total)" },
  { icon: Power, value: "12", label: "running now" },
  { icon: Pause, value: "8", label: "standby / offline" },
  { icon: Clock3, value: "1.26M", label: "operating hours" },
];

const savings = [
  { icon: Fuel, label: "DIESEL AVOIDED (CUMULATIVE)", value: "58K Litres" },
  { icon: Leaf, label: "CO₂ REDUCED (CUMULATIVE)", value: "31.6 Tonnes" },
  { icon: IndianRupee, label: "MONEY SAVED (CUMULATIVE)", value: "50 Lakh ₹" },
];

const periods = ["All Sites", "Today", "This Month", "This Year", "All Time"];

const panel = "rounded-2xl border border-white/10 bg-panel-soft shadow-[0_10px_30px_rgba(0,0,0,.2)]";
const axisTick = { fill: "#d5e0d8", fontSize: 12 };
const tooltipStyle = { background: "var(--color-panel)", border: "1px solid #ffffff22", borderRadius: 8, color: "#fff" };

function ImpactPage() {
  const [period, setPeriod] = useState("All Sites");
  const maxEmission = Math.max(...demo.emissions.map((entry) => entry.value));

  return (
    <main className="min-h-screen overflow-x-clip bg-panel text-white">
      <SiteHeader active="Impact" />

      <div className="mx-auto max-w-[1600px] space-y-5 px-4 pb-10 pt-[110px] sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="grid min-w-0 animate-in fade-in slide-in-from-bottom-2 items-end gap-5 duration-500 motion-reduce:animate-none lg:grid-cols-[1fr_auto]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-signal/35 bg-signal/10 px-3.5 py-1.5 text-xs font-bold tracking-wide text-signal">
                <Activity className="size-4" />
                ALL INSTALLATIONS · CUMULATIVE
              </span>
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-signal">
                <i className="size-2.5 rounded-full bg-signal shadow-[0_0_12px_var(--color-signal)]" />
                LIVE NETWORK
                <span className="font-medium tracking-normal text-white/75">· Updated just now</span>
              </span>
            </div>
            <h1 className="mt-4 text-[clamp(30px,6vw,52px)] font-extrabold leading-tight tracking-tight">
              Our Impact. <span className="bg-gradient-to-r from-white to-signal bg-clip-text text-transparent">Across Every Engine.</span>
            </h1>
            <p className="mt-2 max-w-2xl text-base font-medium leading-relaxed text-white/80">Accumulated impact from OM Solutions dual-fuel systems across all installations.</p>
          </div>
          <div className="grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-panel-soft py-4">
            {siteStatus.map(({ icon: Icon, value, label }) => (
              <div key={label} className="min-w-[96px] px-3 text-center sm:px-6">
                <Icon className="mx-auto mb-1.5 size-5 text-signal" />
                <strong className="block text-2xl font-extrabold sm:text-3xl">{value}</strong>
                <span className="mt-1 block text-[11px] font-bold leading-tight tracking-wide text-white/75">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Headline metrics */}
        <section aria-label="Cumulative impact metrics" className="grid animate-in fade-in slide-in-from-bottom-2 grid-cols-1 gap-3 duration-700 motion-reduce:animate-none min-[420px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {demo.metrics.map(({ label, value, unit, icon: Icon, color }) => (
            <article key={label} className={`${panel} flex min-w-0 flex-col gap-4 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/45`}>
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/[.06]">
                  <Icon className="size-6" style={{ color }} />
                </span>
                <div className="min-w-0">
                  <h2 className="text-xs font-bold leading-snug tracking-wide text-white">{label}</h2>
                  <span className="block text-[11px] font-medium tracking-wide text-white/65">ACCUMULATED TOTAL</span>
                </div>
              </div>
              <p className="whitespace-nowrap text-3xl font-extrabold leading-none sm:text-[34px]">
                {value} <span className="text-base font-bold text-white/80">{unit}</span>
              </p>
            </article>
          ))}
        </section>

        {/* Charts */}
        <section className="grid min-w-0 animate-in fade-in slide-in-from-bottom-2 gap-5 duration-1000 motion-reduce:animate-none md:grid-cols-2 xl:grid-cols-[1.2fr_.85fr_1.05fr]">
          <article className={`${panel} p-5`}>
            <Heading icon={Leaf} title="EMISSIONS IMPACT" subtitle="Verified emissions reductions across all installations" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {demo.emissions.map((item) => (
                <div key={item.name} className="rounded-xl border border-white/10 bg-white/[.03] p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-xs font-bold tracking-wide text-white/85">{item.name}</span>
                    <strong className="text-xl text-white">{item.value} t</strong>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-signal transition-all duration-700" style={{ width: `${(item.value / maxEmission) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 h-[210px] w-full" role="img" aria-label="Bar graph comparing CO₂ reduced and PM or soot reduced in tonnes">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demo.emissions} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                  <CartesianGrid stroke="#ffffff14" vertical={false} />
                  <XAxis dataKey="name" tick={axisTick} axisLine={{ stroke: "#4a5a4e" }} tickLine={false} />
                  <YAxis domain={[0, "auto"]} tick={axisTick} tickFormatter={(value: number) => `${value} t`} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: "#fff" }} formatter={(value: number) => [`${value} t reduced`, "Verified reduction"]} />
                  <Bar dataKey="value" name="Reduction" fill="var(--color-signal)" radius={[6, 6, 0, 0]} maxBarSize={60} animationDuration={900} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className={`${panel} p-5`}>
            <Heading icon={Fuel} title="FUEL TRANSITION" subtitle="Average fuel split across all installations" />
            <div className="relative mx-auto mt-2 h-[210px] max-w-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={demo.fuel} dataKey="value" innerRadius="64%" outerRadius="90%" paddingAngle={2} stroke="none" animationDuration={1000}>
                    {demo.fuel.map((entry, i) => <Cell key={entry.name} fill={i === 0 ? "var(--color-signal)" : "#30483b"} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-semibold text-white/80">Up to</span>
                <b className="text-4xl text-signal">70%</b>
                <span className="text-xs font-semibold text-white/80">gaseous fuel usage</span>
              </div>
            </div>
            <div className="mt-3 space-y-2.5 text-sm">
              <p className="flex items-center justify-between gap-3 rounded-lg bg-white/[.03] px-3 py-2">
                <span className="flex items-center gap-2.5 font-semibold"><i className="size-3 shrink-0 rounded-full bg-signal" />Gaseous Fuel (CNG / LPG / PNG)</span>
                <b className="text-lg">70%</b>
              </p>
              <p className="flex items-center justify-between gap-3 rounded-lg bg-white/[.03] px-3 py-2">
                <span className="flex items-center gap-2.5 font-semibold text-white/85"><i className="size-3 shrink-0 rounded-full bg-[#53645a]" />Diesel</span>
                <b className="text-lg">30%</b>
              </p>
              <p className="pt-1 text-xs font-medium leading-relaxed text-white/70">Dual-fuel operation with up to 70% gaseous fuel use, depending on application and engine type.</p>
            </div>
          </article>

          <article className={`${panel} min-w-0 p-5 md:col-span-2 xl:col-span-1`}>
            <Heading icon={MapPin} title="NETWORK AT A GLANCE" subtitle="Installation network across India" />
            <div className="mt-4 grid grid-cols-[minmax(0,1fr)_minmax(0,.9fr)] items-stretch gap-3">
              <div className="flex min-h-[230px] min-w-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2">
                <img src={indiaMapImage} alt="Map outline of India" className="block h-full max-h-[260px] w-full object-contain" />
              </div>
              <div className="flex flex-col justify-center gap-4 rounded-xl border border-white/10 bg-white/[.03] p-4">
                {networkStats.map(({ icon: Icon, value, label }) => (
                  <p key={label} className="flex items-center gap-3">
                    <Icon className="size-5 shrink-0 text-signal" />
                    <span className="min-w-0">
                      <b className="block text-xl leading-6">{value}</b>
                      <small className="text-xs font-medium text-white/75">{label}</small>
                    </span>
                  </p>
                ))}
              </div>
            </div>
          </article>
        </section>

        {/* Timeline */}
        <section className={`${panel} animate-in fade-in slide-in-from-bottom-2 p-5 duration-1000 motion-reduce:animate-none`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Heading icon={Activity} title="IMPACT OVER TIME (CUMULATIVE)" subtitle="Total impact from all installations" />
            <div className="flex flex-wrap items-center gap-1.5">
              {periods.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPeriod(option)}
                  aria-pressed={period === option}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${period === option ? "bg-signal text-panel" : "bg-white/[.06] text-white/85 hover:bg-white/12"}`}
                >
                  {option}
                </button>
              ))}
            </div>
            <span className="flex items-center gap-2 text-xs font-semibold text-white/75">
              Select Metric <span className="rounded-lg border border-white/20 px-3 py-2 text-white">CO₂ Saved (t)</span>
            </span>
          </div>
          <div className="mt-4 h-[230px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demo.timeline} margin={{ top: 8, right: 24, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="impactFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-signal)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--color-signal)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#ffffff14" vertical={false} />
                <XAxis dataKey="month" tick={axisTick} axisLine={{ stroke: "#4a5a4e" }} tickLine={false} />
                <YAxis domain={[0, 40]} ticks={[0, 10, 20, 30, 40]} tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v.toLocaleString()} t`, `CO₂ saved · ${period}`]} />
                <Area type="monotone" dataKey="value" stroke="var(--color-signal)" strokeWidth={3} fill="url(#impactFill)" animationDuration={1100} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Savings summary */}
        <section className={`${panel} grid animate-in fade-in slide-in-from-bottom-2 gap-3 p-5 duration-1000 motion-reduce:animate-none lg:grid-cols-[.9fr_1fr_1fr_1fr] lg:items-center`}>
          <Heading icon={Leaf} title="WHAT YOUR ENGINE HAS SAVED" subtitle="Real impact. Reduced CO₂ and PM. Lower fuel cost." />
          {savings.map(({ icon: Icon, label, value }) => (
            <article key={label} className="flex items-center gap-4 rounded-xl border border-signal/20 bg-signal/[.08] px-5 py-4 transition-transform duration-300 hover:-translate-y-0.5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-signal/15">
                <Icon className="size-6 text-signal" />
              </span>
              <div>
                <p className="text-xs font-bold tracking-wide text-white/80">{label}</p>
                <b className="mt-0.5 block text-2xl">{value}</b>
              </div>
            </article>
          ))}
        </section>

        <footer className="flex flex-wrap justify-between gap-3 border-t border-white/10 px-1 pt-4 text-xs font-medium leading-relaxed text-white/65">
          <p className="max-w-4xl">Note: Live values will be based on connected telemetry. Historical values may be estimated from validated operating and fuel data. Figures shown are cumulative totals across all installations.</p>
          <span className="shrink-0">Illustrative dashboard values</span>
        </footer>
      </div>
    </main>
  );
}

function Heading({ icon: Icon, title, subtitle }: { icon: typeof Leaf; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-signal/15">
        <Icon className="size-5 text-signal" />
      </span>
      <div>
        <h2 className="text-sm font-extrabold tracking-wide">{title}</h2>
        <p className="mt-0.5 text-xs font-medium leading-relaxed text-white/70">{subtitle}</p>
      </div>
    </div>
  );
}
