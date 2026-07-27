import { ButtonI } from "@/shared/types";

export default function ButtonGradientSmall(props: ButtonI) {
  const { text, onClick, type } = props;
  return (
    <button
      type={type || "button"}
      className="group relative overflow-hidden text-nowrap transition-all duration-500 ease-in-out focus:outline-none active:outline-none bg-gradient hover:bg-gradientReverse hover:brightness-110 text-text-dark rounded-[20px] px-[25px] py-[9px]"
      onClick={onClick}
    >
      <span className="relative block h-[1.2em] overflow-hidden">
        <span className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
          <span className="block leading-[1.2em]">{text}</span>
          <span className="block leading-[1.2em]" aria-hidden="true">
            {text}
          </span>
        </span>
      </span>
    </button>
  );
}