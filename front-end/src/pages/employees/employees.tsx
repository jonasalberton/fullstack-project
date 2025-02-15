import { Error } from "./error";
import { Loading } from "./loading";
import EmployeeList from "@/components/employee/employee-list";
import { useQuery } from "@tanstack/react-query";
import { FullEmployee } from "@/models/Employee";
import { getAllEmployees } from "@/services/employee-service";

export function Employees() {
  const { data, error, isLoading } = useQuery<FullEmployee[]>({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
  });

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="font-semibold mb-4">Employees</h1>
      <EmployeeList employees={data ?? []} />
    </div>
  );
}
