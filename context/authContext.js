import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from 'firebase/auth'
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)

    const updateUserData = async (userId) => {
        const docRef = doc(db, "users", userId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            let data = docSnap.data();
            setUser({ id: docSnap.id, ...data })
        }
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            if (user) {
                setIsAuthenticated(true)
                setUser(user)
                updateUserData(user.uid)
            } else {
                setIsAuthenticated(false)
                setUser(null)
            }
        })
        return unsub
    }, [])

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            .then((user)=>{
                sendEmailVerification(user)
                // setIsAuthenticated(true)
                // setUser(user)
                // updateUserData(user.uid)
                return { success: true, msg: "Login berhasil" }
            })
        } catch (error) {
            let msg = error.message
            if (msg.includes("auth/invalid-credential")) msg = "Email atau password salah"
            if (msg.includes("Access to this account has been temporarily disabled due to many failed login attempts")) msg = "Terlalu banyak percobaan login, akun anda ditangguhkan sementara"
            return { success: false, msg }
        }
    }
    const logout = async () => {
        try {
            await signOut(auth).then(()=>{
                // setIsAuthenticated(false)
                // setUser(null)
                return { success: true, msg: "Berhasil logout" }
            })
        } catch (error) {
            return { success: true, msg: error?.message }
        }
    }
    const register = async (email, password, username) => {
        try {
            return await createUserWithEmailAndPassword(auth, email, password)
            .then(async ({user})=>{
                setDoc(doc(db, "users", user?.uid), {
                    email,
                    username,
                    userId: user?.uid,
                    level: "user"
                }).then(async ()=>{
                    // setIsAuthenticated(true)
                    // setUser(user)
                    // updateUserData(user.uid)
                    return { success: true, data: respons?.user, msg: "Akun berhasil dibuat, silahkan verifikasi email!" }
                })
            })
        } catch (error) {
            let msg = error.message
            if (msg.includes("(auth/invalid-email)")) msg = "Invalid email"
            if (msg.includes("(auth/email-already-in-use)")) msg = "Email sudah terdaftar"
            return { success: false, msg }
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register, updateUserData }}>
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