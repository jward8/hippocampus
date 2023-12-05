const admin = require("firebase-admin");

/**
 * This is to be used to authorized if a user exists in the db to allow for a
 * create request to happen. If there is no user, then the process should be stopped. 
 * 
 * @param {String} uid The user's id of the attempted process
 * @returns true if user exists, throws error if user does not exist already
 */
exports.isValidUser = async function(uid) {
    try {
        const usersCollection = admin.firestore().collection('users');
        const query = usersCollection.where('uid', '==', uid);
        const querySnapshot = await query.get();

        if (!querySnapshot.empty) {
            console.log(`User with UID of ${uid} does exist, process can proceed`);
            return true;
        } else {
            throw new Error(`User with UID ${uid} not found.`);
        }
    } catch (err) {
        throw err;
    }
 }