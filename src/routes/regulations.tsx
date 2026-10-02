import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Clock3, Fuel, ShieldCheck } from "lucide-react";
import fallbackImage from "@/assets/img-103.jpg";
import logoImage from "@/assets/aircompressor/logo.png";
import andhraPradeshImage from "@/assets/team/image.png";
import keralaImage from "@/assets/team/nature-photographer-29ezCWtMtnM-unsplash.jpg";
import jammuKashmirImage from "@/assets/team/yasser-mir-wXTa0Wnsjnw-unsplash.jpg";
import karnatakaImage from "@/assets/team/mahendra-maddirala-x3y2phkf7fI-unsplash.jpg";
import gujaratImage from "@/assets/regulations/image.png";
import odishaImage from "@/assets/team/ashish-kumar-senapati-zP7VAwXbz24-unsplash.jpg";
import haryanaImage from "@/assets/team/abhinav-saini-N-dafxZnZQU-unsplash.jpg";
import tamilNaduImage from "@/assets/team/siby-QXIBCvvA_jc-unsplash.jpg";
import goaImage from "@/assets/team/avin-cp-5Z8gRPmXLS4-unsplash.jpg";

export const Route = createFileRoute("/regulations")({
  component: RegulationsPage,
  head: () => ({
    meta: [
      { title: "State-Wise Emission Guidelines | OM Solutions" },
      {
        name: "description",
        content:
          "Browse available state pollution-control notifications and DG-set emission guidance from OM Solutions.",
      },
    ],
  }),
});

export const STATE_REGULATIONS = [
  {
    id: "delhi",
    state: "DELHI",
    landmark: "India Gate",
    description: "Mandates dual-fuel mode or approved RECDs for DG sets from 19 kW to 800 kW to run during GRAP restrictions.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
    orderUrl: "/documents/regulations/Delhi - Year-2023_CAQM-Direction-No.-76.pdf",
  },
  {
    id: "maharashtra",
    state: "MAHARASHTRA",
    landmark: "Gateway of India",
    description: "Requires DG sets up to 800 kW (1000 kVA) to achieve ≥70% PM reduction via RECDs or dual-fuel gas conversion.",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
    orderUrl: "/documents/regulations/Maharashtra - Year-2023_DG-Set-Circular-02-06-2023.pdf",
  },
  {
    id: "gujarat",
    state: "GUJARAT",
    landmark: "Statue of Unity",
    description: "Mandates ≥70% PM reduction or shifting to dual-fuel gas operation for DG sets of 125 kVA and above.",
    image: gujaratImage,
    orderUrl: "/documents/regulations/Gujrat - Year-2023-Gujarat-Circular-26-10-2023.pdf",
  },
  {
    id: "tamil-nadu",
    state: "TAMIL NADU",
    landmark: "Meenakshi Temple",
    description: "Mandates DG sets of 61 kW to 800 kW to install certified RECDs or retrofit for dual-fuel gas operation.",
    image: tamilNaduImage,
    orderUrl: "/documents/regulations/Tamil Nadu - Year-2021_Notice_Followup_RECD_DFK-1.pdf",
  },
  {
    id: "odisha",
    state: "ODISHA",
    landmark: "Konark Sun Temple",
    description: "Enforces ≥70% PM capture efficiency or transition to gas-based power for DG sets of 125 kVA and above.",
    image: odishaImage,
    orderUrl: "/documents/regulations/Odisha - 2023-Odisha-Circular-DG-Sets-15730-dtd.-6.10.2023-2.pdf",
  },
  {
    id: "karnataka",
    state: "KARNATAKA",
    landmark: "Mysore Palace",
    description: "Enforces approved RECDs or dual-fuel systems for in-use DG sets from 61 kW to 800 kW older than 5 years.",
    image: karnatakaImage,
    orderUrl: "/documents/regulations/Karnataka - Year-2024-Karnataka-Notification-12-jun-2024.pdf",
  },
  {
    id: "andhra-pradesh",
    state: "ANDHRA PRADESH",
    landmark: "Tirumala Venkateswara Temple",
    description: "Enforces ≥70% PM-reduction devices or shifting to gas-based power for DG sets of 125 kVA and above.",
    image: andhraPradeshImage,
    orderUrl: "/documents/regulations/Andhra Pradesh - andhara.pdf",
  },
  {
    id: "goa",
    state: "GOA",
    landmark: "Basilica of Bom Jesus",
    description: "Requires RECD retrofitting or partial gas conversion for operational DG sets from 125 kVA to 1000 kVA.",
    image: goaImage,
    orderUrl: "/documents/regulations/Goa - Year-2023_Goa-State-Pollution-Control-Board-Dated-28th-March-2023.pdf",
  },
  {
    id: "haryana",
    state: "HARYANA",
    landmark: "Brahma Sarovar & Kurukshetra",
    description: "Mandates ≥70% PM-capturing equipment or dual-fuel gas kits on DG sets of 500 kVA and above.",
    image: haryanaImage,
    orderUrl: "/documents/regulations/Haryana - Year-2020_Haryana_NCR_500_RECD_DFK.pdf",
  },
  {
    id: "jammu-kashmir",
    state: "JAMMU & KASHMIR",
    landmark: "Dal Lake, Srinagar",
    description: "Requires DG sets of 125 kVA and above across J&K to adopt RECDs or convert to gas operation.",
    image: jammuKashmirImage,
    orderUrl: "/documents/regulations/Jammu & Kashmir - Year-2021_JK_NCR_125_RECD_DFK.pdf",
  },
  {
    id: "kerala",
    state: "KERALA",
    landmark: "Alleppey Backwaters & Padmanabhaswamy",
    description: "Directs DG sets of 125 kVA and above to install ≥70% PM RECDs or convert to partial gas usage.",
    image: keralaImage,
    orderUrl: "/documents/regulations/Kerala - Kerala-SPCB-Order-Dated-15-05-2023.pdf",
  },
] as const;

