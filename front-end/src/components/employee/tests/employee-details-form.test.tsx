import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { EmployeePortalContext } from "@/contexts/employee-portal-context";
import EmployeeDetailsForm from "../employee-details-form";
import { FullEmployee } from "@/models/Employee";

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

const departments = [
  { id: 1, name: "Sales" },
  { id: 2, name: "Finance" },
];

describe("EmployeeDetailsForm - Component", () => {
  it("should render all employee details", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EmployeePortalContext.Provider value={{ departments }}>
          <MemoryRouter>
            <EmployeeDetailsForm employee={mockEmployee} />
          </MemoryRouter>
        </EmployeePortalContext.Provider>
      </QueryClientProvider>
    );

    expect(await screen.getByText("John Doe")).toBeDefined();
    expect(await screen.getByText("Employee ID:")).toBeDefined();
    expect(await screen.getByText("Hire Date")).toBeDefined();
    expect(await screen.getByText("1")).toBeDefined();
    expect(await screen.getByText("Department:")).toBeDefined();
    expect(await screen.getByText("Sales")).toBeDefined();
    expect(await screen.getByText("Telephone:")).toBeDefined();
    expect(await screen.getByText("123-456-7890")).toBeDefined();
    expect(await screen.getByText("Address:")).toBeDefined();
    expect(await screen.getByText("123 Main St, Anytown, USA")).toBeDefined();
    expect(await screen.getByText("Update Department")).toBeDefined();
    expect(await screen.getByText("Update")).toBeDefined();
    expect(await screen.getByText("Jan 2, 2020")).toBeDefined();
    expect(await screen.getByText("5y - 1m - 14d")).toBeDefined();
    expect(await screen.getByText("Deactivate")).toBeDefined();
  });

  it("should render activate button when user is inactive", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EmployeePortalContext.Provider value={{ departments }}>
          <MemoryRouter>
            <EmployeeDetailsForm
              employee={{ ...mockEmployee, isActive: false }}
            />
          </MemoryRouter>
        </EmployeePortalContext.Provider>
      </QueryClientProvider>
    );

    expect(await screen.getByText("Inactive")).toBeDefined();
    expect(await screen.getByText("Activate")).toBeDefined();
  });

  it("should render Inactive button when user is Active", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EmployeePortalContext.Provider value={{ departments }}>
          <MemoryRouter>
            <EmployeeDetailsForm
              employee={{ ...mockEmployee, isActive: true }}
            />
          </MemoryRouter>
        </EmployeePortalContext.Provider>
      </QueryClientProvider>
    );

    expect(await screen.queryByText("Inactive")).toBeNull();
    expect(await screen.getByText("Deactivate")).toBeDefined();
  });
});
