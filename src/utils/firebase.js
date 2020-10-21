import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyC1yXQLCUdgyi0xF5cP6vLRSKSUehzjXtE",
    authDomain: "talento-2258c.firebaseapp.com",
    databaseURL: "https://talento-2258c.firebaseio.com",
    projectId: "talento-2258c",
    storageBucket: "talento-2258c.appspot.com",
    messagingSenderId: "415762184604",
    appId: "1:415762184604:web:9a97b284bda112e0adf059"
}

export const db = firebase.initializeApp(firebaseConfig).firestore()
