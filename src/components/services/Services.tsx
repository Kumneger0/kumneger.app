import React from "react";
import sampleImage from "../../../public/frontEnd.webp";
import backend from "../../../public/OIP.jpg";
import image from "../../../public/full-stack-web-development.webp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Image from "next/image";

const services = [
  {
    title: "Front-end Development",
    descritption: `I specialize in creating engaging, intuitive user interfaces
                  using HTML, CSS, and JavaScript, along with modern frameworks
                  like React or Svelte. My focus is on responsive design,
                  performance, and accessibility, ensuring a seamless user
                  experience across all devices and platforms
  `
  },
  {
    title: "Api Development",
    descritption: `  I am proficient in server-side programming with languages like
                Node.js, or go, and have experience working with both SQL and
                NoSQL databases. I can design and implement secure, scalable
                APIs, and manage server architecture to support robust
                applications.
  `
  },
  {
    title: "Full Stack Development",
    descritption: `    As a Full Stack Developer, I am equipped to handle all aspects
                of project development, from designing the user interface, to
                managing servers and databases, and ensuring smooth, seamless
                communication between front-end and back-end components. My
                comprehensive approach ensures efficient project completion and
                delivers a cohesive end product.
  `
  }
];

function Services() {
  return (
    <>
      <h2
        id="Services"
        className="text-center my-20 text-white font-bold font-serif text-2xl"
      >
        Services I offer
      </h2>
      <div className="justify-center items-center w-fit gap-4  flex flex-wrap">
        {services.map(({ descritption, title }) => (
          <div className="min-w-[300px] max-w-[360px] my-5 text-white">
            <Card className="border-none min-h-[300px]  shadow-md rounded-md py-2 shadow-black items-stretch">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="py-5">
                  {descritption}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}

export default Services;
