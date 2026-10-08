import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    confirmEscrow,
    createEscrow,
    getEscrow,
    getInvoiceStatus,
    getProjectEscrow,
    openDispute,
    resolveDispute,
} from "./api";
import type {
    ConfirmEscrowPayload,
    CreateEscrowPayload,
    OpenDisputePayload,
    ResolveDisputePayload,
} from "./types";


export const escrowKeys = {
    one: (id: string) => [
        "escrow",
        id,
    ],
};

export const invoiceStatusKeys = {
    one: (invoiceId: string) => [
        "invoiceStatus",
        invoiceId,
    ],
};


export const useEscrow = (id?: string) => {
    const {
        data: escrow,
        isLoading: isLoadingEscrow,
    } = useQuery({
        queryFn: () => getEscrow(id!),
        queryKey: escrowKeys.one(id!),
        enabled: !!id,
    });


    return {
        escrow,
        isLoadingEscrow,
    };
};


export const useCreateEscrow = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateEscrowPayload) => createEscrow(data),
        onSuccess: (escrow) => {
            queryClient.setQueryData(escrowKeys.one(escrow.id), escrow);
        },
    });
};


export const useInvoiceStatus = (
    invoiceId: string,
    options: { enabled?: boolean; intervalMs?: number } = {},
) => {
    const { enabled = true, intervalMs = 3000 } = options;
    const queryClient = useQueryClient();

    const {
        data,
        isLoading: isLoadingInvoiceStatus,
        error: invoiceStatusError,
    } = useQuery({
        queryFn: () => getInvoiceStatus(invoiceId),
        queryKey: invoiceStatusKeys.one(invoiceId),
        enabled: enabled && !!invoiceId,
        refetchInterval: (query) => {
            const status = query.state.data?.status;
            if (status === "success" || status === "failure") return false;
            return intervalMs;
        },
    });

    useEffect(() => {
        if (data?.status === "success" && data.escrow) {
            queryClient.setQueryData(escrowKeys.one(data.escrow.id), data.escrow);
        }
    }, [data, queryClient]);

    return {
        status: data?.status,
        escrow: data?.escrow,
        isLoadingInvoiceStatus,
        invoiceStatusError,
    };
};


export const useConfirmEscrow = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ConfirmEscrowPayload) => confirmEscrow(id, data),
        onSuccess: (escrow) => {
            queryClient.setQueryData(escrowKeys.one(id), escrow);
        },
    });
};


export const useOpenDispute = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: OpenDisputePayload) => openDispute(id, data),
        onSuccess: (escrow) => {
            queryClient.setQueryData(escrowKeys.one(id), escrow);
        },
    });
};


export const useResolveDispute = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ResolveDisputePayload) => resolveDispute(id, data),
        onSuccess: (escrow) => {
            queryClient.setQueryData(escrowKeys.one(id), escrow);
        },
    });
};
export const useProjectDispute = (projectId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ initiatorId, reason }: OpenDisputePayload) => {
            const escrow = await getProjectEscrow(projectId);
            if (!escrow) throw new Error("No escrow for this project");
            return openDispute(escrow.id, { initiatorId, reason });
        },
        onSuccess: (escrow) => queryClient.setQueryData(escrowKeys.one(escrow.id), escrow),
    });
};
