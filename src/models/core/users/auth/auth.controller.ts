import { NextFunction, Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service.js";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await registerUser(
      req.body,
      req.file);

    return res.status(201).json({
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await loginUser(req.body);
    return res.json({
      user: user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
