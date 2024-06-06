"use client";

import React from "react";

function Error(props: { error: Error }) {
  return (
    <div className="min-h-[80svh] w-full flex justify-center items-center">
      <div className="">There was an errror occured</div>
    </div>
  );
}

export default Error;
