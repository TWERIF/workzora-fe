import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPaymentData, updatePaymentData } from "./api";
import type { CardPayload } from "./types";


export const paymentDataKeys = {
    mine: () => [
        "paymentData",
        "mine",
    ],
};


export const useCreatePaymentData = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CardPayload) => createPaymentData(data),
        onSuccess: (paymentData) => {
            queryClient.setQueryData(paymentDataKeys.mine(), paymentData);
        },
    });
};


export const useUpdatePaymentData = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CardPayload) => updatePaymentData(data),
        onSuccess: (paymentData) => {
            queryClient.setQueryData(paymentDataKeys.mine(), paymentData);
        },
    });
};
