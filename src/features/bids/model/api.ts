import { $api } from "@/shared/components/http";
import { Bid, CreateBidDto, UpdateBidDto } from "./types";

export const createBid = async (data: CreateBidDto): Promise<Bid> => {
    return (await $api.post("/bids", data)).data;
};

export const getProjectBids = async (projectId: string): Promise<Bid[]> => {
    return (await $api.get(`/bids/project/${projectId}`)).data;
};

export const getMyBids = async (): Promise<Bid[]> => {
    return (await $api.get("/bids/my")).data;
};

export const updateBid = async (id: string, data: UpdateBidDto): Promise<Bid> => {
    return (await $api.patch(`/bids/${id}`, data)).data;
};

export const deleteBid = async (id: string): Promise<void> => {
    return (await $api.delete(`/bids/${id}`)).data;
};