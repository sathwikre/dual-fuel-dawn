import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
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
    description: "Current CPCB emission guidelines summary for NCR (e.g., genset restrictions, stack height requirements, etc.).",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
    orderUrl: "/documents/regulations/Delhi - Year-2023_CAQM-Direction-No.-76.pdf",
  },
  {
    id: "maharashtra",
    state: "MAHARASHTRA",
    landmark: "Gateway of India",
    description: "Summary of pollution control norms and directions in Maharashtra.",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
    orderUrl: "/documents/regulations/Maharashtra - Year-2023_DG-Set-Circular-02-06-2023.pdf",
  },
  {
    id: "gujarat",
    state: "GUJARAT",
    landmark: "Statue of Unity",
    description: "Emission guideline details for the state of Gujarat, particularly industrial and city areas.",
    image: gujaratImage,
    orderUrl: "/documents/regulations/Gujrat - Year-2023-Gujarat-Circular-26-10-2023.pdf",
  },
  {
    id: "tamil-nadu",
    state: "TAMIL NADU",
    landmark: "Meenakshi Temple",
    description: "Key provisions of the emission guidelines and retrofit requirements for Tamil Nadu.",
    image: tamilNaduImage,
    orderUrl: "/documents/regulations/Tamil Nadu - Year-2021_Notice_Followup_RECD_DFK-1.pdf",
  },
  {
    id: "odisha",
    state: "ODISHA",
    landmark: "Konark Sun Temple",
    description: "Summary of rules and orders for OSPCB regarding industrial and captive power emissions.",
    image: odishaImage,
    orderUrl: "/documents/regulations/Odisha - 2023-Odisha-Circular-DG-Sets-15730-dtd.-6.10.2023-2.pdf",
  },
  {
    id: "karnataka",
    state: "KARNATAKA",
    landmark: "Mysore Palace",
    description: "Overview of emissions-related guidelines and notifications issued by KSPCB.",
    image: karnatakaImage,
    orderUrl: "/documents/regulations/Karnataka - Year-2024-Karnataka-Notification-12-jun-2024.pdf",
  },
  {
    id: "andhra-pradesh",
    state: "ANDHRA PRADESH",
    landmark: "Tirumala Venkateswara Temple",
    description: "APPCB regulations for industrial diesel generator sets and dual-fuel conversion norms.",
    image: andhraPradeshImage,
    orderUrl: "/documents/regulations/Andhra Pradesh - andhara.pdf",
  },
  {
    id: "goa",
    state: "GOA",
    landmark: "Basilica of Bom Jesus",
    description: "GSPCB environmental protection mandates on DG emission control in coastal & commercial zones.",
    image: goaImage,
    orderUrl: "/documents/regulations/Goa - Year-2023_Goa-State-Pollution-Control-Board-Dated-28th-March-2023.pdf",
  },
  {
    id: "haryana",
    state: "HARYANA",
    landmark: "Brahma Sarovar & Kurukshetra",
    description: "CAQM and HSPCB notifications regarding seasonal DG bans and dual-fuel conversion timelines.",
    image: haryanaImage,
    orderUrl: "/documents/regulations/Haryana - Year-2020_Haryana_NCR_500_RECD_DFK.pdf",
  },
  {
    id: "jammu-kashmir",
    state: "JAMMU & KASHMIR",
    landmark: "Dal Lake, Srinagar",
    description: "JKPCC pollution guidelines and clean fuel mandates for ecotourism and commercial clusters.",
    image: jammuKashmirImage,
    orderUrl: "/documents/regulations/Jammu & Kashmir - Year-2021_JK_NCR_125_RECD_DFK.pdf",
  },
  {
    id: "kerala",
    state: "KERALA",
    landmark: "Alleppey Backwaters & Padmanabhaswamy",
    description: "KSPCB standards for acoustic enclosures, stack height, and dual-fuel operation.",
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
  useEffect(() => {
    const images = document.querySelectorAll<HTMLImageElement>("[data-regulation-image]");
    const showFallback = (image: HTMLImageElement) => {
      if (image.dataset.fallbackApplied) return;
      image.dataset.fallbackApplied = "true";
      image.src = fallbackImage;
    };
    const handleError = (event: Event) => showFallback(event.currentTarget as HTMLImageElement);

    images.forEach((image) => {
      image.addEventListener("error", handleError);
      if (image.complete && image.naturalWidth === 0) showFallback(image);
    });

    return () => images.forEach((image) => image.removeEventListener("error", handleError));
  }, []);

  return (
    <main className="min-h-screen bg-[#eef6fb] text-slate-900">
      <header className="fixed inset-x-0 top-0 z-50 h-10 bg-[#e8f4fb]/95 shadow-sm backdrop-blur-md md:h-[72px] xl:h-[85px]">
        <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-3 sm:px-6 xl:px-[4.5vw]">
          <a
            href="/#home"
            aria-label="OM Solutions home"
            className="flex shrink-0 items-center gap-1.5 text-slate-900 no-underline xl:gap-2.5"
          >
            <img src={logoImage} alt="OM Solutions" className="size-7 object-contain xl:size-12" />
            <span className="text-[11px] font-extrabold uppercase leading-none tracking-tight xl:text-base">
              OM Solutions
            </span>
          </a>
          <nav aria-label="Page navigation" className="flex items-center gap-1.5 sm:gap-3 xl:hidden">
            <a
              href="/regulations"
              aria-current="page"
              className="whitespace-nowrap px-1 text-[10px] font-semibold text-slate-800 sm:text-xs"
            >
              Regulations
            </a>
            <a
              href="/#contact"
              className="group inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-emerald-700 px-2.5 py-1.5 text-[9px] font-bold text-white sm:px-3 sm:text-[10px]"
            >
              Join This Mission
              <ArrowUpRight className="size-3" />
            </a>
            <a
              href="/#contact"
              className="group inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-emerald-700 px-2.5 py-1.5 text-[9px] font-bold text-white sm:px-3 sm:text-[10px]"
            >
              Dealership
              <ArrowUpRight className="size-3" />
            </a>
          </nav>
          <nav aria-label="Main navigation" className="hidden items-center justify-end gap-6 xl:flex 2xl:gap-8">
            {navLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                aria-current={label === "Regulations" ? "page" : undefined}
                className={`whitespace-nowrap text-[14px] font-bold transition-colors hover:text-emerald-700 2xl:text-[15px] ${
                  label === "Regulations" ? "text-emerald-700" : "text-slate-700"
                }`}
              >
                {label}
              </a>
            ))}
            <a
              href="/#contact"
              className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-emerald-700 px-4 py-2.5 text-[14px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-emerald-800 2xl:px-5"
            >
              Dealership
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </nav>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-[#0b2a1e] px-4 pb-[62px] pt-[68px] text-center text-white sm:pb-20 sm:pt-36 xl:pb-24 xl:pt-44">
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
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-2 max-[430px]:grid-cols-2 sm:gap-5">
          {STATE_REGULATIONS.map((region) => (
            <article
              key={region.id}
              className="group flex min-w-0 flex-col overflow-hidden rounded-[10px] border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none sm:rounded-2xl"
            >
              <div className="relative h-[96px] overflow-hidden bg-slate-200 sm:h-[160px] xl:h-[200px]">
                <img
                  src={region.image}
                  alt={`${region.landmark}, ${region.state}`}
                  loading="lazy"
                  data-regulation-image
                  onError={(event) => {
                    if (event.currentTarget.dataset.fallbackApplied) return;
                    event.currentTarget.dataset.fallbackApplied = "true";
                    event.currentTarget.src = fallbackImage;
                  }}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
                  download
                  aria-label={`Download ${region.state} regulation order (PDF)`}
                  className="mt-2 inline-flex min-h-6 w-full items-center justify-center rounded-full bg-[#09b978] px-1.5 py-1 text-[9px] font-bold text-[#063b2a] transition-colors hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:mt-5 sm:min-h-12 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm sm:text-white"
                >
                  Download Order
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-7xl text-xs leading-5 text-slate-500">
          Notifications are provided for reference. Confirm current requirements with the relevant pollution control authority.
        </p>
      </section>

      <footer className="bg-[#07170f] px-[6vw] py-5 text-center font-mono text-[10px] uppercase tracking-[.12em] text-white/40">
        © OM Solutions · Cleaner power for a changing India
      </footer>
      <style>{`@keyframes regulations-hero-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}} @media(prefers-reduced-motion:reduce){.animate-\[regulations-hero-in_\.7s_ease-out_both\]{animation:none}}`}</style>
    </main>
  );
}