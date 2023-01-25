// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, set, ref } from "firebase/database";
import IBugReport from "../classes/BugReport";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseApp);
export const db = getDatabase(firebaseApp);

export async function WriteBugReport (bugReport: IBugReport): Promise<boolean> {

    const reportId: string = Date.now().toString() + "-" + Math.floor(Math.random() * 10000).toString();

    try {
        await set(
            ref(
                db, 
                `bug_reports/${reportId}`
            ), 
            bugReport
        );
        
        return true; // success
    } 
    catch (err) {
        console.error(err);
        return false;
    }
}