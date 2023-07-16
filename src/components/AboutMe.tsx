"use client";
import React, { useEffect } from "react";
import Lottie from "lottie-web";
import lottieJson from "../../public/lottie.json";
import { FaHtml5, FaReact, FaNodeJs } from "react-icons/fa";
import { DiCss3 } from "react-icons/di";
import { RiJavascriptLine } from "react-icons/ri";
import {
  SiTailwindcss,
  SiTypescript,
  SiSvelte,
  SiExpress,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { BsGit } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { BiLogoMongodb } from "react-icons/bi";

function AboutMe() {
  useEffect(() => {
    Lottie.loadAnimation({
      container: document.getElementById("lottie") as HTMLDivElement,
      animationData: lottieJson,
    });
  }, []);
  return (
    <div className="w-screen">
      <div className="text-center m-3 p-3 font-bold text-2xl text-white">
        Who Am i
      </div>
      <div className="w-4/5 flex gap-2 justify-around mx-auto">
        <div className="w-[45%] text-white mt-10">
          Hi, I'm Kumneger Wondimu. I'm a web developer based in Ethiopia with a
          passion for crafting high-performance web solutions. With three years
          in the tech industry, I prioritize creating web applications that
          align perfectly with user needs. Always in tune with the industry's
          pulse, I'm here to turn your ideas into impactful digital solutions.
        </div>
        <div
          id="lottie"
          className="w-[45%] min-w-[300px] min-h-h-[300px] max-h-[400px] max-w-[500px]"
        ></div>
      </div>
      <div className="w-4/5 mx-auto">
        <div className="w-full text-center font-bold text-lg p-3 m-2 text-white">
          Tools And Technologies I use
        </div>
        <div className="flex justify-center items-center w-full gap3 flex-wrap">
          <div className="min-w-[100px] p-3 m-2 rounded-md text-white">
            <FaHtml5 className="w-full h-full p-3 m-3" />
          </div>
          <div className="min-w-[100px] p-3 m-2 rounded-md text-white">
            <DiCss3 className="w-full h-full p-3 m-3" />
          </div>
          <div className="min-w-[100px] p-3 m-2 rounded-md text-white">
            <RiJavascriptLine className="w-full h-full p-3 m-3" />
          </div>
          <div className="min-w-[100px] p-3 m-2 rounded-md text-white">
            <SiTailwindcss className="w-full h-full p-3 m-3" />
          </div>
          <div className="min-w-[100px] p-3 m-2 rounded-md text-white">
            <SiTypescript className="w-full h-full p-3 m-3" />
          </div>
          <div className="min-w-[100px] p-3 m-2 rounded-md text-white">
            <FaReact className="w-full h-full p-3 m-3" />
          </div>

          <div className="min-w-[100px] p-3 m-2 rounded-md text-white">
            <SiSvelte className="w-full h-full p-3 m-3" />
          </div>
          <div className="min-w-[100px] p-3 m-2 rounded-md text-white">
            <TbBrandNextjs className="w-full h-full p-3 m-3" />
          </div>
          <div className="min-w-[100px] p-3 m-2 rounded-md text-white">
            <BsGit className="w-full h-full p-3 m-3" />
          </div>
          <div className="min-w-[100px] p-3 m-2 rounded-md text-white">
            <AiFillGithub className="w-full h-full p-3 m-3" />
          </div>
          <div className="min-w-[100px] p-3 m-2 rounded-md text-white">
            <FaNodeJs className="w-full h-full p-3 m-3" />
          </div>
          <div className="min-w-[100px] p-3 m-2 rounded-md text-white">
            <SiExpress className="w-full h-full p-3 m-3" />
          </div>
          <div className="min-w-[100px] p-3 m-2 rounded-md text-white">
            <BiLogoMongodb className="w-full h-full p-3 m-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
