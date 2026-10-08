import { ImageIcon } from "lucide-react";

export const PostCover = ({ src, alt, className }: { src?: string; alt: string; className: string }) =>
    src ? (
        <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />
    ) : (
        <span className={`flex items-center justify-center bg-primary-10 text-primary ${className}`}>
            <ImageIcon size={32} />
        </span>
    );
