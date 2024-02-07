import { Link } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <>
      <section className="mt-12">
        <h2 className="text-3xl font-bold">Contact</h2>
        <div className="mt-4">
          <p className="text-lg text-gray-300">
            If you want to get in touch with me, feel free to send me an email
            at:
            <a className="underline text-blue-400" href="#">
              Kumngerwondimu@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
      <section className="mt-12">
        <h2 className="text-3xl font-bold">Social Media</h2>
        <div className="flex space-x-4 mt-4">
          <Link className="text-blue-400 underline" href="#">
            Twitter
          </Link>
          <Link className="text-blue-400 underline" href="#">
            LinkedIn
          </Link>
          <Link className="text-blue-400 underline" href="#">
            GitHub
          </Link>
        </div>
      </section>
    </>
  );
}

export default Footer;
