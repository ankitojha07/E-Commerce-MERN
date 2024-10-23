import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("/auth/login", formData)
      .then((response) => {
        setError(null);
        localStorage.setItem("jwt", response.data.token);
        navigate("/home");
      })
      .catch((error) => {
        setError(error.response.data.message);
        setTimeout(async () => {
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
          Log In
        </h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            style={{ backgroundColor: "#aaa" }}
            required
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center m-auto">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <Link to="/reset-password" className="text-[#aaa] text-xs">
              Forget Password?
            </Link>
          </div>

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

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md text-white"
          style={{ backgroundColor: "#aaa" }}
        >
          Submit
        </button>
        <div className="mb-6 flex items-center justify-center mt-2">
          <p className="text-xs">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#aaa] text-xs">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
