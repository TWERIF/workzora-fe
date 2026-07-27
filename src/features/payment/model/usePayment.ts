import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    confirmEscrow,
    createEscrow,
    getEscrow,
    getInvoiceStatus,
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


// Polls GET /escrow/status/:invoiceId (backend hits Monobank / our DB, see
// InvoicesService.getStatus) while the embedded checkout modal is open.
// invoiceId here is the Monobank invoice id returned from createEscrow
// (escrow.invoiceId in PaymentForm), not our internal escrow id.
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
        // Stop polling once we've reached a terminal state — no point
        // hammering the backend (and Monobank behind it) after that.
        refetchInterval: (query) => {
            const status = query.state.data?.status;
            if (status === "success" || status === "failure") return false;
            return intervalMs;
        },
    });

    // Once the payment lands, seed the escrow cache so any component reading
    // useEscrow(id) picks up the HELD status immediately instead of waiting
    // for its own refetch.
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