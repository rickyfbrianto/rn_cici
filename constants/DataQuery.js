import { useQuery } from "@tanstack/react-query"
import { doc, getDoc } from "firebase/firestore"
import { db } from "firebaseConfig"

export const getUser = (userid) => {
    return useQuery({
        queryKey: ["currentUser", userid],
        enabled: userid ? true : false,
        queryFn: async () => {
            const querySnap = await getDoc(doc(db, "users", userid))
            return { id: querySnap.id, ...querySnap.data() }
        }
    })
}