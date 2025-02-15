import { Department } from "@/models/Department";
import { getAllDepartments } from "@/services/department-service";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, ReactNode } from "react";

type EmployeePortalContextType = {
  departments: Department[];
};

const EmployeePortalContext = createContext<EmployeePortalContextType>({
  departments: [],
});

type Props = {
  children: ReactNode;
};

export const EmployeePortalContextProvider = ({ children }: Props) => {
  const { data, error } = useQuery({
    queryKey: ["departments"],
    queryFn: getAllDepartments,
  });

  if (error) return "Something went wrong while loading the app";

  return (
    <EmployeePortalContext.Provider value={{ departments: data ?? [] }}>
      {children}
    </EmployeePortalContext.Provider>
  );
};

export const useEmployeePortalContext = () => {
  return React.useContext(EmployeePortalContext);
};
