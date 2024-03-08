import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            if (user) {
                setIsAuthenticated(true)
                setUser(user)
            } else {
                setIsAuthenticated(false)
                setUser(null)

            }
        })
        return unsub
    }, [])

    const login = async (email, password) => {
        try {

        } catch (error) {

        }
    }
    const logout = async (email, password) => {
        try {

        } catch (error) {

        }
    }
    const register = async (email, password, username) => {
        try {
            const respons = await createUserWithEmailAndPassword(auth, email, password)

            await setDoc(doc(db, "users", respons?.user?.uid), {
                username,
                userId: respons?.user?.uid
            })
            return { success: true, data: respons?.user, msg: "Oke" }
        } catch (error) {
            let msg = error.message
            if (msg.includes("(auth/invalid-email)")) msg = "Invalid email"
            return { success: false, msg }
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext)
    if (!value) {
        throw new Error("UseAuth must be wrapped inside AuthContextProvider")
    }
    return value
}