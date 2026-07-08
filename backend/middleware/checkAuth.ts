import type { NextFunction, Request, Response } from "express";
import AuthUser from "../models/auth.model.js";

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {

    console.log("checkAuth Calling")

  const userId = (req).userId;

  const user = await AuthUser.findOne({ userId: Number(userId) });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  if (!user.isAuthenticated) {
    return res.status(403).json({
      success: false,
      message: "Only authenticated users can add an employee",
    });
  }

  next();
};

export default checkAuth;