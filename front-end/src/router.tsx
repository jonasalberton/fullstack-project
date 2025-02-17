import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";

const Employees = React.lazy(() => import("./pages/employees/employees"));
import { ROUTES } from "./routes";

const EmployeeDetails = React.lazy(
  () => import("./pages/employee-details/employee-details")
);

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Navigate replace to={ROUTES.EMPLOYEES} />,
      },
      {
        path: ROUTES.EMPLOYEES,
        element: <Employees />,
      },
      {
        path: ROUTES.EMPLOYEE_DETAILS,
        element: <EmployeeDetails />,
      },
    ],
  },
]);

export default router;
