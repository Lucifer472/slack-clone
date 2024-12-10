"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Quill, { Delta, Op, QuillOptions } from "quill";

import {
  ALargeSmallIcon,
  ImageIcon,
  SendHorizontalIcon,
  SmileIcon,
} from "lucide-react";

import { Button } from "./ui/button";
import { Hint } from "./hint";

import { cn } from "@/lib/utils";

import "quill/dist/quill.snow.css";
import { EmojiPopover } from "./emoji-popover";

type EditorValue = {
  image: File | null;
  body: string;
};

type EditorProps = {
  variant?: "create" | "update";
  onSubmit: ({ image, body }: EditorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: React.MutableRefObject<Quill | null>;
};

const Editor = ({
  variant = "create",
  onCancel,
  onSubmit,
  placeholder = "Write something",
  defaultValue = [],
  disabled = false,
  innerRef,
}: EditorProps) => {
  const [text, setText] = useState("");
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const isEmpty = text.replace(/(.|\n)*?>/g, "").trim().length === 0;

  const container = useRef<HTMLDivElement>(null);

  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const disabledRef = useRef(disabled);

  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });

  useEffect(() => {
    if (!container.current) return;

    const cont = container.current;
    const editor = cont.appendChild(cont.ownerDocument.createElement("div"));

    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ["bold", "italic", "strike"],
          ["link"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: function () {
                return;
              },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: function () {
                quill.insertText(quill.getSelection()?.index || 0, "\n");
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editor, options);
    quillRef.current = quill;
    quillRef.current.focus();

    if (innerRef) {
      innerRef.current = quill;
    }

    quill.setContents(defaultValueRef.current);
    setText(quill.getText());

    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });

    return () => {
      quill.off(Quill.events.TEXT_CHANGE);
      if (cont) {
        cont.innerHTML = "";
      }

      if (quillRef.current) {
        quillRef.current = null;
      }

      if (innerRef) {
        innerRef.current = null;
      }
    };
  }, [innerRef]);

  const toggleToolbar = () => {
    setIsToolbarVisible((prev) => !prev);
    const toolbarElement = container.current?.querySelector(".ql-toolbar");

    if (toolbarElement) {
      toolbarElement.classList.toggle("hidden");
    }
  };

  const onEmojiSelect = (emoji: unknown) => {
    const quill = quillRef.current;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    quill?.insertText(quill?.getSelection()?.index || 0, emoji.native);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
        <div ref={container} className="h-full ql-custom" />
        <div className="flex px-2 relative pb-2 z-[5]">
          <Hint
            label={isToolbarVisible ? "Hide Formatting" : "Show Formatting"}
          >
            <Button
              disabled={disabled}
              size={"iconSm"}
              variant={"ghost"}
              onClick={toggleToolbar}
            >
              <ALargeSmallIcon />
            </Button>
          </Hint>
          <EmojiPopover onEmojiSelect={onEmojiSelect} hint="Emojis">
            <Button disabled={disabled} size={"iconSm"} variant={"ghost"}>
              <SmileIcon />
            </Button>
          </EmojiPopover>
          {variant === "create" && (
            <Hint label="Images">
              <Button
                disabled={disabled}
                size={"iconSm"}
                variant={"ghost"}
                onClick={() => {}}
              >
                <ImageIcon />
              </Button>
            </Hint>
          )}
          {variant === "create" ? (
            <Button
              className={cn(
                "ml-auto",
                isEmpty
                  ? "bg-white hover:bg-white text-muted-foreground"
                  : "bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              )}
              size={"iconSm"}
              disabled={disabled || isEmpty}
              onClick={() => {}}
            >
              <SendHorizontalIcon />
            </Button>
          ) : (
            <div className="ml-auto flex items-center gap-x-2">
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => {}}
                disabled={disabled}
              >
                Cancel
              </Button>
              <Button
                disabled={disabled || isEmpty}
                onClick={() => {}}
                size={"sm"}
                className="bg-[#007a5a] hover:bg-[#007a5a]/80"
              >
                Save
              </Button>
            </div>
          )}
        </div>
      </div>
      {variant == "create" && (
        <div
          className={cn(
            "p-2 text-[10px] text-muted-foreground flex justify-end transition-all",
            isEmpty ? "opacity-0" : "opacity-100"
          )}
        >
          <p>
            <strong>Shift + Enter</strong> to add new line
          </p>
        </div>
      )}
    </div>
  );
};

export default Editor;
