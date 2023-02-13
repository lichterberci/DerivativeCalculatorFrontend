/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    "GTAG_KEY" : "G-99397P9H1K",
    "FIREBASE_API_KEY" : "AIzaSyCPu0Ki58Yv2tKcOCto5ladPMj-5LC3w-U",
    "FIREBASE_AUTH_DOMAIN" : "derivative-calculator-374423.firebaseapp.com",
    "FIREBASE_DATABASE_URL" : "https://derivative-calculator-374423-default-rtdb.europe-west1.firebasedatabase.app",
    "FIREBASE_PROJECT_ID" : "derivative-calculator-374423",
    "FIREBASE_STORAGE_BUCKET" : "derivative-calculator-374423.appspot.com",
    "FIREBASE_MESSAGING_SENDER_ID" : "223603324205",
    "FIREBASE_APP_ID" : "1:223603324205:web:914d7b8136e3af95c28fa4",
    "FIREBASE_MEASUREMENT_ID" : "G-GSZ3EGF6BZ",
    "DEFAULT_COLOR_THEME" : "light",
    "API_URL" : "hattps://derivativecalculatorapi.azurewebsites.net"
  }
}

module.exports = nextConfig
