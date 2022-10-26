import { createContext } from "react";
import firebase from "firebase/app";
import { User } from "firebase/auth";

interface AuthContextProps {
    user: User,
    loading: boolean,
    signup: (email: string, password: string) => void,
    login: (email: string, password: string) => void,
    loginWithGoogle: () => void,
    logout: () => void,
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);