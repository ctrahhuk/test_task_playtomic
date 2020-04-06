import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { Observable } from 'rxjs';
import { HttpService } from "../http/HttpService";

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

export class Firebase {
    private auth: firebase.auth.Auth;
    private db: firebase.database.Database;

    constructor() {
        firebase.initializeApp(firebaseConfig);

        this.auth = firebase.auth();
        this.db = firebase.database();
    }

    public login(email, password): Promise<firebase.auth.UserCredential> {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    public getIdToken(): Promise<string | void> {
        return this.auth.currentUser.getIdToken(true);
    }

    public get user() {
        return this.auth.currentUser;
    };

    public onAuthStateChanged(callback): firebase.Unsubscribe {
        return this.auth.onAuthStateChanged(callback);
    }

    public logout() {
        return this.auth.signOut();
    }
}

