import React from "react";
import someGif from "../../../../public/Animation - 1707858742875.gif";
import Image from "next/image";

export const metadata = {
  title: "About - kumneger wondimu"
};

function About() {
  return (
    <div className="max-w-7xl mx-auto gap-5 flex flex-wrap justify-center items-center">
      <h1 className="font-bold text-2xl w-full text-center py-2">About me</h1>
      <div className="text-lg ">
        Ever since I was young, I've been fascinated by technology and
        problem-solving. It all started in 2019 when I embarked on my coding
        journey with Java, fueled by online tutorials and video resources. While
        I initially took a break, the fire of passion reignited in 2020, leading
        me to explore the dynamic world of Python. Although my experience wasn't
        extensive, it helped me build a foundation for my later endeavors. In
        2021, the web development landscape captivated me, and I eagerly
        transitioned my focus. Driven by a thirst for knowledge and practical
        application, I actively sought opportunities to hone my skills in this
        exciting field. Finally, in May 2023, my dedication paid off, and I
        landed my first web developer role as a ReactJS developer. This entry
        marked a significant milestone in my journey. Eager to expand my
        expertise, I delved deeper into the MERN stack (MongoDB, Express.js,
        ReactJS, Node.js), embracing its versatility and potential. Today, I
        stand proud as a MERN stack developer, continuously learning and pushing
        boundaries to create impactful web experiences
      </div>
    </div>
  );
}

export default About;
