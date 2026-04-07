export const validateEmail = (email: string): string | null => {
    if (!email.trim()) return "auth.errors.required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "auth.errors.email";

    return null;
};

export const validatePassword = (password: string): string | null => {
    if (!password.trim()) return "auth.errors.required";

    if (password.length < 8) return "auth.errors.passwordLength";
    if (!/[A-Za-z]/.test(password)) return "auth.errors.passwordLetter";
    if (!/\d/.test(password)) return "auth.errors.passwordNumber";

    return null;
};

export const validateConfirmPassword = (
    password: string,
    confirmPassword: string
): string | null => {
    if (!confirmPassword.trim()) return "auth.errors.required";
    if (password !== confirmPassword) return "auth.errors.confirmed";
    return null;
};
