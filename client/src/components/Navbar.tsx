import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex flex-row justify-between py-2 flex-wrap w-full">
      <Link
        to="/"
        className="w-6/12 text-xl hover:font-extrabold font-bold justify-center italic m-auto"
      >
        Cart APP
      </Link>
      <nav className=" flex w-1/3 text-md md:text-lg mt-2 justify-end">
        <ul className="hidden md:flex justify-between gap-4 w-full">
          <li className="hover:font-bold hover:text-[#000]">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:font-bold hover:text-[#000]">
            <Link to="/cart">My Cart</Link>
          </li>
          <li className="hover:font-bold hover:text-[#000]">
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
        <button onClick={toggleMenu} className="md:hidden">
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>
      {isOpen && (
        <div className="flex justify-center w-full">
          <ul className="md:hidden flex flex-col basis-full items-center justify-center gap-4 mt-10">
            <li className="hover:font-bold hover:text-[#000]">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:font-bold hover:text-[#000]">
              <Link to="/cart">My Cart</Link>
            </li>
            <li className="hover:font-bold hover:text-[#000]">
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
