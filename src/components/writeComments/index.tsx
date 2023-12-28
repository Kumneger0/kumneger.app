"use client";
import { createComment } from "@/app/actions/action";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";

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
      <input type="text" name="content" placeholder="write a comment" />
      <Button variant={"link"} type="submit">
        Submit
      </Button>
    </form>
  );
}

export default PostComments;
