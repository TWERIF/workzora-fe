"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import placeHolderAvatar from "../../../../public/images/avatar_placeholder.png";


export interface ChatItemData {
  id: string;
  date: string;
  time: string;
  avatarUrl: string;
  userName: string;
  topic: string;
  messageCount: number;
  projectTitle: string | null;
  projectId: string;
  isUnread?: boolean;
}

interface ChatItemProps {
  chat: ChatItemData;
  onDelete: (id: string) => void;
}

export default function ChatItem({ chat, onDelete }: ChatItemProps) {
  const params = useParams();
  const locale = params?.locale || "uk";
  const avatar = chat.avatarUrl ?? placeHolderAvatar;
  return (
    <div className="bg-input dark:bg-input-dark rounded-xl p-4 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="text-[11px] text-text-muted min-w-[90px] leading-tight flex flex-col">
        <span>{chat.date}</span>
        <span>{chat.time}</span>
      </div>

      <Link
        href={`/${locale}/chats/${chat.projectId}`}
        className="flex flex-1 items-center gap-4 cursor-pointer group"
      >
        <div className="relative w-11 h-11 flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
            <Image width={150} height={150} src={avatar} alt="profile icon" className="w-full h-full object-cover" />
          </div>
          <span className="absolute -top-1 -left-1 bg-white dark:bg-bg-modalDark rounded-full p-0.5 shadow-sm">
            <svg className="w-3 h-3 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-success group-hover:underline truncate">
            {chat.userName}
          </h4>
          <p className={`text-xs mt-0.5 truncate ${chat.isUnread ? "text-success font-medium" : "text-text-muted dark:text-text-dark/80"}`}>
            {chat.topic.slice(0, 50) + "..."}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-text-muted min-w-[50px] justify-end">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-xs font-medium">{chat.messageCount}</span>
        </div>
      </Link>

      <button
        onClick={() => onDelete(chat.id)}
        className="text-error hover:scale-110 active:scale-95 transition-transform p-1 ml-2"
        aria-label="Delete chat"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}