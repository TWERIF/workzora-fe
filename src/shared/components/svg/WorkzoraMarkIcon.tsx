import Image from "next/image";

interface WorkzoraMarkIconProps {
  w?: number;
  h?: number;
  className?: string;
}

// Note: source asset for this badge was a rasterized PNG embedded inside an
// SVG pattern fill. It has been extracted to /public/icons/workzora-mark.png
// (place it there in the project) and is rendered here via next/image.
export default function WorkzoraMarkIcon({
  w = 20,
  h = 20,
  className = "",
}: WorkzoraMarkIconProps) {
  return (
    <Image
      src="/icons/workzora-mark.png"
      alt="WorkZora"
      width={w}
      height={h}
      className={className}
    />
  );
}
