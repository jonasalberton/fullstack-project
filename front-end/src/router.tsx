import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import { Employees } from "./pages/employees/employees";
import { ROUTES } from "./routes";

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
        element: "hi employees details",
      },
    ],
  },
]);

export default router;
