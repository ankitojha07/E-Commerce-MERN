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
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("auth/all-products");
        const fetchedProducts = response.data.products.map((product: any) => ({
          ...product,
          quantity: 0,
        }));
        setProducts(fetchedProducts);
        setLoader(true);
      } catch (err) {
        console.error(err); // Log the error for debugging
        setError("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      {loader ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col items-center gap-4 p-4 bg-slate-100 rounded-lg shadow-lg hover:shadow-2xl transition-shadow w-full"
            >
              <img
                // src={product.productImage || "https://via.placeholder.com/150"}
                src="https://via.placeholder.com/150"
                alt="product"
                className="w-full max-w-52 border"
              />
              <div className="text-center">
                <h1 className="font-bold text-lg">{product.name}</h1>
                <p className="font-light">{product.description}</p>
                <p className="font-semibold">INR {product.price}.00</p>
                <p className="font-light text-xs">ID: {product._id}</p>
              </div>
              <button className="bg-[#ccc] px-3 py-2 font-semibold rounded-md">
                Add to cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading Products ...</div>
      )}
    </>
  );
};

export default HomePage;
