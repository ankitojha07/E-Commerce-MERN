import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const forgetPassword = (e: React.FormEvent) => {
    const headers = {
      "x-otp": formData.otp,
    };
    e.preventDefault();
    axios
      .put("/auth/forget-password", formData, { headers })
      .then((response) => {
        setSuccess(response.data);
        setError(null);
        navigate("/login");
      })
      .catch((error) => {
        setError(error.response.data.message);
        setTimeout(async () => {
          navigate(`/${error.response.data.next}`);
        }, 2000);
      });
  };

  const sentOtp = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("/auth/resend-otp", formData)
      .then((response) => {
        setError(null);
        setSuccess(response.data);
        // navigate("/login");
      })
      .catch((error) => {
        setError(error.response.data.message);
        // setTimeout(async () => {
        //   navigate(`/${error.response.data.next}`);
        // }, 2000);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="w-full max-w-sm bg-[#ccc] p-6 shadow-md rounded-lg">
        <form onSubmit={sentOtp}>
          <h2
            className="text-2xl font-semibold text-center mb-6"
            style={{ color: "#aaa" }}
          >
            Reset Password
          </h2>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="flex justify-between">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-7/12 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                style={{ backgroundColor: "#aaa" }}
                required
              />
              <button className="w-4/12 text-sm bg-[#aaa] text-[#fff] rounded-md px-3 py-2">
                Send OTP
              </button>
            </div>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && (
              <p className="text-green-500 text-center mb-4">{success}</p>
            )}
          </div>
        </form>

        {/* 2nd form in this  */}
        <form onSubmit={forgetPassword}>
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
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              style={{ backgroundColor: "#aaa" }}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md text-white"
            style={{ backgroundColor: "#aaa" }}
          >
            Submit
          </button>
          <div className="mb-6 flex items-center justify-center mt-2">
            <p className="text-xs">
              Remember Passoword?{" "}
              <Link to="/login" className="text-[#aaa] text-xs">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
