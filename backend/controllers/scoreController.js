const {
  createScoreListen,
  createScoreRead,
} = require("../services/scoreService");

//create listen score
exports.postScoreListen = async (req, res) => {
  try {
    for (let score of req.body) {
      let { Sentences, Score} = score;
      await createScoreListen({Sentences, Score});     
    }     
    return res.status(200).json({message: "Successfully."});
    //return res.status(503).json({ message: "Error, can not create question." });
  } catch (error) {
    console.log(error)
    return res.status(503).json(error.message);
  }
};

//create listen score
exports.postScoreRead = async (req, res) => {
  try {
    for (let score of req.body) {
      let { Sentences, Score} = score;
      await createScoreRead({Sentences, Score});     
    }     
    return res.status(200).json({message: "Successfully."});
    //return res.status(503).json({ message: "Error, can not create question." });
  } catch (error) {
    console.log(error)
    return res.status(503).json(error.message);
  }
};
