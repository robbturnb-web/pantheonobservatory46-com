import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CodexPage from "./CodexPage";

vi.mock("@/assets/codex/codex-hero.jpg", () => ({ default: "codex-hero.jpg" }));
vi.mock("@/components/SEO", () => ({ SEO: () => null }));

const ACTIVE_BORDER = "border-[#ffd700]";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <CodexPage />
    </MemoryRouter>
  );
}

function linkFor(label: string): HTMLAnchorElement {
  return screen.getByText(label, { selector: "div" }).closest("a") as HTMLAnchorElement;
}

const cases: Array<{ path: string; activeLabels: string[] }> = [
  { path: "/", activeLabels: ["Back to Temple"] },
  { path: "/the-46", activeLabels: ["Browse Codex"] },
  { path: "/profile", activeLabels: ["My Frequency Entries"] },
  { path: "/echoverse", activeLabels: ["Add to Codex", "Community Highlights"] },
  { path: "/pyramids", activeLabels: ["Ritual Blueprints"] },
];

const allLabels = [
  "Browse Codex",
  "My Frequency Entries",
  "Add to Codex",
  "Community Highlights",
  "Ritual Blueprints",
  "Back to Temple",
];

describe("CodexPage route-aware highlighting", () => {
  for (const { path, activeLabels } of cases) {
    it(`highlights ${activeLabels.join(", ")} on ${path}`, () => {
      const { unmount } = renderAt(path);
      for (const label of allLabels) {
        const link = linkFor(label);
        const shouldBeActive = activeLabels.includes(label);
        const cls = link.className;
        if (shouldBeActive) {
          expect(cls).toContain(ACTIVE_BORDER);
        } else {
          expect(cls).not.toContain(ACTIVE_BORDER + " ");
          expect(cls).toContain("border-[#ffd700]/30");
        }
      }
      unmount();
    });
  }
});
