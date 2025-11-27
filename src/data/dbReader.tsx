import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase.tsx'
import { useEffect, useState } from 'react';

export const fetchPost = async () => {

    await getDocs(collection(db, "rooms"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));            
            console.log(newData);
        });

}

// useEffect(()=>{
//     fetchPost();
// }, [])
