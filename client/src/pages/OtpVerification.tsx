import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyOtp: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    otp: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    axios
      .post("auth/verifyotp", formData)
      .then((response) => {
        setError(null);
        navigate("/home");
      })
      .catch((error) => {
        setError(error.response.data.message);
        setTimeout(() => {
          navigate(`/${error.response.data.next}`);
        }, 2000);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 shadow-md rounded-lg"
        style={{ backgroundColor: "#ccc" }}
      >
        <h2
          className="text-2xl font-semibold text-center mb-6"
          style={{ color: "#aaa" }}
        >
          Verify OTP
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Enter OTP
          </label>
          <input
            type="number"
            id="otp"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            style={{ backgroundColor: "#aaa" }}
            required
          />
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md text-white"
          style={{ backgroundColor: "#aaa" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
