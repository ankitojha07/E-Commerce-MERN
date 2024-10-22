import axios from "axios";
import React, { useEffect, useState } from "react";

interface ProductData {
  _id: string;
  name: string;
  description: string;
  seller: string;
  productImage: string;
  price: number;
  numberInStock: number;
  quantity: number;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/auth/all-products"
        );
        const fetchedProducts = response.data.products.map((product: any) => ({
          ...product,
          quantity: 0,
        }));
        setProducts(fetchedProducts);
      } catch (err) {
        console.error(err); // Log the error for debugging
        setError("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="">
      <h1>Home Page</h1>
      <p>Welcome to the homepage!</p>
    </div>
  );
};

export default HomePage;
