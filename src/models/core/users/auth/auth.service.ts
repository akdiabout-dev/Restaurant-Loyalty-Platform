import {
    create,
    findByEmail,
    createRefreshSession,
} from "./auth.repository.js";
import { AppError } from "../../../../shared/errors/appError.js";
import {
    RegisterInput,
    LoginInput,
    refreshInput,
    changePasswordInput,
    RefreshSessionInput,
}from "./auth.types.js";

import { comparePassword, hashPassword, hashValue,createHash } from "../../../../shared/utils/hashHelper.js";
import { generateTokenPair } from "../../../../shared/utils/tokenHelper.js";
 
const excludePasswordHash = <T extends { passwordHash: string }>(
  user: T
): Omit<T, "passwordHash"> => {
  const { passwordHash, ...safeUser } = user;

  return safeUser;
};

const register = async(data:RegisterInput)=>{
    const existingUser = await findByEmail(data.email);
    if(existingUser){
        throw new AppError(409,"Email already exist !");
    }
    return create(
        {
            ...data,
        }
    )
};

const login = async (data: LoginInput) => {
  const user = await findByEmail(data.email);

  if (!user) {
    throw new AppError(401, "Invalid Email or Password");
  }

  const isPasswordValid = await comparePassword(
    data.password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new AppError(401, "Invalid Email or Password");
  }

  const {
    accessToken,
    refreshToken,
    expiresAt
  } = generateTokenPair(user);

  const safeUser = excludePasswordHash(user);

  return {
    user: safeUser,
    accessToken,
    refreshToken,
  };
};