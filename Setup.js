import React from 'react'
import firebase from '@react-native-firebase/app'
import Auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage'
import {GoogleSignin} from '@react-native-google-signin/google-signin'

GoogleSignin.configure({
    webClientId:
    '504324613451-oakuapu3lfmf4rmgcdj0t880fdicfkuc.apps.googleusercontent.com'
});

const firebaseConfig = {
    apiKey: "AIzaSyB78gulVVtaJf6b3bKTc8znbny3lRBMQ1Y",
    authDomain: "store-ccadd.firebaseapp.com",
    databaseURL: "https://store-ccadd-default-rtdb.firebaseio.com",
    projectId: "store-ccadd",
    storageBucket: "store-ccadd.appspot.com",
    messagingSenderId: "1013139955650",
    appId: "1:1013139955650:web:a71b13bea3503c50b2805b"
  };

  if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default ()=>{
    return {firebase,Auth,database,storage};
};