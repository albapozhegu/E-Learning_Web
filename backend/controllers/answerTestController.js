const { 
  getQuestionTestById
} = require("../services/questionTestService");

const {
  getAnswerByQuestionTestId,
  getAnswerTestById,
  createAnswerTest
} = require("../services/answerTestService");

//create answerTest
exports.postAnswer = async (req, res) => {
try {
  const QuestionId = req.params.id;
  //check if question existed
  const question = await getQuestionTestById(QuestionId);
  if (!question) {
    return res.status(400).json({ message: "Error, Not found listen." });
  }

  // create 
  const { Content, Sentence, IsCorrect, IsListening, SubmitTests} = req.body;
  const answerTest = await createAnswerTest({QuestionTestId: QuestionId, Content, Sentence, IsCorrect, IsListening, SubmitTests});

  if (answerTest != null) {
    return res.status(200).json({ data: answerTest });
  }
  return res.status(503).json({ message: "Error, can not create question." });
} catch (error) {
  return res.status(503).json({ message: "Error, can not create question." });
}
};

//post many answers of question
exports.postManyAnswers = async (req, res) => {
try {
  const QuestionId = req.params.id;
  //check if question existed
  const question = await getQuestionTestById(QuestionId);
  if (!question) {
    return res.status(400).json({ message: "Error, Not found listen." });
  }

  // create 
  for (let answer of req.body) {
    let { Content, Sentence, IsCorrect, IsListening} = answer;
    await createAnswerTest({QuestionTestId: QuestionId, Content, Sentence, IsCorrect, IsListening});     
  }       
  return res.status(200).json({message: "Successfully." });
} catch (error) {
  return res.status(503).json(error.message);
}
};

//get by Id
exports.getById = async (req, res, next) => {
try {
  const id = req.params.id;
  const question = await getAnswerTestById(id);
  return res.status(200).json({ question });
} catch (error) {
  console.log(id);
  console.error("ERROR: ", error);
  return res.status(503).json({ message: "Service error, try again later" });
}
};

//get by QuestionId
exports.getByQuestionTestId = async (req, res) => {
try {
  const questionId = req.params.id;
  //get answer of
  const answers = await getAnswerByQuestionTestId(questionId);
  // console.log(question)
  return res.status(200).json({ answers });
} catch (error) {
  console.error("ERROR: ", error);
  return res.status(503).json({ message: "Service error, try again later" });
}
};
