// hooks/useDriverInfo.js
import { useQuery } from "@tanstack/react-query";
import { DRIVER_INFO } from "../../utils/Constants";
import queryClient from "../../queryClient";

export const useDriverInfo = (token) => {
  return useQuery({
    queryKey: ["driverInfo"],
    queryFn: async () => {
      const res = await fetch(`${DRIVER_INFO}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        if (res.status === 500) {
          // 👈 return previous cached data silently instead of throwing
          return queryClient.getQueryData(["driverInfo"]);
        }
        throw new Error("Failed to fetch driver info");
      }
      return res.json();
    },
    enabled: !!token,
    refetchOnWindowFocus: false,
    retry: false,
    refetchInterval: (query) => {
      if (query.state.error) return false;
      return 1000 * 4;
    },
    refetchIntervalInBackground: false,
  });
};