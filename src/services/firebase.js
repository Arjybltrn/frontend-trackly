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
const googleProvider = new firebase.auth.GoogleAuthProvider()
const fbProvider = new firebase.auth.FacebookAuthProvider()

// set up auth functions
const googleLogin = async () => {
  try {
    await auth.signInWithPopup(googleProvider)
    window.location.href = "/jobs"
  } catch (error) {
    console.log('Login error:', error)
  }
}

const fbLogin = () => {
    return auth.signInWithPopup(fbProvider)
}

const loginWithEmailAndPassword = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

const logout = async () => {
    try {
      await auth.signOut();
      window.location.href = '/'; // Redirect to landing page after logout
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

export { googleLogin, fbLogin, loginWithEmailAndPassword, logout, auth }