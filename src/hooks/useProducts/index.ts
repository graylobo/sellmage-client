import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "src/api/product/indext";
import { queryKeys } from "src/const/query-key";

export function useGetProducts(vendor?: string) {
  const queryKey = [queryKeys.product, vendor];

  return useSuspenseQuery({
    queryKey,
    queryFn: () => getProducts(vendor),

    select(data) {
      const prdDataList = data.data;
      return prdDataList;
    },
    staleTime: 1000 * 60 * 60,
  });
}
