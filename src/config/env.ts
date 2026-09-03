import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),

  DATABASE_URL: z.string().min(1),
  
  JWT_ACCESS_SECRET: z.string().min(1),
  JWT_REFRESH_SECRET: z.string().min(1),

  ACCESS_TOKEN_EXPIRES_AT: z.string().default("30m"),
  REFRESH_TOKEN_EXPIRES_AT: z.string().default("7d"),
});

export const env = envSchema.parse(process.env);