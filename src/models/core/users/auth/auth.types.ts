import { z } from "zod";

import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  changePasswordSchema,
  RefreshSessionSchema,
} from "./auth.schema.js";


export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type refreshInput = z.infer<typeof refreshTokenSchema>;
export type changePasswordInput = z.infer<typeof changePasswordSchema>;
export type RefreshSessionInput = z.infer<typeof RefreshSessionSchema>;