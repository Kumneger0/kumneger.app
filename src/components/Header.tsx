import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="h-16 w-4/5 mx-auto flex justify-between">
      <div className="m-4 text-white font-serif">Kumneger Wondimu</div>
      <div className="flex space-x-4 justify-end m-4 gap-3">
        <button className="text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-center">
          Projects
        </button>
        <button className="text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-center">
          Work
        </button>
        <button className="text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-center">
          About Me
        </button>
        <button className="text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-center">
          <Link href="/blog">Blog</Link>
        </button>
        <button className="text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-center">
          Contact Me
        </button>
      </div>
    </div>
  );
};

function Header() {
  return (
    <div className="w-screen bg-black bg-opacity-90 fixed z-10">
      {" "}
      <Navbar />{" "}
    </div>
  );
}

export default Header;
