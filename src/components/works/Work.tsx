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
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus placeat repellendus tenetur, autem qui ex nihil,
            officiis itaque, omnis aut at dolore consectetur voluptates quod
            voluptas illo? Neque deserunt consectetur dicta soluta tenetur,
            nostrum aut dolorem itaque voluptates, qui accusantium adipisci
            corrupti magni! Assumenda.
          </p>
        </li>
      </ul>
    </section>
  );
};

export default Work;
