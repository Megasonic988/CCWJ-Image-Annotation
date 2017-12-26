import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyCkfjzqiYMmKMYi2whd3ixnWzcPi-vJu-Q",
    authDomain: "ccwj-image-annotation.firebaseapp.com",
    databaseURL: "https://ccwj-image-annotation.firebaseio.com",
    projectId: "ccwj-image-annotation",
    storageBucket: "gs://ccwj-image-annotation.appspot.com",
    messagingSenderId: "445077046053"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
