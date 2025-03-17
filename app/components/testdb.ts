import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const testFirestore = async () => {
    try {
        const docRef = doc(db, "testCollection", "testDoc");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Firestore is working:", docSnap.data());
        } else {
            console.log("No such document!");
        }
    } catch (err) {
        console.error("Firestore error:", err);
    }
};