import { z } from "zod";
import{registerSchema} from "./auth/auth.schema.js";
// Enum matching Prisma
export const UserStatusEnum = z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]);

// Reusable primitives
export const userIdParamSchema = z.object({
  id: z.string().uuid("Invalid User ID format"),
});

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password is too long");

export const userSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().nullable().optional(),
  passwordHash: z.string(),
  imageUrl: z.string().url("Invalid image URL").nullable().optional(),
  dateOfBirth: z.coerce.date().nullable().optional(),
  status: UserStatusEnum.default("ACTIVE"),
  emailVerifiedAt: z.coerce.date().nullable().optional(),
  phoneVerifiedAt: z.coerce.date().nullable().optional(),
  lastLoginAt: z.coerce.date().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

// Create User (Admin level or internal usage)
export const createUserSchema = registerSchema.extend({
  imageUrl: z.string().url().nullable().optional(),
  status: UserStatusEnum.optional(),
});

// Update User (Partial - all fields optional)
export const updateUserSchema = createUserSchema
  .omit({ email: true }) // Usually email updates go through a separate verification flow
  .partial()
  .extend({
    // Make password optional for updates, but keep validation rules if provided
    password: passwordSchema.optional(),
  });

// Query Parameters (Pagination, filtering, sorting)
export const userQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  status: UserStatusEnum.optional(),
});