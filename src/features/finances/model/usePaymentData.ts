import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPaymentData, getPaymentData, updatePaymentData } from "./api";
import type { CardPayload, PaymentData } from "./types";

export const paymentDataKeys = {
    all: () => ["paymentData"] as const,
    mine: (userId: string) => ["paymentData", "mine", userId] as const,
};

export const usePaymentData = (userId?: string) =>
    useQuery({
        queryKey: paymentDataKeys.mine(userId ?? ""),
        queryFn: () => getPaymentData(userId as string),
        enabled: Boolean(userId),
        staleTime: 60_000,
    });

const useSavePaymentData = (
    userId: string | undefined,
    mutationFn: (data: CardPayload) => Promise<PaymentData>,
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: (paymentData) => {
            if (userId) {
                queryClient.setQueryData(paymentDataKeys.mine(userId), paymentData);
            }
            queryClient.invalidateQueries({ queryKey: paymentDataKeys.all() });
        },
    });
};

export const useCreatePaymentData = (userId?: string) =>
    useSavePaymentData(userId, createPaymentData);

export const useUpdatePaymentData = (userId?: string) =>
    useSavePaymentData(userId, updatePaymentData);