import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCard, getCards, removeCard, setPrimaryCard } from "./api";

export const cardKeys = {
    all: ["paymentCards"] as const,
};

export const useCards = (enabled = true) =>
    useQuery({ queryKey: cardKeys.all, queryFn: getCards, enabled, staleTime: 60_000 });

export const useCardActions = () => {
    const queryClient = useQueryClient();
    const store = (cards: Awaited<ReturnType<typeof getCards>>) => queryClient.setQueryData(cardKeys.all, cards);

    const add = useMutation({ mutationFn: addCard, onSuccess: () => queryClient.invalidateQueries({ queryKey: cardKeys.all }) });
    const makePrimary = useMutation({ mutationFn: setPrimaryCard, onSuccess: store });
    const remove = useMutation({ mutationFn: removeCard, onSuccess: store });

    return { add, makePrimary, remove };
};
