"use client";
import React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon
} from "react-share";

const ShareButtons = () => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const title =
    typeof document !== "undefined"
      ? document.title
      : "Check out this awesome content!";

  return (
    <div>
      <p className="font-bold text-xl md:text-2xl">
        Did you find this useful? Share it with your friends!
      </p>
      <div className="flex justify-items-start gap-2 items-center">
        <FacebookShareButton url={shareUrl} title={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <LinkedinShareButton url={shareUrl}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
    </div>
  );
};

export default ShareButtons;
