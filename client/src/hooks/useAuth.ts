import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      const response = await apiClient.getUser();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    login: apiClient.login,
    logout: apiClient.logout,
  };
}
