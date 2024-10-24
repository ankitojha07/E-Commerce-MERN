import { Request, Response } from "express";
import { Product } from "../models/cartModel";

export const addProduct = (req: Request, res: Response) => {
  const { name, price, description, seller, numberInStock } = req.body;
  const newProduct = new Product({
    name: name,
    description: description,
    price: price,
    image:
      "https://images.pexels.com/photos/707837/pexels-photo-707837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    seller: seller,
    numberInStock: numberInStock,
  });

  newProduct
    .save()
    .then((product) => {
      console.log("Product created:", product);
      res.status(200).json({ message: "done" });
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

export const addToCart = (req: Request, res: Response) => {
  return res.send("products");
};
