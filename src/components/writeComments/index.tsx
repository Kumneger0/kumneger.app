import { createComment } from "@/app/actions/action";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
//@ts-ignore
import { useFormStatus } from "react-dom";

function PostComments({ asset_id }: { asset_id: string }) {
  const { data } = useSession();

  if (!data?.user?.email)
    return (
      <div>
        <div>
          you need to
          <Button variant={"link"} onClick={async () => await signIn()}>
            sign in
          </Button>
          to post comment
        </div>
      </div>
    );

  const details = {
    userEmail: data?.user?.email ?? null,
    asset_id,
  } satisfies Record<"userEmail" | "asset_id", string | null>;

  const createCommentsWithDetails = createComment.bind(null, details);

  return (
    <form action={createCommentsWithDetails}>
      <input
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
      type="submit">
      {pending ? "Loading..." : "post"}
    </Button>
  );
}
