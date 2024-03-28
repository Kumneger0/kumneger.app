import { createComment } from "@/app/actions/action";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ElementRef, forwardRef, useRef } from "react";
import { useFormStatus } from "react-dom";
import { LoginModal } from "../blogHeader/blogHeader";
import { commentIdAtom } from "../commentActions";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  getDefaultKeyBinding
} from "draft-js";
import "./rich.css";

import { useState, useCallback } from "react";

export const RichEditorExample = ({
  ref,
  editorState,
  setEditorState
}: {
  ref?: React.RefObject<ElementRef<typeof Editor>>;
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}) => {
  const focus = () => document.getElementById("editor")?.focus();

  const handleKeyCommand = useCallback((command: any, editorState: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  }, []);

  const mapKeyToEditorCommand = useCallback(
    (e: any) => {
      if (e.keyCode === 9 /* TAB */) {
        const newEditorState = RichUtils.onTab(
          e,
          editorState,
          4 /* maxDepth */
        );
        if (newEditorState !== editorState) {
          setEditorState(newEditorState);
        }
        return;
      }
      return getDefaultKeyBinding(e);
    },
    [editorState]
  );

  const toggleBlockType = useCallback(
    (blockType: any) => {
      setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    },
    [editorState]
  );

  const toggleInlineStyle = useCallback(
    (inlineStyle: any) => {
      setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    },
    [editorState]
  );

  // Assuming getBlockStyle and styleMap are defined elsewhere in your code
  // and are not class-specific.

  return (
    <div className="RichEditor-root text-black">
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />
      <div className="RichEditor-editor" onClick={focus}>
        {/* @ts-ignore */}
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={setEditorState}
          placeholder="Write you Comment"
          spellCheck={true}
        />
      </div>
    </div>
  );
};

// export default RichEditorExample;

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block: any) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}
const StyleButton = <T extends Record<string, any>>({
  onToggle,
  active,
  label,
  style
}: T) => {
  const handleToggle = useCallback(
    (e: any) => {
      e.preventDefault();
      onToggle(style);
    },
    [onToggle, style]
  );

  let className = "RichEditor-styleButton";
  if (active) {
    className += " RichEditor-activeButton";
  }

  return (
    <span className={className} onMouseDown={handleToggle}>
      {label}
    </span>
  );
};

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" }
];

const BlockStyleControls = (props: { onToggle?: any; editorState?: any }) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" }
];

const InlineStyleControls = (props: {
  editorState: { getCurrentInlineStyle: () => any };
  onToggle: any;
}) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

function PostComments({ asset_id }: { asset_id: string }) {
  const { data, status } = useSession();
  const inputRef = useRef<ElementRef<typeof Editor>>(null);
  const modalRef = useRef<ElementRef<typeof LoginModal>>(null);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

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
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const jsonString = JSON.stringify(rawContent);

    formData.set("content", jsonString);

    if (status === "unauthenticated") {
      modalRef.current?.openModal();
      return;
    }
    const data = await createCommentsWithDetails(formData);

    router.refresh();
    setEditorState(EditorState.createEmpty());
  };

  return (
    <>
      <section className="mt-12">
        <h2 className="text-3xl font-bold text-center">Add a Comment</h2>

        <Card className="border-none">
          <CardContent>
            <form action={postComment} className="space-y-4">
              <RichEditorExample
                ref={inputRef}
                editorState={editorState}
                setEditorState={setEditorState}
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
