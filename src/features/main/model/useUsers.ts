import { useQuery } from "@tanstack/react-query";
import { getTopClients, getTopFreelancers } from "./api";

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
