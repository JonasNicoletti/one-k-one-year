import React, { createContext, ReactNode, useContext } from 'react';
import { getUser } from '../utils/AuthClient';
import { StravaUser } from '../utils/models';

type ContextProps = {
    user: StravaUser
    login: Function
    logout: Function
}

const AuthContext = createContext<Partial<ContextProps>>({})

type ProviderProps = {
    children: ReactNode
}
function AuthProvider(props: ProviderProps) {

    const user = getUser()


    const login = () => {}
    const logout = () => {}

    return <AuthContext.Provider value={{user, login, logout}} {...props}/>
}

function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
      throw new Error(`useAuth must be used within a AuthProvider`)
    }
    return context
  }

  export {AuthProvider, useAuth}