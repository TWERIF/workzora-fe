import { LogoSmallBlack } from '@/shared/components/svg/LogoSmallBlack';
import StarIcon from '@/shared/components/svg/StarIcon';
import Usdt from '@/shared/components/svg/Usdt';
import Image from "next/image";
import React from 'react';
import placeHolderAvatar from "../../../../public/images/avatar_placeholder.png";
import { Bid as BidType } from '../model/types';

interface BidProps {
    bid: BidType;
    onClick?: () => void;
    isClickable?: boolean;
    isInactive?: boolean;
}

export const Bid: React.FC<BidProps> = ({ bid, onClick, isClickable, isInactive }) => {
    const avatar = bid.user?.avatarUrl ?? placeHolderAvatar;

    return (
        <div 
            onClick={isClickable ? onClick : undefined}
            className={`bg-white dark:bg-bg-modalDark rounded-20 p-5 shadow-sm border border-border dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 max-w-4xl w-full transition-all duration-300
            ${isClickable ? 'cursor-pointer hover:border-success dark:hover:border-success hover:shadow-md' : ''}
            ${isInactive ? 'opacity-40 grayscale pointer-events-none' : ''}`}
        >
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                    <Image width={150} height={150} src={avatar} alt="profile icon" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-success text-xl font-semibold leading-tight">
                        {bid.user.lastName} {bid.user.firstName}
                    </h3>
                    <p className="text-text-muted text-sm mt-0.5">{bid.user.position}</p>
                    <p className="text-text-muted text-xs mt-0.5">Was there. 6 hours ago</p>
                    <div className="prose dark:prose-invert max-w-none text-text dark:text-text-dark text-[15px] leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: bid.description! }} />
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5 dark:text-white">
                        <LogoSmallBlack />
                        <Usdt />
                    </div>

                    <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-text dark:text-text-dark">
                        <StarIcon />
                        <span>{bid.user.ratings}</span>
                        <span className="text-text-muted font-normal">({bid.user.rates} rates)</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-end justify-between sm:self-stretch min-w-[100px]">
                <div className="flex items-center gap-1 text-text dark:text-text-dark text-2xl font-bold">
                    <Usdt />
                    <span>{bid.price?.toLocaleString()}</span>
                </div>
                <span className="text-text-muted text-xs mt-auto">
                    {bid.time}h ago
                </span>
            </div>
        </div>
    );
};