import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];
  if (!header) {
    res.status(403).json({ message: "Authorization header missing." });
  }

  const jwt_secret = process.env.JWT_SECRET!;
  try {
    const decoded = jwt.verify(header as string, jwt_secret as string);
    if (decoded) {
      //@ts-ignore
      req.userId = decoded;
      next();
    } else {
      res.status(403).json({ message: "error" });
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid token." });
  }
};
