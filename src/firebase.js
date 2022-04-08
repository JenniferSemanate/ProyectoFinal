// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set, get, child } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT8y2l00MK981tmAId21LK5M_Al8jD1WQ",
  authDomain: "vue-proyectofinal-f93a3.firebaseapp.com",
  databaseURL: "https://vue-proyectofinal-f93a3-default-rtdb.firebaseio.com",
  projectId: "vue-proyectofinal-f93a3",
  storageBucket: "vue-proyectofinal-f93a3.appspot.com",
  messagingSenderId: "226354120568",
  appId: "1:226354120568:web:09cdbab2d47fe1ebd2aa8d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export function storeData(dataset, payload) {
  set(ref(db, dataset), payload);
}

export async function getData(dataset) {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, dataset));

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
}
