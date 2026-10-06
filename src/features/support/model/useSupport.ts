import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyTicket, getMyTickets, replyToMyTicket, sendContactForm } from "./api";

export const supportKeys = {
  all: ["support"] as const,
  mine: () => [...supportKeys.all, "mine"] as const,
  ticket: (id: string) => [...supportKeys.all, "ticket", id] as const,
};

export const useContactForm = () => useMutation({ mutationFn: sendContactForm });

export const useMyTickets = (enabled = true) =>
  useQuery({ queryKey: supportKeys.mine(), queryFn: getMyTickets, enabled });

export const useMyTicket = (id: string | null) =>
  useQuery({ queryKey: supportKeys.ticket(id ?? ""), queryFn: () => getMyTicket(id!), enabled: !!id, refetchInterval: 30_000 });

export const useReplyToMyTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: replyToMyTicket,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: supportKeys.all }),
  });
};
