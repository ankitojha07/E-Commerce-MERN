import axios from "axios";
import React, { useEffect, useState } from "react";
import Slideshow from "../components/Slideshow";
import { FaCartPlus } from "react-icons/fa";
import ProductCategories from "../components/ProductCategories";
import AllDeals from "../components/Deals/AllDeals";

interface ProductData {
  _id: string;
  name: string;
  description: string;
  seller: string;
  image: string;
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
        const response = await axios.get("/product/all-products");
        const fetchedProducts = response.data.products.map((product: any) => ({
          ...product,
          quantity: 0,
        }));
        setProducts(fetchedProducts);
        setLoader(true);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  const addProductToCart = async (productId: string) => {
    try {
      const jwt = localStorage.getItem("jwt");

      if (!jwt) {
        setError("User not authenticated");
        return;
      }

      const data = {
        pId: productId,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };

      await axios.post("/product/add", data, config);
      // console.log(response.data);
    } catch (error: any) {
      console.error(
        "Error adding product to cart:",
        error.response?.data || error.message
      );
      setError("Failed to add product to cart");
    }
  };

  if (error) {
    return <div className="mt-10">{error}</div>;
  }
  return (
    <>
      <Slideshow />
      <ProductCategories />
      {loader ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col items-start gap-4 p-4 bg-slate-100 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              <img
                src={product.image}
                alt="product"
                className="w-full h-64 border"
              />
              <div className="text-start">
                <h1 className="font-bold text-lg">{product.name}</h1>
                <p className="font-light">
                  {product.description.length > 20
                    ? `${product.description.substring(0, 30)}`
                    : `${product.description}...`}
                </p>
                <p className="font-semibold">INR {product.price}.00</p>
                <p className="font-light text-xs">ID: {product._id}</p>
              </div>
              <div className="flex justify-center items-center gap-2 bg-[#ccc] px-3 py-2 font-semibold rounded-md">
                <FaCartPlus />
                <button onClick={() => addProductToCart(product._id)}>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10">Loading Products ...</div>
      )}
      <AllDeals />
    </>
  );
};

export default HomePage;
