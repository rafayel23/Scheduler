import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyDBaPPl80BIHmk6qtcvelIDGJ0QoBYy7C8",
    authDomain: "scheduler-id.firebaseapp.com",
    databaseURL: "https://scheduler-id.firebaseio.com",
    projectId: "scheduler-id",
    storageBucket: "",
    messagingSenderId: "297381855363",
    appId: "1:297381855363:web:3c5533d0bd92e7ff"
};

export default firebase.initializeApp(config);