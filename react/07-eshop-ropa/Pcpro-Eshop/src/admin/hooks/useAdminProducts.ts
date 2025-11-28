import { useQuery } from "@tanstack/react-query"
import { getProductsAction } from "@/shop/actions/get-products.action"

export const useAdminProducts = () => {
    return useQuery({
        queryKey: ["admin-products"],
        queryFn: () => getProductsAction({
            limit: 50,
            offset: 0,
        }),
        staleTime: 1000 * 60 * 5,
    })
}