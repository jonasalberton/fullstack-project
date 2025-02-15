import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate replace to={"/employees"} />,
      },
      {
        path: "/employees",
        element: "hi employees",
      },
      {
        path: "/employees/:id",
        element: "hi employees details",
      },
    ],
  },
]);

export default router;
