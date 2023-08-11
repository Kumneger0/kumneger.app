"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import Styles from "./customStyles.module.css";
import chatAppPng from "../../../public/chatapp.png";
import reciepe from "../../../public/recipe.png";
import kdrive from "../../../public/Kdrive.png";
import Link from "next/link";

function PreviosProjecs() {
  return (
    <div id="Projects" className="md:w-4/5 my-20 w-[90vw]">
      <h1 className="text-2xl font-bold text-center text-white my-5 font-serif">
        Sample Projects
      </h1>
      <div className="w-full mt-10">
        <Swiper
          className="min-h-[400px] w-full text-white"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}>
          <SwiperSlide>
            <div className="w-full h-full flex justify-center max-[800px]:flex-col items-center gap-4 flex-wrap">
              <div>
                <Image
                  height={300}
                  width={400}
                  loading="lazy"
                  className="rounded-lg aspect-[4/3] object-contain object-center"
                  src={chatAppPng}
                  alt="project imagg"
                />
              </div>
              <div className="max-w-[300px] text-center items-center">
                <div className="w-full text-center my-5 text-xl text-[#c7c739]">
                  React-PocketChat
                </div>
                <div className="text-[0.9em]">
                  {" "}
                  Discover a new way of connecting with Real-Time Chat
                  Application. Find friends using their usernames, engage in
                  private conversations, and explore profiles. Built with React
                  With TypeScript and Pocketbase, this application offers a
                  seamless, interactive experience. Dive in, explore, and
                  experience real-time communication like never before!
                </div>
                <div className="flex justify-center items-center gap-5 w-full">
                  <Link
                    className="w-full h-full p-3"
                    href="https://react-pocketchat.web.app"
                    target="_blank">
                    <button
                      className={`p-3 m-2 bg-blue-500 rounded-md text-center text-white ${Styles.button}`}>
                      live
                    </button>
                  </Link>
                  <Link
                    className="w-full h-full p-1"
                    href="https://github.com/Kumneger0/chat-app-with-react-and-pocketbase"
                    target="_blank">
                    <button
                      className={`p-3 m-2 bg-blue-500 rounded-md text-center text-white ${Styles.button}`}>
                      github repo
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full flex justify-center items-center gap-4 max-[800px]:flex-col flex-wrap">
              <div>
                <Image
                  height={300}
                  width={400}
                  loading="lazy"
                  className="rounded-lg aspect-[4/3] mt-10 object-contain object-center min-w-[300px]"
                  src={kdrive}
                  alt="project imagg"
                />
              </div>
              <div className="max-w-[300px] text-center items-center">
                <div className="w-full text-center my-5 text-xl text-[#c7c739]">
                  KDrive - Your Personal Cloud
                </div>
                <div className="text-[0.9em]">
                  Storage Storing and accessing your files has never been
                  easier! Introducing KDrive, a sleek, user-friendly cloud
                  storage application. Powered by React and Firebase, KDrive
                  allows you to securely store your files in the cloud, and
                  access them anytime, anywhere. Start exploring KDrive today
                  and revolutionize your file storage experience!
                </div>
                <div className="flex justify-center items-center gap-5 w-full">
                  <Link
                    className="w-full h-full p-3"
                    href="https://kunedrive.web.app/"
                    target="_blank">
                    <button
                      className={`p-3 m-2 bg-blue-500 rounded-md text-center text-white ${Styles.button}`}>
                      live
                    </button>
                  </Link>
                  <Link
                    className="w-full h-full p-3"
                    href="https://github.com/Kumneger0/google-drive-clone-with-react-and-firebase"
                    target="_blank">
                    <button
                      className={`p-3 m-2 bg-blue-500 rounded-md text-center text-white ${Styles.button}`}>
                      github repo
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full flex justify-center items-center gap-4 max-[800px]:flex-col flex-wrap">
              <div>
                <Image
                  height={300}
                  width={400}
                  loading="lazy"
                  className="rounded-lg aspect-[4/3] mt-10 object-contain object-center min-w-[300px]"
                  src={reciepe}
                  alt="project imagg"
                />
              </div>
              <div className="max-w-[300px] text-center items-center">
                <div className="w-full text-center my-5 text-xl text-[#c7c739]">
                  Tasty - Your Culinary Adventure Starts Here
                </div>
                <div className="text-[0.9em]">
                  Unleash your inner chef with Tasty, a comprehensive recipe app
                  that opens up a world of culinary possibilities at your
                  fingertips. Developed with Next.js and TypeScript, Tasty
                  offers a vast collection of meal recipes, complete with
                  engaging video guides and detailed written instructions. Begin
                  your Tasty journey today, and make every meal a celebration!
                </div>
                <div className="flex justify-center items-center gap-5 w-full">
                  <Link
                    className="w-full h-full p-3"
                    href="https://food-app-lac.vercel.app/"
                    target="_blank">
                    <button
                      className={`p-3 m-2 bg-blue-500 rounded-md text-center text-white ${Styles.button}`}>
                      live
                    </button>
                  </Link>
                  <Link
                    className="w-full h-full p-3"
                    href="https://github.com/Kumneger0/recipe-app-nextjs"
                    target="_blank">
                    <button
                      className={`p-3 m-2 bg-blue-500 rounded-md text-center text-white ${Styles.button}`}>
                      github repo
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full flex justify-center items-center gap-4">
              <Link
                href={`https://github.com/Kumneger0?tab=repositories`}
                target="_blank">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                  <span>see more on github</span>
                  <svg
                    className="fill-current w-4 h-4 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M10 12h8v2h-8v5l-6-6 6-6v5z" />
                  </svg>
                </button>
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

const Projects = React.memo(PreviosProjecs);

export default Projects;










