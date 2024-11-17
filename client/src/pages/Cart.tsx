import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Product from "../components/ProductComponent";
import PriceDetails from "../components/PriceDetailsComponent";
import { Link } from "react-router-dom";

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

const CartPage: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loader, setLoader] = useState(true); // Set loader to true initially
  const [logInStatus, setLogInStatus] = useState<Boolean>(false);
  const [logOutStatus, setLogOutStatus] = useState<Boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    // Check if the user is logged in
    const checkLogin = () => {
      if (token) {
        setLogInStatus(true);
        setLogOutStatus(false);
      } else {
        setLogInStatus(false);
        setLogOutStatus(true);
      }
    };
    checkLogin();

    const fetchProducts = async () => {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        setLoader(false);
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
        const response = await axios.get("product/cart", config);
        if (!response.data.cart || !Array.isArray(response.data.cart)) {
          setLoader(false);
          return;
        }

        const fetchedProducts = response.data.cart.map((cartItem: any) => ({
          _id: cartItem.product._id,
          name: cartItem.product.name,
          description: cartItem.product.description,
          seller: cartItem.product.seller,
          image: cartItem.product.image,
          price: cartItem.product.price,
          numberInStock: cartItem.product.numberInStock,
          quantity: cartItem.quantity,
        }));

        setProducts(fetchedProducts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoader(false); // Stop the loader after data is fetched
      }
    };

    fetchProducts();
  }, []);

  const calculateTotalPrice = useCallback(() => {
    const t = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setTotalPrice(t);
  }, [products]);

  useEffect(() => {
    calculateTotalPrice();
  }, [products, calculateTotalPrice]);

  const updateQuantity = (id: string, quantity: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id ? { ...product, quantity } : product
      )
    );
  };

  return (
    <>
      {loader && <div className="mt-10">Loading Products...</div>}
      {logOutStatus && (
        <div className="flex flex-col gap-3 justify-center items-center text-xl font-thin h-96">
          <p>To view your cart, you have to log in first.</p>
          <div className="flex flex-row gap-3">
            <Link to="/login" className="bg-gray-400 px-3 py-2 rounded-lg">
              Login
            </Link>
            {/* <Link to="/signup" className="bg-gray-400 px-3 py-2 rounded-lg">
              SignUp
            </Link> */}
          </div>
        </div>
      )}

      {logInStatus && (
        <div className="h-full mb-10">
          <h1 className="text-2xl font-bold">Product Cart Page</h1>
          <div className="flex flex-col md:flex-row justify-between mt-3 gap-2">
            <div className="md:w-6/12 lg:w-8/12 w-full flex flex-col gap-2">
              {products.map((product) => (
                <Product
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  description={product.description}
                  seller={product.seller}
                  image={product.image}
                  oldPrice={product.price * 1.2}
                  newPrice={product.price}
                  availQuantity={product.numberInStock}
                  colors="test"
                  updateQuantity={updateQuantity}
                  quantity={product.quantity}
                />
              ))}
            </div>

            <PriceDetails totalPrice={totalPrice} />
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
