const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_JWT_KEY;

exports.createUserWithFirebase = async function (
  email,
  password,
  username,
  firstName,
  lastName,
) {
  try {
    const authorization = admin.auth();
    const userRecord = await authorization.createUser({
      email: email,
      password: password,
    });
    console.log("Successfully created user:", userRecord.toJSON());
    await createUserRecord(userRecord, username, firstName, lastName);
    return userRecord;
  } catch (err) {
    console.log("Error creating user:", err.message);
    throw err;
  }
};

async function createUserRecord(userRecord, username, firstName, lastName) {
  // Create user document in Firestore
  try {
    const usersCollection = admin.firestore().collection("users");
    const userJWT = generateToken(userRecord.uid);

    const userDoc = {
      uid: userRecord.uid,
      email: userRecord.email,
      username: username,
      firstName: firstName,
      lastName: lastName,
      joined: Date.now(),
      jwt: userJWT
      // Add other user-related fields as needed
    };
    await usersCollection.add(userDoc);

    console.log("User document created in Firestore:", userRecord.uid);

    return userRecord;
  } catch (err) {
    console.error("Error creating user:", err.message);
    throw err; // Re-throw the error to handle it elsewhere if needed
  }
}

function generateToken(userRecordId) {
  const payload = { userRecordId };
  const options = { };
  console.log(process.env);
  return jwt.sign(payload, SECRET_KEY, options);
}
