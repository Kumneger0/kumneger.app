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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import chatAppPng from "../../public/chatapp.png";

function PreviosProjecs() {
  const swiper = useSwiper();

  return (
    <div id="Projects" className="w-4/5 my-20 mx-auto">
      <h1 className="text-2xl font-bold text-center text-white my-5 font-serif">
        Recent Projects
      </h1>
      <div className="w-full mt-10">
        <Swiper
          className="bg-gray-600 min-h-[400px] min-w-[600px] text-white"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <SwiperSlide>
            <div className="w-full h-full flex justify-center max-[800px]:flex-col items-center gap-4 flex-wrap p-10">
              <div>
                <Image
                  height={300}
                  width={400}
                  loading="lazy"
                  className="rounded-lg aspect-[4/3] object-contain object-center min-w-[300px]"
                  src={chatAppPng}
                  alt="project imagg"
                />
              </div>
              <div className="max-w-[300px] text-center items-center">
                <div className="w-full text-center my-5 text-xl">
                  Chat App With React and pocketbase
                </div>
                <div>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  ipsa quis magnam possimus obcaecati tempore laboriosam
                  voluptates. Animi, dolorem maiores?
                </div>
                <div className="flex justify-center items-center gap-5 w-full">
                  <button
                    className={`p-3 m-2 bg-blue-500 rounded-md text-center text-white ${Styles.button}`}
                  >
                    live
                  </button>
                  <button
                    className={`p-3 m-2 bg-blue-500 rounded-md text-center text-white ${Styles.button}`}
                  >
                    gihub repo
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full flex justify-center items-center gap-4 max-[800]:flex-col flex-wrap">
              <div>
                <Image
                  height={300}
                  width={400}
                  loading="lazy"
                  className="rounded-lg aspect-[4/3] object-contain object-center min-w-[300px]"
                  src={chatAppPng}
                  alt="project imagg"
                />
              </div>
              <div className="max-w-[300px] text-center items-center">
                <div className="w-full text-center my-10 text-xl">
                  Chat App With React and pocketbase
                </div>
                <div>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  ipsa quis magnam possimus obcaecati tempore laboriosam
                  voluptates. Animi, dolorem maiores?
                </div>
                <div className="flex justify-center items-center gap-5 w-full">
                  <button
                    className={`p-3 m-2 bg-blue-500 rounded-md text-center text-white ${Styles.button}`}
                  >
                    live
                  </button>
                  <button
                    className={`p-3 m-2 bg-blue-500 rounded-md text-center text-white ${Styles.button}`}
                  >
                    gihub repo
                  </button>
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
                  className="rounded-lg aspect-[4/3] object-contain object-center min-w-[300px]"
                  src={chatAppPng}
                  alt="project imagg"
                />
              </div>
              <div className="max-w-[300px] text-center items-center">
                <div className="w-full text-center my-10 text-xl">
                  Chat App With React and pocketbase
                </div>
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  ipsa quis magnam possimus obcaecati tempore laboriosam
                  voluptates. Animi, dolorem maiores?
                </div>
                <div className="flex justify-center items-center gap-5 w-full">
                  <button
                    className={`p-3 m-2 bg-blue-500 rounded-md text-center text-white ${Styles.button}`}
                  >
                    live
                  </button>
                  <button
                    className={`p-3 m-2 bg-blue-500 rounded-md text-center text-white ${Styles.button}`}
                  >
                    gihub repo
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full flex justify-center items-center gap-4">
              <button>see more on github</button>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default PreviosProjecs;
