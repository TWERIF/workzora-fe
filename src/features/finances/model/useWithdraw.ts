import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CreateWithdrawalPayload {
    amount: number;
    cardId: string;
}

/**
 * TODO: замінити на реальний запит до API (api.post("/withdrawals", payload)).
 * Форма вже працює з цією сигнатурою, тож зміна тут не зачепить UI.
 */
const createWithdrawal = async (payload: CreateWithdrawalPayload) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { id: `WD-${Date.now()}`, ...payload };
};

export const useCreateWithdrawal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createWithdrawal,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["withdrawals"] });
            queryClient.invalidateQueries({ queryKey: ["balance"] });
        },
    });
};
