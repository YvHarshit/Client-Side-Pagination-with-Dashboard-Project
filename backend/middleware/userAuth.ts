import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


const userAuth = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token)   return res.status(401).json({ success: false, message: "Not authorized, login again" });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    req.userId = (decoded.id);
    next();
  } 
  catch (error: any) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default userAuth;