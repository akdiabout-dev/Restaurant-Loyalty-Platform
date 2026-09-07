import {z} from "zod";
import { userListResponseSchema, userResponseSchema } from "./userResponse.schema.js";
import { refreshTokenSchema } from "./auth/auth.schema.js";
import { createUserSchema, updateUserSchema, userIdParamSchema, userQuerySchema } from "./user.schema.js";
// Inputs

export type refreshInput = z.infer<typeof refreshTokenSchema>
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserQueryParams = z.infer<typeof userQuerySchema>;
export type UserIdParam = z.infer<typeof userIdParamSchema>;


// Outputs
export type UserResponse = z.infer<typeof userResponseSchema>;
export type UserListResponse = z.infer<typeof userListResponseSchema>;