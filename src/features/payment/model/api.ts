import { $api } from "@/shared/components/http";
import type {
    ConfirmEscrowPayload,
    CreateEscrowPayload,
    Escrow,
    InvoiceStatusResponse,
    OpenDisputePayload,
    ResolveDisputePayload,
} from "./types";


export const createEscrow = async (
    data: CreateEscrowPayload,
): Promise<Escrow> => {
    const res = await $api.post("/escrow", data);

    return res.data;
};


export const getEscrow = async (id: string): Promise<Escrow | undefined> => {
    if (!id) return;

    const res = await $api.get(`/escrow/${id}`);

    return res.data;
};


export const confirmEscrow = async (
    id: string,
    data: ConfirmEscrowPayload,
): Promise<Escrow> => {
    const res = await $api.post(`/escrow/${id}/confirm`, data);

    return res.data;
};


export const openDispute = async (
    id: string,
    data: OpenDisputePayload,
): Promise<Escrow> => {
    const res = await $api.post(`/escrow/${id}/dispute`, data);

    return res.data;
};


export const resolveDispute = async (
    id: string,
    data: ResolveDisputePayload,
): Promise<Escrow> => {
    const res = await $api.post(`/escrow/${id}/dispute/resolve`, data);

    return res.data;
};

export const getInvoiceStatus = async (invoiceId: string) => {
    const res = await $api.get<{ data: InvoiceStatusResponse }>(`/escrow/status/${invoiceId}`).then((r) => r.data);
    return res.data;
}