import React, { createContext, useState, type PropsWithChildren } from "react"

interface UserContextProps {
    children: React.ReactNode
}

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated'


interface UserContextProps {
    // State
    authStatus: AuthStatus
    user: User | null


    // Methods

    login: (userId: number) => boolean
    logout: () => void

}


export const UserContext = createContext({} as UserContextProps)



export const UserContextProvider = ({ children }: PropsWithChildren) => {


const [authStatus, setAuthStatus] = useState<authStatus>('checking')
const [user, setUser] = useState<User|null>(null)


const handleLogin = (userId:number) => {
    console.log({userId})
    return true
}

const handleLogout = () => {
    console.log('logout')
}


    return (
    <UserContext 
    value={{
        authStatus: authStatus,
        user: user,
        login: handleLogin,
        logout: handleLogout,

    }}
    >
        {children}
        </UserContext>
    )
}
