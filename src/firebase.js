require("dotenv").config();

import {
    initializeApp
} from "firebase/app";
import {
    getDatabase
} from "firebase/database";


const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    databaseURL: process.env.DATABASEURL
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

module.exports = {
    db,
};