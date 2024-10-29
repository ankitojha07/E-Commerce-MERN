import { Request, Response } from "express";
import { Product } from "../models/cartModel";
import User, { Iuser } from "../models/userModel";
import mongoose from "mongoose";

interface ProfileRequest extends Request {
  user?: Iuser;
}

export const addProduct = (req: Request, res: Response) => {
  const { name, price, description, seller, numberInStock, image } = req.body;
  const newProduct = new Product({
    name: name,
    description: description,
    price: price,
    image: image,
    seller: seller,
    numberInStock: numberInStock,
  });

  newProduct
    .save()
    .then((product) => {
      console.log("Product created:", product);
      const d = typeof image;

      res.status(200).json({ message: `Done ${d}` });
    })
    .catch((error) => {
      console.error("Error creating product:", error);
    });
};

export const fetchProducts = (req: Request, res: Response) => {
  try {
    Product.find({})
      .then((products) => {
        if (!products) {
          res.status(400).json({ message: "No Product found!" });
        }
        res.status(200).json({ products });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products", error });
      });
  } catch (error) {}
};

export const fetchUsersCart = async (req: ProfileRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const { id } = req.user;
    const user = await User.findOne({ _id: id }).exec();

    if (!user) {
      return res.status(400).json({ message: "User not found", next: "home" });
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
      const item = cartItems.find((cartItem) =>
        new mongoose.Types.ObjectId(product.id).equals(product._id)
      );
      return {
        product,
        quantity: item ? item.quantity : 1,
      };
    });
    // console.log(cartWithDetails);

    return res.status(200).json({ cart: cartWithDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
