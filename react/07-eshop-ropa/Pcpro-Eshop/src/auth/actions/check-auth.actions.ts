import { pcproApi } from "@/api/pcproshopApi"
import type { AuthResponse } from "../interface/auth.response"



export const checkAuthAction = async (): Promise<AuthResponse> => {

    const token = localStorage.getItem('token')
    if (!token) throw new Error('No hay token')

    try {
        const { data } = await pcproApi.get<AuthResponse>('/auth/check-status')

        localStorage.setItem('token', data.token)

        return data

    } catch (error) {

        localStorage.removeItem('token')
        throw new Error('Token Expirado o no valido')
        console.log(error)
    }
}