const navLinks = [
  ["Home", "/#home"],
  ["Technology", "/#technology"],
  ["Impact", "/impact"],
  ["Installations", "/#gallery"],
  ["About", "/#team"],
  ["Regulations", "/regulations"],
  ["Join This Mission", "/#contact"],
] as const;

function RegulationsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const images = document.querySelectorAll<HTMLImageElement>("[data-regulation-image]");
    const showFallback = (image: HTMLImageElement) => {
      if (image.dataset["fallbackApplied"]) return;
      image.dataset["fallbackApplied"] = "true";
      image.src = fallbackImage;
    };
    const handleError = (event: Event) => showFallback(event.currentTarget as HTMLImageElement);

    images.forEach((image) => {
      image.addEventListener("error", handleError);
      if (image.complete && image.naturalWidth === 0) showFallback(image);
    });

    return () => images.forEach((image) => image.removeEventListener("error", handleError));
  }, []);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 24);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <main className="min-h-screen bg-[#eef6fb] text-slate-900">
      <header
        style={{
          height: menuOpen ? "auto" : scrolled ? "72px" : "85px",
          maxHeight: menuOpen ? "100dvh" : undefined,
          overflowY: menuOpen ? "auto" : undefined,
          backgroundColor: menuOpen || scrolled ? "rgba(232, 244, 251, 0.96)" : "transparent",
          boxShadow: menuOpen || scrolled ? "0 1px 2px rgba(0, 0, 0, 0.08)" : "none",
          backdropFilter: menuOpen || scrolled ? "blur(8px)" : "none",
          transition: menuOpen
            ? "background .35s ease, backdrop-filter .35s ease"
            : "height .35s ease, background .35s ease, backdrop-filter .35s ease",
        }}
        className="fixed inset-x-0 top-0 z-50 flex flex-col"
      >
        <div className="mx-auto flex w-full flex-1 max-w-[1440px] items-center justify-between px-[4.5vw]">
          <a
            href="/#home"
            aria-label="OM Solutions home"
            style={{ color: scrolled || menuOpen ? "#0f172a" : "#fff" }}
            className="order-1 flex shrink-0 items-center gap-2.5 no-underline"
          >
            <img src={logoImage} alt="OM Solutions" className="h-12 w-12 object-contain" />
            <span className="text-[16px] font-extrabold uppercase leading-none tracking-tight">
              OM Solutions
            </span>
          </a>
          <nav aria-label="Main navigation" className="order-2 ml-8 hidden flex-1 items-center justify-end gap-8 xl:flex">
            {navLinks.map(([label, href]) => (
              label === "Join This Mission" ? (
                <a
                  key={label}
                  href={href}
                  className="group hidden items-center gap-2 whitespace-nowrap rounded-full bg-emerald-700 px-5 py-2.5 text-[15px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-800 sm:inline-flex"
                >
                  {label}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              ) : (
                <a
                  key={label}
                  href={href}
                  aria-current={label === "Regulations" ? "page" : undefined}
                  style={{
                    color: scrolled
                      ? label === "Regulations"
                        ? "#047857"
                        : "#334155"
                      : label === "Regulations"
                        ? "#b6ff72"
                        : "#fff",
                  }}
                  className="whitespace-nowrap text-[15px] font-bold transition-colors duration-200 hover:text-emerald-700"
                >
                  {label}
                </a>
              )
            ))}
            <a
              href="/#contact"
              className="group hidden items-center gap-2 whitespace-nowrap rounded-full bg-emerald-700 px-5 py-2.5 text-[15px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-800 sm:inline-flex"
            >
              Dealership
              <span className="text-[13px] font-normal leading-none transition-transform duration-200 group-hover:translate-x-0.5">↗</span>
            </a>
          </nav>
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            style={{ color: scrolled || menuOpen ? "#1e293b" : "#fff" }}
            className="order-2 flex h-9 w-9 flex-col items-center justify-center gap-[6px] border-0 bg-transparent p-2 transition-colors xl:hidden"
          >
            <span className={`block h-px w-[23px] bg-current transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-px w-[23px] bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-[23px] bg-current transition-transform ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile navigation" className="border-t border-white/15 bg-[#0d1713] px-4 pb-7 pt-5 sm:px-6 xl:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.filter(([label]) => label !== "Join This Mission").map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={label === "Regulations" ? "page" : undefined}
                  className={`border-b border-white/10 py-3 text-[13px] font-extrabold uppercase tracking-[0.11em] transition-colors hover:text-[#b6ff72] ${label === "Regulations" ? "text-[#b6ff72]" : "text-white/80"}`}
                >
                  {label}
                </a>
              ))}
              <a
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#b6ff72] px-5 py-2.5 text-[13px] font-extrabold uppercase tracking-[0.11em] text-[#0d1f16] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a3e065] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6ff72]"
              >
                Join This Mission <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="group mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#b6ff72] px-5 py-2.5 text-[13px] font-extrabold uppercase tracking-[0.11em] text-[#0d1f16] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a3e065] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6ff72]"
              >
                Dealership <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </nav>
        )}
      </header>

      <section className="relative isolate overflow-hidden bg-[#0b2a1e] px-4 pb-[62px] pt-[106px] text-center text-white sm:pb-20 sm:pt-36 xl:pb-24 xl:pt-44">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 size-full opacity-25"
          viewBox="0 0 1440 560"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path d="M-80 130C180 30 280 260 530 160S890 30 1110 130s300 40 430-30" stroke="white" strokeOpacity=".3" />
          <path d="M-100 190C140 80 310 330 560 220s340-150 570-60 320 70 440 0" stroke="white" strokeOpacity=".24" />
          <path d="M-100 270C150 150 340 390 600 280s350-150 570-70 290 80 410 20" stroke="white" strokeOpacity=".2" />
          <path d="M-90 360C180 220 370 470 650 350s360-130 570-50 270 70 370 30" stroke="white" strokeOpacity=".18" />
          <path d="M-100 455C190 300 420 560 690 430s370-130 580-40 260 70 360 40" stroke="white" strokeOpacity=".16" />
        </svg>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(182,255,114,.12),transparent_68%)]" />
        <div className="mx-auto max-w-[900px] animate-[regulations-hero-in_.7s_ease-out_both]">
          <h1 className="text-[25px] font-extrabold leading-[1.08] sm:text-4xl lg:text-5xl">
            State-Wise Emission Guidelines
            <br />&amp; Landmark Regulations
          </h1>
        </div>
      </section>

      <section aria-label="State emission regulations" className="relative z-10 -mt-11 bg-[#eef6fb] px-3 pb-10 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto grid max-w-[468px] grid-cols-3 gap-2 max-[430px]:grid-cols-2 sm:gap-5 md:max-w-7xl">
          {STATE_REGULATIONS.map((region) => (
            <article
              key={region.id}
              className="group flex min-w-0 flex-col overflow-hidden rounded-[10px] border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none sm:rounded-2xl"
            >
              <div className="relative mx-[6px] mt-[6px] h-[88px] overflow-hidden rounded-[7px] bg-slate-200 sm:h-[160px] xl:h-[200px]">
                <img
                  src={region.image}
                  alt={`${region.landmark}, ${region.state}`}
                  loading="lazy"
                  data-regulation-image
                  onError={(event) => {
                    if (event.currentTarget.dataset["fallbackApplied"]) return;
                    event.currentTarget.dataset["fallbackApplied"] = "true";
                    event.currentTarget.src = fallbackImage;
                  }}
                  className="size-full rounded-[7px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex min-h-[112px] flex-1 flex-col p-2 sm:min-h-[242px] sm:p-5 lg:p-6">
                <h2 className="break-words text-[13px] font-extrabold uppercase leading-tight text-slate-900 sm:text-lg sm:tracking-[.04em]">
                  {region.state}
                </h2>
                <p className="mt-0.5 text-[10px] font-semibold leading-tight text-slate-800 sm:mt-1 sm:text-sm sm:font-medium sm:text-emerald-800">
                  {region.landmark}
                </p>
                <p className="mt-1.5 flex-1 text-[9px] leading-[1.2] text-slate-700 sm:mt-4 sm:text-sm sm:leading-6 sm:text-slate-600">
                  {region.description}
                </p>
                <a
                  href={region.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Explore ${region.state} guidelines (PDF)`}
                  className="mt-2 inline-flex min-h-6 w-full items-center justify-center rounded-full bg-[#09b978] px-1.5 py-1 text-[9px] font-bold text-[#063b2a] transition-colors hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:mt-5 sm:min-h-12 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm sm:text-white"
                >
                  Explore Guidelines
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="compliance-benefits-title" className="bg-[#eef6fb] px-3 pb-12 pt-2 sm:px-6 sm:pb-16">
        <div className="mx-auto max-w-[468px] md:max-w-6xl">
          <h2 id="compliance-benefits-title" className="mb-4 text-center text-sm font-bold text-slate-900 sm:mb-6 sm:text-xl md:mb-8 md:text-2xl">
            How We Help You Achieve Compliance
          </h2>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            <article className="flex min-h-[118px] min-w-0 flex-col items-center rounded-xl border border-slate-200 bg-white px-2 py-2 text-center shadow-sm sm:min-h-[190px] sm:px-4 sm:py-5 md:min-h-[240px] md:rounded-2xl md:px-7 md:py-7">
              <span className="grid size-7 place-items-center rounded-lg bg-emerald-50 text-emerald-700 sm:size-10 md:size-12">
                <ShieldCheck aria-hidden="true" className="size-4 sm:size-5 md:size-6" />
              </span>
              <h3 className="mt-2 text-[8px] font-extrabold leading-tight text-slate-900 sm:mt-3 sm:text-sm md:mt-4 md:text-lg">
                CPCB-IV+ Dual-Fuel Retrofit
              </h3>
              <p className="mt-1.5 text-[7px] leading-[1.25] text-slate-600 sm:mt-2 sm:text-xs sm:leading-5 md:mt-3 md:text-base md:leading-7">
                Seamlessly convert your engines to meet CPCB-IV+ standards with our advanced dual-fuel kit.
              </p>
            </article>
            <article className="flex min-h-[118px] min-w-0 flex-col items-center rounded-xl border border-slate-200 bg-white px-2 py-2 text-center shadow-sm sm:min-h-[190px] sm:px-4 sm:py-5 md:min-h-[240px] md:rounded-2xl md:px-7 md:py-7">
              <span className="grid size-7 place-items-center rounded-lg bg-emerald-50 text-emerald-700 sm:size-10 md:size-12">
                <Fuel aria-hidden="true" className="size-4 sm:size-5 md:size-6" />
              </span>
              <h3 className="mt-2 text-[8px] font-extrabold leading-tight text-slate-900 sm:mt-3 sm:text-sm md:mt-4 md:text-lg">
                70% Diesel Replacement
              </h3>
              <p className="mt-1.5 text-[7px] leading-[1.25] text-slate-600 sm:mt-2 sm:text-xs sm:leading-5 md:mt-3 md:text-base md:leading-7">
                Achieve substantial reduction in diesel usage and cost.
              </p>
            </article>
            <article className="flex min-h-[118px] min-w-0 flex-col items-center rounded-xl border border-slate-200 bg-white px-2 py-2 text-center shadow-sm sm:min-h-[190px] sm:px-4 sm:py-5 md:min-h-[240px] md:rounded-2xl md:px-7 md:py-7">
              <span className="grid size-7 place-items-center rounded-lg bg-emerald-50 text-emerald-700 sm:size-10 md:size-12">
                <Clock3 aria-hidden="true" className="size-4 sm:size-5 md:size-6" />
              </span>
              <h3 className="mt-2 text-[8px] font-extrabold leading-tight text-slate-900 sm:mt-3 sm:text-sm md:mt-4 md:text-lg">
                Zero Engine Downtime
              </h3>
              <p className="mt-1.5 text-[7px] leading-[1.25] text-slate-600 sm:mt-2 sm:text-xs sm:leading-5 md:mt-3 md:text-base md:leading-7">
                Retrofit process with no operational interruption, maintaining your schedule.
              </p>
            </article>
          </div>
        </div>
      </section>

      <footer className="bg-[#07170f] px-[6vw] py-5 text-center font-mono text-[10px] uppercase tracking-[.12em] text-white/40">
        © OM Solutions · Cleaner power for a changing India
      </footer>
      <style>{`@keyframes regulations-hero-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}} @media(prefers-reduced-motion:reduce){.animate-\[regulations-hero-in_\.7s_ease-out_both\]{animation:none}}`}</style>
    </main>
  );
}