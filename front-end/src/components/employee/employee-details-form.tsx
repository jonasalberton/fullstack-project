import { formatDate, formatRelativeDifference } from "@/lib/date";
import { Employee, FullEmployee } from "@/models/Employee";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Department } from "@/models/Department";
import { useEmployeePortalContext } from "@/contexts/employee-portal-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployee } from "@/services/employee-service";
import { toast } from "sonner";

type Props = {
  employee: FullEmployee;
};

export default function EmployeeDetailsForm({ employee }: Props) {
  const { departments } = useEmployeePortalContext();
  const [selectedDepartment, setSelectedDepartment] = useState(
    employee.department
  );
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: Partial<Employee>) => updateEmployee(employee.id, data),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (newEmployee) => {
      toast.success("Employee successfully updated!");
      queryClient.setQueryData(["employee", employee.id], (_: FullEmployee) => {
        return {...newEmployee};
      });
    },
  });

  const updateEmployeeDepartment = (department: Department) => {
    mutate({ departmentId: department.id });
  };

  const toggleEmployeeStatus = () => {
    mutate({ isActive: !employee.isActive });
  };

  const [formatedDate, dateRange] = useMemo(
    () => [
      formatDate(employee.hireDate),
      formatRelativeDifference(employee.hireDate),
    ],
    [employee.hireDate]
  );

  return (
    <div className="mt-4">
      <div className="grid grid-cols-[230px_1fr_100px]">
        <div className="h-52 w-52 bg-zinc-300 relative">
          {!employee.isActive && (
            <div className="bg-red-500 text-center text-white border m-auto absolute bottom-0 w-full">
              Inactive
            </div>
          )}
        </div>
        <div>
          <h1 className="font-semibold mb-4">
            {employee.firstName} {employee.lastName}
          </h1>

          <Row title="Employee ID" value={employee.id.toString()} />
          <Row title="Department" value={employee.department.name} />
          <Row title="Telephone" value={employee.phone} />
          <Row title="Address" value={employee.address} />

          <div>
            <div className="text-sm font-bold mt-4 mb-1 ">
              Update Department
            </div>
            <div className="flex items-center gap-3">
              <Select
                value={JSON.stringify(selectedDepartment)}
                onValueChange={(data) =>
                  setSelectedDepartment(JSON.parse(data))
                }
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((department) => (
                    <SelectItem
                      key={department.id}
                      value={JSON.stringify(department)}
                    >
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                disabled={employee.department.id === selectedDepartment.id}
                onClick={() => updateEmployeeDepartment(selectedDepartment)}
                size={"sm"}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className="font-bold">Hire Date</div>
          <div className="text-sm text-gray-600">{formatedDate}</div>
          <div className="text-sm text-gray-600">{dateRange}</div>
          <Button
            variant={employee.isActive ? "destructive" : "default"}
            size={"sm"}
            className="mt-2 F"
            onClick={toggleEmployeeStatus}
          >
            {employee.isActive ? "Deactivate" : "Activate"}
          </Button>
        </div>
      </div>
    </div>
  );
}

const Row = ({ title, value }: { title: string; value?: string }) => {
  return (
    <div className="text-sm text-gray-600 grid grid-cols-[90px_1fr] items-start">
      {title}: <span className="text-black">{value}</span>
    </div>
  );
};
