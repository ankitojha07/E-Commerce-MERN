import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import the pages and the Navbar
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/Error404";
import VerifyOtp from "./pages/OtpVerification";
import ResetPassword from "./pages/ResetPassword";
import Checkout from "./pages/Checkout";

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 overflow-hidden block px-4 md:px-12">
      <Router>
        <div className="fixed top-0 left-0 right-0 bg-[#aaa] z-50 px-4 md:px-12">
          <Navbar />
        </div>
        <div className="mt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
