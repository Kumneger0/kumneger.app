import { GithubIcon, Linkedin } from "lucide-react";
import Link from "next/link";

import { Textarea } from "@/components/ui/textarea";

import "./footer.css";

function Footer() {
  return (
    <div className="max-w-[1300px] w-11/12 py-5 mx-auto">
      <section className="mt-12">
        <Component />
      </section>
      <section className="mt-12 w-full p-3 flex justify-center items-center flex-col">
        <h2 className="text-xl font-bold">Social Media</h2>
        <div className="flex space-x-4 mt-4">
          <Link
            className="text-blue-400 underline"
            href="https://twitter.com/kumneger0"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              className="h-10 w-10 "
              y="0px"
              viewBox="0 0 50 50"
            >
              <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
            </svg>
          </Link>
          <Link
            target="_blank"
            className="text-blue-400 underline"
            href="https://www.linkedin.com/in/kumneger-wondimu-2b8405241/"
          >
            <Linkedin className="h-10 w-10" />
          </Link>
          <Link
            target="_blank"
            className="text-blue-400 underline"
            href="https://github.com/kumneger0"
          >
            <GithubIcon className="text-white w-10 h-10" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Footer;

function Component() {
  return (
    <>
      <div className="space-y-2 my-3">
        <h1 className="text-4xl font-bold tracking-tight w-full text-center">
          Get in touch
        </h1>
      </div>

      <div className="w-full  h-full items-center flex md:flex-row flex-col justify-between  gap-5">
        <div className="mx-auto md:w-[50%] flex justify-center w-full px-4 max-w-3xl space-y-8">
          <ContactForm />
        </div>
      </div>
    </>
  );
}

const ContactForm = () => {
  return (
    <div className="w-full bg-[linear-gradient(#212121,_#212121)_padding-box,_linear-gradient(145deg,_transparent_35%,#e81cff,_#40c9ff)_border-box] border-[2px]  border-[solid] px-[24px] py-[32px] text-[14px] [font-family:inherit] text-[white] flex flex-col gap-[20px] box-border rounded-[16px]">
      <form
        action={`https://formspree.io/f/mqkveeoy`}
        className="flex flex-col gap-[20px]"
        method="post"
      >
        <div className="flex flex-col gap-[2px]">
          <label
            htmlFor="name"
            className="block mb-[5px] text-white font-semibold text-[12px]"
          >
            Name
          </label>
          <input
            className="w-full px-[16px] py-[12px] rounded-[8px] text-[#fff] [font-family:inherit] bg-transparent border-[1px] border-[solid] border-[#414141] placeholder:opacity-50 focus:outline-[none] focus:border-[#e81cff]"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            required
          />
        </div>
        <div className="flex flex-col gap-[2px]">
          <label
            htmlFor="email"
            className="block mb-[5px] text-white font-semibold text-[12px]"
          >
            Email
          </label>
          <input
            className="w-full px-[16px] py-[12px] rounded-[8px] text-[#fff] [font-family:inherit] bg-transparent border-[1px] border-[solid] border-[#414141] placeholder:opacity-50 focus:outline-[none] focus:border-[#e81cff]"
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="flex flex-col gap-[2px]">
          <label
            className="block mb-[5px] text-white font-semibold text-[12px]"
            htmlFor="textarea"
          >
            Message
          </label>
          <Textarea
            className="w-full px-[16px] py-[12px] rounded-[8px] resize-none text-[#fff] h-[96px] border-[1px] border-[solid] border-[#414141] bg-transparent [font-family:inherit] focus:outline-[none] focus:border-[#e81cff] placeholder:opacity-50"
            name="message"
            id="textarea"
            rows={10}
            cols={50}
            required
            placeholder="Type Your message ...."
          />
        </div>
        <button
          className="flex items-start justify-center self-start [font-family:inherit] text-white hover:text-[#717171] font-semibold w-2/5 bg-[#313131] border-[1px] border-[solid] border-[#414141] px-[16px] py-[12px] [font-size:inherit] gap-[8px] mt-[8px] cursor-pointer rounded-[6px] hover:bg-[#fff] hover:border-[#fff]"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
