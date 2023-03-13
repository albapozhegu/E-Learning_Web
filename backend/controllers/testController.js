const {
    createTest,
    getAllTests, 
    getTestById,
  } = require("../services/testService");
  
  const {
    uploadAudio,
  } = require('../services/commonService');

  //create test
  exports.postTest = async (req, res) => {
    try {
        //const Duration = 120;
        //const CreateDate = Date.now();

        //upload Audio
      //  let audUrl1 = null;
      //  if (Audio1) {      
      //      audUrl1 = await uploadAudio(Audio1, 'english/test');
      //  }

      //  let audUrl2 = null;
      //  if (Audio2) {      
      //      audUrl2 = await uploadAudio(Audio2, 'english/test');
      //  }

      //  let audUrl3 = null;
      //  if (Audio3) {      
      //      audUrl3 = await uploadAudio(Audio3, 'english/test');
      //  }

      //  let audUrl4 = null;
      //  if (Audio4) {      
      //      audUrl4 = await uploadAudio(Audio4, 'english/test');
      //  }

        const { Type, Name, Description } = req.body;
        const test = await createTest({ 
          Type, Name, Description
          // Audio1: audUrl1, Audio2: audUrl2, Audio3: audUrl3, Audio4: audUrl4
        });
  
        if (test != null) {
            return res.status(200).json({ test });
        }
        return res.status(503).json({ message: "Error, can not create quiz." });
        } catch (error) {
        return res.status(500).json({ message: "Error, can not create quiz." });
    }
  };

  // //update test
  // exports.putTest = async (req, res) => {
  //   try {
  //       const Duration = 120;
  //       //const CreateDate = Date.UTC();

  //       const { Name, Description } = req.body;
  //       const test = await updateTest({ Duration, Name, Description });
  
  //       if (test != null) {
  //           return res.status(200).json({ test });
  //       }
  //       return res.status(503).json({ message: "Error, can not create quiz." });
  //       } catch (error) {
  //       return res.status(503).json({ message: "Error, can not create quiz." });
  //   }
  // };
  
  //get test by id
  exports.getById = async (req, res) => {
    try {
      const test = await getTestById(req.params.id);
     
        return res.status(200).json(test);
     
    } catch (error) {
      console.error("GETDETAILS ERROR: ", error);
      return res.status(503).json({ message: error });
    }
  };
  
  //get all
  exports.getAllTests = async (req, res) => {
    try {
      const tests = await getAllTests();
      return res.status(200).json({ tests });
    } catch (error) {
      console.error("ERROR: ", error);
      return res.status(503).json({ message: "Lỗi dịch vụ, thử lại sau" });
    }
  };
 