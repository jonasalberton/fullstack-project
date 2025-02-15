import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import router from "./router.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EmployeePortalContextProvider } from "./contexts/employee-portal-context.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <EmployeePortalContextProvider>
      <RouterProvider router={router} />
    </EmployeePortalContextProvider>
  </QueryClientProvider>
);
