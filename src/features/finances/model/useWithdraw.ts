import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWithdrawal } from "./api";
import { walletKeys } from "./useWallet";

export interface CreateWithdrawalPayload {
    amount: number;
    cardId: string;
}

export const useCreateWithdrawal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ amount, cardId }: CreateWithdrawalPayload) => createWithdrawal({ amount, cardId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: walletKeys.all });
        },
    });
};
