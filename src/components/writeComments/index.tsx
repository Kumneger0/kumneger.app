import { createComment } from "@/app/actions/action";
import { signIn, useSession } from "next-auth/react";
import React, { ElementRef, useEffect, useRef } from "react";
import { Button } from "../ui/button";
//@ts-ignore
import { useFormStatus } from "react-dom";
import { LoginModal } from "../blogHeader/blogHeader";

function PostComments({ asset_id }: { asset_id: string }) {
  const { data, status } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<ElementRef<typeof LoginModal>>(null);

  const handleUserLoginStatus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (status === "unauthenticated") {
      modalRef.current?.openModal();
    }
  };

  const details = {
    userEmail: data?.user?.email ?? "",
    asset_id
  } satisfies Record<"userEmail" | "asset_id", string | null>;

  const createCommentsWithDetails = createComment.bind(null, details);

  return (
    <>
      <form action={createCommentsWithDetails}>
        <input
          ref={inputRef}
          onFocus={handleUserLoginStatus}
          className="border-2 text-black border-gray-300 rounded-md p-2"
          required
          autoCapitalize="on"
          spellCheck
          autoFocus
          type="text"
          name="content"
          placeholder="write a comment"
        />
        <SubmitForm />
      </form>
      <div className="hidden">
        <LoginModal ref={modalRef}>
          <div></div>
        </LoginModal>
      </div>
    </>
  );
}

export default PostComments;

export function SubmitForm() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      className={`${pending ? "opacity-50 cursor-not-allowed" : ""}`}
      variant={"secondary"}
      type="submit"
    >
      {pending ? "Loading..." : "post"}
    </Button>
  );
}
