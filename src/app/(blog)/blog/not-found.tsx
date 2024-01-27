import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="w-full grid place-items-center max-w-6xl mx-auto h-full">
      <div>The Page You are looking for is not found</div>
      <div>
        <Link href={"/"}>Back To Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
