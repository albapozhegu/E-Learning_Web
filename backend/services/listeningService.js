const ListeningModel = require("../models/listeningModel");

exports.createListen = async (listeningInfo) => {
  try {
    const newListen = await ListeningModel.create({ ...listeningInfo });

    if (newListen) {
      return newListen;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

exports.updateListen = async (_id = "", listeningInfo) => {
  try {
    const listen = await ListeningModel.findByIdAndUpdate(_id, listeningInfo);
    if (listen) {
      return listen;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

exports.getListenById = async (_id) => {
  try {
    const res = await ListeningModel.findById(_id);

    return res;
  } catch (error) {
    throw error;
  }
};

exports.getAllListen = async (type) => {
  try {
    let list = null;
    //Sap xep tang dan
    if (type === "Newest") {
      list = await ListeningModel.find({}).sort({ _id: -1 });
    } else {
      list = await ListeningModel.find({}).sort({ _id: 1 });
    }

    let listens = [];
    if (list) {
      list.forEach((item) => {
        let {
          _id,
          CreateDate,
          Name,
          Topic,
          Description,
          Video,
          Image,
          Script,
          isLocked
        } = item;
        const dd = CreateDate.getDate();
        const mm = CreateDate.getMonth() + 1;
        const yyyy = CreateDate.getFullYear();
        const HH = CreateDate.getHours();
        const MM = CreateDate.getMinutes();
        const SS = CreateDate.getSeconds();

        CreateDate = `${dd}/${mm}/${yyyy} ${HH}:${MM}:${SS}`;
        listens.push({
          _id,
          CreateDate,
          Name,
          Topic,
          Description,
          Video,
          Image,
          Script,
          isLocked
        });
      });
    }
    return listens;
  } catch (error) {
    throw error;
  }
};

exports.getListenByTopic = async (topic, type) => {
  try {
    let list = null;
    //Sap xep tang dan
    if (type === "Newest") {
      list = await ListeningModel.find({ Topic: topic }).sort({ _id: -1 });
    } else {
      list = await ListeningModel.find({ Topic: topic }).sort({ _id: 1 });
    }
    if (list.length == 0) {
      return null;
    }
    let listens = [];
    if (list) {
      list.forEach((item) => {
        let {
          _id,
          CreateDate,
          Name,
          Topic,
          Description,
          Video,
          Image,
          Script,
        } = item;
        const dd = CreateDate.getDate();
        const mm = CreateDate.getMonth() + 1;
        const yyyy = CreateDate.getFullYear();
        const HH = CreateDate.getHours();
        const MM = CreateDate.getMinutes();
        const SS = CreateDate.getSeconds();

        CreateDate = `${dd}/${mm}/${yyyy} ${HH}:${MM}:${SS}`;
        listens.push({
          _id,
          CreateDate,
          Name,
          Topic,
          Description,
          Video,
          Image,
          Script,
        });
      });
    }
    return listens;
  } catch (error) {
    throw error;
  }
};

exports.getListenByLevel = async (level) => {
  try {
    // var query = new RegExp( `^${topic}.*`,'gi');
    const list = await ListeningModel.find({ Level: level });
    if (list.length == 0) {
      return null;
    }
    return list;
  } catch (error) {
    throw error;
  }
};

exports.getListenTopics = async () => {
  try {
    const list = await ListeningModel.distinct("Topic");
    if (list.length == 0) {
      return null;
    }
    return list;
  } catch (error) {
    throw error;
  }
};

exports.getDetailListen = async (_id = "") => {
  try {
    const res = await ListeningModel.findById(_id);
    return res;
  } catch (error) {
    throw error;
  }
};

exports.deleteListen = async (_id = "") => {
  try {
    const res = await ListeningModel.findByIdAndUpdate(_id, { isLocked: -1 });
    if (res) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

exports.searchListen = async (name = "", limit = 50, select = "") => {
  try {
    const regex = new RegExp(`^${name}.*`, "gi");
    const list = await ListeningModel.find({ Name: regex })
      .limit(limit)
      .select(select);
    if (list.length == 0) {
      return null;
    }
    return list;
  } catch (error) {
    throw error;
  }
};

exports.getDateTime = async (date = Date) => {
  // Data about date

  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  const HH = date.getHours();
  const MM = date.getMinutes();
  const SS = date.getSeconds();

  const dateConvert = `${mm}/${dd}/${yyyy} ${HH}:${MM}:${SS}`;
  return `${mm}/${dd}/${yyyy} ${HH}:${MM}:${SS}`;
};
