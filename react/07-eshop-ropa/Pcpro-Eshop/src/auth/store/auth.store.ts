import type { User } from '@/interfaces/user.interface'
import { create } from 'zustand'
import { loginAction } from '../actions/login.actions'
import { checkAuthAction } from '../actions/check-auth.actions'
import { registerAction } from '../actions/register.actions'

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking'


type AuthState = {

    //properties
    user: User | null,
    token: string | null,
    AuthStatus: AuthStatus
    // getters

    isAdmin: () => boolean


    // actions

    login: (email: string, password: string) => Promise<boolean>
    register: (email: string, password: string, fullName: string) => Promise<boolean>
    logout: () => void
    checkAuthStatus: () => Promise<boolean>

}

export const useAuthStore = create<AuthState>()((set, get) => ({
    //implementacion del store

    user: null,
    token: null,
    AuthStatus: 'checking',

    // Getters

    isAdmin: () => {
        const roles = get().user?.roles || []
        return roles.includes('admin')
    },


    // actions

    login: async (email: string, password: string) => {
        try {
            const data = await loginAction(email, password)
            localStorage.setItem('token', data.token)

            set({ user: data.user, token: data.token, AuthStatus: 'authenticated' })
            return true

        } catch (error) {
            localStorage.removeItem('token')
            set({ user: null, token: null, AuthStatus: 'not-authenticated' })

            console.log(error)
            return false
        }


    },

    register: async (email: string, password: string, fullName: string) => {
        try {
            const data = await registerAction(email, password, fullName)
            localStorage.setItem('token', data.token)

            set({ user: data.user, token: data.token, AuthStatus: 'authenticated' })
            return true

        } catch (error) {
            localStorage.removeItem('token')
            set({ user: null, token: null, AuthStatus: 'not-authenticated' })

            console.log(error)
            return false
        }


    },

    logout: () => {

        localStorage.removeItem('token')
        set({ user: null, token: null, AuthStatus: 'not-authenticated' })
    },

    checkAuthStatus: async () => {
        try {
            const { user, token } = await checkAuthAction()
            set({
                user: user,
                token: token,
                AuthStatus: 'authenticated'
            })

            return true
        } catch (error) {

            set({
                user: undefined,
                token: undefined,
                AuthStatus: 'not-authenticated'
            })
            return false
            console.log(error)
        }
    }

}))

