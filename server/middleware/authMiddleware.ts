// authMiddleware.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    res.status(400).json({ message: "No auth header fiun" });
  }
  const token = authHeader!.split(" ")[1];
  console.log("done this part 1");

  if (!token) {
    res
      .status(401)
      .json({ message: "No token, authorization denied", next: "home" });
  }
  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as {
      userId: string;
      email: string;
    };

    req.user = { id: decoded.userId, email: decoded.email };

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token", next: "home" });
  }
};
