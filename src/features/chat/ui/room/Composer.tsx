import { IconClose, IconImage, IconUpload } from "@/shared/components/svg/UiIcons";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const MAX_FILE_BYTES = 20 * 1024 * 1024;
const MAX_FILES = 5;
const EMOJIS = ["👍", "🙂", "😂", "🙏", "🔥", "🎉", "✅", "❤️", "👀", "🤝", "💡", "⏳"];

interface ComposerProps {
    disabled?: boolean;
    sending: boolean;
    onSend: (text: string, files: File[]) => Promise<boolean>;
}

function ToolButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
    return (
        <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={onClick}
            title={label}
            aria-label={label}
            className="flex h-7 min-w-7 items-center justify-center rounded-md px-1 text-xs text-main-100 transition-colors hover:bg-primary-10 hover:text-primary"
        >
            {children}
        </button>
    );
}

function FileThumb({ file, onRemove }: { file: File; onRemove: () => void }) {
    const { t } = useTranslation("chat");
    const url = useMemo(() => (file.type.startsWith("image/") ? URL.createObjectURL(file) : null), [file]);
    useEffect(() => () => (url ? URL.revokeObjectURL(url) : undefined), [url]);

    return (
        <div className="relative h-[50px] w-[50px] shrink-0">
            {url ? (
                <img src={url} alt={file.name} className="h-full w-full rounded-[10px] object-cover" />
            ) : (
                <span className="flex h-full w-full items-center justify-center rounded-[10px] border border-main-10 bg-background px-1 text-center text-[9px] uppercase text-main-50">
                    {file.name.split(".").pop()}
                </span>
            )}
            <button
                type="button"
                onClick={onRemove}
                aria-label={t("room.removeFile", { name: file.name })}
                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-status-danger text-white"
            >
                <IconClose size={12} />
            </button>
        </div>
    );
}

