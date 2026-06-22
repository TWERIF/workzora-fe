import Usdt from "../../svg/Usdt";
export const ProjectHeader = ({ title, price }: { title: string; price: number }) => (
    <h1 className="flex justify-between w-full flex-col text-text dark:text-text-dark font-bold text-[30px] md:text-[40px] sm:flex-row items-start sm:items-center transition-colors">
        {title}
        <span className="flex items-center gap-2 text-success font-bold text-[24px]">
            <Usdt /> {price.toFixed(0)}
        </span>
    </h1>
);