import { Request, Response } from "express";
import User from "../models/userModel";
import cartItem from "../models/cartModel";
import Product from "../models/cartModel";

declare module "express" {
  interface Request {
    user?: {
      id: string;
      email: string;
    };
  }
}
