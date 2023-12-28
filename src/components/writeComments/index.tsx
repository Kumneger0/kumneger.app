"use client";
import { createComment } from "@/app/actions/action";
import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";

type Details = Record<string, string>;
function PostComments({ asset_id }: { asset_id: string }) {
  const { data } = useSession();

  const details = {
    userEmail: data?.user?.email ?? null,
    asset_id,
  } satisfies Record<"userEmail" | "asset_id", string | null>;

  const createCommentsWithDetails = createComment.bind(null, details);

  return (
    <form action={createCommentsWithDetails}>
      <input type="text" name="content" placeholder="write a comment" />
      <Button
        variant={"link"}
        className={`${!!data?.user == false ? "opacity-50" : ""}`}
        disabled={!!data?.user == false}
        type="submit">
        Submit
      </Button>
    </form>
  );
}

export default PostComments;
