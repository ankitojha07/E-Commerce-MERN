import { NextFunction, Router } from "express";
import { Request, Response } from "express";

import //   removeProduct,
"../controllers/cartController";
import { authMiddleware } from "../middleware/authMiddleware";

const cartRouter = Router();

cartRouter.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("MW runs");
    next();
  },
  (req: Request, res: Response) => {
    res.status(200).json({ message: "Protected route accessed" });
  }
);

export default cartRouter;
