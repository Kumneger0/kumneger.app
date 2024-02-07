import React from "react";
import { FaHtml5, FaReact, FaNodeJs } from "react-icons/fa";
import { DiCss3 } from "react-icons/di";
import { RiJavascriptLine } from "react-icons/ri";
import {
  SiTailwindcss,
  SiTypescript,
  SiSvelte,
  SiExpress
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { BsGit } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { BiLogoMongodb, BiLogoGoLang } from "react-icons/bi";

function Stacks() {
  return (
    <div className="min-w-[300px] max-w-5xl mx-auto">
      <h2 className="w-full text-center font-bold text-lg p-3 m-2 text-white">
        Tools And Technologies I use
      </h2>

      <div className="flex justify-center items-center w-4/5 mx-auto flex-wrap ">
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
          <SiTailwindcss className="w-12 h-12 p-3 m-3 text-blue-500" />
          <p className="mt-2 text-sm font-bold text-gray-600">Tailwind</p>
        </div>

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

        <div className="flex flex-col items-center justify-center box-border p-3 m-1 bg-white rounded-md shadow-md">
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
  );
}

export default Stacks;
