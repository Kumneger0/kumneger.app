import { Link } from "lucide-react";
import React from "react";

function PublishedArticles() {
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold">Published Articles</h2>
      <ul className="list-inside list-disc mt-4 text-lg text-gray-300 space-y-4">
        <li>
          {/* <Link className="underline font-bold" href="#"> */}
          Understanding React Hooks
          {/* </Link> */}
          <p>
            A deep dive into understanding React Hooks and how to use them in
            your applications.
          </p>
        </li>
        <li>
          {/* <Link className="underline text-blue-400" href="#"> */}
          Demystifying GraphQL
          {/* </Link> */}
          <p>
            A comprehensive guide to understanding and implementing GraphQL in
            your applications.
          </p>
        </li>
        <li>
          {/* <Link className="underline text-blue-400" href="#"> */}
          Mastering TypeScript
          {/* </Link> */}
          <p>
            Learn how to supercharge your JavaScript development with
            TypeScript.
          </p>
        </li>
      </ul>
    </section>
  );
}

export default PublishedArticles;
