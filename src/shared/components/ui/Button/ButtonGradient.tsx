import { ButtonI } from "@/shared/types";

export default function ButtonGradient(props: ButtonI) {
  const { text, onClick, type, disabled, filled = true, form, className = "" } = props;
  return (
    <button
      disabled={disabled}
      form={form}
      type={type || "button"}
      className={`group relative overflow-hidden transition-all duration-500 ease-in-out focus:outline-none active:outline-none text-[12px] md:text-[14px] ${
        filled
          ? "bg-gradient hover:bg-gradientReverse text-text-dark hover:brightness-110"
          : "!border border-success text-text dark:text-text-dark bg-transparent hover:bg-success hover:!border-success hover:text-text-dark"
      } rounded-[20px] px-[50px] py-[15px] ${className}`}
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