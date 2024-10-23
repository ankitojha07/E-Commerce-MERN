import { Router } from "express";
import { Request, Response } from "express";
import {
  forgetPassword,
  registerUser,
  resendOtp,
  userLogin,
  verifyEmailOtp,
} from "../controllers/authController";
import { addProduct, fetchProducts } from "../controllers/productController";

const router = Router();
router.post("/register", (req: Request, res: Response) => {
  registerUser(req, res);
});
router.post("/verifyotp", (req: Request, res: Response) => {
  verifyEmailOtp(req, res);
});

router.post("/resend-otp", (req: Request, res: Response) => {
  resendOtp(req, res);
});

router.post("/login", (req: Request, res: Response) => {
  userLogin(req, res);
});

router.put("/forget-password", (req: Request, res: Response) => {
  forgetPassword(req, res);
});

router.post("/addItems", (req: Request, res: Response) => {
  addProduct(req, res);
});

router.get("/all-products", (req: Request, res: Response) => {
  fetchProducts(req, res);
});

export default router;
