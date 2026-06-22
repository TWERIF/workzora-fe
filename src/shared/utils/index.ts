export const getRelativeTime = (dateInput: string | Date) => {
    const now = new Date().getTime();
    const created = new Date(dateInput).getTime();
    const diffInMs = now - created;
    const msInHour = 1000 * 60 * 60;
    const msInDay = msInHour * 24;

    const days = Math.floor(diffInMs / msInDay);
    const hours = Math.floor((diffInMs % msInDay) / msInHour);

    if (days > 0) {
        return {
            days, hours
        }
    }
    return {
        hours
    };
};
