import { createComment } from "@/app/actions/action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ElementRef, useRef } from "react";
import { useFormStatus } from "react-dom";
import { LoginModal } from "../blogHeader/blogHeader";
import EmojiInput from "../emojiInput";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

function PostComments({ asset_id }: { asset_id: string }) {
  const { data, status } = useSession();
  const modalRef = useRef<ElementRef<typeof LoginModal>>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  const handleUserLoginStatus = () => {
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
    if (inputRef.current) inputRef.current.value = "";

    router.refresh();
  };

  return (
    <>
      <section className="mt-12">
        <h2 className="text-3xl font-bold text-center">Add a Comment</h2>

        <Card className="border-none">
          <CardContent>
            <EmojiInput
              onFocus={handleUserLoginStatus}
              handleSubmit={postComment}
            >
              <SubmitForm />
            </EmojiInput>
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
