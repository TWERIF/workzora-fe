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
  sender: string; 
  timestamp: string;
}
export enum ProjectStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CLOSED = "closed",
}


export interface ChatRoom {
  id: string;
  projectId: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string | null;
  receiverId: string | null;
  content: string;
  fileUrl?: string | null;
  isSystemMessage?: boolean;
  senderName?: string;
  senderAvatar?: string | null;
  createdAt: string;
}
