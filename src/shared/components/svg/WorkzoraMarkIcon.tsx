interface WorkzoraMarkIconProps {
  w?: number;
  h?: number;
  className?: string;
}

export default function WorkzoraMarkIcon({ w = 20, h = 20, className = "" }: WorkzoraMarkIconProps) {
  return <img src="/images/brand/wz-mark.png" width={w} height={h} alt="WorkZora" className={`shrink-0 object-contain ${className}`} />;
}
