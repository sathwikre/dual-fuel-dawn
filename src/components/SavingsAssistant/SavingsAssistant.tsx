import { useState, useEffect } from "react";
import { SavingsAssistantButton } from "./SavingsAssistantButton";
import { SavingsCalculator } from "./SavingsCalculator";

export function SavingsAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  // Escape key closes the calculator
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <SavingsAssistantButton
        onClick={() => setIsOpen((o) => !o)}
        isOpen={isOpen}
      />
      {isOpen && <SavingsCalculator onClose={() => setIsOpen(false)} />}
    </>
  );
}
