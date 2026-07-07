import { useMutation, useQuery } from "@tanstack/react-query";
import {
    createVerification,
    getVerification
} from "./api";

export const kycKeys = {
    all: (page: number, limit: number) => [
        "kyc-verifications",
        page,
        limit,
    ],
    one: (id: string) => ["kyc-verification", id],
    my: ["my-kyc-verification"],
};

export const useKyc = (id?: string) => {
    const createMutation = useMutation({
        mutationFn: (formData: FormData) =>
            createVerification(formData),
    });


    const { data: verification, isLoading: isLoadingVerification } =
        useQuery({
            queryFn: () => getVerification(id!),
            queryKey: kycKeys.one(id!),
            enabled: !!id,
        });
    return {
        verification,

        isLoadingVerification,

        createMutation,
    };
};
