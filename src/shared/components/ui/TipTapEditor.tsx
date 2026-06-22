"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface TipTapEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TipTapEditor({
  value,
  onChange,
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[250px] p-4 outline-none text-text dark:text-text-dark",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const currentValue = editor.getHTML();

    if (currentValue !== value) {
      editor.commands.setContent(value, {
        emitUpdate: false,
      });
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div
      className="
        overflow-hidden rounded-20 border border-border
        bg-input shadow-input
        dark:bg-input-dark dark:shadow-input-dark
      "
    >
      <div className="flex flex-wrap gap-2 border-b border-border p-3">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded px-3 py-1 text-sm ${
            editor.isActive("bold")
              ? "bg-success text-white"
              : "border border-border"
          }`}
        >
          B
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded px-3 py-1 text-sm ${
            editor.isActive("italic")
              ? "bg-success text-white"
              : "border border-border"
          }`}
        >
          I
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className={`rounded px-3 py-1 text-sm ${
            editor.isActive("bulletList")
              ? "bg-success text-white"
              : "border border-border"
          }`}
        >
          • List
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className={`rounded px-3 py-1 text-sm ${
            editor.isActive("orderedList")
              ? "bg-success text-white"
              : "border border-border"
          }`}
        >
          1. List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="rounded border border-border px-3 py-1 text-sm"
        >
          Undo
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="rounded border border-border px-3 py-1 text-sm"
        >
          Redo
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}