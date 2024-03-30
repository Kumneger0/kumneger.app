import { GithubIcon, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
