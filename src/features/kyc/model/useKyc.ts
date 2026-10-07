import { authKeys } from "@/features/auth/model/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    const queryClient = useQueryClient();
    const createMutation = useMutation({
        mutationFn: (formData: FormData) =>
            createVerification(formData),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: authKeys.me }),
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
