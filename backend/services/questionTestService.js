const QuestionTestModel = require('../models/Test/questionTestModel');

exports.createQuestionTest = async (questionInfo ) => {
  try {
    const newQuestion = await QuestionTestModel.create({ ...questionInfo});

    if (newQuestion) {
      return newQuestion;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

exports.updateQuestionTest = async (_id='', questionInfo ) => {
  try{
   const updateQuestion= await QuestionTestModel.findByIdAndUpdate(_id, { ...questionInfo});
   if (updateQuestion) {
    return updateQuestion;
  }
  return null;
  } catch (error) {
    throw error;
  }
};

exports.getQuestionTestById = async (_id = '') => {
    try {
      const res = await QuestionTestModel.findById(_id);   
      return res;
    } catch (error) {
      throw error;
    }
  };


  exports.getQuestionByFileTestId = async (fileId = '') => {
    try {
      const res = await QuestionTestModel.find({FileTestId: fileId});  
      return res;
    } catch (error) {
      throw error;
    }
  };

 //delete by quizid
 exports.deleteQuestionById = async (_id = '') => {
    try {
      const res = await QuestionTestModel.findByIdAndDelete(_id );
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
