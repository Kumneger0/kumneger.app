import Link from "next/link";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { MDXComponents } from "mdx/types";

import SyntaxHighlighter from "react-syntax-highlighter";
import { paraisoDark as theme } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const Heading = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="font-bold capitalize text-2xl mt-3">{children}</h1>;
};
export const Heading2 = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="font-bold capitalize text-xl  mt-2">{children}</h2>;
};

export const Paragraph = ({ children }: { children: React.ReactNode }) => {
  return <p className="mt-2">{children}</p>;
};

export const Code = ({ children }: { children: React.ReactNode }) => {
  const [isCopied, setIsCopied] = useState(false);
  function copyCodeToClipboard(text: React.ReactNode) {text
    navigator.clipboard
      .writeText(text as string)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => {
        alert("failed to copy");
      })
      .finally(() => setTimeout(() => setIsCopied(false), 1000));
  }

  return (
    <div className="w-auto min-w-full relative text-white max-w-fit  overflow-auto px-3 py-5 my-3">
      <SyntaxHighlighter language="javascript" style={theme}>
        {children as string}
      </SyntaxHighlighter>
      <button
        onClick={() => copyCodeToClipboard(children)}
        className="absolute right-5 top-7"
      >
        {!isCopied ? <Copy className = "w-5 h-5"/> : <Check className = "w-7 h-7"/>}
      </button>
    </div>
  );
};
export function LinkComponent<
  T extends { href: string; children: React.ReactNode }
>({ href, children }: T) {
  return (
    <Link target="_blank" className="underline text-blue-500" href={href}>
      {children}
    </Link>
  );
}

export const Strong = ({ children }: { children: React.ReactNode }) => {
  return (
    <strong className="bg-white text-black px-1 py-0.5 mx-2 my-3 rounded-xl">
      {children}
    </strong>
  );
};

export const UL: MDXComponents["ul"] = ({ children }) => {
  return <ul className="md:ml-2 my-2 list-square">{children}</ul>;
};

export const Li: MDXComponents["li"] = ({ children }) => {
  return <li className="my-3">{children}</li>;
};
