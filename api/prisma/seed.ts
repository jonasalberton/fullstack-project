import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const sales = await prisma.department.create({
    data: {
      name: "Sales",
    },
  });

  const engineering = await prisma.department.create({
    data: {
      name: "Engineering",
    },
  });

  const marketing = await prisma.department.create({
    data: {
      name: "Marketing",
    },
  });

  const finance = await prisma.department.create({
    data: {
      name: "Finance",
    },
  });

  await prisma.employee.createMany({
    data: [
      {
        firstName: "John",
        lastName: "Doe",
        hireDate: new Date("2022-01-15"),
        departmentId: sales.id,
        phone: "123-456-7890",
        address: "123 Main St, Anytown, USA",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        hireDate: new Date("2021-06-30"),
        departmentId: engineering.id,
        phone: "987-654-3210",
        address: "456 Elm St, Othertown, USA",
      },
      {
        firstName: "Michael",
        lastName: "Brown",
        hireDate: new Date("2020-03-01"),
        departmentId: marketing.id,
        phone: "555-555-5555",
        address: "789 Oak St, Thistown, USA",
      },
      {
        firstName: "Emily",
        lastName: "Johnson",
        hireDate: new Date("2020-09-15"),
        departmentId: finance.id,
        phone: "666-666-6666",
        address: "1011 Maple St, Thatcity, USA",
      },
    ],
  });

  console.log("Seed data added successfully!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
