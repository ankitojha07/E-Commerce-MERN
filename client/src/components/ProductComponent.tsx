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
  colors = "Not specified",
  seller,
  image = `https://images.pexels.com/photos/707837/pexels-photo-707837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
  oldPrice,
  newPrice,
  updateQuantity,
  availQuantity,
}) => {
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
    <div className="border border-[#ccc] rounded-md p-2 w-full flex justify-center items-center">
      <div className="flex w-full flex-col md:flex-row gap-4">
        <img
          src={image}
          alt={name}
          className="border rounded-md w-32 h-32 object-cover"
        />
        <div className="flex flex-col justify-between w-full">
          <div className="product-info flex flex-col justify-around gap-1">
            <p className="font-bold text-lg">{name}</p>
            <p className="text-xs font-medium">{description}</p>
            <p className="text-xs font-light">Color: {colors}</p>
            <p className="text-xs font-light">Seller: {seller}</p>
            <div className="flex flex-row gap-2">
              <del className="text-xs font-light">₹{oldPrice.toFixed(2)}</del>
              <p className="text-xs font-bold" id="newPrice">
                ₹{newPrice.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex flex-col w-[112px] sm:flex-row gap-4 mt-2 items-center">
            <div className="flex flex-row gap-2 items-center">
              <button
                className="bg-[#aaa] text-white px-3 py-1 text-sm font-semibold"
                onClick={removeProduct}
              >
                -
              </button>
              <input
                name="quantitu"
                type="number"
                className="w-8 text-xs text-center text-[#000] font-bold"
                max={availQuantity}
                min="0"
                value={productQuantity}
                onChange={handleQuantityChange}
              />
              <button
                className="bg-[#aaa] text-white px-3 py-1 text-sm font-semibold"
                onClick={addProduct}
              >
                +
              </button>
            </div>
            <button
              className="bg-[#aaa] text-white px-3 py-1 text-sm font-semibold"
              onClick={removeItem}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
