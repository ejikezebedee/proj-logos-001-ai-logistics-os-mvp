import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { mockReadyQueueShipments } from "@/features/disponent/ready-queue/mock-adapter";
import { ReadyQueueWorkspace } from "@/features/disponent/ready-queue/ready-queue-workspace";

const response = {
  shipments: mockReadyQueueShipments,
  refreshedAt: "2026-06-28T08:00:00.000Z",
  source: "mock" as const,
};

function renderWorkspace() {
  render(<ReadyQueueWorkspace response={response} refreshing={false} onRefresh={vi.fn()} />);
}

describe("ready queue workspace", () => {
  it("opens the selected shipment detail with operational sections", () => {
    renderWorkspace();
    fireEvent.click(screen.getByRole("button", { name: "Open details for SHP-1052" }));
    const dialog = screen.getByRole("dialog", { name: "SHP-1052" });
    expect(within(dialog).getByText("Package and warehouse readiness")).toBeInTheDocument();
    expect(within(dialog).getByText("Customer, merchant and route")).toBeInTheDocument();
    expect(within(dialog).getByText("Resource eligibility")).toBeInTheDocument();
  });

  it("keeps unavailable operational commands intentionally disabled", () => {
    renderWorkspace();
    expect(screen.getByRole("button", { name: /Create tour plan/ })).toBeDisabled();
    expect(screen.getByText("Blocked: tour-plan command contract not connected.")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Open details for SHP-1048" }));
    expect(screen.getByRole("button", { name: /Assign resources/ })).toBeDisabled();
    expect(screen.getByText("Disabled: assignment and eligibility command contracts are not connected.")).toBeVisible();
  });

  it("selects a row and clears it through the confirmation handler", () => {
    renderWorkspace();
    const shipment = screen.getByRole("checkbox", { name: "Select SHP-1048" });
    fireEvent.click(shipment);
    expect(shipment).toBeChecked();
    fireEvent.click(screen.getByRole("button", { name: "Clear selection" }));
    const confirmation = screen.getByRole("alertdialog");
    fireEvent.click(within(confirmation).getByRole("button", { name: "Clear selection" }));
    expect(shipment).not.toBeChecked();
  });

  it("filters the rendered queue without changing source data", () => {
    renderWorkspace();
    fireEvent.change(screen.getByPlaceholderText("Shipment, order, party or city"), { target: { value: "Spree Retail" } });
    expect(screen.getByText("SHP-1061")).toBeInTheDocument();
    expect(screen.queryByText("SHP-1048")).not.toBeInTheDocument();
  });
});
