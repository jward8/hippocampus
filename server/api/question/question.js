// General Modeling for Questions Object
/**
 * Object: Question
 *
 * uid: The UID of the question
 * category: Category of the question
 * description: Wording of the question
 * private: Boolean value whether question can be accessed to public
 * creatorId: The UID of the user who created the question
 * createdDate: The datetime of when the question was created
 * isMultipleChoice: Whether the question is multiple choice or not
 * multipleChoices: The choices for the answers for mc question
 * answer: Answer to the question
 *
 */
const admin = require("firebase-admin");

exports.createQuestion = async function (
  category,
  description,
  isPrivate,
  creatorId,
  isMultipleChoice,
  multipleChoices,
  answer,
) {
  try {
    const questionsCollection = admin.firestore().collection("questions");
    const questionDoc = {
      category: category,
      description: description,
      isPrivate: isPrivate,
      creatorId: creatorId,
      createdDate: Date.now(),
      isMultipleChoice: isMultipleChoice,
      multipleChoices: multipleChoices,
      answer: answer,
    };
    const docRef = await questionsCollection.add(questionDoc);

    console.log("Question document created in Firestore:", description);
    const snapshot = docRef.get();

    return snapshot;
  } catch (err) {
    console.error("Error creating question:", err.message);
    throw err; // Re-throw the error to handle it elsewhere if needed
  }
};
