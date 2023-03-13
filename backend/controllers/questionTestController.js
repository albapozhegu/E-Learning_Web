const { getFileTestById } = require("../services/fileTestService");
const { uploadImage } = require("../services/commonService");

const {
    getQuestionByFileTestId,
    getQuestionTestById,
    createQuestionTest,
} = require("../services/questionTestService");

//create question
exports.postQuestion = async (req, res) => {
  try {
    const FileTestId = req.params.id;
    //check if file existed
    const file = await getFileTestById(FileTestId);
    if (!file) {
      return res.status(400).json({ message: "Error, Not found listen." });
    }

    //upload image, if it exists
    let imgUrl = null;
    if (Image) {      
        imgUrl = await uploadImage(Image, 'english/test');
    }

    // create question
    const { Content, Sentence} = req.body;
    const question = await createQuestionTest({ FileTestId, Content, Sentence, Image: imgUrl});

    if (question != null) {
      return res.status(200).json({ data: question });
    }
   
  } catch (error) {
    return res.status(503).json(error.message);
  }
};

//create many question
exports.postManyQuestion = async (req, res) => {
  try {
    const FileTestId = req.params.id;
    //check if file existed
    const file = await getFileTestById(FileTestId);
    if (!file) {
      return res.status(400).json({ message: "Error, Not found listen." });
    }

    //upload image, if it exists
    // let imgUrl = null;
    // if (Image) {      
    //     imgUrl = await uploadImage(Image, 'english/test');
    // }

    // create question
    for (let question of req.body) {
    const { Content, Sentence, Image} = question;
    await createQuestionTest({ FileTestId, Content, Sentence, Image});
    }
    return res.status(200).json({message: "Successfully."});
  } catch (error) {
    return res.status(503).json(error.message);
  }
};


// exports.putQuestion = async (req, res) => {
//   try {
//     //check if question
//     const questionId = req.params.id;
//     const QuestionExist = await getQuestionById(questionId);
//     if (!QuestionExist) {
//       return res
//         .status(400)
//         .json({ message: "Error, Not found this question." });
//     }
  
//     const { Content, Sentence } = req.body;
   
//     const FileTestId = QuestionExist.FileTestId;
//     const question = await updateQuestionTest(questionId,{ Content, Sentence, FileTestId });
//     if (question != null) {
//       return res.status(200).json({ question });
//     }
//     return res.status(503).json({ message: "Error, can not update question." });
//   } catch (error) {
//     console.error("POST ERROR: ", error);
//     return res.status(503).json({ message: "Error, can not update question." });
//   }
// };

//get by Id
exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const question = await getQuestionTestById(id);
    return res.status(200).json({ question });
  } catch (error) {
    console.log(id);
    console.error("ERROR: ", error);
    return res.status(503).json({ message: "Lỗi dịch vụ, thử lại sau" });
  }
};

//get by FileTestId
exports.getByFileTestId = async (req, res) => {
  try {
    const fileId = req.params.id;

    // //check if file existed
    // const file = await getFileTestById(fileId);
    // if (!file) {
    //   return res.status(400).json({ message: "Error, Not found quiz." });
    // }

    //get question of
    const questions = await getQuestionByFileTestId(fileId);
    // console.log(question)
    return res.status(200).json({ questions });
  } catch (error) {
    console.error("ERROR: ", error);
    return res.status(503).json({ message: "Lỗi dịch vụ, thử lại sau" });
  }
};
