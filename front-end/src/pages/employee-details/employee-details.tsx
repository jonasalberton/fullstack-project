import { Link, useParams } from "react-router-dom";
import { Error } from "./error";
import { Loading } from "./loading";
import { useQuery } from "@tanstack/react-query";
import { FullEmployee } from "@/models/Employee";
import { getEmployeeById } from "@/services/employee-service";
import { toast } from "sonner";
import EmployeeDetailsForm from "@/components/employee/employee-details-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/routes";
import EmployeeHistory from "@/components/employee/employee-history";

export default function EmployeeDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useQuery<FullEmployee>({
    queryKey: ["employee", Number(id)],
    queryFn: () => getEmployeeById(Number(id)),
  });

  if (isLoading) return <Loading />;

  if (error || !data) {
    toast.error(error?.message);
    return <Error />;
  }

  return (
    <div>
      <div className="flex text-center justify-between mb-4">
        <Link to={ROUTES.EMPLOYEES}>
          <Button variant={"outline"}>
            <ArrowLeft /> Go Back
          </Button>
        </Link>
      </div>
      <EmployeeDetailsForm employee={data} />
      <EmployeeHistory employeeId={data.id} departmentId={data.departmentId} />
    </div>
  );
}
