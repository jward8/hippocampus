const credentials = require("../credentials.json");
const admin = require("firebase-admin");

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const auth = admin.auth();

const db = admin.firestore();

module.exports = { db, auth };
