const IPAModel = require("../models/ipaModel");

exports.createIPA = async (ipaInfo) => {
  try {
    const newIPA = await IPAModel.create({ ...ipaInfo });

    if (newIPA) {
      return newIPA;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

exports.getIPAById = async (id = "") => {
  try {
    const res = await IPAModel.findById(id);
    return res;
  } catch (error) {
    throw error;
  }
};

exports.getIPARelative = async (type = "", phonetic = "") => {
  try {
    // const ipa = await IPAModel.findById(id);
    const list = await IPAModel.find({ Type: type }).limit(10);
    let res = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].Phonetic != phonetic) {
        res.push(list[i]);
      }
    }
    return res;
  } catch (error) {
    throw error;
  }
};

exports.getIPAByListenId = async (listenId = "") => {
  try {
    const res = await IPAModel.find({ ListeningId: listenId }).populate(
      "listeningId"
    );
    return res;
  } catch (error) {
    throw error;
  }
};

//delete by id
exports.deleteIPAById = async (id = "") => {
  try {
    const res = await IPAModel.findByIdAndDelete(id);
    if (res) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

//delete by listenid
exports.deleteIPAByListenId = async (listenId = "") => {
  try {
    const res = await IPAModel.deleteOne({ ListeningId: listenId });
    if (res) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

//get all
exports.getAllIPAs = async () => {
  try {
    const list = await IPAModel.find({});
    return list;
  } catch (error) {
    throw error;
  }
};

//get ipas by type
exports.getIPAsByType = async (type = "") => {
  try {
    const list = await IPAModel.find({ Type: type });
    return list;
  } catch (error) {
    throw error;
  }
};
