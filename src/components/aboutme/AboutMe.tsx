"use client";
import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import Lottie from "lottie-web";
import lottieJson from "../../../public/lottie.json";
import aos from "aos";
import screenResize from "./screen";

function AboutMe() {
  const itroRef = useRef<HTMLHeadingElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);
  const screenSize = screenResize();
  useEffect(() => {
    aos.init({ duration: 1000 });
    aos.refresh();
    if (lottieRef.current) {
      Lottie.loadAnimation({
        container: lottieRef.current,
        animationData: lottieJson,
        renderer: "svg",
      });
      const childs = lottieRef.current.childNodes;
      if (childs.length > 1) {
        childs[childs.length - 1].remove();
      }
    }

    const typed = new Typed(itroRef.current, {
      strings: ["I am Kumneger Wondimu", "I am Web Developer"],
      typeSpeed: 70,
      backSpeed: 70,
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
    <div id="aboutme" className="min-w-[300px] w-11/12 z-10 mt-10">
      <div className="flex justify-around gap-5 items-center flex-wrap min-w-[300px] w-full max-[900px]:-ml-20">
        <div className="lg:w-[45%] w-11/12">
          <div className="w-full mb-5 p-3 rounded-lg">
            <h1 className="font-semibold font-serif  text-4xl text-slate-200">
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
        <div ref={lottieRef} id="lottie" className=""></div>
      </div>
      <div className="w-full text-center my-2 font-bold text-2xl text-white">
        Who Am I
      </div>
      <div
        className={`flex  flex-wrap justify-center items-center mx-auto gap-2 ${
          screenSize < 1000 ? "w-[95%]" : null
        }`}>
        <div
          className={`text-white border p-3 mx-5 min-w-[400px] w-[60%]  ${
            screenSize <= 1140 ? "w-full" : ""
          }`}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum quis
          praesentium, doloribus autem labore neque corrupti sed ea et iure
          quibusdam sunt hic quaerat commodi. Quis mollitia beatae ratione amet
          doloribus deserunt quas ad nemo dignissimos nisi impedit natus
          provident cumque ducimus quaerat neque cum deleniti, recusandae ipsa
          distinctio, inventore eos consectetur. Fugiat earum aperiam error
          laudantium, hic sint officiis quas itaque, in sit maiores inventore.
          Magnam maxime numquam iusto optio quidem odit, vitae velit doloribus
          nam excepturi beatae harum laborum voluptate, aliquid quas quibusdam
          facere ipsam dolores laboriosam quo alias delectus. Debitis eum animi
          saepe odit laborum consequuntur optio doloribus nostrum voluptatem
          quod, quasi possimus iure, libero fuga recusandae dolores officia
          sapiente eveniet quidem temporibus corrupti ad repudiandae. Placeat
          praesentium eos pariatur iste at vel consequuntur dolore iure dolor
          sit. Consequatur distinctio saepe pariatur numquam iste sint vel sed
          laboriosam praesentium recusandae quia porro facilis, voluptates sit
          laudantium assumenda?
        </div>
        <div className="min-w-[300px] min-h-[300px] border border-black"></div>
      </div>
    </div>
  );
}

const About = React.memo(AboutMe);

export default About;
