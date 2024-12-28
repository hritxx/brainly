import { NextFunction, Request, Response } from "express";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];
  const jwt_secret = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(header as string, jwt_secret as string);
    if (decoded) {
      req.userId = (decoded as jwt.JwtPayload).id;
    }
    next();
  } catch (error) {
    res.status(403).json({ message: "You are not signed in." });
  }
};
