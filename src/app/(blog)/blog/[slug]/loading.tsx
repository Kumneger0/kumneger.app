import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
function Loading() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="my-2">
        <Skeleton className="font-bold text-lg my-2 bg-slate-400 w-32 h-4"></Skeleton>
        <Skeleton className="w-40 h-3 bg-slate-400"></Skeleton>
      </div>
      <div>
        <Skeleton className="w-full rounded-[8px] bg-gray-500 max-w-5xl h-[600px]" />
      </div>
      <div>
        <h1 className="font-bold text-3xl mt-5 w-56 h-3"></h1>
      </div>
    </div>
  );
}

export default Loading;
