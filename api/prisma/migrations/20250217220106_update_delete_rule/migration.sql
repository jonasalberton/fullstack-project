-- DropForeignKey
ALTER TABLE "EmployeeHistory" DROP CONSTRAINT "EmployeeHistory_employeeId_fkey";

-- AddForeignKey
ALTER TABLE "EmployeeHistory" ADD CONSTRAINT "EmployeeHistory_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
