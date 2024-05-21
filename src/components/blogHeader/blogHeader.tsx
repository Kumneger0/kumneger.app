"use client";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  useEffect,
  useRef,
  useState, 
  type ElementRef
} from "react";
import { Button } from "../ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

export const LoginModal = ({ children, ref } : {children : React.ReactNode, ref:React.RefObject<ElementRef<typeof DialogTrigger>>}) => {
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
              className="capitalize bg-gray-950 text-white shadow-sm rounded-[8px] hover:bg-gray-900"
            >
              <Github className="text-white mr-2" />
              sign in with github
            </Button>
          ) : null}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

function blogHeader() {
  const { data, status } = useSession();
  const openModalRef = useRef<ElementRef<typeof DialogTrigger> | null>(null)

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
            <LoginModal ref={openModalRef}>Sign in</LoginModal>
          )}
        </div>
      </header>
    </div>
  );
}

export default blogHeader;
