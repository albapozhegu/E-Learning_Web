const ScoreListenModel = require("../models/Test/scoreListenModel");
const ScoreReadModel = require("../models/Test/scoreReadModel");

exports.createScoreListen = async (body) => {
  try {
    const newResult = await ScoreListenModel.create({ ...body });

    if (newResult) {
      return newResult;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

exports.createScoreRead = async (body) => {
    try {
      const newResult = await ScoreReadModel.create({ ...body });
  
      if (newResult) {
        return newResult;
      }
      return null;
    } catch (error) {
      throw error;
    }
  };
