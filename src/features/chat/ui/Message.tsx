import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";
import placeHolderAvatar from "../../../../public/images/avatar_placeholder.png";

export interface MessageProps {
  id: string;
  chatId: string;
  senderId: string | null;  
  receiverId?: string | null;
  projectId?: string;
  content: string;
  fileUrl?: string | null;
  isRead?: boolean;
  isEdited?: boolean;
  isDeleted?: boolean;
  createdAt: string | Date;

  isMe: boolean;
  senderName?: string;
  senderAvatar?: string;
  isSystemMessage?: boolean; 
}

const Message: React.FC<MessageProps> = (message) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { t } = useTranslation("common");

  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  if (message.isSystemMessage || !message.senderId) {
    return (
      <div className="flex w-full justify-center my-4">
        <div className="bg-input dark:bg-input-dark border border-gray-200 dark:border-[#555] rounded-20 px-5 py-3 max-w-[85%] text-center shadow-sm">
          <span className="text-sm font-medium text-text-muted dark:text-gray-300 leading-snug">
            {message.content}
          </span>
          <div className="text-[10px] text-gray-400 mt-1.5">{formattedTime}</div>
        </div>
      </div>
    );
  }

  const displayName = message.isMe ? "Ви" : message.senderName ?? "Співрозмовник";
  const displayAvatar = message.senderAvatar || placeHolderAvatar;
  const displayText = message.isDeleted ? "Повідомлення видалено" : message.content;

  const getFileType = (url?: string | null) => {
    if (!url) return null;
    const extension = url.split(".").pop()?.toLowerCase();
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"];
    if (extension && imageExtensions.includes(extension)) return "image";
    return "document";
  };

  const getFileName = (url?: string | null) => {
    if (!url) return "Файл";
    try {
      const urlObj = new URL(url);
      return decodeURIComponent(urlObj.pathname.split("/").pop() || "Файл");
    } catch {
      return url.split("/").pop() || "Файл";
    }
  };

  const fileType = getFileType(message.fileUrl);
  const fileName = getFileName(message.fileUrl);

  return (
    <div
      className={`flex w-full items-end gap-2 mb-3 rounded-2xl px-2 py-1 transition-colors duration-300 
      ${message.isMe ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`flex flex-col max-w-[75%] ${message.isMe ? "items-end" : "items-start"}`}
      >
        <div className="flex gap-2 mb-1 items-center">
          <Image
            width={32}
            height={32}
            src={displayAvatar}
            alt={displayName}
            className="rounded-full object-cover"
          />
          <span className="text-sm font-semibold">{displayName}</span>
          <span className="text-[11px] text-gray-400">{formattedTime}</span>
        </div>

        {message.fileUrl && !message.isDeleted && (
          <div className="mb-1 w-full max-w-[300px]">
            {fileType === "image" ? (
              <a
                href={message.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-lg border border-gray-200 shadow-sm"
              >
                <img
                  src={message.fileUrl}
                  alt="Прикріплене зображення"
                  className="w-full h-auto max-h-[250px] object-cover hover:opacity-90 transition-opacity"
                />
              </a>
            ) : (
              <a
                href={message.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 p-3 rounded-lg border transition-colors shadow-sm
                  ${isDark
                    ? "bg-[#3A3A3A] border-[#555] hover:bg-[#444]"
                    : "bg-[#F3F4F6] border-[#E5E7EB] hover:bg-[#E5E7EB]"
                  }
                `}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-md flex-shrink-0 ${isDark ? "bg-[#555]" : "bg-white shadow-sm"
                    }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isDark ? "#D1D5DB" : "#4B5563"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span
                    className={`text-sm font-medium truncate ${isDark ? "text-gray-200" : "text-gray-800"
                      }`}
                  >
                    {fileName}
                  </span>
                  <span className="text-[11px] text-blue-500 uppercase font-semibold mt-0.5">
                    {t("chat.download")}
                  </span>
                </div>
              </a>
            )}
          </div>
        )}
        {displayText && (
          <p
            className={`text-[15px] break-words leading-snug ${message.isDeleted ? "italic text-gray-500" : "text-gray-800"
              } ${isDark && !message.isDeleted ? "text-gray-200" : ""}`}
          >
            {displayText}

            {message.isEdited && !message.isDeleted && (
              <span className="ml-2 text-[10px] text-gray-400">(змінено)</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default Message;