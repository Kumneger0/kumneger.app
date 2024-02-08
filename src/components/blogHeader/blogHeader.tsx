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
import {
  ElementRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";

export const LoginModal = forwardRef<
  { openModal: () => void },
  { children: React.ReactNode }
>(({ children }, ref) => {
  const [providers, setProvires] =
    useState<Awaited<ReturnType<typeof getProviders>>>();

  const dialogTriggerRef = useRef<ElementRef<typeof DialogTrigger>>(null);

  useImperativeHandle(ref, () => ({
    openModal: () => {
      dialogTriggerRef.current?.click();
    }
  }));

  useEffect(() => {
    (async () => {
      const providers = await getProviders();
      setProvires(providers);
    })();
  }, []);

  return (
    <Dialog>
      <DialogTrigger id="modal" ref={dialogTriggerRef} className="text-white">
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
              className="capitalize"
              variant={"secondary"}
            >
              sign in with github
            </Button>
          ) : null}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
});

function blogHeader() {
  const { data, status } = useSession();

  return (
    <div className="min-w-screen w-full fixed top-0 z-10 bg-gray-800">
      <header className="flex justify-between py-5 items-center bg-gray-800 sticky max-w-5xl w-11/12 top-0  z-10">
        <div className="">
          <h1 className="text-2xl font-bold ">Kumneger's Blog</h1>
        </div>
        <div className="">
          {status === "authenticated" ? (
            <Button className="text-white" onClick={() => signOut()}>
              sign out
            </Button>
          ) : (
            <LoginModal>Sign in</LoginModal>
          )}
        </div>
      </header>
    </div>
  );
}

export default blogHeader;
