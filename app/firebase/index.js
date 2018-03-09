import firebase from 'firebase';

try {                                                            

    var config = {
        apiKey: process.env.API_KEY,                         // NOTE: the 'process' variable is not available in browser. its node specific
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID
    };
    firebase.initializeApp(config);

} catch (e) {

}

export var githubProvider = new firebase.auth.GithubAuthProvider();     // this provider will let the firebase know which social platform to use. This will be used in the actions
export var firebaseRef = firebase.database().ref();
export default firebase;                          