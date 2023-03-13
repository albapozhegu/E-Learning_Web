const {
  isExistWord,
  uploadImage,
  getWordPack,
  getWordTopicSlide,
  getWordTopicGallery,
} = require('../services/commonService');

const {
  getAllWords,
  getWordByWord,
  createNewWord,
  updateWord,
  deleteWord,
  searchWord,
  getWordDetail,
  getFavoriteList,
  getWordByTopic,
  getWordTopics,
 
} = require('../services/wordService');

//create word
exports.postContributeWord = async (req, res, next) => {
  try {
    const { picture, word, type, ...rest } = req.body;

      const isExist = await isExistWord(word, type);
      if(isExist)
      {
        return res.status(400).json({ message: `Từ ${word} (${type}) đã tồn tại trong từ điển !` });
      }
     // upload description picture if available
     let pictureUrl = null;
     if (picture) {
       pictureUrl = await uploadImage(picture, 'english/word');
     }

    // create the new word
    const wordData = await createNewWord({
      word,
      type,
      picture: pictureUrl,
      ...rest,
    });

    if (wordData !=null) {
      return res.status(200).json({wordData });
    }
    return res.status(503).json({ message: 'Error, can not create word.' });
  } catch (error) {
    console.error('POST CONTRIBUTE WORD ERROR: ', error);
    return res.status(503).json({ message: 'Error, can not create word.' });
  }
};

//update word
exports.putContributeWord = async (req, res, next) => {
  try {
    const { picture, topics, synonyms, antonyms, ...rest } = req.body;
    // upload description picture if available
    let pictureUrl = null;
    if (picture) {
      if (picture.includes('cloudinary')) {
        pictureUrl = picture;
      }
      else {
        pictureUrl = await uploadImage(picture, "english/word");
      }
    }
    // update the new word
    const wordData = await updateWord(req.params.id, {
      picture: pictureUrl,
      topics,
      synonyms,
      antonyms,
      ...rest,
    });

    if (wordData != null) {
      return res.status(200).json({ wordData });
    }
    return res.status(503).json({ message: "Error, can not update word." });
  } catch (error) {
    // console.error("PUT CONTRIBUTE WORD ERROR: ", error);
    return res.status(503).json({ message: "Error, can not update word." });
  }
};

//check word exist
exports.getCheckWordExistence = async (req, res) => {
  try {
    const { word, type } = req.query;
    const isExist = await isExistWord(word, type);
    return res.status(200).json({ isExist });
  } catch (error) {
    console.error('ERROR: ', error);
    return res.status(204).json({ isExist: false });
  }
};

//get the packet of word
exports.getWordPack = async (req, res) => {
  try {
    const { page, perPage, packInfo, sortType } = req.query;

    const pageInt = parseInt(page),
      perPageInt = parseInt(perPage);
    const skip = (pageInt - 1) * perPageInt;

    const packList = await getWordPack(
      JSON.parse(packInfo),
      skip,
      perPageInt,
      "-_id _id type word mean phonetic picture",
      sortType === "asc" ? "1" : sortType === "desc" ? "-1" : null,
      null
    );

    return res.status(200).json({ packList });
  } catch (error) {
    // console.error("WORD GET WORD PACK ERROR: ", error);
    return res.status(503).json({ message: "Lỗi dịch vụ, thử lại sau" });
  }
};

//search word
exports.getSearchWord = async (req, res) => {
  try {
    const { word, isCompact = false } = req.query;
    const list = await searchWord(
      word,
      20,
      isCompact == "true" ? "-_id word" : "-_id _id type word mean phonetic picture"
    );
    return res.status(200).json({ packList: list });
  } catch (error) {
    console.error("GET SEARCH WORD ERROR: ", error);
    return res.status(503).json({ message: "Lỗi dịch vụ, thử lại sau" });
  }
};

//get the details of word
exports.getWordDetails = async (req, res, next) => {
  try {
    const { id } = req.query;
    const wordDetail = await getWordDetail(id);
    if (wordDetail) {
      return res.status(200).json(wordDetail);
    }
  } catch (error) {
    return res.status(503).json({ message: "Lỗi dịch vụ, thử lại sau" });
  }
};

//get the word by word
exports.getWordByWord = async (req, res, next) => {
  try {
    const { word } = req.query;
    const wordDetail = await getWordByWord(word);
    if (wordDetail) {
      return res.status(200).json(wordDetail);
    }
  } catch (error) {
    return res.status(503).json({ message: "Lỗi dịch vụ, thử lại sau" });
  }
};

//get the Favorite words of user
exports.getUserFavoriteList = async (req, res, next) => {
  try {
    const { user } = req;
    if (!user || !user.FavoriteList) {
      return res.status(400).json({ message: 'failed' });
    }

    const { FavoriteList } = user;
    if (!Array.isArray(FavoriteList) || FavoriteList.length === 0) {
      return res.status(200).json({ list: [] });
    }

    let { page, perPage, sortType } = req.query;
    page = parseInt(page);
    perPage = parseInt(perPage);

    let favoriteSorted = [...FavoriteList];
    if (sortType === 'asc') {
      favoriteSorted.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
    } else if (sortType === 'desc') {
      favoriteSorted.sort((a, b) => (a > b ? -1 : a < b ? 1 : 0));
    }
    favoriteSorted = favoriteSorted.slice((page - 1) * perPage, page * perPage);

    const packList = await getFavoriteList(favoriteSorted);

    return res.status(200).json({ packList });
  } catch (error) {
    console.error(' ERROR: ', error);
    return res.status(500).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

 //get all of words
 exports.getAllWords = async (req, res) => {
  try {
    const words = await getAllWords();
    return res.status(200).json({words });
  } catch (error) {
    console.error('ERROR: ', error);
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

//delete word
exports.deleteWord = async (req, res, next) => {
  try {
    const { word, type } = req.query;
    //delete word
    const isDeleteWord = await deleteWord(word, type);
    if (isDeleteWord) {
      return res.status(200).json({ message: 'Delete successfully.' });
    }
  } catch (error) {
    console.error('ERROR: ', error);
    return res.status(503).json({ message: 'Error, can not delete this word' });
  }
};

//get by topic
exports.getByTopic = async (req, res) => {
  try {
    const Topic = req.params.topic;  
    const words = await getWordByTopic(Topic);
    if(words == null ){
      return res.status(204).json({ message: 'No result.'});
      }
    return res.status(200).json({words });
  } catch (error) {
    console.error('ERROR: ', error);
    return res.status(503).json({ message: 'ERROR, can not get listening' });
  }
};

//get topics
exports.getTopics = async (req, res) => {
  try {
    const topics = await getWordTopics();
    return res.status(200).json({topics });
  } catch (error) {
    console.error('ERROR: ', error);
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

//get word by topic and page
exports.getWordTopicSlide = async (req, res) => {
  try {
    const { packInfo } = req.query;
    const packList = await getWordTopicSlide(
      JSON.parse(packInfo)
    );

    return res.status(200).json(packList);
  } catch (error) {
    console.error('ERROR: ', error);
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

//get word by topic and page
exports.getWordTopicGallery = async (req, res) => {
  try {
    const { page, perPage, packInfo } = req.query;

    const pageInt = parseInt(page),
      perPageInt = parseInt(perPage);
    const skip = (pageInt - 1) * perPageInt;

    const packList = await getWordTopicGallery(
      JSON.parse(packInfo),
      skip,
      perPageInt,
    );

    return res.status(200).json(packList);
  } catch (error) {
    console.error('ERROR: ', error);
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};



