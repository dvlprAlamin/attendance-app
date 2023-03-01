import { collection, getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import { db } from "../firebase/firebase.config";

export const checkTodaysAttendance = async (email = "null") => {
    // const q = query(, where("email", "==", email));
    const querySnapshot = await getDocs(collection(db, "attendance", moment().format("YYYY-MM-DD"), email));
    const data = []
    querySnapshot.forEach((doc) => {
        data.push(doc.data())
    });
    return data;
}
export const checkAdmin = async (email = "null") => {
    const q = query(collection(db, "admin"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const data = []
    querySnapshot.forEach((doc) => {
        data.push(doc.data())
    });
    return data;
}