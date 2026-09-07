import {z} from "zod";
import {UserStatusEnum} from "../user.schema.js";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password is too long");

 // Register: Pick registration fields + require raw password
export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
  phone: z.string().nullable().optional(),
  dateOfBirth: z.coerce.date().nullable().optional(),
});

export const createSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  imageUrl: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().nullable().optional(),
  dateOfBirth: z.coerce.date().nullable().optional(),
});

// Login: Identifier + Password
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Refresh Token Request
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

// Refresh session Request
export const refreshSessionSchema = z.object({
  userId: z.string().uuid(),
  tokenHash: z.string().min(1, "tokenHash is required"),
  familyId: z.string().uuid(),
  expiresAt: z.coerce.date(),
  revokedAt: z.coerce.date().nullable().optional(),
  replacedById: z.string().uuid().nullable().optional(),
});