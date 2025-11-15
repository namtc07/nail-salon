import { PrismaClient } from "@prisma/client";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { hash } = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const password = await hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@nails.com" },
    update: {
      password,
      name: "Admin",
      role: "ADMIN",
    },
    create: {
      email: "admin@nails.com",
      password,
      name: "Admin",
      role: "ADMIN",
    },
  });

  await prisma.staff.createMany({
    data: [
      { name: "Linh", active: true },
      { name: "Hoa", active: true },
    ],
  });

  await prisma.service.createMany({
    data: [
      {
        name: "Classic Manicure",
        description: "Dũa, chăm sóc móng cơ bản, sơn thường.",
        category: "Manicure",
        price: 150000,
        duration: 45,
      },
      {
        name: "Gel Manicure",
        description: "Sơn gel bền, bóng đẹp.",
        category: "Manicure",
        price: 250000,
        duration: 60,
      },
      {
        name: "Classic Pedicure",
        description: "Ngâm chân, tẩy da chết, sơn màu.",
        category: "Pedicure",
        price: 200000,
        duration: 60,
      },
      {
        name: "Nail Art (per nail)",
        description: "Vẽ họa tiết, đính đá.",
        category: "Nail Art",
        price: 30000,
        duration: 10,
      },
    ],
  });

  console.log("Seed done");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
