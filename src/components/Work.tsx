import React from "react";
const Work = () => {
  const works = [
    {
      company: "Dynamo Center For Technology",
      role: "Full Stack Developer",
      year: "May 2023 - Present",
      description:
        "Worked on several web applications using React, Node.js, Express, and MongoDB.",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full ">
      <h2 className="text-2xl font-bold mb-5 text-white">Previous Work</h2>
      {works.map((work, index) => (
        <div
          key={index}
          className="w-full max-w-[500px] p-2 bg-white rounded shadow-lg mb-5">
          <h3 className="text-xl font-bold mb-2">{work.company}</h3>
          <h4 className="text-lg mb-2">{work.role}</h4>
          <h4 className="text-gray-500 mb-3">{work.year}</h4>
          <p>{work.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Work;
