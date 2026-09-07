import {z} from "zod";
import {userSchema} from "./user.schema.js";
// Safe User Response Schema
export const userResponseSchema = userSchema.omit({
  passwordHash: true,
});

// Array Response (For List Endpoints)
export const userListResponseSchema = z.object({
  data: z.array(userResponseSchema),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});