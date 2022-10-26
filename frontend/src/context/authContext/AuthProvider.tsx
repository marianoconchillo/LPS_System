import { useState } from "react";
import {
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../../firebaseSetup";

interface props {
    children: JSX.Element | JSX.Element[]
}

export const AuthProvider = ({ children }: props) => {

    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState<boolean>(true);

    const signup = async (email: string, password: string) => {
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
        }
    }

    const login = async (email: string, password: string) => {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
        }
    }

    const loginWithGoogle = async () => {
        try {
            const googleProvider = new GoogleAuthProvider();
            return await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        try {
            return await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signup,
            login,
            loginWithGoogle,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}