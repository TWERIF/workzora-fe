import type { CardBrand } from "@/features/finances/model/types";
import type { SVGProps } from "react";
import MastercardIcon from "./MastercardIcon";
import VisaIcon from "./VisaIcon";

const GenericCardIcon = ({ className }: SVGProps<SVGSVGElement>) => (
    <svg className={className} width="38" height="26" viewBox="0 0 38 26" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="36" height="24" rx="4" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
        <rect x="1" y="6" width="36" height="4" fill="currentColor" fillOpacity="0.25" />
        <rect x="6" y="16" width="10" height="3" rx="1.5" fill="currentColor" fillOpacity="0.35" />
    </svg>
);

const brandIcons: Record<CardBrand, (props: SVGProps<SVGSVGElement>) => React.ReactElement> = {
    visa: VisaIcon,
    mastercard: MastercardIcon,
    amex: GenericCardIcon,
    unknown: GenericCardIcon,
};

export const CardBrandIcon = ({ brand, className }: { brand: CardBrand; className?: string }) => {
    const Icon = brandIcons[brand];
    return <Icon className={className} />;
};

export default CardBrandIcon;
