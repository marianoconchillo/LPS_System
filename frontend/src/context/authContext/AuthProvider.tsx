import { useEffect, useState } from "react";
import {
    User,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../../firebaseSetup";

interface props {
    children: JSX.Element | JSX.Element[]
}

export const AuthProvider = ({ children }: props) => {

    const [user, setUser] = useState<User | null>(null);

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const loginWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    }

    const logout = () => signOut(auth);

    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        })
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            login,
            loginWithGoogle,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}