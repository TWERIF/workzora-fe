import { useQuery } from "@tanstack/react-query";
import { getProfilePreview, getTopClients, getTopFreelancers } from "./api";

export const useUsers = () => {
  const { data: topClients } = useQuery({
    queryFn: getTopClients,
    queryKey: ["topClients"],
  });
  const { data: topFreelancers } = useQuery({
    queryFn: getTopFreelancers,
    queryKey: ["topFreelancers"],
  });

  return { topClients, topFreelancers };
};
export const usePreview = (role: "client" | "freelancer", amount: number) => {
  const { data: preview, isLoading } = useQuery({
    queryKey: ["preview", role],
    queryFn: () => getProfilePreview(role, amount),
  });
  return { preview, isLoading };
};
