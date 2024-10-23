import mongoose from "mongoose";

interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

interface ICart {
  items: ICartItem[];
  totalPrice: number;
}

const cartSchema = new mongoose.Schema<ICart>({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  seller: { type: String, required: true },
  price: { type: Number, required: true },
  numberInStock: { type: Number, required: true },
  productImage: { type: Array, required: true, default: [] },
  creationDate: { type: Date, default: Date.now },
});

export const Product = mongoose.model("Product", ProductSchema);

const cartItem = mongoose.model("Cart", cartSchema);
export default cartItem;
