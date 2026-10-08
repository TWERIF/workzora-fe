import { $api } from "@/shared/components/http";
import { ContactFormValues, SupportMessage, SupportTicket, SupportTicketDetails } from "./types";

export const sendContactForm = async (data: ContactFormValues) => {
  const res = await $api.post<{ id: string; linkedToAccount: boolean }>("/support/tickets", data);
  return res.data;
};

export const getMyTickets = async () => (await $api.get<SupportTicket[]>("/support/tickets/mine")).data;

export const getMyTicket = async (id: string) => (await $api.get<SupportTicketDetails>(`/support/tickets/mine/${id}`)).data;

export const replyToMyTicket = async ({ id, content }: { id: string; content: string }) =>
  (await $api.post<SupportMessage>(`/support/tickets/mine/${id}/messages`, { content })).data;
