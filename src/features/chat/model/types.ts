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

interface ChatParticipant {
  id: string | null;
  name: string | null;
  avatarUrl: string | null;
}

export interface ChatListItem {
  id: string;
  updatedAt: string;
  projectTitle: string | null;
  projectId: string;
  avatarUrl: string | null;
  userName: string | null;
  client: ChatParticipant;
  freelancer: ChatParticipant;
  topic: string | null;
  messageCount: number;
  isUnread: boolean;
  counterpartId: string | null;
  counterpartLastSeenAt: string | null;
  lastMessageFromMe: boolean;
  lastMessageRead: boolean;
}

export interface ChatList {
  data: ChatListItem[];
  total: number;
}
