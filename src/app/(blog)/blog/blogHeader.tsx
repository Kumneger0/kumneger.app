import Link from "next/link";
import React, { useEffect } from "react";
import NextProgress from "next-progress";

function blogHeader() {





  return (<>
    <header className="bg-gray-800 p-5  w-full z-50 overflow-x-hidden">
      <nav className="flex items-center justify-between flex-wrap w-4/5 max-w-7xl mx-auto lg:gap-20">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link
            href="/"
            className="group text-white max-[500px]:text-lg flex  items-center gap-2 text-2xl transition duration-300 font-serif">
            Kumneger
            <span className="block z-50 max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
          </Link>
        </div>
      </nav>
    </header>
  </>
  );
}

export default blogHeader;
