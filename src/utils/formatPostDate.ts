export const formatPostDate = (isoDate: string, language: string) => {
    const locale = language?.startsWith("uk") ? "uk-UA" : "en-US";

    return new Date(isoDate).toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};
