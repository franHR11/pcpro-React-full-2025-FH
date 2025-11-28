import { pcproApi } from "@/api/pcproshopApi"
import type { AuthResponse } from "../interface/auth.response"


export const loginAction = async (email: string, password: string): Promise<AuthResponse> => {

    try {
        const { data } = await pcproApi.post<AuthResponse>('/auth/login', {
            email: email,
            password: password
        })

        console.log(data)

        return data


    } catch (error) {
        console.log(error)
        throw error
    }


}