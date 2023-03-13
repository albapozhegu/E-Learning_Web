const QuestionModel = require('../models/Quizzes/questionModel');

exports.createQuestion = async (questionInfo ) => {
  try {
    const newQuestion = await QuestionModel.create({ ...questionInfo});

    if (newQuestion) {
      return newQuestion;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

exports.updateQuestion = async (_id='', questionInfo ) => {
  try{
   const updateQuestion= await QuestionModel.findByIdAndUpdate(_id, { ...questionInfo});
   if (updateQuestion) {
    return updateQuestion;
  }
  return null;
  } catch (error) {
    throw error;
  }
};

exports.getQuestionById = async (_id = '') => {
    try {
      const res = await QuestionModel.findById(_id);   
      return res;
    } catch (error) {
      throw error;
    }
  };


  exports.getQuestionByQuizId = async (quizId = '') => {
    try {
      const res = await QuestionModel.find({QuizId: quizId});  
      return res;
    } catch (error) {
      throw error;
    }
  };

 //delete by quizid
 exports.deleteQuestionById = async (_id = '') => {
    try {
      const res = await QuestionModel.findByIdAndDelete(_id );
      if (res) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  };
  
   //delete by quizid
   exports.deleteQuestionByQuizId = async (quizId = '') => {
      try {
        const res = await QuestionModel.deleteMany({QuiId: quizId});
        if (res) {
          return true;
        }
        return false;
      } catch (error) {
        throw error;
      }
    };
