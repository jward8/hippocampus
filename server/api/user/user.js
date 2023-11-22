const auth = require('firebase/auth');
const { db } = require('../../index');

exports.createUserWithFirebase = async function(email, password, username, name) {
    const authorization = auth.getAuth();
    console.log("what?");
    auth.createUserWithEmailAndPassword(authorization, email, password)
        .then((response) => {
            //We created the user
            let user = response.user;
            insertUserRecord(user.uid, name, username, email);
        })
        .catch((err) => {
            throw err;
        });
}

exports.signInWithFirebase = async function(email, password) {
    const authorization = auth.getAuth();
    auth.signInWithEmailAndPassword(authorization, email, password)
        .then((response) => {
            // User signed in
        })
        .catch((err) => {
            throw err;
        })
}

async function insertUserRecord(id, name, username, email) {

    const userJson = {
        name: name,
        username: username,
        email: email,
        joined: Date.now()
    }

    const response = db.collection('users').doc(id).set(userJson);

    console.log(response);
}