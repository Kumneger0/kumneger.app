import SyntaxHighlighter from "react-syntax-highlighter";
import {
  dark,
  github,
  darcula,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

export const Heading = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="font-bold text-2xl mt-5">{children}</h1>;
};

export const Paragraph = ({ children }: { children: React.ReactNode }) => {
  return <p>{children}</p>;
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
    <code className="w-auto min-w-full relative text-white max-w-fit overflow-auto p-3 my-20">
      <SyntaxHighlighter language="javascript" style={darcula}>
        {children}
      </SyntaxHighlighter>
      <button
        onClick={() => copyCodeToClipboard(children)}
        className="absolute -bottom-80 top-2">
        cp
      </button>
    </code>
  );
};
