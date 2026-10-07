const COUNTRY_CODES = [
    "UA", "PL", "DE", "GB", "US", "CA", "FR", "IT", "ES", "PT", "NL", "BE", "AT", "CH", "CZ", "SK", "HU", "RO",
    "BG", "MD", "LT", "LV", "EE", "FI", "SE", "NO", "DK", "IE", "GR", "HR", "SI", "RS", "GE", "AM", "AZ", "KZ",
    "TR", "IL", "AE", "SA", "EG", "IN", "CN", "JP", "KR", "SG", "TH", "VN", "ID", "PH", "AU", "NZ", "BR", "AR",
    "MX", "CL", "CO", "ZA", "NG", "KE",
];

export const countryOptions = (locale: string) => {
    const names = new Intl.DisplayNames([locale], { type: "region" });
    const [first, ...rest] = COUNTRY_CODES.map((code) => ({ code, name: names.of(code) ?? code }));
    return [first, ...rest.sort((a, b) => a.name.localeCompare(b.name, locale))];
};
