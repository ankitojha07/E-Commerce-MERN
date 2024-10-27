import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#aaa] text-black py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Website Name. All rights
          reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Link to="/about" className="text-[#000] hover:text-white">
            About
          </Link>
          <Link to="/contact" className="text-[#000] hover:text-white">
            Contact
          </Link>
          <Link to="/privacy" className="text-[#000] hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
