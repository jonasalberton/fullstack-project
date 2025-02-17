import "@testing-library/jest-dom";
import { describe, it, expect, vi, Mock } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { EmployeePortalContext } from "@/contexts/employee-portal-context";
import CreateEmployeeModal from "../create-employee-modal";
import userEvent from "@testing-library/user-event";
import { createEmployee } from "@/services/employee-service";

vi.mock("@/services/employee-service", () => ({
  createEmployee: vi.fn(),
}));

const queryClient = new QueryClient();

const departments = [
  { id: 1, name: "Sales" },
  { id: 2, name: "Finance" },
];

describe("CreateEmployeeModal - Component", () => {
  it("should open employee modal with all fields and buttons", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EmployeePortalContext.Provider value={{ departments }}>
          <MemoryRouter>
            <CreateEmployeeModal />
          </MemoryRouter>
        </EmployeePortalContext.Provider>
      </QueryClientProvider>
    );

    const createEmployeeBtn = await screen.getByText("New Employee");

    await userEvent.click(createEmployeeBtn);

    expect(await screen.getByText("Create a New Employee")).toBeDefined();
    expect(
      await screen.getByText(
        "Please complete the form to register a new employee"
      )
    ).toBeDefined();
    expect(await screen.getByText("First Name")).toBeDefined();
    expect(await screen.getByText("Last Name")).toBeDefined();
    expect(await screen.getByText("Hire Date")).toBeDefined();
    expect(await screen.getByText("Department")).toBeDefined();
    expect(await screen.getByText("Phone")).toBeDefined();
    expect(await screen.getByText("Address")).toBeDefined();
    expect(await screen.getByText("Create")).toBeDefined();
  });

  it("should fill all fields and submit the form", async () => {
    (createEmployee as Mock).mockResolvedValueOnce({ created: true });

    render(
      <QueryClientProvider client={queryClient}>
        <EmployeePortalContext.Provider value={{ departments }}>
          <MemoryRouter>
            <CreateEmployeeModal />
          </MemoryRouter>
        </EmployeePortalContext.Provider>
      </QueryClientProvider>
    );

    const createEmployeeBtn = await screen.getByText("New Employee");

    await userEvent.click(createEmployeeBtn);

    const firstName = await screen.getByTestId("firstname");
    const lastName = await screen.getByTestId("lastname");
    const hireDate = await screen.getByTestId("hiredate");
    const department = await screen.getByRole("combobox");
    const phone = await screen.getByTestId("phone");
    const address = await screen.getByTestId("address");

    await userEvent.type(firstName, "Jonas");
    expect(firstName).toHaveValue("Jonas");

    await userEvent.type(lastName, "Alberton");
    expect(lastName).toHaveValue("Alberton");

    await userEvent.type(hireDate, "2015-12-10");
    expect(hireDate).toHaveValue("2015-12-10");

    await userEvent.click(department);
    await userEvent.click(await screen.getAllByText("Sales")[1]);

    await userEvent.type(phone, "(555) 555-1234");
    expect(phone).toHaveValue("(555) 555-1234");

    await userEvent.type(address, "Mr John Smith, 132 My Street");
    expect(address).toHaveValue("Mr John Smith, 132 My Street");

    const createBtn = await screen.getByText("Create");

    const form = await screen.getByRole("form");

    await fireEvent.submit(form);

    await waitFor(() => {
      expect(createBtn).not.toBeDisabled();
      expect(createEmployee).toHaveBeenCalledWith(
        expect.objectContaining({
          address: "Mr John Smith, 132 My Street",
          departmentId: 1,
          firstName: "Jonas",
          lastName: "Alberton",
          phone: "(555) 555-1234",
        })
      );
    });
  });
});
