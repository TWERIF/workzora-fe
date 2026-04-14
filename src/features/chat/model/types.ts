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
