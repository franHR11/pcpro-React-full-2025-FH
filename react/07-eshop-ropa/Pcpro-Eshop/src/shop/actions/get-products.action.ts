import { pcproApi } from "@/api/pcproshopApi"
import type { ProductsResponse } from "@/interfaces/products.response"


interface Options {
    limit?: number | string
    offset?: number | string
    gender?: string
    sizes?: string
    minPrice?: number
    maxPrice?: number
    query?: string


}






export const getProductsAction = async (options: Options): Promise<ProductsResponse> => {

    const { limit, offset, gender, sizes, minPrice, maxPrice, query } = options


    const { data } = await pcproApi.get<ProductsResponse>('/products', {
        params: {
            limit, offset, gender, sizes, minPrice, maxPrice, q: query
        }
    })

    const productsWithImageUrls = data.products.map(product => ({
        ...product,
        images: product.images.map(
            (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`
        )
    }))

    return {
        ...data,
        products: productsWithImageUrls
    }

}