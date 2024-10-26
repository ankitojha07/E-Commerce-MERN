import { NextFunction, Router } from "express";
import { Request, Response } from "express";

import "../controllers/cartController";
import {
  addProduct,
  addToCart,
  fetchProducts,
} from "../controllers/productController";

const cartRouter = Router();

// cartRouter.get(
//   "/",
//   (req: Request, res: Response, next: NextFunction) => {
//     console.log("MW runs");
//     next();
//   },
//   (req: Request, res: Response) => {
//     res.status(200).json({ message: "Protected route accessed" });
//   }
// );

cartRouter.post("/addItems", (req: Request, res: Response) => {
  addProduct(req, res);
});

cartRouter.post("/add-to-cart", (req: Request, res: Response) => {
  addToCart(req, res);
});

cartRouter.get("/all-products", (req: Request, res: Response) => {
  fetchProducts(req, res);
});

export default cartRouter;
