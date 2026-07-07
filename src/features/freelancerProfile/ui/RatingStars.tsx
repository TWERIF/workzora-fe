import { StarIcon } from "./icons";

interface RatingStarsProps {
    value: number;
    max?: number;
    size?: number;
}

export const RatingStars = ({ value, max = 5, size = 14 }: RatingStarsProps) => {
    const stars = Array.from({ length: max }, (_, i) => i < Math.round(value));

    return (
        <div className="flex items-center gap-0.5" role="img" aria-label={`${value} / ${max}`}>
            {stars.map((filled, i) => (
                <StarIcon key={i} filled={filled} style={{ width: size, height: size }} />
            ))}
        </div>
    );
};