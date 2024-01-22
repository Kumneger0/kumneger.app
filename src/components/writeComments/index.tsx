import { createComment } from "@/app/actions/action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, {
  Dispatch,
  ElementRef,
  SetStateAction,
  startTransition,
  useRef
} from "react";
import { useFormStatus } from "react-dom";
import { LoginModal } from "../blogHeader/blogHeader";
import { Comments } from "../comments";
import { Button } from "../ui/button";
import { commentIdAtom } from "../commentActions";
import { useAtom } from "jotai";

function PostComments({ asset_id }: { asset_id: string }) {
  const { data, status } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<ElementRef<typeof LoginModal>>(null);
  const router = useRouter();

  const [id, setId] = useAtom(commentIdAtom);

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
    if (status === "unauthenticated") {
      modalRef.current?.openModal();
      return;
    }
    const data = await createCommentsWithDetails(formData);

    console.log(data);

    if (inputRef.current) inputRef.current.value = "";

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
          type="text"
          name="content"
          placeholder="write a comment"
        />
        <SubmitForm />
      </form>
      <div className="hidden">
        <LoginModal ref={modalRef}>
          <div />
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
