import RichContent from "@/shared/components/ui/RichContent/RichContent";

export const PostArticleBody = ({ article }: { article: string }) => <RichContent html={article} />;
