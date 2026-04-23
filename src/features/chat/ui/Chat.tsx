import { useAuth } from "@/features/auth/model/useAuth";
import { $api } from "@/shared/components/http";
import IconSupport from "@/shared/components/svg/IconSupport";
import Breadcrumbs, {
  BreadcrumbItem,
} from "@/shared/components/ui/BreadCrumbs";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { io, Socket } from "socket.io-client";
import Message from "./Message";
import { IProject } from "../model/types";
import { useRouter } from "next/router";

interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  content: string;
  fileUrl?: string; // Додано поле для файлу
  createdAt: string;
}

interface ChatProps {
  project: IProject;
  receiverId: string;
}

export default function Chat({ project, receiverId }: ChatProps) {
  const { t } = useTranslation("common");
  const { user } = useAuth();
  const currentUserId = user?.id;
  const [newMessage, setNewMessage] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Нові стани для роботи з файлами
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  const router = useRouter();
  const locale = router.locale || "en";

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const roomRes = await $api.get(`chat/project/${project?.id}`);
        const room = roomRes.data;
        setChatId(room.id);

        const messagesRes = await $api.get(
          `/chat/${room.id}/messages?amount=50`,
        );
        const fetchedMessages = messagesRes.data;
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Помилка завантаження чату:", error);
      }
    };

    if (project?.id) {
      fetchChat();
    }
  }, [project?.id]);

  useEffect(() => {
    if (!chatId || !currentUserId) return;

    const newSocket = io("http://localhost:8000/chat", {
      query: { userId: currentUserId },
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("Підключено до чату проекту");
      newSocket.emit("joinChat", chatId);
    });

    newSocket.on("newMessage", (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [chatId, currentUserId]);

  // Обробник вибору файлу
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Очищаємо input
    }
  };

  // Оновлений обробник відправки (тепер асинхронний)
  const handleSendMessage = async () => {
    if (
      (!newMessage.trim() && !selectedFile) ||
      !socket ||
      !chatId ||
      !currentUserId ||
      isUploading
    )
      return;

    setIsUploading(true);
    let uploadedFileUrl = undefined;

    try {
      // 1. Якщо є файл, спочатку завантажуємо його через HTTP
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await $api.post("/chat/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        uploadedFileUrl = response.data.fileUrl;
      }

      // 2. Відправляємо повідомлення через сокети (з файлом або без)
      socket.emit("sendMessage", {
        chatId: chatId,
        receiverId: receiverId,
        // Якщо відправляється тільки файл, задаємо контент за замовчуванням
        content: newMessage.trim() || (uploadedFileUrl ? "Надіслано файл" : ""),
        senderId: currentUserId,
        fileUrl: uploadedFileUrl,
      });

      // 3. Очищаємо форму після успішної відправки
      setNewMessage("");
      removeSelectedFile();
    } catch (error) {
      console.error("Помилка відправлення повідомлення:", error);
      // Тут можна додати toast/сповіщення про помилку
    } finally {
      setIsUploading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!user) {
    return (
      <div
        className={`min-h-[100dvh] flex items-center justify-center ${isDark ? "bg-[#2A2A2A] text-white" : "bg-[#F7F7F7] text-gray-800"}`}
      >
        {t("chat.loading")}
      </div>
    );
  }
  const chatBreadcrumbs: BreadcrumbItem[] = [
    { label: t("breadcrumbs.home") || "Home", href: `/${locale}` },
    {
      label: t("breadcrumbs.activeProjects"),
      href: `/${locale}/activeProjects`,
    },
    // Обрізаємо дуже довгу назву проєкту або показуємо заглушку
    { label: project?.title },
  ];
  return (
    <div
      className={`h-[100dvh] w-full overflow-hidden flex flex-col transition-colors duration-300 ${isDark ? "bg-[#2A2A2A]" : "bg-[#F7F7F7]"}`}
    >
      {/* Хлібні крихти (винесені окремо над загальним контейнером) */}
      <div className="mx-auto w-full max-w-[950px] pt-4 px-4 flex-shrink-0">
        <Breadcrumbs customItems={chatBreadcrumbs} />
      </div>

      {/* ЄДИНИЙ КОНТЕЙНЕР ДЛЯ ШАПКИ ТА ЧАТУ */}
      <div className="mx-auto w-full max-w-[950px] flex-1 min-h-0 px-4 pb-4 flex flex-col">
        <div
          className={`flex flex-col h-full overflow-hidden rounded-xl shadow-sm transition-colors duration-300 ${isDark ? "bg-[#333333] text-white" : "bg-white text-[#333333]"}`}
        >
          {/* Шапка з назвою (прибрано mb-3, залишено акуратний padding) */}
          <div className="px-5 pt-5 pb-3 flex-shrink-0">
            <div className="text-[32px] font-bold leading-none truncate">
              {project?.title}
            </div>
          </div>

          {/* Основна частина чату */}
          <div
            ref={chatContainerRef}
            className={`flex-1 overflow-y-auto px-4 py-3 custom-scrollbar ${isDark ? "bg-[#252525]" : "bg-[#F7F7F7]"} mx-2 mb-1 rounded-2xl`}
          >
            {messages.length > 0 ? (
              <>
                {messages.map((msg) => (
                  <Message
                    key={msg.id}
                    {...msg}
                    isMe={msg.senderId === currentUserId}
                  />
                ))}
              </>
            ) : (
              <div
                className={`h-full flex items-center justify-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                {t("chat.emptyMessages")}
              </div>
            )}
          </div>

          {/* Фіксований інпут */}
          <div className="p-3 flex-shrink-0 bg-transparent flex flex-col gap-2">
            {/* Блок попереднього перегляду файлу */}
            {selectedFile && (
              <div
                className={`flex items-center justify-between px-4 py-2 rounded-lg text-sm mx-4 shadow-sm border ${isDark ? "bg-[#444444] border-gray-600 text-gray-200" : "bg-blue-50 border-blue-100 text-blue-800"}`}
              >
                <div className="flex items-center gap-2 truncate">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                  </svg>
                  <span className="truncate max-w-[200px]">
                    {selectedFile.name}
                  </span>
                </div>
                <button
                  onClick={removeSelectedFile}
                  className="hover:text-red-500 transition-colors"
                  disabled={isUploading}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            )}

            <div
              className={`flex items-center gap-3 pl-4 pr-2 py-2 rounded-[100px] border shadow-sm transition-colors duration-300 ${
                isDark
                  ? "bg-[#333333] border-[#444444]"
                  : "bg-white border-[#E5E5E5]"
              }`}
            >
              {/* Прихований input для файлів */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className={`${isDark ? "text-gray-400 hover:text-white" : "text-[#A0A1A3] hover:text-gray-700"} transition-colors ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              </button>

              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isUploading ? t("chat.uploading") : t("chat.inputPlaceholder")
                }
                disabled={isUploading}
                className={`flex-1 bg-transparent outline-none text-base py-1 transition-colors ${
                  isDark
                    ? "text-white placeholder-gray-500"
                    : "text-[#333333] placeholder-gray-400"
                } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
              />

              <button
                className={`w-[40px] h-[40px] rounded-full bg-gradient flex items-center justify-center text-white flex-shrink-0 transition-opacity shadow-md ${isUploading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
                onClick={handleSendMessage}
                disabled={isUploading || (!newMessage.trim() && !selectedFile)}
              >
                {isUploading ? (
                  // Простий спінер завантаження
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-1"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
