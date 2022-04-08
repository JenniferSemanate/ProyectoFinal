// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set, get, child } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMMndMf9gIjNdS5KkyYx5hSUvuxWun3QE",
  authDomain: "starwars2-717f3.firebaseapp.com",
  databaseURL: "https://starwars2-717f3-default-rtdb.firebaseio.com",
  projectId: "starwars2-717f3",
  storageBucket: "starwars2-717f3.appspot.com",
  messagingSenderId: "792478778812",
  appId: "1:792478778812:web:0f280348435569fcad17b9",
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
