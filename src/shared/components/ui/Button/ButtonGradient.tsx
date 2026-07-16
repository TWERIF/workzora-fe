import { ButtonI } from "@/shared/types";

export default function ButtonGradient(props: ButtonI) {
  const { text, onClick, type, disabled, filled = true } = props;
  return (
    <button
      disabled={disabled}
      type={type || "button"}
      className={`focus:outline-none active:outline-none text-[12px] md:text-[14px] ${filled ? "bg-gradient text-text-dark" : "!border border-success dark:text-text-dark dark:bg-bg-dark"} rounded-[20px] px-[50px] py-[15px]`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
