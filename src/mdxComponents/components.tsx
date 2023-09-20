import Link from "next/link";
import { useState } from "react";
import { BiCopy } from "react-icons/bi";
import { BsBookmarkCheck } from "react-icons/bs";

import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const Heading = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="font-bold capitalize text-2xl mt-5">{children}</h1>;
};
export const Heading2 = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="font-bold capitalize text-xl mt-5">{children}</h2>;
};

export const Paragraph = ({ children }: { children: React.ReactNode }) => {
  return <p className="py-5 ">{children}</p>;
};

export const Code = ({ children }: { children: React.ReactNode }) => {
  const [isCopied, setIsCopied] = useState(false);
  function copyCodeToClipboard(text: React.ReactNode) {
    navigator.clipboard
      .writeText(text as string)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => {
        alert("failed to copy");
      });
  }

  return (
    <div className="w-auto min-w-full relative text-white max-w-fit overflow-auto p-3 my-5">
      <SyntaxHighlighter language="javascript" style={atomOneDark}>
        {children as string}
      </SyntaxHighlighter>
      <button
        onClick={() => copyCodeToClipboard(children)}
        className="absolute right-5 top-5">
        {!isCopied ? <BiCopy /> : <BsBookmarkCheck />}
      </button>
    </div>
  );
};
export function LinkComponent<
  T extends { href: string; children: React.ReactNode }
>({ href, children }: T) {
  return (
    <Link target="_blank" className="underline text-blue-600" href={href}>
      {children}
    </Link>
  );
}

export const Strong = ({ children }: { children: React.ReactNode }) => {
  return (
    <strong className="bg-slate-200 text-black px-1 rounded-md">
      {children}
    </strong>
  );
};