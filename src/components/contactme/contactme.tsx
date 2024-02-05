import React from "react";
import "./contactme.css";
import { BiLogoGithub } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
import { FiInstagram } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import Link from "next/link";

export default function ContactMe() {
  return (
    <>
      <p className="font-bold text-2xl text-white capitalize mt-16 max-[400px]:w-[300px] text-center min-w-[300px]">
        Let's talk about your next project
      </p>

      <div
        id="contactme"
        className="bg-gray-800 md:w-4/5 w-full  min-w-[340px]  max-w-[800px] flex justify-center my-10 flex-wrap-reverse">
        <div className="text-white mx-2 flex justify-center p-5 flex-col gap-10">
          <address className="w-full">
            <div>
              <div className="text-slate-200 flex gap-2">
                <div>
                  <div className="text-center font-bold my-2 capitalize">
                    social media
                  </div>
                  <div className="flex w-full gap-3 flex-wrap justify-center items-center">
                    <div>
                      <Link href="https://twitter.com/kumneger_01">
                        <FaTwitter className="text-blue-400 w-7 h-7" />
                      </Link>
                    </div>
                    <div>
                      <Link
                        href={
                          "https://www.linkedin.com/in/kumneger-wondimu-2b8405241/"
                        }>
                        <AiFillLinkedin className="text-blue-400 w-7 h-7" />
                      </Link>
                    </div>
                    <div>
                      <Link href="https://github.com/kumneger0">
                        <BiLogoGithub className="w-7 h-7" />
                      </Link>
                    </div>
                    <div>
                      <Link href="https://instagram.com/kumnegerwondimu">
                        <FiInstagram className="text-red-400 w-7 h-7" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </address>
          <address className="w-full">
            <div>
              <div className="text-slate-200 flex gap-2">
                <div>
                  <AiOutlineMail className="text-white font-bold text-2xl w-8 h-8" />
                </div>
                <div>
                  <div>Email</div>
                  <div> kumnegerwondimu@gmail.com</div>
                </div>
              </div>
            </div>
          </address>
          <address className="w-full">
            <div className="flex gap-2">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  className="mx-auto mb-6 h-10 w-8 text-primary dark:text-primary-400">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <div>
                <div>Location</div>
                <div>JIMMA ETHIOPIA</div>
              </div>
            </div>
          </address>
        
        </div>
        <div className="login-box">
          <form action={`https://formspree.io/f/mqkveeoy`} method="post">
            <div className="user-box">
              <input required name="name" type="text" />
              <label>Name</label>
            </div>
            <div className="user-box">
              <input required name="email" type="text" />
              <label>Email</label>
            </div>
            <div className="user-box">
              <input required name="message" />
              <label>Leave a message</label>
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
