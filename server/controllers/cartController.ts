import e, { Request, Response } from "express";
import Cart from "../models/cartModel";
import User, { Iuser } from "../models/userModel";
import Product from "../models/cartModel";
import mongoose, { Types } from "mongoose";

interface ProfileRequest extends Request {
  user?: Iuser;
}

export const addToCart = async (req: ProfileRequest, res: Response) => {
  if (!req.user) {
    console.log("ye nhi mila");

    return res.status(401).json({ message: "Unauthorized access" });
  }
  try {
    const { id } = req.user;
    const { pId } = req.body;
    if (!pId) {
      res.status(400).json({ error: "Product ID is required" });
    }

    const user = User.findById(id);

    if (!user) {
      return res.status(400).json({ message: "user not found", next: "home" });
    }

    if (!mongoose.Types.ObjectId.isValid(pId)) {
      return res.status(400).send("Invalid product ID");
    }

    const addProduct = await user.updateOne(
      {
        _id: id,
      },
      {
        $push: {
          cart: {
            productId: new Types.ObjectId(pId),
            quantity: 1,
          },
        },
      }
    );

    if (addProduct.modifiedCount > 0) {
      return res.status(200).json({ message: "Added to cart", next: "home" });
    } else {
      return res.status(400).json({ message: "Product already in cart" });
    }
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: "Failed to update cart", next: "home" });
  }
};
