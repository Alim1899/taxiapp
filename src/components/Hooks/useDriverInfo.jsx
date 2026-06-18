import { useQuery } from "@tanstack/react-query";
import { DRIVER_INFO } from "../../utils/Constants";
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
      if (!res.ok) throw new Error("Failed to fetch driver info");
      return res.json();
    },
    enabled: !!token, // 👈 only fetch when token exists
  });
};
