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
        <div className="flex gap-12 flex-wrap flex-col md:flex-row justify-between">
          {products.map((product) => (
            <div className="flex flex-row gap-2 p-2 rounded-lg w-3/12 ">
              <div>
                <img src="" alt="product" className="w-20 border p-2" />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-lg">{product.name}</h1>
                <p className="font-light">{product.description}</p>
                <p className="font-semibold">INR {product.price}.00</p>
                <p className="font-light text-xs">ID:{product._id}</p>
                <button className="bg-[#ccc] px-3 py-2 w-40 font-semibold">
                  Add to cart
                </button>
              </div>
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
