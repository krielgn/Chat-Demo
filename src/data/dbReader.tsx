import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase.tsx'

// Grab current list of rooms from firebaase
export async function fetchRooms(): Promise<object[] | null> {
    let output = getDocs(collection(db, "rooms"))
        .then((resp) => {        
            const newData: object[] = resp.docs.map((doc) => 
                ({...doc.data(), roomId:doc.id }));            
            console.log(newData);
            return newData;
        }).catch((error)=>{
            console.log(error);
            return null;
            //return {error: error};
        });
    return await output;
}