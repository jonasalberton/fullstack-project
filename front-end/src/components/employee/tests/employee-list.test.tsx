import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FullEmployee } from "@/models/Employee";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import EmployeeList from "../employee-list";

const queryClient = new QueryClient();

const mockEmployees: FullEmployee[] = [
  {
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
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    departmentId: 3,
    hireDate: new Date("2021-02-03T20:00:00"),
    department: {
      id: 3,
      name: "Marketing",
    },
    phone: "098-765-4321",
    address: "456 Elm St, Othertown, USA",
    isActive: true,
  },
];

describe("EmployeeList - Component", () => {
  it("should render employee list", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <EmployeeList employees={mockEmployees} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.getByText("John Doe")).toBeDefined();
    expect(await screen.getByText("(Sales)")).toBeDefined();
    expect(await screen.findAllByText("Hire Date")).toHaveLength(2);
    expect(await screen.getByText("Jan 2, 2020 (5y - 1m - 14d)")).toBeDefined();
    expect(await screen.findAllByText("View Details")).toHaveLength(2);
    expect(await screen.findAllByTestId("remove-user")).toHaveLength(2);

    expect(await screen.getByText("Jane Smith")).toBeDefined();
    expect(await screen.getByText("(Marketing)")).toBeDefined();
    expect(await screen.getByText("Feb 3, 2021 (4y - 0m - 13d)")).toBeDefined();
  });

  it("should display message when user list is empty", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <EmployeeList employees={[]} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.getByText("No employees available")).toBeDefined();
  });
});
