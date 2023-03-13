const {
  createQuiz,
  getQuizByListenId,
  getQuizById,
  deleteQuizById,
  deleteQuizByListenId,
} = require("../services/quizService");
const { getListenById, getAllListen, } = require("../services/listeningService");
const { getAllGrammars } = require("../services/grammarService");

//create quiz
exports.postQuiz = async (req, res) => {
  try {
    const ListeningId = req.params.id;
    //check if quiz existed
    const listen = await getListenById(ListeningId);
    if (!listen) {
      return res.status(400).json({ message: "Error, Not found quiz." });
    }

    // create quiz
    const quiz = await createQuiz({ ListeningId });

    if (quiz != null) {
      return res.status(200).json({ quiz });
    }
    return res.status(503).json({ message: "Error, can not create quiz." });
  } catch (error) {
    return res.status(503).json({ message: "Error, can not create quiz." });
  }
};

//get quiz by quizId
exports.getById = async (req, res) => {
  try {
    const quiz = await getQuizById(req.params.id);
    if (quiz) {
      return res.status(200).json(quiz);
    }
  } catch (error) {
    console.error("GETDETAILS ERROR: ", error);
    return res.status(503).json({ message: error });
  }
};

//get quiz by listeningId
exports.getByListeningId = async (req, res) => {
  try {
    const listenId = req.params.id;
    const quiz = await getQuizByListenId(listenId);
    return res.status(200).json(quiz);
  } catch (error) {
    return res.status(503).json({ message: "Lỗi dịch vụ, thử lại sau" });
  }
};

//delete by quizid
exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params.id;
    const isDelete = await deleteQuizById(id);
    if (isDelete) {
      return res.status(200).json({ message: "Delete successfully." });
    }
  } catch (error) {
    console.error("GET WORD DETAILS ERROR: ", error);
    return res
      .status(503)
      .json({ message: "Eror, can not delete this listening" });
  }
};

//delete by listenid
exports.deleteByListenId = async (req, res) => {
  try {
    const { listenId } = req.params.id;
    const isDelete = await deleteQuizByListenId(listenId);
    if (isDelete) {
      return res.status(200).json({ message: "Delete successfully." });
    }
  } catch (error) {
    console.error("GET WORD DETAILS ERROR: ", error);
    return res
      .status(503)
      .json({ message: "Eror, can not delete this listening" });
  }
};

//get all
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await getAllQuizzess();
    return res.status(200).json({ quizzes });
  } catch (error) {
    console.error("ERROR: ", error);
    return res.status(503).json({ message: "Lỗi dịch vụ, thử lại sau" });
  }
};

//get all
exports.getAllListenAndGrammar = async (req, res) => {
  try { 
   // const {type} = req.query; 
    const listens = await getAllListen('Newest');
    const grammars = await getAllGrammars();
    return res.status(200).json({listens, grammars });
  } catch (error) {
    console.error('ERROR: ', error);
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};
