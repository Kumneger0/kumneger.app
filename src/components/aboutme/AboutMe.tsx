import { ArrowRight } from "lucide-react";
import Avatar from "../../../public/1711802150838.png";
import Image from "next/image";

function AboutMe() {
  return (
    <section className="py-5">
      <div className="max-w-5xl -mt-10 mx-auto">
        <h1 className="md:text-3xl -ml-1  sm:-ml-3 my-4 text-2xl font-bold">
          Kumneger Wondimu (a.k.a Kune)
        </h1>
        <div className="space-y-2">
          <h1 className="md:text-2xl my-2 text-xl font-bold">
            So you're looking for a developer, huh? Buckle up!
          </h1>

          <p className="text-gray-300">
            I'm your friendly neighborhood full-stack dev, straight outta
            Ethiopia 🇪🇹 . I wield the mighty powers of JavaScript, React,
            Node.js, and a secret arsenal of other cool libraries and frameworks
            (think of them as my programmer's spices). Basically, I'm the
            caffeine to your website's tired code, the superhero to your app's
            buggy blues. I can build anything from basic apps to full-blown web
            applications (and maybe even a mind-controlling ray gun, if you're
            feeling frisky).
          </p>
        </div>
        <div className="my-2 p-2">
          <h2 className="font-bold md:text-2xl text-xl py-1">Why hire me?</h2>
          <ul className="list-disc">
            <li className="py-1">
              I can code like nobody's business (except maybe ninjas, but
              they're probably busy infiltrating secret lairs)
            </li>
            <li className="py-1">
              I'm fluent in both programmer talk and human, so you won't need a
              decoder ring to understand me.
            </li>
            <li className="py-1">
              My sense of humor is top-notch (just ask my therapist...wait,
              don't ask my therapist)
            </li>
          </ul>
        </div>
        <div>
          <p className="font-bold md:text-2xl text-xl py-2">
            So, what are you waiting for? Let's build something awesome
            together!
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
