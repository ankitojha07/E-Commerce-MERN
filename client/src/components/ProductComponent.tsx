import React, { useState } from "react";

interface ProductProps {
  id: string;
  name: string;
  description: string;
  colors: string;
  seller: string;
  image: string;
  oldPrice: number;
  newPrice: number;
  updateQuantity: (id: string, quantity: number) => void;
  availQuantity: number;
}

const Product: React.FC<ProductProps> = ({
  id,
  name,
  description,
  colors,
  seller,
  image,
  oldPrice,
  newPrice,
  updateQuantity,
  availQuantity,
}) => {
  console.log("Image URL:", image);
  const [productQuantity, setProductQuantity] = useState<number>(0);

  const removeProduct = () => {
    if (productQuantity > 0) {
      const newQuantity = productQuantity - 1;
      setProductQuantity(newQuantity);
      updateQuantity(id, newQuantity);
    }
  };

  const addProduct = () => {
    if (productQuantity < availQuantity) {
      const newQuantity = productQuantity + 1;
      setProductQuantity(newQuantity);
      updateQuantity(id, newQuantity);
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value, 10);
    if (isNaN(value) || value < 0) value = 0;
    if (value > availQuantity) value = availQuantity;
    setProductQuantity(value);
    updateQuantity(id, value);
  };

  const removeItem = () => {
    setProductQuantity(0);
    updateQuantity(id, 0);
  };

  return (
    <div className="border border-[#ccc] rounded-md p-4 w- grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white items-center justify-center">
      <img
        src={image}
        alt={name}
        className="w-36 h-36 object-contain rounded-md"
      />

      <div className="product-info space-y-1">
        <p className="font-bold text-lg">{name}</p>
        <p className="text-sm font-medium text-gray-600">{description}</p>
        <p className="text-sm text-gray-500">Color: {colors}</p>
        <p className="text-sm text-gray-500">Seller: {seller}</p>
        <div className="flex items-center space-x-2">
          <del className="text-sm text-gray-400">₹{oldPrice.toFixed(2)}</del>
          <p className="text-sm font-bold text-black">₹{newPrice.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="bg-gray-300 text-gray-700 px-3 py-1 text-sm font-semibold rounded-md"
          onClick={removeProduct}
        >
          -
        </button>
        <input
          name="quantity"
          type="number"
          className="w-10 text-center text-sm border border-gray-300 rounded-md"
          max={availQuantity}
          min="0"
          value={productQuantity}
          onChange={handleQuantityChange}
        />
        <button
          className="bg-gray-300 text-gray-700 px-3 py-1 text-sm font-semibold rounded-md"
          onClick={addProduct}
        >
          +
        </button>
      </div>
      <button
        className="bg-[#aaa] text-white px-4 py-1 w-36 md:w-full text-sm font-semibold rounded-md"
        onClick={removeItem}
      >
        Remove
      </button>
    </div>
  );
};

export default Product;
