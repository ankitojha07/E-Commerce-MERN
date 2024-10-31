import React from "react";
import { useNavigate } from "react-router-dom";

interface PriceDetailsProps {
  totalPrice: number;
}

const PriceDetails: React.FC<PriceDetailsProps> = ({ totalPrice }) => {
  const discount = totalPrice > 300 ? 45.0 : 0;
  const subTotal = totalPrice - discount;
  const tax = subTotal * 0.18;
  let deliveryCharges;
  if (totalPrice >= 2000) {
    deliveryCharges = 0;
  } else if (totalPrice <= 0) {
    deliveryCharges = 0;
  } else {
    deliveryCharges = 50;
  }
  const packagingFee = totalPrice > 0 ? 10.0 : 0;
  const finalAmount = subTotal + tax + deliveryCharges + packagingFee;

  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="border border-[#ccc] rounded-md p-2 w-full md:w-5/12 lg:w-4/12 flex flex-col gap-2 md:fixed md:mr-1 right-0">
      <h1 className="text-[#aaa] font-semibold uppercase">Price Details</h1>
      <div className="h-[1px] bg-[#aaa]"></div>
      <div className="flex flex-row justify-between text-sm font-medium">
        <p>Price ({totalPrice})</p>
        <p>₹{totalPrice.toFixed(2)}</p>
      </div>
      <div className="flex flex-row justify-between text-sm font-medium">
        <p>Discount</p>
        <p>- ₹{discount.toFixed(2)}</p>
      </div>
      <hr />
      <div className="flex flex-row justify-between text-sm font-bold">
        <p>Sub Total</p>
        <p>₹{subTotal.toFixed(2)}</p>
      </div>
      <hr />

      <div className="flex flex-row justify-between text-sm font-medium">
        <p>Tax</p>
        <p>₹{tax.toFixed(2)}</p>
      </div>
      <div className="flex flex-row justify-between text-sm font-medium">
        <p>Delivery Charges</p>
        <p>₹{deliveryCharges.toFixed(2)}</p>
      </div>
      <div className="flex flex-row justify-between text-sm font-medium">
        <p>Packaging Fee</p>
        <p>₹{packagingFee.toFixed(2)}</p>
      </div>
      <div className="flex flex-row justify-between text-lg font-bold">
        <p>Total Amount</p>
        <p>₹{finalAmount.toFixed(2)}</p>
      </div>
      <button
        type="submit"
        className="bg-[#aaa] px-2 py-1 font-semibold text-[#fff] text-lg rounded-lg"
        onClick={handleCheckout}
      >
        Checkout
      </button>
    </div>
  );
};

export default PriceDetails;
