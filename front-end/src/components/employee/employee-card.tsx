import { useMemo } from "react";
import { toast } from "sonner";
import { Card } from "../ui/card";
import { ROUTES } from "@/routes";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { FullEmployee } from "@/models/Employee";
import { deleteEmployeeById } from "@/services/employee-service";
import { formatDate, formatRelativeDifference } from "@/lib/date";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  employee: FullEmployee;
};

export default function EmployeeCard({ employee }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteEmployeeById,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (_, id) => {
      toast.success("Employee successfully removed");
      queryClient.setQueryData(["employees"], (cache: FullEmployee[]) => {
        return cache.filter((employee) => employee.id !== id);
      });
    },
  });

  const dateRow = useMemo(() => {
    return `${formatDate(employee.hireDate)} (${formatRelativeDifference(
      employee.hireDate
    )})`;
  }, [employee]);

  return (
    <Card className="p-3 grid gap-4 grid-cols-[64px_1fr_100px_50px] items-center">
      <div className="h-16 w-16 bg-zinc-200 rounded-sm" />
      <div>
        <div className="font-bold flex gap-2">
          {employee.firstName} {employee.lastName}
          <span className="font-light">({employee.department.name})</span>
        </div>

        <div className="mt-1 text-sm text-black">Hire Date</div>
        <div className="text-xs text-gray-600">{dateRow}</div>
      </div>

      <Link to={ROUTES.EMPLOYEE_DETAILS.replace(":id", employee.id.toString())}>
        <Button>View Details</Button>
      </Link>
      <Button
        data-testid="remove-user"
        variant={"ghost"}
        onClick={() => mutate(employee.id)}
        disabled={isPending}
      >
        <Trash2 size={22} className="text-red-600" />
      </Button>
    </Card>
  );
}
