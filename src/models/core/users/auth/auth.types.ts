import {z} from "zod";
import { createSchema, loginSchema, refreshSessionSchema, refreshTokenSchema, registerSchema } from "./auth.schema.js";
import { createUserSchema, updateUserSchema, userIdParamSchema, userQuerySchema } from "../user.schema.js";
import { userListResponseSchema, userResponseSchema } from "../userResponse.schema.js";
// Inputs
export type RegisterInput = z.infer<typeof registerSchema>;
export type createInput = z.infer<typeof createSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type refreshInput = z.infer<typeof refreshTokenSchema>
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserQueryParams = z.infer<typeof userQuerySchema>;
export type UserIdParam = z.infer<typeof userIdParamSchema>;
export type RefreshSessionInput = z.infer<typeof refreshSessionSchema>;


// Outputs
export type UserResponse = z.infer<typeof userResponseSchema>;
export type UserListResponse = z.infer<typeof userListResponseSchema>;