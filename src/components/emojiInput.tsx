import EmojiPicker from "emoji-picker-react";
import React, { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";

function EmojiInput<T extends React.HtmlHTMLAttributes<HTMLFormElement>>({
  children,
  handleSubmit,
  ...prop
}: T & {
  children: React.ReactNode;
  handleSubmit: (FormData: FormData) => void;
}) {
  const [showPicker, setShowPicker] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  return (
    <>
      <form
        {...prop}
        action={(e) => {
          handleSubmit(e);
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        }}
      >
        <div className="w-full flex my-3 justify-end">
          {showPicker && (
            <EmojiPicker
              onEmojiClick={(e) => {
                if (inputRef.current) {
                  inputRef.current.value += e.emoji;
                }
              }}
            />
          )}
        </div>
        <div className="flex gap-5 items-center justify-between relative">
          <Textarea
            ref={inputRef}
            required
            autoCapitalize="on"
            spellCheck
            name="content"
            className="w-full p-2 border-white text-slate-300 rounded-xl"
            placeholder="Your Comment"
            rows={4}
          />
          <div className="absolute right-1">
            <Button
              type="button"
              onClick={() => setShowPicker((prv) => !prv)}
              className="text-3xl"
            >
              😃
            </Button>
          </div>
        </div>
        {children}
      </form>
    </>
  );
}

export default EmojiInput;
