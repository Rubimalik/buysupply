import {prisma} from "@/lib/db"
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  await prisma.category.upsert({
    where:  { slug: "photocopiers" },
    update: {},
    create: { name: "Photocopiers", slug: "phpotocopiers" },
  });
  await prisma.category.upsert({
    where:  { slug: "consumables" },
    update: {},
    create: { name: "Consumables", slug: "consumables" },
  });
  console.log("✓ Seeded: Photocopiers + Consumables");
}

main().catch(console.error).finally(() => prisma.$disconnect());