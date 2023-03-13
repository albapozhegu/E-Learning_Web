const QuizModel = require("../models/Quizzes/quizModel");

exports.createQuiz = async (quiz) => {
  try {
    const newQuiz = await QuizModel.create({ ...quiz });

    if (newQuiz) {
      return newQuiz;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

exports.getQuizByListenId = async (listenId = "") => {
  try {
    const res = await QuizModel.findOne({ ListeningId: listenId });
    return res;
  } catch (error) {
    throw error;
  }
};

exports.getQuizById = async (_id = "") => {
  try {
    const res = await QuizModel.findById(_id);
    return res;
  } catch (error) {
    throw error;
  }
};

//delete by quizid
exports.deleteQuizById = async (_id = "") => {
  try {
    const res = await QuizModel.findByIdAndDelete(_id);
    if (res) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

//delete by listenid
exports.deleteQuizByListenId = async (listenId = "") => {
  try {
    const res = await QuizModel.deleteOne({ ListeningId: listenId });
    if (res) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

//get all
exports.getAllQuizzes = async () => {
  try {
    const list = await QuizModel.find({});
    return list;
  } catch (error) {
    throw error;
  }
};
