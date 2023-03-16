const { countWordPackTopic, countWordPack } = require('../services/commonService');

exports.getTotalWordPack = async (req, res, next) => {
  try {
    const { packInfo } = req.query;
    const total = (await countWordPack(JSON.parse(packInfo))) || 0;
    return res.status(200).json({ total });
  } catch (error) {
    return res.status(503).json({ message: 'Service error, try again later' });
  }
};

exports.getTotalWordPackTopic = async (req, res, next) => {
  try {
    const { packInfo } = req.query;
    const total = (await countWordPackTopic(JSON.parse(packInfo))) || 0;
    return res.status(200).json({ total });
  } catch (error) {
    return res.status(503).json({ message: 'Service error, try again later' });
  }
};
