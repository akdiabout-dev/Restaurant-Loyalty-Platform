import { Request, Response, NextFunction } from "express";
import { getMyProfile } from "./user.service.js";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user?.id;
    console.log(id);
    if (!id) {
      return res.status(400).json({
        message: "Make sure to login first",
      });
    }

    const user = await getMyProfile({ id });
    if (!user) {
      return res.status(404).json({
        message: "User was not found",
      });
    }

    return res.json({
        user: user,
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
