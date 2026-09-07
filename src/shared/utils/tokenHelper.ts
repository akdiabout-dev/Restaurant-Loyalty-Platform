import jwt from "jsonwebtoken";
import { generateRandomToken } from "./hashHelper.js";
import { env } from "../../config/env.js";
import { LoginInput } from "../../models/core/users/auth/auth.types.js";
import { UserResponse } from "../../models/core/users/user.types.js";


const getUserPayload = (user: any) => {
  if (!user.id) {
    throw new Error("User id is required to generate a token");
  }

  return {
    id: user.id,
    email: user.email.toLowerCase(),
  };
};

// ACCESS TOKEN
const createAccessToken = (user: UserResponse) => {
  console.log("i am in token generation");
  return jwt.sign(
    
    getUserPayload(user),
    env.JWT_ACCESS_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_AT,
    } as jwt.SignOptions
  );
};

// REFRESH TOKEN
const createRefreshToken = (user: UserResponse) => {
  const payload = {
    ...getUserPayload(user),

    // unique value for this refresh token
    jti: generateRandomToken(),
  };

  return jwt.sign(
    payload,
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_AT,
    } as jwt.SignOptions
  );
};

// VERIFY ACCESS TOKEN
const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET);
};

// VERIFY REFRESH TOKEN
const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
};

const getRefreshTokenExpiresAt = (refreshToken : string)=>{
    const decoded = jwt.decode(refreshToken);

  if (!decoded || typeof decoded === "string" || !decoded.exp) {
    throw new Error("Invalid refresh token expiration");
  }
  return new Date(decoded.exp * 1000)
}

const generateTokenPair = (user: UserResponse) => {
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
  
  return {
    accessToken,
    refreshToken,
    expiresAt: getRefreshTokenExpiresAt(refreshToken),
    //refreshTokenExpiresAt: new Date(decoded.exp * 1000),
  };
};

export {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateTokenPair,
  getRefreshTokenExpiresAt,
};