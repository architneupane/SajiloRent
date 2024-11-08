import React from "react";
import logo from "../images/logo.png";
import { FaSearch } from "react-icons/fa";

function Navbar() {
  return (
    <div>
      {/* div containing logo and search */}
      <div className="flex justify-between px-28 bg-zinc-900 ">
        {/* div containing logo */}
        <div className="flex items-center ">
          <img className="w-28" src={logo} alt="error" />
          <h1 className="text-5xl ">Docly</h1>
        </div>
        {/* div containing search */}
        <div className="flex items-center">
          <div className="flex items-center bg-zinc-950 pr-10 border-solid border-gray-400 border rounded-md pl-2 mr-10 ">
            <i>
              <FaSearch />
            </i>
            <input
              className="h-8 w-[350px] bg-transparent outline-none pl-2"
              type="text"
              placeholder="Search here...."
            />
          </div>
          {/* div containing account */}
          <h3 className="w-full h-11 px-3 pt-[10px] bg-red-500 rounded-full font-semibold">
            AN
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
