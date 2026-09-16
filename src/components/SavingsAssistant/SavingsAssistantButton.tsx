import { useState } from "react";
import buttonIcon from "@/assets/ChatGPT Image Sep 16, 2026, 08_54_35 AM.png";

interface Props {
  onClick: () => void;
  isOpen: boolean;
}

export function SavingsAssistantButton({ onClick, isOpen }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes saEntrance {
          0% { opacity: 0; transform: scale(0.6) translateY(12px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes saGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(45,189,110,0), 0 4px 20px rgba(0,0,0,0.35); }
          50% { box-shadow: 0 0 0 8px rgba(45,189,110,0.18), 0 4px 20px rgba(0,0,0,0.35); }
        }
        .sa-btn {
          animation: saEntrance 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.8s both,
                     saGlow 3.5s ease-in-out 1.5s infinite;
        }
        .sa-btn:hover {
          animation: none;
          box-shadow: 0 0 0 10px rgba(45,189,110,0.14), 0 8px 28px rgba(0,0,0,0.45);
          transform: scale(1.06);
        }
        .sa-tooltip {
          opacity: 0;
          transform: translateX(8px);
          transition: opacity 0.18s ease, transform 0.18s ease;
          pointer-events: none;
        }
        .sa-tooltip.visible {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      <div
        style={{ position: "fixed", right: "max(8px, env(safe-area-inset-right, 8px))", bottom: 24, zIndex: 100 }}
        className="flex items-center gap-3"
      >
        {/* Tooltip */}
        <div
          className={`sa-tooltip${hovered && !isOpen ? " visible" : ""} whitespace-nowrap rounded-[6px] border border-white/10 bg-[#0b1f15] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white shadow-lg`}
          role="tooltip"
          aria-hidden={!hovered}
        >
          Calculate Your Savings
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={onClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label={isOpen ? "Close savings calculator" : "Open savings calculator"}
          className="sa-btn relative flex items-center justify-center rounded-full bg-[oklch(0.19_0.045_158)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.72_0.16_155)] focus-visible:ring-offset-2"
          style={{
            width: 56,
            height: 56,
            border: "1px solid rgba(45,189,110,0.35)",
            flexShrink: 0,
          }}
        >
          {isOpen ? (
            /* Close X when open */
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5L15 15M15 5L5 15" stroke="oklch(0.72 0.16 155)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            /* Custom OM Solutions calculator icon */
            <img src={buttonIcon} alt="" aria-hidden="true" style={{ width: 56, height: 56, objectFit: "cover", borderRadius: "50%" }} />
          )}
        </button>
      </div>
    </>
  );
}
