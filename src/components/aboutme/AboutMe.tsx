"use client";
import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import Lottie from "lottie-web";
import lottieJson from "../../../public/lottie.json";
import aos from "aos";

function AboutMe() {
  const itroRef = useRef<HTMLHeadingElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    aos.init({ duration: 1000 });
    aos.refresh();
    if (lottieRef.current) {
      Lottie.loadAnimation({
        container: lottieRef.current,
        animationData: lottieJson,
        renderer: "svg"
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
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const aboutMe = {
    description: `A passionate Full Stack Developer based in Ethiopia with experience in building applications with JavaScript / React / Node.js and some other cool libraries and frameworks.`
  };

  return (
    <div
      id="aboutme"
      className="min-w-[300px] w-11/12 max-w-7xl mx-auto z-10 mt-10 "
    >
      <div className="flex justify-around gap-5 items-center flex-wrap min-w-[300px] w-full ">
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
    </div>
  );
}

const About = React.memo(AboutMe);

export default About;
