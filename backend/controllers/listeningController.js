const {
  getAllListen,
  createListen,
  updateListen,
  deleteListen,
  getDetailListen,
  getListenByTopic,
  getListenTopics,
  searchListen,
  getListenByLevel
} = require('../services/listeningService');
const {
  getQuestionByQuizId,
} = require('../services/questionService');
const {
  getQuizByListenId,
} = require('../services/quizService');
const {
  uploadVideo,
  uploadImage,
} = require('../services/commonService');


//create Listening
exports.postListening = async (req, res) => {
  try {
    const {Name, Topic, Description, Script, Video, Image, Items } = req.body;
    if(!Video){
      return res.status(400).json({ message: 'Error, please upload video.' });
    }
    //upload Video
    let videoUrl = null;
      if(Video.includes("youtube") || Video.includes("youtu.be")) {
        let vid = Video.trim();
        if(vid){
          let videoId = null;
          if(Video.includes("=")){
            videoId = vid.split("=");
          }
          else
          {
            videoId = vid.split("youtu.be/");
          }

          videoUrl= `https://www.youtube.com/embed/${videoId[1]}?enablejsapi=1`;
        }
      }
      else
      {
          videoUrl = await uploadVideo(Video, 'video');
      }

      //upload Image
      let imgUrl = null;
      if (Image) {      
          imgUrl = await uploadImage(Image, 'english/listening');
      }

    // create the new listen
    const listen = await createListen({Name, Topic, Description, Script, Video: videoUrl, Image: imgUrl, Items});

    if (listen !=null) {
      return res.status(200).json(listen);
    }
    return res.status(503).json({ message: 'Error, can not create listening.' });
  } catch (error) {
    console.error('ERROR: ', error);
    return res.status(503).json({ message: 'Error, can not create litening.' });
  }
};

//update 
exports.putListen = async (req, res, next) => {
  try {
      const {Name, Topic, Description, Script, Video, Image }= req.body;

      if(!Video){
        return res.status(400).json({ message: 'Error, please upload video.' });
      } 
    //upload Video
    let videoUrl = null;
      if(Video.includes("youtube") || Video.includes("youtu.be")) {
        if(Video.includes("embed")){
          videoUrl= Video;
        }
        else{
          let vid = Video.trim();
          if(vid){
            let videoId = null;
            if(Video.includes("=")){
              videoId = vid.split("=");
            }
            else
            {
              videoId = vid.split("youtu.be/");
            }

            videoUrl= `https://www.youtube.com/embed/${videoId[1]}?enablejsapi=1`;
          }
        }
      }
      else{
        if(Video.includes("cloudinary")){
          videoUrl= Video;
        }
        else{      
            videoUrl = await uploadVideo(Video, 'video');
        }
      }

      //upload Image
      let imgUrl = null;
      if (Image) {
        if(Image.includes("cloudinary")){
          imgUrl =Image
        }
        else{      
          imgUrl = await uploadImage(Image, 'english/listening');
        }             
      }

    // update
    const listen = await updateListen(req.params.id, 
      {Name, Topic, Description, Script, Video: videoUrl, Image: imgUrl });

      if (listen !=null) {
          return res.status(200).json({listen });
        }
    return res.status(400).json({ message: 'Error, can not update listening.' });
  } catch (error) {
    console.error('ERROR: ', error);
    return res.status(503).json({ message: 'Error, can not update listening.' });
  }
};

//get the details
exports.getDetails = async (req, res, next) => {
  try {    
    const listen = await getDetailListen(req.params.id);
    if (listen ) {
      return res.status(200).json({listen});
    }
  } catch (error) {
    console.error('ERROR: ', error);
    return res.status(503).json({ message: error });
  }
};

//get listen and quiz
exports.getListening = async (req, res, next) => {
  try {    
    const listen = await getDetailListen(req.params.id);
    const quiz = await getQuizByListenId(req.params.id);
    if(quiz){
    const questions = await getQuestionByQuizId(quiz._id);
    
    if (listen && questions) {
      return res.status(200).json({listen, questions});
    }
  }
  return res.status(200).json({listen, questions:null});

  } catch (error) {
    console.error('ERROR: ', error);
    return res.status(503).json({ message: error });
  }
};

//get by topic
exports.getByTopic = async (req, res) => {
  try {
    const {topic, type} = req.query;  
    const listens = await getListenByTopic(topic, type);
    if(listens == null ){
      return res.status(204).json({ message: 'No result.'});
      }
    return res.status(200).json({listens });
  } catch (error) {
    console.error('ERROR: ', error);
    return res.status(503).json({ message: 'ERROR, can not get listening' });
  }
};

//get all
exports.getAll = async (req, res) => {
  try { 
    const {type} = req.query; 
    const listens = await getAllListen(type);
    return res.status(200).json({listens });
  } catch (error) {
    console.error('ERROR: ', error);
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

//get topics
exports.getTopics = async (req, res) => {
  try {
    const topics = await getListenTopics();
    return res.status(200).json({topics });
  } catch (error) {
    console.error('ERROR: ', error);
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

//delete
exports.deleteListen = async (req, res) => {
  try {
    const listenId = req.params.id;
    const isDelete = await deleteListen(listenId);
    if (isDelete) {
      return res.status(200).json({ message: 'Delete successfully.' });
    }
  } catch (error) {
    console.error('GET WORD DETAILS ERROR: ', error);
    return res.status(503).json({ message: 'Error, can not delete this listening' });
  }
};

 //search
 exports.getSearchListen = async (req, res) => {
  try {
    const {name} =req.query;
    const listens = await searchListen(name );
    if(listens == null ){
    return res.status(204).json({ message: 'No result.'});
    }
    return res.status(200).json({ listens });
  } catch (error) {
    console.error('ERROR: ', error);
    return res.status(503).json({ message: 'ERROR.' });
  }
};

