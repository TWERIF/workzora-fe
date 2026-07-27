import { $api } from "@/shared/components/http";
import type { CardPayload, PaymentData } from "./types";


export const createPaymentData = async (
    data: CardPayload,
): Promise<PaymentData> => {
    const res = await $api.post("/payment-data", data);

    return res.data;
};


export const updatePaymentData = async (
    data: CardPayload,
): Promise<PaymentData> => {
    const res = await $api.put("/payment-data", data);

    return res.data;
};