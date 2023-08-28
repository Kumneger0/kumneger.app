import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const Heading = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="font-bold capitalize text-2xl mt-5">{children}</h1>;
};
export const Heading2 = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="font-bold capitalize text-xl mt-5">{children}</h2>;
};

export const Paragraph = ({ children }: { children: React.ReactNode }) => {
  return <p className="py-5 capitalize">{children}</p>;
};

export const Code = ({ children }: { children: React.ReactNode }) => {
  function copyCodeToClipboard(text: React.ReactNode) {
    navigator.clipboard
      .writeText(text as string)
      .then(() => {
        alert("copied");
      })
      .catch((err) => {
        alert("failed for some reason");
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
        cp
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
