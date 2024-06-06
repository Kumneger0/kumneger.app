import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { Home } from '@/routes'

function NotFound() {
  return (
    <div className="flex justify-center items-center w-full max-w-7x uto min-h-[90svh]">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
        <p className="mb-4 text-lg">Oops! Looks like you're lost.</p>
        <div className="animate-bounce">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
        <p className="mt-4 ">
          Let's get you back{" "}
          <Home.Link>
            <Button className="p-0" variant={"link"}>
              home
            </Button>
          </Home.Link>
        </p>
      </div>
    </div>
  );
}

export default NotFound;
