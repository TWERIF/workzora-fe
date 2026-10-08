export const PASSWORD_RULES = [
    { key: "length", test: (value: string) => value.length >= 8 },
    { key: "upper", test: (value: string) => /[A-Z]/.test(value) },
    { key: "number", test: (value: string) => /\d/.test(value) },
    { key: "special", test: (value: string) => /[^A-Za-z0-9]/.test(value) },
] as const;

export type PasswordRuleKey = (typeof PASSWORD_RULES)[number]["key"];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emailError = (email: string) => {
    if (!email.trim()) return "errors.required";
    return EMAIL_PATTERN.test(email.trim()) ? undefined : "errors.email";
};

export const passwordError = (password: string) => {
    if (!password) return "errors.required";
    return PASSWORD_RULES.every((rule) => rule.test(password)) ? undefined : "errors.password";
};

export const confirmPasswordError = (password: string, confirm: string) => {
    if (!confirm) return "errors.required";
    return password === confirm ? undefined : "errors.confirmed";
};

export const requiredError = (value: string) => (value.trim() ? undefined : "errors.required");

export const splitFullName = (fullName: string) => {
    const [firstName = "", ...rest] = fullName.trim().split(/\s+/);
    return { firstName, lastName: rest.join(" ") };
};

export const usernameFromEmail = (email: string) => {
    const base = email.split("@")[0].toLowerCase().replace(/[^a-z0-9_.]/g, "").slice(0, 20) || "user";
    return `${base}${Math.floor(1000 + Math.random() * 9000)}`;
};
