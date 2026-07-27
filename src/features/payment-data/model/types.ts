export interface PaymentData {
    id: string;
    userId: string;
    maskedCardNumber: string;
    createdAt: string;
    updatedAt: string;
}

export interface CardPayload {
    cardNumber: string;
}