export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  status: "open" | "closed";
  createdAt: string;
  updatedAt: string;
}

export interface SupportMessage {
  id: string;
  author: "user" | "admin";
  content: string;
  createdAt: string;
}

export interface SupportTicketDetails extends SupportTicket {
  messages: SupportMessage[];
}

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}
