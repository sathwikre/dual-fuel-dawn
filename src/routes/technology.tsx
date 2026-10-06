import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const TechnologyContent = lazy(() =>
  import("./index").then(({ TechnologyStandalone }) => ({ default: TechnologyStandalone })),
);

function TechnologyPage() {
  return (
    <Suspense fallback={null}>
      <TechnologyContent />
    </Suspense>
  );
}

export const Route = createFileRoute("/technology")({
  component: TechnologyPage,
  head: () => ({
    meta: [
      { title: "Technology | OM Solutions" },
      {
        name: "description",
        content: "Explore OM Solutions dual-fuel technology, fuel systems, benefits, considerations and comparisons.",
      },
    ],
  }),
});
