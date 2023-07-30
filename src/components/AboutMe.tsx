"use client";
import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
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
import { BiLogoMongodb, BiLogoGoLang } from "react-icons/bi";
import aos from "aos";

function AboutMe() {
  const itroRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    aos.init({ duration: 1000 });
    aos.refresh();
    Lottie.loadAnimation({
      container: document.getElementById("lottie") as HTMLDivElement,
      animationData: lottieJson,
    });

    const typed = new Typed(itroRef.current, {
      strings: ["I am Kumneger Wondimu", "I am Web Developer"],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const aboutMe = {
    description: `A passionate Full Stack Developer based in Ethiopia with experience in building applications with JavaScript / React / Node.js and some other cool libraries and frameworks.`,
  };

  return (
    <div id="aboutme" className="w-full">
      <div className="text-center font-bold text-2xl text-white">
        Who Am i ?
      </div>
      <div className="lg:w-4/5 w-[90vw] max-[900px]:-ml-20 flex gap-2 items-center justify-around max-[800px]:flex-col flex-wrap ">
        <div className="lg:w-[45%] w-11/12">
          <div className="w-full mb-5 p-3 rounded-lg">
            <h1 className="font-semibold text-4xl text-slate-200">
              Hi! <span ref={itroRef}></span>
            </h1>
          </div>
          <div data-aos="flip-down" dat-aos-delay="1000">
            {" "}
            <div className="w-11/12 max-w-md p-2 bg-white rounded shadow-lg">
              <p>{aboutMe.description}</p>
            </div>
          </div>
        </div>
        <div id="lottie" className=""></div>
      </div>
      <div className="flex flex-col items-center md:w-4/5 w-full mx-auto my-20 rounded-lg shadow-lg">
        <h2 className="w-full text-center font-bold text-lg p-3 m-2 text-white">
          Tools And Technologies I use
        </h2>
        <h3 className="w-full text-center font-bold text-lg p-3 m-2 text-white">
          Front-End
        </h3>
        <div className="flex justify-center items-center gap w-full min-w-[312px]  flex-wrap">
          {/* Front-End Tech Stacks */}
          <div className="w-full flex justify-center flex-wrap">
            <div className="flex flex-col items-center justify-center box-border p-3 m-2 bg-white rounded-md shadow-md">
              <FaHtml5 className="w-12 h-12 p-3 m-3 text-red-500" />
              <p className="mt-2 text-sm font-bold text-gray-600">HTML5</p>
            </div>
            <div className="flex flex-col items-center justify-center box-border p-3 m-2 bg-white rounded-md shadow-md">
              <DiCss3 className="w-12 h-12 p-3 m-3 text-blue-500" />
              <p className="mt-2 text-sm font-bold text-gray-600">CSS3</p>
            </div>
            <div className="flex flex-col items-center justify-center box-border p-3 m-2 bg-white rounded-md shadow-md">
              <RiJavascriptLine className="w-12 h-12 p-3 m-3 text-yellow-500" />
              <p className="mt-2 text-sm font-bold text-gray-600">JavaScript</p>
            </div>
            <div className="flex flex-col items-center justify-center box-border p-3 m-2 bg-white rounded-md shadow-md">
              <SiTailwindcss className="w-12 h-12 p-3 m-3 text-green-500" />
              <p className="mt-2 text-sm font-bold text-gray-600">
                Tailwind CSS
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center flex-wrap">
            <div className="flex flex-col items-center justify-center box-border p-3 m-2 bg-white rounded-md shadow-md">
              <SiTypescript className="w-12 h-12 p-3 m-3 text-blue-500" />
              <p className="mt-2 text-sm font-bold text-gray-600">TypeScript</p>
            </div>
            <div className="flex flex-col items-center justify-center box-border p-3 m-2 bg-white rounded-md shadow-md">
              <FaReact className="w-12 h-12 p-3 m-3 text-blue-500" />
              <p className="mt-2 text-sm font-bold text-gray-600">React</p>
            </div>
            <div className="flex flex-col items-center justify-center box-border p-3 m-2 bg-white rounded-md shadow-md">
              <SiSvelte className="w-12 h-12 p-3 m-3 text-red-500" />
              <p className="mt-2 text-sm font-bold text-gray-600">Svelte</p>
            </div>
          </div>
        </div>
        <h3 className="w-full text-center font-bold text-lg p-3 m-2 text-white">
          Back-End
        </h3>
        <div className="flex justify-center items-center w-full p-5 flex-wrap">
          <div className="flex flex-col items-center justify-center box-border p-3 m-2 bg-white rounded-md shadow-md">
            <FaNodeJs className="w-12 h-12 p-3 m-3 text-green-500" />
            <p className="mt-2 text-sm font-bold text-gray-600">Node.js</p>
          </div>
          <div className="flex flex-col items-center justify-center box-border p-3 m-2 bg-white rounded-md shadow-md">
            <BiLogoGoLang className="w-12 h-12 p-3 m-3 text-green-500" />
            <p className="mt-2 text-sm font-bold text-gray-600">go lang</p>
          </div>
          <div className="flex flex-col items-center justify-center box-border p-3 m-2 bg-white rounded-md shadow-md">
            <SiExpress className="w-12 h-12 p-3 m-3 text-black" />
            <p className="mt-2 text-sm font-bold text-gray-600">Express</p>
          </div>
          <div className="flex flex-col items-center justify-center box-border p-3 m-2 bg-white rounded-md shadow-md">
            <BiLogoMongodb className="w-12 h-12 p-3 m-3 text-green-500" />
            <p className="mt-2 text-sm font-bold text-gray-600">MongoDB</p>
          </div>
          <div className="flex flex-col items-center justify-center box-border p-3 m-2 bg-white rounded-md shadow-md">
            <TbBrandNextjs className="w-12 h-12 p-3 m-3 text-black" />
            <p className="mt-2 text-sm font-bold text-gray-600">Next.js</p>
          </div>
        </div>
        <h3 className="w-full text-center font-bold text-lg p-3 m-2 text-white">
          Version Control
        </h3>
        <div className="flex justify-center items-center w-full p-5 flex-wrap">
          <div className="flex flex-col items-center justify-center box-border p-3 m-2 bg-white rounded-md shadow-md">
            <BsGit className="w-12 h-12 p-3 m-3 text-red-500" />
            <p className="mt-2 text-sm font-bold text-gray-600">Git</p>
          </div>
          <div className="flex flex-col items-center justify-center box-border p-3 m-2 bg-white rounded-md shadow-md">
            <AiFillGithub className="w-12 h-12 p-3 m-3 text-black" />
            <p className="mt-2 text-sm font-bold text-gray-600">GitHub</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const About = React.memo(AboutMe);

export default About;
