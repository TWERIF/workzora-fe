// types/chat.ts
export interface MessageProps {
  id: string;
  text: string;
  senderName: string;
  senderAvatar: string;
  timestamp: string;
  isMe: boolean;
}
export interface Message {
  id: string;
  text: string;
  sender: string; //User потім
  timestamp: string;
}
export enum ProjectStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CLOSED = "closed",
}

export interface IProject {
  id: string;
  title: string;
  desc: string;
  stack: string[];
  price: number | string; // TypeORM decimal часто приходить як string через JSON
  clientId: string;
  freelancerId?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  views: number;
  status: ProjectStatus;
  // chatRoom?: any; // Розкоментуй, якщо тобі потрібен об'єкт чату всередині проєкту
}
