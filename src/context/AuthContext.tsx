import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children} : {children: ReactNode}) {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));
    const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));

    const login = (newToken: string, newUsername: string, newUserId: string) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('username', newUsername);
        localStorage.setItem('userId', newUserId);
        setToken(newToken);
        setUsername(newUsername);
        setUserId(newUserId);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        setToken(null);
        setUsername(null);
        setUserId(null);

    };

    const isLoggedIn = token !== null;

    return (
        <AuthContext.Provider value={{ token, username, userId, login, logout, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth måste användas inut en authprovider');
    }

    return context;
}