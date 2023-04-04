// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { getDatabase, set, ref, Database } from "firebase/database";
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
export let firebaseApp: FirebaseApp | null = null;
export let firebaseAnalytics: Analytics | null = null;
export let db: Database | null = null;

export function FirebaseInit (): void {
    
    try {
        if (firebaseApp === null)
            firebaseApp = initializeApp(firebaseConfig);
        if (firebaseAnalytics === null)
            firebaseAnalytics = getAnalytics(firebaseApp);
        if (db === null)
            db = getDatabase(firebaseApp);
    
        console.log("Firebase initialized!");
    } catch (e) {
        console.error(`Firebase initialization failed: ${e.message}`);
    }
}

export async function WriteBugReport (bugReport: IBugReport): Promise<boolean> {

    if (db === null) {
        console.error("Cannot write bug report, db is uninitialized!");
        return false;
    }

    const reportId: string = new Date(Date.now()).toISOString().slice(0, 10) + "_" + Math.floor(Math.random() * 1000000).toString();

    try {
        await set(
            ref(
                db as Database, 
                `bug_reports/${reportId}`
            ), 
            bugReport
        );
        
        console.log("Bug report sent successfully!");

        return true; // success
    } 
    catch (err) {
        console.log("Bug report could not be sent!");
        console.error(err);
        return false;
    }
}