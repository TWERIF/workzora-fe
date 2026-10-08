import { IconUser } from "@/shared/components/svg/UiIcons";
import { useTranslation } from "react-i18next";
import type { ChatMessage } from "../../model/types";
import RichText from "./RichText";

const IMAGE_EXT = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "avif"];

const fileInfo = (url: string) => {
    let name = url;
    try {
        name = decodeURIComponent(new URL(url).pathname.split("/").pop() || url);
    } catch {
        name = url.split("/").pop() || url;
    }
    const ext = (name.split(".").pop() || "").toLowerCase();
    return { name, ext, isImage: IMAGE_EXT.includes(ext) };
};

const EXT_COLORS: Record<string, string> = {
    pdf: "bg-[#E5322D]",
    doc: "bg-[#2B579A]",
    docx: "bg-[#2B579A]",
    xls: "bg-[#217346]",
    xlsx: "bg-[#217346]",
    zip: "bg-[#8E6E3C]",
};

export function Attachment({ url }: { url: string }) {
    const { t } = useTranslation("chat");
    const { name, ext, isImage } = fileInfo(url);
    if (isImage) {
        return (
            <a href={url} target="_blank" rel="noopener noreferrer" className="block h-[70px] w-[70px] overflow-hidden rounded-[10px] bg-background">
                <img src={url} alt={name} loading="lazy" className="h-full w-full object-cover transition-opacity hover:opacity-90" />
            </a>
        );
    }
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${t("room.download")} ${name}`}
            className="flex h-[70px] max-w-[220px] items-center gap-2 rounded-[10px] border border-main-10 bg-background px-3 transition-colors hover:border-primary"
        >
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[10px] font-semibold uppercase text-white ${EXT_COLORS[ext] ?? "bg-main-50"}`}>
                {ext.slice(0, 4) || "file"}
            </span>
            <span className="min-w-0 truncate text-xs">{name}</span>
        </a>
    );
}

const relative = (value: string, locale: string) => {
    const seconds = Math.round((new Date(value).getTime() - Date.now()) / 1000);
    const format = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    const steps: [Intl.RelativeTimeFormatUnit, number][] = [["day", 86400], ["hour", 3600], ["minute", 60]];
    for (const [unit, size] of steps) if (Math.abs(seconds) >= size) return format.format(Math.round(seconds / size), unit);
    return format.format(0, "second");
};

export default function MessageItem({ message, isMe }: { message: ChatMessage; isMe: boolean }) {
    const { t, i18n } = useTranslation("chat");

    if (message.isSystemMessage || !message.senderId) {
        return (
            <div className="flex justify-center py-2">
                <p className="max-w-[85%] rounded-20 border border-primary/20 bg-primary-10 px-4 py-2 text-center text-xs text-main-50">{message.content}</p>
            </div>
        );
    }

    const name = isMe ? t("room.you") : (message.senderName ?? t("room.counterpart"));
    const header = (
        <div className={`flex items-center gap-2.5 ${isMe ? "flex-row-reverse" : ""}`}>
            <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-main-10 text-main-50">
                {message.senderAvatar ? <img src={message.senderAvatar} alt="" className="h-full w-full object-cover" /> : <IconUser size={16} />}
            </span>
            <span className="text-sm font-medium text-primary">{name}</span>
            <time dateTime={message.createdAt} className="text-xs text-main-50" suppressHydrationWarning>
                {relative(message.createdAt, i18n.language)}
            </time>
        </div>
    );

    const body = (
        <>
            {header}
            {message.content && <RichText text={message.content} className={`mt-2.5 text-sm ${isMe ? "items-end text-right" : ""}`} />}
            {message.fileUrl && (
                <div className={`mt-2.5 flex flex-wrap gap-2 ${isMe ? "justify-end" : ""}`}>
                    <Attachment url={message.fileUrl} />
                </div>
            )}
        </>
    );

    return isMe ? (
        <div className="ml-auto w-full max-w-[90%] rounded-20 bg-background p-4 sm:max-w-[85%]">{body}</div>
    ) : (
        <div className="w-full max-w-[90%] px-1 py-2 sm:max-w-[85%]">{body}</div>
    );
}
