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
import { Card, CardContent } from "../ui/card";

function PostComments({ asset_id }: { asset_id: string }) {
  const { data, status } = useSession();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<ElementRef<typeof LoginModal>>(null);
  const router = useRouter();

  const [id, setId] = useAtom(commentIdAtom);

  const handleUserLoginStatus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
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
      <section className="mt-12">
        <h2 className="text-3xl font-bold text-center">Add a Comment</h2>
        <Card className="border-none">
          <CardContent>
            <form action={postComment} className="space-y-4">
              <textarea
                ref={inputRef}
                onFocus={handleUserLoginStatus}
                required
                autoCapitalize="on"
                spellCheck
                name="content"
                className="w-full p-2 border text-black border-gray-300 rounded"
                placeholder="Your Comment"
                rows={4}
              />
              <SubmitForm />
            </form>
          </CardContent>
        </Card>
      </section>

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
      {pending ? "Loading..." : "Post Comment"}
    </Button>
  );
}
