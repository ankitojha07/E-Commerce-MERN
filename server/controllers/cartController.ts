import { Request, Response } from "express";
import User, { Iuser } from "../models/userModel";
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

    const user = await User.findById(id);
    console.log(user?.toJSON());

    if (!user) {
      return res.status(400).json({ message: "user not found", next: "home" });
    }

    if (!mongoose.Types.ObjectId.isValid(pId)) {
      return res.status(400).send("Invalid product ID");
    }

    const existingProductIndex = user.cart.findIndex(
      (item: any) => item.productId._id.toString() === pId
    );

    if (existingProductIndex !== -1) {
      user.cart[existingProductIndex].quantity += 1;

      await user.save();

      return res.status(200).json({
        message: "Product quantity updated successfully",
        next: "home",
      });
    } else {
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
    }
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: "Failed to update cart", next: "home" });
  }
};
