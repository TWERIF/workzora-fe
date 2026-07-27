export enum EscrowStatus {
    CREATED,
    HELD,
    DISPUTED,
    CAPTURED,
    PAID_OUT,
    REFUNDED,
    EXPIRED,
}

export enum WonDispute {
    CLIENT,
    FREELANCER,
}

export interface CreateEscrowPayload {
    amount: number;
    currencyCode: number;
    projectId: string;
    clientId: string;
    freelancerId: string;
    description?: string;
}

export interface Escrow {
    id: string;
    amount: number;
    currencyCode: number;
    projectId: string;
    clientId: string;
    freelancerId: string;
    status: EscrowStatus;
    createdAt: string;
    updatedAt: string;
    invoiceId?: string;
    pageUrl?: string;
}

export interface ConfirmEscrowPayload {
    clientId: string;
}

export interface OpenDisputePayload {
    initiatorId: string;
    reason: string;
}

export interface ResolveDisputePayload {
    adminId: string;
    decision: WonDispute;
    note?: string;
}
export interface InvoiceStatusResponse {
    status: "processing" | "success" | "failure";
    escrow?: Escrow;
}