import { FullEmployee } from "@/models/Employee";
import EmployeeCard from "./employee-card";
import { memo } from "react";

type Props = {
  employees: FullEmployee[];
};

function EmployeeList({ employees }: Props) {
  if (employees.length === 0) return "No employees available";

  return (
    <div className="flex  flex-col gap-2">
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
}

export default memo(EmployeeList);
