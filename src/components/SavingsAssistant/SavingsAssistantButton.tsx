import { useState } from "react";

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
          animation-play-state: paused;
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
        @keyframes saKeyPress {
          0%, 12%, 100% { transform: translateY(0); fill: #123b27; }
          5%, 9% { transform: translateY(2px); fill: #2dbd6e; }
        }
        @keyframes saReadout {
          0%, 24%, 100% { opacity: 1; }
          12% { opacity: 0.25; }
        }
        .sa-calc-key { transform-box: fill-box; transform-origin: center; animation: saKeyPress 2.8s ease-in-out infinite; }
        .sa-calc-key:nth-of-type(2) { animation-delay: .23s; }
        .sa-calc-key:nth-of-type(3) { animation-delay: .46s; }
        .sa-calc-key:nth-of-type(4) { animation-delay: .69s; }
        .sa-calc-key:nth-of-type(5) { animation-delay: .92s; }
        .sa-calc-key:nth-of-type(6) { animation-delay: 1.15s; }
        .sa-calc-key:nth-of-type(7) { animation-delay: 1.38s; }
        .sa-calc-key:nth-of-type(8) { animation-delay: 1.61s; }
        .sa-calc-key:nth-of-type(9) { animation-delay: 1.84s; }
        .sa-calc-key:nth-of-type(10) { animation-delay: 2.07s; }
        .sa-calc-key:nth-of-type(11) { animation-delay: 2.3s; }
        .sa-calc-key:nth-of-type(12) { animation-delay: 2.53s; }
        .sa-calc-readout { animation: saReadout 2.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .sa-calc-key, .sa-calc-readout { animation: none !important; }
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
          className="sa-btn relative flex items-center justify-center rounded-lg bg-[oklch(0.19_0.045_158)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.72_0.16_155)] focus-visible:ring-offset-2"
          style={{
            width: 92,
            height: 68,
            border: "1px solid rgba(45,189,110,0.35)",
            flexShrink: 0,
          }}
        >
          {isOpen ? (
            /* Close X when open */
            <svg width="26" height="26" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5L15 15M15 5L5 15" stroke="oklch(0.72 0.16 155)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="54" height="56" viewBox="0 0 60 70" fill="none" aria-hidden="true">
              <rect x="2" y="1" width="56" height="68" rx="8" fill="#f4fff7" stroke="#2dbd6e" strokeWidth="2" />
              <rect x="6" y="6" width="48" height="17" rx="3" fill="#0b2819" />
              <text x="30" y="17.5" textAnchor="middle" fill="#82f3a8" fontSize="6" fontWeight="700" className="sa-calc-readout">CALCULATOR</text>
              <g className="sa-calc-key"><rect x="6" y="27" width="14" height="8" rx="2" fill="#123b27"/><text x="13" y="33" textAnchor="middle" fill="white" fontSize="6">7</text></g>
              <g className="sa-calc-key"><rect x="23" y="27" width="14" height="8" rx="2" fill="#123b27"/><text x="30" y="33" textAnchor="middle" fill="white" fontSize="6">8</text></g>
              <g className="sa-calc-key"><rect x="40" y="27" width="14" height="8" rx="2" fill="#123b27"/><text x="47" y="33" textAnchor="middle" fill="white" fontSize="6">9</text></g>
              <g className="sa-calc-key"><rect x="6" y="37" width="14" height="8" rx="2" fill="#123b27"/><text x="13" y="43" textAnchor="middle" fill="white" fontSize="6">4</text></g>
              <g className="sa-calc-key"><rect x="23" y="37" width="14" height="8" rx="2" fill="#123b27"/><text x="30" y="43" textAnchor="middle" fill="white" fontSize="6">5</text></g>
              <g className="sa-calc-key"><rect x="40" y="37" width="14" height="8" rx="2" fill="#123b27"/><text x="47" y="43" textAnchor="middle" fill="white" fontSize="6">6</text></g>
              <g className="sa-calc-key"><rect x="6" y="47" width="14" height="8" rx="2" fill="#123b27"/><text x="13" y="53" textAnchor="middle" fill="white" fontSize="6">1</text></g>
              <g className="sa-calc-key"><rect x="23" y="47" width="14" height="8" rx="2" fill="#123b27"/><text x="30" y="53" textAnchor="middle" fill="white" fontSize="6">2</text></g>
              <g className="sa-calc-key"><rect x="40" y="47" width="14" height="8" rx="2" fill="#123b27"/><text x="47" y="53" textAnchor="middle" fill="white" fontSize="6">3</text></g>
              <g className="sa-calc-key"><rect x="6" y="57" width="14" height="8" rx="2" fill="#123b27"/><text x="13" y="63" textAnchor="middle" fill="white" fontSize="6">0</text></g>
              <g className="sa-calc-key"><rect x="23" y="57" width="14" height="8" rx="2" fill="#123b27"/><text x="30" y="63" textAnchor="middle" fill="white" fontSize="6">.</text></g>
              <g className="sa-calc-key"><rect x="40" y="57" width="14" height="8" rx="2" fill="#2dbd6e"/><text x="47" y="63" textAnchor="middle" fill="white" fontSize="6">=</text></g>
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
