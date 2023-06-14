const {
    createBlog,
    updateBlog,
    getAllBlogs,
    getBlogById,
    deleteBlogById,
    searchBlog,
    getBlogLevels,
    getBlogByLevel
  } = require('../services/blogService');
  const {
    getQuestionByQuizId,
  } = require('../services/questionService');
  const {
    getQuizByListenId,
  } = require('../services/quizService');
  const {
    uploadVideo,
    uploadImage,
    uploadAudio,
  } = require('../services/commonService');
  
  
  //create blog
  exports.postBlog = async (req, res) => {
    try {
      const {Title, Video, Audio, Image, Script, Content, Level, Items}= req.body;
       //video
       let videoUrl = null;
       if (Video) {
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
      }
  
        //upload Image
        let imgUrl = null;
        if (Image) {      
            imgUrl = await uploadImage(Image, 'english/blog');
        }
  
         //upload Audio
         let audUrl = null;
         if (Audio) {      
             audUrl = await uploadAudio(Audio, 'audio');
         }
  
      // create the new listen
      const blog = await createBlog({Title, Video: videoUrl, Audio: audUrl, Image: imgUrl, Script, Content, Level, Items});
  
      if (blog !=null) {
        return res.status(200).json(blog);
      }
      return res.status(503).json({ message: 'Error, can not create blog.' });
    } catch (error) {
      console.error('ERROR: ', error);
      return res.status(503).json({ message: 'Error, can not create blog.' });
    }
  };
  
  
  //update blog
  exports.putBlog = async (req, res) => {
    try {
  
        //check if blog existed
      const blogId = req.params.id;
      const BlogExist = await getBlogById(blogId);
  
      if(!BlogExist) {
        return res.status(400).json({ message: 'Error, Not found blog.' });
      }
  
      // edit blog
      const {Title, Video, Image, Audio, Script, Content,Level, Items} = req.body;
      let videoUrl = null;
      if(Video){     
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
      }
  
        //upload Image
        let imgUrl = null;
        if (Image) {      
          if(Image.includes("cloudinary")){
            imgUrl =Image
          }
          else{      
            imgUrl = await uploadImage(Image, 'english/blog');
          }      
        }
      //upload Audio
      let audUrl = null;
      if (Audio) {      
        if(Audio.includes("cloudinary")){
          audUrl= Audio;
        }
        else{      
            audUrl = await uploadAudio(Audio, 'audio');
          }
      }
      const blog = await updateBlog(blogId, {Title, Video: videoUrl, Image: imgUrl, Audio: audUrl, Script, Content,Level, Items});
      if (blog != null) {
        return res.status(200).json(blog);
      }
      return res.status(503).json({ message: 'Error, can not update blog.' });
      return res.status(503).json({ message: 'Error, can not update question.' });
    } catch (error) {
      console.error('PUT ERROR: ', error);
      return res.status(503).json({ message: 'Error, can not update blog.' });
    }
  };
  
  
  //get blog by id
  exports.getById = async (req, res) => {
    try {
      const blog = await getBlogById(req.params.id);
      if (blog) {
        return res.status(200).json(blog);
      }
    } catch (error) {
      console.error('GET DETAILS ERROR: ', error);
      return res.status(503).json({ message: error });
    }
  };
  
  //get levels
  exports.getLevels = async (req, res) => {
    try {
      const levels = await getBlogLevels();
      if(levels == null ){
        return res.status(204).json({ message: 'No result.'});
        }
      return res.status(200).json({levels });
    } catch (error) {
      console.error('ERROR: ', error);
      return res.status(503).json({ message: 'Service error, try again later' });
    }
  };
  
  //get by level
  exports.getByLevel = async (req, res) => {
    try {
      const Level = req.params.level;  
      const blogs = await getBlogByLevel(Level);
      if(blogs == null ){
        return res.status(204).json({ message: 'No result.'});
        }
      return res.status(200).json({blogs });
    } catch (error) {
      console.error('ERROR: ', error);
      return res.status(503).json({ message: 'ERROR, can not get blog' });
    }
  };
  
  
  //delete by id
  exports.deleteById = async (req, res) => {
    try {
      const  id  = req.params.id;
      const isDelete = await deleteBlogById(id);
      if (isDelete) {
        return res.status(200).json({ message: 'Delete successfully.' });
      }
      return res.status(400).json({ message: 'Error, can not delete this blog' });
    } catch (error) {
      console.error('ERROR: ', error);
      return res.status(503).json({ message: 'Error, can not delete this blog' });
    }
  };
  
  //get all 
  exports.getAllBlogs = async (req, res) => {
    try {
      const blogs = await getAllBlogs();
      return res.status(200).json({blogs });
    } catch (error) {
      console.error('ERROR: ', error);
      return res.status(503).json({ message: 'Service error, try again later' });
    }
  };
  
  //get blog and quiz
  exports.getBlog = async (req, res) => {
    try {
      const blog = await getBlogById(req.params.id);
      const quiz = await getQuizByListenId(req.params.id);
      if(quiz){
      const questions = await getQuestionByQuizId(quiz._id);
      
      if (blog && questions) {
        return res.status(200).json({blog, questions});
      }
    }
    return res.status(200).json({blog, questions:null});
  
    } catch (error) {
      console.error('ERROR: ', error);
      return res.status(503).json({ message: error });
    }
  };
  
     //search
    exports.getSearchBlog = async (req, res) => {
      try {
        const {title} =req.query;
        const blogs = await searchBlog(title);
        if(blogs == null ){
        return res.status(204).json({ message: 'No result.'});
        }
        return res.status(200).json(blogs);
      } catch (error) {
        console.error('ERROR: ', error);
        return res.status(503).json({ message: 'ERROR.' });
      }
    };