import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

function NavBarMenu({ className }: { className: string }) {
  return (
    <div className={cn("flex w-1/2 items-start", className)}>
      <div>
        <Button variant={"link"}>
          <Link className="text-xl" href={"/"}>
            Home
          </Link>
        </Button>
      </div>
      <div className="h-full mt-2">/</div>
      <div>
        <Button variant={"link"}>
          <Link className="text-xl" href={"/blog"}>
            Blog
          </Link>
        </Button>
      </div>
      <div className="mt-2 h-full">/</div>
      <div>
        <Button variant={"link"}>
          <Link className="text-xl" href={"/about"}>
            About
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default NavBarMenu;
