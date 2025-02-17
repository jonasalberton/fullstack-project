import { getEmployeeHistory } from "@/services/employee-service";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { memo, useEffect } from "react";
import { format } from "date-fns";

type Props = {
  employeeId: number;
  departmentId: number;
};

// TODO: change strategy to load only necessary by using a cursors or date filter
function EmployeeHistory({ employeeId, departmentId }: Props) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["history", employeeId],
    queryFn: () => getEmployeeHistory(employeeId),
  });

  useEffect(() => {
    refetch();
  }, [departmentId]);

  if (error) {
    toast.error(error.message);
    return null;
  }

  if (isLoading || !data || data?.length === 0) return null;

  return (
    <div className="mt-12">
      <h1 className="font-semibold mb-4">Department History</h1>

      <Table className="border max-w-[500px]">
        <TableHeader>
          <TableRow className="bg-zinc-200">
            <TableHead className="font-bold">Date</TableHead>
            <TableHead className="font-bold">Department</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{format(new Date(item.createdAt), "P")}</TableCell>
              <TableCell>{item.department.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default memo(EmployeeHistory);
