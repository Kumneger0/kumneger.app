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
      <DialogTrigger ref={dialogTriggerRef} className="text-white">
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
              sign in with gihtub
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
              <Button className="text-white" onClick={() => signOut()}>
                sign out
              </Button>
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
