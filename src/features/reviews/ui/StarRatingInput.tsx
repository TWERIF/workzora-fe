import { StarIcon } from "@/features/freelancerProfile/ui/icons";
import { useState } from "react";

interface StarRatingInputProps {
    value: number;
    onChange: (value: number) => void;
    label: string;
    max?: number;
}

/** Row of 42px stars from the Figma "Rate your experience" block; hover previews the score. */
export const StarRatingInput = ({ value, onChange, label, max = 5 }: StarRatingInputProps) => {
    const [hovered, setHovered] = useState<number | null>(null);
    const shown = hovered ?? value;

    return (
        <div
            role="radiogroup"
            aria-label={label}
            className="flex items-center gap-2 sm:gap-4"
            onMouseLeave={() => setHovered(null)}
        >
            {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
                <button
                    key={star}
                    type="button"
                    role="radio"
                    aria-checked={value === star}
                    aria-label={`${star} / ${max}`}
                    onClick={() => onChange(star)}
                    onMouseEnter={() => setHovered(star)}
                    onFocus={() => setHovered(star)}
                    onBlur={() => setHovered(null)}
                    className="rounded-md transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-success"
                >
                    <StarIcon filled={star <= shown} className="size-8 sm:size-[42px]" />
                </button>
            ))}
        </div>
    );
};
