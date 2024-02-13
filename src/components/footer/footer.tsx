import { GithubIcon, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="max-w-[1300px] w-11/12 py-5 mx-auto">
      <section className="mt-12">
        <h2 className="text-xl font-bold">Contact</h2>
        <div className="mt-4">
          <p className="text-base text-gray-300">
            If you want to get in touch with me, feel free to send me an email
            at:-
            <a
              className="underline text-blue-400"
              href="mailto:Kumngerwondimu@gmail.com"
            >
              Kumngerwondimu@gmail.com
            </a>
          </p>
        </div>
      </section>
      <section className="mt-12">
        <h2 className="text-xl font-bold">Social Media</h2>
        <div className="flex space-x-4 mt-4">
          <Link
            className="text-blue-400 underline"
            href="https://twitter.com/kumneger0"
          >
            <Twitter />
          </Link>
          <Link className="text-blue-400 underline" href="#">
            <Linkedin />
          </Link>
          <Link
            className="text-blue-400 underline"
            href="https://github.com/kumneger0"
          >
            <GithubIcon className="text-white" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Footer;
