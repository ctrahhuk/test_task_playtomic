const admin  = require('firebase-admin');
const firebase = require('firebase')
const express = require('express');
const serviceAccount = require("./test1-d946c-firebase-adminsdk-qxx8d-8223868bc2.json");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

firebase.initializeApp(firebaseConfig = {
    apiKey: "AIzaSyC6UtZn1Y5cRmT1brxJm-J-yFz-bRa5lBs",
    authDomain: "test1-d946c.firebaseapp.com",
    databaseURL: "https://test1-d946c.firebaseio.com",
    projectId: "test1-d946c",
    storageBucket: "test1-d946c.appspot.com",
    messagingSenderId: "234499190666",
    appId: "1:234499190666:web:09d5ba42521656283fe273"
});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://test1-d946c.firebaseio.com"
});
// Get a database reference to our posts
var db = admin.database();
var booksRef = db.ref("server/saving-data/fireblog/posts");

const checkIfAuthenticated = async (req, res, next) => {
    const authToken = (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) ? req.headers.authorization.split(' ')[1] : null;

    try {
        const userInfo = await admin.auth().verifyIdToken(authToken);
        req.authId = userInfo.uid;
        return next();
    } catch (e) {
        return res
            .status(401)
            .send({error: 'You are not authorized to do this'});
    }
};

app.post('/auth/signup', async (req, res) => {
    const {
        email,
        password,
        firstName,
        lastName
    } = req.body;

    try {
         const user = await admin.auth().createUser({
            email,
            password,
            displayName: `${firstName} ${lastName}`
        });

        return res.send(user);
    } catch (error) {
        return res.status(500).send({error});
    }

});


const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}!`));