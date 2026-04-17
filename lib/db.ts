import * as dotenv from "dotenv";
import path from "path";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Load .env.local explicitly
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error(
    "DATABASE_URL is not defined. Loaded env vars:",
    Object.keys(process.env).filter((k) => k.includes("DATABASE")),
  );
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const adapter = new PrismaPg({
  connectionString: databaseUrl,
});

const globalForPrisma = global as unknown as { prisma: PrismaClient | null };

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };
