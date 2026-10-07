const ARTICLE_STYLES = [
    "min-w-0 break-words text-sm leading-6 sm:text-[15px] sm:leading-7",
    "[&_p]:my-3 [&_strong]:font-semibold [&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:underline",
    "[&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-snug sm:[&_h2]:text-[28px]",
    "[&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold",
    "[&_ul]:my-3 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_ul>li]:relative [&_ul>li]:pl-6",
    "[&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[0.55em] [&_ul>li]:before:h-3 [&_ul>li]:before:w-3 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-primary [&_ul>li]:before:content-['']",
    "[&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol>li]:pl-1 [&_ol>li]:marker:font-semibold [&_ol>li]:marker:text-primary [&_li>p]:my-0",
    "[&_blockquote]:my-6 [&_blockquote]:rounded-20 [&_blockquote]:border [&_blockquote]:border-primary/30 [&_blockquote]:bg-primary-10 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:text-[13px] [&_blockquote]:text-main-50",
    "[&_blockquote_p:first-child]:mt-0 [&_blockquote_p:last-child]:mb-0 [&_blockquote_strong]:text-primary",
    "[&_img]:my-6 [&_img]:w-full [&_img]:rounded-[24px]",
    "[&_.tableWrapper]:my-6 [&_.tableWrapper]:overflow-x-auto",
    "[&_table]:my-6 [&_table]:w-full [&_table]:border-separate [&_table]:border-spacing-1.5 [&_table]:text-[13px]",
    "[&_th]:rounded-xl [&_th]:bg-primary [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-center [&_th]:font-semibold [&_th]:text-white",
    "[&_td]:rounded-xl [&_td]:bg-main-5 [&_td]:px-4 [&_td]:py-2.5 [&_td]:align-top [&_th_p]:my-0 [&_td_p]:my-0",
    "[&_hr]:my-8 [&_hr]:border-main-10",
].join(" ");

export const PostArticleBody = ({ article }: { article: string }) => <div className={ARTICLE_STYLES} dangerouslySetInnerHTML={{ __html: article }} />;
