import firebase from 'firebase';

try {                                                            // putting this in the try catch block will ensure that only one attempt is made to connect ....

    var config = {
        apiKey: "AIzaSyBc4tgVkvFvQRDuhNsJIgCmGQ4JipoGK4s",
        authDomain: "react-todo-app-77b6d.firebaseapp.com",
        databaseURL: "https://react-todo-app-77b6d.firebaseio.com",
        projectId: "react-todo-app-77b6d",
        storageBucket: "react-todo-app-77b6d.appspot.com",
        messagingSenderId: "1084044793503"
    };
    firebase.initializeApp(config);

} catch (e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;                             // whats the use ??? didnt explain clearly