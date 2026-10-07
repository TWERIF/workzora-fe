import Image from "next/image";

interface WorkzoraMarkIconProps {
  w?: number;
  h?: number;
  className?: string;
}

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
