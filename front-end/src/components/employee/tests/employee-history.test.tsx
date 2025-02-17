import { describe, it, expect, vi, Mock } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import EmployeeHistory from "../employee-history";
import { getEmployeeHistory } from "@/services/employee-service";

const queryClient = new QueryClient();

vi.mock("@/services/employee-service", () => ({
  getEmployeeHistory: vi.fn(),
}));

describe("EmployeeHistory - Component", () => {
  it("should display all employee department history", async () => {
    (getEmployeeHistory as Mock).mockResolvedValueOnce([
      { id: 1, createdAt: new Date("2019-01-02T16:00:00"), department: { id: 1, name: "HR" } },
      {
        id: 2,
        createdAt: new Date("2020-01-02T16:00:00"),
        department: { id: 2, name: "Finance" },
      },
    ]);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <EmployeeHistory departmentId={1} employeeId={1} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      // headers
      expect(screen.getByText("Date")).toBeDefined();
      expect(screen.getByText("Department")).toBeDefined();

      // rows
      expect(screen.getByText("01/02/2019")).toBeDefined();
      expect(screen.getByText("HR")).toBeDefined();
      expect(screen.getByText("01/02/2020")).toBeDefined();
      expect(screen.getByText("Finance")).toBeDefined();
    });
  });
});
