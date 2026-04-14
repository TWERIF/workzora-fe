import Image from 'next/image';
import React from 'react';

interface MessageProps {
    id: string;
    text: string;
    senderName: string;
    senderAvatar: string;
    timestamp: string;
    isMe: boolean;
}

const Message: React.FC<MessageProps> = ({
    text,
    senderName,
    senderAvatar,
    timestamp,
    isMe
}) => {
    return (
        <div className={`flex w-full items-end gap-3 mb-6 rounded-2xl px-5 py-3 ${isMe ? 'flex-row-reverse bg-white' : 'flex-row'}`}>
            <div className={`flex flex-col max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                <div className='flex'>


                    {/* Інфо над повідомленням */}
                    <div className={`flex gap-2 mb-1 items-center }`}>
                        <div className="flex-shrink-0">
                            <Image
                                width={28}
                                height={28}
                                src={senderAvatar}
                                alt={senderName}
                                className="w-10 h-10 rounded object-cover "
                            />
                        </div>
                        <span className="text-sm font-medium text-text dark:text-text-dark">
                            {senderName}
                        </span>
                        <span className="text-[11px] text-text-muted">
                            {timestamp}
                        </span>
                    </div>
                </div>

                <div
                    className={`px-15 py-13 `}
                >
                    <p className="text-base leading-snug break-words">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Message;