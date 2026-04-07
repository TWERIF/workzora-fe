export default function IconUa({ size = 14 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 90 90"
    >
      <path d="M45 90C20.147 90 0 69.853 0 45h90C90 69.853 69.853 90 45 90z" fill="#FFD500" />
      <path d="M45 0C20.147 0 0 20.147 0 45h90C90 20.147 69.853 0 45 0z" fill="#005BBB" />
    </svg>
  );
}
