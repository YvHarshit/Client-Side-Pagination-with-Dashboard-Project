
import type { NextFunction, Request, Response } from "express";

export const verifyCron = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secret = req.headers["x-cron-secret"];

  if (secret !== process.env.CRON_SECRET) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  next();
};