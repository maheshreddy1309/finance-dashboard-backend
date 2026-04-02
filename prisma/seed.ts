import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      passwordHash,
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  await prisma.user.upsert({
    where: { email: "analyst@example.com" },
    update: {},
    create: {
      name: "Analyst User",
      email: "analyst@example.com",
      passwordHash,
      role: "ANALYST",
      status: "ACTIVE",
    },
  });

  await prisma.user.upsert({
    where: { email: "viewer@example.com" },
    update: {},
    create: {
      name: "Viewer User",
      email: "viewer@example.com",
      passwordHash,
      role: "VIEWER",
      status: "ACTIVE",
    },
  });

  console.log("Seed data inserted successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });