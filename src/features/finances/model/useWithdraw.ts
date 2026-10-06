import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWithdrawal } from "./api";
import { walletKeys } from "./useWallet";

export interface CreateWithdrawalPayload {
    amount: number;
    cardId: string;
}

/** Кошти списуються з балансу одразу й чекають, поки адмін виплатить їх на картку */
export const useCreateWithdrawal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ amount }: CreateWithdrawalPayload) => createWithdrawal(amount),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: walletKeys.all });
        },
    });
};
