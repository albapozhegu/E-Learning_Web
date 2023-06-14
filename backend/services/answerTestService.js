const AnswerTestModel = require('../models/Test/answerTestModel');

exports.createAnswerTest = async (answerInfo ) => {
  try {
    const newAnswer = await AnswerTestModel.create({ ...answerInfo});

    if (newAnswer) {
      return newAnswer;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

exports.getAnswerTestById = async (_id = '') => {
    try {
      const res = await AnswerTestModel.findById(_id);   
      return res;
    } catch (error) {
      throw error;
    }
  };


  exports.getAnswerByQuestionTestId = async (questionId = '') => {
    try {
      const res = await AnswerTestModel.find({QuestionTestId: questionId});  
      return res;
    } catch (error) {
      throw error;
    }
  };
