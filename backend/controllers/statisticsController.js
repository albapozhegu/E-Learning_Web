const Users = require("../models/userModel");
const Words = require("../models/wordModel");
const Listens = require("../models/listeningModel");
const Quizzes = require("../models/Quizzes/quizModel");
const Grammars = require("../models/Grammar/grammarModel");
exports.countUser = async (req, res) => {
  const count = await Users.countDocuments();
  return res.status(200).json({ count });
}

exports.countWord = async (req, res) => {
  const count = await Words.countDocuments();
  return res.status(200).json({ count });
}

exports.countListening = async (req, res) => {
  const count = await Listens.countDocuments();
  return res.status(200).json({ count });
}

exports.countQuiz = async (req, res) => {
  const count = await Quizzes.countDocuments();
  return res.status(200).json({ count });
}

exports.countGrammar = async (req, res) => {
  const count = await Grammars.countDocuments();
  return res.status(200).json({ count });
}
