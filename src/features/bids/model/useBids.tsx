import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBid, deleteBid, getMyBids, getProjectBids, updateBid } from './api';
import { CreateBidDto, UpdateBidDto } from './types';

export const BID_KEYS = {
    all: ['bids'] as const,

    projects: () => [...BID_KEYS.all, 'project'] as const,
    project: (projectId: string) => [...BID_KEYS.projects(), projectId] as const,

    my: () => [...BID_KEYS.all, 'my'] as const,
};

export const useProjectBids = (projectId: string) => {
    return useQuery({
        queryKey: BID_KEYS.project(projectId),
        queryFn: () => getProjectBids(projectId),
        enabled: !!projectId,
    });
};

export const useMyBids = () => {
    return useQuery({
        queryKey: BID_KEYS.my(),
        queryFn: () => getMyBids(),
    });
};

export const useCreateBid = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateBidDto) => createBid(data),
        onSuccess: (newBid) => {
            queryClient.invalidateQueries({ queryKey: BID_KEYS.my() });
            if (newBid.projectId) {
                queryClient.invalidateQueries({ queryKey: BID_KEYS.project(newBid.projectId) });
            }
        },
    });
};

export const useUpdateBid = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateBidDto }) => updateBid(id, data),
        onSuccess: (updatedBid) => {
            queryClient.invalidateQueries({ queryKey: BID_KEYS.my() });
            if (updatedBid.projectId) {
                queryClient.invalidateQueries({ queryKey: BID_KEYS.project(updatedBid.projectId) });
            }
        },
    });
};

export const useDeleteBid = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteBid(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BID_KEYS.all });
        },
    });
};