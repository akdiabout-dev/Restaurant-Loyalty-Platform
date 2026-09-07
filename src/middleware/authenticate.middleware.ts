import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../shared/utils/tokenHelper.js";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = verifyAccessToken(token);
    console.log(payload);
    if (
      typeof payload === "string" ||
      typeof payload.id !== "string" ||
      typeof payload.email !== "string"
    ) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = {
      id: payload.id,
      email: payload.email,
    };
  } catch (error) {
    return res.status(401).json({
      message: "Internal server error",
    });
  }

  next();
};
