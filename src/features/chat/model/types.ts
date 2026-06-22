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

