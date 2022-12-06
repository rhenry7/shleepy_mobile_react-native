// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBmQHTqztzPW2q-odOnktuwNV42cW9y1A8',
  authDomain: 'shleepy-app-react-native.firebaseapp.com',
  projectId: 'shleepy-app-react-native',
  storageBucket: 'shleepy-app-react-native.appspot.com',
  messagingSenderId: '738770230249',
  appId: '1:738770230249:web:71ffac368ca8844e484978',
  measurementId: 'G-ETSGJCG0J1',
}

// Initialize Firebase

const initializeAppIfNecessary = () => {
  try {
    return getApp()
  } catch {
    return initializeApp(firebaseConfig)
  }
}
let app = initializeAppIfNecessary()
export const auth = getAuth(app)

// const analytics = getAnalytics(app);
