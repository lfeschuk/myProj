import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyApY_ArxtwaDtxdyogV__a5FCudDgsbs3Y",
    authDomain: "jetpack-f6617.firebaseapp.com",
    databaseURL: "https://jetpack-f6617.firebaseio.com",
    storageBucket: "jetpack-f6617.appspot.com",
    projectId: "jetpack-f6617",
  };

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();