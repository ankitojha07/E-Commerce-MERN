import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between py-2">
      <Link to="/" className="w-6/12 text-md md:text-2xl font-thin italic">
        Cart App
      </Link>
      <nav className=" flex justify-end w-4/12 md:w-2/12 text-md md:text-lg mt-2">
        <ul className="flex justify-between gap-4 w-full">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
