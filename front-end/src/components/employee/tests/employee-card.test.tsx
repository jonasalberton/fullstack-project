import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EmployeeCard from "../employee-card";
import { FullEmployee } from "@/models/Employee";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";


const queryClient = new QueryClient();

const mockEmployee: FullEmployee = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  departmentId: 2,
  hireDate: new Date("2020-01-02T19:00:00"),
  department: {
    id: 2,
    name: "Sales",
  },
  phone: "123-456-7890",
  address: "123 Main St, Anytown, USA",
  isActive: true,
};

describe("EmployeeCard - Component", () => {
  it("should render employee details", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <EmployeeCard employee={mockEmployee} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.getByText("John Doe")).toBeDefined();
    expect(await screen.getByText("(Sales)")).toBeDefined();
    expect(await screen.getByText("Hire Date")).toBeDefined();
    expect(await screen.getByText("Jan 2, 2020 (5y - 1m - 14d)")).toBeDefined();
    expect(await screen.getByText("View Details")).toBeDefined();
    expect(await screen.getByTestId("remove-user")).toBeDefined();
  });
});
