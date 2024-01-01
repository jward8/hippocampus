const { createUserWithFirebase, signInWithFirebase } = require("./user");

exports.addUser = async function (req, res) {
  const { email, password, username, firstName, lastName } = req.body;
  try {
    await createUserWithFirebase(
      email,
      password,
      username,
      firstName,
      lastName,
    ).then((result) => {
      res.json(result);
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).send({
      error: "Problem creating user",
      firebaseError: e.message,
    });
  }
};
