import type { CardBrand } from "@/features/finances/model/types";
import MastercardIcon from "./MastercardIcon";
import VisaIcon from "./VisaIcon";

const brandIcons = {
    visa: VisaIcon,
    mastercard: MastercardIcon,
    unknown: MastercardIcon
} as const;

export const CardBrandIcon = ({
    brand,
    className,
}: {
    brand: CardBrand;
    className?: string;
}) => {
    const Icon = brandIcons[brand];
    return <Icon className={className} />;
};

export default CardBrandIcon;
