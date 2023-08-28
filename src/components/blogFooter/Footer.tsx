import Link from "next/link";
import React from "react";
import { AiFillLinkedin } from "react-icons/ai";
import { BiLogoGithub } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <img src="" className="h-8 mr-3" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Kune
              </span>
            </Link>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-white sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="/" className="hover:underline">
              Kune™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0 text-white">
            <Link target="_blank" href="https://twitter.com/kumneger_01">
              <FaTwitter className="text-blue-400 w-7 h-7" />
            </Link>
            <Link
              target="_blank"
              href={"https://www.linkedin.com/in/kumneger-wondimu-2b8405241/"}>
              <AiFillLinkedin className="text-blue-400 w-7 h-7" />
            </Link>
            <Link target="_blank" href="https://github.com/kumneger0">
              <BiLogoGithub className="w-7 h-7" />
            </Link>
            <Link target="_blank" href="https://instagram.com/kumnegerwondimu">
              <FiInstagram className="text-red-400 w-7 h-7" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
