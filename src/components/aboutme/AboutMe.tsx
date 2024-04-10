import { ArrowRight } from "lucide-react";
import Avatar from "../../../public/1711802150838.png";
import Image from "next/image";

function AboutMe() {
  return (
    <section className="py-5">
      <div className="grid gap-8 md:grid-cols-2 max-w-7xl mx-auto">
        <div className="flex items-center justify-center">
          <Image
            alt="Kumneger"
            className="aspect-square rounded-full object-cover"
            height="200"
            src={Avatar}
            width="200"
          />
        </div>
        <div className="space-y-2">
          <h1 className="md:text-3xl my-2 text-2xl font-bold">
            Kumneger Wondimu (a.k.a Kune)
          </h1>

          <p className="text-gray-300">
            👨‍💻 A passionate Full Stack Developer based in Ethiopia 🇪🇹 with
            experience in building applications with JavaScript / React /
            Node.js and some other cool libraries and frameworks. I write about
            web development on my blog
          </p>
          <h2 className="text-2xl font-semibold">Tools I use the most</h2>
          <ul className="list-inside flex justify-between items-center gap-3 text-gray-300">
            <div>
              <li className="flex gap-2 items-center ">
                <ArrowRight className="text-white" /> JavaScript{" "}
              </li>
              <li className="flex gap-2 items-center ">
                <ArrowRight className="text-white" /> TypeScript
              </li>
              <li className="flex gap-2 items-center">
                {" "}
                <ArrowRight className="text-white" /> Next.js
              </li>
              <li className="flex gap-2 items-center">
                {" "}
                <ArrowRight className="text-white" /> Tailwind CSS
              </li>
              <li className="flex gap-2 items-center">
                {" "}
                <ArrowRight className="text-white" /> React
              </li>
              <li className="flex gap-2 items-center">
                {" "}
                <ArrowRight className="text-white" /> Node.js
              </li>
            </div>
            <div>
              <li className="flex gap-2 items-center ">
                <ArrowRight className="text-white" />
                MongoDB{" "}
              </li>
              <li className="flex gap-2 items-center capitalize">
                <ArrowRight className="text-white " /> postgresql
              </li>
              <li className="flex gap-2 items-center">
                {" "}
                <ArrowRight className="text-white" /> Svelte
              </li>
              <li className="flex gap-2 items-center">
                {" "}
                <ArrowRight className="text-white" /> Golang
              </li>
              <li className="flex gap-2 items-center">
                {" "}
                <ArrowRight className="text-white" /> Git
              </li>
              <li className="flex gap-2 items-center">
                {" "}
                <ArrowRight className="text-white" /> Bun
              </li>
            </div>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
