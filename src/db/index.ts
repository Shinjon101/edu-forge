import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from "./schema";

config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is missing. Set it in .env.local (locally) or GitHub Secrets (in CI)."
  );
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });
