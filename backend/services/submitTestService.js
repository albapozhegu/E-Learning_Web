const SubmitTestModel = require("../models/Test/submitTestModel");
const AnswerTestModel = require("../models/Test/answerTestModel");
const ScoreListenModel = require("../models/Test/scoreListenModel");
const ScoreReadModel = require("../models/Test/scoreReadModel");

exports.createSubmitTest = async (body) => {
  try {
    const newSubmit = await SubmitTestModel.create({ ...body });

    if (newSubmit) {
      return newSubmit;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

exports.updateAnswerSubmitTest = async (id, part, body) => {
  try {
    let submitTest;

    if (part === 1) {
      submitTest = await SubmitTestModel.findByIdAndUpdate(id, {
        AnswerTests1: body,
      });
    }
    if (part === 2) {
      submitTest = await SubmitTestModel.findByIdAndUpdate(id, {
        AnswerTests2: body,
      });
    }
    if (part === 3) {
      submitTest = await SubmitTestModel.findByIdAndUpdate(id, {
        AnswerTests3: body,
      });
    }
    if (part === 4) {
      submitTest = await SubmitTestModel.findByIdAndUpdate(id, {
        AnswerTests4: body,
      });
    }
    if (part === 5) {
      submitTest = await SubmitTestModel.findByIdAndUpdate(id, {
        AnswerTests5: body,
      });
    }
    if (part === 6) {
      submitTest = await SubmitTestModel.findByIdAndUpdate(id, {
        AnswerTests6: body,
      });
    }
    if (part === 7) {
      submitTest = await SubmitTestModel.findByIdAndUpdate(id, {
        AnswerTests7: body,
      });
    }

    if (submitTest) {
      return submitTest;
    }
    return null;
  } catch (error) {
    throw error;
  }
};
exports.updateSubmitTest = async (id, body) => {
  try {
    const submitTest = await SubmitTestModel.findByIdAndUpdate(id, { ...body });

    let lstAnswerListenCorrect = [];
    submitTest.AnswerTests1.map((item, index) => {
      lstAnswerListenCorrect.push(item.toJSON());
    });

    for (let item of submitTest.AnswerTests2) {
      lstAnswerListenCorrect.push(item.toJSON());
    }

    for (let item of submitTest.AnswerTests3) {
      lstAnswerListenCorrect.push(item.toJSON());
    }

    for (let item of submitTest.AnswerTests4) {
      lstAnswerListenCorrect.push(item.toJSON());
    }

    let lstAnswerReadCorrect = [];
    for (let item of submitTest.AnswerTests5) {
      lstAnswerReadCorrect.push(item.toJSON());
    }

    for (let item of submitTest.AnswerTests6) {
      lstAnswerReadCorrect.push(item.toJSON());
    }

    for (let item of submitTest.AnswerTests7) {
      lstAnswerReadCorrect.push(item.toJSON());
    }

    //get sentences are correct
    const sentencesListen = lstAnswerListenCorrect.filter(
      (item) => item.IsCorrect === true
    );
    const sentencesRead = lstAnswerReadCorrect.filter(
      (item) => item.IsCorrect === true
    );

    //calculate score of listening and reading
    const listenScore = await ScoreListenModel.findOne({
      Sentences: sentencesListen.length,
    });

    const readScore = await ScoreReadModel.findOne({
      Sentences: sentencesRead.length,
    });

    //calculate score
    const Score = listenScore.Score + readScore.Score;

    //update SubmitTest
    const submitResult = await SubmitTestModel.findByIdAndUpdate(id, {
      ListenSentences: sentencesListen.length,
      ReadSentences: sentencesRead.length,
      ListenScore: listenScore.Score,
      ReadScore: readScore.Score,
      Score: Score,
    });
    //console.log(submitResult)
    return submitResult;
  } catch (error) {
    throw error;
  }
};

exports.getSubmitTestById = async (_id) => {
  try {
    const res = await SubmitTestModel.findById(_id);

    return res;
  } catch (error) {
    throw error;
  }
};

exports.getSubmitTestByTestId = async (testId, userId) => {
  try {
    const res = await SubmitTestModel.findOne({
      TestId: testId,
      UserId: userId,
    });

    return res;
  } catch (error) {
    throw error;
  }
};

exports.checkSubmitExisted = async (testId, userId) => {
  try {
    const res = await SubmitTestModel.exists({
      TestId: testId,
      UserId: userId,
    });

    return res;
  } catch (error) {
    throw error;
  }
};

//delete by id
exports.deleteSubmitById = async (id = "") => {
  try {
    const res = await SubmitTestModel.findByIdAndDelete(id);
    if (res) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};
