const { createQuestion, deleteQuestion, getQuestions } = require("./question");
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

exports.deleteQuestion = async function (req, res) {
  const { questionId } = req.params;
  try {
    await deleteQuestion(questionId).then((result) => {
      res.json(result);
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).send({
      error: "Problem deleting question",
      firebaseError: e.message,
    });
  }
}

exports.getQuestions = async function (req, res) {
  const { size } = req.params;
  try {
    await getQuestions(size).then((result) => {
      res.json(result);
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).send({
      error: "Problem getting questions",
      firebaseError: e.message,
    });
  }
}
