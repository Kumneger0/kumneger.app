import { createComment } from "@/app/actions/action";
import { signIn, useSession } from "next-auth/react";
import React, {
  Dispatch,
  ElementRef,
  SetStateAction,
  startTransition,
  useEffect,
  useRef
} from "react";
import { Button } from "../ui/button";
//@ts-ignore
import { useFormStatus } from "react-dom";
import { LoginModal } from "../blogHeader/blogHeader";
import { useRouter } from "next/navigation";
import { Comments } from "../comments";

function PostComments({
  asset_id,
  setComments
}: {
  asset_id: string;
  setComments: Dispatch<SetStateAction<Comments>>;
}) {
  const { data, status } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<ElementRef<typeof LoginModal>>(null);
  const router = useRouter();
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

  const postComment = async (formData: FormData) => {
    const data = await createCommentsWithDetails(formData);

    console.log(data);
    if (data) {
      startTransition(() =>
        setComments((prv) => {
          prv.comments.unshift(data satisfies typeof prv.comments);
          prv.total += 1;
          return prv;
        })
      );
      alert("set in ");
    }
    inputRef.current?.value === "";
    router.refresh();
  };

  return (
    <>
      <form action={postComment}>
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
