import * as firebase from "firebase";
import "firebase/database";

const DB_CONFIG = {
	apiKey: "AIzaSyC8jtsNMVeWbfYKBpR2fjFBq9JAb08AKKI",
	authDomain: "reactnotes-be324.firebaseapp.com",
	projectId: "reactnotes-be324",
	storageBucket: "reactnotes-be324.appspot.com",
	messagingSenderId: "429952292183",
	appId: "1:429952292183:web:09b44f4f12a8315fb91a12",
	databaseURL: "https://react-notes-d38fa-default-rtdb.firebaseio.com",
};

firebase.initializeApp(DB_CONFIG);

export default firebase.database();
