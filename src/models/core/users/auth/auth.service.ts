import {
  create,
  findByEmail,
  createRefreshSession,
  findSession,
  revokeFamilySession,
  updateRefreshSession,
} from "./auth.repository.js";
import { AppError } from "../../../../shared/errors/appError.js";
import {
  RegisterInput,
  LoginInput,
  refreshInput,
  //changePasswordInput,
  RefreshSessionInput,
  UserResponse,
} from "./auth.types.js";

import {
  comparePassword,
  hashPassword,
  hashValue,
} from "../../../../shared/utils/hashHelper.js";
import {
  generateTokenPair,
  verifyRefreshToken,
} from "../../../../shared/utils/tokenHelper.js";
import { userResponseSchema } from "../userResponse.schema.js";
import { getUserById } from "../user.repository.js";
import { deleteFile } from "../../../../shared/utils/file.utils.js";

export const excludePasswordHash = <T extends { passwordHash: string }>(
  user: T,
): Omit<T, "passwordHash"> => {
  const { passwordHash, ...safeUser } = user;

  return safeUser;
};

export const registerUser = async (
  data: RegisterInput,
  file?: Express.Multer.File
) => {
try {
  console.log("i am in service");

    const existingUser = await findByEmail(data.email);
  if (existingUser) {
    throw new AppError(409, "Email already exist !");
  }
  console.log("i am in service !");
  
  const { password,...userDetails} = data;
  const passwordHash = await hashPassword(data.password);

  console.log("pass", passwordHash);

  
    const imageUrl = file
      ? `/media/users/${file.filename}`
      : undefined;


  const user = create(
    {
      ...userDetails,
      ...(imageUrl !== undefined && {imageUrl}),
    },
    passwordHash,
  );
  return user;
} catch (error) {
      // Multer already stored the file.
    // Registration failed → remove orphan file.
    await deleteFile(file?.path);

    // Rethrow the original arrow : user creation failled.
    throw error;
}
};

export const loginUser = async (data: LoginInput) => {
  console.log("i am in service");
  const user = await findByEmail(data.email);
  console.log("i am in service", user);
  if (!user) {
    throw new AppError(401, "Invalid Email or Password");
  }

  const isPasswordValid = await comparePassword(
    data.password,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    throw new AppError(401, "Invalid Email or Password");
  }
  console.log("i am in service, i passed pass validation");

  const { accessToken, refreshToken, expiresAt } = generateTokenPair(user);
  console.log("token: ", accessToken,refreshToken)
  const familyId = crypto.randomUUID();
  const refreshSession: RefreshSessionInput = {
    userId: user.id,
    familyId,
    tokenHash: hashValue(refreshToken),
    expiresAt,
  };
  const refsessionTest = await createRefreshSession(refreshSession);
  console.log("refsessionTest",refsessionTest);

  //const safeUser = excludePasswordHash(user);
  const safeUser: UserResponse = userResponseSchema.parse(user);
  return {
    user: safeUser,
    accessToken,
    refreshToken
  };
};

export const rotateRefreshSession = async (
  receivedRefreshToken: refreshInput,
) => {
  if (!verifyRefreshToken(receivedRefreshToken.refreshToken)) {
    throw new AppError(401, "Invalid refreshToken");
  }
  const hashedRefreshToken = hashValue(receivedRefreshToken.refreshToken);
  const session = await findSession(hashValue(hashedRefreshToken));

  if (!session) {
    throw new AppError(401, "Invalid refresh token");
  }

  if (session.revokedAt) {
    await revokeFamilySession(session.familyId);
    throw new AppError(401, "Invalid refresh token");
  }

  if (session.expiresAt < new Date()) {
    await revokeFamilySession(session.familyId);
    throw new AppError(401, "Invalid refresh token");
  }

  if (session.replacedById) {
    await revokeFamilySession(session.familyId);
    throw new AppError(401, "Invalid refresh token");
  }

  const existingUser = await getUserById(session.userId);
  //passwordHash is returned !!!
  if (!existingUser) {
    throw new AppError(404, "user was not found");
  }

  const { accessToken, refreshToken, expiresAt } =
    generateTokenPair(existingUser);
  await createRefreshSession({
    userId: session.userId,
    tokenHash: hashValue(refreshToken),
    familyId: session.familyId,
    expiresAt,
    replacedById: hashedRefreshToken,
  });
  return {
    accessToken,
    refreshToken,
  };
};

export const logout = async (receivedRefreshToken: refreshInput) => {
  if (!verifyRefreshToken(receivedRefreshToken.refreshToken)) {
    throw new AppError(401, "Invalid refresh token");
  }
  const hashedRefreshToken = hashValue(receivedRefreshToken.refreshToken);
  const session = await findSession(hashedRefreshToken);

  if (!session) {
    return {
      message: "already logged out",
    };
  }
  if (session.revokedAt) {
    return {
      message: "already logged out",
    };
  }

  if (session.expiresAt < new Date()) {
    return await updateRefreshSession(hashedRefreshToken, {
      revokedAt: new Date(),
    });
  }
};
