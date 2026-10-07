import { Fragment, type ReactNode } from "react";

const INLINE = /(\*\*[^*\n]+\*\*|__[^_\n]+__|~~[^~\n]+~~|\*[^*\n]+\*|https?:\/\/[^\s<>"']+)/g;

const renderInline = (text: string, keyPrefix: string): ReactNode[] =>
    text.split(INLINE).map((part, index) => {
        const key = `${keyPrefix}-${index}`;
        if (!part) return null;
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) return <strong key={key}>{renderInline(part.slice(2, -2), key)}</strong>;
        if (part.startsWith("__") && part.endsWith("__") && part.length > 4) return <u key={key}>{renderInline(part.slice(2, -2), key)}</u>;
        if (part.startsWith("~~") && part.endsWith("~~") && part.length > 4) return <s key={key}>{renderInline(part.slice(2, -2), key)}</s>;
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={key}>{renderInline(part.slice(1, -1), key)}</em>;
        if (/^https?:\/\//.test(part)) {
            return (
                <a key={key} href={part} target="_blank" rel="noopener noreferrer nofollow" className="break-all text-primary underline">
                    {part}
                </a>
            );
        }
        return <Fragment key={key}>{part}</Fragment>;
    });

type Block = { type: "p"; lines: string[] } | { type: "ul" | "ol"; items: string[] };

const toBlocks = (text: string): Block[] => {
    const blocks: Block[] = [];
    for (const line of text.split("\n")) {
        const bullet = line.match(/^\s*[-•]\s+(.*)$/);
        const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/);
        const last = blocks[blocks.length - 1];
        if (bullet) {
            if (last?.type === "ul") last.items.push(bullet[1]);
            else blocks.push({ type: "ul", items: [bullet[1]] });
        } else if (numbered) {
            if (last?.type === "ol") last.items.push(numbered[1]);
            else blocks.push({ type: "ol", items: [numbered[1]] });
        } else if (last?.type === "p") {
            last.lines.push(line);
        } else {
            blocks.push({ type: "p", lines: [line] });
        }
    }
    return blocks;
};

export default function RichText({ text, className = "" }: { text: string; className?: string }) {
    return (
        <div className={`flex flex-col gap-1.5 break-words ${className}`}>
            {toBlocks(text).map((block, index) => {
                if (block.type === "p") {
                    return (
                        <p key={index} className="whitespace-pre-line">
                            {renderInline(block.lines.join("\n"), `p${index}`)}
                        </p>
                    );
                }
                const List = block.type;
                return (
                    <List key={index} className={`${block.type === "ul" ? "list-disc" : "list-decimal"} pl-5 text-left`}>
                        {block.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{renderInline(item, `l${index}-${itemIndex}`)}</li>
                        ))}
                    </List>
                );
            })}
        </div>
    );
}
