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
    <div className="w-4/5 my-3">
      <h1 className="text-2xl font-bold text-center text-white mt-2">
        Previous Projects
      </h1>
      <div className="w-full  bg-white mt-2">
        <Swiper
          className="bg-gray-700 min-h-[400px] text-white"
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
            <div className="w-full h-full flex justify-center items-center gap-4">
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                ipsa quis magnam possimus obcaecati tempore laboriosam
                voluptates. Animi, dolorem maiores?
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default PreviosProjecs;