export default function Composer({ disabled, sending, onSend }: ComposerProps) {
    const { t } = useTranslation("chat");
    const [text, setText] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [showEmoji, setShowEmoji] = useState(false);
    const area = useRef<HTMLTextAreaElement>(null);
    const fileInput = useRef<HTMLInputElement>(null);
    const imageInput = useRef<HTMLInputElement>(null);

    const replaceSelection = (transform: (selected: string) => string) => {
        const el = area.current;
        if (!el) return;
        const { selectionStart: start, selectionEnd: end } = el;
        const next = text.slice(0, start) + transform(text.slice(start, end)) + text.slice(end);
        setText(next);
        requestAnimationFrame(() => {
            el.focus();
            const caret = start + transform(text.slice(start, end)).length;
            el.setSelectionRange(caret, caret);
        });
    };

    const wrap = (marker: string) => replaceSelection((selected) => `${marker}${selected || " "}${marker}`);
    const prefixLines = (numbered: boolean) =>
        replaceSelection((selected) =>
            (selected || "")
                .split("\n")
                .map((line, index) => `${numbered ? `${index + 1}.` : "-"} ${line}`)
                .join("\n"),
        );
    const insert = (value: string) => replaceSelection(() => value);

    const addFiles = (list: FileList | null) => {
        if (!list) return;
        const picked = Array.from(list);
        if (picked.some((file) => file.size > MAX_FILE_BYTES)) toast.error(t("room.fileTooBig"));
        setFiles((current) => [...current, ...picked.filter((file) => file.size <= MAX_FILE_BYTES)].slice(0, MAX_FILES));
    };

    const submit = async () => {
        if (disabled || sending || (!text.trim() && !files.length)) return;
        if (await onSend(text.trim(), files)) {
            setText("");
            setFiles([]);
        }
    };

    const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            void submit();
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-[10px] border border-main-10 bg-background">
                <div className="flex flex-wrap items-center gap-1 border-b border-main-10 bg-main-5 px-2 py-1">
                    <ToolButton label={t("room.toolbar.bold")} onClick={() => wrap("**")}>
                        <b>B</b>
                    </ToolButton>
                    <ToolButton label={t("room.toolbar.italic")} onClick={() => wrap("*")}>
                        <i>I</i>
                    </ToolButton>
                    <ToolButton label={t("room.toolbar.underline")} onClick={() => wrap("__")}>
                        <u>U</u>
                    </ToolButton>
                    <ToolButton label={t("room.toolbar.strike")} onClick={() => wrap("~~")}>
                        <s>S</s>
                    </ToolButton>
                    <span className="mx-1 h-4 w-px bg-main-10" />
                    <ToolButton label={t("room.toolbar.bullets")} onClick={() => prefixLines(false)}>
                        ••
                    </ToolButton>
                    <ToolButton label={t("room.toolbar.numbers")} onClick={() => prefixLines(true)}>
                        1.
                    </ToolButton>
                    <span className="mx-1 h-4 w-px bg-main-10" />
                    <div className="relative">
                        <ToolButton label={t("room.toolbar.emoji")} onClick={() => setShowEmoji((value) => !value)}>
                            🙂
                        </ToolButton>
                        {showEmoji && (
                            <div className="absolute left-0 top-8 z-20 grid w-[168px] grid-cols-6 gap-1 rounded-[10px] border border-main-10 bg-background p-2 shadow-input">
                                {EMOJIS.map((emoji) => (
                                    <button
                                        key={emoji}
                                        type="button"
                                        onMouseDown={(event) => event.preventDefault()}
                                        onClick={() => {
                                            insert(emoji);
                                            setShowEmoji(false);
                                        }}
                                        className="rounded-md p-0.5 text-lg hover:bg-main-5"
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <ToolButton
                        label={t("room.toolbar.link")}
                        onClick={() => {
                            const url = window.prompt(t("room.toolbar.linkPrompt"));
                            if (url && /^https?:\/\//.test(url.trim())) insert(` ${url.trim()} `);
                        }}
                    >
                        🔗
                    </ToolButton>
                    <ToolButton label={t("room.toolbar.image")} onClick={() => imageInput.current?.click()}>
                        <IconImage size={16} />
                    </ToolButton>
                </div>
                <textarea
                    ref={area}
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    onKeyDown={onKeyDown}
                    rows={4}
                    maxLength={5000}
                    disabled={disabled}
                    placeholder={t("room.placeholder")}
                    aria-label={t("room.placeholder")}
                    className="block w-full resize-y bg-transparent p-3 text-sm outline-none placeholder:text-main-50 disabled:opacity-60"
                />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-2 px-2.5">
                    <span className="text-xs text-main-50">{t("room.examples")}</span>
                    <div className="flex flex-wrap items-center gap-2.5">
                        {files.map((file, index) => (
                            <FileThumb key={`${file.name}-${index}`} file={file} onRemove={() => setFiles((current) => current.filter((_, i) => i !== index))} />
                        ))}
                        {files.length < MAX_FILES && (
                            <button
                                type="button"
                                onClick={() => fileInput.current?.click()}
                                disabled={disabled}
                                title={t("room.addExample")}
                                aria-label={t("room.addExample")}
                                className="flex h-[50px] w-[50px] items-center justify-center rounded-[10px] border border-dashed border-primary/40 text-primary transition-colors hover:bg-primary-10"
                            >
                                <IconUpload size={18} />
                            </button>
                        )}
                    </div>
                    <input ref={fileInput} type="file" multiple className="hidden" onChange={(event) => { addFiles(event.target.files); event.target.value = ""; }} />
                    <input ref={imageInput} type="file" accept="image/*" multiple className="hidden" onChange={(event) => { addFiles(event.target.files); event.target.value = ""; }} />
                </div>
                <button
                    type="button"
                    onClick={() => void submit()}
                    disabled={disabled || sending || (!text.trim() && !files.length)}
                    className="h-[45px] shrink-0 rounded-full bg-gradient px-10 text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                    {sending ? t("room.sending") : t("room.send")}
                </button>
            </div>
        </div>
    );
}
