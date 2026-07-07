export const VerificationStatus = {
    NOT_VERIFIED: 'not_verified',
    IN_PROGRESS: 'in_progress',
    VERIFIED: 'verified',
} as const;

export type VerificationStatus = typeof VerificationStatus[keyof typeof VerificationStatus];