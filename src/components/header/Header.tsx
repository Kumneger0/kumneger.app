"use client";
// import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
// import headerStyles from "./header.module.css";
// import aos from "aos";
import { FaBars } from "react-icons/fa";
// import { MdCancel } from "react-icons/md";

const Navbar = () => {
  const [display, setDisplay] = useState("hidden");
  const removeShaddow = () => {
    setDisplay((prv) => (prv.trim() == "hidden" ? "block" : "hidden"));
  };

  const scrollIntoView = (id: string) => {
    const element = document.querySelector(`#${id}`);
    element?.scrollIntoView({
      behavior: "smooth",
      inline: 'start',
      block: 'start'
    });
  };

  return (
    <div className={`h-auto w-4/5 max-[990px]:flex-col mx-auto flex justify-between relative`}>
      <Link
        href="/"
        className="group text-white mt-4 max-[500px]:text-lg text-2xl transition duration-300">
        Kumneger Wondimu
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
      </Link>
      <div className={`space-x-4 justify-end m-4 gap-3 max-[990px]:flex-col flex ${display} justify-start items-start`}>
        <div className="flex max-[990px]:flex-col items-start">
          <button
            onClick={() => scrollIntoView("Projects")}
            className="text-white  px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110  max-w-[100px]">
            <Link href="#Services">Services</Link>
          </button>
          <button
            onClick={() => scrollIntoView("Projects")}
            className="text-white  px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 max-w-[100px]">
            <Link href="#Projects">Projects</Link>
          </button>
          <button className="text-white  px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110   max-w-[100px] ">
            <Link href={`#work`}>Work</Link>
          </button>
          <button
            onClick={() => scrollIntoView("aboutme")}
            className="text-white  px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110  max-w-[100px]">
            <Link href={`#aboutme`}>About Me</Link>
          </button>
          <button className="text-white  px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110  max-w-[100px] ">
            <Link href="/blog">Blog</Link>
          </button>
          <button className="text-white  px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 max-w-[150px]">
            <Link href={`#contactme`}>Contact Me</Link>
          </button>
        </div>

      </div>
      <button
        onClick={() =>
          setDisplay((prv) => (prv.trim() == "hidden" ? "block" : "hidden"))
        }
        className="block lg:hidden  absolute top-2 ri text-white">
        <FaBars />
      </button>
      {/* <NavigationForSM value={display} removeShaddow={removeShaddow} /> */}
    </div>
  );
};

// function Header() {
//   return (
//     <div className="w-screen bg-black bg-opacity-90 fixed z-10">
//       {" "}
//       <Navbar />{" "}
//     </div>
//   );
// }

// export default Header;

// function NavigationForSM({
//   value,
//   removeShaddow,
// }: {
//   value: string;
//   removeShaddow: () => void;
// }) {
//   const parentRef = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     aos.init();
//     const childs = parentRef.current?.childNodes;
//     childs?.forEach((child) => {
//       child.addEventListener("click", removeShaddow);
//     });
//   }, []);

//   return (
//     <div
//       data-aos="fade-left"
//       className={`${value} ${headerStyles.navSm} fixed mx-auto lg:hidden top-0 right-0 h-screen w-screen bg-neutral-800 opacity-95`}>
//       <div className="w-full h-full relative">
//         <button
//           onClick={removeShaddow}
//           className="text-white absolute top-10 right-10">
//           <MdCancel />
//         </button>
//         <div
//           ref={parentRef}
//           className="flex justify-center items-center w-full h-full flex-col gap-3">
//           <button className="text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-center">
//             <Link href="#Projects">Projects</Link>
//           </button>
//           <button className="text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-center">
//             <Link href={`#work`}>Work</Link>
//           </button>
//           <button className="text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-center">
//             <Link href={`#aboutme`}>About Me</Link>
//           </button>
//           <button className="text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-center">
//             <Link href="/blog">Blog</Link>
//           </button>
//           <button className="text-white bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-md text-center">
//             <Link href={`#contactme`}>Contact Me</Link>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

function Navbar1() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);


  const scrollIntoView = (id: string) => {
    const element = document.querySelector(`#${id}`);
    element?.scrollIntoView({
      behavior: "smooth",
      inline: 'start',
      block: 'start'
    });
  };


  return (
    <header className="  bg-black p-6">

      <nav className="flex items-center justify-between flex-wrap w-4/5 max-w-7xl mx-auto lg:gap-20">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link
            href="/"
            className="group text-white max-[500px]:text-lg text-2xl transition duration-300">
            Kumneger Wondimu
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
          </Link>
        </div>
        <div className="block lg:hidden bg-white z-50">
          <button onClick={toggleOpen} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white bg-black">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title className="text-white">Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z" /></svg>
          </button>
        </div>
        <div className={`${isOpen ? 'flex' : 'hidden'} w-full block flex-grow  lg:flex lg:flex-row flex-col lg:items-center lg:w-auto`}>
          <div className="text-sm lg:flex-grow flex lg:flex-row flex-col items-start justify-center">
            <button
              onClick={() => scrollIntoView("Projects")}
              className="text-white  px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110  max-w-[100px]">
              <Link href="#Services">Services</Link>
            </button>
            <button
              onClick={() => scrollIntoView("Projects")}
              className="text-white  px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 max-w-[100px]">
            <Link href="#Projects">Projects</Link>
          </button>
            <button className="text-white  px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110   max-w-[100px] ">
            <Link href={`#work`}>Work</Link>
          </button>
            <button
              onClick={() => scrollIntoView("aboutme")}
              className="text-white  px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110  max-w-[100px]">
            <Link href={`#aboutme`}>About Me</Link>
          </button>
            <button className="text-white  px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110  max-w-[100px] ">
            <Link href="/blog">Blog</Link>
          </button>
            <button className="text-white  px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 max-w-[150px]">
            <Link href={`#contactme`}>Contact Me</Link>
          </button>
        </div>
      </div>
      </nav>
    </header>
  );
}

export default Navbar1;
