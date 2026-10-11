import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, FileText } from "lucide-react";
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
    description: "Mandates dual-fuel mode or approved RECDs for DG sets from 19 kW to 800 kW to run during GRAP restrictions.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
    orderUrl: "/documents/regulations/Delhi - Year-2023_CAQM-Direction-No.-76.pdf",
  },
  {
    id: "maharashtra",
    state: "MAHARASHTRA",
    description: "Requires DG sets up to 800 kW (1000 kVA) to achieve ≥70% PM reduction via RECDs or dual-fuel gas conversion.",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
    orderUrl: "/documents/regulations/Maharashtra - Year-2023_DG-Set-Circular-02-06-2023.pdf",
  },
  {
    id: "gujarat",
    state: "GUJARAT",
    description: "Mandates ≥70% PM reduction or shifting to dual-fuel gas operation for DG sets of 125 kVA and above.",
    image: gujaratImage,
    orderUrl: "/documents/regulations/Gujrat - Year-2023-Gujarat-Circular-26-10-2023.pdf",
  },
  {
    id: "tamil-nadu",
    state: "TAMIL NADU",
    description: "Mandates DG sets of 61 kW to 800 kW to install certified RECDs or retrofit for dual-fuel gas operation.",
    image: tamilNaduImage,
    orderUrl: "/documents/regulations/Tamil Nadu - Year-2021_Notice_Followup_RECD_DFK-1.pdf",
  },
  {
    id: "odisha",
    state: "ODISHA",
    description: "Enforces ≥70% PM capture efficiency or transition to gas-based power for DG sets of 125 kVA and above.",
    image: odishaImage,
    orderUrl: "/documents/regulations/Odisha - 2023-Odisha-Circular-DG-Sets-15730-dtd.-6.10.2023-2.pdf",
  },
  {
    id: "karnataka",
    state: "KARNATAKA",
    description: "Enforces approved RECDs or dual-fuel systems for in-use DG sets from 61 kW to 800 kW older than 5 years.",
    image: karnatakaImage,
    orderUrl: "/documents/regulations/Karnataka - Year-2024-Karnataka-Notification-12-jun-2024.pdf",
  },
  {
    id: "andhra-pradesh",
    state: "ANDHRA PRADESH",
    description: "Enforces ≥70% PM-reduction devices or shifting to gas-based power for DG sets of 125 kVA and above.",
    image: andhraPradeshImage,
    orderUrl: "/documents/regulations/Andhra Pradesh - andhara.pdf",
  },
  {
    id: "goa",
    state: "GOA",
    description: "Requires RECD retrofitting or partial gas conversion for operational DG sets from 125 kVA to 1000 kVA.",
    image: goaImage,
    orderUrl: "/documents/regulations/Goa - Year-2023_Goa-State-Pollution-Control-Board-Dated-28th-March-2023.pdf",
  },
  {
    id: "haryana",
    state: "HARYANA",
    description: "Mandates ≥70% PM-capturing equipment or dual-fuel gas kits on DG sets of 500 kVA and above.",
    image: haryanaImage,
    orderUrl: "/documents/regulations/Haryana - Year-2020_Haryana_NCR_500_RECD_DFK.pdf",
  },
  {
    id: "jammu-kashmir",
    state: "JAMMU & KASHMIR",
    description: "Requires DG sets of 125 kVA and above across J&K to adopt RECDs or convert to gas operation.",
    image: jammuKashmirImage,
    orderUrl: "/documents/regulations/Jammu & Kashmir - Year-2021_JK_NCR_125_RECD_DFK.pdf",
  },
  {
    id: "kerala",
    state: "KERALA",
    description: "Directs DG sets of 125 kVA and above to install ≥70% PM RECDs or convert to partial gas usage.",
    image: keralaImage,
    orderUrl: "/documents/regulations/Kerala - Kerala-SPCB-Order-Dated-15-05-2023.pdf",
  },
] as const;

const navLinks = [
  ["Home", "/#home"],
  ["Technology", "/technology"],
  ["Impact", "/impact"],
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
          <span className="inline-flex items-center rounded-full border border-[#b6ff72]/40 bg-[#b6ff72]/10 px-4 py-1.5 text-sm font-bold text-[#b6ff72]">
            {STATE_REGULATIONS.length} states &amp; union territories
          </span>
          <h1 className="mt-5 text-[28px] font-extrabold leading-[1.12] sm:text-4xl lg:text-5xl">
            State wise Particulate Matter Emission reduction guidelines for older Diesel Generator sets
          </h1>
        </div>
      </section>

      <section aria-label="State emission regulations" className="relative z-10 -mt-11 bg-[#eef6fb] px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 min-[520px]:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {STATE_REGULATIONS.map((region) => (
            <article
              key={region.id}
              className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg motion-reduce:transition-none"
            >
              <div className="relative h-[170px] overflow-hidden bg-slate-200 sm:h-[190px] xl:h-[210px]">
                <img
                  src={region.image}
                  alt={region.state}
                  loading="lazy"
                  data-regulation-image
                  onError={(event) => {
                    if (event.currentTarget.dataset["fallbackApplied"]) return;
                    event.currentTarget.dataset["fallbackApplied"] = "true";
                    event.currentTarget.src = fallbackImage;
                  }}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2a1e]/85 via-[#0b2a1e]/10 to-transparent" />
                <h2 className="absolute bottom-4 left-5 right-5 break-words text-xl font-extrabold uppercase leading-tight tracking-[.04em] text-white drop-shadow sm:text-[22px]">
                  {region.state}
                </h2>
              </div>
              <div className="flex flex-1 flex-col p-5 lg:p-6">
                <p className="flex-1 text-base font-medium leading-relaxed text-slate-800">
                  {region.description}
                </p>
                <a
                  href={region.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Explore ${region.state} guidelines (PDF)`}
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-[15px] font-bold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                  <FileText className="size-5" />
                  Explore Guidelines
                  <span className="rounded bg-white/20 px-1.5 py-0.5 text-[11px] font-bold">PDF</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-3xl px-2 sm:mt-10">
          <div className="rounded-[28px] border border-emerald-200 bg-gradient-to-r from-[#0b2a1e] via-[#123d2d] to-[#0f3e32] p-[1px] shadow-[0_20px_50px_rgba(11,42,30,0.18)]">
            <div className="flex flex-col items-center justify-between gap-4 rounded-[27px] bg-[#0b2a1e]/95 px-5 py-6 text-center sm:flex-row sm:px-7 sm:py-6 sm:text-left">
              <div className="max-w-xl">
                <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-300">
                  Discover the solution
                </p>
                <h3 className="text-xl font-black text-white sm:text-2xl">
                  See how our dual-fuel technology reduces fuel costs and emissions.
                </h3>
              </div>

              <a
                href="/technology"
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#b6ff72] px-6 py-3.5 text-sm font-extrabold uppercase tracking-[0.1em] text-[#0d1f16] shadow-[0_12px_24px_rgba(182,255,114,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#c8ff8f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6ff72]"
              >
                Explore Technology
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#07170f] px-[6vw] py-6 text-center font-mono text-xs uppercase tracking-[.12em] text-white/70">
        © OM Solutions · Cleaner power for a changing India
      </footer>
      <style>{`@keyframes regulations-hero-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}} @media(prefers-reduced-motion:reduce){.animate-\[regulations-hero-in_\.7s_ease-out_both\]{animation:none}}`}</style>
    </main>
  );
}
