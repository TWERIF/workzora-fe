import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface TipTapEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const ToolButton = ({ active, label, onClick, children }: { active?: boolean; label: string; onClick: () => void; children: ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    title={label}
    aria-label={label}
    aria-pressed={active}
    className={`flex h-7 min-w-7 items-center justify-center rounded-md px-1 text-xs transition-colors ${
      active ? "bg-primary text-white" : "text-main-100 hover:bg-primary-10 hover:text-primary"
    }`}
  >
    {children}
  </button>
);

const Toolbar = ({ editor, t }: { editor: Editor; t: (key: string) => string }) => (
  <div className="flex items-center justify-between gap-2 border-b border-main-10 bg-main-5 px-2 py-1">
    <div className="flex items-center gap-1">
      <ToolButton label={t("editor.bold")} active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <b>B</b>
      </ToolButton>
      <ToolButton label={t("editor.italic")} active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <i>I</i>
      </ToolButton>
      <ToolButton label={t("editor.bullets")} active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        ••
      </ToolButton>
      <ToolButton label={t("editor.numbers")} active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        1.
      </ToolButton>
    </div>
    <div className="flex items-center gap-1">
      <ToolButton label={t("editor.undo")} onClick={() => editor.chain().focus().undo().run()}>
        ↶
      </ToolButton>
      <ToolButton label={t("editor.redo")} onClick={() => editor.chain().focus().redo().run()}>
        ↷
      </ToolButton>
    </div>
  </div>
);

export default function TipTapEditor({ value, onChange }: TipTapEditorProps) {
  const { t } = useTranslation("common");
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-[220px] p-4 text-sm outline-none [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-1 [&_ul]:list-disc [&_ul]:pl-5",
      },
    },
    onUpdate: ({ editor: current }) => onChange(current.getHTML()),
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== value) editor.commands.setContent(value, { emitUpdate: false });
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-[10px] border border-main-10 bg-background focus-within:border-primary">
      <Toolbar editor={editor} t={t} />
      <EditorContent editor={editor} />
    </div>
  );
}
