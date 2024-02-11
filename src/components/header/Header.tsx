"use client";
import Link from "next/link";
import { Button } from "../ui/button";
function Navbar1() {
  return (
    <header className="flex gap-10 justify-between items-center max-w-7xl p-5 w-full mx-auto z-50 overflow-x-hidden top-0">
      <div className="flex items-center flex-shrink-0 text-white">
        <Link
          href="/"
          className="group text-white  text-2xl flex  items-center gap-2  transition duration-300 font-serif"
        >
          Kumneger
          <span className="block z-50 max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
        </Link>
      </div>
      <div className="flex w-1/2 items-start">
        <div>
          <Button variant={"link"}>
            <Link className="text-xl" href={"/blog"}>
              Home
            </Link>
          </Button>
        </div>
        <div className="h-full mt-2">/</div>
        <div>
          <Button variant={"link"}>
            <Link className="text-xl" href={"/blog"}>
              Blog
            </Link>
          </Button>
        </div>
        <div className="mt-2 h-full">/</div>
        <div>
          <Button variant={"link"}>
            <Link className="text-xl" href={"/blog"}>
              About
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar1;
