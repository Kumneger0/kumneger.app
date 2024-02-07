import React from "react";
const Work = () => {
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold">Employment History</h2>
      <ul className="list-inside list-none mt-4 text-lg text-gray-300 space-y-4">
        <li>
          <h3 className="text-2xl font-semibold">
            {" "}
            Dynamo Center For Technology
          </h3>
          <p>Role: Full Stack Developer</p>
          <p>Duration: May 2023 - Present</p>
          <p>
            Description: Worked on several web applications using React,
            Node.js, Express, and MongoDB.{" "}
          </p>
        </li>
      </ul>
    </section>
  );
};

export default Work;
