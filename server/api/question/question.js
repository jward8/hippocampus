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
const { isValidUser } = require("../../utils/verify");

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

    if (await isValidUser(creatorId)) {
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
    }
  } catch (err) {
    console.error("Error creating question:", err.message);
    throw err; // Re-throw the error to handle it elsewhere if needed
  }
};

exports.deleteQuestion = async function (questionId) {
  try {
    const questionsCollection = admin.firestore().collection("questions");
    const questionDoc = questionsCollection.doc(questionId);
    await questionDoc.delete();
    console.log("Question document deleted in Firestore:", questionId);
  } catch (err) {
    console.error("Error deleting question:", err.message);
    throw err; // Re-throw the error to handle it elsewhere if needed
  }
};

exports.getQuestions = async function (size) {
  try {
    const questionsCollection = admin.firestore().collection("questions");
    const snapshot = await questionsCollection.limit(parseInt(size, 10)).get();
    console.log("Questions retrieved from Firestore");
    console.log("Number of questions retrieved:", snapshot.size);
    const questions = snapshot.docs.map((doc) => doc.data());
    return questions;
  } catch (err) {
    console.error("Error getting questions:", err.message);
    throw err; // Re-throw the error to handle it elsewhere if needed
  }
}