"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import headerStyles from "./header.module.css";
import aos from "aos";
import { FaBars } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const Navbar = () => {
  const [display, setDisplay] = useState("hidden");
  const removeShaddow = () => {
    setDisplay((prv) => (prv.trim() == "hidden" ? "block" : "hidden"));
  };

  const scrollIntoView = (id: string) => {
    const element = document.querySelector(`#${id}`);
    element?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="h-16 w-4/5 mx-auto flex justify-between">
      <Link
        href="/"
        className="group text-white mt-4 max-[500px]:text-lg text-2xl transition duration-300">
        Kumneger Wondimu
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
      </Link>
      <div className="hidden space-x-4 justify-end m-4 gap-3 lg:flex">
        <button
          onClick={() => scrollIntoView("Projects")}
          className="text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          <Link href="#Projects">Projects</Link>
        </button>
        <button className="text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          <Link href={`#work`}>Work</Link>
        </button>
        <button
          onClick={() => scrollIntoView("aboutme")}
          className="text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          <Link href={`#aboutme`}>About Me</Link>
        </button>
        <button className="text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          <Link href="/blog">Blog</Link>
        </button>
        <button className="text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          <Link href={`#contactme`}>Contact Me</Link>
        </button>
      </div>
      <button
        onClick={() =>
          setDisplay((prv) => (prv.trim() == "hidden" ? "block" : "hidden"))
        }
        className="block lg:hidden text-white">
        <FaBars />
      </button>
      <NavigationForSM value={display} removeShaddow={removeShaddow} />
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

function NavigationForSM({
  value,
  removeShaddow,
}: {
  value: string;
  removeShaddow: () => void;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    aos.init();
    const childs = parentRef.current?.childNodes;
    childs?.forEach((child) => {
      child.addEventListener("click", removeShaddow);
    });
  }, []);

  return (
    <div
      data-aos="fade-left"
      className={`${value} ${headerStyles.navSm} fixed mx-auto lg:hidden top-0 right-0 h-screen w-screen bg-neutral-800 opacity-95`}>
      <div className="w-full h-full relative">
        <button
          onClick={removeShaddow}
          className="text-white absolute top-10 right-10">
          <MdCancel />
        </button>
        <div
          ref={parentRef}
          className="flex justify-center items-center w-full h-full flex-col gap-3">
          <button className="text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-center">
            <Link href="#Projects">Projects</Link>
          </button>
          <button className="text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-center">
            <Link href={`#work`}>Work</Link>
          </button>
          <button className="text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-center">
            <Link href={`#aboutme`}>About Me</Link>
          </button>
          <button className="text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-center">
            <Link href="/blog">Blog</Link>
          </button>
          <button className="text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-center">
            <Link href={`#contactme`}>Contact Me</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
