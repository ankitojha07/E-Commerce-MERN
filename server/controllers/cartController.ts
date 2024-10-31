import { Request, Response } from "express";
import User, { Iuser } from "../models/userModel";
import mongoose, { Types } from "mongoose";
import { Product } from "../models/cartModel";

interface ProfileRequest extends Request {
  user?: Iuser;
}

export const addToCart = async (req: ProfileRequest, res: Response) => {
  // Step 1: Check if the user is authenticated
  if (!req.user) {
    console.log("Step 1: Unauthorized access");
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const { id } = req.user;
    const { pId } = req.body;

    // Step 2: Check if Product ID is provided
    if (!pId) {
      console.log("Step 2: Product ID is required");
      return res.status(400).json({ error: "Product ID is required" });
    }

    // Step 3: Validate the Product ID
    if (!mongoose.Types.ObjectId.isValid(pId)) {
      console.log("Step 3: Invalid product ID");
      return res.status(400).json({ error: "Invalid product ID" });
    }

    // Step 4: Check if the product exists
    const productExists = await Product.findById(pId);
    if (!productExists) {
      console.log("Step 4: Product not found");
      return res.status(404).json({ message: "Product not found" });
    }

    // Step 5: Fetch the user by ID
    const user = await User.findById(id);
    if (!user) {
      console.log("Step 5: User not found");
      return res.status(404).json({ message: "User not found", next: "home" });
    }

    // Step 6: Check if the product is already in the cart
    const existingProductIndex = user.cart.findIndex(
      (item: any) => item.productId.toString() === pId
    );
    console.log("Step 6: Existing product index", existingProductIndex);

    if (existingProductIndex !== -1) {
      // Step 7: Update quantity if product already in cart
      user.cart[existingProductIndex].quantity += 1;
      await user.save();
      console.log("Step 7: Product quantity updated successfully");

      return res.status(200).json({
        message: "Product quantity updated successfully",
        next: "home",
      });
    } else {
      // Step 8: Add product to cart if not already present
      const addProduct = await user.updateOne(
        { _id: id },
        {
          $push: {
            cart: {
              productId: new mongoose.Types.ObjectId(pId),
              quantity: 1,
            },
          },
        }
      );
      console.log("Step 8: Add product result", addProduct);

      user.cart.push({
        productId: new mongoose.Types.ObjectId(pId),
        quantity: 1,
      });
      await user.save();

      if (addProduct.modifiedCount > 0) {
        console.log("Step 8: Product added to cart successfully");
        return res.status(200).json({ message: "Added to cart", next: "home" });
      } else {
        console.log("Step 8: Failed to add product to cart");
        return res
          .status(400)
          .json({ message: "Failed to add product to cart" });
      }
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res
      .status(500)
      .json({ message: "Failed to update cart", next: "home" });
  }
};

export const fetchUsersCart = async (req: ProfileRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  console.log("running");

  try {
    const { id } = req.user;
    const user = await User.findOne({ _id: id }).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found", next: "home" });
    }

    if (!Array.isArray(user.cart) || user.cart.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    const cartItems = user.cart.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    const productIds = cartItems.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } }).exec();

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found in cart!" });
    }

    const cartWithDetails = products.map((product) => {
      const item = cartItems.find(
        (cartItem) => cartItem.productId.toString() === product._id.toString()
      );
      return {
        product,
        quantity: item ? item.quantity : 0, // handle missing items gracefully
      };
    });
    console.log(cartWithDetails);

    return res.status(200).json({ cart: cartWithDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
