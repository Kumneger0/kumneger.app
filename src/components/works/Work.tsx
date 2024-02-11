import React from "react";
const Work = () => {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold">Employment History</h2>
      <ul className="list-inside list-none mt-4 text-lg text-gray-300 space-y-4">
        <li>
          <h3 className="text-xl font-semibold">
            {" "}
            Dynamo Center For Technology
          </h3>
          <p className="text-base py-1">Role: Full Stack Developer</p>
          <p className="text-base">Duration: May 2023 - Present</p>
          <p className="text-base max-w-3xl">
            Worked on several web applications using React, Node.js, Express,
            and MongoDB.
          </p>
        </li>
      </ul>
    </section>
  );
};

export default Work;
