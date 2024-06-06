"use client";

import React from "react";

function ErrorComponent(props : any) {
  return (
    <div className="min-h-[80svh] w-full flex justify-center items-center">
      <div>{JSON.stringify(props)}</div>
    </div>
  );
}

export default ErrorComponent;
