"use client";

import React from "react";

function Error(props: { error: Error }) {
  return <div className='min-h-[80svh] w-full flex justify-center items-center'>
    <div className="capitalize">{props.error.message}</div>
  </div>;
}

export default Error;
