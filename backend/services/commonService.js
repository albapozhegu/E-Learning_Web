const { cloudinary } = require('../configs/cloudinaryConfig');
const { convertPackInfoToQueryStr, convertTopicsToQueryStr } = require('../helpers/wordpackHelper');
const WordModel = require('../models/wordModel');

exports.uploadImage = async (imgSrc, folderName = '', config = {}) => {
  try {
    const result = await cloudinary.uploader.upload(imgSrc, {
      folder: folderName,
      ...config,
    });
    const { secure_url = null } = result;
    return secure_url;
  } catch (error) {
    throw error;
  }
};


exports.uploadVideo = async (vidSrc, folderName ='', config = {}) => {
  try {
    const result = await cloudinary.uploader.upload(vidSrc, {
      folder: folderName,
      resource_type: "video",
      ...config,
    });
    const { secure_url = null } = result;
    return secure_url;
  } catch (error) {
    throw error;
  }
};

exports.uploadAudio = async (audSrc, folderName ='', config = {}) => {
  try {
    const result = await cloudinary.uploader.upload(audSrc, {
      folder: folderName,
      resource_type: "video",
      ...config,
    });
    const { secure_url = null } = result;
    return secure_url;
  } catch (error) {
    throw error;
  }
};

exports.isExistWord = async (word = '', type = '') => {
  try {
    if (word === '' || type === '') {
      return false;
    }

    return await WordModel.exists({word, type});
  } catch (error) {
    throw error;
  }
};

exports.isExistSentence = async (sentence = '') => {
  if (sentence === '') return false;
  const newRegex = new RegExp(sentence, 'i');
  return await SentenceModel.exists({ sentence: newRegex });
};

exports.getWordPack = async (
  packInfo = {},
  skip = 0,
  limit = 10,
  select = '',
  sortType = null,
  expandQuery = null,
) => {
  try {
    let query = convertPackInfoToQueryStr(packInfo);

    // add expand query
    if (expandQuery && typeof expandQuery === 'object') {
      Object.assign(query, expandQuery);
    }

    const packList = await WordModel.find(query)
      .sort({ word: sortType })
      .skip(skip)
      .limit(limit)
      .select(select);

    return packList;
  } catch (error) {
    throw error;
  }
};

exports.getWordTopicSlide = async (
  packInfo = {}
) => {
  try {
    let query = convertTopicsToQueryStr(packInfo);

    const packList = await WordModel.find(query);
      // .skip(skip)
      // .limit(limit);

    return packList;
  } catch (error) {
    throw error;
  }
};

exports.getWordTopicGallery = async (
  packInfo = {},
  skip = 0,
  limit = 1000,
) => {
  try {
    let query = convertTopicsToQueryStr(packInfo);

    const packList = await WordModel.find(query)
      .skip(skip)
      .limit(limit);

    return packList;
  } catch (error) {
    throw error;
  }
};


exports.countWordPack = async (packInfo = {}) => {
  try {
    let query = convertPackInfoToQueryStr(packInfo);
    return await WordModel.countDocuments(query);
  } catch (error) {
    throw error;
  }
};

  exports.countWordPackTopic = async (packInfo = {}) => {
    try {
      let query = convertTopicsToQueryStr(packInfo);
      return await WordModel.countDocuments(query);
    } catch (error) {
      throw error;
    }
  };
