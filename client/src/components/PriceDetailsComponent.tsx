import React from "react";
import { useNavigate } from "react-router-dom";

interface PriceDetailsProps {
  totalPrice: number;
}

const PriceDetails: React.FC<PriceDetailsProps> = ({ totalPrice }) => {
  const discount = totalPrice > 300 ? 45.0 : 0;
  const deliveryCharges = 50.0;
  const packagingFee = 15.0;
  const finalAmount = totalPrice - discount + deliveryCharges + packagingFee;

  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="border border-[#ccc] rounded-md p-2 w-full md:w-5/12 lg:w-4/12 flex flex-col gap-2 max-h-64 md:fixed md:mr-1 right-0">
      <h1 className="text-[#aaa] font-semibold uppercase">Price Details</h1>
      <div className="h-[1px] bg-[#aaa]"></div>
      <div className="flex flex-row justify-between text-sm font-medium">
        <p>Price ({totalPrice})</p>
        <p>₹{totalPrice.toFixed(2)}</p>
      </div>
      <div className="flex flex-row justify-between text-sm font-medium">
        <p>Discount</p>
        <p>₹{discount.toFixed(2)}</p>
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
        className="bg-[#aaa] px-2 py-1 font-semibold text-[#fff] text-lg"
        onClick={handleCheckout}
      >
        Checkout
      </button>
    </div>
  );
};

export default PriceDetails;
