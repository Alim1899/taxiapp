import { useInfiniteQuery } from "@tanstack/react-query";
import { TRANSACTIONS } from "../../utils/Constants";

const TAKE = 1; // change to 5 in production

export const useTransactions = (token, hasPending = false) => {
  
  return useInfiniteQuery({
    queryKey: ["transactions"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetch(
        `${TRANSACTIONS}?take=${TAKE}&skip=${pageParam}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
     
      if (!res.ok) throw new Error("Failed to fetch transactions");
      return res.json();
    },
    getNextPageParam: (lastPage, allPages) => {
      const fetched = allPages.flatMap((p) => p.data ?? p).length;
      const hasMore = fetched < (lastPage.total ?? allPages[0].count);
      return hasMore ? fetched : undefined;
    },
    enabled: !!token,
    refetchInterval: hasPending ? 3000 : false, 
  });
};
