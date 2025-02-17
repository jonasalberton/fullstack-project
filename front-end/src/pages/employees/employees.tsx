import { Error } from "./error";
import { Loading } from "./loading";
import EmployeeList from "@/components/employee/employee-list";
import { useQuery } from "@tanstack/react-query";
import { FullEmployee } from "@/models/Employee";
import { getAllEmployees } from "@/services/employee-service";
import NewEmployeeModal from "@/components/employee/create-employee-modal";

export default function Employees() {
  const { data, error, isLoading } = useQuery<FullEmployee[]>({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
  });

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <div className="flex text-center justify-between mb-4">
        <h1 className="font-semibold mb-4">Employees</h1>
        <NewEmployeeModal />
      </div>
      <EmployeeList employees={data ?? []} />
    </div>
  );
}
