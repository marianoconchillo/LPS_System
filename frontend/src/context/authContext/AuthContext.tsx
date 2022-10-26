import { createContext } from "react";
import { User } from "firebase/auth";

interface AuthContextProps {
    user: User | null,
    login: (email: string, password: string) => void,
    loginWithGoogle: () => void,
    logout: () => void,
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);