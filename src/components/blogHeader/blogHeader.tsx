"use client";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

function blogHeader() {
  const { data, status } = useSession();

  return (
    <>
      <header className="bg-gray-800 p-5  w-full z-50 overflow-x-hidden">
        <nav className="flex items-center justify-between flex-wrap w-4/5 max-w-7xl mx-auto lg:gap-20">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Link
              href="/"
              className="group text-white max-[500px]:text-lg flex  items-center gap-2 text-2xl transition duration-300 font-serif"
            >
              Kumneger
              <span className="block z-50 max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
            </Link>
          </div>
          <div>
            {status === "authenticated" ? (
              <Button onClick={() => signOut()}>sign out</Button>
            ) : (
              <LoginModal>Sign in</LoginModal>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}

export default blogHeader;

export function LoginModal({ children }: { children: React.ReactNode }) {
  const [providers, setProvires] =
    useState<Awaited<ReturnType<typeof getProviders>>>();
  useEffect(() => {
    (async () => {
      const providers = await getProviders();
      setProvires(providers);
    })();
  }, []);

  return (
    <Dialog>
      <DialogTrigger className="text-white">{children}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Select login method</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {providers?.github ? (
            <Button
              onClick={() => {
                signIn("github", { callbackUrl: location.href });
              }}
              className="capitalize"
              variant={"secondary"}
            >
              sign in with gihtub
            </Button>
          ) : null}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
