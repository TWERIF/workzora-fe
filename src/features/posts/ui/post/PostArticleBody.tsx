interface PostArticleBodyProps {
    article: string;
}

export const PostArticleBody = ({ article }: PostArticleBodyProps) => {
    return (
        <div
            className="prose prose-neutral max-w-none prose-headings:text-text prose-p:text-text prose-li:text-text prose-a:text-success dark:prose-invert dark:prose-headings:text-text-dark dark:prose-p:text-text-dark dark:prose-li:text-text-dark"
            dangerouslySetInnerHTML={{ __html: article }}
        />
    );
};
