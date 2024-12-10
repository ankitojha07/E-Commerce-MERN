import React from "react";
import TopDeals from "../TopDeals";

const fashionDeals = [
  {
    title: "Puma, Nike",
    url: "./images/ProductCategory/fashion.jpg",
    price: "min 40% off",
  },
  {
    title: "Best Selling styles",
    url: "./images/ProductCategory/fashion.jpg",
    price: "min 20% off",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
];

const topDeals = [
  {
    title: "Instax Cameras",
    url: "./images/ProductCategory/fashion.jpg",
    price: "min 40% off",
  },
  {
    title: "Best Selling styles",
    url: "./images/ProductCategory/fashion.jpg",
    price: "min 20% off",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
  {
    title: "Fashion",
    url: "./images/ProductCategory/fashion.jpg",
    price: "$456",
  },
];

const AllDeals = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 p-2 rounded-lg mt-4 bg-white ">
        <h1 className="font-semibold text-2xl">Fashion Deals</h1>
        <div className="flex overflow-x-auto space-x-4 mt-4 scrollbar-track-gray-200 ">
          {fashionDeals.map((data, key) => (
            <TopDeals url={data.url} title={data.title} price={data.price} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 p-2 rounded-lg mt-4 bg-white ">
        <h1 className="font-semibold text-2xl">Top Deals</h1>
        <div className="flex overflow-x-auto space-x-4 mt-4 scrollbar-track-gray-200 ">
          {topDeals.map((data, key) => (
            <TopDeals url={data.url} title={data.title} price={data.price} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDeals;
