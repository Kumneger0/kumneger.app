"use client";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import Link from "next/link";
import { useEffect, useRef, useState, type ElementRef } from "react";

export const LoginModal = ({
  children,
  ref
}: {
  children: React.ReactNode;
  ref: React.RefObject<ElementRef<typeof DialogTrigger>>;
}) => {
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
      <DialogTrigger id="modal" ref={ref} className="text-white">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader className="flex flex-col items-center text-center">
          <DialogTitle className="text-2xl font-bold">
            Welcome back!
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            Sign in to your account to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-6">
          {providers?.github ? (
            <Button
              onClick={() => {
                signIn("github", { callbackUrl: location.href });
              }}
              className="w-full"
              variant="outline"
            >
              <GithubIcon className="mr-2 h-5 w-5" />
              Sign in with GitHub
            </Button>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

function blogHeader() {
  const { data, status } = useSession();

  const openModalRef = useRef<ElementRef<typeof DialogTrigger> | null>(null);

  return (
    <div className="min-w-screen bg-gray-800">
      <header className="flex justify-between py-5 items-center  max-w-5xl mx-auto w-11/12  z-10">
        <div className="">
          <Link href={"/"}>
            <h1 className="text-2xl font-bold text-white">Kumneger</h1>
          </Link>
        </div>
        <div className="">
          {status === "authenticated" ? (
            <Button
              className="bg-blue-700 hover:bg-blue-600 rounded-[8px] text-white"
              onClick={() => signOut()}
            >
              sign out
            </Button>
          ) : (
            <>
              <LoginModal ref={openModalRef}>Sign in</LoginModal>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default blogHeader;

function GithubIcon(props: React.HtmlHTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
