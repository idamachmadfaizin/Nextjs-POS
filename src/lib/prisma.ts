import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const connectionString = `${process.env.DATABASE_URL}`;
if (!connectionString) throw new Error("DATABASE_URL is missing");
const adapter = new PrismaBetterSqlite3({ url: connectionString });

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    // log: ["query", "info", "warn", "error"],
    // log: [
    //   { level: "query", emit: "event" },
    //   { level: "error", emit: "stdout" },
    //   { level: "warn", emit: "stdout" },
    // ],
  });

// prisma.$on("query" as never, (e: any) => {
//   console.log("SQL:", e.query);
//   console.log("Params:", e.params);
//   console.log("Duration:", e.duration + "ms");
// });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
