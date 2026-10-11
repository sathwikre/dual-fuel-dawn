import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import logoImage from "@/assets/aircompressor/logo.png";

const navLinks = [
  ["Home", "/#home"],
  ["Technology", "/technology"],
  ["Impact", "/impact"],
  ["About", "/#team"],
  ["Regulations", "/regulations"],
  ["Join This Mission", "/#contact"],
] as const;

type NavLabel = (typeof navLinks)[number][0];

// Shared site header for standalone pages; transparent over a dark hero, light once scrolled.
export function SiteHeader({ active }: { active: NavLabel }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 24);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
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
                aria-current={label === active ? "page" : undefined}
                style={{
                  color: scrolled
                    ? label === active
                      ? "#047857"
                      : "#334155"
                    : label === active
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
                aria-current={label === active ? "page" : undefined}
                className={`border-b border-white/10 py-3 text-[13px] font-extrabold uppercase tracking-[0.11em] transition-colors hover:text-[#b6ff72] ${label === active ? "text-[#b6ff72]" : "text-white/80"}`}
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
  );
}
