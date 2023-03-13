const {
  createSubmitTest, 
  updateSubmitTest,
  getSubmitTestById,
  getSubmitTestByTestId,
  updateAnswerSubmitTest,
  checkSubmitExisted,
  deleteSubmitById
} = require("../services/submitTestService");

//create submitTest
exports.postSubmitTest = async (req, res) => {
try {
  const TestId = req.params.id;
  const UserId = req.user?.id;

  const StartTime = Date.now();
  //console.log(TestId, StartTime,UserId )
  // create 
  const submitTest = await createSubmitTest({UserId, TestId, StartTime});
    return res.status(200).json(submitTest);
} catch (error) {
  return res.status(503).json(error.message);
}
};

//update Answers in submitTest
exports.putAnswerSubmitTest = async (req, res) => {
try {
  const SubmitTestId = req.params.id;
  const {Part, AnswerTests} = req.body

  // update 
  const submitTest = await updateAnswerSubmitTest(SubmitTestId, Part, AnswerTests);

  if (submitTest != null) {
    return res.status(200).json({ data: submitTest });
  }

} catch (error) {
  return res.status(503).json(error.message);
}
};

// //Add Answers in submitTest
// exports.putAddAnswerSubmitTest = async (req, res) => {
//   try {
//     const SubmitTestId = req.params.id;
//     const {Part, Answers, QuestionTestId} = req.body

//     //get submit test
//     const getSubmit = await getSubmitTestById(SubmitTestId);
//     //get answers of part
//     let answers = [];
//     if(Part === 3){
//       const AnswerTests3 = getSubmit.body;
//       answers = AnswerTests3.filter(item => item.QuestionTestId !== QuestionTestId);;
//     }
//     if(Part === 4){
//       const AnswerTests4 = getSubmit.body;
//       answers = AnswerTests4.filter(item => item.QuestionTestId !== QuestionTestId);;
//     }
//     if(Part === 6){
//       const AnswerTests6 = getSubmit.body;
//       answers = AnswerTests6.filter(item => item.QuestionTestId !== QuestionTestId);;
//     }
//     if(Part === 7){
//       const AnswerTests7 = getSubmit.body;
//       answers = AnswerTests7.filter(item => item.QuestionTestId !== QuestionTestId);
//     }

//     //update answers of part

//     // update 
//     const submitTest = await updateAnswerSubmitTest(SubmitTestId, Part, AnswerTests);

//     if (submitTest != null) {
//       return res.status(200).json({ data: submitTest });
//     }

//   } catch (error) {
//     return res.status(503).json(error.message);
//   }
// };


//update submitTest
exports.putSubmitTest = async (req, res) => {
  try {
    const SubmitTestId = req.params.id;
    const FinishTime = Date.now();
    const IsFinish = true;
    const {Part, AnswerTests} = req.body
   
    // update answers of part
    await updateAnswerSubmitTest(SubmitTestId, Part, AnswerTests);
   
    //update score of submit
    const submitTest = await updateSubmitTest(SubmitTestId, {FinishTime, IsFinish });

    if (submitTest != null) {
      return res.status(200).json(submitTest);
    }
    return res.status(503).json({ message: "Error, can not create question." });
  } catch (error) {
    return res.status(503).json({ message: "Error, can not create question." });
  }
};

//get by Id
exports.getById = async (req, res, next) => {
try {
  const id = req.params.id;
  const data = await getSubmitTestById(id);
  return res.status(200).json(data );
} catch (error) {
  return res.status(503).json(error.message);
}
};

//get by TestId
exports.getByTestId = async (req, res, next) => {
try {
  const testId = req.params.id;
  const userId = req.user?.id;

  const data = await getSubmitTestByTestId(testId, userId);
  return res.status(200).json(data);
} catch (error) {
  return res.status(503).json(error.message);
}
};

//check submit existed
exports.checkSubmitExist = async (req, res, next) => {
try {
  const testId = req.params.id;
  const userId = req.user?.id;

  const data = await checkSubmitExisted(testId, userId);

  return res.status(200).json(data);
} catch (error) {
  return res.status(503).json(error.message);
}
};


//delete
exports.deleteById = async (req, res) => {
try {
  const  id  = req.params.id;
  const isDelete = await deleteSubmitById(id);
  if (isDelete) {
    return res.status(200).json({ message: 'Delete successfully.' });
  }
  else
  {
    return res.status(503).json({ message: 'Eror, can not delete' });
  }
} catch (error) {
  console.error('ERROR: ', error);
  return res.status(503).json({ message: 'Eror, can not delete this grammar' });
}
};
