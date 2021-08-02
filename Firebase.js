import firebase from 'firebase'

var firebaseApp =firebase.initializeApp({


   
        apiKey: "AIzaSyB78gulVVtaJf6b3bKTc8znbny3lRBMQ1Y",
        authDomain: "store-ccadd.firebaseapp.com",
        databaseURL: "https://store-ccadd-default-rtdb.firebaseio.com",
        projectId: "store-ccadd",
        storageBucket: "store-ccadd.appspot.com",
        messagingSenderId: "1013139955650",
        appId: "1:1013139955650:web:a71b13bea3503c50b2805b"
      
    
})
var db= firebaseApp.firestore();
export {db};