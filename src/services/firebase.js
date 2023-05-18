import firebase from 'firebase/app'
import 'firebase/auth'

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCaJj8C3mYg05lye81fkGOAymZHmrc1FQ",
    authDomain: "taskly-d0cbd.firebaseapp.com",
    projectId: "taskly-d0cbd",
    storageBucket: "taskly-d0cbd.appspot.com",
    messagingSenderId: "58488728316",
    appId: "1:58488728316:web:14bd93b9f58d96d5a34579"
};


// activate firebase app
firebase.initializeApp(firebaseConfig)

// configure settings
const auth = firebase.auth()

// setup providers
const provider = new firebase.auth.GoogleAuthProvider()

// set up auth functions
const login = () => {
    return auth.signInWithPopup(provider)
}

const logout = () => {
    return auth.signOut()
}

export { login, logout, auth }