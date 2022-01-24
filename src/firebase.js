

import firebase from "firebase/compat"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBoJtX9BDP1OLTng9B8Gm-7RyiM1RiS9Cc",
       authDomain: "instagram-clone-a31f5.firebaseapp.com",
       projectId: "instagram-clone-a31f5",
       storageBucket: "instagram-clone-a31f5.appspot.com",
       messagingSenderId: "719776402736",
       appId: "1:719776402736:web:f60d64b06769a7beb1ccf5",
       measurementId: "G-DLRR465XMN"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export  default { db , auth , storage} ;
