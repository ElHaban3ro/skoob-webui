import { getCurrentUser } from "@/api/querys/auth";
import { useQuery } from "@tanstack/react-query";

export default function useCurrentUser() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    retry: false,
  });

  return {
    currentUser: data,
    isErrorGettingCurrentUser: isError,
    isLoadingCurrentUser: isLoading,
  };
}
