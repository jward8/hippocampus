const { createQuestion } = require("./question");
exports.addQuestion = async function (req, res) {
  const {
    category,
    description,
    isPrivate,
    creatorId,
    isMultipleChoice,
    multipleChoices,
    answer,
  } = req.body;
  try {
    await createQuestion(
      category,
      description,
      isPrivate,
      creatorId,
      isMultipleChoice,
      multipleChoices,
      answer,
    ).then((result) => {
      res.json(result);
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).send({
      error: "Problem creating question",
      firebaseError: e.message,
    });
  }
};
