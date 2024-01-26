import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingComments() {
  return (
    <div className="max-w-5xl mx-auto w-full">
      {Array.from({ length: 5 }, () => (
        <Skeleton className="flex w-4/5 mx-auto bg-gray-400 my-2 rounded-[8px] items-center justify-start  space-x-4 px-4">
          <div>
            <Skeleton className="rounded-full bg-slate-500 w-10 h-10 object-cover object-center" />
          </div>
          <div className="text-sm font-semibold">
            <Skeleton className="text-[0.8em] w-40 h-3 bg-slate-500 text-sm font-normal" />
          </div>
        </Skeleton>
      ))}
    </div>
  );
}

export default LoadingComments;
