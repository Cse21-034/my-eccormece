import { QueryClient } from "@tanstack/react-query";
import { apiClient } from "./api";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Custom fetcher that uses our API client
export const fetcher = async (endpoint: string) => {
  const response = await apiClient.request(endpoint);
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data;
};
