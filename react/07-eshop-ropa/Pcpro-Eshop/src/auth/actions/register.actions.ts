import { pcproApi } from "@/api/pcproshopApi"
import type { AuthResponse } from "../interface/auth.response"


export const loginAction = async (email: string, password: string, fullName: string): Promise<AuthResponse> => {

    try {
        const { data } = await pcproApi.post<AuthResponse>('/auth/login', {
            email: email,
            password: password,
            fullName: fullName
        })

        return data


    } catch (error) {
        console.log(error)
        throw error
    }


}

export const registerAction = async (email: string, password: string, fullName: string): Promise<AuthResponse> => {

    try {
        const { data } = await pcproApi.post<AuthResponse>("/auth/register", {
            email: email,
            password: password,
            fullName: fullName,
        })

        return data

    } catch (error) {
        console.log(error)
        throw error
    }

}