import React from "react";

const ProductCategories = () => {
  const products = [
    { name: "Fashion", image: "./images/ProductCategory/fashion.jpg" },
    { name: "Food", image: "./images/ProductCategory/food.jpg" },
    { name: "Home", image: "./images/ProductCategory/home.jpg" },
    { name: "Laptops", image: "./images/ProductCategory/laptops.jpg" },
    { name: "Phones", image: "./images/ProductCategory/phones.png" },
    { name: "Sports", image: "./images/ProductCategory/sports.jpg" },
    { name: "Sports", image: "./images/ProductCategory/sports.jpg" },
    { name: "Sports", image: "./images/ProductCategory/sports.jpg" },
    { name: "Sports", image: "./images/ProductCategory/sports.jpg" },
    { name: "Sports", image: "./images/ProductCategory/sports.jpg" },
    { name: "Sports", image: "./images/ProductCategory/sports.jpg" },
    { name: "Sports", image: "./images/ProductCategory/sports.jpg" },
    { name: "Sports", image: "./images/ProductCategory/sports.jpg" },
  ];
  return (
    <div className="flex overflow-x-auto space-x-4 mt-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {products.map((product, index) => (
        <div
          key={index}
          className="min-w-[150px] flex flex-col items-center bg-white shadow-lg rounded-md py-2"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-32 h-32 object-cover rounded-md"
          />
          <p className="mt-2 text-center text-sm font-semibold">
            {product.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductCategories;
