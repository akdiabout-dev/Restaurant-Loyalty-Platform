import {z} from "zod";

 const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

 const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

 const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

 const changePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

const RefreshSessionSchema = z.object(
  {
    familyId: z.string().uuid().optional(),
    tokenHash:z.string(),
    revokedAt: z.date().optional(),
    //Zod's z.date() expects a native JavaScript Date object,
    // it will reject ISO date strings or timestamps
    expiresAt: z.date(),
    replacedById:z.string().optional(),
    userId:z.string(),
  }
);
export {
    registerSchema,
    loginSchema,
    refreshTokenSchema,
    changePasswordSchema,
    RefreshSessionSchema
}
