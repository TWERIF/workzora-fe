import { useAuth } from '@/features/auth/model/useAuth';
import { Project, ProjectStatus } from '@/features/projects/model/types';
import { useProjects } from '@/features/projects/model/useProjects';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bid as BidType } from '../model/types';
import { useProjectBids } from '../model/useBids';
import { Bid } from './Bid';
import { BidWinnerModal } from './BidWinnerModal';

interface BidListProps {
    project: Project;
}

export const BidList: React.FC<BidListProps> = ({ project }) => {
    const bids = useProjectBids(project.id);
    const { user } = useAuth();
    const { t } = useTranslation("discussion");

    const { toAwaitingPaymentMutation } = useProjects(project.id);

    const [selectedBid, setSelectedBid] = useState<BidType | null>(null);

    const isOwner = user?.id === project.client.id;
    const isProjectOpen = project.status === ProjectStatus.OPEN;

    const handleBidClick = (bid: BidType) => {
        if (isOwner && isProjectOpen) {
            setSelectedBid(bid);
        }
    };

    const handleConfirmWinner = () => {
        if (!selectedBid) return;

        toAwaitingPaymentMutation.mutate({
            id: project.id,
            freelancerId: selectedBid.userId,
        }, {
            onSuccess: () => {
                setSelectedBid(null);
            }
        });
    };

    return (
        <div className="flex flex-col gap-4 w-full py-8 relative">
            <h1 className='text-text dark:text-text-dark font-[700] text-[20px] md:text-[24px]'>
                {t("bidList.applications")}
            </h1>

            {bids.data?.map((bid) => {
                const isWinner = project.freelancerId === bid.userId;

                const projectHasWinner =
                    project.status === ProjectStatus.AWAITING_PAYMENT ||
                    project.status === ProjectStatus.IN_PROGRESS ||
                    project.status === ProjectStatus.COMPLETED;

                const isInactive = projectHasWinner && !isWinner;

                return (
                    <Bid
                        key={bid.id}
                        bid={bid}
                        onClick={() => handleBidClick(bid)}
                        isClickable={isOwner && isProjectOpen}
                        isInactive={isInactive}
                    />
                );
            })}

            <BidWinnerModal
                isOpen={!!selectedBid}
                onClose={() => setSelectedBid(null)}
                onConfirm={handleConfirmWinner}
                isLoading={toAwaitingPaymentMutation.isPending}
            />
        </div>
    );
};