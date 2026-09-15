export const formatMoney = (value: number, locale: string, currency = "USD") =>
    new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
    }).format(value);

export const formatNumber = (value: number, locale: string) =>
    new Intl.NumberFormat(locale).format(value);

export const formatDate = (iso: string, locale: string) =>
    new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(iso));

export const maskedCard = (last4: string) => `•••• ${last4}`;
