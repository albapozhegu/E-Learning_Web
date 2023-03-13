const { MAX_TOP, HIGHSCORE_NAME } = require("../constants/highScore");
const UserModel = require("../models/userModel");
const HighscoreModel = require("../models/highScoreModel");

exports.updateTop = async (accountId, name, score) => {
  try {
    let tops = await HighscoreModel.findOne({ name });
    console.log(tops);
    let unit = "";
    for (let key in HIGHSCORE_NAME) {
      if (HIGHSCORE_NAME[key].name === name) {
        unit = HIGHSCORE_NAME[key].unit;
        break;
      }
    }

    let newTops = [];
    if (!Boolean(tops)) {
      newTops.push({ accountId, score: Number(score) });
      HighscoreModel.create({
        name,
        unit,
        top: newTops,
      });
    } else {
      const index = tops.top.findIndex(
        (i) => i.accountId.toString() === accountId.toString()
      );

      if (index === -1) {
        tops.top.push({ accountId, score: Number(score) });
      } else {
        const item = tops.top[index];
        if (Number(item.score) < Number(score)) {
          tops.top[index].score = score;
        }
      }
      newTops = tops.top;

      newTops = newTops
        .sort((a, b) => Number(a.score) - Number(b.score))
        .slice(0, MAX_TOP);

      await HighscoreModel.updateOne({ name }, { top: newTops });
    }
  } catch (error) {
    throw error;
  }
};

exports.getLeaderboardWithName = async (name = "") => {
  try {
    let highscores = await HighscoreModel.find({ name: name }).sort({
      coin: -1,
    });
    if (highscores.length == 0) {
      return [];
    }

    let topList = [];
    for (let i = 0; i < highscores.length; i++) {
      const user = await UserModel.findById(highscores[i].accountId);

      topList.push({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        coin: highscores[i].coin,
      });
    }

    return topList;
  } catch (error) {
    throw error;
  }
};

exports.createScore = async (scoreInfo) => {
  try {
    const newScore = await HighscoreModel.create({ ...scoreInfo });

    if (newScore) {
      return newScore;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

exports.updateScore = async (coin, id) => {
  try {
    let newScore = await HighscoreModel.findByIdAndUpdate(id, { coin: coin });

    if (newScore) {
      return newScore;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

exports.getScore = async (name, accountId) => {
  try {
    let newScore = await HighscoreModel.findOne({
      name: name,
      accountId: accountId,
    });
   // console.log(newScore);
    if (newScore) {
      return newScore;
    }
    return null;
  } catch (error) {
    throw error;
  }
};
