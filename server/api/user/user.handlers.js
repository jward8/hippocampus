const { createUserWithFirebase, signInWithFirebase } = require('./user');
exports.getUsers = async function(req, res) {
    const { email, password } = req.body;
    try {
        await signInWithFirebase(email, password)
            .then((result) => {
                res.json("User Signed In!")
            })
    } catch(e) {
        console.error(e.message)
        res.status(500).send({ 
            error: 'Problem signing user in',
            firebaseError: e.message
         });
    }
}

exports.addUser = async function(req, res) {
    const { email, password, username, name } = req.body;
    try {
        await createUserWithFirebase(email, password)
        .then((result) => {
            res.json("User Created!")
        })
    } catch(e) {
        console.error(e.message)
        res.status(500).send({ 
            error: 'Problem creating user',
            firebaseError: e.message
        });
    }
}

